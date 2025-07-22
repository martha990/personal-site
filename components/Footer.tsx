import { Heart, Phone, Mail, MapPin, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nero-profondo text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="script-heading text-3xl text-rosa-polvere mb-4">
              Martina Evangelisti
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Psicologa clinica specializzata nel supporto al benessere psicologico 
              attraverso consulenze personalizzate online e in presenza.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/martinaevangelisti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rosa-polvere transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/martinaevangelisti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rosa-polvere transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Link Utili</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-300 hover:text-rosa-polvere transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#chi-sono" className="text-gray-300 hover:text-rosa-polvere transition-colors">
                  Chi Sono
                </a>
              </li>
              <li>
                <a href="#servizi" className="text-gray-300 hover:text-rosa-polvere transition-colors">
                  Servizi
                </a>
              </li>
              <li>
                <a href="#contatti" className="text-gray-300 hover:text-rosa-polvere transition-colors">
                  Contatti
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-300 hover:text-rosa-polvere transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4">Contatti</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+39 xxx xxx xxxx</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@martinaevangelisti.it</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p>Via Roma 123</p>
                  <p>40100 Bologna (BO)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span>© {currentYear} Dott.ssa Martina Evangelisti - Psicologa</span>
              <Heart className="w-4 h-4 text-rosa-polvere" />
            </div>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-rosa-polvere transition-colors">
                Privacy Policy
              </a>
              <a href="#cookies" className="hover:text-rosa-polvere transition-colors">
                Cookie Policy
              </a>
              <span>P.IVA: 12345678901</span>
            </div>
          </div>
        </div>
        
        {/* Legal Notice */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>
            Iscritta all'Ordine degli Psicologi dell'Emilia-Romagna n. 1234 • 
            Ai sensi della Legge 56/89 le prestazioni psicologiche non sono soggette ad IVA
          </p>
        </div>
      </div>
    </footer>
  );
}