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
    <div className="min-h-screen bg-[#FAF9F5] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold">
            Direct Client Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
            Contact Concierge
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-3 leading-relaxed">
            Our design advisors and delivery specialists are at your service for product curation inquiries, custom orders, or delivery tracking telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
              <h3 className="font-serif text-2xl text-brand-charcoal pb-4 border-b border-brand-border">
                Studio Channels
              </h3>

              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3.5">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-charcoal block font-semibold text-sm font-serif">Client Concierge Email</strong>
                    <span className="text-brand-muted font-mono">concierge@verden-design.com</span>
                    <span className="text-[10px] text-brand-gold block mt-0.5 uppercase tracking-wider font-mono">Response time: &lt; 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-charcoal block font-semibold text-sm font-serif">Toll-Free Advisory Line</strong>
                    <span className="text-brand-muted font-mono">+1 (800) 837-3367</span>
                    <span className="text-[10px] text-brand-muted block mt-0.5">Mon–Fri: 8am – 8pm EST | Sat–Sun: 9am – 5pm EST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-charcoal block font-semibold text-sm font-serif">Atelier Logistics Hubs</strong>
                    <span className="text-brand-muted">Kyoto (JST) &bull; Verona (CET) &bull; New York (EST)</span>
                    <span className="text-[10px] text-brand-charcoal font-semibold block mt-0.5 font-mono">Autonomous EDI 24/7/365</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-brand-border">
                <Link
                  href="/faq"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-pill bg-[#FAF9F5] border border-brand-border text-xs font-semibold text-brand-charcoal hover:border-brand-charcoal transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Browse Frequently Asked Questions</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-subtle">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#141514] text-brand-gold border border-brand-gold/30 flex items-center justify-center mx-auto mb-4">
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
                    className="mt-6 px-7 py-3 rounded-pill border border-brand-border text-xs font-semibold text-brand-charcoal hover:border-brand-charcoal transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Julian Moreau"
                        className="w-full p-3 rounded-pill border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full p-3 rounded-pill border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Order Reference (Optional)</label>
                      <input
                        type="text"
                        value={orderRef}
                        onChange={(e) => setOrderRef(e.target.value)}
                        placeholder="e.g. VRD-94827104"
                        className="w-full p-3 rounded-pill border border-brand-border text-brand-charcoal uppercase font-mono tracking-wider focus:outline-none focus:border-brand-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Topic</label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-3 rounded-pill border border-brand-border bg-white text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
                      >
                        <option value="orders">Delivery &amp; Waybill Status</option>
                        <option value="curation">Design Advisory &amp; Specifications</option>
                        <option value="returns">30-Day Living Trial Protocol</option>
                        <option value="press">Architectural Trade Program</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-brand-charcoal mb-1.5 uppercase tracking-wider text-[11px]">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How may our concierge assist your living space?"
                      className="w-full p-3.5 rounded-2xl border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-charcoal leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-pill bg-[#141514] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4 text-brand-gold" />
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
