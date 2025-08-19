#!/usr/bin/env node

/**
 * Standalone script to run the seed
 * Usage: node scripts/run-seed.js
 */

const strapi = require('@strapi/strapi');

async function runSeed() {
  try {
    console.log('🚀 Starting Strapi application...');
    
    // Create Strapi instance
    const app = await strapi.createStrapi({
      autoReload: false,
      serveAdminPanel: false
    });
    
    // Load Strapi without starting the server
    await app.load();
    console.log('✅ Strapi loaded successfully');
    
    // Run the seed script
    console.log('🌱 Running seed script...');
    const seedScript = require('./seed-initial-data');
    await seedScript({ strapi: app });
    
    console.log('✅ Seed completed successfully');
    
    // Destroy Strapi instance
    await app.destroy();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

runSeed();