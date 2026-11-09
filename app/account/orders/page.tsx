'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Truck, ArrowRight, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import { Order } from '@/types/cart';
import { formatPrice, formatDate } from '@/lib/utils';

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'VRD-94827104',
    createdAt: '2026-11-06T14:30:00Z',
    customer: {
      firstName: 'Camille',
      lastName: 'de Laurent',
      email: 'camille.laurent@verden-design.com',
      phone: '+1 (555) 234-8971',
      addressLine1: '482 Mercer Street',
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
      },
    ],
    subtotal: 245,
    discount: 36.75,
    couponCode: 'VERDEN15',
    shipping: { method: 'Priority Air Express', cost: 15 },
    tax: 16.66,
    total: 239.91,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    fulfillmentStatus: 'in_transit',
    trackingNumber: 'TRK-EXP-948201948',
    trackingCarrier: 'DHL Express Worldwide',
    dropshipLogistics: {
      supplierOrderDispatched: true,
      originWarehouse: 'Frankfurt Direct Center',
      destinationCountry: 'United States',
    },
    trackingEvents: [],
  },
  {
    id: 'VRD-81920412',
    createdAt: '2026-10-14T09:15:00Z',
    customer: {
      firstName: 'Camille',
      lastName: 'de Laurent',
      email: 'camille.laurent@verden-design.com',
      phone: '+1 (555) 234-8971',
      addressLine1: '482 Mercer Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10013',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-002',
        productTitle: 'Kyoto Handcrafted Stoneware Tea Set',
        productImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
        variantId: 'var-tea-charcoal',
        variantName: 'Kuro Charcoal Matte',
        price: 135,
        quantity: 1,
        supplierSku: 'DS-TEA-STN-CHR',
        fulfillmentStatus: 'delivered',
      },
    ],
    subtotal: 135,
    discount: 0,
    shipping: { method: 'Standard Courier', cost: 0 },
    tax: 10.80,
    total: 145.80,
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    fulfillmentStatus: 'delivered',
    trackingNumber: 'TRK-EMS-771928410',
    trackingCarrier: 'Japan Post EMS & USPS',
    dropshipLogistics: {
      supplierOrderDispatched: true,
      originWarehouse: 'Kansai Air Terminal',
      destinationCountry: 'United States',
    },
    trackingEvents: [],
  },
];

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('verden_orders_db_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          // Merge custom stored orders with default orders, de-duplicating by id
          const ids = new Set(parsed.map((o: Order) => o.id));
          const filteredDefaults = DEFAULT_ORDERS.filter((o) => !ids.has(o.id));
          setOrders([...parsed, ...filteredDefaults]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-5 border-b border-brand-border flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold">
              Account Archive
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
              Your Acquisitions ({orders.length})
            </h1>
          </div>
          <Link
            href="/account"
            className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold underline underline-offset-2 transition-colors"
          >
            &larr; Back to Account
          </Link>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-brand-border p-6 sm:p-7 shadow-subtle space-y-5"
            >
              {/* Order Meta Bar */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-brand-border gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-5 sm:gap-8">
                  <div>
                    <span className="text-brand-muted block text-[10px] uppercase font-medium tracking-wider">Order Reference:</span>
                    <strong className="font-mono text-brand-charcoal font-semibold text-sm">{order.id}</strong>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px] uppercase font-medium tracking-wider">Date Placed:</span>
                    <span className="text-brand-charcoal font-medium">{formatDate(order.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px] uppercase font-medium tracking-wider">Acquisition Total:</span>
                    <span className="font-mono font-semibold text-brand-charcoal text-sm">{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-pill text-[10px] font-bold uppercase tracking-wider font-mono ${
                      order.fulfillmentStatus === 'delivered'
                        ? 'bg-[#141514] text-white border border-white/10'
                        : 'bg-[#FAF9F5] text-brand-gold border border-brand-gold/40'
                    }`}
                  >
                    {order.fulfillmentStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Items in Order */}
              <div className="divide-y divide-brand-border/60">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3.5 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-15 rounded-lg overflow-hidden bg-background shrink-0 border border-brand-border/60">
                        <Image src={item.productImage} alt={item.productTitle} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-serif font-medium text-brand-charcoal">{item.productTitle}</h4>
                        <p className="text-[11px] text-brand-muted">
                          {item.variantName} &bull; Qty: {item.quantity} &bull; <span className="font-mono">SKU: {item.supplierSku}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-brand-charcoal">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-[11px] text-brand-muted">
                  Carrier: {order.trackingCarrier} &bull; Waybill: <strong className="font-mono text-brand-charcoal font-semibold">{order.trackingNumber}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/track-order?id=${order.id}`}
                    className="px-5 py-2.5 rounded-pill bg-[#141514] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Live Telemetry</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
