import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6d0929f8/health", (c) => {
  return c.json({ status: "ok" });
});

// Upload asset to Supabase Storage
app.post("/make-server-6d0929f8/upload-asset", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const bucketName = 'ops-scale-assets';

    // Create bucket if it doesn't exist (idempotent)
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB limit
      });
      if (createError) {
        console.error('Error creating bucket:', createError);
        return c.json({ error: `Failed to create storage bucket: ${createError.message}` }, 500);
      }
    }

    // Parse form data
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const filePath = fileName || file.name;
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: true, // Overwrite if exists
      });

    if (error) {
      console.error('Error uploading file:', error);
      return c.json({ error: `Failed to upload file: ${error.message}` }, 500);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return c.json({ 
      success: true, 
      url: publicUrlData.publicUrl,
      fileName: filePath 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: `Upload failed: ${error.message}` }, 500);
  }
});

// Save asset URL to KV store
app.post("/make-server-6d0929f8/save-asset-url", async (c) => {
  try {
    const body = await c.req.json();
    const { key, url } = body;

    if (!key || !url) {
      return c.json({ error: 'Missing key or url' }, 400);
    }

    // Save to KV store with asset- prefix
    await kv.set(`asset-${key}`, url);

    return c.json({ success: true });
  } catch (error) {
    console.error('Save asset URL error:', error);
    return c.json({ error: `Failed to save: ${error.message}` }, 500);
  }
});

// Get all asset URLs
app.get("/make-server-6d0929f8/get-assets", async (c) => {
  try {
    // Manually query with Supabase to get both key and value
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from("kv_store_6d0929f8")
      .select("key, value")
      .like("key", "asset-%");

    if (error) {
      throw new Error(error.message);
    }
    
    // Convert array to object format
    const assetMap: Record<string, string> = {};
    if (data) {
      for (const item of data) {
        if (item.key) {
          const key = item.key.replace('asset-', '');
          assetMap[key] = item.value;
        }
      }
    }

    return c.json({ assets: assetMap });
  } catch (error) {
    console.error('Get assets error:', error);
    return c.json({ error: `Failed to get assets: ${error.message}` }, 500);
  }
});

// Submit contact form
app.post("/make-server-6d0929f8/contact-submit", async (c) => {
  try {
    const body = await c.req.json();
    const { firstName, lastName, email, company, role, projectType, timeline, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !role || !projectType || !timeline || !message) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    // Create submission object with timestamp
    const timestamp = new Date().toISOString();
    const submissionId = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const submission = {
      id: submissionId,
      firstName,
      lastName,
      email,
      company,
      role,
      projectType,
      timeline,
      message,
      submittedAt: timestamp,
      status: 'new'
    };

    // Save to KV store
    await kv.set(submissionId, JSON.stringify(submission));

    console.log('Contact form submission received:', { email, company, submittedAt: timestamp });

    // Send email notification via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const notificationEmail = Deno.env.get('NOTIFICATION_EMAIL');
    
    if (resendApiKey && notificationEmail) {
      try {
        const projectTypeLabels: Record<string, string> = {
          'operational-media': 'Operational Media Systems',
          'content-production': 'Enterprise Content Production',
          'distribution-platform': 'Distribution & Enablement Platform',
          'safety-compliance': 'Safety & Compliance Enablement',
          'full-solution': 'Full Operational Solution',
          'consultation': 'Initial Consultation',
          'other': 'Other'
        };
        
        const timelineLabels: Record<string, string> = {
          'immediate': 'Immediate (0-30 days)',
          'short-term': 'Short-term (1-3 months)',
          'medium-term': 'Medium-term (3-6 months)',
          'long-term': 'Long-term (6+ months)',
          'exploratory': 'Exploratory'
        };

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Ops Scale Contact Form <onboarding@resend.dev>',
            to: [notificationEmail],
            reply_to: email,
            subject: `New Contact Form Submission from ${firstName} ${lastName} at ${company}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(to right, #034c7f, #56c0ff); color: white; padding: 20px; margin-bottom: 20px; }
                  .field { margin-bottom: 15px; }
                  .label { font-weight: bold; color: #034c7f; margin-bottom: 5px; }
                  .value { color: #333; }
                  .message-box { background: #f5f5f5; padding: 15px; border-left: 4px solid #56c0ff; margin-top: 10px; }
                  .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; font-size: 12px; color: #666; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0;">New Contact Form Submission</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Ops Scale Website</p>
                  </div>
                  
                  <div class="field">
                    <div class="label">Contact Name</div>
                    <div class="value">${firstName} ${lastName}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Company</div>
                    <div class="value">${company}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Role</div>
                    <div class="value">${role}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Project Type</div>
                    <div class="value">${projectTypeLabels[projectType] || projectType}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Timeline</div>
                    <div class="value">${timelineLabels[timeline] || timeline}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Project Details</div>
                    <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                  </div>
                  
                  <div class="footer">
                    <p>Submitted: ${new Date(timestamp).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}</p>
                    <p>Submission ID: ${submissionId}</p>
                  </div>
                </div>
              </body>
              </html>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error('Failed to send email notification:', errorText);
        } else {
          console.log('Email notification sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't fail the request if email fails - the submission is still saved
      }
    } else {
      console.log('Email notification skipped - RESEND_API_KEY or NOTIFICATION_EMAIL not configured');
    }

    return c.json({ 
      success: true,
      message: 'Submission received successfully',
      submissionId 
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return c.json({ error: `Failed to submit: ${error.message}` }, 500);
  }
});

// Get all contact form submissions (for admin view)
app.get("/make-server-6d0929f8/contact-submissions", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from("kv_store_6d0929f8")
      .select("key, value")
      .like("key", "contact-%")
      .order("key", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    
    // Parse and return submissions
    const submissions = data?.map(item => {
      try {
        return JSON.parse(item.value);
      } catch {
        return null;
      }
    }).filter(Boolean) || [];

    return c.json({ submissions, count: submissions.length });
  } catch (error) {
    console.error('Get submissions error:', error);
    return c.json({ error: `Failed to get submissions: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);