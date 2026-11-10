'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'verden_wishlist_v1';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load wishlist from localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
      } catch (e) {
        console.error('Failed to save wishlist to localStorage:', e);
      }
    }
  }, [wishlist, isInitialized]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          showToast({
            type: 'info',
            title: 'Removed from Wishlist',
            message: `${product.title} has been removed from your saved items.`,
          });
          return prev.filter((item) => item.id !== product.id);
        } else {
          showToast({
            type: 'success',
            title: 'Added to Wishlist',
            message: `${product.title} has been saved for later.`,
          });
          return [...prev, product];
        }
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const item = prev.find((i) => i.id === productId);
        if (item) {
          showToast({
            type: 'info',
            title: 'Removed from Wishlist',
            message: `${item.title} removed.`,
          });
        }
        return prev.filter((i) => i.id !== productId);
      });
    },
    [showToast]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    showToast({
      type: 'info',
      title: 'Wishlist Cleared',
      message: 'All saved items have been cleared.',
    });
  }, [showToast]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

