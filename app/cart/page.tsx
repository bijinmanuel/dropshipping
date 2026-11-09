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
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-10 pb-4 border-b border-black/[0.06] flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
              Your Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
              Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-charcoal hover:text-black"
          >
            &larr; Continue Curating
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-card-lg border border-black/[0.08] p-16 text-center max-w-xl mx-auto my-12 shadow-subtle">
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4 border border-black/[0.06]">
              <ShoppingBag className="w-7 h-7 text-brand-gold" />
            </div>
            <h2 className="font-serif text-2xl text-brand-charcoal mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-brand-muted max-w-sm mx-auto mb-8 leading-relaxed font-normal">
              Discover our permanent collection of architectural lighting, ceramics, and living essentials.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/shop"
                className="px-7 py-3.5 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-[0.16em] hover:bg-black/90 transition-colors shadow-sm"
              >
                Explore Collection
              </Link>
              <Link
                href="/wishlist"
                className="px-7 py-3.5 rounded-btn border border-black/[0.12] text-brand-charcoal text-xs font-bold uppercase tracking-[0.16em] hover:border-black transition-colors"
              >
                Saved Archive
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Notification */}
              <div className="bg-white border border-black/[0.08] rounded-card-lg p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-brand-charcoal mb-2.5">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-gold" />
                    {freeShippingRemaining > 0 ? (
                      <span>Add <strong className="font-bold font-mono">{formatPrice(freeShippingRemaining)}</strong> for Complimentary Air Express Delivery</span>
                    ) : (
                      <span className="font-bold text-brand-success flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Complimentary Insured Express Delivery Unlocked!
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-xs font-mono">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gold transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-card-lg border border-black/[0.08] divide-y divide-black/[0.06] shadow-subtle overflow-hidden">
                {items.map((item) => {
                  const unitPrice = item.product.price + (item.selectedVariant.priceModifier || 0);
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                      {/* Thumbnail */}
                      <div className="relative aspect-product w-24 sm:w-28 rounded-card overflow-hidden bg-background shrink-0 border border-black/[0.08]">
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

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-brand-gold">
                                {item.product.categoryLabel}
                              </span>
                              <Link
                                href={`/product/${item.product.slug}`}
                                className="block font-serif text-lg text-brand-charcoal hover:text-black transition-colors mt-0.5"
                              >
                                {item.product.title}
                              </Link>
                            </div>
                            <span className="font-bold text-base text-black font-mono">
                              {formatPrice(lineTotal)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-xs text-brand-muted">
                            <span>Finishing:</span>
                            <span className="font-semibold text-brand-charcoal">
                              {item.selectedVariant.name}
                            </span>
                            <span>&bull;</span>
                            <span className="font-mono">Unit: {formatPrice(unitPrice)}</span>
                          </div>

                          <p className="text-[11px] text-brand-muted mt-1 font-normal">
                            Direct dispatch from atelier in {item.product.details.origin}.
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/[0.06]">
                          <div className="flex items-center gap-4">
                            {/* Stepper */}
                            <div className="flex items-center border border-black/[0.1] rounded-btn bg-white">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1.5 text-brand-charcoal hover:bg-background rounded-l-btn text-xs font-bold transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-black font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1.5 text-brand-charcoal hover:bg-background rounded-r-btn text-xs font-bold transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Move to Wishlist */}
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="text-xs text-brand-muted hover:text-black transition-colors flex items-center gap-1 font-medium"
                            >
                              <Heart className="w-3.5 h-3.5" />
                              <span>Move to Wishlist</span>
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-brand-muted hover:text-brand-sale transition-colors flex items-center gap-1"
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

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-card-lg border border-black/[0.08] p-6 sm:p-7 shadow-subtle space-y-6 sticky top-28">
                <h3 className="font-serif text-xl text-brand-charcoal pb-4 border-b border-black/[0.06]">
                  Order Summary
                </h3>

                {/* Promo Applicator */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-xs bg-background p-3 rounded-btn border border-black/[0.08]">
                      <div>
                        <span className="font-bold block text-black">Code &ldquo;{appliedCoupon.code}&rdquo;</span>
                        <span className="text-[11px] text-brand-muted">{appliedCoupon.description}</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-brand-sale hover:underline"
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
                        placeholder="Privilege Code (VERDEN15)"
                        className="flex-1 text-xs px-3.5 py-2.5 rounded-btn border border-black/[0.1] text-brand-charcoal focus:outline-none focus:border-black"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-black/90 transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-brand-sale mt-1.5">{couponError}</p>
                  )}
                </div>

                {/* Delivery Options */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-2.5">
                    Delivery Speed
                  </h4>
                  <div className="space-y-2">
                    {SHIPPING_METHODS.map((method) => {
                      const isFree = method.id === 'ship-standard' && subtotal >= freeShippingThreshold;
                      const price = isFree ? 0 : method.price;

                      return (
                        <label
                          key={method.id}
                          className={`flex items-start gap-2.5 p-3 rounded-btn border cursor-pointer transition-all text-xs ${
                            selectedShipping.id === method.id
                              ? 'border-black bg-white shadow-xs ring-1 ring-black'
                              : 'border-black/[0.08] hover:bg-background'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={selectedShipping.id === method.id}
                            onChange={() => setShippingMethod(method)}
                            className="mt-0.5 accent-black"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between font-semibold text-brand-charcoal">
                              <span>{method.name}</span>
                              <span className="font-mono font-bold text-black">
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

                {/* Totals */}
                <div className="space-y-2.5 pt-4 border-t border-black/[0.06] text-xs text-brand-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-black font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-brand-sale">
                      <span>Privilege Discount ({appliedCoupon?.code})</span>
                      <span className="font-bold font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shippingCost === 0 ? <strong className="text-brand-success font-semibold">FREE</strong> : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8%)</span>
                    <span className="font-mono">{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-black/[0.06]">
                    <span className="font-serif">Estimated Total</span>
                    <span className="font-mono text-black">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-btn bg-black hover:bg-black/90 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-float flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <p className="text-[11px] text-center text-brand-muted pt-1 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>256-bit Encrypted Checkout &bull; 30-Day Living Guarantee</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
