'use strict';

module.exports = async ({ strapi }) => {
  // Esegui lo script di configurazione permessi dopo l'avvio del server
  const bootstrapPermissions = require('../scripts/bootstrap-permissions');
  await bootstrapPermissions({ strapi });
  
  // Esegui lo script di popolamento dati iniziali
  const seedInitialData = require('../scripts/seed-initial-data');
  await seedInitialData({ strapi });
};