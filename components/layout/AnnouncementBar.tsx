'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

const MESSAGES = [
  {
    icon: Truck,
    text: 'Complimentary Insured Priority Air on curations over $150',
    highlight: 'Code: FREESHIP',
  },
  {
    icon: Sparkles,
    text: 'Inaugural collector privilege &bull; 15% off first curation',
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
      className="bg-[#21201D] text-[#FAF9F5] text-[11px] font-medium tracking-[0.08em] py-2.5 px-4 border-b border-[#2F2E2A] relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
          className="text-[#FAF9F5]/40 hover:text-white transition-colors p-1"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 text-center overflow-hidden h-5">
          <div className="flex items-center gap-2 animate-fadeIn key={currentIndex}">
            <Icon className="w-3.5 h-3.5 text-[#B88E4C] shrink-0" />
            <span className="text-[#FAF9F5]/90 text-[11px]">
              {current.text}
            </span>
            <span className="hidden sm:inline-block text-[#B88E4C] font-semibold text-[11px] ml-1 border-b border-[#B88E4C]/40 tracking-wider">
              {current.highlight}
            </span>
          </div>
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)}
          className="text-[#FAF9F5]/40 hover:text-white transition-colors p-1"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
