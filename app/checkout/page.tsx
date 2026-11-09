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
  Info,
  Tag,
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

  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [email, setEmail] = useState(user?.email || 'camille.laurent@verden-design.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-8971');
  const [firstName, setFirstName] = useState(user?.defaultAddress?.firstName || 'Camille');
  const [lastName, setLastName] = useState(user?.defaultAddress?.lastName || 'de Laurent');
  const [addressLine1, setAddressLine1] = useState(user?.defaultAddress?.addressLine1 || '482 Mercer Street');
  const [addressLine2, setAddressLine2] = useState(user?.defaultAddress?.addressLine2 || 'Apt 4B');
  const [city, setCity] = useState(user?.defaultAddress?.city || 'New York');
  const [state, setState] = useState(user?.defaultAddress?.state || 'NY');
  const [postalCode, setPostalCode] = useState(user?.defaultAddress?.postalCode || '10013');
  const [country, setCountry] = useState(user?.defaultAddress?.country || 'United States');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay' | 'klarna'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('892');
  const [isProcessing, setIsProcessing] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-card-lg border border-black/[0.08] shadow-subtle">
          <h2 className="font-serif text-2xl text-brand-charcoal mb-2">No items to checkout</h2>
          <p className="text-xs text-brand-muted mb-6">Your shopping bag is empty.</p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-wider"
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

    const orderId = generateTrackingNumber();

    const orderItems: OrderItem[] = items.map((i) => ({
      productId: i.product.id,
      productTitle: i.product.title,
      productImage: i.product.images[0],
      variantId: i.selectedVariant.id,
      variantName: i.selectedVariant.name,
      price: i.product.price + (i.selectedVariant.priceModifier || 0),
      quantity: i.quantity,
      supplierSku: i.selectedVariant.supplierSku,
      fulfillmentStatus: 'processing',
    }));

    const customerAddress: ShippingAddress = {
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

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: customerAddress,
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
      paymentMethod,
      paymentStatus: 'paid',
      fulfillmentStatus: 'supplier_confirmed',
      trackingNumber: `TRK-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      trackingCarrier: selectedShipping.carrier,
      dropshipLogistics: {
        supplierOrderDispatched: true,
        dispatchTimestamp: new Date().toISOString(),
        originWarehouse: 'EU / Kansai International Express Dispatch',
        destinationCountry: country,
      },
      trackingEvents: [
        {
          status: 'Order Verified',
          location: 'VÉRDEN Digital Concierge',
          timestamp: new Date().toISOString(),
          description: 'Payment authorized and 256-bit order manifest verified.',
          completed: true,
        },
        {
          status: 'Supplier EDI Dispatched',
          location: 'Atelier Logistics Hub',
          timestamp: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
          description: 'Autonomous dropship purchase order transmitted to master workshop.',
          completed: true,
        },
        {
          status: 'Quality Inspection Scheduled',
          location: 'Central Dispatch Facility',
          timestamp: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
          description: '7-point finish, electrical, and shockproof drop verification.',
          completed: false,
        },
      ],
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('verden_orders_db_v1') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('verden_orders_db_v1', JSON.stringify(existingOrders));
      localStorage.setItem('verden_latest_order', JSON.stringify(newOrder));
    } catch (e) {
      console.error('Failed to store order:', e);
    }

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push(`/order-success/${orderId}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="mb-10 flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl font-normal tracking-[0.28em] text-brand-charcoal uppercase">
              VÉRDEN
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-brand-charcoal font-semibold bg-white border border-black/[0.08] px-3.5 py-1.5 rounded-pill shadow-xs">
            <Lock className="w-3.5 h-3.5 text-brand-gold" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex items-center justify-between max-w-xl mx-auto mb-10 text-xs font-semibold">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 pb-2.5 border-b-2 transition-all ${
              currentStep === 1
                ? 'border-black text-black'
                : 'border-transparent text-brand-muted hover:text-black'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === 1 ? 'bg-black text-white' : 'bg-background-subtle text-brand-muted'
            }`}>
              1
            </span>
            <span className="uppercase tracking-wider text-[11px]">Shipping Details</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/40" />

          <button
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-2 pb-2.5 border-b-2 transition-all ${
              currentStep === 2
                ? 'border-black text-black'
                : 'border-transparent text-brand-muted hover:text-black'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === 2 ? 'bg-black text-white' : 'bg-background-subtle text-brand-muted'
            }`}>
              2
            </span>
            <span className="uppercase tracking-wider text-[11px]">Delivery Method</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/40" />

          <button
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-2 pb-2.5 border-b-2 transition-all ${
              currentStep === 3
                ? 'border-black text-black'
                : 'border-transparent text-brand-muted hover:text-black'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === 3 ? 'bg-black text-white' : 'bg-background-subtle text-brand-muted'
            }`}>
              3
            </span>
            <span className="uppercase tracking-wider text-[11px]">Payment &amp; Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="bg-white rounded-card-lg border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
                  <h3 className="font-serif text-xl text-brand-charcoal">
                    1. Customer Information &amp; Shipping Address
                  </h3>
                  {!isAuthenticated && (
                    <Link
                      href="/auth/login"
                      className="text-xs text-brand-gold hover:underline font-semibold"
                    >
                      Sign In
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-brand-charcoal mb-1">
                      Email Address for Cargo Telemetry
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1] text-brand-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-charcoal mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-charcoal mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-brand-charcoal mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-brand-charcoal mb-1">
                      Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-charcoal mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-charcoal mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-charcoal mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-charcoal mb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1] bg-white"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-brand-charcoal mb-1">Phone Number for Delivery Coordination</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-btn border border-black/[0.1] font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-7 py-3.5 rounded-btn bg-black hover:bg-black/90 text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors flex items-center gap-2"
                  >
                    <span>Delivery Method</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="bg-white rounded-card-lg border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-5 animate-fadeIn">
                <div className="pb-3.5 border-b border-black/[0.06]">
                  <h3 className="font-serif text-xl text-brand-charcoal">
                    2. Choose Delivery Method
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Shipping to: {addressLine1}, {city}, {postalCode}, {country}
                  </p>
                </div>

                <div className="space-y-3">
                  {SHIPPING_METHODS.map((method) => {
                    const isFree = method.id === 'ship-standard' && subtotal >= freeShippingThreshold;
                    const price = isFree ? 0 : method.price;

                    return (
                      <label
                        key={method.id}
                        className={`flex items-start gap-3 p-4 rounded-card-lg border cursor-pointer transition-all ${
                          selectedShipping.id === method.id
                            ? 'border-black bg-white shadow-xs ring-1 ring-black'
                            : 'border-black/[0.08] hover:bg-background'
                        }`}
                      >
                        <input
                          type="radio"
                          name="checkoutShipping"
                          checked={selectedShipping.id === method.id}
                          onChange={() => setShippingMethod(method)}
                          className="mt-1 accent-black"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center text-sm font-semibold text-brand-charcoal">
                            <span>{method.name}</span>
                            <span className="font-mono font-bold text-black">
                              {price === 0 ? 'FREE' : formatPrice(price)}
                            </span>
                          </div>
                          <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                            {method.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] text-brand-charcoal/80">
                            <span className="font-medium">Estimated Transit: {method.estimatedDays}</span>
                            <span>&bull;</span>
                            <span className="text-brand-muted">Carrier: {method.carrier}</span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold text-brand-muted hover:text-black"
                  >
                    &larr; Back to Shipping
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-7 py-3.5 rounded-btn bg-black hover:bg-black/90 text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors flex items-center gap-2"
                  >
                    <span>Payment &amp; Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="bg-white rounded-card-lg border border-black/[0.08] p-6 sm:p-8 shadow-subtle space-y-5 animate-fadeIn">
                <div className="pb-3.5 border-b border-black/[0.06]">
                  <h3 className="font-serif text-xl text-brand-charcoal">
                    3. Payment Information
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    All transactions are secure and encrypted with 256-bit TLS.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple_pay', label: 'Apple Pay', icon: Lock },
                    { id: 'paypal', label: 'PayPal', icon: CheckCircle2 },
                    { id: 'klarna', label: 'Klarna Pay', icon: Tag },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`flex flex-col items-center justify-center p-3.5 rounded-btn border text-xs font-semibold transition-all ${
                          paymentMethod === pm.id
                            ? 'border-black bg-white shadow-xs ring-1 ring-black text-black'
                            : 'border-black/[0.08] text-brand-muted hover:text-black hover:bg-background'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1 text-brand-gold" />
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-3 text-xs">
                    <div>
                      <label className="block font-semibold text-brand-charcoal mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 rounded-btn border border-black/[0.1] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-brand-charcoal mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 rounded-btn border border-black/[0.1] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-brand-charcoal mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full p-2.5 rounded-btn border border-black/[0.1] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod !== 'card' && (
                  <div className="p-4 rounded-btn bg-background text-xs text-brand-muted text-center font-normal">
                    You will authenticate securely with {paymentMethod.toUpperCase()}.
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center border-t border-black/[0.06]">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-semibold text-brand-muted hover:text-black"
                  >
                    &larr; Back to Delivery
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-4 rounded-btn bg-black hover:bg-black/90 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-float flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{isProcessing ? 'Authorizing Payment...' : `Complete Order &bull; ${formatPrice(finalTotal)}`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-card-lg border border-black/[0.08] p-6 sm:p-7 shadow-subtle space-y-5 sticky top-28">
              <h3 className="font-serif text-xl text-brand-charcoal pb-3 border-b border-black/[0.06]">
                Your Selection ({itemCount})
              </h3>

              <div className="divide-y divide-black/[0.06] max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3.5 first:pt-0 flex items-center gap-3.5">
                    <div className="relative aspect-product w-12 rounded-btn overflow-hidden bg-background shrink-0 border border-black/[0.08]">
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
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-medium text-brand-charcoal truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-brand-muted">
                        {item.selectedVariant.name} &bull; Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-black font-mono">
                      {formatPrice(
                        (item.product.price + (item.selectedVariant.priceModifier || 0)) * item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs bg-background text-black p-2.5 rounded-btn border border-black/[0.08]">
                    <span>Code &ldquo;{appliedCoupon.code}&rdquo; active</span>
                    <button onClick={removeCoupon} className="font-bold text-brand-sale">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Promo Code"
                      className="flex-1 text-xs px-3 py-2 rounded-btn border border-black/[0.1]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-brand-sale mt-1">{couponError}</p>}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-black/[0.06] text-xs text-brand-muted">
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
                  <span>Shipping ({selectedShipping.name})</span>
                  <span>{shippingCost === 0 ? <strong className="text-brand-success font-semibold">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (8%)</span>
                  <span className="font-mono">{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-black/[0.06]">
                  <span className="font-serif">Total</span>
                  <span className="font-mono text-black">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
