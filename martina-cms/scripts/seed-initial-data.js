'use strict';

/**
 * Script per popolare automaticamente i contenuti iniziali in Strapi
 * Utilizza i dati estratti dal file index.html per creare contenuti di esempio
 */

module.exports = async ({ strapi }) => {
  try {
    console.log('🌱 Inizio popolamento contenuti iniziali...');
    
    // Dati estratti da index.html per ogni Content Type
    
    // 1. Contenuto per la sezione Home (campi corretti: subtitle, body)
    const homeData = {
      subtitle: "Psicologa Clinica",
      body: "Supporto professionale per il tuo benessere psicologico attraverso consulenze personalizzate in un ambiente accogliente e riservato.",
      publishedAt: new Date()
    };
    
    // 2. Contenuti per i Servizi (campi corretti: title, description, icon, order)
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
    
    // 3. Contenuto per la sezione Chi Sono (Bio) - campi corretti: subtitle, body
    const bioData = {
      subtitle: "Psicologa clinica con passione per il benessere delle persone e specializzazione in terapia cognitivo-comportamentale.",
      body: `Sono <strong>Martina Evangelisti</strong>, psicologa clinica specializzata nel supporto a persone che attraversano momenti di difficoltà emotiva, relazionale o psicologica. La mia passione per la psicologia nasce dalla convinzione che ogni persona abbia dentro di sé le risorse necessarie per stare bene.

Nel mio lavoro utilizzo un <strong>approccio integrato</strong> che combina tecniche cognitive-comportamentali con elementi di mindfulness e terapia umanistica. Credo fortemente nell'importanza di personalizzare ogni intervento, perché ogni storia è unica e merita un percorso su misura.

Offro consulenze sia <strong>online</strong> che <strong>in presenza</strong>, garantendo sempre la massima riservatezza e professionalità. Il mio obiettivo è creare uno spazio sicuro dove poter esplorare insieme le difficoltà e sviluppare strategie efficaci per il benessere.`,
      publishedAt: new Date()
    };
    
    // 4. Contenuti per la Formazione Professionale (campi corretti: year, label)
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
    
    // 5. Contenuto per la Quote (campi corretti: text)
    const quoteData = {
      text: "Ogni persona ha una storia unica che merita di essere ascoltata con attenzione, rispetto e senza giudizio. Il mio ruolo è accompagnarti nel tuo percorso di crescita.",
      publishedAt: new Date()
    };
    
    // 6. Contenuto per la sezione Contatti (campi corretti: subtitle)
    const contactData = {
      subtitle: "Sono qui per ascoltarti. Contattami per prenotare una consulenza o per qualsiasi informazione sui miei servizi.",
      publishedAt: new Date()
    };
    
    // 7. Contenuti per i Contact Items (campi corretti: icon, title, label)
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
    
    // 8. Contenuti per i Social Links (campi corretti: label, style - image richiede media upload)
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
    
    // Funzione helper per creare o aggiornare un contenuto (Strapi v5)
    const createContent = async (model, data) => {
      try {
        // Elimina tutti i contenuti esistenti per questo model
        const existing = await strapi.entityService.findMany(model);
        for (const item of existing) {
          await strapi.entityService.delete(model, item.id);
        }
        
        // Crea nuovo contenuto
        const created = await strapi.entityService.create(model, {
          data: data
        });
        console.log(`✅ Creato: ${model} ID ${created.id}`);
        return created;
      } catch (error) {
        console.error(`❌ Errore con ${model}:`, error.message);
        return null;
      }
    };
    
    const createMultipleContent = async (model, dataArray, uniqueField = 'title') => {
      try {
        // Elimina tutti i contenuti esistenti per questo model
        const existing = await strapi.entityService.findMany(model);
        for (const item of existing) {
          await strapi.entityService.delete(model, item.id);
        }
        
        // Crea nuovi contenuti
        const results = [];
        for (const data of dataArray) {
          const created = await strapi.entityService.create(model, {
            data: data
          });
          console.log(`✅ Creato: ${model} - ${data[uniqueField]} ID ${created.id}`);
          results.push(created);
        }
        return results;
      } catch (error) {
        console.error(`❌ Errore con ${model}:`, error.message);
        return [];
      }
    };
    
    // Popola i contenuti usando le nuove funzioni
    console.log('📝 Creazione contenuti Home...');
    await createContent('api::home.home', homeData);
    
    console.log('📝 Creazione contenuti Servizi...');
    await createMultipleContent('api::service.service', servicesData, 'title');
    
    console.log('📝 Creazione contenuti Bio...');
    await createContent('api::bio.bio', bioData);
    
    console.log('📝 Creazione contenuti Formazione...');
    await createMultipleContent('api::formation.formation', formationData, 'label');
    
    console.log('📝 Creazione contenuti Quote...');
    await createContent('api::quote.quote', quoteData);
    
    console.log('📝 Creazione contenuti Contatti...');
    await createContent('api::contact.contact', contactData);
    
    console.log('📝 Creazione contenuti Contact Items...');
    await createMultipleContent('api::contact-item.contact-item', contactItemsData, 'title');
    
    console.log('📝 Creazione contenuti Social Links...');
    await createMultipleContent('api::social-link.social-link', socialLinksData, 'label');
    
    console.log('🎉 Popolamento contenuti iniziali completato con successo!');
    
  } catch (error) {
    console.error('❌ Errore durante il popolamento dei contenuti:', error);
  }
};