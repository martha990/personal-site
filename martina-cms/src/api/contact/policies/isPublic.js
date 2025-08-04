'use strict';

/**
 * `isPublic` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  // Permetti l'accesso pubblico alle API di lettura
  if (policyContext.request.method === 'GET') {
    return true;
  }
  
  // Per le operazioni di scrittura, verifica che l'utente sia autenticato
  if (policyContext.state.user) {
    return true;
  }
  
  return false;
};