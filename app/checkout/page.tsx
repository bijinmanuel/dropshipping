'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ChevronRight,
  Tag,
  Zap,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, generateTrackingNumber } from '@/lib/utils';
import { SHIPPING_METHODS } from '@/data/shipping';
import { Order, OrderItem, ShippingAddress } from '@/types/cart';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    selectedShipping,
    setShippingMethod,
    freeShippingThreshold,
  } = useCart();

  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [email, setEmail] = useState(user?.email || 'alex.turner@example.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-8971');
  const [firstName, setFirstName] = useState(user?.defaultAddress?.firstName || 'Alex');
  const [lastName, setLastName] = useState(user?.defaultAddress?.lastName || 'Turner');
  const [addressLine1, setAddressLine1] = useState(user?.defaultAddress?.addressLine1 || '482 Broadway St');
  const [addressLine2, setAddressLine2] = useState(user?.defaultAddress?.addressLine2 || 'Suite 400');
  const [city, setCity] = useState(user?.defaultAddress?.city || 'New York');
  const [state, setState] = useState(user?.defaultAddress?.state || 'NY');
  const [postalCode, setPostalCode] = useState(user?.defaultAddress?.postalCode || '10013');
  const [country, setCountry] = useState(user?.defaultAddress?.country || 'United States');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('921');
  const [isProcessing, setIsProcessing] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-gray-200 shadow-xs">
          <h2 className="text-xl font-bold text-gray-950 mb-2 font-heading">No items to checkout</h2>
          <p className="text-xs text-gray-500 mb-6">Your shopping bag is currently empty.</p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-[#FF4D00] text-white text-xs font-bold"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      const trackingNumber = generateTrackingNumber();

      const shippingAddress: ShippingAddress = {
        firstName,
        lastName,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      };

      const orderItems: OrderItem[] = items.map((i) => ({
        productId: i.product.id,
        productTitle: i.product.title,
        productImage: i.product.images[i.selectedVariant.imageIndex || 0] || i.product.images[0],
        variantId: i.selectedVariant.id,
        variantName: i.selectedVariant.name,
        price: i.product.price + (i.selectedVariant.priceModifier || 0),
        quantity: i.quantity,
        supplierSku: i.selectedVariant.supplierSku || i.product.dropship.supplierSku,
        fulfillmentStatus: 'processing',
        trackingNumber,
        trackingCarrier: 'USPS Priority Air',
      }));

      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: shippingAddress,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        shipping: {
          method: selectedShipping.name,
          cost: shippingCost,
        },
        tax: taxAmount,
        total: finalTotal,
        paymentMethod: paymentMethod === 'apple_pay' ? 'apple_pay' : paymentMethod === 'paypal' ? 'paypal' : 'card',
        paymentStatus: 'paid',
        fulfillmentStatus: 'processing',
        trackingNumber,
        trackingCarrier: 'USPS Priority Air',
        trackingEvents: [
          {
            status: 'Order Placed',
            location: 'NovaTrend Central Dispatch',
            timestamp: new Date().toISOString(),
            description: 'Order confirmed and payment verified.',
            completed: true,
          },
        ],
        dropshipLogistics: {
          supplierOrderDispatched: true,
          dispatchTimestamp: new Date().toISOString(),
          originWarehouse: 'California Fulfillment Center',
          destinationCountry: country,
        },
      };

      try {
        const existing = JSON.parse(localStorage.getItem('novatrend_orders') || '[]');
        localStorage.setItem('novatrend_orders', JSON.stringify([newOrder, ...existing]));
      } catch (e) {
        console.error('Failed to store order in localStorage', e);
      }

      clearCart();
      setIsProcessing(false);
      router.push(`/order-success/${orderId}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            
            {[
              { num: 1, label: 'Customer Details' },
              { num: 2, label: 'Shipping Method' },
              { num: 3, label: 'Payment' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num as any);
                }}
                className={`relative z-10 flex flex-col items-center group ${
                  step.num <= currentStep ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs font-mono transition-all ${
                    currentStep === step.num
                      ? 'bg-[#FF4D00] text-white ring-4 ring-orange-100 shadow-md'
                      : step.num < currentStep
                      ? 'bg-black text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {step.num < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                </div>
                <span className="text-[11px] font-bold text-gray-900 mt-1.5 hidden sm:block">
                  {step.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Checkout Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Form Area (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer & Address */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-950 font-heading">
                    Contact Information
                  </h2>
                  <p className="text-xs text-gray-500">Order confirmation will be sent here</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h2 className="text-lg font-bold text-gray-950 font-heading mb-1">
                    Shipping Address
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">Where should we deliver your order?</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">Apartment, Suite, Unit</label>
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Continue to Shipping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-950 font-heading">
                    Select Shipping Speed
                  </h2>
                  <p className="text-xs text-gray-500">All shipments include insurance and tracking</p>
                </div>

                <div className="space-y-3">
                  {SHIPPING_METHODS.map((method) => {
                    const cost = subtotal >= freeShippingThreshold && method.id === 'standard' ? 0 : method.price;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer text-xs transition-colors ${
                          selectedShipping.id === method.id
                            ? 'border-black bg-orange-50/40 ring-1 ring-black'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="checkout_shipping"
                            checked={selectedShipping.id === method.id}
                            onChange={() => setShippingMethod(method)}
                            className="accent-[#FF4D00]"
                          />
                          <div>
                            <p className="font-bold text-gray-950 text-sm">{method.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-sm text-gray-950">
                          {cost === 0 ? 'FREE' : formatPrice(cost)}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-gray-600 hover:text-black"
                  >
                    &larr; Back to Address
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-8 py-3.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-950 font-heading">
                    Payment Method
                  </h2>
                  <p className="text-xs text-gray-500">256-bit encrypted secure checkout</p>
                </div>

                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Credit Card' },
                    { id: 'apple_pay', label: 'Apple Pay' },
                    { id: 'paypal', label: 'PayPal' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all ${
                        paymentMethod === m.id
                          ? 'border-black bg-black text-white shadow-xs'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 text-xs pt-2">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Expiration (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">CVC Code</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-gray-600 hover:text-black"
                  >
                    &larr; Back to Shipping
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-9 py-4 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] hover:from-[#E04400] hover:to-[#FF5500] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_10px_25px_-5px_rgba(255,77,0,0.4)] hover:shadow-[0_16px_35px_-5px_rgba(255,77,0,0.5)] flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Authorizing Payment...</span>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Place Order • {formatPrice(finalTotal)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-6 sticky top-24">
              <h3 className="text-base font-bold text-gray-950 font-heading">
                Order Review ({itemCount} items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3 first:pt-0 last:pb-0">
                    <div className="relative w-14 h-14 rounded-xl bg-[#F6F7F9] overflow-hidden shrink-0 flex items-center justify-center p-1 border border-gray-100">
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
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-950 truncate">{item.product.title}</p>
                      <p className="text-[11px] text-gray-500">
                        {item.quantity}x • {item.selectedVariant.name}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-950">
                      {formatPrice((item.product.price + (item.selectedVariant.priceModifier || 0)) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon code (SAVE20)"
                      className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-200 placeholder:text-gray-400 font-mono uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-xs">
                    <div className="flex items-center gap-2 text-orange-950 font-bold">
                      <Tag className="w-3.5 h-3.5 text-[#FF4D00]" />
                      <span>{appliedCoupon.code} (-{appliedCoupon.discountValue}%)</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs pt-4 border-t border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-gray-950">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping ({selectedShipping.name})</span>
                  <span className="font-mono font-bold text-gray-950">
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Sales Tax (8%)</span>
                  <span className="font-mono font-bold text-gray-950">{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-950 pt-3 border-t border-gray-200">
                  <span>Total Due</span>
                  <span className="font-mono text-xl text-[#FF4D00]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
