'use strict';

/**
 * Script per popolare i contenuti iniziali usando le API REST di Strapi
 * Richiede un token JWT valido
 */

const axios = require('axios');

const API_URL = 'http://localhost:1337';

// Token JWT da ottenere dal pannello admin
// Per ottenere il token:
// 1. Accedi al pannello admin: http://localhost:1337/admin
// 2. Vai in Settings > API Tokens
// 3. Crea un nuovo token con tutti i permessi
// 4. Copia il token qui sotto
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
    body: `Sono <strong class="text-blu-scuro dark:text-white">Martina Evangelisti</strong>, psicologa clinica specializzata nel supporto a persone che attraversano momenti di difficoltà emotiva, relazionale o psicologica. La mia passione per la psicologia nasce dalla convinzione che ogni persona abbia dentro di sé le risorse necessarie per stare bene.
    
    Nel mio lavoro utilizzo un <strong class="text-blu-scuro dark:text-white">approccio integrato</strong> che combina tecniche cognitive-comportamentali con elementi di mindfulness e terapia umanistica. Credo fortemente nell'importanza di personalizzare ogni intervento, perché ogni storia è unica e merita un percorso su misura.
    
    Offro consulenze sia <strong class="text-blu-scuro dark:text-white">online</strong> che <strong class="text-blu-scuro dark:text-white">in presenza</strong>, garantendo sempre la massima riservatezza e professionalità. Il mio obiettivo è creare uno spazio sicuro dove poter esplorare insieme le difficoltà e sviluppare strategie efficaci per il benessere.`,
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
    
    // Verifica la connessione
    const healthCheck = await api.get('/_health');
    console.log('✅ Connessione a Strapi API stabilita');
    
    // Home
    console.log('📝 Creazione Home...');
    try {
      const homeResponse = await api.post('/api/homes', { data: data.home });
      console.log('✅ Home creata:', homeResponse.data.data.id);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('ℹ️ Home probabilmente già esistente');
      } else {
        throw error;
      }
    }
    
    // Services
    console.log('📝 Creazione Services...');
    for (const service of data.services) {
      try {
        const serviceResponse = await api.post('/api/services', { data: service });
        console.log(`✅ Service "${service.title}" creato:`, serviceResponse.data.data.id);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(`ℹ️ Service "${service.title}" probabilmente già esistente`);
        } else {
          throw error;
        }
      }
    }
    
    // Bio
    console.log('📝 Creazione Bio...');
    try {
      const bioResponse = await api.post('/api/bios', { data: data.bio });
      console.log('✅ Bio creata:', bioResponse.data.data.id);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('ℹ️ Bio probabilmente già esistente');
      } else {
        throw error;
      }
    }
    
    // Formation
    console.log('📝 Creazione Formation...');
    for (const formation of data.formation) {
      try {
        const formationResponse = await api.post('/api/formations', { data: formation });
        console.log(`✅ Formation "${formation.label}" creata:`, formationResponse.data.data.id);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(`ℹ️ Formation "${formation.label}" probabilmente già esistente`);
        } else {
          throw error;
        }
      }
    }
    
    // Quote
    console.log('📝 Creazione Quote...');
    try {
      const quoteResponse = await api.post('/api/quotes', { data: data.quote });
      console.log('✅ Quote creata:', quoteResponse.data.data.id);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('ℹ️ Quote probabilmente già esistente');
      } else {
        throw error;
      }
    }
    
    // Contact
    console.log('📝 Creazione Contact...');
    try {
      const contactResponse = await api.post('/api/contacts', { data: data.contact });
      console.log('✅ Contact creata:', contactResponse.data.data.id);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('ℹ️ Contact probabilmente già esistente');
      } else {
        throw error;
      }
    }
    
    // Contact Items
    console.log('📝 Creazione Contact Items...');
    for (const item of data.contactItems) {
      try {
        const itemResponse = await api.post('/api/contact-items', { data: item });
        console.log(`✅ Contact Item "${item.title}" creato:`, itemResponse.data.data.id);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(`ℹ️ Contact Item "${item.title}" probabilmente già esistente`);
        } else {
          throw error;
        }
      }
    }
    
    // Social Links
    console.log('📝 Creazione Social Links...');
    for (const social of data.socialLinks) {
      try {
        const socialResponse = await api.post('/api/social-links', { data: social });
        console.log(`✅ Social Link "${social.label}" creato:`, socialResponse.data.data.id);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(`ℹ️ Social Link "${social.label}" probabilmente già esistente`);
        } else {
          throw error;
        }
      }
    }
    
    console.log('🎉 Popolamento completato con successo!');
    
  } catch (error) {
    console.error('❌ Errore durante il popolamento:', error.response ? error.response.data : error.message);
    process.exit(1);
  }
}

// Esegui il popolamento
seedData();