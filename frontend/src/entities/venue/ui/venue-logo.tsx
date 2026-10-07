import { cn } from 'cn';

import { VENUE } from '../model/venue';

type VenueLogoProps = {
  className?: string;
};

export function VenueLogo({ className }: VenueLogoProps) {
  return (
    <span
      className={cn(
        'text-lg leading-none font-semibold tracking-[-0.03em] uppercase',
        className,
      )}
    >
      {VENUE.name}
    </span>
  );
}
