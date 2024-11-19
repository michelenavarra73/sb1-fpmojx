import React from 'react';
import { Star, Users, Gauge, Fuel, Calendar, Clock, Shield, AlertCircle } from 'lucide-react';

interface Props {
  car: any;
  onClose: () => void;
}

export default function CarDetailsModal({ car, onClose }: Props) {
  const renderValue = (value: any) => {
    if (value === undefined || value === null || value === 0) return null;
    return value;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <div className="relative h-64 mb-8">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80";
              }}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{car.name}</h2>

          {/* Pricing Section */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderValue(car.price) && (
                <div>
                  <span className="text-gray-600">Daily Rate</span>
                  <div className="text-3xl font-bold text-blue-600">€{car.price}</div>
                </div>
              )}
              {renderValue(car.monthlyPrice) && (
                <div>
                  <span className="text-gray-600">Monthly Rate</span>
                  <div className="text-3xl font-bold text-blue-600">€{car.monthlyPrice}</div>
                </div>
              )}
              {renderValue(car.deposit) && (
                <div>
                  <span className="text-gray-600">Deposit Required</span>
                  <div className="text-3xl font-bold text-blue-600">€{car.deposit}</div>
                </div>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {renderValue(car.passengers) && (
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{car.passengers} Passengers</span>
              </div>
            )}
            {renderValue(car.consumption) && (
              <div className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                <span>{car.consumption}</span>
              </div>
            )}
            {renderValue(car.fuelType) && (
              <div className="flex items-center space-x-2">
                <Fuel className="w-5 h-5 text-blue-600" />
                <span>{car.fuelType}</span>
              </div>
            )}
            {renderValue(car.availableIn) && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Available in {car.availableIn} days</span>
              </div>
            )}
          </div>

          {/* Detailed Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Vehicle Specifications</h3>
              <dl className="space-y-2">
                {renderValue(car.class) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Class</dt>
                    <dd className="font-medium">{car.class}</dd>
                  </div>
                )}
                {renderValue(car.engineSize) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Engine Size</dt>
                    <dd className="font-medium">{car.engineSize}</dd>
                  </div>
                )}
                {renderValue(car.transmission) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Transmission</dt>
                    <dd className="font-medium">{car.transmission === 'A' ? 'Automatic' : 'Manual'}</dd>
                  </div>
                )}
                {renderValue(car.doors) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Doors</dt>
                    <dd className="font-medium">{car.doors}</dd>
                  </div>
                )}
                {renderValue(car.mileage) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Mileage</dt>
                    <dd className="font-medium">{car.mileage.toLocaleString()} km</dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Rental Terms</h3>
              <dl className="space-y-2">
                {renderValue(car.minAge) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Minimum Age</dt>
                    <dd className="font-medium">{car.minAge} years</dd>
                  </div>
                )}
                {renderValue(car.insuranceType) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Insurance</dt>
                    <dd className="font-medium">{car.insuranceType}</dd>
                  </div>
                )}
                {renderValue(car.bookingFee) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Booking Fee</dt>
                    <dd className="font-medium">€{car.bookingFee}</dd>
                  </div>
                )}
                {renderValue(car.deductible) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Deductible</dt>
                    <dd className="font-medium">€{car.deductible}</dd>
                  </div>
                )}
                {renderValue(car.extraKmPrice) && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Extra KM Price</dt>
                    <dd className="font-medium">€{car.extraKmPrice}/km</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Additional Information */}
          {(renderValue(car.yearlyKm) || renderValue(car.insuranceType) || car.scoring !== undefined) && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="space-y-4">
                {renderValue(car.yearlyKm) && (
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Yearly Kilometer Allowance</p>
                      <p className="text-gray-600">{car.yearlyKm.toLocaleString()} km included</p>
                    </div>
                  </div>
                )}
                {renderValue(car.insuranceType) && (
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Insurance Coverage</p>
                      <p className="text-gray-600">{car.insuranceType} included</p>
                    </div>
                  </div>
                )}
                {car.scoring === false && (
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <p className="font-medium">No Credit Score Required</p>
                      <p className="text-gray-600">This vehicle is available without credit check</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Booking Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              {renderValue(car.licensePlate) && (
                <p className="text-gray-600">
                  License Plate: {car.licensePlate}
                  {renderValue(car.licensePlateCountry) && ` (${car.licensePlateCountry})`}
                </p>
              )}
            </div>
            <button
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                car.status === 'available'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={car.status !== 'available'}
            >
              {car.status === 'available' ? 'Book Now' : 'Currently Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}