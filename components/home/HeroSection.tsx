'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, Compass, Truck, Globe, Clock } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-brand-border">
      {/* Background Ambient Radial Gold Glow */}
      <div className="absolute top-1/4 right-5 w-[650px] h-[650px] ambient-glow-mesh pointer-events-none -z-0 blur-3xl opacity-80" />
      <div className="absolute -top-24 left-10 w-[450px] h-[450px] bg-gradient-to-br from-amber-100/30 to-transparent rounded-full pointer-events-none -z-0 blur-2xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-fadeIn">
            {/* Seasonal Drop Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-pill bg-white border border-brand-border/80 text-brand-charcoal text-[11px] font-medium tracking-[0.2em] uppercase mb-8 w-fit shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
              <span className="w-2 h-2 rounded-full bg-brand-gold -ml-4" />
              <span className="font-cinzel text-[10px] text-brand-charcoal font-semibold">
                Atelier No. 04 &bull; Autumn / Winter Drop
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-brand-charcoal font-normal tracking-tight leading-[1.06]">
              Objects sculpted to <br />
              <span className="italic font-light text-brand-gold bg-gradient-to-r from-brand-gold via-amber-600 to-brand-gold bg-clip-text text-transparent">
                outlive transient
              </span>{' '}
              trends.
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base text-brand-muted max-w-xl leading-relaxed font-normal">
              Direct-from-source craftsmanship. We partner directly with generational stonemasons, ceramic kilns, and acoustic workshops in Italy, Japan, and Denmark&mdash;eliminating conventional wholesale retail markups.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 rounded-pill bg-[#141514] hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-float flex items-center justify-center gap-3 group relative overflow-hidden shimmer-gold-btn"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 rounded-pill border border-brand-border bg-white text-brand-charcoal hover:border-brand-charcoal text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 shadow-subtle hover:bg-[#FAF9F5]"
              >
                <Compass className="w-4 h-4 text-brand-gold" />
                <span>Our Supply Manifesto</span>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="mt-12 pt-8 border-t border-brand-border/70 flex flex-wrap items-center gap-8 text-xs text-brand-muted">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-700" />
                <span className="font-semibold text-brand-charcoal uppercase tracking-wider text-[11px]">Direct Atelier Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-charcoal font-medium">30-Day Living Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-brand-charcoal font-mono text-[13px]">100%</span>
                <span className="text-brand-charcoal font-medium">Carbon-Neutral Freight</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Gradient Scrims & Float Animation (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/20 via-stone-400/10 to-amber-600/20 blur-xl opacity-75 -z-10 animate-pulse-glow" />

              {/* Primary Visual Container with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-brand-border bg-white group">
                <Image
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop"
                  alt="Arcos Travertine Table Lamp in architectural living room"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Top Subtle Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Rich Scrim Gradient */}
                <div className="absolute inset-0 scrim-gradient-dark pointer-events-none" />

                {/* Top-Right Origin Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-pill glass-noir text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span>Verona Atelier &bull; Italy</span>
                </div>

                {/* Floating Translucent Glass Product Card (with Physics Float) */}
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl glass-noir text-white shadow-2xl animate-float">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-gold block font-mono">
                        Object No. 001 &bull; Roman Travertine
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-medium text-white truncate mt-0.5">
                        Arcos Travertine Table Lamp
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-mono font-bold text-white">$245</span>
                        <span className="text-white/50 font-mono line-through text-xs">$295</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-pill bg-brand-gold/25 text-brand-gold font-bold uppercase tracking-wider">
                          Save 17%
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/product/arcos-travertine-table-lamp"
                      className="w-10 h-10 rounded-full bg-white text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center shrink-0 shadow-lg group/btn"
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
      <div className="mt-14 pt-4 pb-4 border-y border-brand-border/80 bg-white/60 backdrop-blur-sm overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-12 text-[11px] font-cinzel font-semibold tracking-[0.25em] text-brand-charcoal uppercase">
          <span>Direct Atelier Sourcing</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Zero Intermediary Retail Markups</span>
          <span className="text-brand-gold">&bull;</span>
          <span>30-Day Living Trial Guarantee</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Carbon-Neutral Priority Air Cargo</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Master Italian Stonecraft</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Kyoto Ceramic Kilns</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Tuscan Full-Grain Vegetable Leather</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Direct Atelier Sourcing</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Zero Intermediary Retail Markups</span>
          <span className="text-brand-gold">&bull;</span>
          <span>30-Day Living Trial Guarantee</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Carbon-Neutral Priority Air Cargo</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Master Italian Stonecraft</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Kyoto Ceramic Kilns</span>
          <span className="text-brand-gold">&bull;</span>
          <span>Tuscan Full-Grain Vegetable Leather</span>
        </div>
      </div>
    </section>
  );
}
