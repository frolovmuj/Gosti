'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMotionPreferences } from '../model/motion-preferences';

export function LiveTableScene() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.3 });
  const { enabled } = useMotionPreferences();
  const draw = enabled && visible;
  return (
    <div ref={ref} className="wow-story-art" data-drawing={draw} aria-hidden>
      <span className="wow-story-art-caption">Рецепт хорошего вечера</span>
      <svg viewBox="0 0 480 340" fill="none" className="wow-table-drawing">
        <motion.ellipse
          cx="240"
          cy="167"
          rx="141"
          ry="145"
          initial={false}
          animate={{ pathLength: draw ? [0, 1] : 1 }}
          transition={{ duration: enabled ? 1.8 : 0, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="240"
          cy="167"
          rx="122"
          ry="126"
          initial={false}
          animate={{ pathLength: draw ? [0, 1] : 1 }}
          transition={{
            duration: enabled ? 1.5 : 0,
            delay: enabled ? 0.2 : 0,
            ease: 'easeInOut',
          }}
        />
        <motion.path
          d="M54 42v65q0 24 20 24t20-24V42M67 42v58m14-58v58m-7 31v165M421 42q-22 49-21 105h21V42Zm0 105v149"
          initial={false}
          animate={{ pathLength: draw ? [0, 1] : 1 }}
          transition={{
            duration: enabled ? 1.4 : 0,
            delay: enabled ? 0.3 : 0,
            ease: 'easeInOut',
          }}
        />
        <motion.path
          d="M192 272q46 13 92-1M194 59q46-15 84-1"
          initial={false}
          animate={{ pathLength: draw ? [0, 1] : 1 }}
          transition={{
            duration: enabled ? 1.1 : 0,
            delay: enabled ? 0.5 : 0,
            ease: 'easeInOut',
          }}
        />
      </svg>
      <div className="wow-story-art-type">
        <span>Еда.</span>
        <em>Люди.</em>
        <span>Разговоры.</span>
      </div>
      <span className="wow-story-art-bottom">Три простых ингредиента.</span>
    </div>
  );
}
