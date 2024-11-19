import React from 'react';
import { Home, Car, Settings, FileText, Users, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/admin' },
  { name: 'Cars', icon: Car, href: '/admin/cars' },
  { name: 'Pages', icon: FileText, href: '/admin/pages' },
  { name: 'Users', icon: Users, href: '/admin/users' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] fixed">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Icon className="mr-4 h-6 w-6" />
                {item.name}
              </a>
            );
          })}
        </div>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4">
        <button className="flex items-center px-2 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md w-full">
          <LogOut className="mr-4 h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  );
}