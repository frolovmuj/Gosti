/**
 * МОКИ авторизации: бекенда пока нет, SMS не отправляются,
 * а запросы только имитируют задержку сети.
 */

const NETWORK_DELAY_MS = 900;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function requestSmsCode(phone: string): Promise<{ sentTo: string }> {
  await wait(NETWORK_DELAY_MS);
  return { sentTo: phone };
}

/** Подходит любой код из 4 цифр. */
export async function verifySmsCode(code: string): Promise<{ isValid: boolean }> {
  await wait(NETWORK_DELAY_MS);
  return { isValid: /^\d{4}$/.test(code) };
}

export async function signInWithYandexId(): Promise<void> {
  await wait(NETWORK_DELAY_MS);
}
