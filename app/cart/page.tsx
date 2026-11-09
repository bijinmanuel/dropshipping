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
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8 pb-4 border-b border-brand-border/60 flex items-baseline justify-between">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
              Your Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
              Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-brand-forest hover:underline"
          >
            &larr; Continue Curating
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-card border border-brand-border p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-brand-muted" />
            </div>
            <h2 className="font-serif text-2xl text-brand-charcoal mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-brand-muted max-w-sm mx-auto mb-6 leading-relaxed">
              Looks like you haven&apos;t added any architectural objects to your bag yet. Discover our best sellers and curated collections.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/shop"
                className="px-6 py-3 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle"
              >
                Explore Collection
              </Link>
              <Link
                href="/wishlist"
                className="px-6 py-3 rounded-btn border border-brand-border text-brand-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-background transition-colors"
              >
                View Saved Wishlist
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Notification Bar */}
              <div className="bg-brand-forest-light border border-brand-forest/20 rounded-card p-4">
                <div className="flex items-center justify-between text-xs font-medium text-brand-forest mb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-forest" />
                    {freeShippingRemaining > 0 ? (
                      <span>Add <strong className="font-bold">{formatPrice(freeShippingRemaining)}</strong> more to unlock Free Air Express Courier Delivery</span>
                    ) : (
                      <span className="font-bold text-brand-success flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> You&apos;ve unlocked Complimentary Air Express Courier Delivery!
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-xs">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-forest transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card Container */}
              <div className="bg-white rounded-card border border-brand-border divide-y divide-brand-border">
                {items.map((item) => {
                  const unitPrice = item.product.price + (item.selectedVariant.priceModifier || 0);
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                      {/* 4:5 Aspect Ratio Thumbnail */}
                      <div className="relative aspect-product w-24 sm:w-28 rounded-btn overflow-hidden bg-background shrink-0 border border-brand-border/60">
                        <Image
                          src={
                            item.product.images[item.selectedVariant.imageIndex || 0] ||
                            item.product.images[0]
                          }
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-forest">
                                {item.product.categoryLabel}
                              </span>
                              <Link
                                href={`/product/${item.product.slug}`}
                                className="block font-serif text-base sm:text-lg text-brand-charcoal hover:text-brand-forest transition-colors mt-0.5"
                              >
                                {item.product.title}
                              </Link>
                            </div>
                            <span className="font-bold text-base text-brand-forest">
                              {formatPrice(lineTotal)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-xs text-brand-muted">
                            <span>Finishing:</span>
                            <span className="font-semibold text-brand-charcoal">
                              {item.selectedVariant.name}
                            </span>
                            <span>&bull;</span>
                            <span>Unit: {formatPrice(unitPrice)}</span>
                          </div>

                          <p className="text-[11px] text-brand-muted mt-1">
                            Dispatched directly from atelier in {item.product.details.origin}.
                          </p>
                        </div>

                        {/* Controls: Stepper, Wishlist, Remove */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-brand-border/50">
                          <div className="flex items-center gap-4">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-brand-border rounded-btn bg-background-subtle">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1.5 text-brand-charcoal hover:bg-white rounded-l-btn text-xs font-bold transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-semibold text-brand-charcoal">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1.5 text-brand-charcoal hover:bg-white rounded-r-btn text-xs font-bold transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Move to Wishlist */}
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="text-xs text-brand-muted hover:text-brand-charcoal transition-colors flex items-center gap-1 font-medium"
                            >
                              <Heart className="w-3.5 h-3.5" />
                              <span>Move to Wishlist</span>
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-brand-muted hover:text-brand-error transition-colors flex items-center gap-1"
                            title="Remove object"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-card border border-brand-border p-6 shadow-subtle space-y-5 sticky top-28">
                <h3 className="font-serif text-xl text-brand-charcoal pb-3 border-b border-brand-border">
                  Order Summary
                </h3>

                {/* Promo Code Applicator */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-xs bg-brand-forest-light text-brand-forest p-3 rounded-btn border border-brand-forest/20">
                      <div>
                        <span className="font-bold block">Coupon &ldquo;{appliedCoupon.code}&rdquo;</span>
                        <span className="text-[11px] text-brand-muted">{appliedCoupon.description}</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-semibold text-brand-error hover:underline"
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
                        className="flex-1 text-xs px-3 py-2.5 rounded-btn border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-forest"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-btn bg-brand-charcoal text-white text-xs font-semibold hover:bg-brand-forest transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-brand-error mt-1">{couponError}</p>
                  )}
                </div>

                {/* Delivery Options Selector */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                    Delivery Method
                  </h4>
                  <div className="space-y-2">
                    {SHIPPING_METHODS.map((method) => {
                      const isFree = method.id === 'ship-standard' && subtotal >= freeShippingThreshold;
                      const price = isFree ? 0 : method.price;

                      return (
                        <label
                          key={method.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-btn border cursor-pointer transition-all text-xs ${
                            selectedShipping.id === method.id
                              ? 'border-brand-forest bg-brand-forest-light/60'
                              : 'border-brand-border hover:bg-background'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={selectedShipping.id === method.id}
                            onChange={() => setShippingMethod(method)}
                            className="mt-0.5 accent-brand-forest"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between font-semibold text-brand-charcoal">
                              <span>{method.name}</span>
                              <span className="text-brand-forest">
                                {price === 0 ? 'FREE' : formatPrice(price)}
                              </span>
                            </div>
                            <p className="text-[10px] text-brand-muted mt-0.5">
                              {method.estimatedDays} &bull; {method.carrier}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Calculation Rows */}
                <div className="space-y-2.5 pt-4 border-t border-brand-border text-xs text-brand-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-charcoal">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-brand-sale">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shippingCost === 0 ? <strong className="text-brand-success font-semibold">FREE</strong> : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8%)</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-brand-charcoal pt-3 border-t border-brand-border">
                    <span>Estimated Total</span>
                    <span className="text-brand-forest">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-float flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-brand-gold" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Trust Guarantees */}
                <div className="pt-2 text-center text-[11px] text-brand-muted space-y-1">
                  <p className="flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-forest" />
                    <span>256-bit Encrypted Checkout &bull; 30-Day Guarantee</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
