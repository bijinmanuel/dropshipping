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
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Categories */}
      <CategoryBanners />

      {/* 3. Best Sellers Section */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-[#EAE6DF] gap-4">
            <div>
              <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-[#B88E4C] flex items-center gap-1.5 font-cinzel">
                <Flame className="w-3.5 h-3.5 text-[#B54134]" />
                <span>Enduring Signatures</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#21201D] mt-1.5 font-normal">
                The Permanent Collection
              </h2>
            </div>
            <Link
              href="/shop?filter=best-sellers"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#21201D] hover:text-[#B88E4C] flex items-center gap-1.5 group transition-colors"
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

      {/* 4. Editorial Feature Story (Harmonized warm espresso & travertine) */}
      <EditorialFeature />

      {/* 5. New Arrivals Section */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-[#EAE6DF] gap-4">
            <div>
              <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-[#B88E4C] flex items-center gap-1.5 font-cinzel">
                <Sparkles className="w-3.5 h-3.5 text-[#B88E4C]" />
                <span>Recent Studio Drops</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#21201D] mt-1.5 font-normal">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#21201D] hover:text-[#B88E4C] flex items-center gap-1.5 group transition-colors"
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

      {/* 6. Promotional Seasonal Callout Pavilion (Warm Alabaster & Gold &mdash; NO stark black) */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#EAE6DF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-[#E2DDD2] p-10 sm:p-16 text-center flex flex-col items-center shadow-float relative overflow-hidden">
          {/* Subtle warm golden ambient backdrop */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none -z-0 blur-2xl" />

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-pill bg-[#FAF9F5] border border-[#E8E4DA] text-[#B88E4C] text-[10px] font-bold tracking-[0.2em] uppercase mb-5 font-mono">
            <Tag className="w-3.5 h-3.5 text-[#B88E4C]" />
            <span>Seasonal Architectural Privilege</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight max-w-2xl text-[#21201D] leading-tight">
            Complimentary Insured Air Express on curations over $150
          </h2>

          <p className="text-xs sm:text-sm text-[#706C63] max-w-xl mt-4 leading-relaxed font-normal">
            Every object is inspected in its atelier of origin, enclosed in custom molded unbleached pulp, and flown carbon-neutral directly to your door.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-pill bg-[#21201D] hover:bg-[#2F2E2A] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-float flex items-center gap-2 group"
            >
              <span>Shop Curated Collection</span>
              <ArrowRight className="w-4 h-4 text-[#B88E4C] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/track-order"
              className="px-8 py-4 rounded-pill border border-[#E2DDD2] hover:border-[#21201D] text-[#21201D] text-xs font-semibold uppercase tracking-[0.18em] transition-colors bg-[#FAF9F5]"
            >
              Live Cargo Tracking
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Trending Products Section */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-[#EAE6DF] gap-4">
            <div>
              <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-[#B88E4C] font-cinzel">
                In Demand
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#21201D] mt-1.5 font-normal">
                Trending Among Collectors
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#21201D] hover:text-[#B88E4C] flex items-center gap-1.5 group transition-colors"
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
