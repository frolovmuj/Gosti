'use client';

import { useLayoutEffect, useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { VENUE } from '@entities/venue';

import { EASE_OUT_EXPO, ROUTES } from '@shared/config';

const TITLE_LETTERS = Array.from(VENUE.name);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // <Activity> скрывает страницу через display: none, а видео при этом
  // продолжает играть — ставим на паузу при скрытии и запускаем при показе.
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.play().catch(() => undefined);
    }
    return () => video.pause();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-svh min-h-[36rem] flex-col overflow-hidden bg-media text-media-foreground"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ y: backdropY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE_OUT_EXPO }}
        >
          <Image
            src="/hero/poster.jpg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-media/60 via-media/10 to-media/80" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex flex-1 flex-col justify-end px-3 pt-20 sm:px-4"
      >
        <motion.div
          className="grid grid-cols-2 items-end gap-6 sm:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="max-w-56 text-xs leading-snug font-semibold uppercase">
            {VENUE.tagline}
          </p>
          <Link
            href={ROUTES.menu}
            className="group hidden items-center gap-2 justify-self-center text-xs font-semibold uppercase sm:flex"
          >
            К меню
            <ArrowDownIcon
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </Link>
          <p className="justify-self-end text-right mono-label leading-relaxed text-media-foreground/80">
            {VENUE.city}, {VENUE.address}
            <br />
            {VENUE.openingHours}
          </p>
        </motion.div>

        <h1 className="mt-4 -mb-[0.04em] text-center text-[27vw] leading-[0.8] font-semibold tracking-[-0.06em] uppercase">
          <span className="sr-only">{VENUE.name}</span>
          <span aria-hidden className="flex justify-center">
            {TITLE_LETTERS.map((letter, index) => (
              <span key={`${letter}-${index}`} className="overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1.1,
                    delay: 0.3 + index * 0.06,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>
      </motion.div>
    </section>
  );
}
