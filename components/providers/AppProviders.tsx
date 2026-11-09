'use client';

import React from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <AuthProvider>
            {children}
            <CartDrawer />
          </AuthProvider>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
