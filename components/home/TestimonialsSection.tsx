'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '@/data/reviews';
import { PRODUCTS } from '@/data/products';

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-brand-border/60 gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
              Client Chronicles
            </span>
            <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
              Verified Collector Impressions
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <div className="flex items-center text-brand-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-brand-charcoal">4.92 / 5.0</span>
            <span>across 1,200+ direct client deliveries</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.slice(0, 3).map((review) => {
            const product = PRODUCTS.find((p) => p.id === review.productId);

            return (
              <div
                key={review.id}
                className="bg-background rounded-card p-6 border border-brand-border/80 flex flex-col justify-between"
              >
                <div>
                  {/* Rating & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-brand-gold">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-brand-forest/20" />
                  </div>

                  <h3 className="text-sm font-semibold text-brand-charcoal mb-2 font-serif">
                    &ldquo;{review.title}&rdquo;
                  </h3>

                  <p className="text-xs text-brand-charcoal/80 leading-relaxed italic">
                    {review.comment}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-brand-charcoal">{review.author}</span>
                      {review.verifiedBuyer && (
                        <span title="Verified Customer">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-success" />
                        </span>
                      )}
                    </div>
                    {product && (
                      <p className="text-[11px] text-brand-muted truncate max-w-[200px]">
                        Purchased: {product.title}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-brand-muted">{review.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
