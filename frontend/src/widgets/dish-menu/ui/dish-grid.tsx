'use client';

import { useState } from 'react';

import { cn } from 'cn';
import { AnimatePresence, motion } from 'framer-motion';

import {
  DISH_CATEGORIES,
  DISH_CATEGORY_LABELS,
  type Dish,
  DishCard,
  type DishCategory,
} from '@entities/dish';

import { EASE_OUT_EXPO } from '@shared/config';
import { pluralize } from '@shared/lib/pluralize';

type Filter = DishCategory | 'all';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Всё меню' },
  ...DISH_CATEGORIES.map((category) => ({
    value: category,
    label: DISH_CATEGORY_LABELS[category],
  })),
];

type DishGridProps = {
  dishes: Dish[];
};

export function DishGrid({ dishes }: DishGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const visibleDishes =
    filter === 'all' ? dishes : dishes.filter((dish) => dish.category === filter);

  const countByFilter = (value: Filter) =>
    value === 'all'
      ? dishes.length
      : dishes.filter((dish) => dish.category === value).length;

  return (
    <>
      <div className="mt-16 flex items-stretch border-y sm:mt-24">
        <div
          role="group"
          aria-label="Категории меню"
          className="flex flex-1 [scrollbar-width:none] overflow-x-auto"
        >
          {FILTERS.map(({ value, label }) => {
            const isActive = value === filter;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(value)}
                className={cn(
                  'relative isolate flex h-12 shrink-0 items-start gap-1 border-r px-4 pt-[1.1rem] text-xs font-semibold uppercase transition-colors duration-300 outline-none focus-visible:bg-muted sm:px-5',
                  isActive
                    ? 'text-background'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="dish-filter-active"
                    className="absolute inset-0 -z-10 bg-foreground"
                    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  />
                )}
                {label}
                <span className="font-mono text-[0.625rem] leading-none font-medium tabular-nums">
                  {countByFilter(value)}
                </span>
              </button>
            );
          })}
        </div>
        <p
          className="hidden shrink-0 items-center border-l px-4 mono-label text-muted-foreground sm:flex sm:px-5"
          aria-live="polite"
        >
          {visibleDishes.length}{' '}
          {pluralize(visibleDishes.length, ['позиция', 'позиции', 'позиций'])}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={filter}
          className="grid sm:grid-cols-2 lg:grid-cols-3"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {visibleDishes.map((dish, index) => (
            <motion.li
              key={dish.id}
              className="border-b sm:border-r sm:even:border-r-0 lg:even:border-r lg:[&:nth-child(3n)]:border-r-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: (index % 3) * 0.06,
                ease: EASE_OUT_EXPO,
              }}
            >
              <DishCard dish={dish} index={index + 1} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </>
  );
}
