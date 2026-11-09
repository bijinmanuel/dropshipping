'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export function CategoryBanners() {
  const displayCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60 gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
              Considered Living
            </span>
            <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
              Explore by Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-brand-forest hover:text-brand-forest-hover flex items-center gap-1 group"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col rounded-card overflow-hidden border border-brand-border/70 hover:border-brand-forest transition-all bg-background-subtle"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-background">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 text-brand-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="p-3 bg-white">
                <h3 className="text-xs font-semibold text-brand-charcoal group-hover:text-brand-forest truncate">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-brand-muted mt-0.5">
                  {cat.itemCount} {cat.itemCount === 1 ? 'object' : 'objects'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
