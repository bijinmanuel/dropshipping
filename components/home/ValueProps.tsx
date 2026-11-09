'use client';

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const PILLARS = [
  {
    icon: Truck,
    title: 'Inspected Direct Dispatch',
    description: 'Bypassing wholesale distributors, orders are inspected and sent directly from craft centers in Europe and Asia with tracking.',
  },
  {
    icon: ShieldCheck,
    title: 'Material Integrity Guarantee',
    description: 'Every lamp, ceramic vessel, and wood form undergoes inspection for structural finish, electrical CE/UL ratings, and joinery.',
  },
  {
    icon: RefreshCw,
    title: '30-Day Living Home Trial',
    description: 'Experience your objects in your own ambient home light. If a piece does not settle into your interior, returns are simple.',
  },
  {
    icon: Headphones,
    title: 'Private Client Concierge',
    description: 'Direct contact with product specialists for dimension queries, custom material specs, and delivery schedule coordination.',
  },
];

export function ValueProps() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#21201D] font-normal">
            The VÉRDEN Standard
          </h2>
          <p className="text-xs sm:text-sm text-[#706B62] mt-1.5 leading-relaxed">
            Every operational decision is designed around material longevity and transparent direct sourcing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#EAE6DF] hover:border-[#21201D] transition-colors flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF9F5] text-[#21201D] flex items-center justify-center mb-5 border border-[#EAE6DF]">
                    <Icon className="w-4 h-4 text-[#A97B3C]" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#21201D] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#706B62] leading-relaxed font-normal">
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
