'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export function EditorialFeature() {
  return (
    <section className="py-20 sm:py-28 bg-[#22201D] text-[#FAF9F5] relative overflow-hidden border-y border-[#33312C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Artisan Photography (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1A1917] group">
              <Image
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop"
                alt="Ceramic tea ceremony artisan shaping stoneware in Kyoto atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />

              {/* Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#22201D]/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Stable Atelier Caption Tray */}
            <div className="absolute -bottom-4 right-4 sm:right-6 bg-[#FAF9F5] text-[#21201D] p-5 rounded-xl border border-[#E8E4DA] shadow-xl max-w-xs">
              <p className="font-serif text-lg text-[#21201D] font-normal leading-snug">
                &ldquo;Form follows ritual.&rdquo;
              </p>
              <p className="text-xs text-[#8C642A] mt-1.5 font-medium">
                Kenji Takahashi &mdash; Ceramic Studio, Kyoto
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs text-[#A97B3C] font-medium mb-3">
              The direct workshop model
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF9F5] leading-[1.12] font-normal">
              Why we bypass wholesale retail markups.
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#FAF9F5]/75 leading-relaxed font-normal">
              Traditional home retail inflates prices by up to 500% to cover prime showroom leases, multi-tier broker commissions, and months of sitting warehouse stock. VÉRDEN connects you directly with the stonemasons, glass blowers, and joiners who shape each object.
            </p>

            <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#FAF9F5]/90">
              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#A97B3C] border border-[#A97B3C]/40">
                  <Check className="w-3 h-3" />
                </span>
                <div>
                  <strong className="text-white block font-medium">Source workshop inspection</strong>
                  <span className="text-[#FAF9F5]/65 text-xs">Every object undergoes a 7-point certification before packaging at the origin atelier.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#A97B3C] border border-[#A97B3C]/40">
                  <Check className="w-3 h-3" />
                </span>
                <div>
                  <strong className="text-white block font-medium">Direct fair compensation</strong>
                  <span className="text-[#FAF9F5]/65 text-xs">Partner studios receive up to 300% higher revenue per piece than from conventional bulk purchase orders.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#A97B3C] border border-[#A97B3C]/40">
                  <Check className="w-3 h-3" />
                </span>
                <div>
                  <strong className="text-white block font-medium">Authenticity & carbon-neutral transit</strong>
                  <span className="text-[#FAF9F5]/65 text-xs">Direct atelier shipment ensures genuine provenance with door-to-door delivery tracking.</span>
                </div>
              </div>
            </div>

            <div className="mt-9">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#A97B3C] hover:text-white transition-colors border-b border-[#A97B3C]/50 pb-1"
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
