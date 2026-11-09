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

  // Sync image when variant changes
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
      message: 'Thank you for sharing your experience.',
    });
  };

  // Related products from same or adjacent category
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-brand-border/60 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-brand-muted">
          <Link href="/" className="hover:text-brand-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
          <Link href="/shop" className="hover:text-brand-forest transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-brand-forest transition-colors"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
          <span className="text-brand-charcoal font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Product Gallery (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Primary Image Viewport with 4:5 Aspect Ratio */}
              <div className="relative aspect-product w-full rounded-2xl overflow-hidden bg-white border border-brand-border shadow-subtle group">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Lightbox / Zoom Trigger */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 text-brand-charcoal hover:bg-white hover:text-brand-forest transition-all shadow-md backdrop-blur-sm"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Badge Overlay */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-brand-forest text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-pill shadow-sm">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-product rounded-card overflow-hidden bg-white border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-forest ring-1 ring-brand-forest'
                        : 'border-brand-border/70 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} perspective ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Information, Variants & Purchase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                  <span className="uppercase tracking-widest font-semibold text-brand-forest">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1 hover:text-brand-forest transition-colors"
                      title="Share product"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium tracking-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-brand-muted mt-1.5 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Star Rating & Reviews */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center text-brand-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-brand-charcoal">
                    {product.rating}
                  </span>
                  <span className="text-xs text-brand-muted">&bull;</span>
                  <a
                    href="#reviews-section"
                    className="text-xs text-brand-forest hover:underline font-medium"
                  >
                    {localReviews.length} verified reviews
                  </a>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-6 pb-6 border-b border-brand-border/70">
                  <span className="text-3xl font-bold text-brand-forest">
                    {formatPrice(unitPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-brand-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-brand-sale bg-brand-forest-light px-2.5 py-1 rounded-pill">
                      Save {discountPercent}%
                    </span>
                  )}
                  <span className="text-xs text-brand-muted ml-auto font-medium">
                    Taxes calculated at checkout
                  </span>
                </div>

                {/* Stock Availability Pill */}
                <div className="mt-5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse" />
                    <span className="font-semibold text-brand-charcoal">
                      In Stock &mdash; Only {product.stockQuantity} items remaining
                    </span>
                  </div>
                  <span className="text-brand-muted">Ships within 24 hours</span>
                </div>

                {/* Variant Selector */}
                {product.variants.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-xs mb-2.5">
                      <span className="font-semibold text-brand-charcoal uppercase tracking-wider">
                        Finishing / Color:
                      </span>
                      <span className="text-brand-forest font-semibold">
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
                              ? 'border-brand-forest bg-brand-forest-light font-semibold text-brand-forest ring-1 ring-brand-forest'
                              : 'border-brand-border bg-white text-brand-charcoal hover:border-brand-forest/60'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: v.value }}
                          />
                          <span>{v.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart Actions */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-brand-border rounded-btn bg-white shadow-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-3 text-brand-charcoal hover:bg-background-subtle rounded-l-btn text-xs font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-xs font-semibold text-brand-charcoal">
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
                      className="flex-1 py-3.5 px-6 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-float flex items-center justify-center gap-2"
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-4 h-4 text-brand-success" />
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
                          : 'border-brand-border bg-white text-brand-charcoal hover:border-brand-sale hover:text-brand-sale'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Buy Now Direct Button */}
                  <Link
                    href="/checkout"
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                    className="w-full flex items-center justify-center py-3.5 px-6 rounded-btn bg-brand-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest transition-colors"
                  >
                    Instant Buy Now &bull; Express Checkout
                  </Link>
                </div>

                {/* Direct-From-Atelier Delivery Guarantee Box */}
                <div className="mt-8 p-4 rounded-card bg-white border border-brand-border space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-brand-charcoal">
                        Direct Atelier Dispatch &mdash; {product.estimatedDelivery}
                      </h4>
                      <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed">
                        Flown directly from our verified atelier partner. Includes end-to-end tracked courier transport.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-brand-border/60">
                    <ShieldCheck className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-brand-charcoal">
                        30-Day In-Home Trial Guarantee
                      </h4>
                      <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed">
                        Live with the object in your natural light. Complete refund with complimentary return pickup if unsatisfied.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Tabs Section: Details, Specifications, Materials, Dropship Logistics */}
      <section className="mt-16 sm:mt-24 pt-12 border-t border-brand-border/60 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-brand-border overflow-x-auto scrollbar-none">
            {[
              { id: 'details', label: 'The Editorial Story' },
              { id: 'specs', label: 'Specifications & Dimensions' },
              { id: 'shipping', label: 'Direct Dropship & Delivery' },
              { id: 'care', label: 'Care & Maintenance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-brand-forest text-brand-forest'
                    : 'border-transparent text-brand-muted hover:text-brand-charcoal'
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
                <h3 className="font-serif text-xl text-brand-charcoal">
                  Crafted for Considered Living
                </h3>
                <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                  {product.description}
                </p>
                {product.editorialStory && (
                  <p className="text-sm text-brand-charcoal/80 leading-relaxed italic bg-background p-4 rounded-card border-l-2 border-brand-gold">
                    &ldquo;{product.editorialStory}&rdquo;
                  </p>
                )}
                <div className="pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-forest mb-2">
                    Key Architectural Features
                  </h4>
                  <ul className="space-y-2 text-xs text-brand-charcoal/80">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-forest shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-2xl animate-fadeIn">
                <h3 className="font-serif text-xl text-brand-charcoal">
                  Dimensions & Structural Build
                </h3>
                <div className="divide-y divide-brand-border text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-muted font-medium">Dimensions</span>
                    <span className="text-brand-charcoal font-semibold">{product.details.dimensions}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-muted font-medium">Net Weight</span>
                    <span className="text-brand-charcoal font-semibold">{product.details.weight}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-muted font-medium">Atelier Origin</span>
                    <span className="text-brand-charcoal font-semibold">{product.details.origin}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-muted font-medium">Materials</span>
                    <span className="text-brand-charcoal font-semibold">{product.details.materials.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 max-w-3xl animate-fadeIn">
                <h3 className="font-serif text-xl text-brand-charcoal">
                  Direct Dropship Delivery Logistics
                </h3>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                  To eliminate sitting warehouse stock and intermediary handling damage, this object is packed directly in our partner atelier in {product.details.origin}.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 rounded-card bg-background border border-brand-border">
                    <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">Lead Time</span>
                    <p className="text-xs font-semibold text-brand-charcoal mt-0.5">24 Hours Inspection</p>
                  </div>
                  <div className="p-3.5 rounded-card bg-background border border-brand-border">
                    <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">Estimated Transit</span>
                    <p className="text-xs font-semibold text-brand-charcoal mt-0.5">{product.estimatedDelivery}</p>
                  </div>
                  <div className="p-3.5 rounded-card bg-background border border-brand-border">
                    <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">Customs & Duties</span>
                    <p className="text-xs font-semibold text-brand-success mt-0.5">100% Pre-Paid (DDP)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 max-w-2xl animate-fadeIn">
                <h3 className="font-serif text-xl text-brand-charcoal">
                  Material Longevity & Care Instructions
                </h3>
                <ul className="space-y-2.5 text-xs text-brand-charcoal/80">
                  {product.details.careInstructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-2">
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

      {/* Customer Reviews Section */}
      <section id="reviews-section" className="mt-16 py-16 bg-background border-t border-brand-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-border gap-4">
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
                Customer Testimonials
              </span>
              <h2 className="font-serif text-2xl text-brand-charcoal mt-1">
                Verified Collector Reviews ({localReviews.length})
              </h2>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-2.5 rounded-btn bg-brand-forest hover:bg-brand-forest-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="divide-y divide-brand-border pt-6">
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
                        <span className="text-[10px] bg-brand-forest-light text-brand-forest px-2 py-0.5 rounded font-medium">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-brand-muted">{rev.date}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-brand-charcoal mt-1">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-brand-charcoal/80 mt-1 leading-relaxed">
                    {rev.comment}
                  </p>
                  {rev.variantPurchased && (
                    <p className="text-[10px] text-brand-muted mt-2">
                      Color / Variant: {rev.variantPurchased}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="py-16 bg-white border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-brand-border">
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-brand-forest">
                Harmonious Living
              </span>
              <h2 className="font-serif text-2xl text-brand-charcoal mt-1">
                Complementary Curations
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-brand-forest hover:underline"
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

      {/* Mobile Sticky Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-brand-border p-3 z-30 flex items-center justify-between gap-3 shadow-float">
        <div>
          <span className="text-xs font-bold text-brand-forest block">
            {formatPrice(unitPrice)}
          </span>
          <span className="text-[10px] text-brand-muted line-clamp-1 max-w-[120px]">
            {selectedVariant.name}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className="flex-1 max-w-[180px] py-2.5 px-4 rounded-btn bg-brand-forest text-white text-xs font-semibold uppercase tracking-wider text-center"
          >
            Add to Bag
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-btn border ${
              isFavorited ? 'border-brand-sale text-brand-sale' : 'border-brand-border text-brand-charcoal'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
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

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm">
          <div className="bg-white rounded-card p-6 max-w-md w-full border border-brand-border shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center pb-3 border-b border-brand-border">
              <h3 className="font-serif text-lg text-brand-charcoal">Write a Review</h3>
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
                  className="w-full text-xs p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-btn border border-brand-border"
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
                  placeholder="e.g. Beautiful stone finish and warm light"
                  className="w-full text-xs p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">Review</label>
                <textarea
                  required
                  rows={4}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the build quality, tactile feel, and light output in your home..."
                  className="w-full text-xs p-2.5 rounded-btn border border-brand-border"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-btn bg-brand-forest text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-forest-hover transition-colors"
              >
                Submit Collector Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

