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
    <section className="py-16 sm:py-24 bg-background border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60 gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest flex items-center gap-1.5">
              <Instagram className="w-4 h-4 text-brand-forest" />
              <span>In Situ &bull; #VerdenLiving</span>
            </span>
            <h2 className="text-section-title font-serif text-brand-charcoal mt-1">
              Curated Architectural Homes
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-forest hover:text-brand-forest-hover flex items-center gap-1 group"
          >
            <span>Follow @verden.studio</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_POSTS.map((post, idx) => (
            <Link
              key={idx}
              href={`/product/${post.slug}`}
              className="group relative aspect-square rounded-card overflow-hidden bg-background-subtle border border-brand-border/60"
            >
              <Image
                src={post.image}
                alt={post.productTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <span className="text-[10px] text-white/80 font-mono">{post.handle}</span>
                <div>
                  <p className="text-[11px] font-semibold line-clamp-1">{post.productTitle}</p>
                  <span className="text-[9px] uppercase font-bold text-brand-gold tracking-wider flex items-center gap-0.5 mt-0.5">
                    Shop Object &rarr;
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

