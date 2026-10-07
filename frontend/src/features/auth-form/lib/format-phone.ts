const COUNTRY_CODE = '+7';

/**
 * Маска «+7 999 123-45-67». Первая 7 или 8 считается кодом страны,
 * поэтому вставка «89991234567» и «+7 (999) 123-45-67» даёт один результат.
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  const hasCountryCode = value.startsWith(COUNTRY_CODE) || /^[78]/.test(digits);
  const local = (hasCountryCode ? digits.slice(1) : digits).slice(0, 10);

  return [
    COUNTRY_CODE,
    local.slice(0, 3) && ` ${local.slice(0, 3)}`,
    local.slice(3, 6) && ` ${local.slice(3, 6)}`,
    local.slice(6, 8) && `-${local.slice(6, 8)}`,
    local.slice(8, 10) && `-${local.slice(8, 10)}`,
  ].join('');
}
