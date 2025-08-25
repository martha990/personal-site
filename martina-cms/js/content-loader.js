/**
 * Simple Content Management System
 * Loads markdown files and injects content into HTML
 */

class ContentManager {
    constructor() {
        this.contentCache = {};
        this.init();
    }

    async init() {
        try {
            await this.loadAllContent();
            this.injectContent();
        } catch (error) {
            console.error('Content loading failed:', error);
            // Fallback: use existing static content
        }
    }

    async loadAllContent() {
        const contentPromises = [
            this.loadContent('hero', 'content/hero.md'),
            this.loadContent('bio', 'content/bio.md'),
            this.loadContent('contact', 'content/contact.md'),
            this.loadContent('social', 'content/social.md'),
            this.loadContent('settings', 'content/settings.md'),
            this.loadServices(),
            this.loadEducation()
        ];

        await Promise.all(contentPromises);
    }

    async loadContent(key, path) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const text = await response.text();
                this.contentCache[key] = this.parseMarkdown(text);
            }
        } catch (error) {
            console.warn(`Failed to load ${path}:`, error);
        }
    }

    async loadServices() {
        const services = [];
        const serviceFiles = [
            'consulenza-psicologica.md',
            'terapia-di-coppia.md',
            'sostegno-familiare.md',
            'consulenza-breve.md'
        ];

        for (const file of serviceFiles) {
            try {
                const response = await fetch(`content/services/${file}`);
                if (response.ok) {
                    const text = await response.text();
                    services.push(this.parseMarkdown(text));
                }
            } catch (error) {
                console.warn(`Failed to load service ${file}:`, error);
            }
        }

        // Sort by order
        services.sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0));
        this.contentCache.services = services;
    }

    async loadEducation() {
        const education = [];
        const educationFiles = [
            'laurea-magistrale.md',
            'abilitazione.md',
            'specializzazione.md'
        ];

        for (const file of educationFiles) {
            try {
                const response = await fetch(`content/education/${file}`);
                if (response.ok) {
                    const text = await response.text();
                    education.push(this.parseMarkdown(text));
                }
            } catch (error) {
                console.warn(`Failed to load education ${file}:`, error);
            }
        }

        // Sort by order
        education.sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0));
        this.contentCache.education = education;
    }

    parseMarkdown(content) {
        const lines = content.trim().split('\n');
        const frontmatter = {};
        let contentStart = 0;
        let body = '';

        // Parse frontmatter
        if (lines[0] === '---') {
            contentStart = 1;
            for (let i = 1; i < lines.length; i++) {
                if (lines[i] === '---') {
                    contentStart = i + 1;
                    break;
                }
                const match = lines[i].match(/^(\w+):\s*"?([^"]*)"?$/);
                if (match) {
                    frontmatter[match[1]] = match[2];
                }
            }
        }

        // Get body content
        if (contentStart < lines.length) {
            body = lines.slice(contentStart).join('\n').trim();
        }

        return { frontmatter, body };
    }

    injectContent() {
        this.injectHeroContent();
        this.injectServicesContent();
        this.injectBioContent();
        this.injectEducationContent();
        this.injectContactContent();
        this.injectSocialContent();
        this.updateMetadata();
    }

    injectHeroContent() {
        const hero = this.contentCache.hero;
        if (!hero) return;

        const { title, subtitle, description, whatsapp, image } = hero.frontmatter;

        // Update hero title
        const titleElements = document.querySelectorAll('h1');
        titleElements.forEach(el => {
            if (el.textContent.includes('Martina Evangelisti')) {
                el.textContent = title || 'Martina Evangelisti';
            }
        });

        // Update subtitle
        const subtitleElements = document.querySelectorAll('p');
        subtitleElements.forEach(el => {
            if (el.textContent.includes('Psicologa Clinica')) {
                el.textContent = subtitle || 'Psicologa Clinica';
            }
        });

        // Update description
        if (description) {
            const descElements = document.querySelectorAll('p');
            descElements.forEach(el => {
                if (el.textContent.includes('Supporto professionale')) {
                    el.textContent = description;
                }
            });
        }

        // Update WhatsApp links
        if (whatsapp) {
            const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
            whatsappLinks.forEach(link => {
                const currentHref = link.getAttribute('href');
                const newHref = currentHref.replace(/393123456789/g, whatsapp);
                link.setAttribute('href', newHref);
            });
        }

        // Update hero image
        if (image) {
            const heroImages = document.querySelectorAll('img[alt*="Martina Evangelisti"]');
            heroImages.forEach(img => {
                img.src = image;
            });
        }
    }

    injectServicesContent() {
        const services = this.contentCache.services;
        if (!services || services.length === 0) return;

        const servicesGrid = document.querySelector('#servizi .grid');
        if (!servicesGrid) return;

        // Clear existing content
        servicesGrid.innerHTML = '';

        services.forEach(service => {
            const { title, description, icon } = service.frontmatter;
            
            const serviceCard = document.createElement('div');
            serviceCard.className = 'group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer';
            
            serviceCard.innerHTML = `
                <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blu-primario transition-colors duration-300">
                    <span class="text-2xl group-hover:text-white transition-colors duration-300">${icon || '🧠'}</span>
                </div>
                <h3 class="text-xl font-semibold text-blu-scuro dark:text-white mb-4 text-center">
                    ${title}
                </h3>
                <p class="text-grigio-medio dark:text-gray-400 text-center">
                    ${description}
                </p>
            `;

            // Add click handler for WhatsApp
            serviceCard.addEventListener('click', () => {
                const whatsapp = this.contentCache.contact?.frontmatter?.whatsapp || '393123456789';
                const message = `Ciao Martina, sono interessato/a al servizio "${title}". Vorrei prenotare una consulenza.`;
                window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
            });

            servicesGrid.appendChild(serviceCard);
        });
    }

    injectBioContent() {
        const bio = this.contentCache.bio;
        if (!bio) return;

        const { title, intro, quote, image } = bio.frontmatter;
        const body = bio.body;

        // Update bio title
        const bioTitle = document.querySelector('#chi-sono h2');
        if (bioTitle && title) {
            bioTitle.textContent = title;
        }

        // Update intro
        const introElement = document.querySelector('#chi-sono .text-center p');
        if (introElement && intro) {
            introElement.textContent = intro;
        }

        // Update main content
        if (body) {
            const contentDiv = document.querySelector('#chi-sono .lg\\:col-span-2');
            if (contentDiv) {
                // Convert markdown to HTML (basic implementation)
                const htmlContent = this.markdownToHtml(body);
                const paragraphs = contentDiv.querySelectorAll('p');
                if (paragraphs.length >= 3) {
                    contentDiv.innerHTML = htmlContent + contentDiv.innerHTML.substring(contentDiv.innerHTML.indexOf('<div class="mt-8">'));
                }
            }
        }

        // Update quote
        if (quote) {
            const quoteElement = document.querySelector('.border-blu-primario p');
            if (quoteElement) {
                quoteElement.textContent = `"${quote}"`;
            }
        }

        // Update bio image
        if (image) {
            const bioImages = document.querySelectorAll('#chi-sono img');
            bioImages.forEach(img => {
                img.src = image;
            });
        }
    }

    injectEducationContent() {
        const education = this.contentCache.education;
        if (!education || education.length === 0) return;

        const educationContainer = document.querySelector('#chi-sono .space-y-4');
        if (!educationContainer) return;

        // Clear existing content
        educationContainer.innerHTML = '';

        education.forEach(item => {
            const { year, title, institution } = item.frontmatter;
            
            const educationItem = document.createElement('div');
            educationItem.className = 'flex items-start space-x-3';
            
            educationItem.innerHTML = `
                <div class="w-2 h-2 bg-blu-primario rounded-full mt-2 flex-shrink-0"></div>
                <div>
                    <strong class="text-blu-scuro dark:text-white">${year}:</strong>
                    <span class="text-grigio-medio dark:text-gray-400">${title}${institution ? ` - ${institution}` : ''}</span>
                </div>
            `;

            educationContainer.appendChild(educationItem);
        });
    }

    injectContactContent() {
        const contact = this.contentCache.contact;
        if (!contact) return;

        const { phone, email, address, hours, whatsapp } = contact.frontmatter;

        // Update contact information
        const contactElements = document.querySelectorAll('#contatti p');
        contactElements.forEach(el => {
            if (el.textContent.includes('+39 xxx') && phone) {
                el.textContent = phone;
            }
            if (el.textContent.includes('info@martinaevangelisti.it') && email) {
                el.textContent = email;
            }
            if (el.textContent.includes('Via Roma 123') && address) {
                el.textContent = address;
            }
            if (el.textContent.includes('Lun-Ven: 9-19') && hours) {
                el.textContent = hours;
            }
        });

        // Update footer contact info
        const footerContactElements = document.querySelectorAll('footer li');
        footerContactElements.forEach(li => {
            const text = li.textContent;
            if (text.includes('+39 xxx') && phone) {
                li.textContent = phone;
            }
            if (text.includes('info@martinaevangelisti.it') && email) {
                li.textContent = email;
            }
            if (text.includes('Via Roma 123') && address) {
                li.textContent = address;
            }
        });

        // Update WhatsApp links with new number
        if (whatsapp) {
            const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
            whatsappLinks.forEach(link => {
                const currentHref = link.getAttribute('href');
                const newHref = currentHref.replace(/393123456789/g, whatsapp);
                link.setAttribute('href', newHref);
            });
        }
    }

    injectSocialContent() {
        const social = this.contentCache.social;
        if (!social) return;

        const { linkedin, instagram, bio } = social.frontmatter;

        // Update social links
        if (linkedin) {
            const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
            linkedinLinks.forEach(link => link.href = linkedin);
        }

        if (instagram) {
            const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
            instagramLinks.forEach(link => link.href = instagram);
        }

        // Update social bio
        if (bio) {
            const socialBioElements = document.querySelectorAll('.text-grigio-medio.dark\\:text-gray-400.mt-3');
            socialBioElements.forEach(el => {
                if (el.textContent.includes('Contenuti di valore')) {
                    el.textContent = bio;
                }
            });
        }
    }

    updateMetadata() {
        const settings = this.contentCache.settings;
        if (!settings) return;

        const { title, description, registration, free_consultation } = settings.frontmatter;

        // Update page title
        if (title) {
            document.title = title;
        }

        // Update meta description
        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = description;
        }

        // Handle free consultation section
        const freeConsultationSection = document.querySelector('.free-consultation-section');
        if (freeConsultationSection) {
            if (free_consultation === false || free_consultation === 'false') {
                freeConsultationSection.style.display = 'none';
            } else {
                freeConsultationSection.style.display = 'block';
            }
        }

        // Update registration number
        if (registration) {
            const regElements = document.querySelectorAll('p');
            regElements.forEach(el => {
                if (el.textContent.includes('Ordine degli Psicologi dell\'Emilia-Romagna')) {
                    el.textContent = registration;
                }
            });
        }
    }

    markdownToHtml(markdown) {
        // Basic markdown to HTML conversion
        let html = markdown
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blu-scuro dark:text-white">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .split('\n\n')
            .map(paragraph => `<p class="text-lg text-grigio-medio dark:text-gray-400 leading-relaxed">${paragraph}</p>`)
            .join('');

        return html;
    }
}

// Initialize content manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ContentManager());
} else {
    new ContentManager();
}