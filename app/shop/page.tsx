'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  RotateCcw,
  Star,
  Check,
  Grid3X3,
  LayoutGrid,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils';

function ShopContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || '';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(
    initialFilter === 'new'
      ? 'newest'
      : initialFilter === 'best-sellers'
      ? 'best-selling'
      : 'featured'
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [columnCount, setColumnCount] = useState<3 | 4>(4);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get('search');
    if (search) setSearchQuery(search);
    const filter = searchParams.get('filter');
    if (filter === 'new') setSortBy('newest');
    if (filter === 'best-sellers') setSortBy('best-selling');
  }, [searchParams]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(1000);
    setRatingFilter(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery !== '' ||
    minPrice > 0 ||
    maxPrice < 1000 ||
    ratingFilter > 0 ||
    inStockOnly;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      if (ratingFilter > 0 && product.rating < ratingFilter) {
        return false;
      }

      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'best-selling':
          return (b.badge === 'BESTSELLER' ? 1 : 0) - (a.badge === 'BESTSELLER' ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, minPrice, maxPrice, ratingFilter, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Shop Hero */}
      <section className="bg-white border-b border-black/[0.06] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
              Direct Sourcing Collection
            </span>
            <h1 className="font-serif text-page-title text-brand-charcoal mt-1">
              Curated Architectural Living
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed font-normal">
              Explore our full permanent archive of handcrafted travertine lamps, wood-fired stoneware, Tuscan leather carry, and precision acoustic objects.
            </p>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-pill text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-background border border-black/[0.08] text-brand-charcoal hover:border-black'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Shop Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/[0.06] gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-btn bg-white border border-black/[0.1] text-xs font-semibold text-brand-charcoal shadow-sm hover:border-black"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-black" />
              )}
            </button>

            {/* Results Count */}
            <p className="text-xs text-brand-muted">
              Showing <strong className="text-black font-mono font-bold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'object' : 'objects'}
            </p>

            {/* Clear All */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-sale hover:underline flex items-center gap-1 font-medium ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Right Toolbar */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-44 sm:w-60">
              <Search className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive..."
                className="w-full text-xs pl-8 pr-7 py-2.5 rounded-btn bg-white border border-black/[0.08] text-brand-charcoal placeholder:text-brand-muted/60 focus:outline-none focus:border-black shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-charcoal p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none text-xs font-semibold bg-white border border-black/[0.08] rounded-btn pl-3.5 pr-8 py-2.5 text-brand-charcoal hover:border-black focus:outline-none cursor-pointer shadow-xs"
              >
                <option value="featured">Sort: Featured</option>
                <option value="best-selling">Sort: Signatures</option>
                <option value="newest">Sort: New Releases</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Sort: Collector Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-brand-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Column Toggle (Desktop) */}
            <div className="hidden lg:flex items-center border border-black/[0.08] rounded-btn bg-white p-0.5 shadow-xs">
              <button
                onClick={() => setColumnCount(3)}
                className={`p-1.5 rounded transition-colors ${
                  columnCount === 3 ? 'bg-black text-white' : 'text-brand-muted hover:text-black'
                }`}
                title="3 Columns"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setColumnCount(4)}
                className={`p-1.5 rounded transition-colors ${
                  columnCount === 4 ? 'bg-black text-white' : 'text-brand-muted hover:text-black'
                }`}
                title="4 Columns"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.16em]">
              Active:
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-black/[0.08] rounded-pill px-3 py-1 text-brand-charcoal shadow-xs">
                {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 text-brand-muted hover:text-brand-sale" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-black/[0.08] rounded-pill px-3 py-1 text-brand-charcoal shadow-xs">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 text-brand-muted hover:text-brand-sale" />
                </button>
              </span>
            )}
            {(minPrice > 0 || maxPrice < 1000) && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-black/[0.08] rounded-pill px-3 py-1 text-brand-charcoal shadow-xs font-mono">
                {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                <button onClick={() => { setMinPrice(0); setMaxPrice(1000); }}>
                  <X className="w-3 h-3 text-brand-muted hover:text-brand-sale" />
                </button>
              </span>
            )}
            {ratingFilter > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-black/[0.08] rounded-pill px-3 py-1 text-brand-charcoal shadow-xs">
                ★ {ratingFilter}+
                <button onClick={() => setRatingFilter(0)}>
                  <X className="w-3 h-3 text-brand-muted hover:text-brand-sale" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-black/[0.08] rounded-pill px-3 py-1 text-brand-charcoal shadow-xs">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}>
                  <X className="w-3 h-3 text-brand-muted hover:text-brand-sale" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-card-lg p-6 border border-black/[0.08] shadow-subtle space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
                <span className="text-[11px] uppercase font-bold tracking-[0.16em] text-brand-charcoal">
                  Filter Catalog
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-brand-sale hover:underline font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Department */}
              <div>
                <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-3">
                  Department
                </h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-btn text-xs font-medium transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-black text-white font-semibold'
                          : 'text-brand-charcoal hover:bg-background'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-mono ${selectedCategory === cat.slug ? 'text-white/80' : 'text-brand-muted'}`}>
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-black/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">
                    Price Ceiling
                  </h4>
                  <span className="text-xs font-bold text-black font-mono">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-muted mt-1 font-mono">
                  <span>$0</span>
                  <span>$500</span>
                  <span>$1,000+</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="pt-4 border-t border-black/[0.06]">
                <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-2.5">
                  Collector Rating
                </h4>
                <div className="space-y-1">
                  {[4.9, 4.8, 4.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setRatingFilter(ratingFilter === rate ? 0 : rate)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-btn text-xs font-medium transition-colors ${
                        ratingFilter === rate
                          ? 'bg-black text-white font-semibold'
                          : 'text-brand-charcoal hover:bg-background'
                      }`}
                    >
                      <div className="flex items-center text-brand-gold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-mono">{rate} &amp; Above</span>
                      {ratingFilter === rate && <Check className="w-3.5 h-3.5 ml-auto text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-black/[0.06]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-medium text-brand-charcoal">In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-black rounded"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-card-lg p-14 text-center border border-black/[0.08] shadow-subtle">
                <p className="font-serif text-xl text-brand-charcoal">No living objects match your filters</p>
                <p className="text-xs text-brand-muted mt-1.5 max-w-sm mx-auto font-normal">
                  Try clearing active price ceilings or browsing all departments.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-7 py-3 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-[0.16em] hover:bg-black/90 transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  columnCount === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-3'
                } gap-5 sm:gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between animate-fadeIn">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                <h3 className="font-serif text-base uppercase tracking-wider text-brand-charcoal">
                  Filter Catalog
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-brand-muted hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Departments */}
              <div className="py-4 border-b border-black/[0.06]">
                <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-2">Department</h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-2.5 py-2 rounded-btn text-xs font-medium ${
                        selectedCategory === cat.slug
                          ? 'bg-black text-white'
                          : 'text-brand-charcoal hover:bg-background'
                      }`}
                    >
                      {cat.name} ({cat.itemCount})
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="py-4 border-b border-black/[0.06]">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-brand-gold uppercase tracking-wider text-[10px]">Price Ceiling</span>
                  <span className="font-mono font-bold text-black">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black"
                />
              </div>

              {/* Mobile In Stock */}
              <div className="py-4">
                <label className="flex items-center justify-between text-xs font-medium">
                  <span>In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-btn border border-black/[0.1] text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-wider"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background py-20 text-center text-xs text-brand-muted">Loading Curations...</div>}>
      <ShopContent />
    </Suspense>
  );
}
