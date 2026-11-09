'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-6 pb-16 lg:py-20 border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Seasonal Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-brand-forest-light border border-brand-forest/20 text-brand-forest text-xs font-semibold tracking-wider uppercase mb-6 w-fit animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Autumn / Winter &bull; Edition No. 04</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-hero text-brand-charcoal font-medium tracking-tight">
              Objects crafted to <br />
              <span className="italic font-normal text-brand-forest">outlive transient</span> trends.
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base text-brand-muted max-w-xl leading-relaxed">
              We collaborate directly with generational stonemasons, ceramic kilns, and acoustic artisans in Italy, Japan, and Scandinavia. Pure materials, uncompromised geometry, and direct-to-door dropship fulfillment without retail markups.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/shop"
                className="px-7 py-4 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-float flex items-center justify-center gap-2 group"
              >
                <span>Shop New Curation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="px-7 py-4 rounded-btn border border-brand-border bg-white text-brand-charcoal hover:border-brand-forest hover:text-brand-forest text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-brand-gold" />
                <span>Our Supply Manifesto</span>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="mt-10 pt-6 border-t border-brand-border/70 flex flex-wrap items-center gap-6 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success" />
                <span className="font-medium text-brand-charcoal">Direct Atelier Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-forest" />
                <span>30-Day In-Home Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-charcoal">100%</span>
                <span>Carbon Neutral Freight</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Visual Container */}
              <div className="relative aspect-product w-full rounded-2xl overflow-hidden shadow-float border border-brand-border">
                <Image
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop"
                  alt="Arcos Travertine Table Lamp in architectural living room"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Floating Product Tag */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-card bg-white/95 backdrop-blur-md border border-brand-border/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-forest">
                      Featured Object
                    </span>
                    <h4 className="text-xs font-semibold text-brand-charcoal truncate">
                      Arcos Travertine Table Lamp
                    </h4>
                    <p className="text-[11px] font-bold text-brand-forest mt-0.5">
                      $245 <span className="text-brand-muted font-normal line-through text-[10px]">$295</span>
                    </p>
                  </div>
                  <Link
                    href="/product/arcos-travertine-table-lamp"
                    className="p-2 rounded-btn bg-brand-forest text-white hover:bg-brand-forest-hover transition-colors shrink-0"
                    aria-label="View Arcos lamp"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Decorative Accent Card */}
              <div className="hidden sm:block absolute -top-4 -right-4 bg-brand-gold-light border border-brand-gold/30 rounded-card p-3 shadow-sm max-w-[170px] z-20">
                <p className="text-[10px] uppercase font-bold text-brand-charcoal tracking-wider">
                  Origin Verified
                </p>
                <p className="text-[11px] text-brand-muted mt-0.5">
                  Hand-quarried Roman travertine from Verona, Italy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

