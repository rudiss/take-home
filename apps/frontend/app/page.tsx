import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { LandingPage } from './components/landing/landing-page';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();

const description =
  'Anvara is the sponsorship marketplace where brands discover premium placements and publishers monetize inventory—direct relationships, transparent pricing, and a smooth path from browse to booked.';

export const metadata: Metadata = {
  title: 'Anvara — Sponsorship marketplace for brands & publishers',
  description,
  keywords: [
    'sponsorship marketplace',
    'publisher advertising',
    'brand partnerships',
    'ad placements',
    'sponsors',
    'newsletter sponsorships',
    'podcast ads',
  ],
  authors: [{ name: 'Anvara' }],
  creator: 'Anvara',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Anvara',
    title: 'Anvara — Sponsorship marketplace for brands & publishers',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvara — Sponsorship marketplace for brands & publishers',
    description,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const landingFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Anvara',
        description,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Anvara',
        url: siteUrl,
        description,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={landingFont.className}>
        <LandingPage />
      </div>
    </>
  );
}
