import type { Metadata } from 'next';

import { MOCK_DISHES } from '@entities/dish';

import { LiveFrame } from './live-frame';
import { LiveHero } from './live-hero';
import { LiveMenu } from './live-menu';
import { LiveStory } from './live-story';
import { LiveContacts } from './live-contacts';
import { LiveRibbon } from './live-ribbon';

import './motion.css';

export const metadata: Metadata = {
  title: 'Гости — в движении · Ресторанная концепция',
  description:
    'Интерактивная ресторанная концепция «Гости». Демонстрационные меню и предварительный выбор блюд.',
  robots: { index: false, follow: false },
};

export function ConceptMotionPage() {
  const previewIds = [
    'borscht',
    'chicken-mushroom-salad',
    'cheese-flatbread',
    'pirozhok-apple',
    'solyanka',
    'lingonberry-mors',
  ];
  const dishes = [
    ...previewIds.flatMap((id) => MOCK_DISHES.filter((dish) => dish.id === id)),
    ...MOCK_DISHES.filter((dish) => !previewIds.includes(dish.id)),
  ];
  return (
    <LiveFrame>
      <main id="wow-main" tabIndex={-1}>
        <LiveHero />
        <LiveRibbon />
        <LiveMenu dishes={dishes} />
        <LiveStory />
        <LiveContacts />
      </main>
    </LiveFrame>
  );
}
