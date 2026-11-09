'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export function EditorialFeature() {
  return (
    <section className="py-20 sm:py-28 bg-brand-charcoal text-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo Collage (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-product w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop"
                alt="Ceramic tea ceremony artisan in Kyoto atelier"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlaid Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-brand-forest p-5 rounded-card border border-brand-forest-hover shadow-float max-w-xs">
              <p className="font-serif text-lg text-white font-medium">
                &ldquo;Form follows ritual.&rdquo;
              </p>
              <p className="text-[11px] text-brand-gold mt-1 uppercase tracking-wider">
                Kyoto Ceramic Master Kenji Takahashi
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-gold">
              Editorial Manifesto
            </span>

            <h2 className="font-serif text-page-title text-white mt-2 leading-tight">
              Why we abolished conventional wholesale warehousing.
            </h2>

            <p className="mt-6 text-sm text-white/70 leading-relaxed">
              Traditional luxury brands inflate prices 500% to offset retail rents, distributor layers, and sitting warehouse inventory. VÉRDEN connects you directly with the master artisans who shape your objects.
            </p>

            <div className="mt-8 space-y-4 text-xs sm:text-sm text-white/90">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-forest flex items-center justify-center shrink-0 mt-0.5 text-brand-gold">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white block font-semibold">Direct-from-Source Inspection</strong>
                  <span className="text-white/60 text-xs">Each object undergoes photographic 7-point certification before dispatch from Kyoto, Verona, or Florence.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-forest flex items-center justify-center shrink-0 mt-0.5 text-brand-gold">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white block font-semibold">Fair Value to Artisans</strong>
                  <span className="text-white/60 text-xs">Partner studios receive up to 3× higher margins than traditional wholesale purchase orders.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-forest flex items-center justify-center shrink-0 mt-0.5 text-brand-gold">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white block font-semibold">Guaranteed Authenticity</strong>
                  <span className="text-white/60 text-xs">Zero replica risks. Delivered duty-paid directly to your door with carbon-neutral transit.</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold hover:text-white transition-colors border-b border-brand-gold/40 pb-1"
              >
                <span>Read our full supply chain transparency report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

