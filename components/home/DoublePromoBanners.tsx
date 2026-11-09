'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export function DoublePromoBanners() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUnit = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Banner 1: Vibrant Coral Orange Flash Sale Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FF4D00] via-[#FF5E3A] to-[#FF8A65] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-[0_20px_45px_-10px_rgba(255,77,0,0.35)] group">
            <div className="relative z-10 max-w-sm">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white/95 mb-2 px-2.5 py-0.5 rounded-full bg-black/20 backdrop-blur-xs w-max">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-current" />
                Flash Sale
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Up To 70% Off
              </h3>

              {/* Countdown Timer Row */}
              <div className="flex items-center gap-2 sm:gap-3 mt-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-xl bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/15 shadow-xs">
                    {formatUnit(timeLeft.days)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Days</span>
                </div>
                <span className="font-bold text-lg text-white/80 -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-xl bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/15 shadow-xs">
                    {formatUnit(timeLeft.hours)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Hours</span>
                </div>
                <span className="font-bold text-lg text-white/80 -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-xl bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/15 shadow-xs">
                    {formatUnit(timeLeft.minutes)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Mins</span>
                </div>
                <span className="font-bold text-lg text-white/80 -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-xl bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/15 shadow-xs">
                    {formatUnit(timeLeft.seconds)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Secs</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Link
                  href="/shop?filter=sale"
                  className="px-8 py-3 rounded-full bg-white text-[#FF4D00] hover:bg-gray-50 text-xs font-bold tracking-wide transition-all shadow-md inline-flex items-center gap-2 group/btn hover:scale-105"
                >
                  <span>Shop Sale Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Sneaker Graphic Right Side */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full pointer-events-none hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
                alt="Flash Sale Sneaker"
                fill
                className="object-contain object-bottom-right transform translate-x-4 translate-y-4 group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Banner 2: Luxury Dark Summer 2026 Collection */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-gray-950 via-gray-900 to-black text-white p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)] group">
            {/* Ambient Background Nike Swoosh Orange Light */}
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#FF4D00]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-sm">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-2 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs w-max">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                New Collection
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Summer 2026
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
                Discover the latest trends and fresh styles designed for active, modern performance.
              </p>

              {/* Action Button */}
              <div className="mt-8">
                <Link
                  href="/shop?category=fitness"
                  className="px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 text-xs font-bold tracking-wide transition-all shadow-md inline-flex items-center gap-2 group/btn hover:scale-105"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Athletic Lifestyle Model Right Side */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full pointer-events-none overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
                alt="Summer 2026 Collection Fitness Model"
                fill
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
