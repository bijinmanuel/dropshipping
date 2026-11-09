'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export function HeroSection() {
  return (
    <>
      {/* Main Hero Banner */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Copy & CTAs (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center z-10">
              {/* Eyebrow */}
              <div className="inline-block mb-3.5">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF4D30]">
                  Trending Now
                </span>
              </div>

              {/* Bold Typography */}
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold text-gray-950 tracking-[-0.035em] leading-[1.05]">
                Discover Products <br />
                You&apos;ll Love
              </h1>

              {/* Description */}
              <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-md leading-relaxed font-normal">
                Shop the latest trending products curated for modern lifestyles.
              </p>

              {/* CTA Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-[#FF4D30] hover:bg-[#E63E22] text-white text-sm font-bold tracking-wide shadow-[0_10px_25px_-5px_rgba(255,77,48,0.4)] hover:shadow-[0_16px_30px_-5px_rgba(255,77,48,0.5)] transition-all flex items-center gap-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop?category=all"
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-sm font-semibold tracking-wide transition-all shadow-xs"
                >
                  Explore Collection
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex items-center gap-3.5 pt-4">
                <div className="flex -space-x-2">
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
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Loved by <strong className="text-gray-900 font-bold">50,000+</strong> customers worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Studio with 4 Floating Hotspot Cards (6 cols) */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-8 lg:py-0">
              <div className="relative w-full max-w-[440px] aspect-[4/5] mx-auto">
                
                {/* Background Curved Red/Orange Sculptural Pod */}
                <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-[#FF4D30] via-[#FF5E3A] to-[#FF8A65] shadow-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                    alt="Trending streetwear model in white sweater sitting on orange pod"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover object-top opacity-95"
                  />
                  
                  {/* Subtle Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                  {/* Carousel pagination indicator pills */}
                  <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                    <span className="w-5 h-1.5 rounded-full bg-white shadow-xs" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  </div>
                </div>

                {/* Floating Card 1: Air Max 270 (Top Left) */}
                <Link
                  href="/product/air-max-270"
                  className="absolute -top-5 left-4 sm:-left-6 bg-white rounded-2xl p-2.5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)] border border-gray-100 flex flex-col items-center hover:scale-105 transition-all z-20 w-28 sm:w-32 group"
                >
                  <div className="w-16 h-12 relative flex items-center justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=240&auto=format&fit=crop"
                      alt="Air Max 270"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-gray-900 mt-1 truncate max-w-full group-hover:text-[#FF4D30] transition-colors">
                    Air Max 270
                  </p>
                  <p className="text-[10px] font-semibold text-gray-400">$129.99</p>
                </Link>

                {/* Floating Card 2: Smart Watch (Top Right) */}
                <Link
                  href="/product/smart-watch-series-9"
                  className="absolute top-4 -right-3 sm:-right-8 bg-white rounded-2xl p-2.5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)] border border-gray-100 flex flex-col items-center hover:scale-105 transition-all z-20 w-24 sm:w-28 group"
                >
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=240&auto=format&fit=crop"
                      alt="Smart Watch"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-gray-900 mt-1 truncate max-w-full group-hover:text-[#FF4D30] transition-colors">
                    Smart Watch
                  </p>
                  <p className="text-[10px] font-semibold text-gray-400">$99.99</p>
                </Link>

                {/* Floating Card 3: Wireless Headphone (Center Left) */}
                <Link
                  href="/product/wireless-headphone"
                  className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-10 bg-white rounded-2xl p-2.5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)] border border-gray-100 flex flex-col items-center hover:scale-105 transition-all z-20 w-28 sm:w-32 group"
                >
                  <div className="w-16 h-12 relative flex items-center justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=240&auto=format&fit=crop"
                      alt="Wireless Headphone"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-gray-900 mt-1 truncate max-w-full group-hover:text-[#FF4D30] transition-colors">
                    Wireless Headphone
                  </p>
                  <p className="text-[10px] font-semibold text-gray-400">$39.99</p>
                </Link>

                {/* Floating Card 4: Water Bottle (Bottom Right) */}
                <Link
                  href="/product/stainless-steel-bottle"
                  className="absolute bottom-8 -right-3 sm:-right-8 bg-white rounded-2xl p-2.5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)] border border-gray-100 flex flex-col items-center hover:scale-105 transition-all z-20 w-24 sm:w-28 group"
                >
                  <div className="w-10 h-14 relative flex items-center justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=240&auto=format&fit=crop"
                      alt="Water Bottle"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-gray-900 mt-1 truncate max-w-full group-hover:text-[#FF4D30] transition-colors">
                    Water Bottle
                  </p>
                  <p className="text-[10px] font-semibold text-gray-400">$24.99</p>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Column Minimal Trust Badges Row (Directly underneath Hero) */}
      <section className="py-7 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F6F6F8] flex items-center justify-center text-gray-900 shrink-0">
                <Truck className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">Free Shipping</h4>
                <p className="text-xs text-gray-500 mt-0.5">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F6F6F8] flex items-center justify-center text-gray-900 shrink-0">
                <ShieldCheck className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">Secure Payments</h4>
                <p className="text-xs text-gray-500 mt-0.5">100% secure checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F6F6F8] flex items-center justify-center text-gray-900 shrink-0">
                <RefreshCw className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">Easy Returns</h4>
                <p className="text-xs text-gray-500 mt-0.5">30-day return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F6F6F8] flex items-center justify-center text-gray-900 shrink-0">
                <Headphones className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">24/7 Support</h4>
                <p className="text-xs text-gray-500 mt-0.5">Always here to help</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
