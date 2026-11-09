'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, HelpCircle, Mail, Globe } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please provide a valid email address.',
      });
      return;
    }

    setIsSubscribed(true);
    showToast({
      type: 'success',
      title: 'Welcome to the Privé Journal',
      message: 'Your 15% privilege code VERDEN15 has been dispatched.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#1E1D1A] text-[#FAF9F5] pt-20 pb-12 border-t border-[#2E2C28]">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 mb-14 border-b border-[#2E2C28]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                Inspected Direct Shipping
              </h4>
              <p className="text-[11px] text-white/50 mt-1.5 leading-relaxed font-normal">
                Dispatched straight from master ateliers in Kyoto, Verona, and Florence. 100% carbon neutral.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                30-Day Living Trial
              </h4>
              <p className="text-[11px] text-white/50 mt-1.5 leading-relaxed font-normal">
                Experience objects in your home&apos;s natural light. Complimentary return courier collection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                7-Point Inspection
              </h4>
              <p className="text-[11px] text-white/50 mt-1.5 leading-relaxed font-normal">
                Laser finish analysis, CE/UL electrical certification, and shockproof drop-tested packaging.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                Private Concierge
              </h4>
              <p className="text-[11px] text-white/50 mt-1.5 leading-relaxed font-normal">
                Personalized interior design consultation and real-time cargo telemetry available 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-normal tracking-[0.28em] text-white uppercase">
                VÉRDEN
              </span>
              <span className="block text-[8px] tracking-[0.35em] uppercase text-brand-gold mt-0.5 font-medium">
                Objects for Living
              </span>
            </Link>

            <p className="text-xs text-white/60 max-w-sm leading-relaxed">
              We curate enduring architectural objects designed to outlive ephemeral trends. By connecting collectors directly with multi-generational European and Asian workshops, we eliminate sitting wholesale inventory markups.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-1.5">
                The Privé Journal
              </p>
              <p className="text-[11px] text-white/50 mb-3">
                Receive private batch announcements and $20 towards your inaugural curation.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-brand-gold font-medium bg-white/5 p-3 rounded-btn border border-brand-gold/30">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Welcome. Privilege Code VERDEN15 is activated.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-btn bg-white/[0.05] border border-white/[0.12] text-white placeholder:text-white/35 focus:outline-none focus:border-brand-gold"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-pill bg-[#FAF9F5] hover:bg-white text-[#21201D] text-[11px] font-bold tracking-[0.14em] uppercase transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B88E4C]" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Departments */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold mb-4">
              Curations
            </h4>
            <ul className="space-y-3 text-xs text-white/65">
              <li>
                <Link href="/shop?category=lighting" className="hover:text-white transition-colors">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ceramics" className="hover:text-white transition-colors">
                  Kyoto Stoneware &amp; Tea
                </Link>
              </li>
              <li>
                <Link href="/shop?category=audio-tech" className="hover:text-white transition-colors">
                  Acoustic Audio Objects
                </Link>
              </li>
              <li>
                <Link href="/shop?category=leather-carry" className="hover:text-white transition-colors">
                  Tuscan Leather Carry
                </Link>
              </li>
              <li>
                <Link href="/shop?category=furniture" className="hover:text-white transition-colors">
                  Solid Timber Seating
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wellness" className="hover:text-white transition-colors">
                  Aromatic Stone Nebulizers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold mb-4">
              Client Care
            </h4>
            <ul className="space-y-3 text-xs text-white/65">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Live Delivery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  Worldwide Shipping Guide
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition-colors">
                  30-Day Living Trial Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Speak with Concierge
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Collector Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sourcing & Operations */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold mb-4">
              Operations
            </h4>
            <ul className="space-y-3 text-xs text-white/65">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Supply Manifesto
                </Link>
              </li>
              <li>
                <Link href="/dropship-hub" className="text-white font-semibold hover:text-brand-gold transition-colors flex items-center gap-1">
                  <span>Dropship Supplier Hub</span>
                  <span className="text-[9px] bg-brand-gold text-black px-1.5 py-0.2 rounded font-bold">EDI</span>
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  Terms of Agreement
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <div className="pt-2 text-[11px] text-white/40">
                  <span className="block text-white/80 font-medium">Concierge Desk:</span>
                  <span>concierge@verden-design.com</span>
                  <span className="block mt-0.5">+1 (800) 837-3367</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <p>&copy; {new Date().getFullYear()} VÉRDEN Studio Inc. All rights reserved. Direct Atelier Retailer.</p>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-white/60">
            <span className="px-2 py-1 rounded bg-white/[0.06] border border-white/[0.08]">VISA</span>
            <span className="px-2 py-1 rounded bg-white/[0.06] border border-white/[0.08]">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-white/[0.06] border border-white/[0.08]">AMEX</span>
            <span className="px-2 py-1 rounded bg-white/[0.06] border border-white/[0.08]">APPLE PAY</span>
            <span className="px-2 py-1 rounded bg-white/[0.06] border border-white/[0.08]">KLARNA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
