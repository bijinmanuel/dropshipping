'use client';

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, Award, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    icon: Truck,
    title: 'Inspected Direct Dropshipping',
    description: 'Bypassing wholesale distributors, orders are inspected and dispatched directly from master craft centers with end-to-end tracking.',
  },
  {
    icon: ShieldCheck,
    title: '7-Point Quality Guarantee',
    description: 'Every lamp, ceramic set, and leather hide undergoes laser and optical inspection for finish, electrical CE/UL ratings, and seam strength.',
  },
  {
    icon: RefreshCw,
    title: '30-Day In-Home Trial',
    description: 'Experience your objects in your own home light. If anything does not resonate with your aesthetic, return it for a complete 100% refund.',
  },
  {
    icon: Headphones,
    title: 'Private Client Concierge',
    description: 'Direct access to interior architects and logistics specialists available 7 days a week via email, phone, and direct messaging.',
  },
];

export function ValueProps() {
  return (
    <section className="py-16 sm:py-24 bg-background border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
            The VÉRDEN Standard
          </span>
          <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
            Built on integrity, transparency, and architectural longevity.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-card p-6 border border-brand-border/70 hover:border-brand-forest/40 hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-btn bg-brand-forest-light text-brand-forest flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-brand-charcoal tracking-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
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
