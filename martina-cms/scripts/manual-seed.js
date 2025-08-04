'use strict';

/**
 * Script manuale per popolare i contenuti iniziali usando l'ORM di Strapi
 * Eseguire questo script quando il server Strapi è già in esecuzione
 */

const { createCoreService } = require('@strapi/strapi').factories;

async function seedData() {
  try {
    console.log('🌱 Inizio popolamento contenuti iniziali...');
    
    // Accedi direttamente al database di Strapi
    const strapi = global.strapi;
    
    if (!strapi) {
      throw new Error('Strapi non è inizializzato. Assicurati che il server sia in esecuzione.');
    }
    
    // Dati estratti da index.html per ogni Content Type
    
    // 1. Contenuto per la sezione Home
    const homeData = {
      title: "Martina Evangelisti",
      subtitle: "Psicologa Clinica",
      description: "Supporto professionale per il tuo benessere psicologico attraverso consulenze personalizzate in un ambiente accogliente e riservato.",
      hero_image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      whatsapp_number: "393123456789",
      whatsapp_message: "Ciao Martina, vorrei informazioni sui tuoi servizi"
    };
    
    // 2. Contenuti per i Servizi
    const servicesData = [
      {
        title: "Consulenza Psicologica",
        description: "Percorsi individuali personalizzati per gestire ansia, depressione, stress e difficoltà emotive con approccio professionale basato su evidenze scientifiche.",
        icon: "🧠",
        order: 1
      },
      {
        title: "Terapia di Coppia",
        description: "Supporto per coppie che attraversano crisi, conflitti o vogliono migliorare la comunicazione e l'intesa reciproca attraverso tecniche validate.",
        icon: "💑",
        order: 2
      },
      {
        title: "Sostegno Familiare",
        description: "Interventi per famiglie con dinamiche complesse, adolescenti in difficoltà o periodi di cambiamento e transizione significativi.",
        icon: "👨‍👩‍👧‍👦",
        order: 3
      },
      {
        title: "Consulenza Breve",
        description: "Interventi focalizzati su problematiche specifiche con obiettivi mirati e tempi ridotti per risultati rapidi ed efficaci.",
        icon: "⚡",
        order: 4
      }
    ];
    
    // 3. Contenuto per la sezione Chi Sono (Bio)
    const bioData = {
      subtitle: "Psicologa clinica con passione per il benessere delle persone e specializzazione in terapia cognitivo-comportamentale.",
      body: `Sono <strong class="text-blu-scuro dark:text-white">Martina Evangelisti</strong>, psicologa clinica specializzata nel supporto a persone che attraversano momenti di difficoltà emotiva, relazionale o psicologica. La mia passione per la psicologia nasce dalla convinzione che ogni persona abbia dentro di sé le risorse necessarie per stare bene.
      
      Nel mio lavoro utilizzo un <strong class="text-blu-scuro dark:text-white">approccio integrato</strong> che combina tecniche cognitive-comportamentali con elementi di mindfulness e terapia umanistica. Credo fortemente nell'importanza di personalizzare ogni intervento, perché ogni storia è unica e merita un percorso su misura.
      
      Offro consulenze sia <strong class="text-blu-scuro dark:text-white">online</strong> che <strong class="text-blu-scuro dark:text-white">in presenza</strong>, garantendo sempre la massima riservatezza e professionalità. Il mio obiettivo è creare uno spazio sicuro dove poter esplorare insieme le difficoltà e sviluppare strategie efficaci per il benessere.`,
      profile_image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      studio_address: "Via Roma 123, Bologna",
      studio_hours: "Lun-Ven: 9:00-19:00 | Sab: 9:00-13:00"
    };
    
    // 4. Contenuti per la Formazione Professionale
    const formationData = [
      {
        year: "2018",
        label: "Laurea Magistrale in Psicologia Clinica - Università di Bologna",
        order: 1
      },
      {
        year: "2019",
        label: "Abilitazione Professionale - Ordine Psicologi Emilia-Romagna",
        order: 2
      },
      {
        year: "2022",
        label: "Specializzazione in Terapia Cognitivo-Comportamentale",
        order: 3
      }
    ];
    
    // 5. Contenuto per la Quote
    const quoteData = {
      text: "Ogni persona ha una storia unica che merita di essere ascoltata con attenzione, rispetto e senza giudizio. Il mio ruolo è accompagnarti nel tuo percorso di crescita."
    };
    
    // 6. Contenuto per la sezione Contatti
    const contactData = {
      subtitle: "Sono qui per ascoltarti. Contattami per prenotare una consulenza o per qualsiasi informazione sui miei servizi.",
      whatsapp_number: "393123456789",
      whatsapp_message: "Ciao Martina, vorrei prenotare una consulenza"
    };
    
    // 7. Contenuti per i Contact Items
    const contactItemsData = [
      {
        icon: "phone",
        title: "Telefono",
        label: "+39 xxx xxx xxxx",
        order: 1
      },
      {
        icon: "email",
        title: "Email",
        label: "info@martinaevangelisti.it",
        order: 2
      },
      {
        icon: "location",
        title: "Studio",
        label: "Via Roma 123, Bologna (BO)",
        order: 3
      },
      {
        icon: "clock",
        title: "Orari",
        label: "Lun-Ven: 9-19 | Sab: 9-13",
        order: 4
      }
    ];
    
    // 8. Contenuti per i Social Links
    const socialLinksData = [
      {
        image: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
        label: "LinkedIn",
        style: "primary",
        url: "https://linkedin.com/in/martinaevangelisti",
        order: 1
      },
      {
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        label: "Instagram",
        style: "outline",
        url: "https://instagram.com/martinaevangelisti",
        order: 2
      }
    ];
    
    // Funzione helper per creare o aggiornare un contenuto
    const createOrUpdate = async (model, data, uniqueField = 'id') => {
      try {
        // Cerca se esiste già un contenuto
        const existing = await strapi.entityService.findMany(model, {
          filters: { [uniqueField]: data[uniqueField] || 1 },
          limit: 1
        });
        
        if (existing && existing.length > 0) {
          // Aggiorna il contenuto esistente
          const updated = await strapi.entityService.update(model, existing[0].id, {
            data: data
          });
          console.log(`✅ Aggiornato: ${model} ID ${updated.id}`);
          return updated;
        } else {
          // Crea nuovo contenuto
          const created = await strapi.entityService.create(model, {
            data: data
          });
          console.log(`✅ Creato: ${model} ID ${created.id}`);
          return created;
        }
      } catch (error) {
        console.error(`❌ Errore con ${model}:`, error);
        return null;
      }
    };
    
    // Popola i contenuti
    console.log('📝 Creazione contenuti Home...');
    await createOrUpdate('api::home.home', homeData);
    
    console.log('📝 Creazione contenuti Servizi...');
    for (const service of servicesData) {
      await createOrUpdate('api::service.service', service, 'title');
    }
    
    console.log('📝 Creazione contenuti Bio...');
    await createOrUpdate('api::bio.bio', bioData);
    
    console.log('📝 Creazione contenuti Formazione...');
    for (const formation of formationData) {
      await createOrUpdate('api::formation.formation', formation, 'label');
    }
    
    console.log('📝 Creazione contenuti Quote...');
    await createOrUpdate('api::quote.quote', quoteData);
    
    console.log('📝 Creazione contenuti Contatti...');
    await createOrUpdate('api::contact.contact', contactData);
    
    console.log('📝 Creazione contenuti Contact Items...');
    for (const item of contactItemsData) {
      await createOrUpdate('api::contact-item.contact-item', item, 'title');
    }
    
    console.log('📝 Creazione contenuti Social Links...');
    for (const social of socialLinksData) {
      await createOrUpdate('api::social-link.social-link', social, 'label');
    }
    
    console.log('🎉 Popolamento contenuti iniziali completato con successo!');
    
  } catch (error) {
    console.error('❌ Errore durante il popolamento dei contenuti:', error);
    process.exit(1);
  }
}

// Esegui il popolamento
seedData();