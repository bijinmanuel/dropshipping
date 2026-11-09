'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <span className="font-serif text-6xl text-brand-forest font-light">404</span>
        <h1 className="font-serif text-3xl text-brand-charcoal">
          Object Not Located
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          The curation or department you are seeking has retired from the permanent archive or moved to a new atelier location.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            href="/shop"
            className="px-6 py-3 rounded-btn border border-brand-border bg-white text-brand-charcoal hover:border-brand-forest text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
