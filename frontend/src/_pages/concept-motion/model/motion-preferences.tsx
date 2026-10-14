'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useSyncExternalStore,
} from 'react';
import { MotionConfig } from 'framer-motion';

const query = '(prefers-reduced-motion: reduce)';
function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
}
const MotionPreferences = createContext({
  enabled: false,
  paused: false,
  systemReduced: true,
  toggle: () => {},
});

export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  const systemReduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );
  const [override, setOverride] = useState<boolean | null>(null);
  const enabled = override ?? !systemReduced;
  return (
    <MotionPreferences
      value={{
        enabled,
        paused: !enabled,
        systemReduced,
        toggle: () => setOverride(!enabled),
      }}
    >
      <MotionConfig reducedMotion={enabled ? 'never' : 'always'}>
        {children}
      </MotionConfig>
    </MotionPreferences>
  );
}

export const useMotionPreferences = () => useContext(MotionPreferences);
