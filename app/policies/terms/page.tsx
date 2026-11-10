import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-brand-border p-8 sm:p-14 shadow-subtle space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
          <div className="border-b border-brand-border pb-6">
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-brand-gold">
              Legal Framework
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
              Terms &amp; Conditions of Sale
            </h1>
            <p className="text-xs text-brand-muted mt-2 font-mono">
              Governing all purchase agreements, warranty coverage, and atelier fulfillments.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">1. Contract Formation</h2>
            <p>
              By placing an order through VÉRDEN Studio, you enter into a binding contract governed under international consumer retail law. An order confirmation email signifies acceptance of the order terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">2. Natural Materials &amp; Variations</h2>
            <p>
              Many VÉRDEN pieces are crafted from natural Roman travertine, solid walnut timbers, vegetable-tanned leather, and high-fired reactive ceramics. Subtle variations in stone veining, wood grain, or glaze specks are intrinsic characteristics of authentic craft and are not considered manufacturing defects.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">3. Structural Warranty</h2>
            <p>
              All lighting objects, furniture joinery, and audio equipment are backed by our standard 2-year manufacturer warranty covering structural joinery and electrical components against defects under normal residential usage.
            </p>
          </section>

          <div className="pt-6 border-t border-brand-border flex items-center justify-between">
            <Link href="/" className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold underline underline-offset-2 transition-colors">
              Return to Sanctuary &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
