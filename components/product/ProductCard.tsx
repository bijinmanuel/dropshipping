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

  // Variant price adjustment
  const activePrice = product.price + (selectedVariant.priceModifier || 0);

  // Image indexing based on selected variant or hover
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
        className="group relative flex flex-col bg-[#FFFFFF] rounded-card border border-brand-border/70 hover:border-brand-forest/40 hover:shadow-subtle transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with 4:5 Aspect Ratio */}
        <div className="relative aspect-product w-full overflow-hidden rounded-t-card bg-background-subtle">
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
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.badge === 'BESTSELLER' && (
              <span className="bg-brand-forest text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-pill shadow-sm">
                Bestseller
              </span>
            )}
            {product.badge === 'NEW' && (
              <span className="bg-brand-charcoal text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-pill shadow-sm">
                New Arrival
              </span>
            )}
            {product.badge === 'SALE' && discountPercent > 0 && (
              <span className="bg-brand-sale text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-pill shadow-sm">
                -{discountPercent}% Off
              </span>
            )}
            {product.badge === 'LIMITED' && (
              <span className="bg-brand-gold text-brand-charcoal text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-pill shadow-sm">
                Limited Batch
              </span>
            )}
          </div>

          {/* Top-Right Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 shadow-sm ${
              isFavorited
                ? 'bg-brand-sale text-white hover:bg-brand-sale/90'
                : 'bg-white/90 text-brand-charcoal hover:bg-white hover:text-brand-sale'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button Hover Trigger */}
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="flex-1 py-2 px-3 rounded-btn bg-white/95 backdrop-blur-sm text-brand-charcoal text-xs font-semibold hover:bg-white hover:text-brand-forest transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="py-2 px-3 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold transition-colors shadow-sm flex items-center justify-center"
              title="Quick Add to Bag"
            >
              {isAdding ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-brand-muted mb-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                <span className="text-[11px] font-semibold text-brand-charcoal">
                  {product.rating}
                </span>
                <span className="text-[10px] text-brand-muted">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Title */}
            <Link href={`/product/${product.slug}`} className="block group-hover:text-brand-forest transition-colors">
              <h3 className="text-sm font-semibold text-brand-charcoal line-clamp-1 leading-snug">
                {product.title}
              </h3>
            </Link>

            <p className="text-xs text-brand-muted line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          </div>

          {/* Color Swatches (if multiple variants) */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 pt-0.5">
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
                      ? 'border-brand-forest ring-1 ring-brand-forest ring-offset-1 scale-110'
                      : 'border-brand-border/60 hover:scale-105'
                  }`}
                  style={{ backgroundColor: v.value }}
                  title={v.name}
                />
              ))}
              <span className="text-[10px] text-brand-muted ml-1">
                {selectedVariant.name}
              </span>
            </div>
          )}

          {/* Price & Mobile Add to Bag */}
          <div className="flex items-center justify-between pt-2 border-t border-brand-border/50">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-brand-forest">
                {formatPrice(activePrice)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-brand-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile quick add button */}
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="sm:hidden p-1.5 rounded-btn bg-brand-forest-light text-brand-forest hover:bg-brand-forest hover:text-white transition-colors"
              aria-label="Add to bag"
            >
              {isAdding ? <Check className="w-4 h-4 text-brand-success" /> : <ShoppingBag className="w-4 h-4" />}
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
