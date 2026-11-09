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
  Layers,
  Sparkles,
  Flame,
  Package,
  LogOut,
  Settings,
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
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, demoLogin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K for search
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
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-subtle border-b border-brand-border py-3.5'
            : 'bg-background border-b border-brand-border/60 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu & Desktop Navigation */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-1.5 text-brand-charcoal hover:text-brand-forest transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <nav 
                aria-label="Primary desktop navigation"
                className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-brand-charcoal"
              >
                <Link
                  href="/"
                  className={`transition-colors hover:text-brand-forest ${
                    pathname === '/' ? 'text-brand-forest font-semibold border-b-2 border-brand-forest pb-0.5' : ''
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/shop"
                  className={`transition-colors hover:text-brand-forest ${
                    pathname === '/shop' ? 'text-brand-forest font-semibold border-b-2 border-brand-forest pb-0.5' : ''
                  }`}
                >
                  Shop
                </Link>

                {/* Categories Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCategoryHovered(true)}
                  onMouseLeave={() => setIsCategoryHovered(false)}
                >
                  <button className="flex items-center gap-1 transition-colors hover:text-brand-forest py-2">
                    <span>Categories</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-brand-muted transition-transform duration-200 ${
                        isCategoryHovered ? 'rotate-180 text-brand-forest' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isCategoryHovered && (
                    <div className="absolute top-full -left-10 w-[420px] bg-[#FFFFFF] border border-brand-border rounded-card shadow-dropdown p-4 animate-fadeIn">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-brand-muted px-3 pb-2 border-b border-brand-border/60 mb-2">
                        Curated Departments
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.slug}`}
                            onClick={() => setIsCategoryHovered(false)}
                            className="flex items-center justify-between p-2.5 rounded-btn hover:bg-background-subtle group transition-colors"
                          >
                            <div>
                              <p className="text-xs font-semibold text-brand-charcoal group-hover:text-brand-forest">
                                {cat.name}
                              </p>
                              <p className="text-[11px] text-brand-muted line-clamp-1">
                                {cat.description}
                              </p>
                            </div>
                            <span className="text-[10px] font-medium text-brand-muted px-2 py-0.5 bg-background rounded-pill">
                              {cat.itemCount} items
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-brand-border/60">
                        <Link
                          href="/shop"
                          onClick={() => setIsCategoryHovered(false)}
                          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-forest hover:underline py-1"
                        >
                          View Full Curated Catalog &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/shop?filter=new"
                  className="transition-colors hover:text-brand-forest flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>New Arrivals</span>
                </Link>

                <Link
                  href="/shop?filter=best-sellers"
                  className="transition-colors hover:text-brand-forest flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5 text-brand-sale" />
                  <span>Best Sellers</span>
                </Link>

                <Link
                  href="/dropship-hub"
                  className="text-xs font-semibold text-brand-forest bg-brand-forest-light px-2.5 py-1 rounded-pill hover:bg-brand-forest hover:text-white transition-all flex items-center gap-1.5"
                  title="Internal Dropship Operations, Margins & Supplier Tracking Hub"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Dropship Hub</span>
                </Link>
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-1 lg:flex-none text-center">
              <Link href="/" className="inline-flex flex-col items-center group">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.22em] text-brand-forest group-hover:text-brand-forest-hover transition-colors">
                  VÉRDEN
                </span>
                <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.3em] uppercase text-brand-muted -mt-0.5">
                  Studio &bull; Objects for Living
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Bag, Account) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Intelligent Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 p-2 text-brand-charcoal hover:text-brand-forest transition-colors rounded-full hover:bg-white"
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xl:inline-block text-xs text-brand-muted">
                  Search... <kbd className="text-[10px] bg-background-subtle border border-brand-border px-1.5 py-0.5 rounded">⌘K</kbd>
                </span>
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 text-brand-charcoal hover:text-brand-forest transition-colors rounded-full hover:bg-white"
                aria-label={`Wishlist with ${wishlistCount} saved objects`}
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-sale text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fadeIn">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag / Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 text-brand-charcoal hover:text-brand-forest transition-colors rounded-full hover:bg-white"
                aria-label={`Shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-forest text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fadeIn">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-1.5 p-1.5 text-brand-charcoal hover:text-brand-forest transition-colors rounded-full hover:bg-white"
                  aria-label="Account options"
                >
                  <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  <ChevronDown className="w-3 h-3 text-brand-muted hidden sm:block" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#FFFFFF] border border-brand-border rounded-card shadow-dropdown p-2 animate-fadeIn z-50">
                    <div className="px-3 py-2 border-b border-brand-border/60">
                      <p className="text-xs font-semibold text-brand-charcoal truncate">
                        {isAuthenticated ? user?.name : 'Guest Customer'}
                      </p>
                      <p className="text-[11px] text-brand-muted truncate">
                        {isAuthenticated ? user?.email : 'Sign in to access orders'}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background-subtle rounded-btn"
                      >
                        <User className="w-3.5 h-3.5 text-brand-forest" />
                        Account Dashboard
                      </Link>

                      <Link
                        href="/account/orders"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background-subtle rounded-btn"
                      >
                        <Package className="w-3.5 h-3.5 text-brand-forest" />
                        My Orders & Tracking
                      </Link>

                      <Link
                        href="/dropship-hub"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background-subtle rounded-btn"
                      >
                        <Settings className="w-3.5 h-3.5 text-brand-forest" />
                        Dropship Supplier Hub
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-brand-border/60">
                      <button
                        onClick={() => {
                          demoLogin(user?.role === 'admin' ? 'customer' : 'admin');
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-[11px] font-semibold text-brand-gold hover:bg-brand-gold-light rounded-btn"
                      >
                        ⚡ Switch to {user?.role === 'admin' ? 'Customer' : 'Store Admin'} Mode
                      </button>

                      {isAuthenticated ? (
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-error hover:bg-background-subtle rounded-btn"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      ) : (
                        <Link
                          href="/auth/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="w-full block px-3 py-2 text-xs font-semibold text-brand-forest hover:bg-background-subtle rounded-btn"
                        >
                          Sign In / Register
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
