#!/usr/bin/env node
'use strict';

/**
 * Script semplificato per popolare i contenuti iniziali usando le API REST
 * Prerequisito: Strapi DEVE essere in esecuzione su localhost:1337
 * 
 * Uso: node scripts/simple-seed.js
 */

// Verifica se axios è installato
let axios;
try {
  axios = require('axios');
} catch (e) {
  console.error('❌ Axios non trovato. Installa con: npm install axios');
  process.exit(1);
}

const API_URL = 'http://localhost:1337';

// Token di autenticazione (puoi ottenerlo dal pannello admin)
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1MTIzNDU2LCJleHAiOjE2MjUyMDk4NTZ9.9Q1p3r6q7Y8X2b3Z4c5D6n7E8f9G0h1I2j3K4l5M6n7';

// Configurazione axios con autenticazione
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Dati da inserire
const data = {
  home: {
    title: "Martina Evangelisti",
    subtitle: "Psicologa Clinica",
    description: "Supporto professionale per il tuo benessere psicologico attraverso consulenze personalizzate in un ambiente accogliente e riservato.",
    hero_image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp_number: "393123456789",
    whatsapp_message: "Ciao Martina, vorrei informazioni sui tuoi servizi"
  },
  services: [
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
  ],
  bio: {
    subtitle: "Psicologa clinica con passione per il benessere delle persone e specializzazione in terapia cognitivo-comportamentale.",
    body: `Sono Martina Evangelisti, psicologa clinica specializzata nel supporto a persone che attraversano momenti di difficoltà emotiva, relazionale o psicologica. La mia passione per la psicologia nasce dalla convinzione che ogni persona abbia dentro di sé le risorse necessarie per stare bene.
    
    Nel mio lavoro utilizzo un approccio integrato che combina tecniche cognitive-comportamentali con elementi di mindfulness e terapia umanistica. Credo fortemente nell'importanza di personalizzare ogni intervento, perché ogni storia è unica e merita un percorso su misura.
    
    Offro consulenze sia online che in presenza, garantendo sempre la massima riservatezza e professionalità. Il mio obiettivo è creare uno spazio sicuro dove poter esplorare insieme le difficoltà e sviluppare strategie efficaci per il benessere.`,
    profile_image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    studio_address: "Via Roma 123, Bologna",
    studio_hours: "Lun-Ven: 9:00-19:00 | Sab: 9:00-13:00"
  },
  formation: [
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
  ],
  quote: {
    text: "Ogni persona ha una storia unica che merita di essere ascoltata con attenzione, rispetto e senza giudizio. Il mio ruolo è accompagnarti nel tuo percorso di crescita."
  },
  contact: {
    subtitle: "Sono qui per ascoltarti. Contattami per prenotare una consulenza o per qualsiasi informazione sui miei servizi.",
    whatsapp_number: "393123456789",
    whatsapp_message: "Ciao Martina, vorrei prenotare una consulenza"
  },
  contactItems: [
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
  ],
  socialLinks: [
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
  ]
};

async function seedData() {
  try {
    console.log('🌱 Inizio popolamento contenuti iniziali...');
    
    // Home
    console.log('📝 Creazione Home...');
    const homeResponse = await axios.post(`${API_URL}/api/homes`, { data: data.home });
    console.log('✅ Home creata:', homeResponse.data.data.id);
    
    // Services
    console.log('📝 Creazione Services...');
    for (const service of data.services) {
      const serviceResponse = await axios.post(`${API_URL}/api/services`, { data: service });
      console.log(`✅ Service "${service.title}" creato:`, serviceResponse.data.data.id);
    }
    
    // Bio
    console.log('📝 Creazione Bio...');
    const bioResponse = await axios.post(`${API_URL}/api/bios`, { data: data.bio });
    console.log('✅ Bio creata:', bioResponse.data.data.id);
    
    // Formation
    console.log('📝 Creazione Formation...');
    for (const formation of data.formation) {
      const formationResponse = await axios.post(`${API_URL}/api/formations`, { data: formation });
      console.log(`✅ Formation "${formation.label}" creata:`, formationResponse.data.data.id);
    }
    
    // Quote
    console.log('📝 Creazione Quote...');
    const quoteResponse = await axios.post(`${API_URL}/api/quotes`, { data: data.quote });
    console.log('✅ Quote creata:', quoteResponse.data.data.id);
    
    // Contact
    console.log('📝 Creazione Contact...');
    const contactResponse = await axios.post(`${API_URL}/api/contacts`, { data: data.contact });
    console.log('✅ Contact creata:', contactResponse.data.data.id);
    
    // Contact Items
    console.log('📝 Creazione Contact Items...');
    for (const item of data.contactItems) {
      const itemResponse = await axios.post(`${API_URL}/api/contact-items`, { data: item });
      console.log(`✅ Contact Item "${item.title}" creato:`, itemResponse.data.data.id);
    }
    
    // Social Links
    console.log('📝 Creazione Social Links...');
    for (const social of data.socialLinks) {
      const socialResponse = await axios.post(`${API_URL}/api/social-links`, { data: social });
      console.log(`✅ Social Link "${social.label}" creato:`, socialResponse.data.data.id);
    }
    
    console.log('🎉 Popolamento completato con successo!');
    
  } catch (error) {
    console.error('❌ Errore durante il popolamento:', error.response ? error.response.data : error.message);
  }
}

// Esegui il popolamento
seedData();