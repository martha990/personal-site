'use strict';

/**
 * Script standalone per popolare il database di Strapi
 * Eseguire con: node scripts/seed-standalone.js
 * o con: npm run seed
 */

const strapi = require('@strapi/strapi');
const path = require('path');

async function seedDatabase() {
  let app;
  
  try {
    console.log('🚀 Inizializzazione Strapi...');
    
    // Crea e carica l'istanza di Strapi con configurazione TypeScript
    app = await strapi.createStrapi({
      distDir: path.join(__dirname, '..', 'dist'),
      autoReload: false
    });
    
    // Disabilita temporaneamente il bootstrap per evitare conflitti
    const originalBootstrap = app.config.get('functions.bootstrap');
    app.config.set('functions.bootstrap', async () => {});
    
    await app.load();
    
    console.log('✅ Strapi caricato correttamente');
    console.log('🌱 Inizio popolamento contenuti iniziali...');
    
    // ========== DATI DA POPOLARE ==========
    
    // 1. Home
    const homeData = {
      subtitle: "Psicologa Clinica",
      body: "Supporto professionale per il tuo benessere psicologico attraverso consulenze personalizzate in un ambiente accogliente e riservato.",
      publishedAt: new Date()
    };
    
    // 2. Servizi
    const servicesData = [
      {
        title: "Consulenza Psicologica",
        description: "Percorsi individuali personalizzati per gestire ansia, depressione, stress e difficoltà emotive con approccio professionale basato su evidenze scientifiche.",
        icon: "🧠",
        order: 1,
        publishedAt: new Date()
      },
      {
        title: "Terapia di Coppia",
        description: "Supporto per coppie che attraversano crisi, conflitti o vogliono migliorare la comunicazione e l'intesa reciproca attraverso tecniche validate.",
        icon: "💑",
        order: 2,
        publishedAt: new Date()
      },
      {
        title: "Sostegno Familiare",
        description: "Interventi per famiglie con dinamiche complesse, adolescenti in difficoltà o periodi di cambiamento e transizione significativi.",
        icon: "👨‍👩‍👧‍👦",
        order: 3,
        publishedAt: new Date()
      },
      {
        title: "Consulenza Breve",
        description: "Interventi focalizzati su problematiche specifiche con obiettivi mirati e tempi ridotti per risultati rapidi ed efficaci.",
        icon: "⚡",
        order: 4,
        publishedAt: new Date()
      }
    ];
    
    // 3. Bio
    const bioData = {
      subtitle: "Psicologa clinica con passione per il benessere delle persone e specializzazione in terapia cognitivo-comportamentale.",
      body: `Sono <strong>Martina Evangelisti</strong>, psicologa clinica specializzata nel supporto a persone che attraversano momenti di difficoltà emotiva, relazionale o psicologica. La mia passione per la psicologia nasce dalla convinzione che ogni persona abbia dentro di sé le risorse necessarie per stare bene.

Nel mio lavoro utilizzo un <strong>approccio integrato</strong> che combina tecniche cognitive-comportamentali con elementi di mindfulness e terapia umanistica. Credo fortemente nell'importanza di personalizzare ogni intervento, perché ogni storia è unica e merita un percorso su misura.

Offro consulenze sia <strong>online</strong> che <strong>in presenza</strong>, garantendo sempre la massima riservatezza e professionalità. Il mio obiettivo è creare uno spazio sicuro dove poter esplorare insieme le difficoltà e sviluppare strategie efficaci per il benessere.`,
      publishedAt: new Date()
    };
    
    // 4. Formazione
    const formationData = [
      {
        year: "2018",
        label: "Laurea Magistrale in Psicologia Clinica - Università di Bologna",
        publishedAt: new Date()
      },
      {
        year: "2019",
        label: "Abilitazione Professionale - Ordine Psicologi Emilia-Romagna",
        publishedAt: new Date()
      },
      {
        year: "2022",
        label: "Specializzazione in Terapia Cognitivo-Comportamentale",
        publishedAt: new Date()
      }
    ];
    
    // 5. Quote
    const quoteData = {
      text: "Ogni persona ha una storia unica che merita di essere ascoltata con attenzione, rispetto e senza giudizio. Il mio ruolo è accompagnarti nel tuo percorso di crescita.",
      publishedAt: new Date()
    };
    
    // 6. Contatti
    const contactData = {
      subtitle: "Sono qui per ascoltarti. Contattami per prenotare una consulenza o per qualsiasi informazione sui miei servizi.",
      publishedAt: new Date()
    };
    
    // 7. Contact Items
    const contactItemsData = [
      {
        icon: "phone",
        title: "Telefono",
        label: "+39 xxx xxx xxxx",
        publishedAt: new Date()
      },
      {
        icon: "email",
        title: "Email",
        label: "info@martinaevangelisti.it",
        publishedAt: new Date()
      },
      {
        icon: "location",
        title: "Studio",
        label: "Via Roma 123, Bologna (BO)",
        publishedAt: new Date()
      },
      {
        icon: "clock",
        title: "Orari",
        label: "Lun-Ven: 9-19 | Sab: 9-13",
        publishedAt: new Date()
      }
    ];
    
    // 8. Social Links
    const socialLinksData = [
      {
        label: "LinkedIn",
        style: "primary",
        publishedAt: new Date()
      },
      {
        label: "Instagram",
        style: "outline",
        publishedAt: new Date()
      }
    ];
    
    // ========== FUNZIONI HELPER ==========
    
    const createOrUpdateSingle = async (model, data) => {
      try {
        // Cerca contenuti esistenti
        const existing = await app.entityService.findMany(model, {
          limit: 1
        });
        
        if (existing && existing.length > 0) {
          // Aggiorna il primo esistente
          const updated = await app.entityService.update(model, existing[0].id, {
            data: data
          });
          console.log(`✅ Aggiornato: ${model} ID ${updated.id}`);
          return updated;
        } else {
          // Crea nuovo
          const created = await app.entityService.create(model, {
            data: data
          });
          console.log(`✅ Creato: ${model} ID ${created.id}`);
          return created;
        }
      } catch (error) {
        console.error(`❌ Errore con ${model}:`, error.message);
        return null;
      }
    };
    
    const createOrUpdateMultiple = async (model, dataArray, uniqueField = 'title') => {
      try {
        const results = [];
        
        for (const data of dataArray) {
          // Cerca se esiste già
          const existing = await app.entityService.findMany(model, {
            filters: { [uniqueField]: data[uniqueField] },
            limit: 1
          });
          
          if (existing && existing.length > 0) {
            // Aggiorna esistente
            const updated = await app.entityService.update(model, existing[0].id, {
              data: data
            });
            console.log(`✅ Aggiornato: ${model} - ${data[uniqueField]} ID ${updated.id}`);
            results.push(updated);
          } else {
            // Crea nuovo
            const created = await app.entityService.create(model, {
              data: data
            });
            console.log(`✅ Creato: ${model} - ${data[uniqueField]} ID ${created.id}`);
            results.push(created);
          }
        }
        
        return results;
      } catch (error) {
        console.error(`❌ Errore con ${model}:`, error.message);
        return [];
      }
    };
    
    // ========== ESECUZIONE SEEDING ==========
    
    console.log('\n📝 Popolamento Home...');
    await createOrUpdateSingle('api::home.home', homeData);
    
    console.log('\n📝 Popolamento Servizi...');
    await createOrUpdateMultiple('api::service.service', servicesData, 'title');
    
    console.log('\n📝 Popolamento Bio...');
    await createOrUpdateSingle('api::bio.bio', bioData);
    
    console.log('\n📝 Popolamento Formazione...');
    await createOrUpdateMultiple('api::formation.formation', formationData, 'label');
    
    console.log('\n📝 Popolamento Quote...');
    await createOrUpdateSingle('api::quote.quote', quoteData);
    
    console.log('\n📝 Popolamento Contatti...');
    await createOrUpdateSingle('api::contact.contact', contactData);
    
    console.log('\n📝 Popolamento Contact Items...');
    await createOrUpdateMultiple('api::contact-item.contact-item', contactItemsData, 'title');
    
    console.log('\n📝 Popolamento Social Links...');
    await createOrUpdateMultiple('api::social-link.social-link', socialLinksData, 'label');
    
    console.log('\n🎉 Popolamento completato con successo!');
    console.log('📊 Puoi verificare i contenuti su: http://localhost:1337/admin');
    
  } catch (error) {
    console.error('❌ Errore durante il popolamento:', error);
    process.exit(1);
  } finally {
    // Chiudi Strapi correttamente
    if (app) {
      console.log('\n🔄 Chiusura Strapi...');
      await app.destroy();
    }
    process.exit(0);
  }
}

// Esegui il seeding
seedDatabase();