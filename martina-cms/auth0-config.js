/**
 * Auth0 Configuration for Martina Evangelisti CMS
 * 
 * This file contains the Auth0 configuration settings.
 * You'll need to create an Auth0 account and application to get these values.
 */

const AUTH0_CONFIG = {
  // Auth0 Application Configuration
  domain: 'YOUR_AUTH0_DOMAIN.auth0.com', // Replace with your Auth0 domain
  clientId: 'YOUR_AUTH0_CLIENT_ID',       // Replace with your Auth0 client ID
  redirectUri: `${window.location.origin}/admin/callback`, // Callback URL
  
  // API Configuration
  audience: 'https://YOUR_AUTH0_DOMAIN.auth0.com/api/v2/',
  scope: 'openid profile email',
  
  // Netlify CMS Integration
  cmsRepo: 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME', // Your GitHub repository
  cmsBranch: 'main',
  
  // UI Configuration
  theme: {
    logo: 'https://your-site.com/logo.png', // Optional: Your logo URL
    primaryColor: '#2563EB', // Your brand color
  },
  
  // Email Templates (Auth0 dashboard configuration)
  emailTemplates: {
    invite: {
      from: 'noreply@your-site.com',
      subject: 'Invito al pannello admin - Martina Evangelisti',
      // Configure this in Auth0 dashboard
    },
    reset: {
      from: 'noreply@your-site.com', 
      subject: 'Reset password - Martina Evangelisti',
      // Configure this in Auth0 dashboard
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AUTH0_CONFIG;
} else {
  window.AUTH0_CONFIG = AUTH0_CONFIG;
}