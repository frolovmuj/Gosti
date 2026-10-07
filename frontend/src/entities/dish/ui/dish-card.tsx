import Image from 'next/image';

import { formatPrice } from '@shared/lib/format-price';

import { DISH_CATEGORY_LABELS, type Dish } from '../model/dish';

type DishCardProps = {
  dish: Dish;
  /** Порядковый номер в списке, начиная с 1. */
  index: number;
};

export function DishCard({ dish, index }: DishCardProps) {
  return (
    <article className="group flex h-full flex-col gap-4 p-3 sm:p-4">
      <div className="flex justify-between mono-label text-muted-foreground">
        <span className="tabular-nums">{String(index).padStart(2, '0')}</span>
        <span>{DISH_CATEGORY_LABELS[dish.category]}</span>
      </div>

      <div className="relative aspect-3/4 overflow-hidden bg-muted">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5">
        <h3 className="text-sm leading-snug font-semibold uppercase">{dish.name}</h3>
        <span className="text-right font-mono text-sm leading-snug font-medium whitespace-nowrap tabular-nums">
          {formatPrice(dish.price)}
        </span>
        <p className="text-sm leading-snug text-muted-foreground">
          {dish.description}
        </p>
        <span className="text-right font-mono text-sm leading-snug whitespace-nowrap text-muted-foreground tabular-nums">
          {dish.portion}
        </span>
      </div>
    </article>
  );
}
