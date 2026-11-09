'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Truck,
  Check,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

export default function AccountPage() {
  const { user, logout, updateAddress, demoLogin } = useAuth();
  const { wishlistCount } = useWishlist();
  const { showToast } = useToast();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addrLine1, setAddrLine1] = useState(user?.defaultAddress?.addressLine1 || '482 Mercer Street');
  const [city, setCity] = useState(user?.defaultAddress?.city || 'New York');
  const [state, setState] = useState(user?.defaultAddress?.state || 'NY');
  const [zip, setZip] = useState(user?.defaultAddress?.postalCode || '10013');
  const [country, setCountry] = useState(user?.defaultAddress?.country || 'United States');

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.defaultAddress) {
      updateAddress({
        ...user.defaultAddress,
        addressLine1: addrLine1,
        city,
        state,
        postalCode: zip,
        country,
      });
    }
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile Bar */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#141514] text-brand-gold border border-brand-gold/30 flex items-center justify-center font-serif text-xl font-medium shrink-0">
              {user?.name.charAt(0) || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-2xl sm:text-3xl text-brand-charcoal">{user?.name}</h1>
                <span className="text-[10px] bg-[#141514] text-brand-gold border border-brand-gold/30 font-bold px-3 py-1 rounded-pill uppercase tracking-wider">
                  Privé Collector
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-1 font-mono">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => demoLogin(user?.role === 'admin' ? 'customer' : 'admin')}
              className="text-xs text-brand-charcoal bg-[#FAF9F5] border border-brand-border px-3.5 py-2 rounded-pill font-semibold hover:border-brand-charcoal transition-all"
            >
              Role: {user?.role === 'admin' ? 'Store Admin ⚡' : 'Collector'}
            </button>
            <button
              onClick={logout}
              className="text-xs text-brand-sale hover:underline flex items-center gap-1 font-medium px-2 py-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Orders & Tracking */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-7 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#FAF9F5] border border-brand-border text-brand-charcoal flex items-center justify-center mb-5">
                <Package className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-1.5">Acquisitions &amp; Tracking</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Review past curations, track real-time air cargo waybills, and print receipts.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-brand-border flex flex-col gap-2.5">
              <Link
                href="/account/orders"
                className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold flex items-center justify-between transition-colors"
              >
                <span>View Order History</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/track-order"
                className="text-xs font-medium text-brand-muted hover:text-brand-charcoal flex items-center justify-between transition-colors"
              >
                <span>Lookup Tracking Waybill</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Saved Wishlist */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-7 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#FAF9F5] border border-brand-border text-brand-charcoal flex items-center justify-center mb-5">
                <Heart className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-1.5">
                Saved Archive ({wishlistCount})
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Your private archive of architectural objects, travertine lighting, and ceramics.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-brand-border">
              <Link
                href="/wishlist"
                className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold flex items-center justify-between transition-colors"
              >
                <span>Manage Saved Objects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Dropship Management */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-7 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#FAF9F5] border border-brand-border text-brand-charcoal flex items-center justify-center mb-5">
                <Truck className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-xl text-brand-charcoal mb-1.5">Supplier Operations Hub</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Direct atelier inventory feeds, cost markups, landed margins, and fulfillment EDI.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-brand-border">
              <Link
                href="/dropship-hub"
                className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold flex items-center justify-between transition-colors"
              >
                <span>Launch Supplier Hub &rarr;</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Default Shipping Address Section */}
        <div className="mt-8 bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle">
          <div className="flex items-center justify-between pb-5 border-b border-brand-border mb-6">
            <div>
              <h3 className="font-serif text-2xl text-brand-charcoal">Primary Delivery Address</h3>
              <p className="text-xs text-brand-muted mt-0.5">Used for 1-click accelerated checkout and courier coordination.</p>
            </div>
            <button
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold underline underline-offset-2 transition-colors"
            >
              {isEditingAddress ? 'Cancel' : 'Edit Address'}
            </button>
          </div>

          {isEditingAddress ? (
            <form onSubmit={handleSaveAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs max-w-xl">
              <div className="sm:col-span-2">
                <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Street Address</label>
                <input
                  type="text"
                  value={addrLine1}
                  onChange={(e) => setAddrLine1(e.target.value)}
                  className="w-full p-3 rounded-pill border border-brand-border focus:outline-none focus:border-brand-charcoal"
                />
              </div>
              <div>
                <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 rounded-pill border border-brand-border focus:outline-none focus:border-brand-charcoal"
                />
              </div>
              <div>
                <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">State / Province</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 rounded-pill border border-brand-border focus:outline-none focus:border-brand-charcoal"
                />
              </div>
              <div>
                <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Postal Code</label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full p-3 rounded-pill border border-brand-border focus:outline-none focus:border-brand-charcoal"
                />
              </div>
              <div>
                <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 rounded-pill border border-brand-border focus:outline-none focus:border-brand-charcoal"
                />
              </div>
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-pill bg-[#141514] text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          ) : (
            <div className="text-xs text-brand-charcoal space-y-1.5">
              <p className="font-semibold text-sm">{user?.defaultAddress?.firstName} {user?.defaultAddress?.lastName}</p>
              <p className="text-brand-muted">{user?.defaultAddress?.addressLine1} {user?.defaultAddress?.addressLine2}</p>
              <p className="text-brand-muted">{user?.defaultAddress?.city}, {user?.defaultAddress?.state} {user?.defaultAddress?.postalCode}</p>
              <p className="text-brand-muted">{user?.defaultAddress?.country}</p>
              <p className="text-brand-muted pt-1 font-mono">{user?.defaultAddress?.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
