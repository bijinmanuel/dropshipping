import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Tag } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryBanners } from '@/components/home/CategoryBanners';
import { EditorialFeature } from '@/components/home/EditorialFeature';
import { ValueProps } from '@/components/home/ValueProps';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { SocialShowcase } from '@/components/home/SocialShowcase';
import { ProductCard } from '@/components/product/ProductCard';

export default function HomePage() {
  const bestSellers = PRODUCTS.filter((p) => p.tags.includes('Best Seller') || p.badge === 'BESTSELLER');
  const newArrivals = PRODUCTS.filter((p) => p.tags.includes('New Arrival') || p.badge === 'NEW');
  const trending = PRODUCTS.filter((p) => p.tags.includes('Trending'));

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Categories */}
      <CategoryBanners />

      {/* 3. Best Sellers Section */}
      <section className="py-16 sm:py-24 bg-background border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60 gap-4">
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-brand-sale" />
                <span>Enduring Signatures</span>
              </span>
              <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
                The Best Sellers
              </h2>
            </div>
            <Link
              href="/shop?filter=best-sellers"
              className="text-xs font-semibold text-brand-forest hover:text-brand-forest-hover flex items-center gap-1 group"
            >
              <span>Explore All Signatures</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Editorial Feature Story */}
      <EditorialFeature />

      {/* 5. New Arrivals Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60 gap-4">
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Recent Studio Drops</span>
              </span>
              <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="text-xs font-semibold text-brand-forest hover:text-brand-forest-hover flex items-center gap-1 group"
            >
              <span>View All Releases</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Promotional Seasonal Callout Banner */}
      <section className="bg-brand-forest text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-brand-border/60">
        <div className="max-w-5xl mx-auto rounded-2xl bg-brand-forest-dark/40 border border-brand-gold/30 p-8 sm:p-12 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-brand-gold/20 text-brand-gold text-xs font-semibold tracking-wider uppercase mb-4">
            <Tag className="w-3.5 h-3.5" />
            <span>Seasonal Architectural Drop</span>
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl font-medium tracking-tight max-w-2xl">
            Complimentary Insured Air Express on orders over $150
          </h2>

          <p className="text-xs sm:text-sm text-white/70 max-w-xl mt-3 leading-relaxed">
            Every order is carefully inspected, packed in molded unbleached pulp, and flown carbon-neutral directly from our verified atelier hubs.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-btn bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs font-semibold uppercase tracking-wider transition-colors shadow-subtle"
            >
              Shop Curated Collection
            </Link>
            <Link
              href="/track-order"
              className="px-6 py-3 rounded-btn border border-white/20 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Live Dropship Tracking
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Trending Products Section */}
      <section className="py-16 sm:py-24 bg-background border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60 gap-4">
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
                In Demand
              </span>
              <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
                Trending Among Collectors
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-brand-forest hover:text-brand-forest-hover flex items-center gap-1 group"
            >
              <span>Explore All Objects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trending.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Shop With Us (Value Props) */}
      <ValueProps />

      {/* 9. Verified Customer Reviews */}
      <TestimonialsSection />

      {/* 10. Social Showcase */}
      <SocialShowcase />
    </div>
  );
}
