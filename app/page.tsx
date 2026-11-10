'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryBanners } from '@/components/home/CategoryBanners';
import { BestSellersSpotlight } from '@/components/home/BestSellersSpotlight';
import { DoublePromoBanners } from '@/components/home/DoublePromoBanners';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ValueProps } from '@/components/home/ValueProps';
import { ProductCard } from '@/components/product/ProductCard';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types/product';

export default function HomePage() {
  const [activeProducts, setActiveProducts] = useState<Product[]>(() =>
    PRODUCTS.filter((p) => (p as any).isActive !== false)
  );

  const [newArrivalsList, setNewArrivalsList] = useState<Product[]>(() =>
    PRODUCTS.filter((p) => (p as any).isActive !== false && p.badge === 'NEW').slice(0, 8)
  );

  const [bestSellersList, setBestSellersList] = useState<Product[]>(() =>
    PRODUCTS.filter(
      (p) => (p as any).isActive !== false && (p.badge === 'BESTSELLER' || p.reviewCount > 90)
    ).slice(0, 3)
  );

  useEffect(() => {
    // Sync with backend API to strictly hide deactivated products
    fetchProducts({ limit: 100 })
      .then((res) => {
        if (res.products && res.products.length > 0) {
          // Strictly filter only active products
          const liveActive = res.products.filter((p: any) => p.isActive !== false);
          setActiveProducts(liveActive);

          const liveNew = liveActive.filter((p) => p.badge === 'NEW');
          setNewArrivalsList(liveNew.length > 0 ? liveNew.slice(0, 8) : liveActive.slice(0, 8));

          const liveBest = liveActive.filter(
            (p) => p.badge === 'BESTSELLER' || p.reviewCount > 90 || p.rating >= 4.7
          );
          setBestSellersList(liveBest.length > 0 ? liveBest.slice(0, 3) : liveActive.slice(0, 3));
        }
      })
      .catch((err) => {
        console.warn('[HomePage] Background product sync skipped:', err);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section & 4-Column Trust Row */}
      <HeroSection activeProducts={activeProducts} />

      {/* 2. Shop by Categories (Fashion, Electronics, Beauty, Fitness, Home Decor, Accessories) */}
      <CategoryBanners />

      {/* 3. New Arrivals 4-Column Spacious Grid with Radiant Ambient Backdrop */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-orange-50/25 to-white border-b border-gray-100 relative overflow-hidden">
        {/* Soft Background Gradient Lights */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight font-heading">
                New Arrivals
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Fresh drops just arrived in our global fulfillment centers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/shop?filter=new"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-950 hover:text-[#FF4D00] transition-colors"
              >
                <span>View All Drops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Columns Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivalsList
              .filter((product) => (product as any).isActive !== false)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop?filter=new"
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-950 hover:text-[#FF4D00]"
            >
              <span>View All Drops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Best Sellers Spotlight */}
      <BestSellersSpotlight products={bestSellersList} />

      {/* 5. Promotional Double Split Banners */}
      <DoublePromoBanners />

      {/* 6. Verified Customer Testimonials & Reviews */}
      <TestimonialsSection />

      {/* 7. Value Propositions (Fast SLA, Authenticity Seal, 30-Day Returns) */}
      <ValueProps />
    </div>
  );
}
