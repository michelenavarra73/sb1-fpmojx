import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import { AuthProvider } from './contexts/AuthContext';
import AdminRoute from './components/admin/AdminRoute';
import AdminLogin from './pages/AdminLogin';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import RentalSteps from './components/RentalSteps';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';
import CarManagement from './components/admin/CarManagement';
import TestimonialManagement from './components/admin/TestimonialManagement';
import Cars from './pages/Cars';

function App() {
  const path = window.location.pathname;

  return (
    <AuthProvider>
      <AdminProvider>
        <LanguageProvider>
          <div className="min-h-screen">
            {path.startsWith('/admin') ? (
              path === '/admin/login' ? (
                <AdminLogin />
              ) : (
                <AdminRoute>
                  <AdminLayout>
                    {path === '/admin' && <CarManagement />}
                    {path === '/admin/cars' && <CarManagement />}
                    {path === '/admin/testimonials' && <TestimonialManagement />}
                  </AdminLayout>
                </AdminRoute>
              )
            ) : (
              <>
                <Navbar />
                {path === '/' && (
                  <>
                    <Hero />
                    <Fleet />
                    <RentalSteps />
                    <Features />
                    <Testimonials />
                    <Contact />
                  </>
                )}
                {path === '/cars' && <Cars />}
                <Footer />
              </>
            )}
          </div>
        </LanguageProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;