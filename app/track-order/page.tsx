'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialTracking = searchParams?.get('tracking') || 'TRK-NV-892147';
  const [trackingInput, setTrackingInput] = useState(initialTracking);
  const [isSearched, setIsSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setIsSearched(true);
  };

  const steps = [
    { title: 'Order Confirmed', date: 'Nov 08, 09:15 AM', location: 'NovaTrend Central Dispatch', done: true },
    { title: 'Fulfillment Hub Packaged', date: 'Nov 08, 02:40 PM', location: 'California Sourcing Facility', done: true },
    { title: 'In Transit & Scanned', date: 'Nov 09, 06:10 AM', location: 'JFK Air Logistics Terminal', done: true, current: true },
    { title: 'Out for Local Delivery', date: 'Estimated Tomorrow', location: 'Local Postal Courier', done: false },
    { title: 'Delivered', date: 'Estimated Nov 11', location: 'Your Front Door', done: false },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
            Fulfillment Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-heading tracking-tight">
            Track Your Package
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your tracking code or order reference number to see real-time carrier telemetry.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-xs mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter tracking code (e.g. TRK-NV-892147)"
                className="w-full text-xs font-mono font-bold pl-11 pr-4 py-3.5 rounded-full border border-gray-200 focus:outline-none focus:border-black uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Shipment</span>
            </button>
          </form>
        </div>

        {/* Results Card */}
        {isSearched && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-8">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-orange-50 text-[#FF4D00] border border-orange-200">
                  In Transit — On Schedule
                </span>
                <h3 className="text-xl font-bold text-gray-950 mt-2 font-heading">
                  Carrier: USPS Priority Express Air
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Tracking: {trackingInput}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-gray-400">Estimated Delivery Date</p>
                <p className="text-base font-extrabold text-gray-950 mt-0.5">Wednesday, Nov 11</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {steps.map((st, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-colors ${
                      st.current
                        ? 'bg-[#FF4D00] ring-4 ring-orange-100'
                        : st.done
                        ? 'bg-black'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${st.current ? 'text-[#FF4D00]' : 'text-gray-950'}`}>
                      {st.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{st.location}</p>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">{st.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Support footer */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-gray-500">Need to change your shipping address?</span>
              <Link href="/contact" className="text-[#FF4D00] font-bold hover:underline">
                Contact Customer Care &rarr;
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <TrackOrderContent />
    </Suspense>
  );
}
