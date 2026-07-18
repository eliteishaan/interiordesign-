import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { testimonials } from '../data/content';
import { ease } from '../lib/motion';

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, active]);

  const t = testimonials[active];

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ivory"
    >
      {/* Soft drifting watermark */}
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="select-none font-serif text-[clamp(14rem,40vw,32rem)] font-light leading-none text-charcoal/[0.03]">
          ”
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-28 md:px-10 md:py-32 lg:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label mb-16 md:mb-20"
        >
          Client Reflections
        </motion.p>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="relative min-h-[280px] md:min-h-[340px] lg:col-span-9 lg:min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.author}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.85, ease }}
                className="absolute inset-0"
              >
                <p className="font-serif text-[clamp(1.65rem,4vw,3.35rem)] font-light leading-[1.22] tracking-[-0.015em] text-charcoal">
                  {t.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={`${t.author}-${i}`}
                      initial={{ opacity: 0.15 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.02 * i, ease }}
                      className="inline"
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </p>
                <footer className="mt-12 md:mt-14">
                  <cite className="not-italic">
                    <span className="block font-sans text-sm font-normal tracking-wide text-charcoal">
                      {t.author}
                    </span>
                    <span className="mt-2 block section-label !normal-case !tracking-[0.06em] !text-[0.75rem]">
                      {t.project}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Vertical index */}
          <div className="flex items-end lg:col-span-2 lg:col-start-11">
            <div className="flex w-full gap-3 lg:flex-col lg:gap-0">
              {testimonials.map((item, i) => (
                <button
                  key={item.author}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group flex flex-1 items-center gap-4 border-l-0 py-0 text-left transition-all duration-500 lg:border-l lg:py-6 lg:pl-6 ${
                    active === i
                      ? 'lg:border-charcoal'
                      : 'lg:border-soft-line hover:lg:border-warm-gray'
                  }`}
                  aria-label={`View reflection from ${item.author}`}
                  aria-current={active === i}
                >
                  <span
                    className={`font-serif text-2xl font-light transition-colors duration-500 ${
                      active === i
                        ? 'text-terracotta'
                        : 'text-soft-line group-hover:text-warm-gray'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Progress ring for active autoplay */}
                  {active === i && (
                    <span className="relative hidden h-8 w-8 lg:block">
                      <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-soft-line"
                        />
                        <motion.circle
                          key={`ring-${active}-${paused}`}
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          className="text-charcoal"
                          strokeDasharray={88}
                          initial={{ strokeDashoffset: 88 }}
                          animate={{ strokeDashoffset: paused ? undefined : 0 }}
                          transition={{ duration: 7, ease: 'linear' }}
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
