'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Star, Heart, ShoppingBag, Check, Truck, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen) return null;

  const isFavorited = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const activePrice = product.price + (selectedVariant.priceModifier || 0);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141514]/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={product.title}
          className="relative transform overflow-hidden rounded-2xl bg-[#FAF9F5] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-brand-border animate-fadeIn"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-brand-muted hover:text-brand-charcoal rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border border-brand-border/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-white/60 border-b md:border-b-0 md:border-r border-brand-border/60 flex flex-col justify-between">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-background border border-brand-border/60">
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-18 rounded-lg overflow-hidden border transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-brand-charcoal ring-1 ring-brand-charcoal'
                        : 'border-brand-border/70 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.title} view ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info & Purchase */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                  <span className="uppercase tracking-[0.2em] font-medium text-[10px] text-brand-gold">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    <span className="font-semibold text-brand-charcoal text-xs">{product.rating}</span>
                    <span className="text-[11px] text-brand-muted">({product.reviewCount})</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-normal leading-snug">
                  {product.title}
                </h2>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-mono font-semibold text-brand-charcoal tracking-tight">
                    {formatPrice(activePrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-brand-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-[10px] font-semibold text-brand-charcoal bg-brand-gold/15 border border-brand-gold/30 px-2 py-0.5 rounded-pill uppercase tracking-wider">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs text-brand-charcoal/80 mt-3 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Variant Swatches */}
                {product.variants.length > 1 && (
                  <div className="mt-5">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-brand-charcoal uppercase tracking-wider text-[11px]">Finishing</span>
                      <span className="text-brand-muted text-[11px]">{selectedVariant.name}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setSelectedVariant(v);
                            if (v.imageIndex !== undefined) {
                              setSelectedImageIndex(v.imageIndex);
                            }
                          }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-pill border text-xs transition-all ${
                            selectedVariant.id === v.id
                              ? 'border-brand-charcoal bg-brand-charcoal text-white font-medium'
                              : 'border-brand-border bg-white text-brand-charcoal hover:border-brand-charcoal'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: v.value }}
                          />
                          <span>{v.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping & Direct Origin */}
                <div className="mt-5 p-3 rounded-xl bg-white/80 border border-brand-border/60 flex items-center gap-3">
                  <Truck className="w-4 h-4 text-brand-gold shrink-0" />
                  <div className="text-[11px] text-brand-muted">
                    <span className="font-semibold text-brand-charcoal">Direct Atelier Dispatch:</span> {product.estimatedDelivery}. Carbon-neutral transit.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-brand-border space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-brand-border rounded-pill bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-brand-charcoal hover:text-black rounded-l-pill text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-7 text-center font-mono text-xs font-semibold text-brand-charcoal">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-brand-charcoal hover:text-black rounded-r-pill text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className="flex-1 py-3 px-5 rounded-pill bg-[#21201D] hover:bg-[#2D2C28] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-brand-gold" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag &bull; {formatPrice(activePrice * quantity)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-full border transition-colors ${
                      isFavorited
                        ? 'border-brand-sale text-brand-sale bg-brand-sale/10'
                        : 'border-brand-border text-brand-charcoal hover:text-brand-sale hover:border-brand-sale bg-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-brand-charcoal hover:text-brand-gold transition-colors pt-1"
                >
                  <span>Explore full specifications and customer reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
