import React, { useState } from 'react';
import { Save, Eye, Globe } from 'lucide-react';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  lastModified: string;
}

const initialPages: Page[] = [
  {
    id: 1,
    title: 'Home',
    slug: '/',
    content: '# Welcome to LuxeAuto\n\nExperience luxury car rentals...',
    lastModified: '2024-03-15'
  },
  {
    id: 2,
    title: 'About Us',
    slug: '/about',
    content: '# About LuxeAuto\n\nWe are a premium car rental service...',
    lastModified: '2024-03-14'
  }
];

export default function PageEditor() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Page Management</h2>
      </div>

      <div className="grid grid-cols-4 min-h-[calc(100vh-12rem)]">
        {/* Page List Sidebar */}
        <div className="col-span-1 border-r border-gray-200 p-4">
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  selectedPage?.id === page.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{page.title}</div>
                <div className="text-sm text-gray-500">{page.slug}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="col-span-3 p-6">
          {selectedPage ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <input
                    type="text"
                    value={selectedPage.title}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, title: e.target.value })
                    }
                    className="text-2xl font-bold border-0 focus:ring-0 p-0"
                  />
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>{selectedPage.slug}</span>
                  </div>
                </div>
                <div className="space-x-4">
                  <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="border rounded-lg">
                <textarea
                  value={selectedPage.content}
                  onChange={(e) =>
                    setSelectedPage({ ...selectedPage, content: e.target.value })
                  }
                  className="w-full h-[calc(100vh-24rem)] p-4 rounded-lg focus:ring-0 border-0"
                  placeholder="Start writing your content here..."
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20">
              Select a page to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}