'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Plus, Search, X } from 'lucide-react';
import Image from 'next/image';

import {
  DISH_CATEGORIES,
  DISH_CATEGORY_LABELS,
  type Dish,
  type DishCategory,
} from '@entities/dish';

import { formatPrice } from '@shared/lib/format-price';

import { changeQuantity, useSelection } from '../model/use-selection';
import { LiveDishDialog } from './live-dish-dialog';
import { LiveQuantity } from './live-quantity';
import { LiveReveal } from './live-reveal';
import { useMotionPreferences } from '../model/motion-preferences';

export function LiveMenu({ dishes }: { dishes: Dish[] }) {
  const [category, setCategory] = useState<DishCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<Dish | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const { quantities } = useSelection();
  const { enabled } = useMotionPreferences();
  const reducedMotion = !enabled;
  const normalizedQuery = query.trim().toLocaleLowerCase('ru').replaceAll('ё', 'е');
  const filtered = dishes.filter(
    (dish) =>
      (category === 'all' || category === dish.category) &&
      `${dish.name} ${dish.description}`
        .toLocaleLowerCase('ru')
        .replaceAll('ё', 'е')
        .includes(normalizedQuery),
  );
  const visible =
    category === 'all' && !expanded && !normalizedQuery
      ? filtered.slice(0, 6)
      : filtered;

  return (
    <section
      id="wow-menu"
      className="wow-menu wow-container"
      aria-labelledby="wow-menu-title"
    >
      <LiveReveal className="wow-section-heading">
        <div>
          <p className="wow-eyebrow">01 / Знакомство с меню</p>
          <h2 id="wow-menu-title">
            Что вам <em>по душе?</em>
          </h2>
        </div>
        <p>
          От первого до чего-нибудь сладкого.
          <br />
          Выберите свой повод задержаться.
        </p>
      </LiveReveal>
      <div className="wow-menu-layout">
        <aside className="wow-menu-sidebar">
          <div className="wow-categories" role="group" aria-label="Категории меню">
            {(['all', ...DISH_CATEGORIES] as const).map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={value === category}
                onClick={() => {
                  setCategory(value);
                  setExpanded(false);
                }}
              >
                {value === category && (
                  <motion.i
                    className="wow-category-marker"
                    layoutId={enabled ? 'live-category' : undefined}
                    transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                    aria-hidden
                  />
                )}
                <span>
                  {value === 'all' ? 'Всё меню' : DISH_CATEGORY_LABELS[value]}
                </span>
                <span>
                  {String(
                    value === 'all'
                      ? dishes.length
                      : dishes.filter((dish) => dish.category === value).length,
                  ).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
          <div className="wow-menu-margin-note">
            <span aria-hidden>✳</span>
            <p>
              Выбирайте,
              <br />
              пробуйте,
              <br />
              <em>делитесь.</em>
            </p>
          </div>
          <p className="wow-menu-demo">
            Пример меню.
            <br />
            Состав и цены требуют подтверждения.
          </p>
        </aside>
        <div className="wow-menu-results">
          <div className="wow-menu-tools">
            <p role="status">
              Показано {visible.length} из {filtered.length}
            </p>
            <div className="wow-search">
              <Search size={16} aria-hidden />
              <input
                type="search"
                aria-label="Найти блюдо или ингредиент"
                placeholder="Блюдо или ингредиент"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="wow-search-clear"
                  aria-label="Очистить поиск"
                  onClick={() => setQuery('')}
                >
                  <X size={16} aria-hidden />
                </button>
              )}
            </div>
          </div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {visible.length ? (
                <ul className="wow-dish-grid">
                  {visible.map((dish, index) => (
                    <li key={dish.id}>
                      <LiveReveal
                        className="wow-dish-reveal"
                        delay={(index % 3) * 0.14}
                      >
                        <article className="wow-dish-card">
                          <button
                            type="button"
                            className="wow-dish-image"
                            aria-label={`Подробнее: ${dish.name}`}
                            onClick={() => {
                              setDetail(dish);
                              setDetailOpen(true);
                            }}
                          >
                            <Image
                              src={dish.image}
                              alt={dish.name}
                              fill
                              sizes="(max-width: 599px) 100px, (max-width: 1023px) 40vw, 25vw"
                            />
                            <span className="wow-dish-image-arrow" aria-hidden>
                              <ArrowUpRight size={20} />
                            </span>
                          </button>
                          <div className="wow-dish-info">
                            <div className="wow-dish-meta">
                              <span>{DISH_CATEGORY_LABELS[dish.category]}</span>
                              <span>{dish.portion}</span>
                            </div>
                            <h3>
                              <button
                                type="button"
                                onClick={() => {
                                  setDetail(dish);
                                  setDetailOpen(true);
                                }}
                              >
                                {dish.name}
                              </button>
                            </h3>
                            <p>{dish.description}</p>
                            <div className="wow-dish-bottom">
                              <strong>{formatPrice(dish.price)}</strong>
                              {quantities[dish.id] ? (
                                <LiveQuantity
                                  id={dish.id}
                                  name={dish.name}
                                  quantity={quantities[dish.id]}
                                />
                              ) : (
                                <button
                                  type="button"
                                  className="wow-add"
                                  aria-label={`Добавить: ${dish.name}`}
                                  onClick={() => {
                                    changeQuantity(dish.id, 1);
                                    setAnnouncement(
                                      `${dish.name} — добавлено к столу.`,
                                    );
                                  }}
                                >
                                  <Plus size={18} aria-hidden />
                                  <span>К столу</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </article>
                      </LiveReveal>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="wow-no-results">
                  <Search size={28} aria-hidden />
                  <h3>Пока ничего не нашлось</h3>
                  <p>Попробуйте другое название или выберите все категории.</p>
                  <button
                    type="button"
                    className="wow-text-link"
                    onClick={() => {
                      setQuery('');
                      setCategory('all');
                    }}
                  >
                    Сбросить поиск и фильтры <ArrowUpRight size={16} aria-hidden />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {visible.length < filtered.length && (
            <button
              type="button"
              className="wow-more"
              onClick={() => setExpanded(true)}
            >
              Посмотреть всё меню <span>Ещё {filtered.length - visible.length}</span>
              <ArrowDown size={18} aria-hidden />
            </button>
          )}
          <p className="wow-menu-disclaimer">
            Демонстрационные блюда и цены из проекта кулинарии. Изображения
            иллюстративные. Это меню ещё не подтверждено рестораном.
          </p>
        </div>
      </div>
      <p className="wow-sr-only" role="status">
        {announcement}
      </p>
      <LiveDishDialog
        dish={detail}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </section>
  );
}
