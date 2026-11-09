'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export function CategoryBanners() {
  const displayCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-brand-border gap-4">
          <div>
            <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold font-cinzel">
              Architectural Taxonomy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal mt-1.5 font-normal">
              Explore by Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-charcoal hover:text-brand-gold flex items-center gap-1.5 group transition-colors"
          >
            <span>View All Curations</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-brand-border hover:border-brand-charcoal transition-all bg-white shadow-subtle hover:shadow-2xl"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-background">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Rich Cinematic Bottom-Up Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Floating Top-Right Arrow Pill */}
                <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-brand-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 shadow-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>

                {/* Overlay Text inside Image */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-brand-gold block font-semibold">
                    {cat.itemCount} {cat.itemCount === 1 ? 'OBJECT' : 'OBJECTS'}
                  </span>
                  <h3 className="font-serif text-base font-normal text-white group-hover:text-amber-200 transition-colors mt-0.5 leading-snug">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
