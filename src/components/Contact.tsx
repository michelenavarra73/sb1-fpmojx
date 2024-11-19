import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-xl text-gray-600">Get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold">Phone</h3>
              </div>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">+1 (555) 987-6543</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold">Email</h3>
              </div>
              <p className="text-gray-600">info@luxeauto.com</p>
              <p className="text-gray-600">support@luxeauto.com</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold">Location</h3>
              </div>
              <p className="text-gray-600">123 Luxury Avenue</p>
              <p className="text-gray-600">Beverly Hills, CA 90210</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold">Business Hours</h3>
              </div>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>

          <form className="space-y-6 bg-gray-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}