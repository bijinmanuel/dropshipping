'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export function CategoryBanners() {
  const displayCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-black/[0.06] gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
              Considered Living
            </span>
            <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
              Explore by Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-charcoal hover:text-black flex items-center gap-1 group"
          >
            <span>All Curations</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col rounded-card-lg overflow-hidden border border-black/[0.07] hover:border-black/[0.2] transition-all bg-background-subtle shadow-subtle hover:shadow-float"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-background">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="p-3.5 bg-white">
                <h3 className="font-serif text-sm font-medium text-brand-charcoal group-hover:text-black truncate">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-brand-muted mt-0.5 font-mono tracking-wider">
                  {cat.itemCount} {cat.itemCount === 1 ? 'OBJECT' : 'OBJECTS'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
