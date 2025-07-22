import { 
  Brain, 
  Heart, 
  Users, 
  MessageSquare, 
  Video, 
  Clock, 
  MapPin, 
  MessageCircle,
  Lightbulb,
  Shield,
  Target
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function ServiziSection() {
  const services = [
    {
      icon: Brain,
      title: "Consulenza Psicologica Individuale",
      description: "Percorso personalizzato per gestire ansia, depressione, stress e difficoltà emotive",
      duration: "50 minuti",
      modality: ["Online", "Presenza"],
      price: "€70",
      features: ["Primo colloquio gratuito", "Piano terapeutico personalizzato", "Tecniche CBT"],
      category: "Individuale"
    },
    {
      icon: Heart,
      title: "Terapia di Coppia",
      description: "Supporto per coppie che attraversano crisi, conflitti o vogliono migliorare la comunicazione",
      duration: "60 minuti",
      modality: ["Online", "Presenza"],
      price: "€90",
      features: ["Valutazione della coppia", "Tecniche di comunicazione", "Homework terapeutici"],
      category: "Coppia"
    },
    {
      icon: Users,
      title: "Sostegno Familiare",
      description: "Interventi per famiglie con dinamiche complesse, adolescenti difficili o periodi di cambiamento",
      duration: "60 minuti",
      modality: ["Online", "Presenza"],
      price: "€100",
      features: ["Coinvolgimento di tutti i membri", "Strategie educative", "Mediazione familiare"],
      category: "Famiglia"
    },
    {
      icon: MessageSquare,
      title: "Consulenza Psicologica Breve",
      description: "Interventi focalizzati su problematiche specifiche con obiettivi mirati e tempi ridotti",
      duration: "30 minuti",
      modality: ["Online"],
      price: "€45",
      features: ["Massimo 5 incontri", "Obiettivi specifici", "Tecniche solution-focused"],
      category: "Breve"
    },
    {
      icon: Lightbulb,
      title: "Supporto per Ansia e Attacchi di Panico",
      description: "Percorso specializzato per gestire e superare ansia generalizzata e attacchi di panico",
      duration: "50 minuti",
      modality: ["Online", "Presenza"],
      price: "€70",
      features: ["Tecniche di rilassamento", "Ristrutturazione cognitiva", "Esposizione graduale"],
      category: "Specialistico"
    },
    {
      icon: Shield,
      title: "Elaborazione del Trauma",
      description: "Supporto per elaborare eventi traumatici attraverso approcci evidence-based",
      duration: "50 minuti",
      modality: ["Presenza"],
      price: "€80",
      features: ["Tecniche EMDR", "Stabilizzazione emotiva", "Integrazione del trauma"],
      category: "Specialistico"
    },
    {
      icon: Target,
      title: "Coaching Psicologico",
      description: "Percorsi di crescita personale, miglioramento delle performance e raggiungimento obiettivi",
      duration: "45 minuti",
      modality: ["Online", "Presenza"],
      price: "€65",
      features: ["Goal setting", "Strategie motivazionali", "Piano d'azione personalizzato"],
      category: "Crescita"
    },
    {
      icon: Video,
      title: "Consulenza di Emergenza",
      description: "Supporto immediato per situazioni di crisi acute che richiedono intervento tempestivo",
      duration: "30 minuti",
      modality: ["Online"],
      price: "€60",
      features: ["Disponibilità h24", "Intervento di crisi", "Stabilizzazione emotiva"],
      category: "Emergenza"
    }
  ];

  const handleServiceWhatsApp = (serviceName: string) => {
    const whatsappNumber = "393XXXXXXXXX";
    const message = `Ciao Martina, sono interessato/a al servizio "${serviceName}". Vorrei prenotare una consulenza.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Individuale': 'bg-blue-100 text-blue-800',
      'Coppia': 'bg-pink-100 text-pink-800',
      'Famiglia': 'bg-green-100 text-green-800',
      'Breve': 'bg-yellow-100 text-yellow-800',
      'Specialistico': 'bg-purple-100 text-purple-800',
      'Crescita': 'bg-indigo-100 text-indigo-800',
      'Emergenza': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="servizi" className="py-16 lg:py-24 bg-grigio-chiaro">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Tutti i Servizi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Offro una gamma completa di servizi psicologici, sia online che in presenza, 
            per supportarti in ogni fase del tuo percorso di benessere.
          </p>
        </div>

        {/* Services Grid - Linktr.ee Style */}
        <div className="max-w-2xl mx-auto space-y-4 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="service-card group cursor-pointer overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-rosa-polvere rounded-xl flex items-center justify-center group-hover:bg-rosa-scuro transition-colors duration-300 flex-shrink-0">
                    <service.icon className="w-7 h-7 text-nero-profondo group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-nero-profondo group-hover:text-rosa-scuro transition-colors duration-300">
                            {service.title}
                          </h3>
                          <Badge className={`text-xs ${getCategoryColor(service.category)}`}>
                            {service.category}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        
                        {/* Service Details */}
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {service.modality.join(", ")}
                          </div>
                          <div className="font-semibold text-rosa-scuro">
                            {service.price}
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <Button
                        onClick={() => handleServiceWhatsApp(service.title)}
                        className="whatsapp-btn px-4 py-2 text-sm flex-shrink-0"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Prenota
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white border-rosa-polvere">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-nero-profondo mb-2">
                Primo Colloquio Gratuito
              </h4>
              <p className="text-sm text-gray-600">
                Conosciamoci senza impegno. Il primo incontro di 30 minuti è sempre gratuito.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-rosa-polvere">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-nero-profondo mb-2">
                Online & Presenza
              </h4>
              <p className="text-sm text-gray-600">
                Scegli la modalità che preferisci. Stessa qualità, massima flessibilità.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-rosa-polvere">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-nero-profondo mb-2">
                Approccio Personalizzato
              </h4>
              <p className="text-sm text-gray-600">
                Ogni percorso è unico. Adatto metodi e tecniche alle tue esigenze specifiche.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* General CTA */}
        <div className="text-center bg-rosa-polvere rounded-2xl p-8">
          <h3 className="text-2xl mb-4">
            Non Trovi il Servizio che Cerchi?
          </h3>
          <p className="text-gray-700 mb-6 max-w-lg mx-auto">
            Contattami per discutere le tue esigenze specifiche. 
            Insieme troveremo il percorso più adatto a te.
          </p>
          <Button
            onClick={() => handleServiceWhatsApp("consulenza personalizzata")}
            className="whatsapp-btn text-lg px-8 py-3"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Parlami delle tue esigenze
          </Button>
        </div>
      </div>
    </section>
  );
}