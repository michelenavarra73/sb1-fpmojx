import React, { useState } from 'react';
import { Star, Users, Gauge, Fuel } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import CarDetailsModal from './CarDetailsModal';

export default function Fleet() {
  const { cars } = useAdmin();
  const { t } = useLanguage();
  const [selectedCar, setSelectedCar] = useState(null);
  const featuredCars = cars.slice(0, 3);

  return (
    <section id="fleet" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">{t('fleet.featured.title')}</h2>
          <p className="mt-4 text-xl text-gray-600">{t('fleet.featured.subtitle')}</p>
          <a 
            href="/cars" 
            className="inline-block mt-6 text-blue-600 hover:text-blue-700 font-semibold"
          >
            {t('fleet.viewAll')} →
          </a>
        </div>

        {/* Rest of the component remains the same, just update text content with t() function */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car) => (
            <div 
              key={car.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <div className="relative h-48">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80";
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">4.9</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">{car.passengers}</span>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="w-5 h-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">{car.consumption}</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-5 h-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">{car.fuelType}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">€{car.price}</span>
                    <span className="text-gray-600">/day</span>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-md transition duration-300 ${
                      car.status === 'available' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={car.status !== 'available'}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (car.status === 'available') {
                        setSelectedCar(car);
                      }
                    }}
                  >
                    {car.status === 'available' ? t('fleet.bookNow') : t('fleet.unavailable')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </section>
  );
}