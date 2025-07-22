import { GraduationCap, Award, Heart, Brain, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ChiSonoSection() {
  const credentials = [
    {
      icon: GraduationCap,
      title: "Laurea Magistrale in Psicologia Clinica",
      institution: "Università degli Studi di Bologna",
      year: "2018"
    },
    {
      icon: Award,
      title: "Abilitazione Professionale",
      institution: "Ordine degli Psicologi Emilia-Romagna",
      year: "2019"
    },
    {
      icon: Brain,
      title: "Specializzazione in Terapia Cognitivo-Comportamentale",
      institution: "Scuola di Psicoterapia Cognitiva",
      year: "2022"
    }
  ];

  const approach = [
    {
      title: "Ascolto Attivo",
      description: "Ogni persona ha una storia unica che merita di essere ascoltata con attenzione e rispetto"
    },
    {
      title: "Approccio Integrato",
      description: "Utilizzo tecniche evidence-based adattate alle specificità di ogni cliente"
    },
    {
      title: "Ambiente Sicuro",
      description: "Creo uno spazio protetto dove poter esplorare emozioni e pensieri senza giudizio"
    }
  ];

  const handleWhatsAppClick = () => {
    const whatsappNumber = "393XXXXXXXXX";
    const message = "Ciao Martina, vorrei conoscere meglio il tuo approccio terapeutico";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="chi-sono" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Chi Sono
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Psicologa clinica con passione per il benessere delle persone e specializzazione 
            in terapia cognitivo-comportamentale.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Bio Text - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Sono <strong>Martina Evangelisti</strong>, psicologa clinica specializzata nel supporto 
                a persone che attraversano momenti di difficoltà emotiva, relazionale o psicologica. 
                La mia passione per la psicologia nasce dalla convinzione che ogni persona abbia 
                dentro di sé le risorse necessarie per stare bene.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Nel mio lavoro utilizzo un <strong>approccio integrato</strong> che combina tecniche 
                cognitive-comportamentali con elementi di mindfulness e terapia umanistica. 
                Credo fortemente nell'importanza di personalizzare ogni intervento, perché ogni 
                storia è unica e merita un percorso su misura.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Offro consulenze sia <strong>online</strong> che <strong>in presenza</strong>, 
                garantendo sempre la massima riservatezza e professionalità. Il mio obiettivo 
                è creare uno spazio sicuro dove poter esplorare insieme le difficoltà e 
                sviluppare strategie efficaci per il benessere.
              </p>
            </div>

            {/* Approach Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {approach.map((item, index) => (
                <Card key={index} className="border border-rosa-polvere bg-rosa-polvere/20">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold text-nero-profondo mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Professional Photo */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="w-full max-w-sm mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-rosa-polvere shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Dott.ssa Martina Evangelisti nel suo studio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Studio Info */}
              <Card className="bg-grigio-chiaro border-gray-200">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-nero-profondo mb-2">
                    📍 Studio Privato
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Ricevo su appuntamento in studio privato e online
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>🕐 Lun-Ven: 9:00-19:00</p>
                    <p>🕐 Sab: 9:00-13:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-grigio-chiaro rounded-2xl p-8 mb-12">
          <h3 className="text-2xl text-center mb-8">
            Formazione e Credenziali
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials.map((credential, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-rosa-polvere rounded-full flex items-center justify-center mb-4">
                    <credential.icon className="w-6 h-6 text-nero-profondo" />
                  </div>
                  <h4 className="font-semibold text-nero-profondo mb-2">
                    {credential.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {credential.institution}
                  </p>
                  <p className="text-xs text-rosa-scuro font-semibold">
                    {credential.year}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-rosa-polvere rounded-2xl p-8">
          <h3 className="text-2xl mb-4">
            Vuoi Saperne di Più?
          </h3>
          <p className="text-gray-700 mb-6 max-w-lg mx-auto">
            Sono qui per rispondere alle tue domande e discutere insieme 
            come posso supportarti nel tuo percorso di benessere.
          </p>
          <Button
            onClick={handleWhatsAppClick}
            className="whatsapp-btn text-lg px-8 py-3"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Parliamone insieme
          </Button>
        </div>
      </div>
    </section>
  );
}