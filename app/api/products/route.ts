import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const tag = searchParams.get('tag');

  let results = [...PRODUCTS];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (tag) {
    results = results.filter((p) => p.tags.includes(tag) || p.badge === tag);
  }

  // Sanitize internal dropship costs for public client API requests
  const sanitized = results.map((p) => {
    const { dropship, ...rest } = p;
    return {
      ...rest,
      origin: dropship.countryOfOrigin,
      estimatedDelivery: p.estimatedDelivery,
    };
  });

  return NextResponse.json({
    success: true,
    count: sanitized.length,
    products: sanitized,
  });
}

