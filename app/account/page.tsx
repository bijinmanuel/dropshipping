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
  const [addrLine1, setAddrLine1] = useState(user?.defaultAddress?.addressLine1 || '482 Broadway St');
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
    showToast({
      type: 'success',
      title: 'Address Updated',
      message: 'Your shipping address has been saved.',
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Profile Bar */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-heading text-xl font-bold shrink-0">
              {user?.name.charAt(0) || 'A'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-heading">
                  {user?.name || 'Customer Account'}
                </h1>
                <span className="text-[10px] bg-orange-50 text-[#FF4D00] border border-orange-200 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{user?.email || 'alex@example.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account/orders"
              className="px-5 py-2.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Order History</span>
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-full border border-gray-200 hover:border-red-300 text-gray-600 hover:text-red-600 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Quick Links & Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-950 font-heading pb-3 border-b border-gray-100">
                Dashboard Overview
              </h3>

              <div className="space-y-2">
                <Link
                  href="/wishlist"
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-orange-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-[#FF4D00]" />
                    <span className="text-xs font-bold text-gray-800 group-hover:text-[#FF4D00]">Saved Wishlist</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-gray-400">{wishlistCount} items</span>
                </Link>

                <Link
                  href="/account/orders"
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-orange-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-[#FF4D00]" />
                    <span className="text-xs font-bold text-gray-800 group-hover:text-[#FF4D00]">My Orders</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF4D00]" />
                </Link>

                <Link
                  href="/track-order"
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-orange-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#FF4D00]" />
                    <span className="text-xs font-bold text-gray-800 group-hover:text-[#FF4D00]">Track Delivery</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF4D00]" />
                </Link>

                <Link
                  href="/dropship-hub"
                  className="flex items-center justify-between p-3 rounded-2xl bg-orange-50/50 hover:bg-orange-100/50 border border-orange-200 text-[#FF4D00] transition-colors mt-2"
                >
                  <span className="text-xs font-bold">Dropship Partner Hub (B2B)</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Address & Profile (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-950 font-heading">
                    Primary Shipping Address
                  </h3>
                  <p className="text-xs text-gray-500">Used for 1-click accelerated checkout</p>
                </div>
                {!isEditingAddress ? (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-xs font-bold text-[#FF4D00] hover:underline"
                  >
                    Edit Address
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingAddress(false)}
                    className="text-xs font-semibold text-gray-400 hover:text-black"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {!isEditingAddress ? (
                <div className="space-y-1.5 text-xs text-gray-700">
                  <p className="font-bold text-gray-950 text-sm">{user?.name}</p>
                  <p>{addrLine1}</p>
                  <p>{city}, {state} {zip}</p>
                  <p>{country}</p>
                  <p className="text-gray-400 pt-1 font-mono">{user?.phone}</p>
                </div>
              ) : (
                <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={addrLine1}
                      onChange={(e) => setAddrLine1(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-black hover:bg-[#FF4D00] text-white font-bold transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
