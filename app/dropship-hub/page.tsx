'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  TrendingUp,
  Truck,
  RefreshCw,
  ShieldAlert,
  Sliders,
  DollarSign,
  ArrowUpRight,
  Layers,
  Database,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { DROPSHIP_SUPPLIERS, SupplierProfile } from '@/data/suppliers';
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

  // Compute portfolio financial metrics
  const totalCatalogRetail = PRODUCTS.reduce((acc, p) => acc + p.price, 0);
  const totalCatalogCost = PRODUCTS.reduce((acc, p) => acc + p.dropship.supplierCost, 0);
  const totalGrossProfit = totalCatalogRetail - totalCatalogCost;
  const averageMargin = Math.round((totalGrossProfit / totalCatalogRetail) * 100);

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="mb-8 pb-4 border-b border-brand-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-forest">
                Operations &bull; Internal Architecture
              </span>
              <span className="text-[10px] bg-brand-forest text-white px-2 py-0.5 rounded-pill font-bold uppercase tracking-wider">
                Store Operator Access
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal">
              Dropship Logistics &amp; Sourcing Hub
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-2xl">
              Internal system controlling decentralized supplier SKUs, landed wholesale cost margins, real-time inventory synchronization, and direct atelier dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/track-order"
              className="px-4 py-2 rounded-btn border border-brand-border bg-white text-xs font-semibold text-brand-charcoal hover:border-brand-forest"
            >
              Public Tracking Portal &rarr;
            </Link>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-card p-5 border border-brand-border shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Average Markup</span>
              <TrendingUp className="w-4 h-4 text-brand-success" />
            </div>
            <p className="text-2xl font-bold text-brand-charcoal">3.24&times;</p>
            <p className="text-[11px] text-brand-success mt-1">Average retail-to-cost multiplier</p>
          </div>

          <div className="bg-white rounded-card p-5 border border-brand-border shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Gross Profit Margin</span>
              <DollarSign className="w-4 h-4 text-brand-forest" />
            </div>
            <p className="text-2xl font-bold text-brand-forest">{averageMargin}%</p>
            <p className="text-[11px] text-brand-muted mt-1">Direct-to-consumer margin retention</p>
          </div>

          <div className="bg-white rounded-card p-5 border border-brand-border shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Partner Ateliers</span>
              <Building2 className="w-4 h-4 text-brand-gold" />
            </div>
            <p className="text-2xl font-bold text-brand-charcoal">{DROPSHIP_SUPPLIERS.length}</p>
            <p className="text-[11px] text-brand-muted mt-1">Italy, Japan, Denmark, Sweden, Taiwan</p>
          </div>

          <div className="bg-white rounded-card p-5 border border-brand-border shadow-subtle">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Avg Lead Dispatch</span>
              <Clock className="w-4 h-4 text-brand-forest" />
            </div>
            <p className="text-2xl font-bold text-brand-charcoal">16.4 hrs</p>
            <p className="text-[11px] text-brand-success mt-1">Inspection to courier handoff</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-brand-border mb-6">
          {[
            { id: 'margins', label: 'Product Margins & SKU Mapping' },
            { id: 'suppliers', label: 'Supplier EDI Partners' },
            { id: 'inventory', label: 'Live Stock Sync' },
            { id: 'returns', label: 'Returns & Reverse Logistics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-5 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-brand-forest text-brand-forest'
                  : 'border-transparent text-brand-muted hover:text-brand-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Product Margins & Landed Cost Breakdown */}
        {activeTab === 'margins' && (
          <div className="bg-white rounded-card border border-brand-border shadow-subtle overflow-hidden">
            <div className="p-5 border-b border-brand-border flex items-center justify-between bg-background-subtle">
              <div>
                <h3 className="font-serif text-base text-brand-charcoal">
                  Supplier Cost vs Retail Markup Matrix
                </h3>
                <p className="text-[11px] text-brand-muted">
                  CONFIDENTIAL: Store operator margin view. Internal cost data is stripped from customer APIs.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-background text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border">
                  <tr>
                    <th className="py-3 px-4">Product Object</th>
                    <th className="py-3 px-4">Supplier SKU</th>
                    <th className="py-3 px-4">Fulfillment Hub</th>
                    <th className="py-3 px-4 text-right">Supplier Cost</th>
                    <th className="py-3 px-4 text-right">Retail Price</th>
                    <th className="py-3 px-4 text-right">Gross Profit</th>
                    <th className="py-3 px-4 text-right">Margin %</th>
                    <th className="py-3 px-4 text-center">Sync Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {PRODUCTS.map((p) => {
                    const gross = p.price - p.dropship.supplierCost;
                    const isSyncing = syncingId === p.id;

                    return (
                      <tr key={p.id} className="hover:bg-background-subtle transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="relative w-9 h-11 rounded overflow-hidden bg-background shrink-0 border border-brand-border">
                            <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-semibold text-brand-charcoal block line-clamp-1">{p.title}</span>
                            <span className="text-[10px] text-brand-muted">{p.dropship.supplierName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-brand-charcoal">
                          {p.dropship.supplierSku}
                        </td>
                        <td className="py-3 px-4 text-brand-muted text-[11px]">
                          {p.dropship.fulfillmentCenter}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-brand-charcoal font-medium">
                          {formatPrice(p.dropship.supplierCost)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-brand-forest">
                          {formatPrice(p.price)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-brand-success">
                          +{formatPrice(gross)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-brand-forest">
                          {p.dropship.marginPercentage}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleSyncStock(p.id)}
                            disabled={isSyncing}
                            className="p-1.5 rounded-btn bg-background hover:bg-brand-forest-light text-brand-forest text-[11px] font-medium transition-colors"
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
                className="bg-white rounded-card p-6 border border-brand-border shadow-subtle space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-forest tracking-wider">
                      {s.apiProtocol}
                    </span>
                    <h3 className="font-serif text-base text-brand-charcoal mt-0.5">{s.name}</h3>
                    <p className="text-[11px] text-brand-muted">{s.region}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-pill bg-brand-forest-light text-brand-forest text-[10px] font-bold">
                    {s.performanceRating}% SLA
                  </span>
                </div>

                <div className="divide-y divide-brand-border text-xs text-brand-muted pt-2">
                  <div className="py-2 flex justify-between">
                    <span>Lead Fulfillment</span>
                    <span className="font-semibold text-brand-charcoal">{s.averageFulfillmentHours} Hours</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>On-Time Dispatch</span>
                    <span className="font-semibold text-brand-success">{s.onTimeRate}%</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Defect Return Rate</span>
                    <span className="font-semibold text-brand-charcoal">{s.defectRate}%</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Active SKUs</span>
                    <span className="font-semibold text-brand-charcoal">{s.activeSkusCount} items</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Total Orders Dispatched</span>
                    <span className="font-semibold text-brand-forest">{s.totalOrdersFulfilled.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-brand-muted">Auto-Fulfill: {s.autoFulfillEnabled ? 'Active' : 'Manual'}</span>
                  <button
                    onClick={() => {
                      showToast({
                        type: 'info',
                        title: 'EDI Connection Active',
                        message: `Telemetry test to ${s.name} returned 200 OK (latency: 42ms).`,
                      });
                    }}
                    className="text-xs font-semibold text-brand-forest hover:underline"
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
          <div className="bg-white rounded-card border border-brand-border p-6 shadow-subtle space-y-4">
            <h3 className="font-serif text-lg text-brand-charcoal">
              Supplier Inventory Synchronizer
            </h3>
            <p className="text-xs text-brand-muted">
              Live automated inventory feeds prevent overselling by querying partner ERP feeds every 15 minutes.
            </p>

            <div className="divide-y divide-brand-border">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-brand-charcoal">{p.title}</h4>
                    <p className="text-[11px] text-brand-muted">
                      SKU: {p.dropship.supplierSku} &bull; Synced {p.dropship.stockSyncedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-semibold text-brand-forest">
                      {p.stockQuantity} Units In Stock
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-brand-success bg-brand-forest-light px-2 py-0.5 rounded font-medium">
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
          <div className="bg-white rounded-card border border-brand-border p-6 shadow-subtle space-y-4">
            <h3 className="font-serif text-lg text-brand-charcoal">
              30-Day Reverse Logistics &amp; Return Protocol
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              When a collector initiates a return under the 30-day home trial guarantee, our reverse logistics coordinator schedules courier collection directly back to our regional inspection facility (Frankfurt or Kansai), issues an instant automated refund, and updates inventory.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-btn bg-background border border-brand-border">
                <span className="text-[10px] font-bold text-brand-muted uppercase">Avg Return Rate</span>
                <p className="text-xl font-bold text-brand-forest mt-1">1.8%</p>
                <p className="text-[11px] text-brand-muted mt-0.5">Industry avg is 14%</p>
              </div>
              <div className="p-4 rounded-btn bg-background border border-brand-border">
                <span className="text-[10px] font-bold text-brand-muted uppercase">Refund Processing</span>
                <p className="text-xl font-bold text-brand-charcoal mt-1">&lt; 4 Hours</p>
                <p className="text-[11px] text-brand-muted mt-0.5">Instant upon inspection sign-off</p>
              </div>
              <div className="p-4 rounded-btn bg-background border border-brand-border">
                <span className="text-[10px] font-bold text-brand-muted uppercase">Restock Success</span>
                <p className="text-xl font-bold text-brand-charcoal mt-1">99.4%</p>
                <p className="text-[11px] text-brand-muted mt-0.5">Zero landfill waste policy</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

