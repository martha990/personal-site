import { MessageCircle, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const whatsappNumber = "393XXXXXXXXX"; // Replace with actual number
  const whatsappMessage = "Ciao Martina, vorrei informazioni sui tuoi servizi di consulenza psicologica";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const scrollToServices = () => {
    const element = document.querySelector('#servizi-preview');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-gradient min-h-[80vh] flex items-center py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="text-center lg:text-left space-y-8 fade-in-up">
            <div className="space-y-4">
              <h1 className="script-heading text-4xl sm:text-5xl lg:text-6xl">
                Martina Evangelisti
              </h1>
              <p className="tagline text-lg sm:text-xl lg:text-2xl">
                Psicologa Clinica
              </p>
              <p className="text-lg text-gray-700 max-w-lg mx-auto lg:mx-0">
                Supporto professionale per il tuo benessere psicologico. 
                Consulenze personalizzate in un ambiente accogliente e riservato.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={handleWhatsAppClick}
                className="whatsapp-btn text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contattami su WhatsApp
              </Button>
              
              <Button
                variant="outline"
                onClick={scrollToServices}
                className="border-2 border-rosa-scuro text-rosa-scuro hover:bg-rosa-scuro hover:text-white text-lg px-8 py-4 transition-all duration-300"
              >
                Scopri i Servizi
                <ArrowDown className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-300">
              <div className="text-center">
                <div className="text-2xl mb-1">👩‍⚕️</div>
                <p className="text-sm">Psicologa Clinica</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🏥</div>
                <p className="text-sm">Consulenze Online</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">💬</div>
                <p className="text-sm">Supporto Personalizzato</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Dott.ssa Martina Evangelisti - Psicologa Clinica"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-rosa-scuro rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-rosa-scuro rounded-full"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-rosa-scuro rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}