'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  TrendingUp,
  Truck,
  RefreshCw,
  DollarSign,
  Building2,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { DROPSHIP_SUPPLIERS } from '@/data/suppliers';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

export default function DropshipHubPage() {
  const [activeTab, setActiveTab] = useState<'margins' | 'suppliers' | 'inventory' | 'returns'>('margins');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleSyncStock = (productId: string) => {
    setSyncingId(productId);
    setTimeout(() => {
      setSyncingId(null);
      showToast({
        type: 'success',
        title: 'Supplier Stock Synced',
        message: 'Inventory count validated across international EDI feed.',
      });
    }, 900);
  };

  const totalCatalogRetail = PRODUCTS.reduce((acc, p) => acc + p.price, 0);
  const totalCatalogCost = PRODUCTS.reduce((acc, p) => acc + p.dropship.supplierCost, 0);
  const totalGrossProfit = totalCatalogRetail - totalCatalogCost;
  const averageMargin = Math.round((totalGrossProfit / totalCatalogRetail) * 100);

  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-black/[0.06] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                Operations &bull; Internal Sourcing Engine
              </span>
              <span className="text-[9px] bg-black text-white px-2.5 py-0.5 rounded-pill font-bold uppercase tracking-wider">
                Store Operator
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal">
              Dropship Logistics &amp; Sourcing Hub
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-1.5 max-w-2xl font-normal leading-relaxed">
              Internal system controlling decentralized supplier SKUs, landed wholesale cost margins, real-time inventory synchronization, and direct atelier dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/track-order"
              className="px-4 py-2 rounded-btn border border-black/[0.1] bg-white text-xs font-semibold text-brand-charcoal hover:border-black shadow-xs"
            >
              Public Tracking Portal &rarr;
            </Link>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-card-lg p-6 border border-black/[0.07] shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">Average Markup</span>
              <TrendingUp className="w-4 h-4 text-brand-success" />
            </div>
            <p className="text-2xl font-bold text-black font-mono">3.24&times;</p>
            <p className="text-[11px] text-brand-success mt-1">Average retail-to-cost multiplier</p>
          </div>

          <div className="bg-white rounded-card-lg p-6 border border-black/[0.07] shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">Gross Margin</span>
              <DollarSign className="w-4 h-4 text-black" />
            </div>
            <p className="text-2xl font-bold text-black font-mono">{averageMargin}%</p>
            <p className="text-[11px] text-brand-muted mt-1">Direct-to-consumer margin retention</p>
          </div>

          <div className="bg-white rounded-card-lg p-6 border border-black/[0.07] shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">Partner Ateliers</span>
              <Building2 className="w-4 h-4 text-brand-gold" />
            </div>
            <p className="text-2xl font-bold text-black font-mono">{DROPSHIP_SUPPLIERS.length}</p>
            <p className="text-[11px] text-brand-muted mt-1">Italy, Japan, Denmark, Sweden, Taiwan</p>
          </div>

          <div className="bg-white rounded-card-lg p-6 border border-black/[0.07] shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">Avg Lead Dispatch</span>
              <Clock className="w-4 h-4 text-black" />
            </div>
            <p className="text-2xl font-bold text-black font-mono">16.4 hrs</p>
            <p className="text-[11px] text-brand-success mt-1">Inspection to courier handoff</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-black/[0.06] mb-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'margins', label: 'Product Margins & SKU Mapping' },
            { id: 'suppliers', label: 'Supplier EDI Partners' },
            { id: 'inventory', label: 'Live Stock Sync' },
            { id: 'returns', label: 'Returns & Reverse Logistics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-6 text-xs font-bold uppercase tracking-[0.14em] transition-all whitespace-nowrap border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-brand-muted hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Product Margins & Landed Cost Breakdown */}
        {activeTab === 'margins' && (
          <div className="bg-white rounded-card-lg border border-black/[0.08] shadow-subtle overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-black/[0.06] flex items-center justify-between bg-background">
              <div>
                <h3 className="font-serif text-lg text-brand-charcoal">
                  Supplier Cost vs Retail Markup Matrix
                </h3>
                <p className="text-[11px] text-brand-muted">
                  CONFIDENTIAL: Store operator margin view. Internal cost data is stripped from customer APIs.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-background text-brand-muted uppercase tracking-[0.12em] text-[10px] border-b border-black/[0.06]">
                  <tr>
                    <th className="py-3.5 px-5">Object</th>
                    <th className="py-3.5 px-5">Supplier SKU</th>
                    <th className="py-3.5 px-5">Fulfillment Hub</th>
                    <th className="py-3.5 px-5 text-right">Landed Cost</th>
                    <th className="py-3.5 px-5 text-right">Retail Price</th>
                    <th className="py-3.5 px-5 text-right">Gross Profit</th>
                    <th className="py-3.5 px-5 text-right">Margin %</th>
                    <th className="py-3.5 px-5 text-center">Sync Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {PRODUCTS.map((p) => {
                    const gross = p.price - p.dropship.supplierCost;
                    const isSyncing = syncingId === p.id;

                    return (
                      <tr key={p.id} className="hover:bg-background/60 transition-colors">
                        <td className="py-3.5 px-5 flex items-center gap-3">
                          <div className="relative aspect-product w-9 rounded overflow-hidden bg-background shrink-0 border border-black/[0.08]">
                            <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-serif font-medium text-brand-charcoal block line-clamp-1">{p.title}</span>
                            <span className="text-[10px] text-brand-muted">{p.dropship.supplierName}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 font-mono text-[11px] text-brand-charcoal">
                          {p.dropship.supplierSku}
                        </td>
                        <td className="py-3.5 px-5 text-brand-muted text-[11px]">
                          {p.dropship.fulfillmentCenter}
                        </td>
                        <td className="py-3.5 px-5 text-right font-mono text-brand-charcoal font-medium">
                          {formatPrice(p.dropship.supplierCost)}
                        </td>
                        <td className="py-3.5 px-5 text-right font-mono font-bold text-black">
                          {formatPrice(p.price)}
                        </td>
                        <td className="py-3.5 px-5 text-right font-mono font-bold text-brand-success">
                          +{formatPrice(gross)}
                        </td>
                        <td className="py-3.5 px-5 text-right font-mono font-bold text-brand-gold">
                          {p.dropship.marginPercentage}%
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <button
                            onClick={() => handleSyncStock(p.id)}
                            disabled={isSyncing}
                            className="p-1.5 rounded-btn bg-background hover:bg-white text-black text-[11px] font-medium transition-colors border border-black/[0.06]"
                            title="Force Sync Inventory"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Supplier EDI Partners */}
        {activeTab === 'suppliers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DROPSHIP_SUPPLIERS.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-card-lg p-6 sm:p-7 border border-black/[0.08] shadow-subtle space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-brand-gold tracking-[0.2em]">
                      {s.apiProtocol}
                    </span>
                    <h3 className="font-serif text-base text-brand-charcoal mt-0.5">{s.name}</h3>
                    <p className="text-[11px] text-brand-muted">{s.region}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-pill bg-black text-white text-[9px] font-bold font-mono">
                    {s.performanceRating}% SLA
                  </span>
                </div>

                <div className="divide-y divide-black/[0.06] text-xs text-brand-muted pt-2">
                  <div className="py-2.5 flex justify-between">
                    <span>Lead Fulfillment</span>
                    <span className="font-bold text-black font-mono">{s.averageFulfillmentHours} Hours</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span>On-Time Dispatch</span>
                    <span className="font-bold text-brand-success font-mono">{s.onTimeRate}%</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span>Defect Return Rate</span>
                    <span className="font-bold text-black font-mono">{s.defectRate}%</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span>Active SKUs</span>
                    <span className="font-bold text-black font-mono">{s.activeSkusCount} items</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span>Total Dispatched</span>
                    <span className="font-bold text-black font-mono">{s.totalOrdersFulfilled.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-brand-muted">Auto-Fulfill: {s.autoFulfillEnabled ? 'Active' : 'Manual'}</span>
                  <button
                    onClick={() => {
                      showToast({
                        type: 'info',
                        title: 'EDI Connection Active',
                        message: `Telemetry test to ${s.name} returned 200 OK (latency: 38ms).`,
                      });
                    }}
                    className="text-xs font-bold text-black hover:text-brand-gold transition-colors"
                  >
                    Test Telemetry &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Live Stock Sync */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-card-lg border border-black/[0.08] p-7 shadow-subtle space-y-4">
            <h3 className="font-serif text-xl text-brand-charcoal">
              Supplier Inventory Synchronizer
            </h3>
            <p className="text-xs text-brand-muted">
              Live automated inventory feeds prevent overselling by querying partner ERP feeds every 15 minutes.
            </p>

            <div className="divide-y divide-black/[0.06]">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-medium text-brand-charcoal">{p.title}</h4>
                    <p className="text-[11px] text-brand-muted">
                      SKU: {p.dropship.supplierSku} &bull; Synced {p.dropship.stockSyncedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-bold text-black font-mono">
                      {p.stockQuantity} Units In Stock
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-brand-success bg-brand-forest-light px-2.5 py-1 rounded-pill font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Live Feed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Returns & Reverse Logistics */}
        {activeTab === 'returns' && (
          <div className="bg-white rounded-card-lg border border-black/[0.08] p-7 shadow-subtle space-y-4">
            <h3 className="font-serif text-xl text-brand-charcoal">
              30-Day Reverse Logistics Protocol
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed font-normal">
              When a collector initiates a return under the 30-day home trial guarantee, our reverse logistics coordinator schedules courier collection directly back to our regional inspection facility (Frankfurt or Kansai), issues an instant automated refund, and updates inventory.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-card-lg bg-background border border-black/[0.06]">
                <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em]">Return Rate</span>
                <p className="text-2xl font-bold text-black font-mono mt-1">1.8%</p>
                <p className="text-[11px] text-brand-muted mt-0.5">Industry avg is 14%</p>
              </div>
              <div className="p-4 rounded-card-lg bg-background border border-black/[0.06]">
                <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em]">Refund Processing</span>
                <p className="text-2xl font-bold text-black font-mono mt-1">&lt; 4 Hours</p>
                <p className="text-[11px] text-brand-muted mt-0.5">Instant upon inspection sign-off</p>
              </div>
              <div className="p-4 rounded-card-lg bg-background border border-black/[0.06]">
                <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em]">Restock Success</span>
                <p className="text-2xl font-bold text-black font-mono mt-1">99.4%</p>
                <p className="text-[11px] text-brand-muted mt-0.5">Zero landfill waste policy</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
