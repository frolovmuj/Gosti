'use client';

import { type ReactNode, useState } from 'react';

import {
  ArrowRight,
  ArrowUpRight,
  Moon,
  Sun,
  Utensils,
  Pause,
  Play,
} from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';

import { formatPrice } from '@shared/lib/format-price';

import { useSelection } from '../model/use-selection';
import {
  MotionPreferencesProvider,
  useMotionPreferences,
} from '../model/motion-preferences';
import { LiveSelection } from './live-selection';
import { LiveReveal } from './live-reveal';

export function LiveFrame({ children }: { children: ReactNode }) {
  return (
    <MotionPreferencesProvider>
      <LiveFrameContent>{children}</LiveFrameContent>
    </MotionPreferencesProvider>
  );
}

function LiveFrameContent({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [selectionOpen, setSelectionOpen] = useState(false);
  const { count, total } = useSelection();
  const { enabled, toggle } = useMotionPreferences();
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="wow-site"
      data-tone={dark ? 'dark' : 'light'}
      data-has-selection={count > 0}
      data-motion={enabled ? 'on' : 'off'}
    >
      <motion.div
        className="wow-scroll-progress"
        aria-hidden
        style={{ scaleX: enabled ? scrollYProgress : 0 }}
      />
      <a className="wow-skip" href="#wow-main">
        К содержимому
      </a>
      <div className="wow-topline wow-container">
        <span>Павловск · Воронежская область</span>
        <button
          type="button"
          className="wow-motion-toggle"
          onClick={toggle}
          aria-pressed={enabled}
          aria-label={enabled ? 'Приостановить анимации' : 'Включить анимации'}
        >
          {enabled ? 'Движение включено' : 'Включить движение'}
          {enabled ? (
            <Pause size={12} aria-hidden />
          ) : (
            <Play size={12} aria-hidden />
          )}
        </button>
      </div>
      <header className="wow-header">
        <div className="wow-container wow-header-inner">
          <a className="wow-logo" href="#wow-main" aria-label="Гости — в начало">
            гости<span aria-hidden>✳</span>
          </a>
          <nav aria-label="Основная навигация" className="wow-nav">
            <a href="#wow-menu">Меню</a>
            <a href="#wow-about">О концепции</a>
            <a href="#wow-contacts">Как нас найти</a>
          </nav>
          <button
            type="button"
            className="wow-header-selection"
            onClick={() => setSelectionOpen(true)}
            aria-label={`Открыть выбор, порций: ${count}`}
          >
            <Utensils size={16} aria-hidden /> К столу{' '}
            <span key={count} className="wow-count-pop">
              {count}
            </span>
          </button>
        </div>
      </header>
      {children}
      <LiveSelection open={selectionOpen} onClose={() => setSelectionOpen(false)} />
      {count > 0 && (
        <motion.button
          type="button"
          className="wow-selection-dock"
          onClick={() => setSelectionOpen(true)}
          aria-label={`Посмотреть выбор: ${count} порций, ${formatPrice(total)}`}
          initial={false}
          animate={enabled ? { y: [24, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }}
          transition={{ duration: enabled ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: '-50%' }}
        >
          <span key={count} className="wow-dock-count wow-count-pop">
            {count}
          </span>
          <span>
            К вашему столу<small>Предварительный выбор</small>
          </span>
          <strong>{formatPrice(total)}</strong>
          <ArrowRight size={19} aria-hidden />
        </motion.button>
      )}
      <footer className="wow-footer wow-container">
        <div className="wow-footer-intro">
          <span>
            Для долгих разговоров.
            <br />И простых радостей.
          </span>
          <a href="#wow-main">
            До новых встреч <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
        <LiveReveal className="wow-footer-word" aria-hidden>
          гости<span>✳</span>
        </LiveReveal>
        <div className="wow-footer-bottom">
          <span>© Гости · Дизайн-концепция</span>
          <div>
            <Link href="/concept-pro">Спокойная версия</Link>
            <Link href="/concept">Первая концепция</Link>
          </div>
          <button
            type="button"
            className="wow-theme"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            {dark ? 'Светлая тема' : 'Вечерний свет'}
          </button>
        </div>
      </footer>
    </div>
  );
}
