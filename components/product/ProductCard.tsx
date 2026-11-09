'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
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

  const activePrice = product.price + (selectedVariant.priceModifier || 0);

  const activeImage =
    isHovered && product.images[1]
      ? product.images[1]
      : product.images[selectedVariant.imageIndex || 0] || product.images[0];

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
        className="group relative flex flex-col bg-white rounded-card-lg border border-black/[0.07] hover:border-black/[0.2] hover:shadow-subtle transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with 4:5 Aspect Ratio */}
        <div className="relative aspect-product w-full overflow-hidden bg-background-subtle">
          <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
            <Image
              src={activeImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.badge === 'BESTSELLER' && (
              <span className="bg-black text-white text-[9px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-pill shadow-xs">
                Signature
              </span>
            )}
            {product.badge === 'NEW' && (
              <span className="bg-white/95 text-black border border-black/[0.1] text-[9px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-pill shadow-xs backdrop-blur-sm">
                New Release
              </span>
            )}
            {product.badge === 'SALE' && discountPercent > 0 && (
              <span className="bg-brand-sale text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-pill shadow-xs">
                -{discountPercent}%
              </span>
            )}
            {product.badge === 'LIMITED' && (
              <span className="bg-brand-gold text-white text-[9px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-pill shadow-xs">
                Limited Batch
              </span>
            )}
          </div>

          {/* Top-Right Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full transition-all duration-200 shadow-sm ${
              isFavorited
                ? 'bg-brand-sale text-white'
                : 'bg-white/90 text-brand-charcoal hover:bg-white hover:text-brand-sale'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Actions Floating Glass Bar */}
          <div className="absolute inset-x-3.5 bottom-3.5 z-10 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="flex-1 py-2 px-3 rounded-btn bg-white/90 backdrop-blur-md text-brand-charcoal text-[11px] font-semibold hover:bg-white hover:text-black transition-colors shadow-sm flex items-center justify-center gap-1.5 border border-black/[0.06]"
            >
              <Eye className="w-3.5 h-3.5 text-brand-gold" />
              <span>Quick View</span>
            </button>

            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="py-2 px-3 rounded-btn bg-black hover:bg-black/90 text-white text-[11px] font-semibold transition-colors shadow-sm flex items-center justify-center border border-black"
              title="Quick Add to Bag"
            >
              {isAdding ? <Check className="w-3.5 h-3.5 text-brand-gold" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white">
          <div>
            {/* Category & Star Rating */}
            <div className="flex items-center justify-between text-[11px] text-brand-muted mb-1.5">
              <span className="uppercase tracking-[0.14em] font-semibold text-brand-gold text-[10px]">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                <span className="font-semibold text-brand-charcoal font-mono">
                  {product.rating}
                </span>
                <span className="text-[10px] text-brand-muted">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Title */}
            <Link href={`/product/${product.slug}`} className="block group-hover:text-black transition-colors">
              <h3 className="font-serif text-base font-normal text-brand-charcoal line-clamp-1 leading-snug">
                {product.title}
              </h3>
            </Link>

            <p className="text-xs text-brand-muted line-clamp-1 mt-0.5 font-normal">
              {product.subtitle}
            </p>
          </div>

          {/* Color Swatches */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(v);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedVariant.id === v.id
                      ? 'border-black ring-1 ring-black ring-offset-1 scale-110'
                      : 'border-black/[0.15] hover:scale-105'
                  }`}
                  style={{ backgroundColor: v.value }}
                  title={v.name}
                />
              ))}
              <span className="text-[10px] text-brand-muted ml-1 truncate max-w-[120px]">
                {selectedVariant.name}
              </span>
            </div>
          )}

          {/* Price & Mobile Add CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-black/[0.06]">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-bold text-black font-mono">
                {formatPrice(activePrice)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-brand-muted line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile quick add */}
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="sm:hidden p-2 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
              aria-label="Add to bag"
            >
              {isAdding ? <Check className="w-3.5 h-3.5 text-brand-gold" /> : <ShoppingBag className="w-3.5 h-3.5" />}
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
