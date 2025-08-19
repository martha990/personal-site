/**
 * Seed script for Strapi v5 - Updated for v5 API
 * Uses documents API instead of entityService
 */

module.exports = async ({ strapi }) => {
  console.log('\n🌱 SEED SCRIPT STARTED FOR STRAPI V5 🌱');
  console.log('=====================================');
  
  try {
    // Only seed in development
    if (process.env.NODE_ENV === 'production') {
      console.log('⚠️  Skipping seed in production environment');
      return;
    }

    console.log('✅ Running in development mode');
    console.log('✅ Strapi object available:', !!strapi);
    console.log('✅ Documents API available:', !!strapi.documents);

    // STEP 1: Seed HOME content
    console.log('\n📋 Seeding HOME content...');
    try {
      // Check if home already exists
      const existingHomes = await strapi.documents('api::home.home').findMany({
        filters: {
          subtitle: {
            $contains: 'Placeholder'
          }
        }
      });

      if (!existingHomes || existingHomes.length === 0) {
        const homeData = {
          subtitle: "Placeholder - TO REPLACE: Psicologa Clinica",
          body: "<p>Placeholder - TO REPLACE: Supporto professionale per il tuo benessere psicologico</p>"
        };

        const createdHome = await strapi.documents('api::home.home').create({
          data: homeData
        });

        console.log('✅ Created HOME entry with ID:', createdHome.id);
        
        // Publish the home entry if draft mode is enabled
        if (createdHome.publishedAt === null) {
          await strapi.documents('api::home.home').publish({
            documentId: createdHome.documentId
          });
          console.log('✅ Published HOME entry');
        }
      } else {
        console.log('→ HOME already exists, skipping');
      }
    } catch (error) {
      console.error('❌ Error seeding HOME:', error.message);
      console.error('Details:', error);
    }

    // STEP 2: Seed SERVICES
    console.log('\n📋 Seeding SERVICES...');
    try {
      const servicesToCreate = [
        {
          title: "Placeholder - TO REPLACE: Consulenza Psicologica",
          icon: "🧠",
          order: 1,
          description: "Placeholder - TO REPLACE: Descrizione consulenza",
          content: "<p>Placeholder - TO REPLACE: Contenuto dettagliato della consulenza psicologica</p>"
        },
        {
          title: "Placeholder - TO REPLACE: Terapia di Coppia",
          icon: "💑",
          order: 2,
          description: "Placeholder - TO REPLACE: Descrizione terapia di coppia",
          content: "<p>Placeholder - TO REPLACE: Contenuto dettagliato della terapia di coppia</p>"
        },
        {
          title: "Placeholder - TO REPLACE: Supporto Adolescenti",
          icon: "🧒",
          order: 3,
          description: "Placeholder - TO REPLACE: Descrizione supporto adolescenti",
          content: "<p>Placeholder - TO REPLACE: Contenuto dettagliato del supporto per adolescenti</p>"
        }
      ];

      for (const serviceData of servicesToCreate) {
        // Check if service already exists
        const existingService = await strapi.documents('api::service.service').findMany({
          filters: {
            title: serviceData.title
          },
          limit: 1
        });

        if (!existingService || existingService.length === 0) {
          const createdService = await strapi.documents('api::service.service').create({
            data: serviceData
          });
          console.log(`✅ Created SERVICE: "${serviceData.title}" with ID: ${createdService.id}`);
          
          // Publish the service if draft mode is enabled
          if (createdService.publishedAt === null) {
            await strapi.documents('api::service.service').publish({
              documentId: createdService.documentId
            });
            console.log(`✅ Published SERVICE: "${serviceData.title}"`);
          }
        } else {
          console.log(`→ SERVICE "${serviceData.title}" already exists, skipping`);
        }
      }
    } catch (error) {
      console.error('❌ Error seeding SERVICES:', error.message);
      console.error('Details:', error);
    }

    // STEP 3: Seed SOCIAL LINKS
    console.log('\n📋 Seeding SOCIAL LINKS...');
    try {
      const socialLinksToCreate = [
        {
          label: "Placeholder - TO REPLACE: LinkedIn",
          style: "linkedin",
          url: "https://linkedin.com/in/placeholder"
        },
        {
          label: "Placeholder - TO REPLACE: Instagram",
          style: "instagram",
          url: "https://instagram.com/placeholder"
        }
      ];

      for (const socialData of socialLinksToCreate) {
        // Check if social link already exists
        const existingSocial = await strapi.documents('api::social-link.social-link').findMany({
          filters: {
            label: socialData.label
          },
          limit: 1
        });

        if (!existingSocial || existingSocial.length === 0) {
          const createdSocial = await strapi.documents('api::social-link.social-link').create({
            data: socialData
          });
          console.log(`✅ Created SOCIAL LINK: "${socialData.label}" with ID: ${createdSocial.id}`);
          
          // Publish the social link if draft mode is enabled
          if (createdSocial.publishedAt === null) {
            await strapi.documents('api::social-link.social-link').publish({
              documentId: createdSocial.documentId
            });
            console.log(`✅ Published SOCIAL LINK: "${socialData.label}"`);
          }
        } else {
          console.log(`→ SOCIAL LINK "${socialData.label}" already exists, skipping`);
        }
      }
    } catch (error) {
      console.error('❌ Error seeding SOCIAL LINKS:', error.message);
      console.error('Details:', error);
    }

    // STEP 4: Verify seeded data
    console.log('\n📊 Verifying seeded data...');
    try {
      const homes = await strapi.documents('api::home.home').findMany();
      const services = await strapi.documents('api::service.service').findMany();
      const socialLinks = await strapi.documents('api::social-link.social-link').findMany();

      console.log(`📊 Total HOME entries: ${homes.length}`);
      console.log(`📊 Total SERVICE entries: ${services.length}`);
      console.log(`📊 Total SOCIAL LINK entries: ${socialLinks.length}`);
    } catch (error) {
      console.error('❌ Error verifying data:', error.message);
    }

    console.log('\n=====================================');
    console.log('🎉 SEED SCRIPT COMPLETED SUCCESSFULLY!\n');

  } catch (error) {
    console.error('\n❌ FATAL ERROR in seed script:', error);
    console.error('Stack trace:', error.stack);
    // Don't throw to prevent bootstrap failure
  }
};