export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'finish';
  value: string; // Color hex (e.g. #243D32) or size label (e.g. 'Standard', 'Large')
  inStock: boolean;
  priceModifier?: number;
  imageIndex?: number;
  supplierSku: string;
}

export interface ProductDetails {
  materials: string[];
  dimensions: string;
  weight: string;
  origin: string;
  careInstructions: string[];
}

export interface DropshipSupplierData {
  supplierId: string;
  supplierName: string;
  supplierSku: string;
  supplierCost: number;
  marginPercentage: number;
  markupMultiplier: number;
  fulfillmentCenter: string;
  countryOfOrigin: string;
  leadTimeHours: number;
  estimatedTransitDays: string;
  shippingCarriers: string[];
  stockSyncedAt: string;
  syncStatus: 'active' | 'syncing' | 'delayed';
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  editorialStory?: string;
  price: number;
  originalPrice?: number;
  category: 'lighting' | 'ceramics' | 'audio-tech' | 'leather-carry' | 'furniture' | 'wellness';
  categoryLabel: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  details: ProductDetails;
  features: string[];
  inStock: boolean;
  stockQuantity: number;
  badge?: 'NEW' | 'BESTSELLER' | 'SALE' | 'LIMITED';
  estimatedDelivery: string;
  dropship: DropshipSupplierData;
}

export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStockOnly?: boolean;
  sortBy?: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling';
  searchQuery?: string;
  tags?: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  variantPurchased?: string;
}

