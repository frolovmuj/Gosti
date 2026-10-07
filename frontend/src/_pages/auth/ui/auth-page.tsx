import { ArrowLeftIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthVisual } from '@widgets/auth-visual';

import { AuthForm } from '@features/auth-form';
import { ThemeToggle } from '@features/theme-toggle';

import { ROUTES } from '@shared/config';
import { Reveal } from '@shared/ui/reveal';

export const metadata: Metadata = {
  title: 'Вход',
};

export function AuthPage() {
  return (
    <main className="grid min-h-svh flex-1 lg:grid-cols-[1.15fr_1fr]">
      <AuthVisual />

      <section className="flex flex-col lg:border-l">
        <div className="flex h-14 items-stretch border-b">
          <Link
            href={ROUTES.home}
            className="flex items-center gap-2 border-r px-3 mono-label text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-4"
          >
            <ArrowLeftIcon aria-hidden className="size-3.5" />
            На главную
          </Link>
          <div className="ml-auto flex items-center border-l px-2">
            <ThemeToggle className="rounded-none" />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-3 py-16 sm:px-4 lg:px-12">
          <div className="w-full max-w-md">
            <Reveal>
              <p className="mono-label text-muted-foreground">(Личный кабинет)</p>
              <h1 className="mt-6 text-[clamp(4rem,9vw,8rem)] leading-[0.86] font-semibold tracking-[-0.045em] uppercase">
                Вход
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <AuthForm />
            </Reveal>
          </div>
        </div>

        <p className="border-t px-3 py-4 text-xs leading-relaxed text-muted-foreground sm:px-4">
          Продолжая, вы соглашаетесь с условиями обработки персональных данных
        </p>
      </section>
    </main>
  );
}
