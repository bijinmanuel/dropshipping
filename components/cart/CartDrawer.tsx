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
        className="absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside 
          aria-label="Shopping bag"
          className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col border-l border-brand-border animate-slideDown"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-brand-border bg-background">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-forest" />
              <h2 className="text-base font-semibold text-brand-charcoal tracking-tight">
                Shopping Bag
              </h2>
              <span className="text-xs bg-brand-forest text-white rounded-pill px-2 py-0.5 font-medium">
                {itemCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-brand-muted hover:text-brand-charcoal rounded-full hover:bg-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-brand-forest-light px-5 py-3 border-b border-brand-border/60">
            <div className="flex items-center justify-between text-xs font-medium text-brand-forest mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-forest" />
                {freeShippingRemaining > 0 ? (
                  <span>Add <strong className="font-semibold">{formatPrice(freeShippingRemaining)}</strong> for Free Express Delivery</span>
                ) : (
                  <span className="font-semibold text-brand-success">Unlocked: Free Express Delivery!</span>
                )}
              </span>
              <span className="text-[11px] font-bold text-brand-forest">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-forest transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List / Empty State */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-brand-border">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-background-subtle flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-brand-muted" />
                </div>
                <h3 className="text-lg font-serif font-medium text-brand-charcoal mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-brand-muted max-w-xs mb-6">
                  Discover our curated collection of architectural lighting, ceramics, and living essentials.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-btn bg-brand-forest text-white text-xs font-semibold tracking-wider uppercase hover:bg-brand-forest-hover transition-colors shadow-subtle"
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
                    <div className="relative w-20 h-24 rounded-btn overflow-hidden bg-background-subtle shrink-0 border border-brand-border/60">
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
                            className="text-sm font-semibold text-brand-charcoal hover:text-brand-forest line-clamp-1"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-muted hover:text-brand-error p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-brand-muted mt-0.5">
                          Variant: <span className="font-medium text-brand-charcoal">{item.selectedVariant.name}</span>
                        </p>
                        <p className="text-xs font-semibold text-brand-forest mt-1">
                          {formatPrice(unitPrice)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-brand-border rounded-btn bg-background-subtle">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-brand-charcoal hover:bg-white rounded-l-btn transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-brand-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-brand-charcoal hover:bg-white rounded-r-btn transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Move to Wishlist */}
                        <button
                          onClick={() => moveToWishlist(item.id)}
                          className="flex items-center gap-1 text-[11px] text-brand-muted hover:text-brand-charcoal transition-colors font-medium"
                          title="Save for later"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>

                        {/* Line Total */}
                        <span className="text-xs font-bold text-brand-charcoal">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with Totals & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-brand-border bg-background/50 space-y-3">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs bg-brand-forest-light text-brand-forest px-3 py-2 rounded-btn">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      Promo &quot;{appliedCoupon.code}&quot; applied (-{appliedCoupon.discountValue}{appliedCoupon.discountType === 'percentage' ? '%' : '$'})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-brand-forest/70 hover:text-brand-forest font-semibold"
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
                      placeholder="Promo code (e.g. VERDEN15)"
                      className="flex-1 text-xs px-3 py-2 rounded-btn border border-brand-border bg-white text-brand-charcoal placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-forest"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-brand-charcoal text-white text-xs font-medium rounded-btn hover:bg-brand-forest transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-brand-error mt-1">{couponError}</p>
                )}
              </div>

              {/* Subtotal & Breakdown */}
              <div className="space-y-1.5 text-xs text-brand-muted pt-2 border-t border-brand-border/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-charcoal">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-brand-sale">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-brand-success font-semibold">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-brand-charcoal pt-2 border-t border-brand-border">
                  <span>Estimated Total</span>
                  <span className="text-brand-forest">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center py-2.5 px-3 rounded-btn border border-brand-forest text-brand-forest text-xs font-semibold hover:bg-brand-forest-light transition-colors text-center"
                >
                  View Cart Page
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-btn bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-hover transition-colors shadow-subtle text-center"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[10px] text-center text-brand-muted pt-1">
                Tax calculated at checkout. 30-day risk-free return guarantee.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
