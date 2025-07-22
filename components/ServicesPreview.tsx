import { Brain, Heart, Users, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export function ServicesPreview() {
  const mainServices = [
    {
      icon: Brain,
      title: "Consulenza Psicologica Individuale",
      description: "Supporto personalizzato per ansia, depressione, stress e difficoltà relazionali",
      duration: "50 min",
      type: "Online/Presenza"
    },
    {
      icon: Heart,
      title: "Terapia di Coppia",
      description: "Percorsi per migliorare la comunicazione e risolvere conflitti nella relazione",
      duration: "60 min",
      type: "Online/Presenza"
    },
    {
      icon: Users,
      title: "Sostegno Familiare",
      description: "Supporto per dinamiche familiari complesse e periodi di transizione",
      duration: "60 min",
      type: "Online/Presenza"
    },
    {
      icon: MessageSquare,
      title: "Consulenza Psicologica Breve",
      description: "Interventi focalizzati per situazioni specifiche e obiettivi mirati",
      duration: "30 min",
      type: "Online"
    }
  ];

  const scrollToServices = () => {
    const element = document.querySelector('#servizi');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servizi-preview" className="py-16 lg:py-24 bg-grigio-chiaro">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            I Miei Servizi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Offro supporto psicologico professionale attraverso diversi approcci, 
            adattati alle tue esigenze specifiche e modalità preferite.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainServices.map((service, index) => (
            <Card key={index} className="service-card group cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-rosa-polvere rounded-full flex items-center justify-center group-hover:bg-rosa-scuro transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-nero-profondo group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-nero-profondo">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Durata: {service.duration}</span>
                      <span>{service.type}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to Full Services */}
        <div className="text-center">
          <Button
            onClick={scrollToServices}
            className="bg-rosa-scuro hover:bg-pink-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
          >
            Scopri Tutti i Servizi
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}