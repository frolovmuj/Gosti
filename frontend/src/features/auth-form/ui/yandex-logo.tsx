type YandexLogoProps = {
  className?: string;
};

export function YandexLogo({ className }: YandexLogoProps) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden className={className}>
      <circle cx="22" cy="22" r="22" className="fill-yandex" />
      <path
        className="fill-yandex-foreground"
        d="M24.74 33.98h4.35V9.04h-6.33c-6.37 0-9.7 3.26-9.7 8.06 0 3.99 1.89 6.35 5.28 8.76l-5.87 8.12h4.71l6.54-9.17-2.27-1.53c-2.75-1.87-4.09-3.32-4.09-6.45 0-2.8 1.93-4.68 5.42-4.68h1.96v21.83Z"
      />
    </svg>
  );
}
