'use client';

import { useState } from 'react';

import { cn } from 'cn';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';

import { ThemeToggle } from '@features/theme-toggle';

import { VenueLogo } from '@entities/venue';

import { ROUTES } from '@shared/config';

const NAV_ITEMS = [
  { href: ROUTES.home, label: 'Главная' },
  { href: ROUTES.menu, label: 'Меню' },
];

type HeaderProps = {
  /** Шапка прозрачна, пока под ней полноэкранный hero. */
  overlay?: boolean;
};

export function Header({ overlay = false }: HeaderProps) {
  const { scrollY } = useScroll();
  const [isPastHero, setIsPastHero] = useState(false);

  useMotionValueEvent(scrollY, 'change', (offset) => {
    setIsPastHero(offset > window.innerHeight * 0.75);
  });

  const isTransparent = overlay && !isPastHero;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500',
        isTransparent
          ? 'border-transparent text-media-foreground'
          : 'border-border bg-background text-foreground',
      )}
    >
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-6 px-3 sm:px-4">
        <Link
          href={ROUTES.home}
          aria-label="На главную"
          className="justify-self-start"
        >
          <VenueLogo />
        </Link>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase opacity-70 transition-opacity hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="col-start-3 flex items-center gap-4 justify-self-end">
          <ThemeToggle
            className={cn(
              'size-8 rounded-none',
              isTransparent &&
                'hover:bg-media-foreground/10 hover:text-media-foreground dark:hover:bg-media-foreground/10',
            )}
          />
          <Link
            href={ROUTES.auth}
            className="text-xs font-semibold uppercase underline-offset-4 hover:underline"
          >
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
