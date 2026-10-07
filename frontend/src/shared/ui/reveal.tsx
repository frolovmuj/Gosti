'use client';

import { type HTMLMotionProps, motion } from 'framer-motion';

import { EASE_OUT_EXPO } from '@shared/config';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
};

export function Reveal({ delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: EASE_OUT_EXPO }}
      {...props}
    />
  );
}
