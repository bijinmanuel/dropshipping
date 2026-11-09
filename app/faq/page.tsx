'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS, FAQItem } from '@/data/content';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold">
            Knowledge Base &bull; Client Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-3 leading-relaxed">
            Everything you need to know about our direct-from-artisan dropshipping model, shipping timelines, customs, and our 30-day living trial.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-10 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-brand-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. customs, returns, tracking, shipping)..."
            className="w-full text-xs pl-11 pr-4 py-3.5 rounded-pill bg-white border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-charcoal shadow-2xs font-mono"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-2xl border border-brand-border divide-y divide-brand-border shadow-subtle overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 text-center text-xs text-brand-muted">
              No answers match &ldquo;{search}&rdquo;. Try another term or speak with concierge.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF9F5]/70 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg text-brand-charcoal font-normal">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-muted transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-brand-gold' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-[#141514] text-white border border-white/10 text-center shadow-xl">
          <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-brand-gold">Concierge Support</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1 font-normal">Still have questions?</h3>
          <p className="text-xs text-white/70 mt-2 max-w-sm mx-auto leading-relaxed">
            Our advisory team is available 7 days a week to assist with interior styling and order inquiries.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-6 px-7 py-3 rounded-pill bg-white hover:bg-brand-gold hover:text-white text-brand-charcoal text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Speak with Concierge</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
