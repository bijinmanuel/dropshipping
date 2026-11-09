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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={product.title}
          className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-gray-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-black rounded-full bg-white/90 hover:bg-white backdrop-blur-xs border border-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-6 sm:gap-8 items-center">
            {/* Gallery Left */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full rounded-2xl bg-gray-100 overflow-hidden shadow-xs">
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border-2 transition-all flex items-center justify-center ${
                        selectedImageIndex === idx
                          ? 'border-[#FF4D00]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Right */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF4D00]">
                  {product.categoryLabel}
                </span>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mt-1 font-heading">
                  {product.title}
                </h2>

                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mt-3 pb-3 border-b border-gray-100">
                  <span className="text-2xl font-extrabold text-gray-950 font-heading">
                    {formatPrice(activePrice)}
                  </span>
                  {product.originalPrice && product.originalPrice > activePrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mt-3 line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-gray-900 mb-2">
                    Option: {selectedVariant.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant.id === v.id
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add To Cart */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-md ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black hover:bg-[#FF4D00] text-white hover:shadow-lg'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart • {formatPrice(activePrice * quantity)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-full border transition-colors ${
                      isFavorited
                        ? 'border-red-500 bg-red-50 text-red-500'
                        : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#FF4D00] transition-colors pt-1"
                >
                  <span>View Full Product Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
