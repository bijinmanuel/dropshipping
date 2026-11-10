'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Headphones, Mail } from 'lucide-react';
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
      title: 'Welcome to NovaTrend',
      message: 'Your 15% discount code NOVA15 has been dispatched.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#0F1115] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-sans text-2xl font-extrabold tracking-tight text-white">
                Nova<span className="text-[#FF5722]">Trend</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Curating trending modern products for everyday lifestyle. Direct-to-consumer value with verified fast global logistics.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                Subscribe & Save 15%
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Get notified on exclusive seasonal drops and member flash sales.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Welcome! Use code NOVA15 at checkout for 15% off.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#FF5722]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold tracking-wide transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/shop?category=fashion" className="hover:text-white transition-colors">
                  Fashion & Streetwear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=electronics" className="hover:text-white transition-colors">
                  Audio & Wearables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=fitness" className="hover:text-white transition-colors">
                  Fitness & Performance
                </Link>
              </li>
              <li>
                <Link href="/shop?category=beauty" className="hover:text-white transition-colors">
                  Clean Beauty & Skincare
                </Link>
              </li>
              <li>
                <Link href="/shop?category=home-decor" className="hover:text-white transition-colors">
                  Modern Home Decor
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-white transition-colors">
                  Eyewear & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/dropship-hub" className="hover:text-[#FF5722] text-[#FF5722] font-semibold transition-colors">
                  B2B Dropship Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Brand
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} NovaTrend Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-gray-300">VISA</span>
            <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-gray-300">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-gray-300">AMEX</span>
            <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-gray-300">APPLE PAY</span>
            <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-gray-300">STRIPE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
