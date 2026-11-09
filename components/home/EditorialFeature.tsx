'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export function EditorialFeature() {
  return (
    <section className="py-24 sm:py-32 bg-[#23221F] text-[#FAF9F5] relative overflow-hidden border-y border-[#33312C]">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo Collage (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1A1917] group">
              <Image
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop"
                alt="Ceramic tea ceremony artisan in Kyoto atelier"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Editorial Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#23221F]/80 via-transparent to-[#23221F]/30 pointer-events-none" />
            </div>

            {/* Overlaid Floating Card with Physics Float */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#FAF9F5] text-[#21201D] p-6 rounded-2xl border border-[#E8E4DA] shadow-2xl max-w-xs animate-float">
              <p className="font-serif text-xl text-[#21201D] font-normal leading-snug">
                &ldquo;Form follows ritual.&rdquo;
              </p>
              <p className="text-[10px] text-[#B88E4C] mt-2 uppercase font-bold tracking-[0.25em] font-mono">
                Kyoto Master Kenji Takahashi
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-[#B88E4C] font-cinzel">
              Editorial Manifesto
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF9F5] mt-2 leading-[1.1] font-normal">
              Why we abolished conventional wholesale warehousing.
            </h2>

            <p className="mt-6 text-sm text-[#FAF9F5]/70 leading-relaxed font-normal">
              Traditional luxury retail inflates prices by up to 500% to offset expensive commercial flagship leases, multiple wholesale broker layers, and months of sitting warehouse stock. VÉRDEN connects discerning collectors directly with the master craftsmen who mold, carve, and wire each piece.
            </p>

            <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#FAF9F5]/90">
              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#B88E4C] border border-[#B88E4C]/30">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white block font-semibold text-sm font-serif">Direct-from-Source Inspection</strong>
                  <span className="text-[#FAF9F5]/60 text-xs">Each object undergoes photographic 7-point certification before dispatch from Kyoto, Verona, or Florence.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#B88E4C] border border-[#B88E4C]/30">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white block font-semibold text-sm font-serif">Fair Value to Artisans</strong>
                  <span className="text-[#FAF9F5]/60 text-xs">Partner studios receive up to 300% higher compensation per finished piece than traditional wholesale orders.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#B88E4C] border border-[#B88E4C]/30">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white block font-semibold text-sm font-serif">Guaranteed Authenticity</strong>
                  <span className="text-[#FAF9F5]/60 text-xs">Zero replica risks. Delivered duty-paid (DDP) directly to your door with carbon-neutral transit.</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B88E4C] hover:text-white transition-colors border-b border-[#B88E4C]/40 pb-1"
              >
                <span>Read our supply transparency report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
