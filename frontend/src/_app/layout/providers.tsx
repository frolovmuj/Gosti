'use client';

import type { ReactNode } from 'react';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@shared/ui/sonner';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
