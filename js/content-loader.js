// Content Management System - Caricamento dinamico contenuti
class ContentLoader {
    constructor() {
        this.contentCache = {};
        console.log('ContentLoader inizializzato');
    }

    async loadContent(file) {
        if (this.contentCache[file]) {
            return this.contentCache[file];
        }

        try {
            const response = await fetch(`/content/${file}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.contentCache[file] = data;
            console.log(`Contenuto ${file} caricato:`, data);
            return data;
        } catch (error) {
            console.error(`Errore nel caricamento di ${file}:`, error);
            return null;
        }
    }

    async loadHeroContent() {
        const content = await this.loadContent('hero');
        if (!content) return;

        console.log('Aggiornamento sezione Hero...');

        // Aggiorna titolo principale
        const titleElement = document.querySelector('#home h1');
        if (titleElement) {
            titleElement.textContent = content.title;
            console.log('Titolo aggiornato:', content.title);
        }

        // Aggiorna sottotitolo
        const subtitleElement = document.querySelector('#home p.text-xl');
        if (subtitleElement) {
            subtitleElement.textContent = content.subtitle;
            console.log('Sottotitolo aggiornato:', content.subtitle);
        }

        // Aggiorna descrizione
        const descriptionElement = document.querySelector('#home p.text-lg');
        if (descriptionElement) {
            descriptionElement.textContent = content.description;
            console.log('Descrizione aggiornata');
        }

        // Aggiorna link WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            if (link.href.includes('informazioni') || link.textContent.includes('informazioni')) {
                link.href = content.whatsapp_link;
                console.log('Link WhatsApp aggiornato');
            }
        });

        // Aggiorna immagine se presente
        if (content.image) {
            const heroImages = document.querySelectorAll('#home img');
            heroImages.forEach(img => {
                img.src = content.image;
                console.log('Immagine hero aggiornata');
            });
        }
    }

    async loadAboutContent() {
        const content = await this.loadContent('about');
        if (!content) return;

        console.log('Aggiornamento sezione Chi Sono...');

        // Aggiorna titolo sezione
        const sectionTitle = document.querySelector('#chi-sono h2');
        if (sectionTitle) {
            sectionTitle.textContent = content.section_title;
            console.log('Titolo sezione aggiornato');
        }

        // Aggiorna sottotitolo sezione
        const sectionSubtitle = document.querySelector('#chi-sono .text-center p');
        if (sectionSubtitle) {
            sectionSubtitle.textContent = content.subtitle;
            console.log('Sottotitolo sezione aggiornato');
        }

        // Aggiorna paragrafi
        const paragraphs = document.querySelectorAll('#chi-sono .lg\\:col-span-2 .space-y-6 p');
        if (paragraphs[0] && content.paragraph_1) {
            paragraphs[0].innerHTML = content.paragraph_1.replace('Martina Evangelisti', '<strong class="text-blu-scuro dark:text-white">Martina Evangelisti</strong>');
            console.log('Paragrafo 1 aggiornato');
        }
        if (paragraphs[1] && content.paragraph_2) {
            paragraphs[1].innerHTML = content.paragraph_2.replace('approccio integrato', '<strong class="text-blu-scuro dark:text-white">approccio integrato</strong>');
            console.log('Paragrafo 2 aggiornato');
        }
        if (paragraphs[2] && content.paragraph_3) {
            paragraphs[2].innerHTML = content.paragraph_3.replace(/\b(online|in presenza)\b/g, '<strong class="text-blu-scuro dark:text-white">$1</strong>');
            console.log('Paragrafo 3 aggiornato');
        }

        // Aggiorna citazione
        const quote = document.querySelector('#chi-sono .bg-gradient-to-r p');
        if (quote) {
            quote.textContent = `"${content.quote}"`;
            console.log('Citazione aggiornata');
        }

        // Aggiorna immagine se presente
        if (content.image) {
            const aboutImages = document.querySelectorAll('#chi-sono img');
            aboutImages.forEach(img => {
                img.src = content.image;
                console.log('Immagine Chi Sono aggiornata');
            });
        }
    }

    async loadServicesContent() {
        const content = await this.loadContent('services');
        if (!content) return;

        console.log('Aggiornamento sezione Servizi...');

        // Aggiorna titolo sezione
        const sectionTitle = document.querySelector('#servizi h2');
        if (sectionTitle) {
            sectionTitle.textContent = content.section_title;
            console.log('Titolo servizi aggiornato');
        }

        // Aggiorna descrizione sezione
        const sectionDescription = document.querySelector('#servizi .text-center p');
        if (sectionDescription) {
            sectionDescription.textContent = content.section_description;
            console.log('Descrizione servizi aggiornata');
        }

        // Aggiorna servizi
        const serviceCards = document.querySelectorAll('#servizi .grid > .group');
        content.services_list.forEach((service, index) => {
            if (serviceCards[index]) {
                const emoji = serviceCards[index].querySelector('span.text-2xl');
                const title = serviceCards[index].querySelector('h3');
                const description = serviceCards[index].querySelector('p');

                if (emoji) {
                    emoji.textContent = service.emoji;
                    console.log(`Emoji servizio ${index + 1} aggiornata`);
                }
                if (title) {
                    title.textContent = service.title;
                    console.log(`Titolo servizio ${index + 1} aggiornato`);
                }
                if (description) {
                    description.textContent = service.description;
                    console.log(`Descrizione servizio ${index + 1} aggiornata`);
                }
            }
        });
    }

    async loadContactContent() {
        const content = await this.loadContent('contact');
        if (!content) return;

        console.log('Aggiornamento sezione Contatti...');

        // Aggiorna titolo sezione
        const sectionTitle = document.querySelector('#contatti h2');
        if (sectionTitle) {
            sectionTitle.textContent = content.section_title;
            console.log('Titolo contatti aggiornato');
        }

        // Aggiorna descrizione sezione
        const sectionDescription = document.querySelector('#contatti .text-center p');
        if (sectionDescription) {
            sectionDescription.textContent = content.section_description;
            console.log('Descrizione contatti aggiornata');
        }

        // Aggiorna informazioni di contatto con selettori più specifici
        const contactGrid = document.querySelector('#contatti .grid');
        if (contactGrid) {
            const contactItems = contactGrid.querySelectorAll('.flex.items-center.space-x-4');
            
            contactItems.forEach(item => {
                const label = item.querySelector('p.font-semibold');
                const value = item.querySelector('p.text-grigio-medio');
                
                if (label && value) {
                    if (label.textContent === 'Telefono') {
                        value.textContent = content.phone;
                        console.log('Telefono aggiornato');
                    } else if (label.textContent === 'Email') {
                        value.textContent = content.email;
                        console.log('Email aggiornata');
                    } else if (label.textContent === 'Studio') {
                        value.textContent = content.address;
                        console.log('Indirizzo aggiornato');
                    } else if (label.textContent === 'Orari') {
                        value.textContent = content.hours;
                        console.log('Orari aggiornati');
                    }
                }
            });
        }

        // Aggiorna link WhatsApp consulenza
        const consultationLinks = document.querySelectorAll('a[href*="prenotare"], a[href*="consulenza"]');
        consultationLinks.forEach(link => {
            link.href = content.whatsapp_consultation;
            console.log('Link WhatsApp consulenza aggiornato');
        });

        // Aggiorna link social
        const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
        linkedinLinks.forEach(link => {
            link.href = content.linkedin;
            console.log('Link LinkedIn aggiornato');
        });

        const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
        instagramLinks.forEach(link => {
            link.href = content.instagram;
            console.log('Link Instagram aggiornato');
        });
    }

    async loadEducationContent() {
        const content = await this.loadContent('education');
        if (!content) return;

        console.log('Aggiornamento sezione Formazione...');

        // Trova il container della formazione specifico
        const educationContainer = document.querySelector('#chi-sono .space-y-4');
        if (!educationContainer) {
            console.error('Container formazione non trovato');
            return;
        }

        // Pulisce il contenuto esistente
        educationContainer.innerHTML = '';

        // Aggiunge gli elementi di formazione
        content.education_list.forEach(item => {
            const educationItem = document.createElement('div');
            educationItem.className = 'flex items-start space-x-3';
            educationItem.innerHTML = `
                <div class="w-2 h-2 bg-blu-primario rounded-full mt-2 flex-shrink-0"></div>
                <div>
                    <strong class="text-blu-scuro dark:text-white">${item.year}:</strong>
                    <span class="text-grigio-medio dark:text-gray-400">${item.title}</span>
                </div>
            `;
            educationContainer.appendChild(educationItem);
            console.log(`Formazione ${item.year} aggiunta`);
        });
    }

    async loadAllContent() {
        try {
            console.log('=== Inizio caricamento contenuti ===');
            await Promise.all([
                this.loadHeroContent(),
                this.loadAboutContent(),
                this.loadServicesContent(),
                this.loadContactContent(),
                this.loadEducationContent()
            ]);
            console.log('=== Tutti i contenuti sono stati caricati con successo ===');
        } catch (error) {
            console.error('Errore nel caricamento dei contenuti:', error);
        }
    }
}

// Inizializza il Content Loader
window.contentLoader = new ContentLoader();
window.loadAllContent = () => window.contentLoader.loadAllContent();