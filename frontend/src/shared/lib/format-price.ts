const NBSP = '\u00a0';

/**
 * «1 250 ₽». Без Intl: строка должна совпадать на сервере и в браузере,
 * иначе разные версии ICU дают ошибку гидрации.
 */
export function formatPrice(rubles: number): string {
  const digits = Math.round(rubles)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);

  return `${digits}${NBSP}₽`;
}
