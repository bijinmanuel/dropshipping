'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, demoLogin } = useAuth();
  const { showToast } = useToast();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isRegister) {
      if (!name.trim()) {
        showToast({ type: 'error', title: 'Name Required', message: 'Please enter your name.' });
        setIsLoading(false);
        return;
      }
      await register(name, email, password);
    } else {
      await login(email, password);
    }

    setIsLoading(false);
    router.push('/account');
  };

  const handleDemoCustomer = () => {
    demoLogin('customer');
    router.push('/account');
  };

  const handleDemoAdmin = () => {
    demoLogin('admin');
    router.push('/dropship-hub');
  };

  return (
    <div className="min-h-screen bg-background py-12 sm:py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-card border border-brand-border p-8 shadow-subtle animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-semibold tracking-[0.25em] text-brand-forest">
              VÉRDEN
            </span>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-brand-muted mt-0.5">
              Privé Client Sanctuary
            </span>
          </Link>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-brand-border mb-6">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 -mb-px ${
              !isRegister
                ? 'border-brand-forest text-brand-forest'
                : 'border-transparent text-brand-muted hover:text-brand-charcoal'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 -mb-px ${
              isRegister
                ? 'border-brand-forest text-brand-forest'
                : 'border-transparent text-brand-muted hover:text-brand-charcoal'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Login Fillers */}
        <div className="mb-6 p-3 bg-brand-forest-light border border-brand-forest/20 rounded-btn">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-forest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Instant Demo Access</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="py-1.5 px-2 bg-white text-brand-charcoal text-[11px] font-semibold rounded hover:bg-brand-forest hover:text-white transition-colors border border-brand-border"
            >
              👤 Demo Customer
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="py-1.5 px-2 bg-brand-forest text-white text-[11px] font-semibold rounded hover:bg-brand-forest-hover transition-colors"
            >
              ⚡ Store Admin
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block font-semibold text-brand-charcoal mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Camille de Laurent"
                  className="w-full pl-9 pr-3 py-2.5 rounded-btn border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-forest"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-brand-charcoal mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@verden-design.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-btn border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-forest"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-semibold text-brand-charcoal">Password</label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() =>
                    showToast({
                      type: 'info',
                      title: 'Password Reset',
                      message: 'Password reset link dispatched to your email.',
                    })
                  }
                  className="text-[11px] text-brand-forest hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-btn border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-forest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? 'Authenticating...' : isRegister ? 'Create Privé Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-brand-border text-center text-[11px] text-brand-muted">
          <span>Looking to checkout as guest? </span>
          <Link href="/checkout" className="text-brand-forest font-semibold hover:underline">
            Proceed to Guest Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
