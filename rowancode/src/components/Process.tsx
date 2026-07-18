import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { processSteps } from '../data/content';
import { ease } from '../lib/motion';

export default function Process() {
  const ref = useRef(null);
  const headerInView = useInView(ref, { once: true, margin: '-12% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 40%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="process"
      ref={ref}
      className="relative overflow-hidden bg-paper px-6 py-28 md:px-10 md:py-40 lg:px-16 lg:py-48"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 grid grid-cols-1 gap-10 md:mb-28 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              className="section-label mb-5"
            >
              Process
            </motion.p>
            <h2 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.1] tracking-[-0.02em] text-charcoal">
              {['Four movements.', 'One considered path.'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '115%' }}
                    animate={headerInView ? { y: '0%' } : {}}
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="self-end font-sans text-[0.9375rem] font-light leading-[1.85] text-muted lg:col-span-4 lg:col-start-9"
          >
            Our process is deliberately unhurried. We do not rush toward
            solutions — we arrive at them through careful observation and
            iterative refinement.
          </motion.p>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Track */}
          <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-soft-line md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full origin-top bg-charcoal"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-0">
            {processSteps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <TimelineStep
                  key={step.number}
                  step={step}
                  index={i}
                  align={left ? 'left' : 'right'}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
  align,
}: {
  step: { number: string; title: string; description: string };
  index: number;
  align: 'left' | 'right';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 gap-6 py-12 md:grid-cols-2 md:gap-0 md:py-16"
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease }}
        className="absolute left-[0.85rem] top-[3.4rem] z-10 h-3 w-3 rounded-full border border-charcoal bg-paper md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      />

      {/* Left column content */}
      <div
        className={`pl-12 md:pl-0 ${
          align === 'left'
            ? 'md:pr-16 md:text-right'
            : 'md:col-start-2 md:pl-16'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: align === 'left' ? -36 : 36 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.05, ease }}
        >
          <span className="step-number text-3xl md:text-4xl">{step.number}</span>
          <h3 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-charcoal">
            {step.title}
          </h3>
          <p
            className={`mt-4 font-sans text-sm font-light leading-[1.85] text-bark md:text-[0.9375rem] ${
              align === 'left' ? 'md:ml-auto' : ''
            } max-w-md`}
          >
            {step.description}
          </p>
          <p className="mt-6 font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-warm-gray">
            Phase {String(index + 1).padStart(2, '0')} of 04
          </p>
        </motion.div>
      </div>
    </div>
  );
}
