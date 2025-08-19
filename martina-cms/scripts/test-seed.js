/**
 * Test script for debugging Strapi seed functionality
 * Run with: node scripts/test-seed.js
 */

const strapi = require('@strapi/strapi');

async function testSeed() {
  try {
    console.log('🚀 Starting Strapi application...');
    
    // Start Strapi application
    const app = await strapi({ 
      autoReload: false,
      serveAdminPanel: false 
    });
    
    await app.start();
    console.log('✅ Strapi started successfully');
    
    // Test 1: Check database connection
    console.log('\n📊 Testing database connection...');
    const dbConnection = strapi.db.connection;
    console.log('✅ Database connected:', dbConnection ? 'Yes' : 'No');
    
    // Test 2: Check if content types are available
    console.log('\n📋 Checking available content types...');
    const homeContentType = strapi.contentType('api::home.home');
    const serviceContentType = strapi.contentType('api::service.service');
    const socialLinkContentType = strapi.contentType('api::social-link.social-link');
    
    console.log('Home content type:', homeContentType ? '✅ Found' : '❌ Not found');
    console.log('Service content type:', serviceContentType ? '✅ Found' : '❌ Not found');
    console.log('Social Link content type:', socialLinkContentType ? '✅ Found' : '❌ Not found');
    
    // Test 3: Try to query existing data
    console.log('\n🔍 Checking existing data...');
    try {
      const existingHomes = await strapi.db.query('api::home.home').findMany();
      console.log(`Found ${existingHomes.length} home entries`);
      
      const existingServices = await strapi.db.query('api::service.service').findMany();
      console.log(`Found ${existingServices.length} service entries`);
      
      const existingSocials = await strapi.db.query('api::social-link.social-link').findMany();
      console.log(`Found ${existingSocials.length} social link entries`);
    } catch (error) {
      console.error('❌ Error querying data:', error.message);
    }
    
    // Test 4: Try to create a simple entry
    console.log('\n✏️ Testing data creation...');
    try {
      // Test creating a home entry without image first
      const testHome = await strapi.db.query('api::home.home').create({
        data: {
          subtitle: "Test - Psicologa Clinica",
          body: "<p>Test content for debugging</p>"
        }
      });
      console.log('✅ Successfully created home entry with ID:', testHome.id);
      
      // Test creating a service entry
      const testService = await strapi.db.query('api::service.service').create({
        data: {
          title: "Test Service",
          icon: "🧪",
          order: 99,
          description: "Test service description",
          content: "<p>Test service content</p>"
        }
      });
      console.log('✅ Successfully created service entry with ID:', testService.id);
      
    } catch (error) {
      console.error('❌ Error creating test data:', error);
      console.error('Error details:', error.details || error.message);
    }
    
    // Test 5: Check if upload plugin is available
    console.log('\n📸 Checking upload plugin...');
    const uploadPlugin = strapi.plugins['upload'];
    console.log('Upload plugin:', uploadPlugin ? '✅ Available' : '❌ Not available');
    
    if (uploadPlugin && uploadPlugin.services && uploadPlugin.services.upload) {
      console.log('Upload service:', '✅ Available');
      
      // Test uploading a simple image
      try {
        const placeholderSVG = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="#e0e0e0"/></svg>');
        
        console.log('Attempting to upload test image...');
        const uploadResult = await strapi.plugins.upload.services.upload.upload({
          data: {},
          files: {
            name: 'test-placeholder.svg',
            type: 'image/svg+xml',
            size: placeholderSVG.length,
            buffer: placeholderSVG
          }
        });
        
        console.log('✅ Upload successful, file ID:', uploadResult[0]?.id || 'Unknown');
      } catch (uploadError) {
        console.error('❌ Upload error:', uploadError.message);
      }
    } else {
      console.log('Upload service:', '❌ Not available');
    }
    
    console.log('\n✅ All tests completed');
    
    // Stop Strapi
    await app.stop();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the test
testSeed();