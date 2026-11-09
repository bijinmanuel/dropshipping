'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Truck, Sparkles, Building2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-white border-b border-brand-border/60 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
            The VÉRDEN Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-charcoal mt-2 leading-tight">
            The architecture of considered living.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Founded on the conviction that everyday objects should elevate human ritual. We connect discerning collectors directly with master generational craftsmen across Europe and Asia, abolishing conventional distributor markups.
          </p>
        </div>
      </section>

      {/* Narrative Section with Editorial Visual */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-product w-full rounded-2xl overflow-hidden shadow-float border border-brand-border">
            <Image
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan ceramicist hand shaping a stoneware bowl"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm text-brand-charcoal/80 leading-relaxed">
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
              Our Sourcing Philosophy
            </span>
            <h2 className="font-serif text-3xl text-brand-charcoal">
              Why decentralized direct-from-source fulfillment matters.
            </h2>
            <p>
              Traditional retail creates mountains of sitting inventory, huge distributor margins, and unnecessary freight loops. Objects sit in dusty distribution centers for months before reaching your home.
            </p>
            <p>
              At VÉRDEN, we built a modern direct dropshipping logistics architecture. When you acquire an Arcos Lamp or a Kyoto Stoneware Set, our autonomous EDI orders route directly to the master atelier in Verona or Kyoto.
            </p>
            <p>
              Each piece undergoes our certified 7-point photographic inspection, is secured in biodegradable molded unbleached pulp, and takes flight via carbon-neutral express air cargo directly to your home.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-border/60 text-xs">
              <div>
                <span className="text-2xl font-serif font-bold text-brand-forest block">0%</span>
                <span className="text-brand-muted">Intermediary retail distributor markups</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-brand-forest block">100%</span>
                <span className="text-brand-muted">Carbon-offset priority air freight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Craft Pillars */}
      <section className="bg-brand-charcoal text-white py-20 border-t border-brand-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-gold">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl text-white mt-1">
              Honest materials. Timeless forms.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-white/70">
            <div className="bg-white/5 p-6 rounded-card border border-white/10 space-y-3">
              <Sparkles className="w-6 h-6 text-brand-gold" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Raw Geological Honesty
              </h3>
              <p className="leading-relaxed">
                We celebrate natural stone fissures, grain variations in walnut, and mineral speckles in reactive kiln glazes. No synthetic faux textures or cheap plastic veneers.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-card border border-white/10 space-y-3">
              <Building2 className="w-6 h-6 text-brand-gold" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Fair Atelier Partnerships
              </h3>
              <p className="leading-relaxed">
                Our craftsmen receive up to 300% higher compensation per finished object than conventional wholesale procurement contracts permit.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-card border border-white/10 space-y-3">
              <ShieldCheck className="w-6 h-6 text-brand-gold" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                The 30-Day Living Trial
              </h3>
              <p className="leading-relaxed">
                We believe you cannot truly judge an object in a brightly lit showroom. Place it on your desk or nightstand. If it fails to calm your soul, we arrange return collection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

