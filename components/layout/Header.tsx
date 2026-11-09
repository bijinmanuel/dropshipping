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
  Package,
  LogOut,
  ExternalLink,
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
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

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
            ? 'bg-[#FAF9F5]/92 backdrop-blur-xl shadow-subtle border-b border-[#E8E4DA] py-3.5'
            : 'bg-[#FAF9F5] border-b border-[#EAE6DF] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* True 3-Zone Balanced Luxury Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Zone 1 (Left): Navigation Links */}
            <div className="flex items-center gap-5">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-[#21201D] hover:text-[#B88E4C] transition-colors rounded-full hover:bg-white"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Nav Items */}
              <nav
                aria-label="Primary desktop navigation"
                className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] uppercase font-medium tracking-[0.18em] text-[#4F4D47]"
              >
                <Link
                  href="/shop"
                  className={`transition-colors hover:text-[#21201D] hover:text-black pb-0.5 ${
                    pathname === '/shop' ? 'text-[#21201D] font-bold border-b border-[#21201D]' : ''
                  }`}
                >
                  Catalog
                </Link>

                {/* Departments Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsDepartmentsOpen(true)}
                  onMouseLeave={() => setIsDepartmentsOpen(false)}
                >
                  <button className="flex items-center gap-1 transition-colors hover:text-[#21201D] py-2">
                    <span>Departments</span>
                    <ChevronDown
                      className={`w-3 h-3 text-[#969186] transition-transform duration-200 ${
                        isDepartmentsOpen ? 'rotate-180 text-[#21201D]' : ''
                      }`}
                    />
                  </button>

                  {/* Departments Dropdown Popover */}
                  {isDepartmentsOpen && (
                    <div className="absolute top-full -left-4 w-[380px] bg-white border border-[#E8E4DA] rounded-2xl shadow-dropdown p-4 animate-fadeIn z-50">
                      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B88E4C] px-3 pb-2 border-b border-[#EAE6DF] mb-2 font-mono">
                        Artisan Departments
                      </div>
                      <div className="space-y-1">
                        {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.slug}`}
                            onClick={() => setIsDepartmentsOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9F5] group transition-colors"
                          >
                            <div>
                              <p className="text-xs font-serif font-medium text-[#21201D] group-hover:text-[#B88E4C] transition-colors">
                                {cat.name}
                              </p>
                              <p className="text-[11px] text-[#858177] line-clamp-1 font-normal">
                                {cat.description}
                              </p>
                            </div>
                            <span className="text-[10px] font-mono text-[#858177] px-2 py-0.5 bg-[#F5F2EB] rounded-pill">
                              {cat.itemCount}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-[#EAE6DF] text-center">
                        <Link
                          href="/shop"
                          onClick={() => setIsDepartmentsOpen(false)}
                          className="text-[11px] font-medium text-[#21201D] hover:text-[#B88E4C] transition-colors"
                        >
                          Explore Full Catalog Archive &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/shop?category=lighting"
                  className="transition-colors hover:text-[#21201D]"
                >
                  Lighting
                </Link>

                <Link
                  href="/shop?category=ceramics"
                  className="transition-colors hover:text-[#21201D]"
                >
                  Ceramics
                </Link>

                <Link
                  href="/about"
                  className={`transition-colors hover:text-[#21201D] ${
                    pathname === '/about' ? 'text-[#21201D] font-bold border-b border-[#21201D] pb-0.5' : ''
                  }`}
                >
                  Manifesto
                </Link>
              </nav>
            </div>

            {/* Zone 2 (Center): Perfectly Centered Luxury Brand Mark */}
            <div className="text-right lg:text-center order-last lg:order-none">
              <Link href="/" className="inline-flex flex-col items-center group">
                <span className="font-serif text-2xl sm:text-[30px] font-normal tracking-[0.32em] text-[#21201D] group-hover:text-[#B88E4C] transition-colors uppercase leading-none">
                  VÉRDEN
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-sans tracking-[0.36em] uppercase text-[#8F8A7F] mt-1 font-medium">
                  Studio &bull; Objects for Living
                </span>
              </Link>
            </div>

            {/* Zone 3 (Right): Clean Luxury Actions */}
            <div className="hidden lg:flex items-center justify-end gap-3 sm:gap-4">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-pill border border-[#E2DDD2] bg-white/70 hover:border-[#21201D] hover:bg-white text-[#21201D] transition-all text-xs shadow-2xs group"
                aria-label="Search catalog"
              >
                <Search className="w-3.5 h-3.5 text-[#B88E4C]" />
                <span className="text-[11px] text-[#7A756B] tracking-wider font-normal">Search</span>
                <kbd className="text-[9px] bg-[#FAF9F5] border border-[#E2DDD2] px-1.5 py-0.5 rounded font-mono text-[#7A756B]">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2.5 text-[#21201D] hover:text-[#B88E4C] transition-colors rounded-full hover:bg-white"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#21201D] text-[#FAF9F5] text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-[#21201D] hover:text-[#B88E4C] transition-colors rounded-full hover:bg-white"
                aria-label={`Bag (${itemCount})`}
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#21201D] text-[#FAF9F5] text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Account / Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-1.5 p-2 text-[#21201D] hover:text-[#B88E4C] transition-colors rounded-full hover:bg-white"
                  aria-label="User account"
                >
                  <User className="w-[18px] h-[18px]" />
                  <ChevronDown className="w-3 h-3 text-[#969186]" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E8E4DA] rounded-2xl shadow-dropdown p-2.5 animate-fadeIn z-50">
                    <div className="px-3 py-2.5 border-b border-[#EAE6DF]">
                      <p className="text-xs font-semibold text-[#21201D] truncate">
                        {isAuthenticated ? user?.name : 'Privé Guest'}
                      </p>
                      <p className="text-[10px] text-[#858177] truncate font-mono mt-0.5">
                        {isAuthenticated ? user?.email : 'Sign in to access orders'}
                      </p>
                    </div>

                    <div className="py-1 text-xs">
                      {isAuthenticated ? (
                        <>
                          <Link
                            href="/account"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-[#21201D] hover:bg-[#FAF9F5] transition-colors font-medium"
                          >
                            My Collector Dashboard
                          </Link>
                          <Link
                            href="/account/orders"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-[#21201D] hover:bg-[#FAF9F5] transition-colors font-medium"
                          >
                            Order History &amp; Receipts
                          </Link>
                          <Link
                            href="/track-order"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-[#21201D] hover:bg-[#FAF9F5] transition-colors font-medium"
                          >
                            Live Cargo Telemetry
                          </Link>
                        </>
                      ) : (
                        <Link
                          href="/auth/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-3 py-2 rounded-xl text-[#21201D] hover:bg-[#FAF9F5] transition-colors font-semibold"
                        >
                          Sign In / Register
                        </Link>
                      )}

                      {/* Internal Dropship Hub Link in Dropdown */}
                      <div className="pt-1.5 mt-1 border-t border-[#EAE6DF]">
                        <Link
                          href="/dropship-hub"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-semibold text-[#B88E4C] hover:bg-[#FAF9F5] transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5" />
                            <span>Supplier Hub (B2B)</span>
                          </span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E4DA] font-mono">
                            Admin
                          </span>
                        </Link>
                      </div>

                      {isAuthenticated && (
                        <div className="pt-1 mt-1 border-t border-[#EAE6DF]">
                          <button
                            onClick={() => {
                              logout();
                              setIsAccountMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#B54134] hover:bg-red-50/50 rounded-xl transition-colors font-medium flex items-center gap-1.5"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
