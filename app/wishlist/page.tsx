'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight, Eye, Sparkles } from 'lucide-react';
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
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, product.variants[0], 1);
    });
    clearWishlist();
    showToast({
      type: 'success',
      title: 'All Items Moved to Bag',
      message: `${wishlist.length} saved objects moved to your shopping bag.`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-brand-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
              Personal Archive
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
              Saved Wishlist ({wishlistCount})
            </h1>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="text-xs text-brand-muted hover:text-brand-error transition-colors font-medium"
              >
                Clear All
              </button>
              <button
                onClick={handleAddAllToCart}
                className="px-5 py-2.5 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-card border border-brand-border p-12 text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-brand-muted" />
            </div>
            <h2 className="font-serif text-2xl text-brand-charcoal mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-brand-muted max-w-xs mx-auto mb-6 leading-relaxed">
              Save your favorite architectural lighting, Japanese stoneware, and leather objects to revisit anytime.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          /* Grid of Saved Products */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const discountPercent = calculateDiscount(product.price, product.originalPrice);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-card border border-brand-border overflow-hidden flex flex-col justify-between hover:shadow-subtle transition-all group"
                >
                  {/* Image Container with 4:5 Aspect Ratio */}
                  <div className="relative aspect-product w-full overflow-hidden bg-background">
                    <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-brand-muted hover:text-brand-error shadow-sm hover:bg-white transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Stock Status Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-pill bg-white/90 backdrop-blur-sm text-brand-forest shadow-sm">
                        In Stock &bull; 24h Dispatch
                      </span>
                    </div>
                  </div>

                  {/* Info & Move to Bag CTA */}
                  <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted">
                        {product.categoryLabel}
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="block text-sm font-semibold text-brand-charcoal hover:text-brand-forest transition-colors mt-0.5 line-clamp-1"
                      >
                        {product.title}
                      </Link>
                      <p className="text-xs text-brand-muted line-clamp-1 mt-0.5">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-brand-border/60">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-sm font-bold text-brand-forest">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-brand-muted line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        {discountPercent > 0 && (
                          <span className="text-[10px] font-semibold text-brand-sale ml-auto">
                            -{discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* Move to Bag Action */}
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="w-full py-2.5 px-4 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
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
