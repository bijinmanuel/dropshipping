'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EAE6DF]">
      {/* Background Ambient Radial Gold Glow */}
      <div className="absolute top-1/4 right-5 w-[650px] h-[650px] ambient-glow-mesh pointer-events-none -z-0 blur-3xl opacity-80" />
      <div className="absolute -top-24 left-10 w-[450px] h-[450px] bg-gradient-to-br from-amber-100/30 to-transparent rounded-full pointer-events-none -z-0 blur-2xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-fadeIn">
            {/* Seasonal Drop Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-pill bg-white border border-[#E2DDD2] text-[#21201D] text-[11px] font-medium tracking-[0.2em] uppercase mb-8 w-fit shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#B88E4C] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#B88E4C] -ml-4" />
              <span className="font-cinzel text-[10px] text-[#21201D] font-semibold">
                Edition No. 04 &bull; Autumn / Winter Drop
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#21201D] font-normal tracking-tight leading-[1.06]">
              Objects sculpted to <br />
              <span className="italic font-light text-[#B88E4C] bg-gradient-to-r from-[#B88E4C] via-[#A27938] to-[#B88E4C] bg-clip-text text-transparent">
                outlive transient
              </span>{' '}
              trends.
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base text-[#6E6A61] max-w-xl leading-relaxed font-normal">
              Direct-from-source craftsmanship. We partner directly with generational stonemasons, ceramic kilns, and acoustic workshops in Italy, Japan, and Denmark&mdash;eliminating conventional wholesale retail markups.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 rounded-pill bg-[#21201D] hover:bg-[#2F2E2A] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-float flex items-center justify-center gap-3 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 text-[#B88E4C] group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 rounded-pill border border-[#DDD8CD] bg-white text-[#21201D] hover:border-[#21201D] text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 shadow-2xs hover:bg-[#FAF9F5]"
              >
                <Compass className="w-4 h-4 text-[#B88E4C]" />
                <span>Our Supply Manifesto</span>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="mt-12 pt-8 border-t border-[#EAE6DF] flex flex-wrap items-center gap-8 text-xs text-[#7A756B]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-700" />
                <span className="font-semibold text-[#21201D] uppercase tracking-wider text-[11px]">Direct Atelier Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B88E4C]" />
                <span className="text-[#21201D] font-medium">30-Day Living Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#21201D] font-mono text-[13px]">100%</span>
                <span className="text-[#21201D] font-medium">Carbon-Neutral Freight</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/20 via-stone-400/10 to-amber-600/20 blur-xl opacity-75 -z-10 animate-pulse-glow" />

              {/* Primary Visual Container with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#EAE6DF] bg-white group">
                <Image
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop"
                  alt="Arcos Travertine Table Lamp in architectural living room"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Top Subtle Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Scrim Gradient */}
                <div className="absolute inset-0 scrim-gradient-dark pointer-events-none" />

                {/* Top-Right Origin Badge in Alabaster Glass */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-pill bg-[#FAF9F5]/90 backdrop-blur-md text-[#21201D] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-[#E2DDD2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B88E4C] animate-pulse" />
                  <span>Verona Atelier &bull; Italy</span>
                </div>

                {/* Floating Translucent Glass Product Card */}
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-white/95 backdrop-blur-md text-[#21201D] shadow-2xl animate-float border border-[#EAE6DF]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#B88E4C] block font-mono">
                        Object No. 001 &bull; Roman Travertine
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-medium text-[#21201D] truncate mt-0.5">
                        Arcos Travertine Table Lamp
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-mono font-bold text-[#21201D]">$245</span>
                        <span className="text-[#8F8A7F] font-mono line-through text-xs">$295</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-pill bg-[#FAF9F5] border border-[#E8E4DA] text-[#B88E4C] font-bold uppercase tracking-wider">
                          Save 17%
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/product/arcos-travertine-table-lamp"
                      className="w-10 h-10 rounded-full bg-[#21201D] text-white hover:bg-[#B88E4C] transition-all flex items-center justify-center shrink-0 shadow-md group/btn"
                      aria-label="View Arcos lamp details"
                    >
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Ticker Strip below Hero */}
      <div className="mt-14 pt-4 pb-4 border-y border-[#EAE6DF] bg-white/60 backdrop-blur-sm overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-12 text-[11px] font-cinzel font-semibold tracking-[0.25em] text-[#3A3834] uppercase">
          <span>Direct Atelier Sourcing</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Zero Intermediary Retail Markups</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>30-Day Living Trial Guarantee</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Carbon-Neutral Priority Air Cargo</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Master Italian Stonecraft</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Kyoto Ceramic Kilns</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Tuscan Full-Grain Vegetable Leather</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Direct Atelier Sourcing</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Zero Intermediary Retail Markups</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>30-Day Living Trial Guarantee</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Carbon-Neutral Priority Air Cargo</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Master Italian Stonecraft</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Kyoto Ceramic Kilns</span>
          <span className="text-[#B88E4C]">&bull;</span>
          <span>Tuscan Full-Grain Vegetable Leather</span>
        </div>
      </div>
    </section>
  );
}
