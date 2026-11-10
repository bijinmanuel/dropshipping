import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Building2, ShieldCheck, Truck, Zap } from 'lucide-react';

export function generateMetadata() {
  return {
    title: 'About Us | NovaTrend',
    description: 'The story behind NovaTrend direct-to-consumer curation and global logistics.',
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Hero Section */}
      <section className="border-b border-gray-100 py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
            Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-950 mt-3 font-heading tracking-tight">
            Curating Modern Products for Everyday Living.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Founded on the belief that premium quality shouldn&apos;t carry middleman markups. We connect everyday shoppers directly with verified manufacturers and logistics centers worldwide.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
              alt="NovaTrend modern lifestyle aesthetic"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm text-gray-600 leading-relaxed">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
              Direct Sourcing
            </span>
            <h2 className="text-3xl font-extrabold text-gray-950 font-heading tracking-tight">
              Why transparent, direct-to-consumer fulfillment matters.
            </h2>
            <p>
              Traditional retail adds 3x-5x markups through physical distributors, regional warehouses, and expensive marketing agencies. Products sit in storage for months before ever reaching customers.
            </p>
            <p>
              At NovaTrend, we built an agile, direct fulfillment pipeline. When you place an order, our automated system immediately syncs with our partner facilities in California, Tokyo, and Portugal to dispatch your items within 24 hours.
            </p>
            <p>
              Every single product is inspected for quality, securely packaged, and shipped with real-time tracking so you always know where your package is.
            </p>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs text-center">
                <span className="text-2xl font-black font-heading text-gray-950 block">50k+</span>
                <span className="text-[11px] text-gray-500 font-semibold">Happy Shoppers</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs text-center">
                <span className="text-2xl font-black font-heading text-[#FF4D00] block">24h</span>
                <span className="text-[11px] text-gray-500 font-semibold">Dispatch Target</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs text-center">
                <span className="text-2xl font-black font-heading text-emerald-600 block">4.9★</span>
                <span className="text-[11px] text-gray-500 font-semibold">Average Rating</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="px-8 py-3.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold tracking-wide transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Explore the Collection</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
