import React from 'react';
import { Home, Car, Settings, FileText, Star, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/admin' },
  { name: 'Cars', icon: Car, href: '/admin/cars' },
  { name: 'Pages', icon: FileText, href: '/admin/pages' },
  { name: 'Testimonials', icon: Star, href: '/admin/testimonials' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-semibold text-gray-800">LuxeAuto Admin</span>
              <div className="hidden md:flex items-center space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      <Icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="py-8">{children}</div>
      </main>
    </div>
  );
}