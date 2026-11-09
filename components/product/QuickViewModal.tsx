'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Star, Heart, ShoppingBag, Check, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
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
        className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={product.title}
          className="relative transform overflow-hidden rounded-card bg-[#FFFFFF] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-brand-border animate-fadeIn"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-brand-muted hover:text-brand-charcoal rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-background-subtle flex flex-col justify-between">
              <div className="relative aspect-product w-full rounded-card overflow-hidden bg-white border border-brand-border/60">
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-btn overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-brand-forest shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
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
                <div className="flex items-center justify-between text-xs text-brand-muted mb-1">
                  <span className="uppercase tracking-wider font-semibold text-brand-forest">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    <span className="font-semibold text-brand-charcoal">{product.rating}</span>
                    <span className="text-brand-muted">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-medium text-brand-charcoal">
                  {product.title}
                </h2>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-bold text-brand-forest">
                    {formatPrice(activePrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-brand-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-semibold text-brand-sale bg-brand-forest-light px-2 py-0.5 rounded">
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
                      <span className="font-semibold text-brand-charcoal">Finishing & Color</span>
                      <span className="text-brand-muted">{selectedVariant.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setSelectedVariant(v);
                            if (v.imageIndex !== undefined) {
                              setSelectedImageIndex(v.imageIndex);
                            }
                          }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-btn border text-xs font-medium transition-all ${
                            selectedVariant.id === v.id
                              ? 'border-brand-forest bg-brand-forest-light text-brand-forest font-semibold'
                              : 'border-brand-border bg-white text-brand-charcoal hover:border-brand-forest/60'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: v.value }}
                          />
                          <span>{v.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping & Direct Origin */}
                <div className="mt-5 p-3 rounded-card bg-background flex items-center gap-3 border border-brand-border/60">
                  <Truck className="w-4 h-4 text-brand-forest shrink-0" />
                  <div className="text-[11px] text-brand-muted">
                    <span className="font-semibold text-brand-charcoal">Estimated Dispatch:</span> {product.estimatedDelivery}. Direct from verified partner atelier.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-brand-border space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-brand-border rounded-btn bg-background-subtle">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-brand-charcoal hover:bg-white rounded-l-btn text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-brand-charcoal">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-brand-charcoal hover:bg-white rounded-r-btn text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className="flex-1 py-2.5 px-4 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle flex items-center justify-center gap-2"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-brand-success" />
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
                    className={`p-2.5 rounded-btn border transition-colors ${
                      isFavorited
                        ? 'border-brand-sale text-brand-sale bg-brand-sale/10'
                        : 'border-brand-border text-brand-charcoal hover:text-brand-sale hover:border-brand-sale'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-forest hover:underline pt-1"
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
