import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ease } from '../lib/motion';

const lines = [
  'We believe the finest interiors',
  'are not decorated — they are',
  'composed. Like music, they rely',
  'on silence as much as sound.',
];

export default function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const numX = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative overflow-hidden bg-paper"
    >
      {/* Giant watermark number drifting */}
      <motion.div
        aria-hidden
        style={{ x: numX, y: bgY }}
        className="pointer-events-none absolute -left-[6%] top-[8%] select-none font-serif text-[clamp(12rem,32vw,28rem)] font-light leading-none text-charcoal/[0.035]"
      >
        01
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40 lg:px-16 lg:py-48">
        <div className="mb-16 flex items-center gap-6 md:mb-24">
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
            className="section-label"
          >
            Philosophy
          </motion.p>
        </div>

        {/* Oversized editorial statement — staggered line masks */}
        <h2 className="max-w-5xl font-serif text-[clamp(2.1rem,5.2vw,4.4rem)] font-light leading-[1.12] tracking-[-0.02em] text-charcoal">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '120%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.15, delay: 0.15 + i * 0.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Asymmetric body + stats */}
        <div className="mt-20 grid grid-cols-1 gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.55, ease }}
            className="lg:col-span-4 lg:col-start-1"
          >
            <p className="font-sans text-[0.9375rem] font-light leading-[1.9] text-bark">
              Established in 2014, Rowan &amp; Ash is an interior architecture
              studio devoted to residences and hospitality spaces of lasting
              character. We work slowly, deliberately, and with deep respect for
              the craftspeople who bring our drawings to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="lg:col-span-4 lg:col-start-7"
          >
            <p className="font-sans text-[0.9375rem] font-light leading-[1.9] text-bark">
              Our practice is guided by three principles: material honesty,
              spatial clarity, and emotional resonance. Every project is a
              collaboration — with clients, with landscape, and with time itself.
            </p>
            <a href="#studio" className="btn-luxury mt-10">
              About the Studio
            </a>
          </motion.div>
        </div>

        {/* Horizontal rule stats — numbers slide in */}
        <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-soft-line pt-14 md:mt-32 md:grid-cols-4 md:pt-16">
          {[
            { value: '11', label: 'Years of Practice' },
            { value: '47', label: 'Residences Completed' },
            { value: '3', label: 'Studio Locations' },
            { value: '12', label: 'Design Awards' },
          ].map((stat, i) => (
            <div key={stat.label} className="overflow-hidden">
              <motion.p
                initial={{ y: 60, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.75 + i * 0.1, ease }}
                className="font-serif text-[clamp(2.75rem,5vw,4.5rem)] font-light leading-none text-charcoal"
              >
                {stat.value}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.95 + i * 0.1 }}
                className="mt-3 section-label !normal-case !tracking-[0.08em] !text-[0.6875rem]"
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
