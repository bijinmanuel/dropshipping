'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  ExternalLink,
  Package,
  LogOut,
} from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { SearchModal } from './SearchModal';
import { MobileNav } from './MobileNav';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, demoLogin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
          isScrolled
            ? 'shadow-xs border-b border-gray-100 py-3'
            : 'border-b border-gray-100 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Brand Logo + Mobile Menu Trigger */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-1.5 text-gray-700 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Logo: NovaTrend */}
              <Link href="/" className="flex items-center gap-1 group">
                <span className="font-sans text-2xl sm:text-[26px] font-extrabold tracking-tight text-gray-950">
                  Nova<span className="text-[#FF5722]">Trend</span>
                </span>
              </Link>
            </div>

            {/* Center: Clean Modern Navigation Links */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-gray-700"
            >
              <Link
                href="/"
                className={`relative py-1 transition-colors hover:text-black ${
                  pathname === '/' ? 'text-black font-bold' : ''
                }`}
              >
                <span>Home</span>
                {pathname === '/' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF5722] rounded-full" />
                )}
              </Link>

              <Link
                href="/shop"
                className={`relative py-1 transition-colors hover:text-black ${
                  pathname === '/shop' ? 'text-black font-bold' : ''
                }`}
              >
                <span>Shop</span>
                {pathname === '/shop' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF5722] rounded-full" />
                )}
              </Link>

              <Link
                href="/shop?filter=new"
                className="py-1 transition-colors hover:text-black"
              >
                New Arrivals
              </Link>

              <Link
                href="/shop?filter=best-sellers"
                className="py-1 transition-colors hover:text-black"
              >
                Best Sellers
              </Link>

              {/* Categories Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className="flex items-center gap-1 py-1 transition-colors hover:text-black">
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                      isCategoriesOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="absolute top-full -left-4 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 animate-fadeIn z-50">
                    <div className="space-y-1">
                      {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/shop?category=${cat.slug}`}
                          onClick={() => setIsCategoriesOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 hover:text-[#FF5722] transition-colors"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {cat.itemCount} items
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`py-1 transition-colors hover:text-black ${
                  pathname === '/about' ? 'text-black font-bold' : ''
                }`}
              >
                About
              </Link>

              <Link
                href="/faq"
                className="py-1 transition-colors hover:text-black"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className={`py-1 transition-colors hover:text-black ${
                  pathname === '/contact' ? 'text-black font-bold' : ''
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: Search, Wishlist, Account, Cart Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Trigger */}
              <Link
                href="/wishlist"
                className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-full transition-colors"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#FF5722] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account Trigger */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                  className="p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-full transition-colors"
                  aria-label="User account"
                >
                  <User className="w-5 h-5" />
                </button>

                {isAccountMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-50 animate-fadeIn"
                    onMouseLeave={() => setIsAccountMenuOpen(false)}
                  >
                    {isAuthenticated && user ? (
                      <div>
                        <div className="px-3 py-2 border-b border-gray-100 mb-2">
                          <p className="text-xs font-bold text-gray-900">{user.name}</p>
                          <p className="text-[11px] text-gray-500">{user.email}</p>
                        </div>
                        <div className="space-y-1 text-xs font-semibold text-gray-700">
                          <Link
                            href="/account"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50"
                          >
                            <User className="w-3.5 h-3.5 text-gray-500" />
                            <span>My Account</span>
                          </Link>
                          <Link
                            href="/account/orders"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50"
                          >
                            <Package className="w-3.5 h-3.5 text-gray-500" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            href="/dropship-hub"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-orange-50 text-[#FF5722]"
                          >
                            <span className="font-bold">Dropship Hub (B2B)</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setIsAccountMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-red-50 text-red-600 text-left"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 space-y-2">
                        <Link
                          href="/auth/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block w-full py-2 text-center rounded-xl bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
                        >
                          Sign In / Register
                        </Link>
                        <button
                          onClick={() => {
                            demoLogin();
                            setIsAccountMenuOpen(false);
                          }}
                          className="block w-full py-1.5 text-center rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Quick Demo Login
                        </button>
                        <div className="pt-2 border-t border-gray-100">
                          <Link
                            href="/dropship-hub"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="block text-center text-[11px] font-bold text-[#FF5722] hover:underline"
                          >
                            Access Dropship Hub (B2B) &rarr;
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Shopping Bag Trigger with Orange Counter Badge */}
              <button
                onClick={openCart}
                className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-full transition-colors"
                aria-label={`Shopping Cart (${itemCount} items)`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-0.5 right-0.5 bg-[#FF5722] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}
    </>
  );
}
