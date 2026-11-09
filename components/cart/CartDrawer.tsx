'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, Heart, ArrowRight, ShoppingBag, Truck, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    finalTotal,
    freeShippingThreshold,
    freeShippingProgress,
    freeShippingRemaining,
    isCartDrawerOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    moveToWishlist,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside 
          aria-label="Shopping bag"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-black/[0.08] animate-slideDown"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-black/[0.06] bg-background">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="font-serif text-lg font-medium text-brand-charcoal">
                Shopping Bag
              </h2>
              <span className="text-[10px] bg-black text-white rounded-pill px-2 py-0.5 font-bold font-mono">
                {itemCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-brand-muted hover:text-black rounded-full hover:bg-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-white px-5 py-3.5 border-b border-black/[0.06]">
            <div className="flex items-center justify-between text-xs font-medium text-brand-charcoal mb-2">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-gold shrink-0" />
                {freeShippingRemaining > 0 ? (
                  <span>Add <strong className="font-bold font-mono">{formatPrice(freeShippingRemaining)}</strong> for Free Express Delivery</span>
                ) : (
                  <span className="font-bold text-brand-success">Complimentary Air Express Unlocked!</span>
                )}
              </span>
              <span className="text-[11px] font-bold font-mono">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-background-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-gold transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-black/[0.06]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-background-subtle flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-brand-muted" />
                </div>
                <h3 className="text-xl font-serif text-brand-charcoal mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-brand-muted max-w-xs mb-6 font-normal">
                  Discover our permanent archive of lighting, ceramics, and living essentials.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center px-7 py-3 rounded-btn bg-black text-white text-xs font-bold tracking-[0.16em] uppercase hover:bg-black/90 transition-colors shadow-sm"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const unitPrice = item.product.price + (item.selectedVariant.priceModifier || 0);
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative aspect-product w-20 rounded-btn overflow-hidden bg-background shrink-0 border border-black/[0.08]">
                      <Image
                        src={item.product.images[item.selectedVariant.imageIndex || 0] || item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-serif text-sm font-medium text-brand-charcoal hover:text-black line-clamp-1"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-muted hover:text-brand-sale p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-brand-muted mt-0.5">
                          Finishing: <span className="font-semibold text-brand-charcoal">{item.selectedVariant.name}</span>
                        </p>
                        <p className="text-xs font-bold text-black mt-1 font-mono">
                          {formatPrice(unitPrice)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-black/[0.1] rounded-btn bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-brand-charcoal hover:bg-background-subtle rounded-l-btn transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-black font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-brand-charcoal hover:bg-background-subtle rounded-r-btn transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Save to Wishlist */}
                        <button
                          onClick={() => moveToWishlist(item.id)}
                          className="flex items-center gap-1 text-[11px] text-brand-muted hover:text-black transition-colors font-medium"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>

                        {/* Total */}
                        <span className="text-xs font-bold text-black font-mono">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Totals */}
          {items.length > 0 && (
            <div className="p-5 border-t border-black/[0.08] bg-background space-y-3.5">
              {/* Promo Code */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs bg-white text-black p-2.5 rounded-btn border border-black/[0.1] shadow-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-brand-gold" />
                      Code &ldquo;{appliedCoupon.code}&rdquo; applied
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-brand-sale hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Promo code (VERDEN15)"
                      className="flex-1 text-xs px-3 py-2 rounded-btn border border-black/[0.1] bg-white text-brand-charcoal focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-btn hover:bg-black/90 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-brand-sale mt-1">{couponError}</p>
                )}
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 text-xs text-brand-muted pt-2 border-t border-black/[0.06]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-black font-mono">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-brand-sale">
                    <span>Discount</span>
                    <span className="font-bold font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-brand-success font-semibold">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-black/[0.06]">
                  <span className="font-serif">Total</span>
                  <span className="font-mono text-black">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center py-3 px-3 rounded-btn border border-black/[0.15] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors text-center"
                >
                  View Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-[#FF5722] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E64A19] transition-colors shadow-sm text-center"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
