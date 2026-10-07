'use client';

import { type ReactNode, useLayoutEffect, useRef } from 'react';

import { animate } from 'framer-motion';

import { EASE_OUT_EXPO } from '@shared/config';

let hasRenderedFirstPage = false;

/** Первую страницу показывает SSR — анимируем только клиентские переходы. */
function isFirstPageRender() {
  const isFirst = !hasRenderedFirstPage;
  hasRenderedFirstPage = true;
  return isFirst;
}

type RootTemplateProps = {
  children: ReactNode;
};

export function RootTemplate({ children }: RootTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Эффект, а не initial/animate: страница из <Activity> показывается снова
  // без перемонтирования, и проявление должно повториться. Только opacity —
  // transform на обёртке сломал бы position: fixed у шапки.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || isFirstPageRender()) {
      return;
    }
    const animation = animate(
      container,
      { opacity: [0, 1] },
      { duration: 0.7, ease: EASE_OUT_EXPO },
    );
    return () => animation.stop();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
