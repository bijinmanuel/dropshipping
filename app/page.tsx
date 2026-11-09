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
      <section className="py-20 sm:py-28 bg-background border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-black/[0.06] gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-brand-sale" />
                <span>Enduring Signatures</span>
              </span>
              <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
                The Permanent Collection
              </h2>
            </div>
            <Link
              href="/shop?filter=best-sellers"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-charcoal hover:text-black flex items-center gap-1 group"
            >
              <span>Explore All Signatures</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-black/[0.06] gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Recent Studio Drops</span>
              </span>
              <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-charcoal hover:text-black flex items-center gap-1 group"
            >
              <span>View All Releases</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
      <section className="bg-[#141514] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto rounded-card-lg bg-white/[0.03] border border-white/[0.1] p-8 sm:p-14 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-pill bg-brand-gold/15 text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
            <Tag className="w-3 h-3" />
            <span>Seasonal Architectural Privilege</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight max-w-2xl text-white">
            Complimentary Insured Air Express on curations over $150
          </h2>

          <p className="text-xs sm:text-sm text-white/60 max-w-xl mt-3 leading-relaxed font-normal">
            Every object is inspected in its atelier of origin, enclosed in custom molded unbleached pulp, and flown carbon-neutral directly to your door.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-btn bg-white hover:bg-white/90 text-black text-[11px] font-bold uppercase tracking-[0.16em] transition-all shadow-sm"
            >
              Shop Curated Collection
            </Link>
            <Link
              href="/track-order"
              className="px-8 py-3.5 rounded-btn border border-white/20 hover:border-white text-white text-[11px] font-bold uppercase tracking-[0.16em] transition-colors"
            >
              Live Cargo Tracking
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Trending Products Section */}
      <section className="py-20 sm:py-28 bg-background border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-black/[0.06] gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                In Demand
              </span>
              <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
                Trending Among Collectors
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-charcoal hover:text-black flex items-center gap-1 group"
            >
              <span>Explore All Objects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
