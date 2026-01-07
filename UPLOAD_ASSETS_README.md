# Asset Upload System - Quick Guide

## 🎯 How It Works

Your Ops Scale website now has a **one-click upload system** built right into the navigation.

### To Upload Your Logos:

1. **Click the upload icon** (📤) in the top navigation bar
2. **Upload each logo** when the modal appears
3. **Click "Done"** when finished
4. **That's it!** - URLs are saved automatically and the site refreshes

### No Manual Work Required

- ✅ URLs automatically saved to backend
- ✅ Site automatically loads the new images
- ✅ No code changes needed
- ✅ No copy/pasting required

---

## 📦 What Gets Uploaded

You need these 6 logo files:
- Ops Scale Logo (your company logo)
- Amazon Logo
- CDC Logo
- Healthcare Logo (or placeholder)
- Peacock/NBCUniversal Logo
- JetBlue Logo

---

## 🚀 Deployment

Once uploaded, your site will work perfectly on Vercel, Netlify, or any platform because:
- All images are hosted on Supabase Storage
- No `figma:asset` imports that break builds
- Fast CDN delivery
- Professional, production-ready

---

## 🔧 Technical Details

**Backend:**
- Upload API: `/make-server-6d0929f8/upload-asset`
- Save URL: `/make-server-6d0929f8/save-asset-url`
- Get assets: `/make-server-6d0929f8/get-assets`

**Storage:** Supabase Storage bucket `ops-scale-assets` (public)

**Components:** All components automatically load from the backend using the `useAssets()` hook

**Fallback:** Gray placeholder boxes show until assets are uploaded

---

## 💡 Tips

- You can re-upload any logo anytime (it overwrites the old one)
- The upload button is in the navigation for easy access
- Files are limited to 5MB each
- Supports PNG, JPG, and other image formats

---

That's it! Just click upload, select your files, and you're done.
