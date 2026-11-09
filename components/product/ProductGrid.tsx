'use client';

import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  isLoading = false,
  emptyMessage = 'No objects found matching your criteria.',
  columns = 4,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-card border border-brand-border bg-white overflow-hidden animate-pulse"
          >
            <div className="aspect-product w-full bg-background-subtle" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-1/3 bg-background-subtle rounded" />
              <div className="h-4 w-3/4 bg-background-subtle rounded" />
              <div className="h-3 w-1/2 bg-background-subtle rounded" />
              <div className="h-4 w-1/4 bg-background-subtle rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-card border border-brand-border">
        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4">
          <PackageOpen className="w-8 h-8 text-brand-muted" />
        </div>
        <h3 className="text-base font-semibold text-brand-charcoal mb-1">
          {emptyMessage}
        </h3>
        <p className="text-xs text-brand-muted max-w-sm">
          Try adjusting your search criteria, clearing active filters, or browsing other curated collections.
        </p>
      </div>
    );
  }

  const colClasses = {
    2: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    4: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6',
  };

  return (
    <div className={colClasses[columns] || colClasses[4]}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
