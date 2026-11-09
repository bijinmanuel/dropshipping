'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Order } from '@/types/cart';
import { formatPrice, formatDate } from '@/lib/utils';

const DEMO_ORDER: Order = {
  id: 'VRD-94827104',
  createdAt: '2026-11-06T14:30:00Z',
  customer: {
    firstName: 'Camille',
    lastName: 'de Laurent',
    email: 'camille.laurent@verden-design.com',
    phone: '+1 (555) 234-8971',
    addressLine1: '482 Mercer Street',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States',
  },
  items: [
    {
      productId: 'prod-001',
      productTitle: 'Arcos Travertine Table Lamp',
      productImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
      variantId: 'var-arcos-cream',
      variantName: 'Warm Travertine',
      price: 245,
      quantity: 1,
      supplierSku: 'DS-LMP-TRV-CRM',
      fulfillmentStatus: 'shipped',
      trackingNumber: 'TRK-EXP-948201948',
      trackingCarrier: 'DHL Express Priority Air',
    },
  ],
  subtotal: 245,
  discount: 36.75,
  couponCode: 'VERDEN15',
  shipping: {
    method: 'Priority Air Express',
    cost: 15,
  },
  tax: 16.66,
  total: 239.91,
  paymentMethod: 'card',
  paymentStatus: 'paid',
  fulfillmentStatus: 'in_transit',
  trackingNumber: 'TRK-EXP-948201948',
  trackingCarrier: 'DHL Express Worldwide',
  dropshipLogistics: {
    supplierOrderDispatched: true,
    dispatchTimestamp: '2026-11-07T08:00:00Z',
    originWarehouse: 'Frankfurt Direct Logistics Center (Verona Sourcing)',
    destinationCountry: 'United States',
  },
  trackingEvents: [
    {
      status: 'Order Verified & Paid',
      location: 'VÉRDEN Digital Concierge',
      timestamp: '2026-11-06 14:30 EST',
      description: 'Order confirmed and payment verified with 256-bit encryption.',
      completed: true,
    },
    {
      status: 'Supplier EDI PO Transmitted',
      location: 'Verona Atelier Partner Hub',
      timestamp: '2026-11-06 17:15 CET',
      description: 'Purchase manifest acknowledged by master stone workshop.',
      completed: true,
    },
    {
      status: '7-Point Quality Inspection Passed',
      location: 'Frankfurt Direct Logistics Center',
      timestamp: '2026-11-07 10:45 CET',
      description: 'Stone veining, CE electrical dimmer testing, and unbleached molded packaging approved.',
      completed: true,
    },
    {
      status: 'Transatlantic Priority Air Cargo In Transit',
      location: 'Frankfurt (FRA) → New York (JFK)',
      timestamp: '2026-11-08 04:20 CET',
      description: 'Customs cleared (DDP pre-paid). Flown via DHL Express Flight D0812.',
      completed: true,
    },
    {
      status: 'Out for Local Courier Delivery',
      location: 'New York City Sorting Facility',
      timestamp: 'Estimated Tomorrow, 10:00 AM - 2:00 PM',
      description: 'Handed over to local courier for signature room-of-choice delivery.',
      completed: false,
    },
    {
      status: 'Delivered & 30-Day Trial Activated',
      location: '482 Mercer Street, New York, NY',
      timestamp: 'Pending Delivery',
      description: 'Package delivered safely. 30-day home trial period commences.',
      completed: false,
    },
  ],
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [searchCode, setSearchCode] = useState(initialId);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (codeToSearch?: string) => {
    const query = (codeToSearch || searchCode).trim().toUpperCase();
    setHasSearched(true);

    if (!query) return;

    // Check localStorage orders
    try {
      const orders: Order[] = JSON.parse(localStorage.getItem('verden_orders_db_v1') || '[]');
      const match = orders.find(
        (o) => o.id.toUpperCase() === query || o.trackingNumber.toUpperCase() === query
      );

      if (match) {
        setCurrentOrder(match);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    // Default to demo order if matches VRD-94827104 or generic search
    if (query === 'VRD-94827104' || query.startsWith('VRD') || query.startsWith('TRK')) {
      setCurrentOrder(DEMO_ORDER);
    } else {
      setCurrentOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase font-medium tracking-[0.25em] text-brand-gold">
            Real-Time Logistics Telemetry
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
            Track Your Delivery
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-3 leading-relaxed">
            Monitor every milestone from artisan uncrating in Italy or Japan to your front room.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-brand-gold absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Order Code (e.g. VRD-94827104) or Waybill #"
                className="w-full text-xs pl-11 pr-4 py-3.5 rounded-pill border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-charcoal uppercase font-mono tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 rounded-pill bg-[#141514] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-brand-gold" />
              <span>Track Delivery</span>
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="mt-3.5 flex items-center gap-2 text-[11px] text-brand-muted pl-1">
            <span>Quick reference:</span>
            <button
              onClick={() => {
                setSearchCode('VRD-94827104');
                handleSearch('VRD-94827104');
              }}
              className="text-brand-charcoal font-mono font-semibold hover:text-brand-gold underline underline-offset-2 transition-colors"
            >
              VRD-94827104 (In Transit Air Cargo)
            </button>
          </div>
        </div>

        {/* Order Results */}
        {currentOrder ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Summary Header Card */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-brand-border gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.2em] font-mono">
                    Order Ref: {currentOrder.id}
                  </span>
                  <h3 className="font-serif text-2xl text-brand-charcoal mt-1">
                    Estimated Delivery: Tomorrow by 2:00 PM
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Carrier: {currentOrder.trackingCarrier} &bull; Waybill: <strong className="font-mono text-brand-charcoal font-semibold">{currentOrder.trackingNumber}</strong>
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-pill bg-[#141514] text-brand-gold border border-brand-gold/30 text-[10px] font-bold uppercase tracking-wider self-start sm:self-center">
                  In Transit
                </span>
              </div>

              {/* Origin to Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-brand-border/60">
                  <span className="text-brand-muted text-[11px] block font-medium uppercase tracking-wider">Origin Atelier Hub:</span>
                  <p className="text-brand-charcoal font-medium mt-1">
                    {currentOrder.dropshipLogistics.originWarehouse}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-brand-border/60">
                  <span className="text-brand-muted text-[11px] block font-medium uppercase tracking-wider">Destination Address:</span>
                  <p className="text-brand-charcoal font-medium mt-1">
                    {currentOrder.customer.addressLine1}, {currentOrder.customer.city}, {currentOrder.customer.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Logistics Timeline */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle">
              <h3 className="font-serif text-xl text-brand-charcoal pb-4 border-b border-brand-border">
                Live Shipment Telemetry
              </h3>

              <div className="mt-8 space-y-7 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-brand-border">
                {currentOrder.trackingEvents.map((event, idx) => (
                  <div key={idx} className="relative flex items-start gap-5 z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                        event.completed
                          ? 'bg-[#141514] text-brand-gold border border-brand-gold/40 shadow-sm'
                          : 'bg-white border-2 border-brand-border text-brand-muted'
                      }`}
                    >
                      {event.completed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal font-mono">
                          {event.status}
                        </h4>
                        <span className="text-[11px] font-mono text-brand-muted">{event.timestamp}</span>
                      </div>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">{event.description}</p>
                      <span className="text-[10px] text-brand-gold font-mono mt-1.5 block">
                        Coordinates: {event.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          hasSearched && (
            <div className="bg-white rounded-2xl border border-brand-border p-12 text-center max-w-md mx-auto shadow-subtle">
              <AlertCircle className="w-10 h-10 text-brand-sale mx-auto mb-3" />
              <h3 className="font-serif text-xl text-brand-charcoal">No shipment records found</h3>
              <p className="text-xs text-brand-muted mt-1.5 leading-relaxed">
                Please verify the order number in your confirmation email or try our sample reference VRD-94827104.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5] py-20 text-center text-xs text-brand-muted">Loading Tracking Telemetry...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
