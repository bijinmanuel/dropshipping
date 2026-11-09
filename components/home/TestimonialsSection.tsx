'use client';

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '@/data/reviews';
import { PRODUCTS } from '@/data/products';

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE6DF] gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#21201D] font-normal">
              Client Impressions
            </h2>
            <p className="text-xs sm:text-sm text-[#706B62] mt-1">
              Reflections from architects, designers, and collectors living with VÉRDEN objects.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#706B62] self-start sm:self-auto">
            <div className="flex items-center text-[#A97B3C]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-[#21201D] font-mono">4.92 / 5.0</span>
            <span>across 1,200+ deliveries</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.slice(0, 3).map((review) => {
            const product = PRODUCTS.find((p) => p.id === review.productId);

            return (
              <div
                key={review.id}
                className="bg-[#FAF9F5] rounded-xl p-6 sm:p-7 border border-[#EAE6DF] hover:border-[#21201D] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#A97B3C]">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-4 h-4 text-[#A97B3C]/30" />
                  </div>

                  <h3 className="font-serif text-base font-medium text-[#21201D] mb-2">
                    &ldquo;{review.title}&rdquo;
                  </h3>

                  <p className="text-xs text-[#5A564E] leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE6DF] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-[#21201D]">{review.author}</span>
                      {review.verifiedBuyer && (
                        <span title="Verified Client">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                        </span>
                      )}
                    </div>
                    {product && (
                      <p className="text-[11px] text-[#7A756B] truncate max-w-[190px] mt-0.5">
                        {product.title}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8C877D] font-mono">{review.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
