import { Product } from '@/types/product';
import { PRODUCTS } from '@/data/products';
import { VALID_COUPONS } from '@/data/coupons';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ProductQueryParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  badge?: string;
  inStock?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch products from Backend API (MongoDB) with fallback to local catalog
 * Excludes deactivated products for the public storefront.
 */
export async function fetchProducts(params: ProductQueryParams = {}): Promise<{
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  source: 'mongodb' | 'memory' | 'local';
}> {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.minPrice !== undefined) query.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());
    if (params.rating) query.set('rating', params.rating.toString());
    if (params.badge) query.set('badge', params.badge);
    if (params.inStock) query.set('inStock', 'true');
    if (params.sortBy) query.set('sortBy', params.sortBy);
    if (params.page) query.set('page', params.page.toString());
    if (params.limit) query.set('limit', params.limit.toString());

    // Never cache so status updates (active/deactive) appear instantly
    const res = await fetch(`${API_BASE}/products?${query.toString()}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        // Enforce active filter: only show products where isActive is not false
        const activeProducts = data.products.filter((p: any) => p.isActive !== false);

        return {
          products: activeProducts,
          total: activeProducts.length,
          page: data.page || 1,
          totalPages: data.totalPages || 1,
          source: data.source || 'mongodb',
        };
      }
    }
  } catch (error) {
    console.warn('[API Client] Backend fetch failed, utilizing resilient local store', error);
  }

  // Resilient fallback to local products (only active)
  let filtered = PRODUCTS.filter((p) => (p as any).isActive !== false);
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === params.category?.toLowerCase());
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q));
  }
  return {
    products: filtered,
    total: filtered.length,
    page: 1,
    totalPages: 1,
    source: 'local',
  };
}

/**
 * Fetch product by slug
 */
export async function fetchProductBySlug(slug: string): Promise<{ product: Product | null; related: Product[] }> {
  try {
    const res = await fetch(`${API_BASE}/products/${slug}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.product && (data.product as any).isActive !== false) {
        const activeRelated = (data.related || []).filter((p: any) => p.isActive !== false);
        return { product: data.product, related: activeRelated };
      }
    }
  } catch (error) {
    console.warn('[API Client] Failed to fetch product slug from backend, using local dataset', error);
  }

  const localProduct = PRODUCTS.find((p) => p.slug === slug && (p as any).isActive !== false) || null;
  const related = localProduct
    ? PRODUCTS.filter((p) => p.category === localProduct.category && p.id !== localProduct.id && (p as any).isActive !== false).slice(0, 4)
    : [];
  return { product: localProduct, related };
}

/**
 * Fetch featured product collections
 */
export async function fetchFeaturedProducts(): Promise<{
  newArrivals: Product[];
  bestSellers: Product[];
  onSale: Product[];
}> {
  try {
    const res = await fetchProducts({ limit: 100 });
    if (res.products && res.products.length > 0) {
      const activeProducts = res.products.filter((p: any) => p.isActive !== false);
      const newArrivals = activeProducts.filter((p) => p.badge === 'NEW');
      const bestSellers = activeProducts.filter(
        (p) => p.badge === 'BESTSELLER' || p.reviewCount > 90 || p.rating >= 4.7
      );
      const onSale = activeProducts.filter(
        (p) => p.badge === 'SALE' || (p.originalPrice && p.originalPrice > p.price)
      );

      return {
        newArrivals: newArrivals.length > 0 ? newArrivals.slice(0, 8) : activeProducts.slice(0, 8),
        bestSellers: bestSellers.length > 0 ? bestSellers.slice(0, 3) : activeProducts.slice(0, 3),
        onSale: onSale.length > 0 ? onSale.slice(0, 8) : activeProducts.slice(0, 8),
      };
    }
  } catch (error) {
    console.warn('[API Client] Failed to fetch featured products, using local fallback', error);
  }

  const activeProducts = PRODUCTS.filter((p) => (p as any).isActive !== false);
  return {
    newArrivals: activeProducts.filter((p) => p.badge === 'NEW').slice(0, 8),
    bestSellers: activeProducts.filter((p) => p.badge === 'BESTSELLER' || p.reviewCount > 90).slice(0, 3),
    onSale: activeProducts.filter((p) => p.badge === 'SALE' || (p.originalPrice && p.originalPrice > p.price)).slice(0, 6),
  };
}

/**
 * Submit Order to Backend MongoDB
 */
export async function createOrderApi(orderData: any): Promise<{
  success: boolean;
  order?: any;
  message?: string;
  source?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('[API Client] Failed to create order on backend:', error);
    return { success: false, message: error.message || 'Network connection failed' };
  }
}

/**
 * Query real-time tracking from Backend
 */
export async function trackOrderApi(trackingNumber: string): Promise<{
  success: boolean;
  tracking?: any;
  message?: string;
}> {
  try {
    const clean = trackingNumber.trim();
    const res = await fetch(`${API_BASE}/orders/track/${encodeURIComponent(clean)}`, {
      cache: 'no-store',
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to connect to tracking service' };
  }
}

/**
 * Validate Promotional Coupon against Backend
 */
export async function validateCouponApi(code: string, subtotal: number): Promise<{
  success: boolean;
  coupon?: any;
  message: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    // Local fallback check
    const cleanCode = code.trim().toUpperCase();
    const match = VALID_COUPONS.find((c) => c.code === cleanCode);
    if (match) {
      let discountAmount = 0;
      if (match.discountType === 'percentage') {
        discountAmount = (subtotal * match.discountValue) / 100;
      } else {
        discountAmount = match.discountValue;
      }
      return {
        success: true,
        message: match.description,
        coupon: {
          code: match.code,
          discountAmount,
          finalSubtotal: Math.max(0, subtotal - discountAmount),
        },
      };
    }
    return { success: false, message: 'Invalid or expired promotional code' };
  }
}

/**
 * Fetch Product Customer Reviews
 */
export async function fetchProductReviews(productId: string): Promise<{
  success: boolean;
  reviews: any[];
  averageRating: number;
  totalReviews: number;
}> {
  try {
    const res = await fetch(`${API_BASE}/reviews/product/${productId}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn('[API Client] Failed to fetch product reviews', error);
  }

  return { success: true, reviews: [], averageRating: 5.0, totalReviews: 0 };
}