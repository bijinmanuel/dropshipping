'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw, Headphones, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';

interface HeroSectionProps {
  activeProducts?: Product[];
}

export function HeroSection({ activeProducts }: HeroSectionProps = {}) {
  const fallbackFloatingCards = [
    {
      id: 'air-max-270',
      title: 'Air Max 270',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=350&auto=format&fit=crop',
      position: '-top-5 -left-2 sm:-left-6',
      animateY: [0, -8, 0],
      duration: 5,
      delay: 0,
    },
    {
      id: 'smart-watch-series-9',
      title: 'Smart Watch',
      price: '$99.99',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=350&auto=format&fit=crop',
      position: 'top-3 -right-2 sm:-right-6',
      animateY: [0, -10, 0],
      duration: 6,
      delay: 0.8,
    },
    {
      id: 'wireless-headphone',
      title: 'Wireless Headphone',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=350&auto=format&fit=crop',
      position: 'top-1/2 -translate-y-1/2 -left-4 sm:-left-10',
      animateY: [0, 8, 0],
      duration: 5.5,
      delay: 1.2,
    },
    {
      id: 'stainless-steel-bottle',
      title: 'Water Bottle',
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=350&auto=format&fit=crop',
      position: 'bottom-6 -right-2 sm:-right-6',
      animateY: [0, -7, 0],
      duration: 5.2,
      delay: 1.8,
    },
  ];

  const positions = [
    { position: '-top-5 -left-2 sm:-left-6', animateY: [0, -8, 0], duration: 5, delay: 0 },
    { position: 'top-3 -right-2 sm:-right-6', animateY: [0, -10, 0], duration: 6, delay: 0.8 },
    { position: 'top-1/2 -translate-y-1/2 -left-4 sm:-left-10', animateY: [0, 8, 0], duration: 5.5, delay: 1.2 },
    { position: 'bottom-6 -right-2 sm:-right-6', animateY: [0, -7, 0], duration: 5.2, delay: 1.8 },
  ];

  const floatingCards = React.useMemo(() => {
    if (!activeProducts || activeProducts.length === 0) {
      return fallbackFloatingCards;
    }

    // Filter fallback cards to only keep those currently active
    const validCards = fallbackFloatingCards.filter((card) =>
      activeProducts.some((p) => p.slug === card.id && (p as any).isActive !== false)
    );

    // If all 4 are active, use them
    if (validCards.length >= 4) {
      return validCards.slice(0, 4);
    }

    // Otherwise, fill any missing slots with other active products
    const usedSlugs = new Set(validCards.map((c) => c.id));
    const replacements = activeProducts
      .filter((p) => !usedSlugs.has(p.slug) && (p as any).isActive !== false)
      .slice(0, 4 - validCards.length);

    const merged = [
      ...validCards,
      ...replacements.map((p) => ({
        id: p.slug,
        title: p.title,
        price: `$${p.price.toFixed(2)}`,
        image: p.images[0] || '',
      })),
    ];

    return merged.map((card, idx) => ({
      ...card,
      ...positions[idx % positions.length],
    }));
  }, [activeProducts]);

  return (
    <>
      {/* Main Hero Banner with Multi-Layered Atmospheric Background Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-[#FFFDF9] to-white pt-8 pb-16 lg:pt-14 lg:pb-22 border-b border-gray-100">
        {/* Multi-layered Atmospheric Background Gradients */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(255,110,30,0.18),rgba(255,180,60,0.08)_45%,transparent_70%)] pointer-events-none blur-2xl" />
        <div className="absolute top-1/4 -left-32 w-[420px] h-[420px] bg-gradient-to-tr from-[#FF4D00]/15 to-amber-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[480px] h-[480px] bg-gradient-to-bl from-orange-400/15 via-rose-300/10 to-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Copy & CTAs (6 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[11px] font-extrabold uppercase tracking-widest text-[#FF4D00] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                  Trending Now
                </span>
                <span className="text-[11px] font-semibold text-gray-400 hidden sm:inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Curated Collection
                </span>
              </div>

              {/* Bold Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-gray-950 tracking-[-0.035em] leading-[1.08] font-heading">
                Discover Products <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-950 via-[#FF4D00] to-orange-500">
                  You&apos;ll Love
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed font-normal">
                Shop the latest trending products curated for modern lifestyles. High quality, verified dropship dispatch, and transparent pricing.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] hover:from-[#E04400] hover:to-[#FF5500] text-white text-sm font-bold tracking-wide shadow-[0_10px_25px_-5px_rgba(255,77,0,0.45)] hover:shadow-[0_16px_35px_-5px_rgba(255,77,0,0.55)] transition-all flex items-center gap-2 group hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/shop?category=all"
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200/90 hover:border-gray-300 text-sm font-semibold tracking-wide transition-all shadow-xs hover:-translate-y-0.5 active:translate-y-0"
                >
                  Explore Collection
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex items-center gap-3.5 pt-4 border-t border-gray-100/80">
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
            </motion.div>

            {/* Right Column: Hero Visual Studio with 4 Floating Hotspot Cards (6 cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-8 lg:py-0"
            >
              <div className="relative w-full max-w-[440px] aspect-[4/5] mx-auto">
                
                {/* Background Curved Red/Orange Sculptural Pod */}
                <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-[#FF4D00] via-[#FF5E3A] to-[#FF8A65] shadow-[0_25px_60px_-15px_rgba(255,77,0,0.35)] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop"
                    alt="Trending streetwear model in white designer outfit"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover object-top opacity-95 transition-transform duration-700 hover:scale-105"
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

                {/* 4 Floating Hotspot Product Cards with Perfectly Centered & Uniform Images */}
                {floatingCards.map((card) => (
                  <motion.div
                    key={card.id}
                    animate={{ y: card.animateY }}
                    transition={{
                      duration: card.duration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: card.delay,
                    }}
                    className={`absolute ${card.position} z-20 w-32 sm:w-36`}
                  >
                    <Link
                      href={`/product/${card.id}`}
                      className="block bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.14)] border border-gray-100 hover:border-orange-300 hover:shadow-[0_20px_45px_-10px_rgba(255,77,0,0.25)] transition-all group hover:scale-105"
                    >
                      {/* Standardized Studio Image Box - Perfectly Centered, Matching Aspect Ratio */}
                      <div className="w-full aspect-[4/3] relative rounded-xl bg-[#F7F7F9] overflow-hidden flex items-center justify-center p-2 mb-2 group-hover:bg-orange-50/60 transition-colors">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="160px"
                          className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-gray-950 text-center truncate w-full group-hover:text-[#FF4D00] transition-colors tracking-tight">
                        {card.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-gray-400 text-center mt-0.5">
                        {card.price}
                      </p>
                    </Link>
                  </motion.div>
                ))}

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4-Column Minimal Trust Badges Row with Soft Warm Gradient */}
      <section className="py-8 bg-gradient-to-r from-orange-50/40 via-white to-amber-50/30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-2xl bg-orange-50/80 group-hover:bg-orange-100/80 border border-orange-100/50 flex items-center justify-center text-[#FF4D00] shrink-0 transition-colors">
                <Truck className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">Free Shipping</h4>
                <p className="text-xs text-gray-500 mt-0.5">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-2xl bg-orange-50/80 group-hover:bg-orange-100/80 border border-orange-100/50 flex items-center justify-center text-[#FF4D00] shrink-0 transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">Secure Payments</h4>
                <p className="text-xs text-gray-500 mt-0.5">100% secure checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-2xl bg-orange-50/80 group-hover:bg-orange-100/80 border border-orange-100/50 flex items-center justify-center text-[#FF4D00] shrink-0 transition-colors">
                <RefreshCw className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-950">Easy Returns</h4>
                <p className="text-xs text-gray-500 mt-0.5">30-day return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-2xl bg-orange-50/80 group-hover:bg-orange-100/80 border border-orange-100/50 flex items-center justify-center text-[#FF4D00] shrink-0 transition-colors">
                <Headphones className="w-5 h-5 text-[#FF4D00]" />
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
