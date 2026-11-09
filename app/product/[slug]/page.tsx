'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
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
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { REVIEWS } from '@/data/reviews';
import { Product, ProductVariant, Review } from '@/types/product';
import { formatPrice, calculateDiscount, formatDate } from '@/lib/utils';
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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping' | 'care'>('details');

  // Review modal state
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
    setTimeout(() => setIsAdding(false), 800);
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
      title: newReviewTitle || 'Exceptional craftsmanship',
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
      title: 'Review Published',
      message: 'Thank you for contributing to the archive.',
    });
  };

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-black/[0.06] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-brand-muted">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/40" />
          <Link href="/shop" className="hover:text-black transition-colors">
            Archive
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/40" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-black transition-colors"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/40" />
          <span className="text-black font-semibold truncate max-w-[200px]">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Showcase */}
      <section className="pt-8 sm:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Gallery (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-product w-full rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-subtle group">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 text-brand-charcoal hover:bg-white hover:text-black transition-all shadow-md backdrop-blur-sm"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black text-white text-[9px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-pill shadow-xs">
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
                    className={`relative aspect-product rounded-card overflow-hidden bg-white border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-black ring-1 ring-black shadow-xs'
                        : 'border-black/[0.08] opacity-70 hover:opacity-100'
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

            {/* Information & Purchase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Category & Share */}
                <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                  <span className="uppercase tracking-[0.18em] font-bold text-brand-gold text-[10px]">
                    {product.categoryLabel}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 hover:text-black transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">Share</span>
                  </button>
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-normal tracking-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed font-normal">
                  {product.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3.5">
                  <div className="flex items-center text-brand-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-black font-mono">
                    {product.rating}
                  </span>
                  <span className="text-xs text-brand-muted">&bull;</span>
                  <a
                    href="#reviews-section"
                    className="text-xs text-brand-charcoal hover:underline font-medium"
                  >
                    {localReviews.length} verified reviews
                  </a>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-6 pb-6 border-b border-black/[0.06]">
                  <span className="text-3xl font-bold text-black font-mono">
                    {formatPrice(unitPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-brand-muted line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-[10px] font-bold text-brand-sale bg-brand-forest-light px-2.5 py-1 rounded-pill uppercase tracking-wider">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Stock Availability */}
                <div className="mt-5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
                    <span className="font-semibold text-brand-charcoal">
                      In Stock &mdash; Only {product.stockQuantity} items remaining
                    </span>
                  </div>
                  <span className="text-[11px] text-brand-muted font-mono">Dispatches in 24h</span>
                </div>

                {/* Variant Swatches */}
                {product.variants.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-xs mb-2.5">
                      <span className="font-bold text-brand-gold uppercase tracking-[0.16em] text-[10px]">
                        Finishing:
                      </span>
                      <span className="text-black font-semibold">
                        {selectedVariant.name}
                        {selectedVariant.priceModifier ? ` (+${formatPrice(selectedVariant.priceModifier)})` : ''}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => handleVariantSelect(v)}
                          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-btn border transition-all text-xs ${
                            selectedVariant.id === v.id
                              ? 'border-black bg-white font-semibold text-black ring-1 ring-black shadow-xs'
                              : 'border-black/[0.1] bg-white text-brand-charcoal hover:border-black/50'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: v.value }}
                          />
                          <span>{v.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & CTA */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-black/[0.1] rounded-btn bg-white shadow-xs">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-3 text-brand-charcoal hover:bg-background-subtle rounded-l-btn text-xs font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-xs font-bold text-black font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-3 text-brand-charcoal hover:bg-background-subtle rounded-r-btn text-xs font-bold transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Bag CTA */}
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className="flex-1 py-3.5 px-6 rounded-btn bg-black hover:bg-black/90 text-white text-[11px] font-bold uppercase tracking-[0.18em] transition-all shadow-float flex items-center justify-center gap-2"
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-4 h-4 text-brand-gold" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Bag &bull; {formatPrice(totalPrice)}</span>
                        </>
                      )}
                    </button>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3.5 rounded-btn border transition-colors ${
                        isFavorited
                          ? 'border-brand-sale text-brand-sale bg-brand-sale/10'
                          : 'border-black/[0.1] bg-white text-brand-charcoal hover:border-brand-sale hover:text-brand-sale'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Buy Now Button */}
                  <Link
                    href="/checkout"
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                    className="w-full flex items-center justify-center py-3.5 px-6 rounded-btn bg-white border border-black/[0.12] hover:border-black text-black text-[11px] font-bold uppercase tracking-[0.18em] transition-colors shadow-xs"
                  >
                    Direct Checkout &bull; Instant Purchase
                  </Link>
                </div>

                {/* Guarantee Box */}
                <div className="mt-8 p-4 sm:p-5 rounded-card-lg bg-white border border-black/[0.08] space-y-3.5 shadow-subtle">
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-black">
                        Direct Atelier Dispatch &mdash; {product.estimatedDelivery}
                      </h4>
                      <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed font-normal">
                        Flown directly from our verified artisan partner. Includes real-time tracking waybill.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2.5 border-t border-black/[0.06]">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-black">
                        30-Day Living Home Trial
                      </h4>
                      <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed font-normal">
                        Live with the object in your home. Full refund with complimentary return pickup if unsatisfied.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Tabs */}
      <section className="mt-16 sm:mt-24 pt-12 border-t border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-black/[0.06] overflow-x-auto scrollbar-none">
            {[
              { id: 'details', label: 'The Editorial Story' },
              { id: 'specs', label: 'Dimensions & Specs' },
              { id: 'shipping', label: 'Direct Dropship Transit' },
              { id: 'care', label: 'Care & Maintenance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-6 text-xs font-bold uppercase tracking-[0.14em] transition-all whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-brand-muted hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="py-8">
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-3xl animate-fadeIn">
                <h3 className="font-serif text-2xl text-brand-charcoal">
                  Crafted for Considered Living
                </h3>
                <p className="text-sm text-brand-charcoal/80 leading-relaxed font-normal">
                  {product.description}
                </p>
                {product.editorialStory && (
                  <p className="text-sm text-brand-charcoal/80 leading-relaxed italic bg-background p-5 rounded-card-lg border-l-2 border-brand-gold">
                    &ldquo;{product.editorialStory}&rdquo;
                  </p>
                )}
                <div className="pt-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-2.5">
                    Architectural Highlights
                  </h4>
                  <ul className="space-y-2 text-xs text-brand-charcoal/80">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-2xl animate-fadeIn">
                <h3 className="font-serif text-2xl text-brand-charcoal">
                  Dimensions &amp; Build
                </h3>
                <div className="divide-y divide-black/[0.06] text-xs">
                  <div className="py-3 flex justify-between">
                    <span className="text-brand-muted font-medium">Dimensions</span>
                    <span className="text-black font-semibold font-mono">{product.details.dimensions}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-brand-muted font-medium">Weight</span>
                    <span className="text-black font-semibold font-mono">{product.details.weight}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-brand-muted font-medium">Atelier Origin</span>
                    <span className="text-black font-semibold">{product.details.origin}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-brand-muted font-medium">Materials</span>
                    <span className="text-black font-semibold">{product.details.materials.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 max-w-3xl animate-fadeIn">
                <h3 className="font-serif text-2xl text-brand-charcoal">
                  Direct Dropship Delivery Logistics
                </h3>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed font-normal">
                  To eliminate sitting warehouse inventory and handling damage, this object is packed directly in our partner atelier in {product.details.origin}.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-card-lg bg-background border border-black/[0.06]">
                    <span className="text-[9px] uppercase font-bold text-brand-gold tracking-[0.2em]">Lead Time</span>
                    <p className="text-xs font-semibold text-black mt-0.5">24h Inspection</p>
                  </div>
                  <div className="p-4 rounded-card-lg bg-background border border-black/[0.06]">
                    <span className="text-[9px] uppercase font-bold text-brand-gold tracking-[0.2em]">Estimated Transit</span>
                    <p className="text-xs font-semibold text-black mt-0.5">{product.estimatedDelivery}</p>
                  </div>
                  <div className="p-4 rounded-card-lg bg-background border border-black/[0.06]">
                    <span className="text-[9px] uppercase font-bold text-brand-gold tracking-[0.2em]">Customs</span>
                    <p className="text-xs font-semibold text-brand-success mt-0.5">100% Pre-Paid (DDP)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 max-w-2xl animate-fadeIn">
                <h3 className="font-serif text-2xl text-brand-charcoal">
                  Material Longevity &amp; Care
                </h3>
                <ul className="space-y-2.5 text-xs text-brand-charcoal/80">
                  {product.details.careInstructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-1" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews-section" className="mt-16 py-16 bg-background border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/[0.06] gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                Collector Testimonials
              </span>
              <h2 className="font-serif text-2xl text-brand-charcoal mt-1">
                Verified Collector Reviews ({localReviews.length})
              </h2>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-6 py-2.5 rounded-btn bg-black hover:bg-black/90 text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shadow-xs"
            >
              Write a Review
            </button>
          </div>

          <div className="divide-y divide-black/[0.06] pt-6">
            {localReviews.length === 0 ? (
              <p className="text-xs text-brand-muted py-8 text-center">
                Be the first collector to review this object.
              </p>
            ) : (
              localReviews.map((rev) => (
                <div key={rev.id} className="py-6 first:pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-brand-gold">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-brand-charcoal">{rev.author}</span>
                      {rev.verifiedBuyer && (
                        <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-pill font-bold tracking-wider uppercase">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-brand-muted font-mono">{rev.date}</span>
                  </div>

                  <h4 className="font-serif text-sm font-medium text-brand-charcoal mt-1">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-brand-charcoal/80 mt-1 leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                  {rev.variantPurchased && (
                    <p className="text-[10px] text-brand-muted mt-2">
                      Finishing: {rev.variantPurchased}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Complementary Curations */}
      <section className="py-16 bg-white border-t border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-black/[0.06]">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                Harmonious Living
              </span>
              <h2 className="font-serif text-2xl text-brand-charcoal mt-1">
                Complementary Curations
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-brand-charcoal hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-black/[0.08] p-3.5 z-30 flex items-center justify-between gap-3 shadow-float">
        <div>
          <span className="text-xs font-bold text-black font-mono block">
            {formatPrice(unitPrice)}
          </span>
          <span className="text-[10px] text-brand-muted line-clamp-1 max-w-[120px]">
            {selectedVariant.name}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className="flex-1 max-w-[180px] py-2.5 px-4 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-wider text-center"
          >
            Add to Bag
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-btn border ${
              isFavorited ? 'border-brand-sale text-brand-sale' : 'border-black/[0.1] text-brand-charcoal'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10"
            aria-label="Close enlarged view"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl max-h-[85vh] aspect-product">
            <Image
              src={product.images[activeImageIndex]}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-card-lg p-7 max-w-md w-full border border-black/[0.1] shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center pb-3 border-b border-black/[0.06]">
              <h3 className="font-serif text-xl text-brand-charcoal">Write a Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)}>
                <X className="w-4 h-4 text-brand-muted" />
              </button>
            </div>
            <form onSubmit={handleAddReview} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Julian M."
                  className="w-full text-xs p-2.5 rounded-btn border border-black/[0.1]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-btn border border-black/[0.1]"
                >
                  <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                  <option value={4}>★★★★☆ (4 Stars - Great)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">Headline</label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Exquisite travertine veining"
                  className="w-full text-xs p-2.5 rounded-btn border border-black/[0.1]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">Review</label>
                <textarea
                  required
                  rows={4}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe your tactile impression and living experience..."
                  className="w-full text-xs p-2.5 rounded-btn border border-black/[0.1]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-btn bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-black/90 transition-colors shadow-sm"
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
