'use strict';

/**
 * Script di bootstrap per configurare automaticamente i permessi del ruolo Public
 * Questo script viene eseguito all'avvio del server e imposta i permessi di lettura
 * pubblica per tutti i Content Type necessari al frontend
 */

module.exports = async ({ strapi }) => {
  try {
    // Verifica se i permessi sono già configurati
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    });

    if (!publicRole) {
      console.log('Ruolo Public non trovato, salto la configurazione dei permessi');
      return;
    }

    // Lista dei permessi da configurare per il ruolo Public
    const publicPermissions = [
      // Content Type principali
      { action: 'api::home.home.find', role: publicRole.id },
      { action: 'api::home.home.findOne', role: publicRole.id },
      { action: 'api::service.service.find', role: publicRole.id },
      { action: 'api::service.service.findOne', role: publicRole.id },
      { action: 'api::bio.bio.find', role: publicRole.id },
      { action: 'api::bio.bio.findOne', role: publicRole.id },
      { action: 'api::formation.formation.find', role: publicRole.id },
      { action: 'api::formation.formation.findOne', role: publicRole.id },
      { action: 'api::quote.quote.find', role: publicRole.id },
      { action: 'api::quote.quote.findOne', role: publicRole.id },
      { action: 'api::contact.contact.find', role: publicRole.id },
      { action: 'api::contact.contact.findOne', role: publicRole.id },
      { action: 'api::contact-item.contact-item.find', role: publicRole.id },
      { action: 'api::contact-item.contact-item.findOne', role: publicRole.id },
      { action: 'api::social-link.social-link.find', role: publicRole.id },
      { action: 'api::social-link.social-link.findOne', role: publicRole.id },
      
      // Permessi per upload di file pubblici
      { action: 'plugin::upload.file.find', role: publicRole.id },
      { action: 'plugin::upload.file.findOne', role: publicRole.id },
      { action: 'plugin::upload.folder.find', role: publicRole.id },
      { action: 'plugin::upload.folder.findOne', role: publicRole.id },
    ];

    // Configura i permessi
    for (const permission of publicPermissions) {
      const existingPermission = await strapi.query('plugin::users-permissions.permission').findOne({
        where: {
          action: permission.action,
          role: permission.role,
        },
      });

      if (!existingPermission) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: permission.action,
            role: permission.role,
          },
        });
        console.log(`Permesso creato: ${permission.action}`);
      }
    }

    console.log('✅ Permessi Public configurati con successo');
  } catch (error) {
    console.error('❌ Errore durante la configurazione dei permessi:', error);
  }
};