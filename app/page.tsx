import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryBanners } from '@/components/home/CategoryBanners';
import { BestSellersSpotlight } from '@/components/home/BestSellersSpotlight';
import { DoublePromoBanners } from '@/components/home/DoublePromoBanners';
import { ValueProps } from '@/components/home/ValueProps';
import { ProductCard } from '@/components/product/ProductCard';

export default function HomePage() {
  // 6 specific products for New Arrivals matching the reference image:
  // 1. Essential Hoodie ($59.99, New)
  // 2. Air Max 270 ($129.99, Sale)
  // 3. Wireless Headphone ($39.99, New)
  // 4. Smart Watch Series 9 ($199.99, Sale)
  // 5. Stainless Steel Bottle ($24.99, New)
  // 6. Aviator Sunglasses ($89.99, Sale)
  const newArrivalsList = [
    PRODUCTS.find((p) => p.slug === 'essential-hoodie'),
    PRODUCTS.find((p) => p.slug === 'air-max-270'),
    PRODUCTS.find((p) => p.slug === 'wireless-headphone'),
    PRODUCTS.find((p) => p.slug === 'smart-watch-series-9'),
    PRODUCTS.find((p) => p.slug === 'stainless-steel-bottle'),
    PRODUCTS.find((p) => p.slug === 'aviator-sunglasses'),
  ].filter(Boolean) as typeof PRODUCTS;

  // 3 specific products for Best Sellers Spotlight:
  // 1. Classic Hoodie ($59.99)
  // 2. Air Max 270 ($129.99)
  // 3. Sony WH-1000XM5 ($349.99)
  const bestSellersList = [
    PRODUCTS.find((p) => p.slug === 'classic-hoodie') || PRODUCTS[0],
    PRODUCTS.find((p) => p.slug === 'air-max-270') || PRODUCTS[1],
    PRODUCTS.find((p) => p.slug === 'sony-wh-1000xm5') || PRODUCTS[2],
  ].filter(Boolean) as typeof PRODUCTS;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section & 4-Column Trust Row */}
      <HeroSection />

      {/* 2. Shop by Categories (Fashion, Electronics, Beauty, Fitness, Home Decor, Accessories) */}
      <CategoryBanners />

      {/* 3. New Arrivals 6-Column Grid / Carousel */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
              New Arrivals
            </h2>
            <div className="flex items-center gap-3">
              <Link
                href="/shop?filter=new"
                className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#FF4D30] flex items-center gap-1 group transition-colors"
              >
                <span>View All New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* Carousel navigation arrow pills */}
              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                <button
                  aria-label="Previous items"
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  aria-label="Next items"
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {newArrivalsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers 3-Card Spotlight Section */}
      <BestSellersSpotlight products={bestSellersList} />

      {/* 5. Split Double Promotional Banners (Flash Sale 70% + Summer 2026) */}
      <DoublePromoBanners />

      {/* 6. Bottom Trust & Reliability Strip */}
      <ValueProps />
    </div>
  );
}
