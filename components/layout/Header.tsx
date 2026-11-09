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
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F5]/90 backdrop-blur-xl shadow-subtle border-b border-black/[0.06] py-3.5'
            : 'bg-background border-b border-brand-border/60 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Trigger & Desktop Navigation */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-1.5 text-brand-charcoal hover:text-black transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <nav 
                aria-label="Primary desktop navigation"
                className="hidden lg:flex items-center gap-7 text-[12px] uppercase font-semibold tracking-[0.1em] text-brand-charcoal/80"
              >
                <Link
                  href="/"
                  className={`transition-colors hover:text-black hover:tracking-[0.12em] ${
                    pathname === '/' ? 'text-black font-bold border-b border-black pb-0.5' : ''
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/shop"
                  className={`transition-colors hover:text-black hover:tracking-[0.12em] ${
                    pathname === '/shop' ? 'text-black font-bold border-b border-black pb-0.5' : ''
                  }`}
                >
                  Collection
                </Link>

                {/* Categories Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCategoryHovered(true)}
                  onMouseLeave={() => setIsCategoryHovered(false)}
                >
                  <button className="flex items-center gap-1 transition-colors hover:text-black py-2">
                    <span>Departments</span>
                    <ChevronDown
                      className={`w-3 h-3 text-brand-muted transition-transform duration-200 ${
                        isCategoryHovered ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isCategoryHovered && (
                    <div className="absolute top-full -left-6 w-[420px] bg-white border border-black/[0.08] rounded-card-lg shadow-dropdown p-4 animate-fadeIn">
                      <div className="text-[10px] uppercase font-bold tracking-[0.15em] text-brand-gold px-3 pb-2 border-b border-black/[0.06] mb-2">
                        Atelier Departments
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
                              <p className="text-xs font-semibold text-brand-charcoal group-hover:text-black">
                                {cat.name}
                              </p>
                              <p className="text-[11px] text-brand-muted line-clamp-1">
                                {cat.description}
                              </p>
                            </div>
                            <span className="text-[10px] font-semibold text-brand-muted px-2 py-0.5 bg-background rounded-pill">
                              {cat.itemCount}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-black/[0.06]">
                        <Link
                          href="/shop"
                          onClick={() => setIsCategoryHovered(false)}
                          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-charcoal hover:text-brand-gold transition-colors py-1"
                        >
                          Explore Full Catalog Archive &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/shop?filter=new"
                  className="transition-colors hover:text-black flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  <span>New Arrivals</span>
                </Link>

                <Link
                  href="/shop?filter=best-sellers"
                  className="transition-colors hover:text-black flex items-center gap-1"
                >
                  <Flame className="w-3 h-3 text-brand-sale" />
                  <span>Signatures</span>
                </Link>

                <Link
                  href="/dropship-hub"
                  className="text-[11px] font-semibold text-brand-charcoal bg-white border border-black/[0.1] px-3 py-1 rounded-pill hover:bg-black hover:text-white transition-all flex items-center gap-1.5 shadow-xs"
                  title="Internal Dropship Sourcing & Margins Hub"
                >
                  <Package className="w-3 h-3 text-brand-gold" />
                  <span>Dropship Hub</span>
                </Link>
              </nav>
            </div>

            {/* Center: Brand Identity Logo */}
            <div className="flex-1 lg:flex-none text-center">
              <Link href="/" className="inline-flex flex-col items-center group">
                <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.28em] text-brand-charcoal group-hover:text-black transition-colors uppercase">
                  VÉRDEN
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-sans tracking-[0.35em] uppercase text-brand-muted -mt-0.5 font-medium">
                  Atelier &bull; Objects for Living
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Bag, Account) */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Intelligent Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 p-2 text-brand-charcoal hover:text-black transition-colors rounded-full hover:bg-white"
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
                <span className="hidden xl:inline-block text-[11px] text-brand-muted tracking-wider">
                  Search <kbd className="text-[9px] bg-white border border-black/[0.08] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
                </span>
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 text-brand-charcoal hover:text-black transition-colors rounded-full hover:bg-white"
                aria-label={`Wishlist with ${wishlistCount} saved objects`}
              >
                <Heart className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-charcoal text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fadeIn border border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 text-brand-charcoal hover:text-black transition-colors rounded-full hover:bg-white"
                aria-label={`Shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-charcoal text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fadeIn border border-white">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-1.5 p-1.5 text-brand-charcoal hover:text-black transition-colors rounded-full hover:bg-white"
                  aria-label="Account options"
                >
                  <User className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
                  <ChevronDown className="w-3 h-3 text-brand-muted hidden sm:block" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-black/[0.08] rounded-card-lg shadow-dropdown p-2 animate-fadeIn z-50">
                    <div className="px-3 py-2 border-b border-black/[0.06]">
                      <p className="text-xs font-semibold text-brand-charcoal truncate">
                        {isAuthenticated ? user?.name : 'Guest Customer'}
                      </p>
                      <p className="text-[10px] text-brand-muted truncate">
                        {isAuthenticated ? user?.email : 'Sign in to access orders'}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background rounded-btn"
                      >
                        <User className="w-3.5 h-3.5 text-brand-gold" />
                        Account Dashboard
                      </Link>

                      <Link
                        href="/account/orders"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background rounded-btn"
                      >
                        <Package className="w-3.5 h-3.5 text-brand-gold" />
                        My Orders &amp; Tracking
                      </Link>

                      <Link
                        href="/dropship-hub"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-background rounded-btn"
                      >
                        <Settings className="w-3.5 h-3.5 text-brand-gold" />
                        Dropship Sourcing Hub
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-black/[0.06]">
                      <button
                        onClick={() => {
                          demoLogin(user?.role === 'admin' ? 'customer' : 'admin');
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-[11px] font-semibold text-brand-gold hover:bg-brand-gold-light rounded-btn"
                      >
                        ⚡ Switch Mode ({user?.role === 'admin' ? 'Customer' : 'Store Admin'})
                      </button>

                      {isAuthenticated ? (
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-error hover:bg-background rounded-btn"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      ) : (
                        <Link
                          href="/auth/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="w-full block px-3 py-2 text-xs font-semibold text-black hover:bg-background rounded-btn"
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
