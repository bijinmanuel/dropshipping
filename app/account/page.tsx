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
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile Bar */}
        <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-subtle mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-forest text-white flex items-center justify-center font-serif text-xl font-semibold shrink-0">
              {user?.name.charAt(0) || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl text-brand-charcoal">{user?.name}</h1>
                <span className="text-[10px] bg-brand-forest-light text-brand-forest font-bold px-2.5 py-0.5 rounded-pill uppercase tracking-wider">
                  Privé Collector
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => demoLogin(user?.role === 'admin' ? 'customer' : 'admin')}
              className="text-xs text-brand-forest bg-brand-forest-light px-3 py-1.5 rounded-btn font-semibold hover:bg-brand-forest hover:text-white transition-colors"
            >
              Role: {user?.role === 'admin' ? 'Store Admin ⚡' : 'Customer'}
            </button>
            <button
              onClick={logout}
              className="text-xs text-brand-error hover:underline flex items-center gap-1 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Orders & Tracking */}
          <div className="bg-white rounded-card border border-brand-border p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-btn bg-brand-forest-light text-brand-forest flex items-center justify-center mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-brand-charcoal mb-1">Orders &amp; Tracking</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Review past curations, track real-time air cargo waybills, and print receipts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex flex-col gap-2">
              <Link
                href="/account/orders"
                className="text-xs font-semibold text-brand-forest hover:underline flex items-center justify-between"
              >
                <span>View Order History</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/track-order"
                className="text-xs font-medium text-brand-muted hover:text-brand-charcoal flex items-center justify-between"
              >
                <span>Lookup Tracking Code</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Saved Wishlist */}
          <div className="bg-white rounded-card border border-brand-border p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-btn bg-brand-forest-light text-brand-forest flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-brand-charcoal mb-1">
                Saved Wishlist ({wishlistCount})
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Your private archive of architectural objects, travertine lamps, and furniture.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border">
              <Link
                href="/wishlist"
                className="text-xs font-semibold text-brand-forest hover:underline flex items-center justify-between"
              >
                <span>Manage Saved Archive</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Dropship Management */}
          <div className="bg-white rounded-card border border-brand-border p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-btn bg-brand-forest-light text-brand-forest flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-brand-charcoal mb-1">Dropship Supplier Hub</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Direct atelier inventory feeds, cost markups, landed margins, and fulfillment EDI.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border">
              <Link
                href="/dropship-hub"
                className="text-xs font-semibold text-brand-forest hover:underline flex items-center justify-between"
              >
                <span>Launch Supplier Hub &rarr;</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Default Shipping Address Section */}
        <div className="mt-8 bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
            <div>
              <h3 className="font-serif text-xl text-brand-charcoal">Default Delivery Address</h3>
              <p className="text-xs text-brand-muted">Used for 1-click accelerated checkout.</p>
            </div>
            <button
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-xs font-semibold text-brand-forest hover:underline"
            >
              {isEditingAddress ? 'Cancel' : 'Edit Address'}
            </button>
          </div>

          {isEditingAddress ? (
            <form onSubmit={handleSaveAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs max-w-xl">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-brand-charcoal mb-1">Street Address</label>
                <input
                  type="text"
                  value={addrLine1}
                  onChange={(e) => setAddrLine1(e.target.value)}
                  className="w-full p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <div>
                <label className="block font-semibold text-brand-charcoal mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <div>
                <label className="block font-semibold text-brand-charcoal mb-1">State / Province</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <div>
                <label className="block font-semibold text-brand-charcoal mb-1">Postal Code</label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <div>
                <label className="block font-semibold text-brand-charcoal mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-btn bg-brand-forest text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-forest-hover transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          ) : (
            <div className="text-xs text-brand-charcoal space-y-1">
              <p className="font-semibold">{user?.defaultAddress?.firstName} {user?.defaultAddress?.lastName}</p>
              <p className="text-brand-muted">{user?.defaultAddress?.addressLine1} {user?.defaultAddress?.addressLine2}</p>
              <p className="text-brand-muted">{user?.defaultAddress?.city}, {user?.defaultAddress?.state} {user?.defaultAddress?.postalCode}</p>
              <p className="text-brand-muted">{user?.defaultAddress?.country}</p>
              <p className="text-brand-muted pt-1">{user?.defaultAddress?.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
