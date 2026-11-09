'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF4D30] via-[#FF5E3A] to-[#FF8A65] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[320px] shadow-lg group">
            <div className="relative z-10 max-w-sm">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-white/90 mb-2">
                Flash Sale
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Up To 70% Off
              </h3>

              {/* Countdown Timer Row */}
              <div className="flex items-center gap-2 sm:gap-3 mt-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/10 shadow-xs">
                    {formatUnit(timeLeft.days)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Days</span>
                </div>
                <span className="font-bold text-lg -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/10 shadow-xs">
                    {formatUnit(timeLeft.hours)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Hours</span>
                </div>
                <span className="font-bold text-lg -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/10 shadow-xs">
                    {formatUnit(timeLeft.minutes)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Mins</span>
                </div>
                <span className="font-bold text-lg -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/25 backdrop-blur-md flex items-center justify-center font-mono font-bold text-lg text-white border border-white/10 shadow-xs">
                    {formatUnit(timeLeft.seconds)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-bold tracking-wider">Secs</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Link
                  href="/shop?filter=sale"
                  className="px-7 py-3 rounded-full bg-white text-[#FF4D30] hover:bg-gray-50 text-xs font-bold tracking-wide transition-all shadow-md inline-flex items-center gap-2 group/btn"
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
                className="object-contain object-bottom-right transform translate-x-4 translate-y-4 group-hover:scale-106 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Banner 2: Sleek Dark Summer 2026 Collection */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0B0C0E] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[320px] shadow-lg group">
            <div className="relative z-10 max-w-sm">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                New Collection
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Summer 2026
              </h3>
              <p className="text-sm text-gray-400 mt-2.5 max-w-xs leading-relaxed">
                Discover the latest trends and fresh athletic styles.
              </p>

              <div className="mt-8">
                <Link
                  href="/shop?category=fitness"
                  className="px-7 py-3 rounded-full border border-white/80 text-white hover:bg-white hover:text-black text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 group/btn"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Fitness Athlete Graphic Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop"
                alt="Summer Collection Athlete"
                fill
                className="object-cover object-center opacity-85 group-hover:scale-106 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/60 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
