'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useMotionPreferences } from '../model/motion-preferences';

export function LiveHero() {
  const ref = useRef<HTMLElement>(null);
  const { enabled } = useMotionPreferences();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const sealRotate = useTransform(scrollYProgress, [0, 1], [12, 70]);
  const pointerX = useSpring(0, { stiffness: 90, damping: 25 });
  const pointerY = useSpring(0, { stiffness: 90, damping: 25 });
  return (
    <section
      ref={ref}
      className="wow-hero wow-container"
      aria-labelledby="wow-hero-title"
    >
      <div className="wow-hero-copy">
        <p className="wow-eyebrow">
          <span className="wow-tiny-star" aria-hidden>
            ✳
          </span>{' '}
          Есть повод зайти в гости
        </p>
        <h1 id="wow-hero-title">
          <span className="wow-title-line">
            <span>Хорошо,</span>
          </span>
          <span className="wow-title-line">
            <span>
              когда <em>вместе.</em>
            </span>
          </span>
        </h1>
        <p className="wow-hero-description">
          Знакомые вкусы, что-то к чаю
          <br />и время для своих. Располагайтесь.
        </p>
        <div className="wow-hero-actions">
          <a href="#wow-menu" className="wow-button">
            Что в меню <ArrowDown size={18} aria-hidden />
          </a>
          <a href="#wow-contacts" className="wow-text-link">
            Заглянуть в гости <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
        <div className="wow-hero-footnote">
          <span aria-hidden>01 /</span>
          <span>
            Хороший день начинается
            <br />с хорошей компании.
          </span>
        </div>
      </div>
      <figure
        className="wow-hero-figure"
        onPointerMove={(event) => {
          if (
            !enabled ||
            event.pointerType !== 'mouse' ||
            !window.matchMedia('(pointer: fine)').matches
          )
            return;
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
          pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 18);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <div className="wow-hero-photo">
          <motion.div
            className="wow-hero-image-depth"
            style={{
              scale: enabled ? imageScale : 1,
              x: enabled ? pointerX : 0,
              y: enabled ? pointerY : 0,
            }}
          >
            <Image
              src="/concept-pro/table.webp"
              alt="Борщ, румяные пирожки и морс на светлой скатерти — иллюстрация концепции"
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              preload
            />
          </motion.div>
          <span className="wow-photo-curtain" aria-hidden />
        </div>
        <motion.div
          className="wow-seal"
          aria-hidden
          style={{ rotate: enabled ? sealRotate : 12 }}
        >
          <span>Еда — это</span>
          <strong>повод</strong>
          <span>быть вместе</span>
        </motion.div>
        <figcaption>
          <span>На столе — простые радости.</span>
          <span>AI-иллюстрация концепции</span>
        </figcaption>
      </figure>
    </section>
  );
}
