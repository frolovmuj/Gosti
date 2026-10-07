import { MOCK_DISHES } from '@entities/dish';

import { SECTION_IDS } from '@shared/config';
import { Reveal } from '@shared/ui/reveal';

import { DishGrid } from './dish-grid';

export function DishMenu() {
  return (
    <section
      id={SECTION_IDS.menu}
      aria-labelledby="menu-title"
      className="scroll-mt-20 pt-28 pb-24 sm:pt-40 sm:pb-32"
    >
      <Reveal className="relative px-3 sm:px-4">
        <p className="mono-label text-muted-foreground">(Меню)</p>
        <h2
          id="menu-title"
          className="mt-6 text-[clamp(3rem,9.5vw,10rem)] leading-[0.86] font-semibold tracking-[-0.045em] uppercase"
        >
          <span className="block">Готовим</span>
          <span className="block text-right">каждое утро</span>
        </h2>
        <p className="mt-8 max-w-56 text-xs leading-snug font-semibold uppercase lg:absolute lg:bottom-[0.6vw] lg:mt-0">
          Супы, салаты и выпечка по домашним рецептам. С собой или в зале
        </p>
      </Reveal>

      <DishGrid dishes={MOCK_DISHES} />
    </section>
  );
}
