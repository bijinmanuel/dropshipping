'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, HelpCircle, Mail, MapPin, Globe } from 'lucide-react';
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
      title: 'Welcome to VÉRDEN Privé',
      message: 'Your 15% discount code VERDEN15 has been sent.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-brand-charcoal text-[#FFFFFF] pt-16 pb-12 border-t border-brand-border/20">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-white/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Inspected Direct Shipping
              </h4>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                Direct from verified European and Asian artisan ateliers. Carbon-neutral priority transport.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                30-Day Home Trial
              </h4>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                Test each object in your natural home light. Complimentary pickup and full refunds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                7-Point Quality Guarantee
              </h4>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                Rigorous material tolerance checks, CE/UL safety certifications, and drop-tested packaging.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Dedicated Concierge
              </h4>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                Bespoke design advisory and real-time delivery concierge available 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold tracking-[0.25em] text-white">
                VÉRDEN
              </span>
              <span className="block text-[9px] tracking-[0.3em] uppercase text-brand-gold mt-0.5">
                Objects for Living
              </span>
            </Link>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              We curate enduring, minimal living objects engineered for architectural serenity. By partnering directly with master stonemasons, ceramic kilns, and precision hardware studios worldwide, we deliver uncompromised luxury directly to your door without retail intermediary markups.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Join the Privé Journal
              </p>
              <p className="text-[11px] text-white/60 mb-3">
                Receive private release previews and $20 towards your inaugural curation.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-brand-gold font-medium bg-white/5 p-3 rounded-btn border border-brand-gold/30">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Welcome to the journal. Code VERDEN15 is active.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-btn bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Departments */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Curations
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/shop?category=lighting" className="hover:text-white transition-colors">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ceramics" className="hover:text-white transition-colors">
                  Ceramics & Stoneware
                </Link>
              </li>
              <li>
                <Link href="/shop?category=audio-tech" className="hover:text-white transition-colors">
                  Audio & Precision Tech
                </Link>
              </li>
              <li>
                <Link href="/shop?category=leather-carry" className="hover:text-white transition-colors">
                  Tuscan Leather Carry
                </Link>
              </li>
              <li>
                <Link href="/shop?category=furniture" className="hover:text-white transition-colors">
                  Ergonomic Seating
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wellness" className="hover:text-white transition-colors">
                  Aromatics & Diffusers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Delivery
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
                  Returns & 30-Day Trial
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Client Concierge
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Customer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Dropship & Operations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Logistics & Store
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Direct Supply Philosophy
                </Link>
              </li>
              <li>
                <Link href="/dropship-hub" className="text-brand-gold hover:text-white transition-colors font-medium">
                  Dropship Supplier Hub ⚡
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <div className="pt-2 text-[11px] text-white/50">
                  <span className="block text-white/80 font-medium">Studio Concierge:</span>
                  <span>concierge@verden-design.com</span>
                  <span className="block mt-0.5">+1 (800) 837-3367</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} VÉRDEN Studio Inc. All rights reserved. Registered Direct Retailer.</p>

          {/* Payment Icons */}
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-white/70">
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10">VISA</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10">AMEX</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10">APPLE PAY</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10">PAYPAL</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10">KLARNA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
