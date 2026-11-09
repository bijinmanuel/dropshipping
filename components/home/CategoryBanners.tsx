'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export function CategoryBanners() {
  const displayCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE6DF] gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#21201D] font-normal">
              Curated by Department
            </h2>
            <p className="text-xs sm:text-sm text-[#706B62] mt-1">
              Explore living objects organized by material discipline and architectural placement.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-medium text-[#21201D] hover:text-[#A97B3C] flex items-center gap-1.5 group transition-colors self-start sm:self-auto"
          >
            <span>View all departments</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col rounded-xl overflow-hidden border border-[#EAE6DF] hover:border-[#21201D] transition-all bg-white shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF9F5]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Warm Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1B]/85 via-[#1F1E1B]/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Corner Arrow */}
                <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm text-[#21201D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3 h-3" />
                </span>

                {/* Category Details */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 text-white">
                  <span className="text-[10px] text-[#D8B983] block font-medium">
                    {cat.itemCount} {cat.itemCount === 1 ? 'piece' : 'pieces'}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-normal text-white group-hover:text-[#F3EFE6] transition-colors mt-0.5">
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
