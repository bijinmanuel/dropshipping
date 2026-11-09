'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [topic, setTopic] = useState('orders');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast({
      type: 'success',
      title: 'Inquiry Received',
      message: 'A senior concierge specialist will respond within 4 business hours.',
    });
  };

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
            Direct Client Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
            Contact Concierge
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed">
            Our design advisors and delivery specialists are at your service for product curation inquiries, custom orders, or delivery tracking support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-subtle space-y-6">
              <h3 className="font-serif text-xl text-brand-charcoal pb-3 border-b border-brand-border">
                Studio Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-charcoal block font-semibold">Client Concierge Email</strong>
                    <span className="text-brand-muted">concierge@verden-design.com</span>
                    <span className="text-[10px] text-brand-forest block mt-0.5">Average response: &lt; 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-charcoal block font-semibold">Toll-Free Client Advisory</strong>
                    <span className="text-brand-muted">+1 (800) 837-3367</span>
                    <span className="text-[10px] text-brand-muted block mt-0.5">Mon–Fri: 8am – 8pm EST | Sat–Sun: 9am – 5pm EST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-charcoal block font-semibold">Atelier Fulfillment Operating Hours</strong>
                    <span className="text-brand-muted">Kyoto (JST) &bull; Verona (CET) &bull; New York (EST)</span>
                    <span className="text-[10px] text-brand-success block mt-0.5">Autonomous EDI 24/7/365</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border">
                <Link
                  href="/faq"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-btn bg-background-subtle border border-brand-border text-xs font-semibold text-brand-charcoal hover:border-brand-forest transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Browse Frequently Asked Questions</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-subtle">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-forest-light text-brand-forest flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-brand-charcoal">Inquiry Dispatched</h3>
                  <p className="text-xs text-brand-muted max-w-sm mx-auto mt-2 leading-relaxed">
                    Thank you, {name}. A member of our client concierge will review your message and reach out shortly at {email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-6 px-6 py-2.5 rounded-btn border border-brand-border text-xs font-semibold text-brand-charcoal hover:bg-background"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-brand-charcoal mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Julian Moreau"
                        className="w-full p-2.5 rounded-btn border border-brand-border text-brand-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-brand-charcoal mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full p-2.5 rounded-btn border border-brand-border text-brand-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-brand-charcoal mb-1">Order Reference (Optional)</label>
                      <input
                        type="text"
                        value={orderRef}
                        onChange={(e) => setOrderRef(e.target.value)}
                        placeholder="e.g. VRD-94827104"
                        className="w-full p-2.5 rounded-btn border border-brand-border text-brand-charcoal uppercase"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-brand-charcoal mb-1">Topic</label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2.5 rounded-btn border border-brand-border bg-white text-brand-charcoal"
                      >
                        <option value="orders">Delivery &amp; Tracking Status</option>
                        <option value="curation">Design Advisory &amp; Specifications</option>
                        <option value="returns">30-Day Return / Home Trial</option>
                        <option value="press">Press &amp; Architectural Trade Program</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-charcoal mb-1">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How may our concierge assist your living space?"
                      className="w-full p-2.5 rounded-btn border border-brand-border text-brand-charcoal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
