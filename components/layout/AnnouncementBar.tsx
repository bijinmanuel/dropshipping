'use client';

import React from 'react';
import { Truck, Zap, Flame } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <aside 
      aria-label="Promotional announcements"
      className="bg-black text-white text-[11px] sm:text-xs py-2 px-4 border-b border-white/10 relative z-40"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 font-medium">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-white/80" />
          <span>Free Worldwide Shipping Over $50</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[#FF5722]">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span className="text-white font-semibold">Summer Sale Up To 70% Off</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
          <span>Limited Time Flash Deals</span>
        </div>
      </div>
    </aside>
  );
}
