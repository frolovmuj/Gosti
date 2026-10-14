'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { useAnimate } from 'framer-motion';
import { Reveal } from '@shared/ui/reveal';
import { useMotionPreferences } from '../model/motion-preferences';

/** Enhance visible SSR content only after hydration; keyboard focus always wins. */
export function LiveReveal({
  children,
  className,
  delay = 0,
  'aria-hidden': ariaHidden,
}: {
  'children': ReactNode;
  'className'?: string;
  'delay'?: number;
  'aria-hidden'?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [, animate] = useAnimate();
  const { enabled } = useMotionPreferences();
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;
    element.style.opacity = '0';
    element.style.transform = 'translateY(48px)';
    element.dataset.revealState = 'waiting';
    let animation: ReturnType<typeof animate> | undefined;
    let revealed = false;
    const finish = () => {
      revealed = true;
      animation?.stop();
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.dataset.revealState = 'visible';
      observer.disconnect();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (revealed || !entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        element.dataset.revealState = 'animating';
        animation = animate(
          element,
          { opacity: [0, 1], y: [48, 0] },
          { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
        );
        void animation.then(() => {
          revealed = true;
          element.dataset.revealState = 'visible';
        });
      },
      { threshold: 0.08 },
    );
    const onFocus = (event: FocusEvent) => {
      // A pointer press must not move its target between mousedown and click.
      if (
        event.target instanceof HTMLElement &&
        event.target.matches(':focus-visible')
      )
        finish();
    };
    observer.observe(element);
    element.addEventListener('focusin', onFocus);
    return () => {
      observer.disconnect();
      element.removeEventListener('focusin', onFocus);
      animation?.stop();
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
      delete element.dataset.revealState;
    };
  }, [enabled, animate, delay]);
  return (
    <Reveal
      ref={ref}
      className={className}
      initial={false}
      whileInView={undefined}
      data-live-reveal
      aria-hidden={ariaHidden}
    >
      {children}
    </Reveal>
  );
}
