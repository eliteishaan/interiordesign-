"use client";
import { motion, useInView, type HTMLMotionProps } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { ease } from '../lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

/** Soft rise with clip-free motion — used sparingly for body blocks */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  once = true,
  ...rest
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-12% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Editorial line mask — text rises through overflow hidden */
export function LineReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'h2' | 'h3' | 'p' | 'span';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <Tag ref={ref as never} className={`overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '115%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/** Image mask reveal — clip-path wipe */
export function ImageMask({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full will-change-transform"
        initial={{ clipPath: 'inset(12% 12% 12% 12%)', scale: 1.08 }}
        animate={
          inView
            ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
            : {}
        }
        transition={{ duration: 1.35, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}
