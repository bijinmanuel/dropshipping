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
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
            Knowledge Base &bull; Client Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed">
            Everything you need to know about our direct-from-artisan dropshipping model, shipping timelines, customs, and our 30-day home trial.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. customs, returns, tracking, shipping)..."
            className="w-full text-xs pl-10 pr-4 py-3 rounded-btn bg-white border border-brand-border text-brand-charcoal focus:outline-none focus:border-brand-forest shadow-sm"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-card border border-brand-border divide-y divide-brand-border shadow-subtle overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-brand-muted">
              No answers match &ldquo;{search}&rdquo;. Try another term or contact concierge.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-background-subtle transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base text-brand-charcoal font-medium">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-muted transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-brand-forest' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-brand-charcoal/80 leading-relaxed animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-card bg-brand-forest-light border border-brand-forest/20 text-center">
          <h3 className="font-serif text-lg text-brand-forest">Still have questions?</h3>
          <p className="text-xs text-brand-muted mt-1 max-w-sm mx-auto">
            Our concierge team is available 7 days a week to assist with interior styling and order inquiries.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 mt-4 px-5 py-2.5 rounded-btn bg-brand-forest text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-forest-hover transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Speak with Concierge</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

