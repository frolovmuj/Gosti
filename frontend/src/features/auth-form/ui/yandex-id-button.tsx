'use client';

import { useState } from 'react';

import { ArrowUpRightIcon, Loader2Icon } from 'lucide-react';

import { signInWithYandexId } from '@shared/api';

import { YandexLogo } from './yandex-logo';

type YandexIdButtonProps = {
  onSignedIn: () => void;
};

export function YandexIdButton({ onSignedIn }: YandexIdButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    await signInWithYandexId();
    setIsPending(false);
    onSignedIn();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-busy={isPending}
      className="group flex h-14 w-full items-center gap-3 border px-4 text-left transition-colors duration-300 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none"
    >
      <YandexLogo className="size-6 shrink-0" />
      <span className="flex-1 text-xs font-semibold uppercase">
        Войти с Яндекс ID
      </span>
      <span className="hidden mono-label text-muted-foreground sm:inline">
        Без SMS
      </span>
      {isPending ? (
        <Loader2Icon aria-hidden className="size-4 animate-spin" />
      ) : (
        <ArrowUpRightIcon
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </button>
  );
}
