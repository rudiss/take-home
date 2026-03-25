import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Nav } from './components/nav';
import { ThemeProvider } from './components/theme-provider';
import { ToastProvider, ToastContainer } from './components/toast';
import { getSiteUrl } from '@/lib/site-url';
import { layoutBody, layoutMain, skipLink } from './layout.styles';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const defaultDescription =
  'Sponsorship marketplace connecting sponsors with publishers—browse placements, book inventory, and grow partnerships.';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Anvara Marketplace',
    template: '%s | Anvara',
  },
  description: defaultDescription,
  applicationName: 'Anvara',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Anvara',
    title: 'Anvara Marketplace',
    description: defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvara Marketplace',
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className={layoutBody()} suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>
            <a href="#main-content" className={skipLink()}>
              Skip to content
            </a>
            <Nav />
            <main id="main-content" className={layoutMain()}>{children}</main>
            <ToastContainer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
