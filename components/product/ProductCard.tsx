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
  const [selectedVariant] = useState<ProductVariant>(product.variants[0]);
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
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-2xl transition-all duration-300 flex-1 justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Full-Bleed Product Image Stage - Studio Lighting Gradient */}
        <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#F7F7F9] to-[#ECECEF] shadow-xs">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.6),transparent_70%)] pointer-events-none" />
          <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
            <Image
              src={activeImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
              priority={priority}
              className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            />
          </Link>

          {/* Badges in Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.badge === 'NEW' && (
              <span className="bg-black/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md tracking-wider">
                New
              </span>
            )}
            {product.badge === 'SALE' && discountPercent > 0 && (
              <span className="bg-[#FF4D00] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md tracking-wider">
                -{discountPercent}%
              </span>
            )}
            {product.badge === 'BESTSELLER' && (
              <span className="bg-[#F59E0B] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md tracking-wider">
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist Heart Top Right */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-xs ${
              isFavorited
                ? 'bg-white text-red-500 scale-110 shadow-lg'
                : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white hover:scale-110'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Details Section Below Image */}
        <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="block group-hover:text-[#FF4D00] transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-gray-950 truncate tracking-tight">
                {product.title}
              </h3>
            </Link>

            {/* Price Row */}
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-base sm:text-lg font-extrabold text-gray-950 font-heading">
                {formatPrice(activePrice)}
              </span>
              {product.originalPrice && product.originalPrice > activePrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current'
                        : 'text-gray-200 fill-current'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Bottom Quick-Add & Quick-View Action Row */}
          <div className="mt-3.5 pt-2 flex items-center justify-between border-t border-gray-100">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="text-xs font-semibold text-gray-400 hover:text-[#FF4D00] transition-colors"
            >
              Quick view
            </button>

            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                isAdding
                  ? 'bg-emerald-600 text-white scale-110'
                  : 'bg-black hover:bg-[#FF4D00] text-white hover:scale-110'
              }`}
              aria-label="Quick add to cart"
            >
              {isAdding ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
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
