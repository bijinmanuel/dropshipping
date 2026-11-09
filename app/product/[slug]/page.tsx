'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  Lock,
  ChevronDown,
  Sparkles,
  Flame,
  Zap,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { REVIEWS } from '@/data/reviews';
import { Product, ProductVariant, Review } from '@/types/product';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping' | 'reviews'>('details');

  // Review state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>(
    REVIEWS.filter((r) => r.productId === product.id)
  );

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const unitPrice = product.price + (selectedVariant.priceModifier || 0);
  const totalPrice = unitPrice * quantity;

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    if (v.imageIndex !== undefined && product.images[v.imageIndex]) {
      setActiveImageIndex(v.imageIndex);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedVariant, quantity);
    showToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${quantity}x ${product.title} (${selectedVariant.name}) added to your bag.`,
    });
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Product URL copied to clipboard.',
      });
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      title: newReviewTitle || 'High quality product',
      comment: newReviewComment,
      verifiedBuyer: true,
      helpfulCount: 0,
      variantPurchased: selectedVariant.name,
    };

    setLocalReviews([newRev, ...localReviews]);
    setIsReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast({
      type: 'success',
      title: 'Review Submitted',
      message: 'Thank you for your feedback.',
    });
  };

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-black transition-colors"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-900 font-bold truncate max-w-[200px]">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-100 shadow-xs group">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-106"
                />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 text-gray-700 hover:bg-white hover:text-black transition-all shadow-md backdrop-blur-xs"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 transition-all flex items-center justify-center ${
                      activeImageIndex === idx
                        ? 'border-[#FF4D00] shadow-xs'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Purchase Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Category & Share */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="uppercase tracking-widest font-extrabold text-[#FF4D00] text-[11px]">
                    {product.categoryLabel}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 hover:text-black transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">Share</span>
                  </button>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight font-heading">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-3.5">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-900 font-mono">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {/* Scarcity Banner */}
                <div className="mt-4 p-3 rounded-2xl bg-orange-50 border border-orange-200/70 flex items-center gap-2.5 text-xs text-orange-950">
                  <Flame className="w-4 h-4 text-[#FF4D00] shrink-0 animate-pulse" />
                  <span>
                    <strong>High Demand:</strong> 18 customers are looking at this product right now.
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-gray-100 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-gray-950 font-heading">
                    {formatPrice(unitPrice)}
                  </span>
                  {product.originalPrice && product.originalPrice > unitPrice && (
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Variants Selector */}
                {product.variants.length > 0 && (
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-900">
                        {product.variants[0].type === 'color' ? 'Select Color' : 'Select Option'}:
                      </span>
                      <span className="text-gray-500 font-semibold">{selectedVariant.name}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => handleVariantSelect(variant)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                            selectedVariant.id === variant.id
                              ? 'border-black bg-black text-white shadow-xs'
                              : 'border-gray-200 bg-white text-gray-800 hover:border-black'
                          }`}
                        >
                          {variant.value && variant.value.startsWith('#') && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs"
                              style={{ backgroundColor: variant.value }}
                            />
                          )}
                          <span>{variant.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper & Stock */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 text-gray-700 hover:bg-gray-100 text-sm font-bold transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 py-2.5 text-gray-700 hover:bg-gray-100 text-sm font-bold transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>In Stock — Dispatched within 24 hours</span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className={`flex-1 py-3.5 px-6 rounded-full text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-md ${
                        isAdding
                          ? 'bg-emerald-600 text-white'
                          : 'bg-black hover:bg-[#FF4D00] text-white hover:shadow-lg'
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart • {formatPrice(totalPrice)}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3.5 rounded-full border transition-all ${
                        isFavorited
                          ? 'border-red-500 bg-red-50 text-red-500'
                          : 'border-gray-200 bg-white text-gray-400 hover:text-red-500 hover:border-red-200'
                      }`}
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] hover:from-[#E04400] hover:to-[#FF5500] text-white text-sm font-bold tracking-wide transition-all shadow-[0_10px_25px_-5px_rgba(255,77,0,0.4)] hover:shadow-[0_16px_35px_-5px_rgba(255,77,0,0.5)] flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Instant Checkout Now</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Truck className="w-4 h-4 text-[#FF4D00] shrink-0" />
                    <span><strong>Free Express Delivery</strong> on all orders over $50.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-[#FF4D00] shrink-0" />
                    <span><strong>30-Day Money Back Guarantee</strong> & hassle-free returns.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Lock className="w-4 h-4 text-[#FF4D00] shrink-0" />
                    <span><strong>Bank-Grade 256-bit Encryption</strong> for safe payments.</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs Section: Details, Specs, Shipping, Reviews */}
      <section className="mt-16 sm:mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-gray-100 pb-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'details', label: 'Overview & Story' },
              { id: 'specs', label: 'Technical Specs' },
              { id: 'shipping', label: 'Shipping & Delivery' },
              { id: 'reviews', label: `Reviews (${localReviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-sm font-bold pb-2 transition-all whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF4D00] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="pt-6">
            {activeTab === 'details' && (
              <div className="max-w-3xl space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>{product.description}</p>
                {product.editorialStory && (
                  <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 text-gray-800">
                    <p className="text-xs italic font-medium">&ldquo;{product.editorialStory}&rdquo;</p>
                  </div>
                )}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-[#FF4D00]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <div className="divide-y divide-gray-100 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Materials</span>
                    <span className="font-semibold text-gray-900 text-right">
                      {product.details.materials.join(', ')}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Dimensions</span>
                    <span className="font-semibold text-gray-900">{product.details.dimensions}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Weight</span>
                    <span className="font-semibold text-gray-900">{product.details.weight}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Dispatched From</span>
                    <span className="font-semibold text-gray-900">{product.details.origin}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-2xl space-y-3 text-xs text-gray-600 leading-relaxed">
                <p>
                  Orders are processed and packaged within 24 business hours. Fully tracked global dispatch with real-time tracking numbers emailed immediately upon dispatch.
                </p>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                  <p><strong>Standard Transit:</strong> 3-5 Business Days (US, EU, UK, Canada)</p>
                  <p><strong>Priority Air Express:</strong> 1-2 Business Days</p>
                  <p><strong>Tracking Number:</strong> Real-time carrier webhook updates</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Customer Feedback</h3>
                    <p className="text-xs text-gray-500">Real verified purchaser testimonials</p>
                  </div>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-5 py-2 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-100 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">{rev.author}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-gray-200 fill-current'}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-gray-900">{rev.title}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Grid */}
      <section className="mt-16 sm:mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight font-heading mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky Mobile Purchase Dock */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 sm:hidden z-30 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs text-gray-500 font-medium truncate max-w-[140px]">{product.title}</p>
          <p className="text-base font-extrabold text-gray-950">{formatPrice(unitPrice)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-2.5 px-4 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[85vh]">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-950 mb-1 font-heading">Leave a Review</h3>
            <p className="text-xs text-gray-500 mb-4">Share your experience with {product.title}</p>
            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                  placeholder="e.g. Alex Turner"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                >
                  <option value={5}>5 Stars - Outstanding</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Below Average</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Review Title</label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                  placeholder="e.g. Impressive materials and fit"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Comments</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black"
                  placeholder="Tell us what you liked about this item..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-black hover:bg-[#FF4D00] text-white font-bold transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
