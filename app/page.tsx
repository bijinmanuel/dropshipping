import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

      {/* 3. The Permanent Collection (Best Sellers) */}
      <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE6DF] gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#21201D] font-normal">
                The Permanent Collection
              </h2>
              <p className="text-xs sm:text-sm text-[#706B62] mt-1">
                Enduring architectural objects cast in travertine, hand-blown glass, and solid timber.
              </p>
            </div>
            <Link
              href="/shop?filter=best-sellers"
              className="text-xs font-medium text-[#21201D] hover:text-[#A97B3C] flex items-center gap-1.5 group transition-colors self-start sm:self-auto"
            >
              <span>View collection</span>
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

      {/* 5. Recent Atelier Additions (New Arrivals) */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE6DF] gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#21201D] font-normal">
                Recent Atelier Additions
              </h2>
              <p className="text-xs sm:text-sm text-[#706B62] mt-1">
                Freshly fired ceramics from Kyoto and cast bronze accents from Florence.
              </p>
            </div>
            <Link
              href="/shop?filter=new"
              className="text-xs font-medium text-[#21201D] hover:text-[#A97B3C] flex items-center gap-1.5 group transition-colors self-start sm:self-auto"
            >
              <span>View all releases</span>
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

      {/* 6. Promotional Seasonal Callout Pavilion */}
      <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE6DF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-[#E2DDD2] p-8 sm:p-14 text-center flex flex-col items-center shadow-sm">
          <span className="text-xs text-[#8C642A] font-medium mb-3">
            Atelier direct logistics
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight max-w-xl text-[#21201D] leading-snug">
            Complimentary insured express delivery on curations over $150
          </h2>

          <p className="text-xs sm:text-sm text-[#706B62] max-w-lg mt-3 leading-relaxed">
            Every object is photographic certified in its origin workshop, enclosed in custom molded unbleached pulp, and flown carbon-neutral directly to your door.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full bg-[#21201D] hover:bg-[#2F2E2A] text-white text-xs font-medium uppercase tracking-[0.14em] transition-all flex items-center gap-2 group"
            >
              <span>Explore collection</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A97B3C] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/track-order"
              className="px-6 py-3 rounded-full border border-[#D9D3C7] hover:border-[#21201D] text-[#21201D] text-xs font-medium uppercase tracking-[0.14em] transition-colors bg-[#FAF9F5]"
            >
              Track a shipment
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Trending Objects Section */}
      <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE6DF] gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#21201D] font-normal">
                Objects of Current Focus
              </h2>
              <p className="text-xs sm:text-sm text-[#706B62] mt-1">
                Pieces frequently specified by architects and residential designers this month.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs font-medium text-[#21201D] hover:text-[#A97B3C] flex items-center gap-1.5 group transition-colors self-start sm:self-auto"
            >
              <span>View catalog</span>
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

      {/* 8. The VÉRDEN Standard (Value Props) */}
      <ValueProps />

      {/* 9. Verified Client Inquiries & Testimonials */}
      <TestimonialsSection />

      {/* 10. Social Showcase */}
      <SocialShowcase />
    </div>
  );
}
