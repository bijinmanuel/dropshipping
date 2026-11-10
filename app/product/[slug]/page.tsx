import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductView } from '@/components/product/ProductView';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return PRODUCTS.filter((p) => (p as any).isActive !== false).map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | NovaTrend',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title} | NovaTrend`,
    description: product.subtitle || product.description,
    openGraph: {
      title: `${product.title} | NovaTrend`,
      description: product.subtitle || product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product || (product as any).isActive === false) {
    notFound();
  }

  return <ProductView product={product} slug={params.slug} />;
}
