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
  Filter,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils';

function ShopContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams?.get('category') || 'all';
  const initialFilter = searchParams?.get('filter') || '';
  const initialSearch = searchParams?.get('search') || '';

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
      : initialFilter === 'sale'
      ? 'sale'
      : 'featured'
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [columnCount, setColumnCount] = useState<3 | 4>(4);

  useEffect(() => {
    const cat = searchParams?.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams?.get('search');
    if (search) setSearchQuery(search);
    const filter = searchParams?.get('filter');
    if (filter === 'new') setSortBy('newest');
    if (filter === 'best-sellers') setSortBy('best-selling');
    if (filter === 'sale') setSortBy('sale');
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
        case 'sale':
          return (b.badge === 'SALE' ? 1 : 0) - (a.badge === 'SALE' ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, minPrice, maxPrice, ratingFilter, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] pb-24">
      {/* Shop Hero Banner */}
      <section className="bg-white border-b border-gray-100 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
              Curated Collection
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mt-1 font-heading tracking-tight">
              Trending Products & Essentials
            </h1>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Explore our full catalog of lifestyle apparel, noise-cancelling audio, smart wearables, and designer home accents.
            </p>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-black'
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-xs hover:border-black"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
              )}
            </button>

            {/* Results Count */}
            <p className="text-xs text-gray-500">
              Showing <strong className="text-gray-950 font-mono font-bold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>

            {/* Reset Filters Link */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#FF4D00] hover:underline flex items-center gap-1 font-semibold ml-2"
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
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full text-xs pl-8 pr-7 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
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
                className="text-xs appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 font-semibold text-gray-800 focus:outline-none focus:border-black shadow-2xs cursor-pointer"
              >
                <option value="featured">Featured Drops</option>
                <option value="best-selling">Best Sellers</option>
                <option value="newest">New Arrivals</option>
                <option value="sale">Flash Sale</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Desktop Column Layout Switcher */}
            <div className="hidden xl:flex items-center border border-gray-200 rounded-xl bg-white p-0.5">
              <button
                onClick={() => setColumnCount(3)}
                className={`p-1.5 rounded-lg transition-colors ${
                  columnCount === 3
                    ? 'bg-black text-white'
                    : 'text-gray-400 hover:text-black'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setColumnCount(4)}
                className={`p-1.5 rounded-lg transition-colors ${
                  columnCount === 4
                    ? 'bg-black text-white'
                    : 'text-gray-400 hover:text-black'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mr-1">
              Active:
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-2xs">
                Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-red-500 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-2xs">
                &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-500 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(minPrice > 0 || maxPrice < 1000) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-2xs">
                Price: {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(1000);
                  }}
                  className="hover:text-red-500 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {ratingFilter > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-2xs">
                {ratingFilter}+ Stars
                <button
                  onClick={() => setRatingFilter(0)}
                  className="hover:text-red-500 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-2xs">
                In Stock Only
                <button
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-red-500 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-950 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#FF4D00]" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#FF4D00] hover:underline font-semibold"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold text-gray-950 mb-3">Department</h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg text-left transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-orange-50 text-[#FF4D00] font-bold'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-gray-950">Max Price</h4>
                  <span className="text-xs font-mono font-bold text-gray-900">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FF4D00] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>$0</span>
                  <span>$1,000</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-950 mb-2">Minimum Rating</h4>
                <div className="space-y-1">
                  {[4.8, 4.5, 4.0].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                      className={`w-full flex items-center justify-between text-xs py-1 px-2 rounded-lg transition-colors ${
                        ratingFilter === star
                          ? 'bg-amber-50 text-amber-900 font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(star)
                                  ? 'fill-current'
                                  : 'text-gray-200 fill-current'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-medium">{star}+ Stars</span>
                      </div>
                      {ratingFilter === star && (
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded-md accent-[#FF4D00] cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    In Stock for Immediate Dispatch
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[#FF4D00] mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-950 mb-1">
                  No matching products
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  We couldn&apos;t find products matching your filters. Try clearing some filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  columnCount === 3
                    ? 'md:grid-cols-3'
                    : 'md:grid-cols-3 xl:grid-cols-4'
                } gap-5 sm:gap-7`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-sm font-bold text-gray-950">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Department */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-950 mb-2">Category</h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs py-2 px-2.5 rounded-xl text-left ${
                        selectedCategory === cat.slug
                          ? 'bg-orange-50 text-[#FF4D00] font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-950 mb-2">Max Price</h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FF4D00]"
                />
                <p className="text-right text-xs font-mono font-bold text-gray-900 mt-1">
                  {formatPrice(maxPrice)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-900"
              >
                Show {filteredProducts.length} Results
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
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ShopContent />
    </Suspense>
  );
}
