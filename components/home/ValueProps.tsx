'use client';

import React from 'react';
import { ShieldCheck, Truck, Lock, Star } from 'lucide-react';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    description: 'Guaranteed best materials',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: 'Your data is protected',
  },
  {
    icon: Star,
    title: 'Customer Satisfaction',
    description: 'Top rated by our customers',
  },
];

export function ValueProps() {
  return (
    <section className="py-10 sm:py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-gray-50/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 shrink-0">
                  <Icon className="w-4 h-4 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
