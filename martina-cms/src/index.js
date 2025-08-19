/**
 * Application lifecycle file for Strapi v5
 * This file runs after Strapi is fully initialized
 */

module.exports = {
  /**
   * An asynchronous register function that runs before initialization
   */
  register(/* { strapi } */) {
    // Register phase - no database access here
  },

  /**
   * An asynchronous bootstrap function that runs after Strapi is ready
   * This is where we seed our data using entityService!
   */
  async bootstrap({ strapi }) {
    console.log('\n🌱 BOOTSTRAP DATA SEEDING STARTED 🌱');
    console.log('=====================================');
    
    try {
      // Only seed in development
      if (process.env.NODE_ENV === 'production') {
        console.log('⚠️  Skipping seed in production environment');
        return;
      }

      // SEED HOME CONTENT
      console.log('\n📋 Seeding HOME content...');
      const existingHomes = await strapi.entityService.findMany('api::home.home', {
        filters: {
          subtitle: {
            $contains: 'Placeholder'
          }
        }
      });

      if (!existingHomes || existingHomes.length === 0) {
        const createdHome = await strapi.entityService.create('api::home.home', {
          data: {
            subtitle: "Placeholder - TO REPLACE: Psicologa Clinica",
            body: "<p>Placeholder - TO REPLACE: Supporto professionale per il tuo benessere psicologico</p>",
            publishedAt: new Date() // Publish immediately
          }
        });
        console.log('✅ Created HOME entry with ID:', createdHome.id);
      } else {
        console.log('→ HOME already exists, skipping');
      }

      // SEED SERVICES
      console.log('\n📋 Seeding SERVICES...');
      const servicesToCreate = [
        {
          title: "Placeholder - TO REPLACE: Consulenza Psicologica",
          icon: "🧠",
          order: 1,
          description: "Placeholder - TO REPLACE: Descrizione consulenza",
          content: "<p>Placeholder - TO REPLACE: Contenuto dettagliato della consulenza psicologica</p>",
          publishedAt: new Date()
        },
        {
          title: "Placeholder - TO REPLACE: Terapia di Coppia",
          icon: "💑",
          order: 2,
          description: "Placeholder - TO REPLACE: Descrizione terapia di coppia",
          content: "<p>Placeholder - TO REPLACE: Contenuto dettagliato della terapia di coppia</p>",
          publishedAt: new Date()
        },
        {
          title: "Placeholder - TO REPLACE: Supporto Adolescenti",
          icon: "🧒",
          order: 3,
          description: "Placeholder - TO REPLACE: Descrizione supporto adolescenti",
          content: "<p>Placeholder - TO REPLACE: Contenuto dettagliato del supporto per adolescenti</p>",
          publishedAt: new Date()
        }
      ];

      for (const serviceData of servicesToCreate) {
        const existingService = await strapi.entityService.findMany('api::service.service', {
          filters: {
            title: serviceData.title
          },
          limit: 1
        });

        if (!existingService || existingService.length === 0) {
          const createdService = await strapi.entityService.create('api::service.service', {
            data: serviceData
          });
          console.log(`✅ Created SERVICE: "${serviceData.title}" with ID: ${createdService.id}`);
        } else {
          console.log(`→ SERVICE "${serviceData.title}" already exists, skipping`);
        }
      }

      // SEED SOCIAL LINKS
      console.log('\n📋 Seeding SOCIAL LINKS...');
      const socialLinksToCreate = [
        {
          label: "Placeholder - TO REPLACE: LinkedIn",
          style: "linkedin",
          url: "https://linkedin.com/in/placeholder",
          publishedAt: new Date()
        },
        {
          label: "Placeholder - TO REPLACE: Instagram",
          style: "instagram",
          url: "https://instagram.com/placeholder",
          publishedAt: new Date()
        }
      ];

      for (const socialData of socialLinksToCreate) {
        const existingSocial = await strapi.entityService.findMany('api::social-link.social-link', {
          filters: {
            label: socialData.label
          },
          limit: 1
        });

        if (!existingSocial || existingSocial.length === 0) {
          const createdSocial = await strapi.entityService.create('api::social-link.social-link', {
            data: socialData
          });
          console.log(`✅ Created SOCIAL LINK: "${socialData.label}" with ID: ${createdSocial.id}`);
        } else {
          console.log(`→ SOCIAL LINK "${socialData.label}" already exists, skipping`);
        }
      }

      // VERIFY SEEDED DATA
      console.log('\n📊 Verifying seeded data...');
      const homes = await strapi.entityService.findMany('api::home.home');
      const services = await strapi.entityService.findMany('api::service.service');
      const socialLinks = await strapi.entityService.findMany('api::social-link.social-link');

      console.log(`📊 Total HOME entries: ${homes.length}`);
      console.log(`📊 Total SERVICE entries: ${services.length}`);
      console.log(`📊 Total SOCIAL LINK entries: ${socialLinks.length}`);

      console.log('\n=====================================');
      console.log('🎉 DATA SEEDING COMPLETED SUCCESSFULLY!\n');

    } catch (error) {
      console.error('\n❌ ERROR in bootstrap seeding:', error);
      console.error('Stack trace:', error.stack);
    }
  },

  /**
   * An asynchronous destroy function that runs before Strapi shuts down
   */
  destroy(/* { strapi } */) {
    // Cleanup code here if needed
  }
};