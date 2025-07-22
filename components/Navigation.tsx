'use client';

import { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage?: string;
}

export function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#chi-sono', label: 'Chi Sono', id: 'chi-sono' },
    { href: '#servizi', label: 'Servizi', id: 'servizi' },
    { href: '#contatti', label: 'Contatti', id: 'contatti' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav-sticky border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 className="script-heading text-2xl">Martina Evangelisti</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-link px-3 py-2 text-sm hover:text-rosa-scuro transition-colors ${
                    currentPage === item.id ? 'text-rosa-scuro' : 'text-nero-profondo'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-nero-profondo"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-rosa-polvere border-t border-border">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-link block px-3 py-2 text-base w-full text-left hover:text-rosa-scuro transition-colors ${
                    currentPage === item.id ? 'text-rosa-scuro' : 'text-nero-profondo'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}