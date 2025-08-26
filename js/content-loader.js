// Content Management System - Caricamento dinamico contenuti
class ContentLoader {
    constructor() {
        this.contentCache = {};
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
            return data;
        } catch (error) {
            console.error(`Errore nel caricamento di ${file}:`, error);
            return null;
        }
    }

    async loadHeroContent() {
        const content = await this.loadContent('hero');
        if (!content) return;

        // Aggiorna titolo
        const titleElement = document.querySelector('h1.font-dancing');
        if (titleElement) titleElement.textContent = content.title;

        // Aggiorna sottotitolo
        const subtitleElements = document.querySelectorAll('p.text-xl.lg\\:text-2xl');
        if (subtitleElements[0]) subtitleElements[0].textContent = content.subtitle;

        // Aggiorna descrizione
        const descriptionElements = document.querySelectorAll('p.text-lg.lg\\:text-xl');
        if (descriptionElements[0]) descriptionElements[0].textContent = content.description;

        // Aggiorna link WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            if (link.textContent.includes('informazioni')) {
                link.href = content.whatsapp_link;
            }
        });

        // Aggiorna immagine se presente
        if (content.image) {
            const heroImages = document.querySelectorAll('img[alt*="Martina Evangelisti"]');
            heroImages.forEach(img => img.src = content.image);
        }
    }

    async loadAboutContent() {
        const content = await this.loadContent('about');
        if (!content) return;

        // Aggiorna titolo sezione
        const sectionTitle = document.querySelector('#chi-sono h2');
        if (sectionTitle) sectionTitle.textContent = content.section_title;

        // Aggiorna sottotitolo sezione
        const sectionSubtitle = document.querySelector('#chi-sono .text-center p');
        if (sectionSubtitle) sectionSubtitle.textContent = content.subtitle;

        // Aggiorna paragrafi
        const paragraphs = document.querySelectorAll('#chi-sono .lg\\:col-span-2 p');
        if (paragraphs[0]) paragraphs[0].innerHTML = content.paragraph_1.replace('Martina Evangelisti', '<strong class="text-blu-scuro dark:text-white">Martina Evangelisti</strong>').replace('approccio integrato', '<strong class="text-blu-scuro dark:text-white">approccio integrato</strong>');
        if (paragraphs[1]) paragraphs[1].innerHTML = content.paragraph_2.replace('approccio integrato', '<strong class="text-blu-scuro dark:text-white">approccio integrato</strong>');
        if (paragraphs[2]) paragraphs[2].innerHTML = content.paragraph_3.replace('online', '<strong class="text-blu-scuro dark:text-white">online</strong>').replace('in presenza', '<strong class="text-blu-scuro dark:text-white">in presenza</strong>');

        // Aggiorna citazione
        const quote = document.querySelector('.bg-gradient-to-r p');
        if (quote) quote.textContent = `"${content.quote}"`;

        // Aggiorna immagine se presente
        if (content.image) {
            const aboutImages = document.querySelectorAll('#chi-sono img');
            aboutImages.forEach(img => img.src = content.image);
        }
    }

    async loadServicesContent() {
        const content = await this.loadContent('services');
        if (!content) return;

        // Aggiorna titolo sezione
        const sectionTitle = document.querySelector('#servizi h2');
        if (sectionTitle) sectionTitle.textContent = content.section_title;

        // Aggiorna descrizione sezione
        const sectionDescription = document.querySelector('#servizi .text-center p');
        if (sectionDescription) sectionDescription.textContent = content.section_description;

        // Aggiorna servizi
        const serviceCards = document.querySelectorAll('#servizi .grid > div');
        content.services_list.forEach((service, index) => {
            if (serviceCards[index]) {
                const emoji = serviceCards[index].querySelector('span.text-2xl');
                const title = serviceCards[index].querySelector('h3');
                const description = serviceCards[index].querySelector('p.text-grigio-medio');

                if (emoji) emoji.textContent = service.emoji;
                if (title) title.textContent = service.title;
                if (description) description.textContent = service.description;
            }
        });
    }

    async loadContactContent() {
        const content = await this.loadContent('contact');
        if (!content) return;

        // Aggiorna titolo sezione
        const sectionTitle = document.querySelector('#contatti h2');
        if (sectionTitle) sectionTitle.textContent = content.section_title;

        // Aggiorna descrizione sezione
        const sectionDescription = document.querySelector('#contatti .text-center p');
        if (sectionDescription) sectionDescription.textContent = content.section_description;

        // Aggiorna informazioni di contatto
        const phoneElement = document.querySelector('#contatti p:contains("xxx")');
        if (phoneElement) phoneElement.textContent = content.phone;

        const emailElement = document.querySelector('#contatti p:contains("martinaevangelisti")');
        if (emailElement) emailElement.textContent = content.email;

        const addressElement = document.querySelector('#contatti p:contains("Bologna")');
        if (addressElement) addressElement.textContent = content.address;

        const hoursElement = document.querySelector('#contatti p:contains("Lun-Ven")');
        if (hoursElement) hoursElement.textContent = content.hours;

        // Aggiorna link WhatsApp consulenza
        const consultationLinks = document.querySelectorAll('a[href*="prenotare"]');
        consultationLinks.forEach(link => link.href = content.whatsapp_consultation);

        // Aggiorna link social
        const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
        linkedinLinks.forEach(link => link.href = content.linkedin);

        const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
        instagramLinks.forEach(link => link.href = content.instagram);
    }

    async loadEducationContent() {
        const content = await this.loadContent('education');
        if (!content) return;

        // Trova il container della formazione
        const educationContainer = document.querySelector('.space-y-4');
        if (!educationContainer) return;

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
        });
    }

    async loadAllContent() {
        try {
            await Promise.all([
                this.loadHeroContent(),
                this.loadAboutContent(),
                this.loadServicesContent(),
                this.loadContactContent(),
                this.loadEducationContent()
            ]);
            console.log('Tutti i contenuti sono stati caricati con successo');
        } catch (error) {
            console.error('Errore nel caricamento dei contenuti:', error);
        }
    }
}

// Inizializza il Content Loader
window.contentLoader = new ContentLoader();
window.loadAllContent = () => window.contentLoader.loadAllContent();