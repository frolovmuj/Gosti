export const SECTION_IDS = {
  menu: 'menu',
} as const;

export const ROUTES = {
  home: '/',
  menu: `/#${SECTION_IDS.menu}`,
  auth: '/auth',
} as const;
