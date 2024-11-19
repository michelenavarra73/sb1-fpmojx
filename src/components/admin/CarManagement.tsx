import React, { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Search, X, Upload, Download, Copy, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface Car {
  id: number;
  name: string;
  class: string;
  fuelType: string;
  transmission: 'M' | 'A';
  consumption: string;
  passengers: number;
  engineSize: string;
  doors: number;
  mileage: number;
  minAge: number;
  price: number;
  monthlyPrice: number;
  deposit: number;
  insuranceType: string;
  bookingFee: number;
  availableIn: number;
  deductible: number;
  extraKmPrice: number;
  scoring: boolean;
  licensePlate: string;
  licensePlateCountry: string;
  yearlyKm: number;
  status: 'available' | 'rented' | 'maintenance';
  image: string;
}

const defaultImages = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80'
];

const CSV_TEMPLATE = `Model,Class,Fuel Type,Transmission,Consumption,Passengers,Engine Size,Doors,Mileage,Min Age,Daily Price,Monthly Price,Deposit,Insurance Type,Booking Fee,Available In,Deductible,Extra KM Price,Scoring,License Plate,License Plate Country,Yearly KM,Status,Image URL
Mercedes C200,Sedan,Petrol,A,7.1,5,1991,4,30000,21,89,899,1500,Full Coverage,122,40,250,0.19,true,ABC123,Spain,20000,available,https://images.unsplash.com/photo-1550355291-bbee04a92027`;

export default function CarManagement() {
  const { cars, addCar, updateCar, deleteCar } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Partial<Car> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageError, setImageError] = useState('');
  const [bulkUploadError, setBulkUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClone = (car: Car) => {
    const clonedCar = { ...car };
    delete (clonedCar as any).id;
    setSelectedCar(clonedCar);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const carData = {
      name: formData.get('name') as string,
      class: formData.get('class') as string,
      fuelType: formData.get('fuelType') as string,
      transmission: formData.get('transmission') as 'M' | 'A',
      consumption: formData.get('consumption') as string,
      passengers: parseInt(formData.get('passengers') as string) || 0,
      engineSize: formData.get('engineSize') as string,
      doors: parseInt(formData.get('doors') as string) || 0,
      mileage: parseInt(formData.get('mileage') as string) || 0,
      minAge: parseInt(formData.get('minAge') as string) || 18,
      price: parseFloat(formData.get('price') as string) || 0,
      monthlyPrice: parseFloat(formData.get('monthlyPrice') as string) || 0,
      deposit: parseFloat(formData.get('deposit') as string) || 0,
      insuranceType: formData.get('insuranceType') as string,
      bookingFee: parseFloat(formData.get('bookingFee') as string) || 0,
      availableIn: parseInt(formData.get('availableIn') as string) || 0,
      deductible: parseFloat(formData.get('deductible') as string) || 0,
      extraKmPrice: parseFloat(formData.get('extraKmPrice') as string) || 0,
      scoring: (formData.get('scoring') as string) === 'true',
      licensePlate: formData.get('licensePlate') as string,
      licensePlateCountry: formData.get('licensePlateCountry') as string,
      yearlyKm: parseInt(formData.get('yearlyKm') as string) || 0,
      status: formData.get('status') as 'available' | 'rented' | 'maintenance',
      image: formData.get('image') as string || defaultImages[0]
    };

    if (selectedCar?.id) {
      updateCar({ ...carData, id: selectedCar.id });
    } else {
      addCar(carData);
    }
    
    setIsModalOpen(false);
    setSelectedCar(null);
    setImageError('');
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'car_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvContent = event.target?.result as string;
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',');

        const cars = lines.slice(1).map(line => {
          if (!line.trim()) return null;
          
          const values = line.split(',');
          const car: any = {};
          
          headers.forEach((header, index) => {
            const value = values[index]?.trim();
            if (!value) return;

            const key = header.trim()
              .toLowerCase()
              .replace(/ /g, '')
              .replace('dailyprice', 'price')
              .replace('imageurl', 'image');

            if (['price', 'monthlyprice', 'deposit', 'bookingfee', 'deductible', 'extrakmPrice'].includes(key)) {
              car[key] = parseFloat(value);
            } else if (['passengers', 'doors', 'mileage', 'minage', 'availablein', 'yearlykm'].includes(key)) {
              car[key] = parseInt(value);
            } else if (key === 'scoring') {
              car[key] = value.toLowerCase() === 'true';
            } else {
              car[key] = value;
            }
          });

          return car;
        }).filter(Boolean);

        cars.forEach(car => addCar(car));
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setBulkUploadError('');
      } catch (error) {
        setBulkUploadError('Error processing CSV file. Please check the format and try again.');
        console.error('Bulk upload error:', error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 max-w-xs relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Template
            </button>
            
            <label className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleBulkUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={() => {
              setSelectedCar(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Car
          </button>
        </div>
      </div>

      {bulkUploadError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{bulkUploadError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImages[0];
                }}
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleClone(car)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCar(car);
                    setIsModalOpen(true);
                  }}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this car?')) {
                      deleteCar(car.id);
                    }
                  }}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${car.price}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  car.status === 'available' ? 'bg-green-100 text-green-800' : 
                  car.status === 'rented' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {car.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Car Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {selectedCar?.id ? 'Edit Car' : 'Add New Car'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCar(null);
                  setImageError('');
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedCar?.name}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Class</label>
                  <input
                    type="text"
                    name="class"
                    defaultValue={selectedCar?.class}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                  <input
                    type="text"
                    name="fuelType"
                    defaultValue={selectedCar?.fuelType}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Transmission</label>
                  <select
                    name="transmission"
                    defaultValue={selectedCar?.transmission || 'A'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="A">Automatic</option>
                    <option value="M">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Consumption (l/100km)</label>
                  <input
                    type="text"
                    name="consumption"
                    defaultValue={selectedCar?.consumption}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    defaultValue={selectedCar?.passengers}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Engine Size (cc)</label>
                  <input
                    type="text"
                    name="engineSize"
                    defaultValue={selectedCar?.engineSize}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Doors</label>
                  <input
                    type="number"
                    name="doors"
                    defaultValue={selectedCar?.doors}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                  <input
                    type="number"
                    name="mileage"
                    defaultValue={selectedCar?.mileage}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Age</label>
                  <input
                    type="number"
                    name="minAge"
                    defaultValue={selectedCar?.minAge || 18}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Daily Price (€)</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedCar?.price}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Price (€)</label>
                  <input
                    type="number"
                    name="monthlyPrice"
                    defaultValue={selectedCar?.monthlyPrice}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Deposit (€)</label>
                  <input
                    type="number"
                    name="deposit"
                    defaultValue={selectedCar?.deposit}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Insurance Type</label>
                  <input
                    type="text"
                    name="insuranceType"
                    defaultValue={selectedCar?.insuranceType}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Booking Fee (€)</label>
                  <input
                    type="number"
                    name="bookingFee"
                    defaultValue={selectedCar?.bookingFee}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Available In (days)</label>
                  <input
                    type="number"
                    name="availableIn"
                    defaultValue={selectedCar?.availableIn}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Deductible (€)</label>
                  <input
                    type="number"
                    name="deductible"
                    defaultValue={selectedCar?.deductible}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Extra KM Price (€)</label>
                  <input
                    type="number"
                    name="extraKmPrice"
                    defaultValue={selectedCar?.extraKmPrice}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Scoring Available</label>
                  <select
                    name="scoring"
                    defaultValue={selectedCar?.scoring?.toString() || 'true'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">License Plate</label>
                  <input
                    type="text"
                    name="licensePlate"
                    defaultValue={selectedCar?.licensePlate}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">License Plate Country</label>
                  <input
                    type="text"
                    name="licensePlateCountry"
                    defaultValue={selectedCar?.licensePlateCountry}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Yearly KM</label>
                  <input
                    type="number"
                    name="yearlyKm"
                    defaultValue={selectedCar?.yearlyKm}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    defaultValue={selectedCar?.status || 'available'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={selectedCar?.image}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {imageError && (
                  <p className="mt-1 text-sm text-red-600">{imageError}</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedCar(null);
                    setImageError('');
                  }}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {selectedCar?.id ? 'Update' : 'Add'} Car
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}