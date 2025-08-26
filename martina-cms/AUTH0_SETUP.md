# Auth0 Integration Setup Guide

## 🚀 Overview

This guide will help you set up Auth0 authentication for your Netlify CMS, replacing the previous Netlify Identity system with a more robust and secure solution.

## 📋 Prerequisites

- Netlify account with your site deployed
- GitHub repository connected to Netlify
- Auth0 account (free tier available)

## 🔧 Step 1: Auth0 Application Setup

### 1.1 Create Auth0 Application

1. **Sign in to Auth0 Dashboard** at [https://manage.auth0.com](https://manage.auth0.com)
2. **Create new application**:
   - Click "Applications" → "Create Application"
   - Name: `Martina Evangelisti CMS`
   - Application Type: `Single Page Web Applications`
   - Click "Create"

### 1.2 Configure Application Settings

1. **Basic Information**:
   - Application Name: `Martina Evangelisti CMS`
   - Description: `Admin panel for Martina Evangelisti website`
   - Application Logo: Upload your logo (optional)

2. **Application URIs**:
   - **Allowed Callback URLs**: `https://your-site.netlify.app/admin/callback`
   - **Allowed Logout URLs**: `https://your-site.netlify.app/`
   - **Allowed Web Origins**: `https://your-site.netlify.app`
   - **Allowed Origins (CORS)**: `https://your-site.netlify.app`

3. **Advanced Settings**:
   - **Token Endpoint Authentication Method**: `None`
   - **Default Directory**: `Username-Password-Authentication`

### 1.3 Get Application Credentials

1. **Go to** → "Settings" → "General"
2. **Copy these values**:
   - **Domain**: `your-auth0-domain.auth0.com`
   - **Client ID**: `your-client-id`

## 🔧 Step 2: Update Configuration Files

### 2.1 Update Auth0 Configuration

Edit `auth0-config.js`:

```javascript
const AUTH0_CONFIG = {
  // Replace with your actual Auth0 values
  domain: 'YOUR_AUTH0_DOMAIN.auth0.com',
  clientId: 'YOUR_AUTH0_CLIENT_ID',
  redirectUri: 'https://your-site.netlify.app/admin/callback',
  audience: 'https://YOUR_AUTH0_DOMAIN.auth0.com/api/v2/',
  scope: 'openid profile email',
  
  // Update with your repository info
  cmsRepo: 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME',
  cmsBranch: 'main',
  
  // Optional: Customize UI
  theme: {
    logo: 'https://your-site.com/logo.png',
    primaryColor: '#2563EB',
  }
};
```

### 2.2 Update CMS Configuration

Edit `admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main
  auth_scope: repo,user:email
  api_root: https://api.github.com
  site_domain: your-site.netlify.app
  base_url: https://your-site.netlify.app
```

## 🔧 Step 3: Configure GitHub Integration

### 3.1 GitHub OAuth App

1. **Create GitHub OAuth App**:
   - Go to GitHub → Settings → Developer Settings → OAuth Apps
   - Click "New OAuth App"
   - Application name: `Martina Evangelisti CMS`
   - Homepage URL: `https://your-site.netlify.app`
   - Authorization callback URL: `https://your-site.netlify.app/.netlify/functions/github-callback`

2. **Generate Client Secret**:
   - Click "Generate a new client secret"
   - Copy the client secret

### 3.2 Configure Netlify Git Gateway

1. **Go to Netlify Dashboard** → Your Site → Settings → Identity
2. **Git Gateway Settings**:
   - Enable Git Gateway
   - Select GitHub as the provider
   - Enter your GitHub OAuth credentials
   - Set repository permissions to `read/write`

## 🔧 Step 4: Configure Auth0 Email Templates

### 4.1 Password Reset Email

1. **Go to Auth0 Dashboard** → "Authentication" → "Email Templates"
2. **Select "Reset Password" template**
3. **Customize the template**:

```html
<h2>Reset Password - Martina Evangelisti</h2>
<p>Ciao {{user.email}},</p>
<p>Hai richiesto di reimpostare la tua password per il pannello admin.</p>
<p>Clicca sul link sottostante per creare una nuova password:</p>
<p><a href="{{url}}" style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reimposta Password</a></p>
<p>Se non hai richiesto questa operazione, ignora questa email.</p>
<p>Grazie,<br>Team Martina Evangelisti</p>
```

### 4.2 User Invitation Email

1. **Go to Auth0 Dashboard** → "Authentication" → "Email Templates"
2. **Select "User Invitation" template**
3. **Customize the template**:

```html
<h2>Invito al Pannello Admin - Martina Evangelisti</h2>
<p>Ciao {{user.email}},</p>
<p>Sei stato invitato ad accedere al pannello di amministrazione del sito Martina Evangelisti.</p>
<p>Clicca sul link sottostante per completare la registrazione:</p>
<p><a href="{{invitation_link}}" style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Accedi al Pannello</a></p>
<p>Una volta registrato, potrai gestire i contenuti del sito in autonomia.</p>
<p>Grazie,<br>Team Martina Evangelisti</p>
```

## 🔧 Step 5: Deploy and Test

### 5.1 Deploy Changes

1. **Commit all changes** to your repository
2. **Push to GitHub** to trigger Netlify deployment
3. **Wait for deployment** to complete

### 5.2 Test Authentication

1. **Test Login**:
   - Visit `https://your-site.netlify.app/admin`
   - Click "Accedi con Auth0"
   - Verify login flow works correctly

2. **Test Admin Access**:
   - After login, verify you can access the CMS
   - Try creating and saving content
   - Verify changes are committed to GitHub

3. **Test Password Reset**:
   - Click "Password dimenticata?"
   - Enter your email
   - Check if reset email arrives
   - Test the reset link

4. **Test User Invitation**:
   - Use Auth0 dashboard to invite a new user
   - Verify invitation email arrives
   - Test registration process

## 🔧 Step 6: Security Configuration

### 6.1 Auth0 Security Settings

1. **Go to Auth0 Dashboard** → "Authentication" → "Password"
2. **Configure password policy**:
   - Password strength: `Good`
   - Password length: `8 characters`
   - Enable password history

3. **Configure MFA** (optional but recommended):
   - Go to "Authentication" → "Multi-factor Authentication"
   - Enable factors like SMS or Authenticator App

### 6.2 Netlify Security Settings

1. **Go to Netlify Dashboard** → Site Settings → Identity
2. **Configure registration**:
   - Set to "Invite only" for admin access
   - Enable email confirmation

## 🚨 Troubleshooting

### Common Issues

1. **Authentication fails**:
   - Check Auth0 application URIs are correct
   - Verify CORS settings
   - Check browser console for errors

2. **Git Gateway not working**:
   - Verify GitHub OAuth app configuration
   - Check repository permissions
   - Ensure Git Gateway is enabled in Netlify

3. **Emails not delivered**:
   - Check Auth0 email templates
   - Verify email provider settings
   - Check spam folders

4. **Content not saving**:
   - Verify user has write permissions
   - Check GitHub repository settings
   - Review Git Gateway logs

### Debug Mode

The implementation includes comprehensive logging. Check browser console for:
- `🔐 [Auth0]` - Authentication events
- `✅ [Auth0]` - Success messages
- `❌ [Auth0]` - Error messages
- `🔍 [Auth0]` - Debug information

## 📞 Support

For technical support or configuration issues:
1. Check browser console for detailed error messages
2. Verify all configuration values are correct
3. Ensure all required services are enabled
4. Review Auth0 and Netlify documentation

---

## ✅ Benefits of Auth0 Integration

- **🔒 Enhanced Security**: Industry-standard authentication
- **📧 Reliable Email Delivery**: Professional email service
- **🎯 Better User Experience**: Smooth login flows
- **🔧 Advanced Features**: MFA, social login, user management
- **📊 Monitoring**: Detailed analytics and logging
- **🌐 Scalability**: Handles growth and multiple users

**✨ Enjoy your new secure authentication system!**