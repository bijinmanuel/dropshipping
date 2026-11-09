'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export function CategoryBanners() {
  const displayCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-950">
            Shop by Categories
          </h2>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#FF5722] flex items-center gap-1 group transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all p-3"
            >
              {/* Photo Frame */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Title & Link */}
              <div className="pt-3 pb-1 text-center sm:text-left">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#FF5722] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-gray-400 group-hover:text-[#FF5722] flex items-center justify-center sm:justify-start gap-1 mt-0.5 transition-colors font-medium">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
