'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Globe, Clock } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-card border border-brand-border p-8 sm:p-12 shadow-subtle space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
          <div className="border-b border-brand-border pb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-forest">
              Official Policy
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
              Worldwide Shipping &amp; Dropship Delivery
            </h1>
            <p className="text-xs text-brand-muted mt-2">
              Last updated: Autumn 2026 &bull; Direct Atelier Fulfillment Guidelines
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-brand-charcoal">1. Direct-From-Atelier Fulfillment Model</h2>
            <p>
              VÉRDEN operates a decentralized direct-to-consumer logistics network. Rather than warehousing delicate natural stone, ceramics, and handcrafted goods in secondary regional warehouses, all objects are inspected, secured in drop-tested packaging, and dispatched directly from our verified partner artisan workshops in Italy, Japan, Denmark, and certified hardware centers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-brand-charcoal">2. Processing &amp; Inspection Timeframes</h2>
            <p>
              Before dispatch, each object undergoes a meticulous 7-point quality inspection verifying dimensional tolerances, natural veining integrity, CE/UL electrical compliance, and vibration-resistant packaging seals. Standard processing takes 12 to 24 hours from purchase verification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-brand-charcoal">3. Shipping Tiers &amp; Transit Speeds</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Inspected Standard Courier (4–7 business days):</strong> Complimentary on all curations over $150 ($15 otherwise). Routed via DHL eCommerce, USPS Priority, or national postal express networks.</li>
              <li><strong>Priority Air Express (2–4 business days):</strong> $15 flat rate. Flown via dedicated air cargo with guaranteed priority ground courier handoff.</li>
              <li><strong>Curated White Glove Delivery (3–5 business days):</strong> $45 flat rate. Includes designated appointment scheduling, room placement, and uncrating of heavy furniture objects.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-brand-charcoal">4. Customs, Duties &amp; Taxes (DDP)</h2>
            <p>
              All shipments are dispatched DDP (Delivered Duty Paid). All applicable international tariffs, customs clearance processing charges, and destination taxes are fully included in the checkout price. Recipients will never be asked for additional payment at the door.
            </p>
          </section>

          <div className="pt-6 border-t border-brand-border flex items-center justify-between">
            <Link href="/track-order" className="text-xs font-semibold text-brand-forest hover:underline">
              Track an existing order &rarr;
            </Link>
            <Link href="/contact" className="text-xs text-brand-muted hover:text-brand-charcoal">
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
