'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '@/data/content';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF4D00]">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-heading tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Find quick answers about delivery speeds, order tracking, returns, and payment options.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-10 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. shipping, returns, delivery)..."
            className="w-full text-xs pl-11 pr-4 py-3 rounded-full bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-black shadow-xs"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl border border-gray-200 divide-y divide-gray-100 shadow-xs overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 text-center text-xs text-gray-500">
              No answers match &ldquo;{search}&rdquo;. Try another term or contact our support team.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-950">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FF4D00]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-200 p-8 text-center shadow-xs">
          <h3 className="text-base font-bold text-gray-950 font-heading mb-1">
            Still have questions?
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Our customer support specialists are available 24/7 to assist you.
          </p>
          <Link
            href="/contact"
            className="px-7 py-3 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold tracking-wide transition-colors"
          >
            Contact Customer Support
          </Link>
        </div>
      </div>
    </div>
  );
}
