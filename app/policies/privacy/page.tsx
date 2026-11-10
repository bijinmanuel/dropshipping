import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-brand-border p-8 sm:p-14 shadow-subtle space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
          <div className="border-b border-brand-border pb-6">
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-brand-gold">
              Legal Transparency
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mt-2 font-normal">
              Privacy &amp; Data Safeguards
            </h1>
            <p className="text-xs text-brand-muted mt-2 font-mono">
              Compliant with GDPR, CCPA, and global client confidentiality protocols.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">1. Information We Collect</h2>
            <p>
              We collect information necessary to fulfill your curations: shipping address, email for tracking notifications, phone for courier delivery coordination, and payment tokens. We do not store raw credit card numbers; all transactions are tokenized through PCI-DSS Level 1 payment gateways.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">2. Atelier Sourcing Confidentiality</h2>
            <p>
              When orders are routed to master partner ateliers, only destination shipping address and fulfillment SKU data are transmitted over encrypted EDI protocols. We never sell, lease, or monetize customer records to third-party data brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-brand-charcoal">3. Your Data Rights</h2>
            <p>
              Under global privacy directives, you may request complete export or deletion of your customer account profile, order history, and saved addresses at any time by contacting our privacy compliance officer at privacy@verden-design.com.
            </p>
          </section>

          <div className="pt-6 border-t border-brand-border flex items-center justify-between">
            <Link href="/" className="text-xs font-semibold text-brand-charcoal hover:text-brand-gold underline underline-offset-2 transition-colors">
              Return to Sanctuary &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
