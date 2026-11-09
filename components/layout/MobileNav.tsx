'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight, User, Heart, ShoppingBag, ShieldCheck, HelpCircle, PackageCheck, Search } from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const { wishlistCount } = useWishlist();
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141514]/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 border-r border-gray-100 animate-fadeIn"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-1">
            <span className="font-sans text-xl font-extrabold tracking-tight text-gray-950">
              Nova<span className="text-[#FF5722]">Trend</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-brand-muted hover:text-brand-charcoal rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Button */}
        <div className="p-4 border-b border-brand-border bg-white/40">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-pill bg-white border border-brand-border text-xs text-brand-muted hover:border-brand-charcoal transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-brand-gold" />
              <span>Search catalog objects...</span>
            </div>
            <span className="text-[10px] bg-background-subtle border border-brand-border px-1.5 py-0.5 rounded font-mono text-brand-charcoal">
              ⌘K
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:bg-white rounded-pill transition-colors"
          >
            Home Sanctuary
          </Link>

          <Link
            href="/shop"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:bg-white rounded-pill transition-colors"
          >
            Curated Catalog
          </Link>

          {/* Categories Accordion */}
          <div>
            <button
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:bg-white rounded-pill transition-colors"
            >
              <span>Departments</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-brand-muted transition-transform duration-200 ${
                  categoriesExpanded ? 'rotate-180 text-brand-gold' : ''
                }`}
              />
            </button>
            {categoriesExpanded && (
              <div className="pl-4 pr-1 py-1 space-y-1 border-l border-brand-gold/40 ml-3 mt-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.slug === 'all' ? '/shop' : `/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-brand-muted hover:text-brand-charcoal hover:bg-white rounded-pill transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono text-brand-gold">{cat.itemCount}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/shop?filter=new"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:bg-white rounded-pill transition-colors"
          >
            New Arrivals
          </Link>

          <Link
            href="/shop?filter=best-sellers"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:bg-white rounded-pill transition-colors"
          >
            Best Sellers
          </Link>

          <div className="pt-3 pb-1 border-t border-brand-border/60 my-2">
            <span className="px-3 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
              Direct Sourcing &amp; Operations
            </span>
          </div>

          <Link
            href="/dropship-hub"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-white bg-[#141514] hover:bg-black rounded-pill shadow-subtle transition-all"
          >
            <span className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-brand-gold" />
              <span>Supplier Hub</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-pill bg-brand-gold/20 text-brand-gold font-bold">
              B2B / SLA
            </span>
          </Link>

          <Link
            href="/track-order"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-medium text-brand-charcoal hover:text-brand-gold transition-colors"
          >
            Track Order Telemetry
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-medium text-brand-charcoal hover:text-brand-gold transition-colors"
          >
            The VÉRDEN Manifesto
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-medium text-brand-charcoal hover:text-brand-gold transition-colors"
          >
            Client Concierge Advisory
          </Link>
        </div>

        {/* Drawer Footer Account & Wishlist */}
        <div className="p-4 border-t border-brand-border bg-white/70 backdrop-blur-sm space-y-2">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-brand-charcoal hover:bg-white rounded-pill border border-brand-border/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand-gold" />
              <span>Saved Archive</span>
            </span>
            <span className="text-xs bg-[#141514] text-white rounded-pill px-2 py-0.5 font-mono">
              {wishlistCount}
            </span>
          </Link>

          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-brand-charcoal hover:bg-white rounded-pill border border-brand-border/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-gold" />
              <span>{isAuthenticated ? user?.name : 'Privé Sign In'}</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-muted" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
