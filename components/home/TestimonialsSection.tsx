'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, Quote } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    title: 'Unbelievable Comfort & Quality',
    comment: 'The Air Max 270 exceeded every expectation. The heel cushioning feels like walking on clouds and the build quality is flawless. Dispatched within 24 hours too!',
    product: 'Air Max 270',
    date: '2 days ago',
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    title: 'The Best Hoodie I Own',
    comment: 'Heavyweight organic cotton, perfect oversized drape, and the oatmeal color is so versatile. Already ordered the black colorway as well.',
    product: 'Essential Hoodie',
    date: '3 days ago',
  },
  {
    id: 'rev-3',
    author: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    title: 'Superb Sound & Fast Shipping',
    comment: 'The noise cancellation on these wireless headphones rivals pairs triple the price. Battery lasts easily 30+ hours on a single charge.',
    product: 'Wireless Headphone',
    date: '1 week ago',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#FAFAFC] via-orange-50/20 to-[#FAFAFC] border-b border-gray-100 relative overflow-hidden">
      {/* Radiant ambient glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
              Customer Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-heading mt-1">
              What Shoppers Are Saying
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Authentic reviews from verified buyers across the globe.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 self-start sm:self-auto">
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-gray-950 font-mono">4.9 / 5.0</span>
            <span className="text-gray-400">from 50,000+ customers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-gradient-to-br from-white to-orange-50/20 rounded-3xl p-6 sm:p-7 border border-gray-100 hover:border-orange-200 hover:shadow-[0_20px_35px_-8px_rgba(255,77,0,0.1)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-orange-200" />
                </div>

                <h3 className="text-sm font-bold text-gray-950 mb-2">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200">
                    <Image
                      src={rev.avatar}
                      alt={rev.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-gray-950">{rev.author}</span>
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Purchased {rev.product}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
