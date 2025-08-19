# Sistema di Seeding per Strapi

## Come Funziona

Il seeding del database avviene automaticamente all'avvio di Strapi attraverso il sistema di bootstrap.

### File Principali

1. **`/config/bootstrap.js`** - Eseguito automaticamente all'avvio di Strapi
2. **`/scripts/seed-initial-data.js`** - Contiene i dati di default da inserire
3. **`/scripts/bootstrap-permissions.js`** - Configura i permessi pubblici

### Processo di Seeding

1. Quando avvii Strapi con `npm run dev` o `npm start`
2. Il file `bootstrap.js` viene eseguito automaticamente
3. Chiama `seed-initial-data.js` che popola il database con i dati iniziali
4. I dati vengono inseriti SOLO se il database è vuoto

### Come Re-Seedare il Database

Se vuoi resettare e ri-popolare il database:

```bash
# 1. Ferma Strapi (Ctrl+C)

# 2. Elimina il database SQLite
rm .tmp/data.db

# 3. Riavvia Strapi
npm run dev
```

Il database verrà ricreato e popolato automaticamente con i dati di default.

### Modificare i Dati di Default

Apri il file `seed-initial-data.js` e modifica i valori nelle seguenti sezioni:

- **homeData** - Testi della homepage
- **servicesData** - Elenco servizi offerti
- **bioData** - Biografia della dottoressa
- **formationData** - Percorso formativo
- **quoteData** - Citazione motivazionale
- **contactData** - Informazioni di contatto
- **contactItemsData** - Dettagli contatti (telefono, email, ecc.)
- **socialLinksData** - Link social

### Note Importanti

- Il seeding avviene SOLO quando il database è vuoto
- Non è necessario usare script esterni o token API
- Questo è il metodo ufficiale raccomandato da Strapi
- I dati vengono inseriti usando l'Entity Service API di Strapi

### Esempio di Modifica

Per cambiare il nome della psicologa:

```javascript
// In seed-initial-data.js, cerca bioData
const bioData = {
  subtitle: "Psicologa clinica con passione...",
  body: `Sono <strong>Martina Evangelisti</strong>...`, // Cambia qui il nome
  publishedAt: new Date()
};
```

Dopo aver modificato i dati, segui la procedura di re-seeding sopra descritta.