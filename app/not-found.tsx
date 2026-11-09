import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#FAF9F5] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-5">
        <span className="font-serif text-7xl text-brand-gold font-light block">404</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-normal">
          Object Not Located
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          The curation or department you are seeking has retired from the permanent archive or moved to a new atelier location.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-pill bg-[#141514] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-subtle flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-brand-gold" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            href="/shop"
            className="px-7 py-3.5 rounded-pill border border-brand-border bg-white text-brand-charcoal hover:border-brand-charcoal text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
