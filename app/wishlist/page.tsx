'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product: any) => {
    addToCart(product, product.variants[0], 1);
    removeFromWishlist(product.id);
    showToast({
      type: 'success',
      title: 'Moved to Cart',
      message: `${product.title} has been moved to your shopping bag.`,
    });
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, product.variants[0], 1);
    });
    clearWishlist();
    showToast({
      type: 'success',
      title: 'All Items Added',
      message: `${wishlist.length} items moved to your shopping bag.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-[#FAFAFC] to-[#FAFAFC] py-10 sm:py-16 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-orange-200/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
              Saved Products
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-1 font-heading tracking-tight">
              My Wishlist ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={handleAddAllToCart}
                className="px-6 py-2.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl border border-gray-200 p-12 sm:p-16 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4 text-[#FF4D00]">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-950 mb-2 font-heading">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Explore our trending collection and click the heart icon on any product to save it for later.
            </p>
            <Link
              href="/shop"
              className="px-7 py-3 rounded-full bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold tracking-wide transition-colors shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => {
              const discountPercent = calculateDiscount(product.price, product.originalPrice);
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-2xl transition-all duration-300 justify-between"
                >
                  {/* Image Stage - Full bleed, no inner padding, no double borders */}
                  <div className="relative aspect-[4/5] sm:aspect-square w-full bg-gray-100 rounded-2xl overflow-hidden shadow-xs mb-3">
                    <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      />
                    </Link>

                    {/* Remove Icon */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-gray-500 hover:text-red-500 hover:bg-white shadow-md transition-all backdrop-blur-xs"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-black/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF4D00]">
                      {product.categoryLabel}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="block text-sm font-bold text-gray-950 hover:text-[#FF4D00] transition-colors mt-0.5 truncate"
                    >
                      {product.title}
                    </Link>

                    {/* Price & Rating */}
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm font-extrabold text-gray-950">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="text-[10px] text-gray-400 font-mono ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full py-2.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
