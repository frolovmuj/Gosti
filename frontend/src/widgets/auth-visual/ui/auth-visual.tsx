'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { VENUE, VenueLogo } from '@entities/venue';

import { EASE_OUT_EXPO, ROUTES } from '@shared/config';

export function AuthVisual() {
  return (
    <aside className="relative isolate flex min-h-[42svh] flex-col justify-between overflow-hidden bg-media p-3 text-media-foreground sm:p-4 lg:sticky lg:top-0 lg:h-svh">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE_OUT_EXPO }}
      >
        <Image
          src="/auth/spread.jpg"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-media/50 via-transparent to-media/60"
      />

      <div className="flex items-start justify-between gap-6">
        <Link href={ROUTES.home} aria-label="На главную">
          <VenueLogo />
        </Link>
        <p className="text-right text-xs leading-snug font-semibold uppercase">
          {VENUE.format}
          <br />
          {VENUE.city}, {VENUE.region}
        </p>
      </div>

      <div className="flex items-end justify-between gap-6 mono-label">
        <span>{VENUE.address}</span>
        <span className="text-right">{VENUE.openingHours}</span>
      </div>
    </aside>
  );
}
