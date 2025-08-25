# Netlify CMS Setup Guide

## 🚀 Quick Start

This is a simple static site with Netlify CMS for content management. No complex build process required!

## 📁 Project Structure

```
martina-cms/
├── admin/
│   ├── index.html          # Admin panel
│   └── config.yml          # CMS configuration
├── content/                # Content files (markdown)
│   ├── hero.md            # Hero section content
│   ├── bio.md             # About section
│   ├── contact.md         # Contact information
│   ├── social.md          # Social media links
│   ├── settings.md        # Site settings
│   ├── services/          # Service items
│   └── education/         # Education entries
├── js/
│   └── content-loader.js   # Dynamic content injection
├── assets/uploads/         # Media uploads
├── index.html             # Main website
├── netlify.toml           # Netlify configuration
└── _redirects             # URL redirects
```

## 🔧 Deployment Steps

### 1. Deploy to Netlify

1. **Connect Git Repository**: 
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select this repository

2. **Build Settings**: 
   - Build command: (leave empty - static site)
   - Publish directory: `.` (root)
   - Click "Deploy site"

### 2. Enable Netlify Identity

1. **Go to Site Settings** → **Identity**
2. Click "**Enable Identity**"
3. **Registration preferences**: Set to "Invite only" (recommended)
4. **Git Gateway**: Click "Enable Git Gateway"

### 3. Configure Authentication

1. **External providers** (optional): Configure Google, GitHub, etc.
2. **Site URL**: Make sure it matches your domain
3. **Emails**: Configure email templates if needed

### 4. Invite Admin Users

1. Go to **Identity** → **Users** → **Invite users**
2. Enter admin email addresses
3. They'll receive an invitation email

### 5. Access Admin Panel

- Visit: `https://your-site.netlify.app/admin`
- Login with invited credentials
- Start editing content!

## 🎯 How It Works

### Content Management Flow

1. **Admin logs in** at `/admin`
2. **Edits content** using the CMS interface
3. **Changes are committed** to Git automatically
4. **Site rebuilds** and updates content dynamically

### Technical Implementation

- **Static HTML** with dynamic content loading
- **JavaScript content loader** fetches markdown files
- **No build step** required - pure client-side rendering
- **Git-based storage** - all content in version control

## ✨ Features

- ✅ **Simple Setup** - No complex build processes
- ✅ **Git-based** - All content versioned and backed up
- ✅ **User-friendly CMS** - Non-technical users can edit content
- ✅ **Real-time updates** - Changes appear immediately
- ✅ **Mobile-responsive** admin interface
- ✅ **Media management** - Upload and manage images
- ✅ **SEO-friendly** - Meta tags updated dynamically

## 🔒 Security

- **Git Gateway** handles authentication
- **Netlify Identity** manages users
- **HTTPS** by default
- **No database** - reduced attack surface

## 📝 Content Types

### Hero Section (`content/hero.md`)
- Site title and subtitle
- Main description
- WhatsApp number
- Hero image

### Services (`content/services/`)
- Service title and description
- Icon (emoji)
- Display order

### About Section (`content/bio.md`)
- Biography text (supports markdown)
- Professional quote
- Profile image

### Education (`content/education/`)
- Year and title
- Institution name
- Display order

### Contact Info (`content/contact.md`)
- Phone, email, address
- Business hours
- WhatsApp number

### Social Media (`content/social.md`)
- LinkedIn and Instagram URLs
- Social media bio

### Site Settings (`content/settings.md`)
- Site title and meta description
- Professional registration info
- Feature toggles

## 🛠 Customization

### Adding New Content Types

1. **Edit** `admin/config.yml`
2. **Add new collection** or fields
3. **Update** `js/content-loader.js` to handle new content
4. **Deploy** changes

### Styling Changes

- Edit CSS classes directly in `index.html`
- Uses Tailwind CSS - modify classes as needed
- Supports dark/light mode toggle

## 🆘 Troubleshooting

### Admin Panel Not Loading
- Check that Netlify Identity is enabled
- Verify Git Gateway is active
- Ensure user has been invited

### Content Not Updating
- Check browser console for errors
- Verify markdown files are properly formatted
- Clear browser cache

### Images Not Displaying
- Check file paths in content files
- Ensure images are uploaded to `assets/uploads/`
- Verify image URLs are accessible

## 📞 Support

For technical support or customization requests, contact the development team.

---

**✨ Enjoy your new content management system!**