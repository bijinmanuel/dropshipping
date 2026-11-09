import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'VÉRDEN Studio | Objects for Living | Curated Architectural Goods',
  description: 'A modern luxury design sanctuary of sculptural travertine lighting, wood-fired Japanese stoneware, Tuscan full-grain leather, and acoustic objects. Direct-from-artisan dropshipping with 30-day living trial.',
  keywords: ['luxury design', 'minimalist home decor', 'travertine lamps', 'stoneware tea sets', 'dropshipping', 'Japandi', 'D2C retail', 'Atelier Living'],
  authors: [{ name: 'VÉRDEN Studio' }],
  openGraph: {
    title: 'VÉRDEN Studio | Objects for Living',
    description: 'Curated architectural lighting, ceramics, and leather goods. Delivered directly from master ateliers.',
    url: 'https://verden-design.com',
    siteName: 'VÉRDEN Studio',
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
      <body className="min-h-screen flex flex-col bg-background text-brand-charcoal antialiased">
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
