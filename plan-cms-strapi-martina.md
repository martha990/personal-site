# Piano Dettagliato - Sito Vetrina con Backoffice Strapi

## Obiettivo del Progetto
Trasformare il sito vetrina statico di Martina Evangelisti in un sito dinamico che carica i contenuti da un backoffice Strapi, permettendo alla psicologa di modificare autonomamente le sezioni principali del sito.

## Architettura del Sistema

### Stack Tecnologico
- **Frontend**: HTML, Tailwind CSS, JavaScript (mantenendo index.html esistente)
- **Backend**: Strapi (Headless CMS)
- **Database**: SQLite (sviluppo) / PostgreSQL (produzione)
- **Hosting**: Vercel/Netlify (frontend) + Heroku/Railway (Strapi)

## Fasi di Sviluppo

### Fase 1: Setup e Configurazione Strapi (Giorno 1)

#### 1.1 Installazione Strapi
```bash
# Creazione progetto Strapi
npx create-strapi-app@latest martina-cms --quickstart

# Accesso alla cartella del progetto
cd martina-cms

# Avvio server di sviluppo
npm run develop
```

#### 1.2 Configurazione Iniziale
- Accesso a http://localhost:1337/admin
- Creazione primo utente admin
- Configurazione impostazioni base

#### 1.3 Creazione Content Types
Creare i seguenti Content Type in Strapi:

**Home Content Type**
- `hero_title` (Text, Required)
- `hero_subtitle` (Text, Required)
- `hero_description` (Rich Text, Required)
- `whatsapp_button_text` (Text, Required)
- `whatsapp_number` (Text, Required)

**Service Content Type**
- `title` (Text, Required)
- `description` (Rich Text, Required)
- `icon` (Text, Required)
- `order` (Number, Required)

**Bio Content Type**
- `main_title` (Text, Required)
- `paragraph_1` (Rich Text, Required)
- `paragraph_2` (Rich Text, Required)
- `paragraph_3` (Rich Text, Required)
- `quote` (Text, Required)

**Credential Content Type**
- `year` (Text, Required)
- `title` (Text, Required)
- `description` (Text, Required)
- `order` (Number, Required)

**Contact Content Type**
- `phone` (Text, Required)
- `email` (Email, Required)
- `address` (Text, Required)
- `office_hours` (Text, Required)
- `instagram_url` (Text, Required)
- `linkedin_url` (Text, Required)

#### 1.4 Configurazione Permessi API
- Abilitare accesso pubblico per tutti i Content Type
- Configurare `find` e `findOne` per accesso pubblico
- Mantenere `create`, `update`, `delete` solo per utenti autenticati

### Fase 2: Popolamento Contenuti (Giorno 1)

#### 2.1 Creazione Contenuto Home
Inserire i contenuti attuali del sito nella sezione Home di Strapi:
- Hero title: "Martina Evangelisti"
- Hero subtitle: "Psicologa Clinica"
- Hero description: testo attuale della sezione hero
- WhatsApp button text: "Contattami su WhatsApp"
- WhatsApp number: "393123456789"

#### 2.2 Creazione Contenuti Servizi
Inserire i 4 servizi attuali:
1. Consulenza Psicologica (🧠)
2. Terapia di Coppia (💑)
3. Sostegno Familiare (👨‍👩‍👧‍👦)
4. Consulenza Breve (⚡)

#### 2.3 Creazione Contenuto Bio
Inserire i contenuti della sezione "Chi Sono":
- Main title: "Chi Sono"
- 3 paragrafi con i testi attuali
- Citazione in evidenza

#### 2.4 Creazione Credenziali
Inserire le 3 voci di formazione professionale:
- 2018: Laurea Magistrale
- 2019: Abilitazione Professionale
- 2022: Specializzazione

#### 2.5 Creazione Contenuti Contatti
Inserire le informazioni di contatto:
- Telefono, email, indirizzo, orari
- Link social media

### Fase 3: Integrazione Frontend (Giorno 2)

#### 3.1 Modifica di index.html
Aggiungere nella sezione `<head>`:
```html
<!-- API Client per Strapi -->
<script src="js/strapi-client.js"></script>
```

#### 3.2 Creazione file strapi-client.js
```javascript
// js/strapi-client.js
class StrapiClient {
  constructor() {
    this.apiURL = 'http://localhost:1337/api';
    this.token = null;
  }

  async getHome() {
    const response = await fetch(`${this.apiURL}/home?populate=*`);
    const data = await response.json();
    return data.data;
  }

  async getServices() {
    const response = await fetch(`${this.apiURL}/services?sort=order:asc`);
    const data = await response.json();
    return data.data;
  }

  async getBio() {
    const response = await fetch(`${this.apiURL}/bio?populate=credentials`);
    const data = await response.json();
    return data.data;
  }

  async getContacts() {
    const response = await fetch(`${this.apiURL}/contacts`);
    const data = await response.json();
    return data.data;
  }
}

// Istanza globale
window.strapiClient = new StrapiClient();
```

#### 3.3 Implementazione Caricamento Dinamico Home
Aggiungere in fondo a index.html, prima del tag `</body>`:
```html
<script>
  // Caricamento contenuti Home
  async function loadHomeContent() {
    try {
      const homeData = await strapiClient.getHome();
      const home = homeData.attributes;
      
      // Aggiorna hero section
      document.querySelector('.hero h1').textContent = home.hero_title;
      document.querySelector('.hero-tagline').textContent = home.hero_subtitle;
      document.querySelector('.hero-description').textContent = home.hero_description;
      
      // Aggiorna pulsanti WhatsApp
      const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
      whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${home.whatsapp_number}?text=Ciao%20Martina%2C%20vorrei%20informazioni%20sui%20tuoi%20servizi`;
      });
      
      const whatsappButtons = document.querySelectorAll('a:contains("Contattami su WhatsApp")');
      whatsappButtons.forEach(button => {
        if (button.textContent.includes('Contattami su WhatsApp')) {
          button.textContent = home.whatsapp_button_text;
        }
      });
    } catch (error) {
      console.error('Errore nel caricamento dei contenuti home:', error);
    }
  }
</script>
```

#### 3.4 Implementazione Caricamento Dinamico Servizi
```javascript
// Caricamento contenuti Servizi
async function loadServicesContent() {
  try {
    const servicesData = await strapiClient.getServices();
    const servicesGrid = document.querySelector('#servizi .grid');
    
    servicesGrid.innerHTML = servicesData.map(service => {
      const s = service.attributes;
      return `
        <div class="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blu-primario transition-colors duration-300">
            <span class="text-2xl group-hover:text-white transition-colors duration-300">${s.icon}</span>
          </div>
          <h3 class="text-xl font-semibold text-blu-scuro dark:text-white mb-4 text-center">
            ${s.title}
          </h3>
          <p class="text-grigio-medio dark:text-gray-400 text-center">
            ${s.description}
          </p>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Errore nel caricamento dei servizi:', error);
  }
}
```

#### 3.5 Implementazione Caricamento Dinamico Chi Sono
```javascript
// Caricamento contenuti Chi Sono
async function loadBioContent() {
  try {
    const bioData = await strapiClient.getBio();
    const bio = bioData.attributes;
    const credentials = bio.credentials.data;
    
    // Aggiorna titolo sezione
    document.querySelector('#chi-sono h2').textContent = bio.main_title;
    
    // Aggiorna paragrafi
    const paragraphs = document.querySelectorAll('#chi-sono .chi-sono-content p');
    if (paragraphs[0]) paragraphs[0].textContent = bio.paragraph_1;
    if (paragraphs[1]) paragraphs[1].textContent = bio.paragraph_2;
    if (paragraphs[2]) paragraphs[2].textContent = bio.paragraph_3;
    
    // Aggiorna citazione
    const quoteElement = document.querySelector('#chi-sono .bg-gradient-to-r p');
    if (quoteElement) quoteElement.textContent = `"${bio.quote}"`;
    
    // Aggiorna credenziali
    const credentialsContainer = document.querySelector('#chi-sono .space-y-4');
    if (credentialsContainer) {
      credentialsContainer.innerHTML = credentials.map(cred => {
        const c = cred.attributes;
        return `
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blu-primario rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong class="text-blu-scuro dark:text-white">${c.anno}:</strong>
              <span class="text-grigio-medio dark:text-gray-400">${c.title}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  } catch (error) {
    console.error('Errore nel caricamento dei contenuti bio:', error);
  }
}
```

#### 3.6 Implementazione Caricamento Dinamico Contatti
```javascript
// Caricamento contenuti Contatti
async function loadContactsContent() {
  try {
    const contactsData = await strapiClient.getContacts();
    const contacts = contactsData.attributes;
    
    // Aggiorna informazioni contatto
    const contactItems = document.querySelectorAll('#contatti .contact-item');
    if (contactItems[0]) contactItems[0].querySelector('span').textContent = contacts.phone;
    if (contactItems[1]) contactItems[1].querySelector('span').textContent = contacts.email;
    if (contactItems[2]) contactItems[2].querySelector('span').textContent = contacts.address;
    
    // Aggiorna orari
    const scheduleElement = document.querySelector('#contatti .text-grigio-medio:contains("Lun-Ven")');
    if (scheduleElement) scheduleElement.textContent = contacts.office_hours;
    
    // Aggiorna link social
    const instagramLink = document.querySelector('a[href*="instagram.com"]');
    if (instagramLink) instagramLink.href = contacts.instagram_url;
    
    const linkedinLink = document.querySelector('a[href*="linkedin.com"]');
    if (linkedinLink) linkedinLink.href = contacts.linkedin_url;
    
  } catch (error) {
    console.error('Errore nel caricamento dei contatti:', error);
  }
}
```

#### 3.7 Inizializzazione Caricamento Contenuti
```javascript
// Inizializzazione caricamento contenuti
document.addEventListener('DOMContentLoaded', function() {
  // Carica tutti i contenuti
  Promise.all([
    loadHomeContent(),
    loadServicesContent(),
    loadBioContent(),
    loadContactsContent()
  ]).then(() => {
    console.log('Tutti i contenuti sono stati caricati con successo');
    
    // Riattiva gli event listener dopo il caricamento dinamico
    initializeEventListeners();
  }).catch(error => {
    console.error('Errore durante il caricamento dei contenuti:', error);
  });
});

// Funzione per reinizializzare gli event listener
function initializeEventListeners() {
  // Service cards click
  document.querySelectorAll('#servizi .group').forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.querySelector('h3').textContent;
      const whatsappNumber = "393123456789"; // Potrebbe essere caricato da Strapi
      const message = `Ciao Martina, sono interessato/a al servizio "${serviceName}". Vorrei prenotare una consulenza.`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
  });
  
  // Altri event listener necessari...
}
```

### Fase 4: Testing e Ottimizzazione (Giorno 2)

#### 4.1 Testing Funzionalità
- Verifica caricamento corretto di tutte le sezioni
- Test aggiornamento contenuti in Strapi e refresh sito
- Test responsive design su diversi dispositivi
- Test performance tempi di caricamento

#### 4.2 Gestione Errori
- Implementazione fallback per contenuti non disponibili
- Messaggi di errore user-friendly
- Logging errori per debug

#### 4.3 Ottimizzazione Performance
- Aggiunta loading indicator durante il caricamento dei contenuti
- Implementazione cache per contenuti statici
- Ottimizzazione chiamate API

### Fase 5: Deploy e Documentazione (Giorno 3)

#### 5.1 Deploy Strapi
```bash
# Build per produzione
npm run build

# Deploy su Heroku/Railway
git push heroku main
```

#### 5.2 Deploy Frontend
- Caricare index.html e file associati su Vercel/Netlify
- Aggiornare URL API in strapi-client.js

#### 5.3 Documentazione per Martina
Creare una guida semplice per l'utilizzo del pannello admin:
1. Come accedere al pannello admin
2. Come modificare i contenuti della Home
3. Come aggiornare i Servizi
4. Come modificare la sezione Chi Sono
5. Come aggiornare i Contatti

#### 5.4 Documentazione Tecnica
Creare documentazione per replicare il sistema con altri clienti:
- Architettura del sistema
- Struttura Content Type Strapi
- Integrazione frontend
- Processo di deploy

## Timeline Complessiva

### Giorno 1: Setup Strapi e Contenuti
- Mattina: Installazione e configurazione Strapi
- Pomeriggio: Creazione Content Type e popolamento contenuti

### Giorno 2: Integrazione Frontend
- Mattina: Creazione API client e caricamento contenuti dinamici
- Pomeriggio: Testing e ottimizzazione

### Giorno 3: Deploy e Documentazione
- Mattina: Deploy su hosting
- Pomeriggio: Documentazione e consegna progetto

## Deliverable Finali

1. **Sito vetrina funzionante** con caricamento contenuti da Strapi
2. **Backoffice Strapi** configurato con tutti i contenuti
3. **Credenziali di accesso** per Martina
4. **Guida utente** per la gestione autonoma dei contenuti
5. **Documentazione tecnica** per replicare il sistema

## Costi e Risorse

### Sviluppo
- 3 giorni di lavoro
- Nessun costo software (Strapi è open source)

### Hosting (mensile)
- Strapi su Heroku/Railway: ~$7-25/mese
- Frontend su Vercel: Gratuito (tier base)
- Dominio: ~$15/anno

### Totale costi annuali: ~$100-300

## Success Metrics

- Tempo per modificare un contenuto: < 2 minuti
- Tempo di caricamento pagina: < 3 secondi
- Soddisfazione cliente: > 9/10
- Possibilità di replicare il sistema per altri clienti: 100%

## Conclusione

Questo piano permette di consegnare un sito vetrina professionale con backoffice in soli 3 giorni, creando al contempo un template riutilizzabile per futuri clienti. L'utilizzo di Strapi garantisce un backoffice solido e professionale senza dover sviluppare complesse funzionalità di backend da zero.