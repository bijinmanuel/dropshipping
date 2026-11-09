'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function DoublePromoBanners() {
  // Countdown Timer state
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
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Banner 1: Coral Orange Flash Sale Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF5722] via-[#FF6E40] to-[#FFA07A] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[300px] shadow-md group">
            <div className="relative z-10 max-w-sm">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
                Flash Sale
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Up To 70% Off
              </h3>

              {/* Countdown Timer Row */}
              <div className="flex items-center gap-2 sm:gap-3 mt-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center font-mono font-bold text-lg text-white">
                    {formatUnit(timeLeft.days)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-medium">Days</span>
                </div>
                <span className="font-bold text-lg -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center font-mono font-bold text-lg text-white">
                    {formatUnit(timeLeft.hours)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-medium">Hours</span>
                </div>
                <span className="font-bold text-lg -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center font-mono font-bold text-lg text-white">
                    {formatUnit(timeLeft.minutes)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-medium">Mins</span>
                </div>
                <span className="font-bold text-lg -mt-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-11 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center font-mono font-bold text-lg text-white">
                    {formatUnit(timeLeft.seconds)}
                  </div>
                  <span className="text-[10px] text-white/80 mt-1 uppercase font-medium">Secs</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-7">
                <Link
                  href="/shop?filter=sale"
                  className="px-6 py-2.5 rounded-full bg-white text-[#FF5722] hover:bg-gray-50 text-xs font-bold tracking-wide transition-all shadow-sm inline-flex items-center gap-1.5"
                >
                  <span>Shop Sale Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Sneaker Graphic Right Side */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full pointer-events-none hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
                alt="Flash Sale Sneaker"
                fill
                className="object-contain object-bottom-right transform translate-x-4 translate-y-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Banner 2: Dark Sleek Summer 2026 Collection */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0F1115] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[300px] shadow-md group">
            <div className="relative z-10 max-w-sm">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                New Collection
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Summer 2026
              </h3>
              <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
                Discover the latest trends and fresh athletic styles.
              </p>

              <div className="mt-8">
                <Link
                  href="/shop?category=fitness"
                  className="px-6 py-2.5 rounded-full border border-white/80 text-white hover:bg-white hover:text-black text-xs font-bold tracking-wide transition-all inline-flex items-center gap-1.5"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Fitness Athlete Graphic Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop"
                alt="Summer Collection Athlete"
                fill
                className="object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/50 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
