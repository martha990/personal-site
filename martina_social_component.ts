'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Send,
  Instagram,
  Linkedin,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

export function ContattiSection() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
    privacy: false,
    newsletter: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Messaggio inviato! Ti ricontatterò al più presto.');
    setFormData({
      nome: '',
      email: '',
      telefono: '',
      messaggio: '',
      privacy: false,
      newsletter: false
    });
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = "393XXXXXXXXX";
    const message = "Ciao Martina, vorrei prenotare una consulenza";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="contatti" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Contatti
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sono qui per ascoltarti. Contattami per prenotare una consulenza 
            o per qualsiasi informazione sui miei servizi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div>
            <Card className="shadow-lg border-blu-primario">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  Invia un Messaggio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome e Cognome *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Il tuo nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Telefono</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="+39 xxx xxx xxxx"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="la.tua@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="messaggio">Messaggio *</Label>
                    <Textarea
                      id="messaggio"
                      name="messaggio"
                      value={formData.messaggio}
                      onChange={handleInputChange}
                      required
                      className="mt-1 min-h-[120px]"
                      placeholder="Descrivi brevemente il motivo per cui vorresti una consulenza..."
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacy}
                        onCheckedChange={(checked) => handleCheckboxChange('privacy', checked as boolean)}
                        required
                      />
                      <Label htmlFor="privacy" className="text-sm">
                        Accetto l'informativa sulla privacy e il trattamento dei dati personali *
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleCheckboxChange('newsletter', checked as boolean)}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Desidero ricevere aggiornamenti e consigli di benessere psicologico
                      </Label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blu-accent hover:bg-blu-scuro text-white py-3"
                    disabled={!formData.privacy}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Invia Messaggio
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            
            {/* Quick Contact */}
            <Card className="bg-grigio-chiaro border-blu-primario">
              <CardContent className="p-6">
                <h3 className="text-xl mb-6 text-center">
                  Contatto Diretto
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blu-primario" />
                    <div>
                      <p className="font-semibold">Telefono</p>
                      <p className="text-sm text-gray-600">+39 xxx xxx xxxx</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blu-primario" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-gray-600">info@martinaevangelisti.it</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blu-primario" />
                    <div>
                      <p className="font-semibold">Studio</p>
                      <p className="text-sm text-gray-600">Via Roma 123, Bologna (BO)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blu-primario" />
                    <div>
                      <p className="font-semibold">Orari</p>
                      <p className="text-sm text-gray-600">Lun-Ven: 9:00-19:00</p>
                      <p className="text-sm text-gray-600">Sab: 9:00-13:00</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleWhatsAppClick}
                  className="whatsapp-btn w-full text-lg py-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Scrivimi su WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card className="bg-white border-blu-primario">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg mb-4 text-blu-scuro font-semibold">
                  Seguimi sui Social
                </h3>
                <div className="flex justify-center gap-4 mb-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-blu-primario text-white hover:bg-blu-scuro transition-all duration-300 hover:scale-105"
                    onClick={() => window.open('https://linkedin.com/in/martinaevangelisti', '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blu-primario text-blu-primario hover:bg-blu-primario hover:text-white transition-all duration-300"
                    onClick={() => window.open('https://instagram.com/martinaevangelisti', '_blank')}
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Contenuti di valore sul benessere psicologico e consigli per la crescita personale
                </p>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {/* Google Maps Embed - Replace with actual coordinates */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.123456789!2d11.342348!3d44.493889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI5JzM4LjAiTiAxMcKwMjAnMzIuNSJF!5e0!3m2!1sit!2sit!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Studio Dott.ssa Martina Evangelisti"
                  ></iframe>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center">
                    📍 Studio facilmente raggiungibile con mezzi pubblici e parcheggio nelle vicinanze
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="bg-red-50 border-red-200 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-lg text-red-800 mb-2">
                🆘 In caso di emergenza
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Se stai attraversando una crisi acuta, contatta immediatamente 
                il numero verde 800 833 833 o recati al pronto soccorso più vicino.
              </p>
              <p className="text-xs text-red-600">
                Per supporto immediato, sono disponibile su WhatsApp anche fuori orario.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}