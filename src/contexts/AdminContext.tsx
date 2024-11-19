import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

interface AdminContextType {
  cars: Car[];
  setCars: (cars: Car[]) => void;
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (car: Car) => void;
  deleteCar: (id: number) => void;
  testimonials: Testimonial[];
  updateTestimonial: (testimonial: Testimonial) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Anderson',
    role: 'Business Executive',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    content: 'The service was impeccable. The Mercedes S-Class I rented was in pristine condition and made my business trip truly memorable.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Event Planner',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    content: 'Outstanding fleet and exceptional customer service. The team went above and beyond to accommodate our special requests.',
    rating: 5
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Luxury Travel Blogger',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    content: 'As someone who regularly rents luxury vehicles, I can say that their service and vehicle quality are unmatched in the industry.',
    rating: 5
  }
];

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(() => {
    const savedCars = localStorage.getItem('adminCars');
    return savedCars ? JSON.parse(savedCars) : [];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const savedTestimonials = localStorage.getItem('adminTestimonials');
    return savedTestimonials ? JSON.parse(savedTestimonials) : defaultTestimonials;
  });

  useEffect(() => {
    localStorage.setItem('adminCars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('adminTestimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const addCar = (car: Omit<Car, 'id'>) => {
    const newCar = { ...car, id: Date.now() };
    setCars([...cars, newCar]);
  };

  const updateCar = (updatedCar: Car) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
  };

  const deleteCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const updateTestimonial = (updatedTestimonial: Testimonial) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
    ));
  };

  return (
    <AdminContext.Provider value={{ 
      cars, 
      setCars, 
      addCar, 
      updateCar, 
      deleteCar,
      testimonials,
      updateTestimonial
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}