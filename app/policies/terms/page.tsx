'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-card border border-brand-border p-8 sm:p-12 shadow-subtle space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
          <div className="border-b border-brand-border pb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-forest">
              Legal Framework
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
              Terms &amp; Conditions of Sale
            </h1>
            <p className="text-xs text-brand-muted mt-2">
              Governing all purchase agreements, warranty coverage, and atelier fulfillments.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-brand-charcoal">1. Contract Formation</h2>
            <p>
              By placing an order through VÉRDEN Studio, you enter into a binding contract governed under international consumer retail law. An order confirmation email signifies acceptance of the order terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-brand-charcoal">2. Natural Materials &amp; Variations</h2>
            <p>
              Many VÉRDEN pieces are crafted from natural Roman travertine, solid walnut timbers, vegetable-tanned leather, and high-fired reactive ceramics. Subtle variations in stone veining, wood grain, or glaze specks are intrinsic characteristics of authentic craft and are not considered manufacturing defects.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-brand-charcoal">3. Structural Warranty</h2>
            <p>
              All lighting objects, furniture joinery, and audio equipment are backed by our standard 2-year manufacturer warranty covering structural joinery and electrical components against defects under normal residential usage.
            </p>
          </section>

          <div className="pt-6 border-t border-brand-border flex items-center justify-between">
            <Link href="/" className="text-xs font-semibold text-brand-forest hover:underline">
              Return to Store &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
