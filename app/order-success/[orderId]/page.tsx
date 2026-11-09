'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  CheckCircle,
  Truck,
  Package,
  Calendar,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Download,
} from 'lucide-react';
import { Order } from '@/types/cart';
import { formatPrice, formatDate } from '@/lib/utils';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('verden_latest_order');
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load order:', e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="bg-white rounded-card border border-brand-border p-8 sm:p-10 shadow-subtle text-center">
          <div className="w-16 h-16 rounded-full bg-brand-forest-light text-brand-forest flex items-center justify-center mx-auto mb-4 animate-fadeIn">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-brand-forest">
            Order Confirmed &bull; Payment Verified
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
            Thank you for your curation.
          </h1>

          <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto mt-2 leading-relaxed">
            Your order reference is <strong className="font-mono text-brand-charcoal font-bold">{orderId}</strong>. We have dispatched our autonomous dropship EDI manifest to our partner artisan ateliers.
          </p>

          {/* Quick Tracking Button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/track-order?id=${orderId}`}
              className="px-6 py-3 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery Progress</span>
            </Link>

            <Link
              href="/shop"
              className="px-6 py-3 rounded-btn border border-brand-border text-brand-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-background transition-colors"
            >
              Continue Curating
            </Link>
          </div>
        </div>

        {/* Dropshipping Fulfillment Timeline */}
        <div className="mt-8 bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-subtle">
          <h2 className="font-serif text-xl text-brand-charcoal pb-4 border-b border-brand-border flex items-center justify-between">
            <span>Direct Dropship Dispatch Timeline</span>
            <span className="text-xs font-sans text-brand-forest font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Transit: 3 - 5 business days
            </span>
          </h2>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 text-xs font-bold">
                ✓
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-semibold text-brand-charcoal">
                    Autonomous Atelier Order Transmitted
                  </h4>
                  <span className="text-[10px] text-brand-muted">Just Now</span>
                </div>
                <p className="text-xs text-brand-muted mt-0.5">
                  Order purchase order routed to certified craftsman workshop without retail intermediary delay.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 text-xs font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-semibold text-brand-charcoal">
                    7-Point Quality Inspection &amp; Shockproof Crate
                  </h4>
                  <span className="text-[10px] text-brand-forest font-medium">In Progress (Next 24h)</span>
                </div>
                <p className="text-xs text-brand-muted mt-0.5">
                  Optical finish check, CE electrical testing, and reinforced unbleached packaging seal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-75">
              <div className="w-8 h-8 rounded-full bg-background-subtle border border-brand-border text-brand-muted flex items-center justify-center shrink-0 text-xs font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold text-brand-charcoal">
                  Carbon-Neutral Priority Air Cargo Dispatch
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  International air freight with pre-paid customs (DDP) and tracking code activation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-75">
              <div className="w-8 h-8 rounded-full bg-background-subtle border border-brand-border text-brand-muted flex items-center justify-center shrink-0 text-xs font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold text-brand-charcoal">
                  Local White-Glove Courier Door Delivery
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  Delivered safely to your specified room with 30-day trial guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details & Items Card */}
        {order && (
          <div className="mt-8 bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h3 className="font-serif text-lg text-brand-charcoal">Order Items</h3>
                <p className="text-xs text-brand-muted">
                  Recipient: {order.customer.firstName} {order.customer.lastName} &bull; {order.customer.addressLine1}, {order.customer.city}
                </p>
              </div>
              <span className="text-xs font-bold text-brand-forest">
                Total: {formatPrice(order.total)}
              </span>
            </div>

            <div className="divide-y divide-brand-border">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-btn overflow-hidden bg-background shrink-0 border border-brand-border/60">
                      <Image src={item.productImage} alt={item.productTitle} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-brand-charcoal">{item.productTitle}</h4>
                      <p className="text-[11px] text-brand-muted">
                        {item.variantName} &bull; Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-charcoal">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border flex justify-between items-center text-xs text-brand-muted">
              <span>Carrier: {order.shipping.method}</span>
              <span>Tracking: <strong className="font-mono text-brand-forest">{order.trackingNumber}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

