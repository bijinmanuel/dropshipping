'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export function CategoryBanners() {
  const displayCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight font-heading">
            Shop by Categories
          </h2>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#FF4D00] flex items-center gap-1 group transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid - Clean, large, edge-to-edge images without extra padding */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col rounded-2xl bg-white transition-all duration-300"
            >
              {/* Photo Frame - NO padding, NO border, full edge-to-edge */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-xs">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Title & Link */}
              <div className="pt-3 pb-0.5 text-center sm:text-left">
                <h3 className="text-sm font-bold text-gray-950 group-hover:text-[#FF4D00] transition-colors tracking-tight">
                  {cat.name}
                </h3>
                <span className="text-xs text-gray-400 group-hover:text-[#FF4D00] flex items-center justify-center sm:justify-start gap-1 mt-0.5 transition-colors font-medium">
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
