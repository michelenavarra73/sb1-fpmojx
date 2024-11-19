import React, { useState } from 'react';
import { Star, Users, Gauge, Fuel } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import CarDetailsModal from '../components/CarDetailsModal';

export default function Cars() {
  const { cars } = useAdmin();
  const { t } = useLanguage();
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderValue = (value: any) => {
    if (value === undefined || value === null || value === 0) return null;
    return value;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{t('fleet.title')}</h1>
          <p className="mt-4 text-xl text-gray-600">{t('fleet.subtitle')}</p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder={t('fleet.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div 
              key={car.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              {/* Rest of the JSX remains the same, just update text content with t() function */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">4.9</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {renderValue(car.passengers) && (
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-600">{car.passengers}</span>
                    </div>
                  )}
                  {renderValue(car.consumption) && (
                    <div className="flex items-center">
                      <Gauge className="w-5 h-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-600">{car.consumption}</span>
                    </div>
                  )}
                  {renderValue(car.fuelType) && (
                    <div className="flex items-center">
                      <Fuel className="w-5 h-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-600">{car.fuelType}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    {renderValue(car.price) && (
                      <>
                        <span className="text-2xl font-bold text-blue-600">€{car.price}</span>
                        <span className="text-gray-600">/day</span>
                      </>
                    )}
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

        {selectedCar && (
          <CarDetailsModal
            car={selectedCar}
            onClose={() => setSelectedCar(null)}
          />
        )}
      </div>
    </div>
  );
}