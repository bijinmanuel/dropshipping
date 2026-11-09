'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight, User, Heart, ShoppingBag, ShieldCheck, HelpCircle, PackageCheck } from 'lucide-react';
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
        className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <nav 
        aria-label="Mobile navigation"
        className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFFFFF] shadow-2xl flex flex-col z-50 border-r border-brand-border animate-fadeIn"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-border bg-background">
          <Link href="/" onClick={onClose} className="flex flex-col">
            <span className="font-serif text-xl tracking-[0.2em] font-semibold text-brand-forest">
              VÉRDEN
            </span>
            <span className="text-[9px] tracking-[0.25em] text-brand-muted uppercase">
              Objects for Living
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-brand-muted hover:text-brand-charcoal rounded-full"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Button */}
        <div className="p-4 border-b border-brand-border">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-btn bg-background-subtle border border-brand-border text-xs text-brand-muted"
          >
            <span>Search lamps, tea, leather...</span>
            <span className="text-[10px] bg-white border border-brand-border px-1.5 py-0.5 rounded text-brand-charcoal">
              ⌘K
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="block px-3 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-background rounded-btn"
          >
            Home
          </Link>

          <Link
            href="/shop"
            onClick={onClose}
            className="block px-3 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-background rounded-btn"
          >
            Shop All Catalog
          </Link>

          {/* Categories Accordion */}
          <div>
            <button
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-background rounded-btn"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${
                  categoriesExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            {categoriesExpanded && (
              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-brand-forest/20 ml-3 mt-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.slug === 'all' ? '/shop' : `/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-brand-muted hover:text-brand-forest hover:bg-background rounded-btn"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-brand-muted/70">{cat.itemCount}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/shop?filter=new"
            onClick={onClose}
            className="block px-3 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-background rounded-btn"
          >
            New Arrivals
          </Link>

          <Link
            href="/shop?filter=best-sellers"
            onClick={onClose}
            className="block px-3 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-background rounded-btn"
          >
            Best Sellers
          </Link>

          <div className="pt-2 pb-1 border-t border-brand-border/60 my-2">
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-brand-muted">
              Dropship Logistics & Store Operations
            </span>
          </div>

          <Link
            href="/dropship-hub"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-brand-forest bg-brand-forest-light rounded-btn"
          >
            <span className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-brand-forest" />
              Dropship Logistics Portal
            </span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-brand-forest text-white font-bold">
              B2B / Hub
            </span>
          </Link>

          <Link
            href="/track-order"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background rounded-btn"
          >
            Track My Order
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background rounded-btn"
          >
            About VÉRDEN Manifesto
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className="block px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background rounded-btn"
          >
            Client Concierge & Contact
          </Link>
        </div>

        {/* Drawer Footer Account & Wishlist */}
        <div className="p-4 border-t border-brand-border bg-background/50 space-y-2">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-brand-charcoal hover:bg-white rounded-btn transition-colors"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand-muted" />
              Saved Wishlist
            </span>
            <span className="text-xs bg-brand-forest text-white rounded-pill px-2 py-0.5">
              {wishlistCount}
            </span>
          </Link>

          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-brand-charcoal hover:bg-white rounded-btn transition-colors"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-muted" />
              {isAuthenticated ? user?.name : 'Sign In / Account'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-muted" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
