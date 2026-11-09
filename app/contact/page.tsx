'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Headphones } from 'lucide-react';
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
      title: 'Message Sent',
      message: 'Our support team will get back to you within 4 hours.',
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
            Help & Customer Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-heading tracking-tight">
            We&apos;re Here to Help
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Have a question about an order, shipping speed, or returning a product? Reach out to our dedicated team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-gray-950 pb-3 border-b border-gray-100 font-heading">
                Contact Channels
              </h3>

              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF4D00] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950">Email Support</h4>
                    <p className="text-gray-500 mt-0.5">support@novatrend.com</p>
                    <p className="text-[10px] text-gray-400">Response time: ~2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF4D00] shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950">24/7 Live Assistance</h4>
                    <p className="text-gray-500 mt-0.5">+1 (800) 555-NOVA</p>
                    <p className="text-[10px] text-gray-400">Mon - Sun, Round the Clock</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF4D00] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950">Global Headquarters</h4>
                    <p className="text-gray-500 mt-0.5">580 Broadway, Soho</p>
                    <p className="text-gray-500">New York, NY 10012</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-gray-100 text-xs">
                <h4 className="font-bold text-gray-950 mb-1">Looking to Track an Order?</h4>
                <p className="text-gray-500 mb-3">Check live delivery progress with your tracking code.</p>
                <Link
                  href="/track-order"
                  className="text-xs font-bold text-[#FF4D00] hover:underline"
                >
                  Go to Live Order Tracker &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 font-heading">
                    Thank you, {name}!
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Your inquiry has been received. Our team will review your message and reach out via email ({email}) shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-[#FF4D00] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <h3 className="text-lg font-bold text-gray-950 font-heading mb-1">
                      Send Us a Message
                    </h3>
                    <p className="text-gray-500 mb-4">We usually respond within a few hours</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Turner"
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Topic</label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black bg-white"
                      >
                        <option value="orders">Order Status & Tracking</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="product">Product Details & Sizing</option>
                        <option value="wholesale">B2B / Dropship Partnership</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Order # (Optional)</label>
                      <input
                        type="text"
                        value={orderRef}
                        onChange={(e) => setOrderRef(e.target.value)}
                        placeholder="ORD-123456"
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please let us know how we can help you..."
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] hover:from-[#E04400] hover:to-[#FF5500] text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
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
