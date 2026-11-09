'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

const MESSAGES = [
  {
    icon: Truck,
    text: 'Complimentary Insured Air Express on curations over $150',
    highlight: 'Code: FREESHIP',
  },
  {
    icon: Sparkles,
    text: 'Inaugural collector curation &bull; 15% privilege',
    highlight: 'Code: VERDEN15',
  },
  {
    icon: ShieldCheck,
    text: 'Direct atelier dispatch &bull; 30-Day Living Home Trial',
    highlight: 'Learn More',
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = MESSAGES[currentIndex];
  const Icon = current.icon;

  return (
    <aside 
      aria-label="Promotional announcements"
      className="bg-[#111211] text-white/90 text-[11px] font-medium tracking-[0.06em] py-2 px-4 border-b border-white/[0.08] relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
          className="text-white/40 hover:text-white transition-colors p-1"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 text-center overflow-hidden h-5">
          <div className="flex items-center gap-2 animate-fadeIn key={currentIndex}">
            <Icon className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="text-white/85 text-[11px]">
              {current.text}
            </span>
            <span className="hidden sm:inline-block text-brand-gold font-semibold text-[11px] ml-1 border-b border-brand-gold/40 tracking-wider">
              {current.highlight}
            </span>
          </div>
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)}
          className="text-white/40 hover:text-white transition-colors p-1"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
