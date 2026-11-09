'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, ProductVariant } from '@/types/product';
import { CartItem, Coupon, ShippingMethod } from '@/types/cart';
import { VALID_COUPONS } from '@/data/coupons';
import { SHIPPING_METHODS } from '@/data/shipping';
import { useToast } from './ToastContext';
import { useWishlist } from './WishlistContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  finalTotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  freeShippingRemaining: number;
  isCartDrawerOpen: boolean;
  appliedCoupon: Coupon | null;
  selectedShipping: ShippingMethod;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  moveToWishlist: (cartItemId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setShippingMethod: (method: ShippingMethod) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'verden_cart_v1';
const FREE_SHIPPING_GOAL = 150;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_METHODS[0]);

  const { showToast } = useToast();
  const { toggleWishlist } = useWishlist();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem('verden_coupon_v1');
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        if (appliedCoupon) {
          localStorage.setItem('verden_coupon_v1', JSON.stringify(appliedCoupon));
        } else {
          localStorage.removeItem('verden_coupon_v1');
        }
      } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
      }
    }
  }, [items, appliedCoupon, isInitialized]);

  const openCart = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCart = useCallback(() => setIsCartDrawerOpen(false), []);

  const addToCart = useCallback(
    (product: Product, variant?: ProductVariant, quantity: number = 1) => {
      const activeVariant = variant || product.variants[0];
      const cartItemId = `${product.id}_${activeVariant.id}`;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        } else {
          const newItem: CartItem = {
            id: cartItemId,
            product,
            selectedVariant: activeVariant,
            quantity,
            addedAt: new Date().toISOString(),
          };
          return [...prev, newItem];
        }
      });

      showToast({
        type: 'success',
        title: 'Added to Bag',
        message: `${product.title} (${activeVariant.name}) × ${quantity}`,
        action: {
          label: 'View Bag',
          onClick: () => setIsCartDrawerOpen(true),
        },
      });
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (cartItemId: string) => {
      setItems((prev) => {
        const item = prev.find((i) => i.id === cartItemId);
        if (item) {
          showToast({
            type: 'info',
            title: 'Removed from Bag',
            message: `${item.product.title} has been removed.`,
          });
        }
        return prev.filter((i) => i.id !== cartItemId);
      });
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (cartItemId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const moveToWishlist = useCallback(
    (cartItemId: string) => {
      const item = items.find((i) => i.id === cartItemId);
      if (item) {
        toggleWishlist(item.product);
        removeFromCart(cartItemId);
        showToast({
          type: 'success',
          title: 'Saved for Later',
          message: `${item.product.title} moved to your wishlist.`,
        });
      }
    },
    [items, toggleWishlist, removeFromCart, showToast]
  );

  const applyCoupon = useCallback(
    (code: string) => {
      const cleanCode = code.trim().toUpperCase();
      const match = VALID_COUPONS.find((c) => c.code === cleanCode);

      if (!match) {
        return { success: false, message: 'Invalid or expired promotional code' };
      }

      setAppliedCoupon(match);
      showToast({
        type: 'success',
        title: 'Promo Code Applied',
        message: match.description,
      });
      return { success: true, message: `Applied code ${match.code}` };
    },
    [showToast]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast({
      type: 'info',
      title: 'Promo Code Removed',
      message: 'The discount has been removed from your total.',
    });
  }, [showToast]);

  const setShippingMethod = useCallback((method: ShippingMethod) => {
    setSelectedShipping(method);
  }, []);

  // Financial Calculations
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const modifier = item.selectedVariant.priceModifier || 0;
      const unitPrice = item.product.price + modifier;
      return sum + unitPrice * item.quantity;
    }, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minSpend && subtotal < appliedCoupon.minSpend) return 0;

    if (appliedCoupon.discountType === 'percentage') {
      return (subtotal * appliedCoupon.discountValue) / 100;
    }
    return Math.min(appliedCoupon.discountValue, subtotal);
  }, [appliedCoupon, subtotal]);

  const isFreeStandardShipping = subtotal >= FREE_SHIPPING_GOAL;

  const shippingCost = useMemo(() => {
    if (items.length === 0) return 0;
    if (selectedShipping.id === 'ship-standard' && isFreeStandardShipping) {
      return 0;
    }
    return selectedShipping.price;
  }, [items.length, selectedShipping, isFreeStandardShipping]);

  const taxAmount = useMemo(() => {
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    return Math.round(taxableAmount * 0.08 * 100) / 100; // 8% sales tax
  }, [subtotal, discountAmount]);

  const finalTotal = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingCost + taxAmount);
  }, [items.length, subtotal, discountAmount, shippingCost, taxAmount]);

  const freeShippingProgress = useMemo(() => {
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_GOAL) * 100));
  }, [subtotal]);

  const freeShippingRemaining = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_GOAL - subtotal);
  }, [subtotal]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountAmount,
        shippingCost,
        taxAmount,
        finalTotal,
        freeShippingThreshold: FREE_SHIPPING_GOAL,
        freeShippingProgress,
        freeShippingRemaining,
        isCartDrawerOpen,
        appliedCoupon,
        selectedShipping,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        moveToWishlist,
        applyCoupon,
        removeCoupon,
        setShippingMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
