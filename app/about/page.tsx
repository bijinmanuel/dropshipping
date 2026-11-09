import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Building2, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="border-b border-brand-border py-20 sm:py-28 bg-white/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold">
            The VÉRDEN Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-brand-charcoal mt-3 leading-tight font-normal">
            The architecture of considered living.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Founded on the conviction that everyday objects should elevate human ritual. We connect discerning collectors directly with master generational craftsmen across Europe and Asia, abolishing conventional distributor markups.
          </p>
        </div>
      </section>

      {/* Narrative Section with Editorial Visual */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-brand-border">
            <Image
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan ceramicist hand shaping a stoneware bowl"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm text-brand-charcoal/80 leading-relaxed">
            <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold">
              Our Sourcing Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-normal">
              Why decentralized direct-from-source fulfillment matters.
            </h2>
            <p>
              Traditional luxury retail creates mountains of sitting inventory, huge distributor margins, and unnecessary freight loops. Objects sit in dusty distribution centers for months before reaching your home.
            </p>
            <p>
              At VÉRDEN, we built a modern direct dropshipping logistics architecture. When you acquire an Arcos Lamp or a Kyoto Stoneware Set, our autonomous EDI orders route directly to the master atelier in Verona or Kyoto.
            </p>
            <p>
              Each piece undergoes our certified 7-point photographic inspection, is secured in biodegradable molded unbleached pulp, and takes flight via carbon-neutral express air cargo directly to your home.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-brand-border text-xs">
              <div>
                <span className="text-3xl font-serif font-normal text-brand-charcoal block">0%</span>
                <span className="text-brand-muted mt-1 block">Intermediary retail distributor markups</span>
              </div>
              <div>
                <span className="text-3xl font-serif font-normal text-brand-charcoal block">100%</span>
                <span className="text-brand-muted mt-1 block">Carbon-offset priority air freight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Craft Pillars */}
      <section className="bg-[#141514] text-white py-24 border-t border-brand-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mt-2 font-normal">
              Honest materials. Timeless forms.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-white/70">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-brand-gold" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Raw Geological Honesty
              </h3>
              <p className="leading-relaxed">
                We celebrate natural Roman travertine fissures, grain variations in solid walnut, and mineral speckles in reactive kiln glazes. No synthetic faux textures or cheap plastic veneers.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4 backdrop-blur-sm">
              <Building2 className="w-6 h-6 text-brand-gold" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Fair Atelier Partnerships
              </h3>
              <p className="leading-relaxed">
                Our craft partners receive up to 300% higher compensation per finished object than conventional wholesale procurement contracts permit.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-brand-gold" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
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
