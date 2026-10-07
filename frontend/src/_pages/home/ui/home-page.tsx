import { DishMenu } from '@widgets/dish-menu';
import { Header } from '@widgets/header';
import { Hero } from '@widgets/hero';
import { SiteFooter } from '@widgets/site-footer';

export function HomePage() {
  return (
    <>
      <Header overlay />
      <main className="flex-1">
        <Hero />
        <DishMenu />
      </main>
      <SiteFooter />
    </>
  );
}
