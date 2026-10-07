export type Venue = {
  name: string;
  tagline: string;
  format: string;
  city: string;
  region: string;
  address: string;
  openingHours: string;
  phone: {
    label: string;
    href: string;
  };
  vk: {
    label: string;
    href: string;
  };
};

export const VENUE: Venue = {
  name: 'Гости',
  tagline: 'Кулинария, куда хочется возвращаться',
  format: 'Кулинария',
  city: 'Павловск',
  region: 'Воронежская область',
  address: 'проспект Революции, 100е',
  openingHours: 'Открыто с 8:00 до 20:00',
  phone: {
    label: '+7 966 928-32-60',
    href: 'tel:+79669283260',
  },
  vk: {
    label: 'vk.ru/kulinargosty',
    href: 'https://vk.ru/kulinargosty',
  },
};
