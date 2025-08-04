'use strict';

/**
 * Script manuale migliorato per popolare Strapi con dati iniziali
 * Da eseguire con: node scripts/manual-seed-fixed.js
 * 
 * PREREQUISITI:
 * 1. Il server Strapi deve essere in esecuzione su localhost:1337
 * 2. Devi avere un token di API o aver configurato permessi pubblici
 */

const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_BASE = `${STRAPI_URL}/api`;

// Token API - lascia vuoto se hai permessi pubblici configurati
const API_TOKEN = ''; // Se necessario, inserisci qui il tuo token API

const headers = {
  'Content-Type': 'application/json',
  ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` })
};

async function makeRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${API_BASE}${endpoint}`,
      headers,
      ...(data && { data })
    };
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Errore ${method} ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
}

async function seedData() {
  try {
    console.log('🌱 Inizio popolamento contenuti iniziali via API...');
    
    // 1. Contenuto Home
    console.log('📝 Creazione contenuto Home...');
    const homeData = {
      data: {
        subtitle: "Psicologa Clinica",
        body: "Supporto professionale per il tuo benessere psicologico attraverso consulenze personalizzate in un ambiente accogliente e riservato."
      }
    };
    await makeRequest('POST', '/homes', homeData);

    // 2. Servizi
    console.log('📝 Creazione servizi...');
    const services = [
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

    for (const service of services) {
      await makeRequest('POST', '/services', { data: service });
    }

    // 3. Bio
    console.log('📝 Creazione Bio...');
    const bioData = {
      data: {
        subtitle: "Psicologa clinica con passione per il benessere delle persone e specializzazione in terapia cognitivo-comportamentale.",
        body: `Sono **Martina Evangelisti**, psicologa clinica specializzata nel supporto a persone che attraversano momenti di difficoltà emotiva, relazionale o psicologica. La mia passione per la psicologia nasce dalla convinzione che ogni persona abbia dentro di sé le risorse necessarie per stare bene.

Nel mio lavoro utilizzo un **approccio integrato** che combina tecniche cognitive-comportamentali con elementi di mindfulness e terapia umanistica. Credo fortemente nell'importanza di personalizzare ogni intervento, perché ogni storia è unica e merita un percorso su misura.

Offro consulenze sia **online** che **in presenza**, garantendo sempre la massima riservatezza e professionalità. Il mio obiettivo è creare uno spazio sicuro dove poter esplorare insieme le difficoltà e sviluppare strategie efficaci per il benessere.`
      }
    };
    await makeRequest('POST', '/bios', bioData);

    // 4. Formazione
    console.log('📝 Creazione formazione...');
    const formations = [
      {
        year: "2018",
        label: "Laurea Magistrale in Psicologia Clinica - Università di Bologna"
      },
      {
        year: "2019",
        label: "Abilitazione Professionale - Ordine Psicologi Emilia-Romagna"
      },
      {
        year: "2022",
        label: "Specializzazione in Terapia Cognitivo-Comportamentale"
      }
    ];

    for (const formation of formations) {
      await makeRequest('POST', '/formations', { data: formation });
    }

    // 5. Quote
    console.log('📝 Creazione quote...');
    const quoteData = {
      data: {
        text: "Ogni persona ha una storia unica che merita di essere ascoltata con attenzione, rispetto e senza giudizio. Il mio ruolo è accompagnarti nel tuo percorso di crescita."
      }
    };
    await makeRequest('POST', '/quotes', quoteData);

    // 6. Contatti
    console.log('📝 Creazione contatti...');
    const contactData = {
      data: {
        subtitle: "Sono qui per ascoltarti. Contattami per prenotare una consulenza o per qualsiasi informazione sui miei servizi."
      }
    };
    await makeRequest('POST', '/contacts', contactData);

    // 7. Contact Items
    console.log('📝 Creazione contact items...');
    const contactItems = [
      {
        icon: "phone",
        title: "Telefono",
        label: "+39 xxx xxx xxxx"
      },
      {
        icon: "email",
        title: "Email",
        label: "info@martinaevangelisti.it"
      },
      {
        icon: "location",
        title: "Studio",
        label: "Via Roma 123, Bologna (BO)"
      },
      {
        icon: "clock",
        title: "Orari",
        label: "Lun-Ven: 9-19 | Sab: 9-13"
      }
    ];

    for (const item of contactItems) {
      await makeRequest('POST', '/contact-items', { data: item });
    }

    // 8. Social Links
    console.log('📝 Creazione social links...');
    const socialLinks = [
      {
        label: "LinkedIn",
        style: "primary"
      },
      {
        label: "Instagram",
        style: "outline"
      }
    ];

    for (const social of socialLinks) {
      await makeRequest('POST', '/social-links', { data: social });
    }

    console.log('🎉 Popolamento completato con successo!');

  } catch (error) {
    console.error('❌ Errore durante il popolamento:', error);
  }
}

// Funzione di supporto per verificare la connessione
async function checkConnection() {
  try {
    const response = await axios.get(`${STRAPI_URL}/admin/init`);
    console.log('✅ Connessione a Strapi verificata');
    return true;
  } catch (error) {
    console.error('❌ Impossibile connettersi a Strapi. Assicurati che sia in esecuzione su localhost:1337');
    return false;
  }
}

// Esecuzione principale
async function main() {
  console.log('🚀 Avvio script di popolamento Strapi...');
  
  const isConnected = await checkConnection();
  if (!isConnected) {
    process.exit(1);
  }

  await seedData();
}

// Installa axios se non presente
try {
  require('axios');
} catch (error) {
  console.error('❌ Axios non trovato. Installa con: npm install axios');
  process.exit(1);
}

main();