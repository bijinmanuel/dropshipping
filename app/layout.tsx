import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'NovaTrend | Discover Products You’ll Love | Trending Lifestyle Store',
  description: 'Shop the latest trending products curated for modern lifestyles. High quality apparel, footwear, wireless audio, smart wearables, and home lifestyle essentials.',
  keywords: ['trending products', 'lifestyle store', 'hoodies', 'sneakers', 'wireless headphones', 'smart watch', 'dropshipping', 'NovaTrend'],
  authors: [{ name: 'NovaTrend' }],
  openGraph: {
    title: 'NovaTrend | Discover Products You’ll Love',
    description: 'Shop the latest trending products curated for modern lifestyles.',
    url: 'https://novatrend.com',
    siteName: 'NovaTrend',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'VÉRDEN Living Objects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'OnlineStore',
              name: 'VÉRDEN Studio',
              description: 'Curated architectural lighting, ceramics, leather carry, and ergonomic furniture.',
              url: 'https://verden-design.com',
              logo: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=300&auto=format&fit=crop',
              currenciesAccepted: 'USD, EUR, GBP',
              paymentAccepted: 'Credit Card, Apple Pay, PayPal, Klarna',
              priceRange: '$$$',
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF9F5] text-brand-charcoal antialiased selection:bg-[#B88E4C] selection:text-white">
        <AppProviders>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
