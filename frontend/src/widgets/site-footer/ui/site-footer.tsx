import type { ReactNode } from 'react';

import { ArrowUpRightIcon } from 'lucide-react';

import { VENUE } from '@entities/venue';

type FooterCellProps = {
  label: string;
  children: ReactNode;
};

function FooterCell({ label, children }: FooterCellProps) {
  return (
    <div className="flex min-h-36 flex-col justify-between gap-10 border-b p-3 sm:min-h-44 sm:p-4 sm:odd:border-r lg:border-r lg:last:border-r-0">
      <dt className="mono-label text-muted-foreground">({label})</dt>
      <dd className="text-lg leading-snug font-medium">{children}</dd>
    </div>
  );
}

const linkClassName =
  'group inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:underline';

export function SiteFooter() {
  return (
    <footer className="border-t">
      <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
        <FooterCell label="Адрес">
          {VENUE.city}, {VENUE.region}
          <br />
          {VENUE.address}
        </FooterCell>
        <FooterCell label="Часы работы">{VENUE.openingHours}</FooterCell>
        <FooterCell label="Предзаказ">
          <a href={VENUE.phone.href} className={linkClassName}>
            {VENUE.phone.label}
          </a>
        </FooterCell>
        <FooterCell label="ВКонтакте">
          <a
            href={VENUE.vk.href}
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            {VENUE.vk.label}
            <ArrowUpRightIcon
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </FooterCell>
      </dl>

      <div className="flex justify-between gap-4 px-3 pt-4 mono-label text-muted-foreground sm:px-4">
        <span>© {VENUE.name}</span>
        <span>
          {VENUE.format} · {VENUE.city}
        </span>
      </div>

      <p
        aria-hidden
        className="overflow-hidden px-2 text-center text-[27vw] leading-[0.78] font-semibold tracking-[-0.06em] uppercase select-none"
      >
        {VENUE.name}
      </p>
    </footer>
  );
}
