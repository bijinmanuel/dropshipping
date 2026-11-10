'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE6DF] gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#21201D] font-normal">
              Objects in Living Spaces
            </h2>
            <p className="text-xs sm:text-sm text-[#706B62] mt-1">
              Documented in residential interiors and architecture studios worldwide.
            </p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#21201D] hover:text-[#A97B3C] flex items-center gap-1.5 group transition-colors self-start sm:self-auto"
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
              className="group relative aspect-square rounded-xl overflow-hidden bg-white border border-[#EAE6DF] hover:border-[#21201D] shadow-xs hover:shadow-md transition-all"
            >
              <Image
                src={post.image}
                alt={post.productTitle}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5 text-white">
                <span className="text-[10px] text-[#D8B983]">{post.handle}</span>
                <p className="font-serif text-xs truncate mt-0.5 text-white">{post.productTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
