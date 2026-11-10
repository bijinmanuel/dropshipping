'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { fetchProducts } from '@/lib/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Air Max 270',
  'Essential Hoodie',
  'Wireless Headphone',
  'Smart Watch Series 9',
  'Stainless Steel Bottle',
  'Aviator Sunglasses',
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>(() =>
    PRODUCTS.filter((p) => (p as any).isActive !== false)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts({ limit: 100 }).then((res) => {
      if (res.products && res.products.length > 0) {
        setAllProducts(res.products.filter((p: any) => p.isActive !== false));
      }
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = allProducts.filter((p) => (p as any).isActive !== false).filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query, allProducts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-black/60 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="w-full bg-white border-b border-gray-200 shadow-2xl pt-6 pb-10 px-4 sm:px-8 max-h-[85vh] overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto">
          {/* Top Search Input */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <Search className="w-5 h-5 text-[#FF4D00] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sneakers, hoodies, headphones, watches, bottles..."
              className="w-full text-base sm:text-lg font-bold text-gray-950 placeholder:text-gray-400 bg-transparent outline-none focus:ring-0 font-heading"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-black text-xs font-semibold px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors ml-2"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Popular Searches */}
          {!query && (
            <div className="mt-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF4D00] mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Popular Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-xs font-semibold text-gray-700 hover:text-[#FF4D00] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {query && (
            <div className="mt-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <p className="text-xs text-gray-500">
                  Found <strong className="text-gray-950 font-bold">{results.length}</strong> results for &ldquo;{query}&rdquo;
                </p>
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-xs font-bold text-[#FF4D00] hover:underline flex items-center gap-1"
                >
                  <span>View all in shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {results.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-500">
                  No products matched &ldquo;{query}&rdquo;. Try another keyword.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#F6F7F9] border border-gray-100 transition-colors group"
                    >
                      <div className="relative w-12 h-12 rounded-xl bg-white overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center p-1">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-gray-950 group-hover:text-[#FF4D00] transition-colors truncate">
                          {product.title}
                        </h4>
                        <p className="text-[11px] font-mono font-bold text-gray-700">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
