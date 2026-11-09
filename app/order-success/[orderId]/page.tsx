'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  CheckCircle,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { Order } from '@/types/cart';
import { formatPrice } from '@/lib/utils';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('novatrend_orders') || '[]');
      const found = orders.find((o: Order) => o.id === orderId);
      if (found) {
        setOrder(found);
      } else {
        const stored = localStorage.getItem('verden_latest_order');
        if (stored) setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load order:', e);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Banner */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-xs text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
            Order Confirmed &bull; Payment Received
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-heading tracking-tight">
            Thank you for your order!
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2 leading-relaxed">
            Your order number is <strong className="font-mono text-gray-950 font-bold">{orderId}</strong>. We have dispatched fulfillment requests to our partner hubs and will email your tracking link shortly.
          </p>

          {/* Quick Tracking Button */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/track-order?tracking=${order?.trackingNumber || 'TRK-NV-892147'}`}
              className="px-7 py-3 rounded-full bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Real-Time Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/shop"
              className="px-7 py-3 rounded-full border border-gray-200 text-gray-800 text-xs font-bold hover:border-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Details Grid */}
        {order && (
          <div className="mt-8 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
              <div>
                <p className="text-xs text-gray-400 font-semibold">Delivery Timeline</p>
                <p className="text-sm font-bold text-gray-950 mt-0.5">
                  Estimated Arrival: 3 - 5 Business Days
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-gray-400 font-semibold">Tracking Number</p>
                <p className="font-mono font-bold text-sm text-[#FF4D00]">
                  {order.trackingNumber}
                </p>
              </div>
            </div>

            {/* Items list */}
            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center gap-4 first:pt-0 last:pb-0">
                  <div className="relative w-16 h-16 rounded-xl bg-[#F6F7F9] overflow-hidden shrink-0 flex items-center justify-center p-1 border border-gray-100">
                    <Image
                      src={item.productImage}
                      alt={item.productTitle}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-950 truncate">{item.productTitle}</h4>
                    <p className="text-xs text-gray-500">
                      {item.variantName} &bull; Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-mono font-bold text-gray-950">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="font-bold text-gray-700">Total Paid</span>
              <span className="font-mono font-extrabold text-lg text-gray-950">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
