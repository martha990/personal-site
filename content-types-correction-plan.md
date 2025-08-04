# Piano di Correzione Content Type Strapi

## Analisi Attuale vs Desiderata

### Content Type Home ✅ CORRETTO
- **Desiderato**: Subtitle, Body, Immagine
- **Attuale**: subtitle, body, photo ✅
- **Azione**: Nessuna modifica necessaria

### Content Type Servizi ✅ CORRETTO
- **Desiderato**: Title, Description, Icon, Order
- **Attuale**: title, description, icon, order ✅
- **Azione**: Nessuna modifica necessaria

### Content Type Bio ❌ DA CORREGGERE
- **Desiderato**: Subtitle, Body
- **Attuale**: main_title, paragraph_1, paragraph_2, paragraph_3, quote
- **Azione**: Sostituire main_title con subtitle, unire i 3 paragrafi in un unico body, rimuovere quote

### Content Type Formazione ❌ DA CREARE
- **Desiderato**: Year, Label
- **Attuale**: Non esiste
- **Azione**: Creare nuovo Content Type

### Content Type Quote ❌ DA CREARE
- **Desiderato**: Text
- **Attuale**: Non esiste (il campo quote era nel Bio)
- **Azione**: Creare nuovo Content Type

### Content Type Contatti ❌ DA RICREARE
- **Desiderato**: Subtitle
- **Attuale**: phone, email, address, office_hours, instagram_url, linkedin_url
- **Azione**: Ricreare completamente il Content Type

### Content Type ContactItems ❌ DA CREARE
- **Desiderato**: Icon, Title, Label
- **Attuale**: Non esiste
- **Azione**: Creare nuovo Content Type

### Content Type SocialLinks ❌ DA CREARE
- **Desiderato**: Image, Label, Style
- **Attuale**: Non esiste
- **Azione**: Creare nuovo Content Type

## Dettaglio Modifiche Necessarie

### 1. Correzione Content Type Bio
**File**: `martina-cms/src/api/bio/content-types/bio/schema.json`
```json
{
  "kind": "collectionType",
  "collectionName": "bios",
  "info": {
    "singularName": "bio",
    "pluralName": "bios",
    "displayName": "Bio",
    "description": "Contenuti della sezione Chi Sono"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "subtitle": {
      "type": "string",
      "required": true,
      "pluginOptions": {}
    },
    "body": {
      "type": "richtext",
      "required": true,
      "pluginOptions": {}
    }
  }
}
```

### 2. Creazione Content Type Formazione
**File**: `martina-cms/src/api/formation/content-types/formation/schema.json`
```json
{
  "kind": "collectionType",
  "collectionName": "formations",
  "info": {
    "singularName": "formation",
    "pluralName": "formations",
    "displayName": "Formation",
    "description": "Formazione professionale"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "year": {
      "type": "string",
      "required": true,
      "pluginOptions": {}
    },
    "label": {
      "type": "text",
      "required": true,
      "pluginOptions": {}
    }
  }
}
```

### 3. Creazione Content Type Quote
**File**: `martina-cms/src/api/quote/content-types/quote/schema.json`
```json
{
  "kind": "collectionType",
  "collectionName": "quotes",
  "info": {
    "singularName": "quote",
    "pluralName": "quotes",
    "displayName": "Quote",
    "description": "Citazione personale"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "text": {
      "type": "text",
      "required": true,
      "pluginOptions": {}
    }
  }
}
```

### 4. Ricreazione Content Type Contatti
**File**: `martina-cms/src/api/contact/content-types/contact/schema.json`
```json
{
  "kind": "collectionType",
  "collectionName": "contacts",
  "info": {
    "singularName": "contact",
    "pluralName": "contacts",
    "displayName": "Contact",
    "description": "Informazioni di contatto"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "subtitle": {
      "type": "string",
      "required": true,
      "pluginOptions": {}
    }
  }
}
```

### 5. Creazione Content Type ContactItems
**File**: `martina-cms/src/api/contact-item/content-types/contact-item/schema.json`
```json
{
  "kind": "collectionType",
  "collectionName": "contact_items",
  "info": {
    "singularName": "contact-item",
    "pluralName": "contact-items",
    "displayName": "Contact Item",
    "description": "Elementi di contatto"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "icon": {
      "type": "string",
      "required": true,
      "pluginOptions": {}
    },
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {}
    },
    "label": {
      "type": "text",
      "required": true,
      "pluginOptions": {}
    }
  }
}
```

### 6. Creazione Content Type SocialLinks
**File**: `martina-cms/src/api/social-link/content-types/social-link/schema.json`
```json
{
  "kind": "collectionType",
  "collectionName": "social_links",
  "info": {
    "singularName": "social-link",
    "pluralName": "social-links",
    "displayName": "Social Link",
    "description": "Link social media"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": [
        "images"
      ],
      "pluginOptions": {}
    },
    "label": {
      "type": "string",
      "required": true,
      "pluginOptions": {}
    },
    "style": {
      "type": "string",
      "required": true,
      "pluginOptions": {}
    }
  }
}
```

## Policy da Creare

Per ogni nuovo Content Type, creare una policy `isPublic.js` nella rispettiva cartella `policies/`:

```javascript
'use strict';

module.exports = async (policyContext, config, { strapi }) => {
  // Permetti l'accesso pubblico alle API di lettura
  if (policyContext.request.method === 'GET') {
    return true;
  }
  
  // Per le operazioni di scrittura, verifica che l'utente sia autenticato
  if (policyContext.state.user) {
    return true;
  }
  
  return false;
};
```

## Prossimi Passi

1. Applicare tutte le modifiche ai file JSON
2. Creare le policy per i nuovi Content Type
3. Riavviare il server Strapi
4. Configurare i permessi nel pannello admin
5. Popolare i contenuti iniziali
6. Passare all'integrazione con il frontend