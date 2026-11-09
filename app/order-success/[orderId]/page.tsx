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
    <div className="min-h-screen bg-[#FAF9F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="bg-white rounded-2xl border border-brand-border p-8 sm:p-12 shadow-subtle text-center">
          <div className="w-16 h-16 rounded-full bg-[#141514] text-brand-gold border border-brand-gold/30 flex items-center justify-center mx-auto mb-5 shadow-sm animate-fadeIn">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold">
            Order Confirmed &bull; Payment Secured
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
            Thank you for your curation.
          </h1>

          <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto mt-3 leading-relaxed">
            Your acquisition reference is <strong className="font-mono text-brand-charcoal font-bold tracking-wider">{orderId}</strong>. We have dispatched autonomous EDI purchase orders to our master artisan partner ateliers.
          </p>

          {/* Quick Tracking Button */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/track-order?id=${orderId}`}
              className="px-7 py-3.5 rounded-pill bg-[#141514] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-subtle flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-brand-gold" />
              <span>Track Live Delivery Progress</span>
            </Link>

            <Link
              href="/shop"
              className="px-7 py-3.5 rounded-pill border border-brand-border text-brand-charcoal text-xs font-semibold uppercase tracking-wider hover:border-brand-charcoal hover:bg-white transition-all"
            >
              Continue Curating
            </Link>
          </div>
        </div>

        {/* Dropshipping Fulfillment Timeline */}
        <div className="mt-8 bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle">
          <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal pb-4 border-b border-brand-border flex items-center justify-between">
            <span>Direct Dropship Dispatch Timeline</span>
            <span className="text-xs font-mono text-brand-charcoal font-medium flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-gold" /> Air Transit: 3 - 5 business days
            </span>
          </h2>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#141514] text-brand-gold border border-brand-gold/40 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                ✓
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal font-mono">
                    Autonomous Atelier Order Transmitted
                  </h4>
                  <span className="text-[10px] font-mono text-brand-gold">Just Now</span>
                </div>
                <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                  Purchase order routed electronically to certified craftsman workshops in Verona and Kyoto without intermediary delays.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#141514] text-brand-gold border border-brand-gold/40 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                2
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal font-mono">
                    7-Point Quality Inspection &amp; Shockproof Crate
                  </h4>
                  <span className="text-[10px] text-brand-gold font-mono">In Progress (Next 24h)</span>
                </div>
                <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                  Optical stone check, CE electrical testing, and reinforced unbleached molded packaging seal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-70">
              <div className="w-8 h-8 rounded-full bg-[#FAF9F5] border border-brand-border text-brand-muted flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal font-mono">
                  Carbon-Neutral Priority Air Cargo Dispatch
                </h4>
                <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                  International priority freight with pre-paid customs (DDP) and tracking code activation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-70">
              <div className="w-8 h-8 rounded-full bg-[#FAF9F5] border border-brand-border text-brand-muted flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal font-mono">
                  White-Glove Courier Door Delivery
                </h4>
                <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                  Room-of-choice placement and commencement of your 30-day living trial guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details & Items Card */}
        {order && (
          <div className="mt-8 bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h3 className="font-serif text-xl text-brand-charcoal">Acquisition Summary</h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Recipient: {order.customer.firstName} {order.customer.lastName} &bull; {order.customer.addressLine1}, {order.customer.city}
                </p>
              </div>
              <span className="text-sm font-mono font-semibold text-brand-charcoal">
                Total: {formatPrice(order.total)}
              </span>
            </div>

            <div className="divide-y divide-brand-border/60">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-15 rounded-lg overflow-hidden bg-background shrink-0 border border-brand-border/60">
                      <Image src={item.productImage} alt={item.productTitle} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-medium text-brand-charcoal text-sm">{item.productTitle}</h4>
                      <p className="text-[11px] text-brand-muted">
                        {item.variantName} &bull; Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-brand-charcoal">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border flex justify-between items-center text-xs text-brand-muted">
              <span>Carrier: {order.shipping.method}</span>
              <span>Waybill: <strong className="font-mono text-brand-charcoal font-semibold">{order.trackingNumber}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
