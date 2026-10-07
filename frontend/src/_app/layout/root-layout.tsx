import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from 'next/font/google';

import { VENUE } from '@entities/venue';

import '../styles/globals.css';
import { Providers } from './providers';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'cyrillic'],
  style: ['normal', 'italic'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: VENUE.name,
    template: `%s | ${VENUE.name}`,
  },
  description: VENUE.tagline,
};

type RootLayoutProps = {
  children: ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${cormorant.variable} ${plexMono.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
