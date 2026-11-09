'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-20 lg:py-24 border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Seasonal Drop Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-white border border-black/[0.08] text-brand-charcoal text-[11px] font-semibold tracking-[0.12em] uppercase mb-7 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span>Autumn / Winter &bull; Edition No. 04</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-hero text-brand-charcoal font-normal tracking-tight">
              Objects sculpted to <br />
              <span className="italic text-brand-gold font-light">outlive transient</span> trends.
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base text-brand-muted max-w-xl leading-relaxed font-normal">
              Direct-from-source craftsmanship. We partner exclusively with generational stonemasons, ceramic kilns, and precision acoustic workshops in Italy, Japan, and Scandinavia&mdash;eliminating intermediary wholesale markups.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/shop"
                className="px-8 py-4 rounded-btn bg-black hover:bg-black/90 text-white text-[11px] font-bold uppercase tracking-[0.18em] transition-all shadow-float flex items-center justify-center gap-2.5 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 rounded-btn border border-black/[0.1] bg-white text-brand-charcoal hover:border-black text-[11px] font-bold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Compass className="w-3.5 h-3.5 text-brand-gold" />
                <span>Our Supply Manifesto</span>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="mt-12 pt-7 border-t border-black/[0.06] flex flex-wrap items-center gap-8 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success" />
                <span className="font-semibold text-brand-charcoal">Direct Atelier Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>30-Day Living Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-brand-charcoal font-mono">100%</span>
                <span>Carbon Neutral Air Cargo</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Visual Container */}
              <div className="relative aspect-product w-full rounded-2xl overflow-hidden shadow-float border border-black/[0.08] bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop"
                  alt="Arcos Travertine Table Lamp in architectural living room"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Floating Translucent Glass Product Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-card-lg bg-white/90 backdrop-blur-md border border-white/40 shadow-float flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-gold block">
                      Curated Object &bull; Verona, Italy
                    </span>
                    <h4 className="font-serif text-sm font-medium text-brand-charcoal truncate mt-0.5">
                      Arcos Travertine Table Lamp
                    </h4>
                    <p className="text-xs font-bold text-black mt-0.5">
                      $245 <span className="text-brand-muted font-normal line-through text-[11px]">$295</span>
                    </p>
                  </div>
                  <Link
                    href="/product/arcos-travertine-table-lamp"
                    className="p-2.5 rounded-full bg-black text-white hover:bg-black/80 transition-colors shrink-0 shadow-sm"
                    aria-label="View Arcos lamp details"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Decorative Accent Tag */}
              <div className="hidden sm:block absolute -top-3 -right-3 bg-white/95 backdrop-blur-sm border border-black/[0.08] rounded-card p-3 shadow-subtle max-w-[170px] z-20">
                <p className="text-[9px] uppercase font-bold text-brand-gold tracking-[0.2em]">
                  Origin Verified
                </p>
                <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">
                  Roman travertine quarried in Verona, Italy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
