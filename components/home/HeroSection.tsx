'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export function HeroSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline & Action Buttons */}
            <div className="lg:col-span-6 flex flex-col justify-center z-10">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF5722]">
                  Trending Now
                </span>
              </div>

              {/* Huge Bold Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-gray-950 tracking-tight leading-[1.08]">
                Discover Products <br />
                You&apos;ll Love
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed font-normal">
                Shop the latest trending products curated for modern lifestyles.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center gap-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop?category=all"
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-sm font-semibold tracking-wide transition-all"
                >
                  Explore Collection
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="flex -space-x-2 overflow-hidden">
                  <Image
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                    alt="Customer 1"
                    width={32}
                    height={32}
                  />
                  <Image
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                    alt="Customer 2"
                    width={32}
                    height={32}
                  />
                  <Image
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                    alt="Customer 3"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Loved by 50,000+ customers worldwide
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Lifestyle Model & 4 Floating Product Cards */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Main Lifestyle Photo Container */}
                <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-tr from-[#FF5722] via-[#FF8A65] to-orange-100 flex items-center justify-center p-2 sm:p-4">
                  <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                    alt="Trending model in sportswear sitting on orange lifestyle chair"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-2xl"
                  />
                  
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl" />

                  {/* Floating Card 1: Air Max 270 (Top Left) */}
                  <Link
                    href="/product/air-max-270"
                    className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-lg border border-gray-100/80 flex items-center gap-2.5 hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-50 relative overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <Image
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop"
                        alt="Air Max 270"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="pr-2">
                      <p className="text-[11px] sm:text-xs font-semibold text-gray-900 leading-tight">Air Max 270</p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-gray-500">$129.99</p>
                    </div>
                  </Link>

                  {/* Floating Card 2: Smart Watch (Top Right) */}
                  <Link
                    href="/product/smart-watch-series-9"
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-lg border border-gray-100/80 flex items-center gap-2.5 hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-50 relative overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop"
                        alt="Smart Watch"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="pr-2">
                      <p className="text-[11px] sm:text-xs font-semibold text-gray-900 leading-tight">Smart Watch</p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-gray-500">$99.99</p>
                    </div>
                  </Link>

                  {/* Floating Card 3: Wireless Headphone (Center Left) */}
                  <Link
                    href="/product/wireless-headphone"
                    className="absolute bottom-16 left-4 sm:bottom-20 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-lg border border-gray-100/80 flex items-center gap-2.5 hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-50 relative overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <Image
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop"
                        alt="Wireless Headphone"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="pr-2">
                      <p className="text-[11px] sm:text-xs font-semibold text-gray-900 leading-tight">Wireless Headphone</p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-gray-500">$39.99</p>
                    </div>
                  </Link>

                  {/* Floating Card 4: Water Bottle (Bottom Right) */}
                  <Link
                    href="/product/stainless-steel-bottle"
                    className="absolute bottom-16 right-4 sm:bottom-20 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-lg border border-gray-100/80 flex items-center gap-2.5 hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-50 relative overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <Image
                        src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=200&auto=format&fit=crop"
                        alt="Water Bottle"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="pr-2">
                      <p className="text-[11px] sm:text-xs font-semibold text-gray-900 leading-tight">Water Bottle</p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-gray-500">$24.99</p>
                    </div>
                  </Link>

                  {/* Pagination Dots at Bottom Center */}
                  <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                    <span className="w-2 h-2 rounded-full bg-white/60" />
                    <span className="w-2 h-2 rounded-full bg-white/60" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Column Trust Badges Row (Directly below Hero) */}
      <section className="py-6 sm:py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 border border-gray-100">
                <Truck className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Free Shipping</h4>
                <p className="text-xs text-gray-500 mt-0.5">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Secure Payments</h4>
                <p className="text-xs text-gray-500 mt-0.5">100% secure checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 border border-gray-100">
                <RefreshCw className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Easy Returns</h4>
                <p className="text-xs text-gray-500 mt-0.5">30-day return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 border border-gray-100">
                <Headphones className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">24/7 Support</h4>
                <p className="text-xs text-gray-500 mt-0.5">Always here to help</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
