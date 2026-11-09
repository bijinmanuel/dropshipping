'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { SHIPPING_METHODS } from '@/data/shipping';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    finalTotal,
    freeShippingThreshold,
    freeShippingProgress,
    freeShippingRemaining,
    updateQuantity,
    removeFromCart,
    moveToWishlist,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    selectedShipping,
    setShippingMethod,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

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
    <div className="min-h-screen bg-[#FAFAFC] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-gray-200 flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
              Shopping Cart
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-1 font-heading tracking-tight">
              Review Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-gray-600 hover:text-[#FF4D00] flex items-center gap-1 transition-colors"
          >
            <span>&larr; Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-gray-200 p-12 sm:p-16 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4 text-[#FF4D00]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-950 mb-2 font-heading">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Explore our curated selection of trending streetwear, noise-cancelling headphones, athletic footwear, and modern home accessories.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/shop"
                className="px-7 py-3 rounded-full bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold tracking-wide transition-colors shadow-md"
              >
                Shop Trending Items
              </Link>
              <Link
                href="/wishlist"
                className="px-7 py-3 rounded-full border border-gray-200 text-gray-800 text-xs font-bold hover:border-black transition-colors"
              >
                View Saved Items
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Notification */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-800 mb-2.5">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#FF4D00]" />
                    {freeShippingRemaining > 0 ? (
                      <span>Add <strong className="font-bold font-mono text-gray-950">{formatPrice(freeShippingRemaining)}</strong> for Free Express Delivery</span>
                    ) : (
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Free Express Delivery Unlocked!
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-xs font-mono text-gray-600">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF4D00] to-orange-400 transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-gray-200 divide-y divide-gray-100 shadow-xs overflow-hidden">
                {items.map((item) => {
                  const unitPrice = item.product.price + (item.selectedVariant.priceModifier || 0);
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                      {/* Thumbnail */}
                      <div className="relative aspect-square w-24 sm:w-28 rounded-2xl overflow-hidden bg-[#F6F7F9] shrink-0 border border-gray-100 flex items-center justify-center p-2">
                        <Image
                          src={
                            item.product.images[item.selectedVariant.imageIndex || 0] ||
                            item.product.images[0]
                          }
                          alt={item.product.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF4D00]">
                                {item.product.categoryLabel}
                              </span>
                              <Link
                                href={`/product/${item.product.slug}`}
                                className="block text-base font-bold text-gray-950 hover:text-[#FF4D00] transition-colors mt-0.5"
                              >
                                {item.product.title}
                              </Link>
                              <p className="text-xs text-gray-500 mt-1">
                                Option: <strong className="text-gray-800">{item.selectedVariant.name}</strong>
                              </p>
                            </div>

                            <span className="text-base font-extrabold text-gray-950 font-mono">
                              {formatPrice(lineTotal)}
                            </span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors text-xs font-bold"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-gray-950">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors text-xs font-bold"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-semibold">
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="text-gray-400 hover:text-[#FF4D00] flex items-center gap-1 transition-colors"
                            >
                              <Heart className="w-3.5 h-3.5" />
                              <span>Save to Wishlist</span>
                            </button>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-950 pb-3 border-b border-gray-100 font-heading">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <div>
                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Promo code (e.g. SAVE20)"
                        className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-black font-mono uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs">
                      <div className="flex items-center gap-2 text-orange-950 font-bold">
                        <Tag className="w-4 h-4 text-[#FF4D00]" />
                        <span>Code: {appliedCoupon.code} (-{appliedCoupon.discountValue}%)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-[11px] text-red-500 mt-1.5">{couponError}</p>}
                </div>

                {/* Shipping Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">
                    Shipping Method
                  </label>
                  <div className="space-y-2">
                    {SHIPPING_METHODS.map((method) => {
                      const cost = subtotal >= freeShippingThreshold && method.id === 'standard' ? 0 : method.price;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                            selectedShipping.id === method.id
                              ? 'border-black bg-orange-50/50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="shipping"
                              checked={selectedShipping.id === method.id}
                              onChange={() => setShippingMethod(method)}
                              className="accent-[#FF4D00]"
                            />
                            <div>
                              <p className="font-bold text-gray-900">{method.name}</p>
                              <p className="text-[11px] text-gray-400">{method.estimatedDays}</p>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-gray-950">
                            {cost === 0 ? 'FREE' : formatPrice(cost)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2.5 text-xs pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-gray-950">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="font-mono font-bold text-gray-950">
                      {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Estimated Sales Tax (8%)</span>
                    <span className="font-mono font-bold text-gray-950">{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-gray-950 pt-3 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span className="font-mono text-xl text-[#FF4D00]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] hover:from-[#E04400] hover:to-[#FF5500] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_10px_25px_-5px_rgba(255,77,0,0.4)] hover:shadow-[0_16px_35px_-5px_rgba(255,77,0,0.5)] flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-bit Encrypted Checkout • Guaranteed Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
