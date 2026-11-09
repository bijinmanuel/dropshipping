'use client';

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '@/data/reviews';
import { PRODUCTS } from '@/data/products';

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-4 border-b border-black/[0.06] gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
              Collector Chronicles
            </span>
            <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
              Verified Collector Impressions
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <div className="flex items-center text-brand-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-brand-charcoal font-mono">4.92 / 5.0</span>
            <span>across 1,200+ direct client deliveries</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.slice(0, 3).map((review) => {
            const product = PRODUCTS.find((p) => p.id === review.productId);

            return (
              <div
                key={review.id}
                className="bg-background rounded-card-lg p-7 border border-black/[0.07] hover:border-black/[0.18] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating & Quote */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 text-brand-gold">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-black/15" />
                  </div>

                  <h3 className="font-serif text-base font-medium text-brand-charcoal mb-2">
                    &ldquo;{review.title}&rdquo;
                  </h3>

                  <p className="text-xs text-brand-charcoal/75 leading-relaxed italic">
                    {review.comment}
                  </p>
                </div>

                <div className="mt-7 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-brand-charcoal">{review.author}</span>
                      {review.verifiedBuyer && (
                        <span title="Verified Collector">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-success" />
                        </span>
                      )}
                    </div>
                    {product && (
                      <p className="text-[11px] text-brand-muted truncate max-w-[190px]">
                        Object: {product.title}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-brand-muted font-mono">{review.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
