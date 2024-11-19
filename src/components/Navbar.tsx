import React from 'react';
import { Menu, X, Car, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();
  const path = window.location.pathname;

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LuxeAuto</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className={`text-gray-700 hover:text-blue-600 ${path === '/' ? 'text-blue-600' : ''}`}
            >
              {t('nav.home')}
            </a>
            <a 
              href="/cars" 
              className={`text-gray-700 hover:text-blue-600 ${path === '/cars' ? 'text-blue-600' : ''}`}
            >
              {t('nav.fleet')}
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600">{t('nav.services')}</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">{t('nav.about')}</a>
            <LanguageSelector />
            <div className="flex items-center space-x-2 text-blue-600">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">+1 (555) 123-4567</span>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="/" 
              className={`block px-3 py-2 text-gray-700 hover:text-blue-600 ${path === '/' ? 'text-blue-600' : ''}`}
            >
              {t('nav.home')}
            </a>
            <a 
              href="/cars" 
              className={`block px-3 py-2 text-gray-700 hover:text-blue-600 ${path === '/cars' ? 'text-blue-600' : ''}`}
            >
              {t('nav.fleet')}
            </a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">{t('nav.services')}</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">{t('nav.about')}</a>
            <div className="px-3 py-2">
              <LanguageSelector />
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 text-blue-600">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}