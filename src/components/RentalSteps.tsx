import React from 'react';
import { Search, Upload, CheckCircle, CreditCard, Clock, Shield, FileCheck, CreditCard as PaymentIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function RentalSteps() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('steps.search.title'),
      description: t('steps.search.desc')
    },
    {
      icon: Upload,
      title: t('steps.upload.title'),
      description: t('steps.upload.desc')
    },
    {
      icon: CheckCircle,
      title: t('steps.approval.title'),
      description: t('steps.approval.desc')
    },
    {
      icon: CreditCard,
      title: t('steps.confirm.title'),
      description: t('steps.confirm.desc')
    }
  ];

  const features = [
    {
      icon: Clock,
      title: t('features.support.title'),
      description: t('features.support.desc')
    },
    {
      icon: Shield,
      title: t('features.insured.title'),
      description: t('features.insured.desc')
    },
    {
      icon: FileCheck,
      title: t('features.pickup.title'),
      description: t('features.pickup.desc')
    },
    {
      icon: PaymentIcon,
      title: t('features.price.title'),
      description: t('features.price.desc')
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900">
            {t('steps.title')}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t('steps.subtitle')}
          </p>
        </div>

        {/* AI-Powered Approval Info */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            {t('steps.ai.title')}
          </h3>
          <p className="text-lg text-blue-800">
            {t('steps.ai.description')}
          </p>
          <div className="mt-6 inline-flex items-center text-blue-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>{t('steps.ai.open')}</span>
          </div>
        </div>

        {/* Rental Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-600"></div>
                  </div>
                )}
                
                <div className="relative z-10 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 mb-8">
            {t('steps.simple')}
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
            {t('steps.start')}
          </button>
        </div>
      </div>
    </section>
  );
}