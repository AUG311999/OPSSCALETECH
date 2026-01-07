import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { projectId, publicAnonKey } from '../../config/supabase';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    projectType: '',
    timeline: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6d0929f8/contact-submit`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      console.log('Form submitted successfully:', result.submissionId);
      setSubmitted(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          role: '',
          projectType: '',
          timeline: '',
          message: ''
        });
      }, 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="bg-white border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl text-gray-900 mb-3">
          Thank you for reaching out
        </h3>
        <p className="text-gray-600">
          We'll review your submission and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-8 lg:p-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2"
          />
        </div>

        {/* Company and Role */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="role">Your Role *</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="e.g. Director of Operations, VP Safety"
              className="mt-2"
            />
          </div>
        </div>

        {/* Project Type */}
        <div>
          <Label htmlFor="projectType">Project Type *</Label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className="mt-2 w-full h-10 px-3 border border-input bg-input-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select a project type</option>
            <option value="operational-media">Operational Media Systems</option>
            <option value="content-production">Enterprise Content Production</option>
            <option value="distribution-platform">Distribution & Enablement Platform</option>
            <option value="safety-compliance">Safety & Compliance Enablement</option>
            <option value="full-solution">Full Operational Solution</option>
            <option value="consultation">Initial Consultation</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Timeline */}
        <div>
          <Label htmlFor="timeline">Expected Timeline *</Label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
            className="mt-2 w-full h-10 px-3 border border-input bg-input-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select a timeline</option>
            <option value="immediate">Immediate (0-30 days)</option>
            <option value="short-term">Short-term (1-3 months)</option>
            <option value="medium-term">Medium-term (3-6 months)</option>
            <option value="long-term">Long-term (6+ months)</option>
            <option value="exploratory">Exploratory</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message">Project Details *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell us about your organization, current operational challenges, and what you're looking to accomplish."
            className="mt-2"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-[#034c7f] to-[#56c0ff] text-white hover:opacity-90 transition-opacity"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
          {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
          <p className="text-sm text-gray-500 mt-4 text-center">
            We typically respond within 24 hours during business days.
          </p>
        </div>
      </form>
    </div>
  );
}