'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['Travertine Lamp', 'Stoneware Teapot', 'Tuscan Leather', 'Walnut Chair', 'Aroma Diffuser'];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
    const filtered = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-brand-charcoal/60 backdrop-blur-md animate-fadeIn">
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Search objects"
        className="w-full bg-[#FFFFFF] border-b border-brand-border shadow-dropdown pt-6 pb-8 px-4 sm:px-8 max-h-[85vh] overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto">
          {/* Top Search Input */}
          <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
            <Search className="w-5 h-5 text-brand-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search objects, travertine, leather, ceramics, walnut..."
              className="w-full text-base sm:text-xl font-medium text-brand-charcoal placeholder:text-brand-muted/70 bg-transparent outline-none focus:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-brand-muted hover:text-brand-charcoal text-xs uppercase tracking-wider font-medium px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-brand-muted hover:text-brand-charcoal rounded-full hover:bg-background-subtle transition-colors ml-2"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Popular Tags */}
          {!query && (
            <div className="mt-6">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-brand-forest" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs font-medium px-3 py-1.5 rounded-pill bg-background border border-brand-border text-brand-charcoal hover:border-brand-forest hover:bg-brand-forest-light transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Curated Recommendations */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-4">
                  Curated Highlights
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex flex-col gap-2 p-2 rounded-card hover:bg-background-subtle transition-colors"
                    >
                      <div className="relative aspect-product w-full overflow-hidden rounded-btn bg-background-subtle">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-xs font-medium text-brand-charcoal line-clamp-1 group-hover:text-brand-forest">
                        {product.title}
                      </p>
                      <p className="text-xs font-semibold text-brand-forest">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Results for &ldquo;{query}&rdquo; ({results.length})
                </p>
                {results.length > 0 && (
                  <Link
                    href={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-xs font-semibold text-brand-forest hover:underline flex items-center gap-1"
                  >
                    View all in shop <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-base text-brand-charcoal font-medium">No objects match your query</p>
                  <p className="text-xs text-brand-muted mt-1">
                    Try searching for &quot;lamp&quot;, &quot;tea&quot;, &quot;speaker&quot;, or &quot;leather&quot;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2.5 rounded-card border border-brand-border/60 hover:border-brand-forest hover:bg-background-subtle transition-all group"
                    >
                      <div className="relative w-16 h-20 rounded-btn overflow-hidden bg-background-subtle shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">
                          {product.categoryLabel}
                        </span>
                        <h4 className="text-sm font-semibold text-brand-charcoal truncate group-hover:text-brand-forest">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-brand-forest">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-brand-muted line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                          <span className="text-[10px] text-brand-success bg-brand-forest-light px-1.5 py-0.5 rounded font-medium ml-auto">
                            In Stock
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}
