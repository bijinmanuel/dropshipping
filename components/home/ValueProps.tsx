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
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-[#F6F6F8] transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 shrink-0 bg-white shadow-2xs">
                  <Icon className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-950 leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 font-normal">
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
