import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">LuxeAuto</span>
            </div>
            <p className="text-gray-400 mb-6">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">{t('nav.home')}</a></li>
              <li><a href="/cars" className="text-gray-400 hover:text-white transition duration-300">{t('nav.cars')}</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">{t('nav.services')}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">{t('nav.about')}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">{t('nav.contact')}</a></li>
              <li><a href="/admin/login" className="text-gray-400 hover:text-white transition duration-300">{t('footer.admin')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">Luxury Car Rental</li>
              <li className="text-gray-400">Airport Transfers</li>
              <li className="text-gray-400">Wedding Cars</li>
              <li className="text-gray-400">Corporate Services</li>
              <li className="text-gray-400">VIP Protection</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contactInfo')}</h3>
            <ul className="space-y-4 text-gray-400">
              <li>123 Luxury Avenue</li>
              <li>Beverly Hills, CA 90210</li>
              <li>+1 (555) 123-4567</li>
              <li>info@luxeauto.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}