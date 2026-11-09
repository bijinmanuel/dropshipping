'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  const activePrice = product.price + (selectedVariant?.priceModifier || 0);

  const activeImage =
    isHovered && product.images[1]
      ? product.images[1]
      : product.images[selectedVariant?.imageIndex || 0] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedVariant, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Stage */}
        <div className="relative aspect-square w-full bg-[#F8F9FA] overflow-hidden flex items-center justify-center p-4">
          <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
            <Image
              src={activeImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              priority={priority}
              className="object-contain p-2 group-hover:scale-106 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Badges in Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
            {product.badge === 'NEW' && (
              <span className="bg-black text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                New
              </span>
            )}
            {product.badge === 'SALE' && discountPercent > 0 && (
              <span className="bg-[#FF5722] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                -{discountPercent}%
              </span>
            )}
            {product.badge === 'BESTSELLER' && (
              <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist Heart Top Right */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-xs ${
              isFavorited
                ? 'bg-red-50 text-red-500'
                : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
          <div>
            <Link href={`/product/${product.slug}`} className="block group-hover:text-[#FF5722] transition-colors">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {product.title}
              </h3>
            </Link>

            {/* Price Row */}
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-sm font-bold text-gray-900">
                {formatPrice(activePrice)}
              </span>
              {product.originalPrice && product.originalPrice > activePrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Rating Stars + Review Count */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-400">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Bottom Row: Quick Add Button */}
          <div className="flex items-center justify-end mt-2 pt-2 border-t border-gray-50">
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="w-8 h-8 rounded-full bg-black text-white hover:bg-[#FF5722] transition-colors flex items-center justify-center shadow-xs"
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              {isAdding ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
