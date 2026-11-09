'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, User, Heart, ShoppingBag, Search } from 'lucide-react';
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 border-r border-gray-100"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#FAFAFC]">
          <Link href="/" onClick={onClose} className="flex items-center gap-1">
            <span className="font-heading text-xl font-black tracking-tight text-gray-950">
              Nova<span className="text-[#FF4D00]">Trend</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Button */}
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500 hover:border-black transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span>Search products...</span>
            </div>
            <span className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded font-mono text-gray-700">
              ⌘K
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-orange-50 hover:text-[#FF4D00] rounded-xl transition-colors"
          >
            Home
          </Link>

          <Link
            href="/shop"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-orange-50 hover:text-[#FF4D00] rounded-xl transition-colors"
          >
            Shop All
          </Link>

          <Link
            href="/shop?filter=new"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-orange-50 hover:text-[#FF4D00] rounded-xl transition-colors"
          >
            New Arrivals
          </Link>

          <Link
            href="/shop?filter=best-sellers"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-orange-50 hover:text-[#FF4D00] rounded-xl transition-colors"
          >
            Best Sellers
          </Link>

          {/* Categories Accordion */}
          <div>
            <button
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                  categoriesExpanded ? 'rotate-180 text-black' : ''
                }`}
              />
            </button>

            {categoriesExpanded && (
              <div className="pl-3 py-1 space-y-1">
                {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-xs text-gray-600 hover:text-[#FF4D00] hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {cat.itemCount}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-orange-50 hover:text-[#FF4D00] rounded-xl transition-colors"
          >
            About Us
          </Link>

          <Link
            href="/faq"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-orange-50 hover:text-[#FF4D00] rounded-xl transition-colors"
          >
            FAQ & Blog
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className="block px-3 py-2.5 text-xs font-bold text-gray-800 hover:bg-orange-50 hover:text-[#FF4D00] rounded-xl transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-[#FAFAFC] space-y-2">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:text-black rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#FF4D00]" />
              <span>Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#FF4D00] text-white text-[10px] font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => {
              onClose();
              openCart();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:text-black rounded-lg"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#FF4D00]" />
              <span>Shopping Cart</span>
            </div>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold">
                {itemCount}
              </span>
            )}
          </button>

          <div className="pt-2 border-t border-gray-100">
            {isAuthenticated && user ? (
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-black"
              >
                <User className="w-4 h-4" />
                <span>My Account ({user.name})</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                onClick={onClose}
                className="block w-full py-2.5 text-center rounded-full bg-black text-white text-xs font-bold"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
