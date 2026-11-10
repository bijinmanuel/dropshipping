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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside 
          aria-label="Shopping bag"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-200"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#FAFAFC]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              <h2 className="text-base font-extrabold text-gray-950 font-heading">
                Shopping Cart
              </h2>
              <span className="text-[11px] bg-[#FF4D00] text-white rounded-full px-2 py-0.5 font-bold font-mono">
                {itemCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-white px-5 py-3.5 border-b border-gray-100">
            <div className="flex items-center justify-between text-xs font-medium text-gray-800 mb-2">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF4D00] shrink-0" />
                {freeShippingRemaining > 0 ? (
                  <span>Add <strong className="font-bold text-gray-950 font-mono">{formatPrice(freeShippingRemaining)}</strong> for Free Shipping</span>
                ) : (
                  <span className="font-bold text-emerald-600">Free Express Shipping Unlocked!</span>
                )}
              </span>
              <span className="text-[11px] font-bold font-mono text-gray-600">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF4D00] to-orange-400 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#FF4D00]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-950">Your bag is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  Discover our trending sneakers, audio tech, minimalist apparel, and lifestyle accessories.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal =
                  (item.product.price + (item.selectedVariant.priceModifier || 0)) * item.quantity;
                return (
                  <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                    <div className="relative w-20 h-20 rounded-xl bg-[#F6F7F9] overflow-hidden shrink-0 flex items-center justify-center p-2 border border-gray-100">
                      <Image
                        src={
                          item.product.images[item.selectedVariant.imageIndex || 0] ||
                          item.product.images[0]
                        }
                        alt={item.product.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="text-xs font-bold text-gray-950 hover:text-[#FF4D00] transition-colors line-clamp-1"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
                          {item.selectedVariant.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-bold text-gray-950">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-[#FAFAFC] space-y-4">
              {/* Promo Code Input */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Promo code (try SAVE20)"
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-black font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 rounded-xl bg-orange-50 border border-orange-200 text-xs">
                  <div className="flex items-center gap-1.5 text-orange-950 font-bold">
                    <Tag className="w-3.5 h-3.5 text-[#FF4D00]" />
                    <span>{appliedCoupon.code} (-{appliedCoupon.discountValue}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Estimated Shipping</span>
                  <span className="font-mono font-bold text-gray-900">
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-950 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="font-mono text-base">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 rounded-full bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold tracking-wide transition-all shadow-[0_10px_25px_-5px_rgba(255,77,0,0.4)] flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-2.5 rounded-full bg-white border border-gray-200 hover:border-black text-gray-800 text-xs font-semibold tracking-wide transition-colors flex items-center justify-center"
                >
                  View Full Cart Details
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
