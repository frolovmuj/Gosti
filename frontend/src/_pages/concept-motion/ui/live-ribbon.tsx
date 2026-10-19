'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionPreferences } from '../model/motion-preferences';

export function LiveRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreferences();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-12%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 90]);
  return (
    <div ref={ref} className="wow-ribbon" aria-hidden>
      <motion.div className="wow-ribbon-track" style={{ x: enabled ? x : '-4%' }}>
        <span>Любимые вкусы</span>
        <motion.span style={{ rotate: enabled ? rotate : 0 }}>✳</motion.span>
        <em>Близкие люди</em>
        <motion.span style={{ rotate: enabled ? rotate : 0 }}>✳</motion.span>
        <span>Простые радости</span>
        <motion.span style={{ rotate: enabled ? rotate : 0 }}>✳</motion.span>
      </motion.div>
    </div>
  );
}
