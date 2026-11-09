'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Context Indicator */}
            <div className="flex items-center gap-2.5 text-xs text-[#706B62] mb-6 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A97B3C]" />
              <span>Direct atelier releases from Verona, Kyoto, and Copenhagen</span>
            </div>

            {/* Headline - Clean, un-gimmicked, architectural typography */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] text-[#21201D] font-normal tracking-tight leading-[1.08] max-w-2xl">
              Objects sculpted for spaces that outlast trends.
            </h1>

            {/* Description - Grounded in subject matter & material honesty */}
            <p className="mt-6 text-base sm:text-lg text-[#5A564E] max-w-xl leading-relaxed font-normal">
              Direct-from-source craftsmanship. We partner with generational stonemasons, ceramic kilns, and woodworking ateliers across Italy, Japan, and Denmark—eliminating conventional retail showroom markups.
            </p>

            {/* Call to Actions - Active, specific verbs */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/shop"
                className="px-7 py-3.5 rounded-full bg-[#21201D] hover:bg-[#2F2E2A] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-sm flex items-center justify-center gap-3 group"
              >
                <span>Explore the collection</span>
                <ArrowRight className="w-4 h-4 text-[#A97B3C] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="px-7 py-3.5 rounded-full border border-[#D9D3C7] bg-white text-[#21201D] hover:border-[#21201D] text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2.5 hover:bg-[#FAF9F5]"
              >
                <Compass className="w-4 h-4 text-[#A97B3C]" />
                <span>Our sourcing manifesto</span>
              </Link>
            </div>

            {/* Trust Provenance Points */}
            <div className="mt-12 pt-7 border-t border-[#EAE6DF] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#615D55]">
              <div>
                <p className="font-semibold text-[#21201D]">Direct Atelier Dispatch</p>
                <p className="text-[11px] text-[#7A756B] mt-0.5">Inspected at source prior to packaging</p>
              </div>
              <div>
                <p className="font-semibold text-[#21201D]">30-Day Living Trial</p>
                <p className="text-[11px] text-[#7A756B] mt-0.5">Experience in your own ambient light</p>
              </div>
              <div>
                <p className="font-semibold text-[#21201D]">Carbon-Neutral Freight</p>
                <p className="text-[11px] text-[#7A756B] mt-0.5">Custom molded unbleached pulp cartons</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Visual Container with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-[#EAE6DF] bg-white group">
                <Image
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop"
                  alt="Arcos Travertine Table Lamp in architectural living room"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Subtle scrim at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Origin Tag Top Right */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#21201D] text-[11px] font-medium flex items-center gap-2 shadow-sm border border-[#E2DDD2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A97B3C]" />
                  <span>Verona Atelier, Italy</span>
                </div>

                {/* Object Identification Tray */}
                <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-xl bg-white/95 backdrop-blur-md text-[#21201D] shadow-lg border border-[#EAE6DF]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-medium text-[#7A756B] block">
                        Solid Roman Travertine &middot; Warm 2700K LED
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-[#21201D] truncate mt-0.5">
                        Arcos Travertine Table Lamp
                      </h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-semibold font-mono text-[#21201D]">$245</span>
                        <span className="text-[#8F8A7F] font-mono line-through text-xs">$295</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3EFE6] text-[#8C642A] font-medium">
                          Direct pricing
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/product/arcos-travertine-table-lamp"
                      className="w-10 h-10 rounded-full bg-[#21201D] text-white hover:bg-[#A97B3C] transition-colors flex items-center justify-center shrink-0 shadow-sm"
                      aria-label="View Arcos lamp details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
