"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from '../lib/motion';

export default function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative bg-paper overflow-hidden"
    >
      {/* Static watermark for pristine visibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[4%] top-[10%] select-none font-serif text-[clamp(12rem,32vw,28rem)] font-light leading-none text-charcoal/[0.025]"
      >
        01
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36 lg:px-16 lg:py-48">
        <div className="mb-14 flex items-center gap-6 md:mb-20">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease }}
            className="h-px w-10 origin-left bg-terracotta md:w-14"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-terracotta"
          >
            Philosophy
          </motion.p>
        </div>

        {/* Oversized editorial statement — naturally wrapped for perfect visibility */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.15, delay: 0.15, ease }}
          className="max-w-5xl font-serif text-[clamp(2.1rem,4.8vw,4.25rem)] font-light leading-[1.15] tracking-[-0.02em] text-charcoal"
        >
          We believe the finest interiors are not decorated — they are composed. Like music, they rely on silence as much as sound.
        </motion.h2>

        {/* Asymmetric body + stats */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="lg:col-span-4 lg:col-start-1"
          >
            <p className="font-sans text-[1.0625rem] md:text-[1.125rem] font-light leading-[1.8] text-charcoal/80">
              Established in 2014, Rowan &amp; Ash is an interior architecture
              studio devoted to residences and hospitality spaces of lasting
              character. We work slowly, deliberately, and with deep respect for
              the craftspeople who bring our drawings to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.45, ease }}
            className="lg:col-span-4 lg:col-start-7"
          >
            <p className="font-sans text-[1.0625rem] md:text-[1.125rem] font-light leading-[1.8] text-charcoal/80">
              Our practice is guided by three principles: material honesty,
              spatial clarity, and emotional resonance. Every project is a
              collaboration — with clients, with landscape, and with time itself.
            </p>
            <a
              href="#studio"
              className="group mt-12 inline-flex items-center font-sans text-[0.625rem] uppercase tracking-[0.24em] text-charcoal transition-colors hover:text-bark border-b border-charcoal/20 pb-1 hover:border-charcoal"
            >
              About the Studio
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                className="ml-3 transition-transform duration-500 ease-out group-hover:translate-x-2"
              >
                <path
                  d="M0 6h18M13.5 1.5 18.5 6l-5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Horizontal rule stats */}
        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-soft-line pt-12 md:mt-28 md:grid-cols-4 md:pt-16">
          {[
            { value: '11', label: 'Years of Practice' },
            { value: '47', label: 'Residences Completed' },
            { value: '3', label: 'Studio Locations' },
            { value: '12', label: 'Design Awards' },
          ].map((stat, i) => (
            <div key={stat.label}>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 + i * 0.1, ease }}
                className="font-serif text-[clamp(2.5rem,4vw,3.75rem)] font-light leading-none text-charcoal"
              >
                {stat.value}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                className="mt-4 font-sans text-[0.625rem] uppercase tracking-[0.15em] text-charcoal/60"
              >
                {stat.label}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
