import React from 'react';
import { Shield, Clock, MapPin, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All our vehicles come with comprehensive insurance coverage for your peace of mind.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to assist you whenever you need help.'
  },
  {
    icon: MapPin,
    title: 'Flexible Pick-up',
    description: 'Choose from multiple convenient locations for vehicle pick-up and drop-off.'
  },
  {
    icon: HeartHandshake,
    title: 'Best Price Guarantee',
    description: 'We offer competitive rates and match any comparable offer from our competitors.'
  }
];

export default function Features() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-xl text-gray-600">Experience the difference with our premium service</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative p-6 bg-gray-50 rounded-xl transition-transform duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}