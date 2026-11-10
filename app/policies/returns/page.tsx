import React from 'react';
import Link from 'next/link';

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-brand-border p-8 sm:p-14 shadow-subtle space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
          <div className="border-b border-brand-border pb-6">
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-brand-gold">
              Client Guarantee
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
              30-Day Living Trial &amp; Return Protocol
            </h1>
            <p className="text-xs text-brand-muted mt-2 font-mono">
              Last updated: Autumn 2026 &bull; Hassle-Free Reverse Logistics
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">1. The 30-Day Living Guarantee</h2>
            <p>
              We design objects meant to coexist peacefully within your home. If a piece does not suit your space, lighting, or aesthetic expectations, you may return it within 30 days of confirmed delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">2. Return Condition Requirements</h2>
            <p>
              Items must be in original condition with no unauthorized modifications, accompanied by original interior packaging and accessories (cables, diffusers, or certificate cards).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">3. Complimentary Return Courier Pickup</h2>
            <p>
              We provide pre-paid return shipping labels and can coordinate courier pickup directly from your residence or office.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">4. Refund Processing Speed</h2>
            <p>
              Once your return arrives at our regional inspection facility (Frankfurt or Kansai), it is evaluated within 24 hours. Refunds are issued instantly to your original payment method (processing bank arrival is typically 2–4 business days).
            </p>
          </section>

          <div className="pt-6 border-t border-brand-border flex items-center justify-between">
            <Link href="/contact" className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold underline underline-offset-2 transition-colors">
              Initiate a return with concierge &rarr;
            </Link>
            <Link href="/faq" className="text-xs text-brand-muted hover:text-brand-charcoal transition-colors">
              Browse FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
