/**
 * Auth0 Authentication Service
 * 
 * This service handles authentication with Auth0 and integrates with Netlify CMS
 */

class Auth0AuthService {
  constructor() {
    this.auth0Client = null;
    this.isAuthenticated = false;
    this.user = null;
    this.token = null;
    this.initialized = false;
  }

  /**
   * Initialize Auth0 authentication
   */
  async initialize() {
    if (this.initialized) return;

    try {
      console.log('🔐 [Auth0] Initializing authentication service...');
      
      // Load Auth0 configuration
      if (!window.AUTH0_CONFIG) {
        throw new Error('Auth0 configuration not found. Please check auth0-config.js');
      }

      const config = window.AUTH0_CONFIG;
      
      // Create Auth0 client
      this.auth0Client = await auth0.createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        authorizationParams: {
          redirect_uri: config.redirectUri,
          audience: config.audience,
          scope: config.scope
        }
      });

      // Check if user is already authenticated
      this.isAuthenticated = await this.auth0Client.isAuthenticated();
      
      if (this.isAuthenticated) {
        this.user = await this.auth0Client.getUser();
        this.token = await this.auth0Client.getTokenSilently();
        console.log('✅ [Auth0] User already authenticated:', this.user.email);
      }

      this.initialized = true;
      console.log('✅ [Auth0] Authentication service initialized successfully');
      
      // Handle callback if we're on the callback page
      await this.handleCallback();
      
    } catch (error) {
      console.error('❌ [Auth0] Failed to initialize authentication:', error);
      this.handleError(error);
    }
  }

  /**
   * Handle authentication callback
   */
  async handleCallback() {
    const query = window.location.search;
    if (query.includes('code=') && query.includes('state=')) {
      try {
        console.log('🔐 [Auth0] Handling authentication callback...');
        
        await this.auth0Client.handleRedirectCallback();
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.token = await this.auth0Client.getTokenSilently();
        
        console.log('✅ [Auth0] Authentication successful:', this.user.email);
        
        // Redirect to admin panel
        window.location.href = '/admin/';
        
      } catch (error) {
        console.error('❌ [Auth0] Callback handling failed:', error);
        this.handleError(error);
      }
    }
  }

  /**
   * Login with Auth0
   */
  async login() {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      console.log('🔐 [Auth0] Starting login process...');
      
      await this.auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.AUTH0_CONFIG.redirectUri,
          ui_locales: 'it' // Italian language
        }
      });
      
    } catch (error) {
      console.error('❌ [Auth0] Login failed:', error);
      this.handleError(error);
    }
  }

  /**
   * Logout from Auth0
   */
  async logout() {
    try {
      console.log('🔐 [Auth0] Logging out...');
      
      await this.auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
      
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      
    } catch (error) {
      console.error('❌ [Auth0] Logout failed:', error);
      this.handleError(error);
    }
  }

  /**
   * Get authentication token
   */
  async getToken() {
    if (!this.isAuthenticated || !this.auth0Client) {
      return null;
    }

    try {
      this.token = await this.auth0Client.getTokenSilently();
      return this.token;
    } catch (error) {
      console.error('❌ [Auth0] Failed to get token:', error);
      return null;
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken() {
    try {
      this.token = await this.auth0Client.getTokenSilently({
        ignoreCache: true
      });
      console.log('✅ [Auth0] Token refreshed successfully');
      return this.token;
    } catch (error) {
      console.error('❌ [Auth0] Token refresh failed:', error);
      return null;
    }
  }

  /**
   * Get user profile
   */
  async getUser() {
    if (!this.isAuthenticated) {
      return null;
    }
    return this.user;
  }

  /**
   * Check if user is authenticated
   */
  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  /**
   * Handle authentication errors
   */
  handleError(error) {
    console.error('❌ [Auth0] Authentication error:', error);
    
    // Show user-friendly error message
    let errorMessage = 'Si è verificato un errore durante l\'autenticazione.';
    
    if (error.error === 'access_denied') {
      errorMessage = 'Accesso negato. Verifica le tue credenziali.';
    } else if (error.error === 'invalid_request') {
      errorMessage = 'Richiesta non valida. Riprova più tardi.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // Dispatch error event for UI components to handle
    window.dispatchEvent(new CustomEvent('auth0-error', {
      detail: { error: errorMessage, originalError: error }
    }));
  }

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    try {
      console.log('🔐 [Auth0] Sending password reset email...');
      
      const response = await fetch(`https://${window.AUTH0_CONFIG.domain}/dbconnections/change_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: window.AUTH0_CONFIG.clientId,
          email: email,
          connection: 'Username-Password-Authentication'
        })
      });

      if (response.ok) {
        console.log('✅ [Auth0] Password reset email sent successfully');
        return true;
      } else {
        throw new Error('Failed to send password reset email');
      }
      
    } catch (error) {
      console.error('❌ [Auth0] Password reset failed:', error);
      this.handleError(error);
      return false;
    }
  }

  /**
   * Invite user (admin function)
   */
  async inviteUser(email) {
    try {
      console.log('🔐 [Auth0] Sending invitation email...');
      
      const token = await this.getToken();
      if (!token) {
        throw new Error('Authentication required to invite users');
      }

      const response = await fetch(`https://${window.AUTH0_CONFIG.domain}/api/v2/organizations/invitations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: window.AUTH0_CONFIG.clientId,
          invitee: { email },
          sender: { name: 'Martina Evangelisti Admin' },
          ttl_sec: 86400 // 24 hours
        })
      });

      if (response.ok) {
        console.log('✅ [Auth0] Invitation email sent successfully');
        return true;
      } else {
        throw new Error('Failed to send invitation email');
      }
      
    } catch (error) {
      console.error('❌ [Auth0] User invitation failed:', error);
      this.handleError(error);
      return false;
    }
  }
}

// Create global instance
window.auth0AuthService = new Auth0AuthService();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.auth0AuthService.initialize();
  });
} else {
  window.auth0AuthService.initialize();
}