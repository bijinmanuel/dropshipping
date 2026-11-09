'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ShippingAddress } from '@/types/cart';
import { useToast } from './ToastContext';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  phone?: string;
  defaultAddress?: ShippingAddress;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  demoLogin: (role?: 'customer' | 'admin') => void;
  updateAddress: (address: ShippingAddress) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CUSTOMER: User = {
  id: 'usr-customer-88',
  name: 'Camille de Laurent',
  email: 'camille.laurent@verden-design.com',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  phone: '+1 (555) 234-8971',
  defaultAddress: {
    firstName: 'Camille',
    lastName: 'de Laurent',
    email: 'camille.laurent@verden-design.com',
    phone: '+1 (555) 234-8971',
    addressLine1: '482 Mercer Street',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States',
  },
  createdAt: '2026-03-12T10:00:00Z',
};

const DEMO_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Astrid Lindqvist (Store Architect)',
  email: 'admin@verden-design.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
  phone: '+1 (555) 019-2831',
  createdAt: '2025-01-01T00:00:00Z',
};

const STORAGE_KEY = 'verden_auth_user_v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to logged-in demo customer for smooth immediate UX
        setUser(DEMO_CUSTOMER);
      }
    } catch (e) {
      console.error('Failed to parse auth user:', e);
      setUser(DEMO_CUSTOMER);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        if (user) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.error('Failed to store auth user:', e);
      }
    }
  }, [user, isInitialized]);

  const login = useCallback(
    async (email: string, _pass: string) => {
      // Mock instant login
      const loggedUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        role: email.includes('admin') ? 'admin' : 'customer',
        createdAt: new Date().toISOString(),
      };
      setUser(loggedUser);
      showToast({
        type: 'success',
        title: 'Welcome Back',
        message: `Signed in as ${loggedUser.name}`,
      });
      return { success: true, message: 'Signed in successfully' };
    },
    [showToast]
  );

  const register = useCallback(
    async (name: string, email: string, _pass: string) => {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      showToast({
        type: 'success',
        title: 'Account Created',
        message: `Welcome to VÉRDEN Privé, ${name}.`,
      });
      return { success: true, message: 'Account registered successfully' };
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out of your account.',
    });
  }, [showToast]);

  const demoLogin = useCallback(
    (role: 'customer' | 'admin' = 'customer') => {
      const targetUser = role === 'admin' ? DEMO_ADMIN : DEMO_CUSTOMER;
      setUser(targetUser);
      showToast({
        type: 'success',
        title: `Switched to Demo ${role === 'admin' ? 'Store Manager' : 'Customer'}`,
        message: `Active session: ${targetUser.name}`,
      });
    },
    [showToast]
  );

  const updateAddress = useCallback(
    (address: ShippingAddress) => {
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          defaultAddress: address,
        };
      });
      showToast({
        type: 'success',
        title: 'Address Updated',
        message: 'Your default delivery address was updated.',
      });
    },
    [showToast]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        demoLogin,
        updateAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

