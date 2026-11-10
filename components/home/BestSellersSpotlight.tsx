'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface BestSellersSpotlightProps {
  products: Product[];
}

export function BestSellersSpotlight({ products }: BestSellersSpotlightProps) {
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  const spotlightProducts = (products || [])
    .filter((p) => (p as any).isActive !== false)
    .slice(0, 3);

  const handleQuickAdd = (product: Product) => {
    setAddingId(product.id);
    addToCart(product, product.variants[0], 1);
    setTimeout(() => setAddingId(null), 900);
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#FFFDF9] via-orange-50/20 to-white border-b border-gray-100 relative overflow-hidden">
      {/* Radiant ambient glow */}
      <div className="absolute -top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#FF4D00]/10 via-amber-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight font-heading">
            Best Sellers
          </h2>
          <Link
            href="/shop?filter=best-sellers"
            className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#FF4D00] flex items-center gap-1 group transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Large Featured Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {spotlightProducts.map((product) => {
            const isAdding = addingId === product.id;
            return (
              <div
                key={product.id}
                className="group relative flex flex-col sm:flex-row items-center bg-gradient-to-br from-white via-white to-orange-50/25 rounded-3xl border border-gray-100 hover:border-orange-200 hover:shadow-[0_20px_40px_-10px_rgba(255,77,0,0.12)] transition-all duration-300 p-5 gap-5"
              >
                {/* Large Product Image Stage - Studio Backdrop */}
                <div className="relative aspect-square w-full sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-b from-[#F7F7F9] to-[#ECECEF] overflow-hidden shrink-0 shadow-2xs">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.5),transparent_70%)] pointer-events-none" />
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#F59E0B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
                    Bestseller
                  </span>
                </div>

                {/* Info & Action Column */}
                <div className="flex flex-col flex-1 justify-between w-full h-full">
                  <div>
                    <Link href={`/product/${product.slug}`} className="block group-hover:text-[#FF4D00] transition-colors">
                      <h3 className="text-base sm:text-lg font-bold text-gray-950 truncate tracking-tight">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base sm:text-lg font-extrabold text-gray-950 font-heading">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 font-medium">({product.reviewCount})</span>
                    </div>

                    {/* Subtitle / Description */}
                    <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Dual Action: Quick Add Button + Cart Icon Button */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={isAdding}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                        isAdding
                          ? 'bg-emerald-600 text-white'
                          : 'bg-black hover:bg-[#FF4D00] text-white hover:shadow-md'
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Quick Add</span>
                      )}
                    </button>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="w-9 h-9 rounded-xl border border-gray-200 hover:border-black flex items-center justify-center text-gray-700 hover:text-black transition-colors"
                      aria-label="Add item to shopping bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
