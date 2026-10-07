export const DISH_CATEGORY_LABELS = {
  soups: 'Супы',
  salads: 'Салаты',
  bakery: 'Выпечка',
  drinks: 'Напитки',
} as const;

export type DishCategory = keyof typeof DISH_CATEGORY_LABELS;

export const DISH_CATEGORIES = Object.keys(DISH_CATEGORY_LABELS) as DishCategory[];

export type Dish = {
  id: string;
  name: string;
  description: string;
  category: DishCategory;
  /** Цена в рублях. */
  price: number;
  /** Вес или объём порции: «350 г», «500 мл». */
  portion: string;
  image: string;
};
