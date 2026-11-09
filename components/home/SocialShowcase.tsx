'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';

const SOCIAL_POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
    handle: '@studio_nordic',
    productTitle: 'Arcos Travertine Table Lamp',
    slug: 'arcos-travertine-table-lamp',
  },
  {
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
    handle: '@kyoto_living',
    productTitle: 'Kyoto Handcrafted Stoneware',
    slug: 'kyoto-handcrafted-stoneware-tea-set',
  },
  {
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop',
    handle: '@minimalist_spaces',
    productTitle: 'Aura Acoustic Wireless Speaker',
    slug: 'aura-acoustic-wireless-speaker',
  },
  {
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    handle: '@voyage_journal',
    productTitle: 'The Atelier Leather Weekender',
    slug: 'atelier-full-grain-leather-weekender',
  },
  {
    image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?q=80&w=800&auto=format&fit=crop',
    handle: '@arkitektur_dk',
    productTitle: 'Kanso Solid Walnut Chair',
    slug: 'kanso-solid-walnut-linen-lounge-chair',
  },
  {
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    handle: '@slow_zenith',
    productTitle: 'Haku Ultrasonic Stone Diffuser',
    slug: 'haku-ultrasonic-stone-diffuser',
  },
];

export function SocialShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-brand-border gap-4">
          <div>
            <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-brand-gold flex items-center gap-2 font-cinzel">
              <Instagram className="w-4 h-4 text-brand-gold" />
              <span>In Situ &bull; #VerdenLiving</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal mt-1.5 font-normal">
              Curated Architectural Homes
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-charcoal hover:text-brand-gold flex items-center gap-1.5 group transition-colors"
          >
            <span>Follow @verden.studio</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_POSTS.map((post, idx) => (
            <Link
              key={idx}
              href={`/product/${post.slug}`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-background border border-brand-border shadow-subtle hover:shadow-2xl transition-all"
            >
              <Image
                src={post.image}
                alt={post.productTitle}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="text-[10px] text-brand-gold font-mono tracking-wider">{post.handle}</span>
                <div>
                  <p className="font-serif text-xs sm:text-sm font-medium line-clamp-1 leading-snug">{post.productTitle}</p>
                  <span className="text-[9px] uppercase font-semibold text-white/80 tracking-[0.2em] flex items-center gap-1 mt-1 font-mono">
                    Acquire Object &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
