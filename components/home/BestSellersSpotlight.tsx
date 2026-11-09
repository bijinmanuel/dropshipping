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

  const spotlightProducts = products.slice(0, 3);

  const handleQuickAdd = (product: Product) => {
    setAddingId(product.id);
    addToCart(product, product.variants[0], 1);
    setTimeout(() => setAddingId(null), 800);
  };

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
            Best Sellers
          </h2>
          <Link
            href="/shop?filter=best-sellers"
            className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#FF4D30] flex items-center gap-1 group transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Wide Landscape Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightProducts.map((product) => {
            const isAdding = addingId === product.id;
            return (
              <div
                key={product.id}
                className="group relative flex flex-col sm:flex-row items-center bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 p-4 gap-4"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-square w-full sm:w-36 sm:h-36 rounded-xl bg-[#F6F6F8] overflow-hidden flex items-center justify-center p-3 shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 150px"
                    className="object-contain p-2 group-hover:scale-106 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-[#F59E0B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    Bestseller
                  </span>
                </div>

                {/* Info & Action */}
                <div className="flex flex-col flex-1 justify-between w-full h-full">
                  <div>
                    <Link href={`/product/${product.slug}`} className="block group-hover:text-[#FF4D30] transition-colors">
                      <h3 className="text-sm sm:text-base font-bold text-gray-950 truncate">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm sm:text-base font-extrabold text-gray-950">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">({product.reviewCount})</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Quick Add Button */}
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={isAdding}
                      className="w-full py-2.5 px-3 rounded-lg bg-black hover:bg-[#FF4D30] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <span>Quick Add</span>
                          <ShoppingBag className="w-3.5 h-3.5 ml-0.5" />
                        </>
                      )}
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
