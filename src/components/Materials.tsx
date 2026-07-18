"use client";
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { materials } from '../data/content';
import { ease } from '../lib/motion';

export default function Materials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion) return;
    
    // Map progress (0 to 1) to an index (0 to materials.length - 1)
    const index = Math.min(
      Math.floor(latest * materials.length),
      materials.length - 1
    );
    
    if (index !== active) {
      setActive(index);
    }
  });

  const handleIndexClick = (index: number) => {
    if (prefersReducedMotion) {
      setActive(index);
      return;
    }
    
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableHeight = rect.height - window.innerHeight;
    
    // Calculate the target scroll position based on the index's segment
    // Add a small offset (10px) to ensure we cross the threshold cleanly
    const targetScroll = sectionTop + (index / materials.length) * scrollableHeight + 10;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const current = materials[active];

  return (
    <section
      ref={sectionRef}
      className={`relative bg-charcoal text-paper ${
        prefersReducedMotion ? 'min-h-[100svh]' : 'h-[400vh]'
      }`}
    >
      <div
        className={`mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-12 ${
          prefersReducedMotion
            ? 'min-h-[100svh]'
            : 'sticky top-0 h-[100svh] overflow-hidden'
        }`}
      >
        {/* Left — museum index */}
        <div className="flex flex-col justify-center px-6 py-6 md:px-10 lg:col-span-5 lg:px-16 lg:py-10">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="mb-2 font-sans text-[0.625rem] uppercase tracking-[0.28em] text-warm-gray"
            >
              Materials
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.1, ease }}
                className="font-serif text-[clamp(1.75rem,3.2vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
              >
                Chosen for character, not trend.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="mt-3 max-w-sm font-sans text-xs md:text-sm font-light leading-[1.6] text-warm-gray hidden xl:block"
            >
              We source materials that age with dignity — woods that deepen,
              metals that patinate, stones that hold the memory of their origin.
            </motion.p>
          </div>

          {/* Index list */}
          <nav className="mt-6 md:mt-8 space-y-0 border-t border-white/10" aria-label="Materials">
            {materials.map((m, i) => {
              const isActive = active === i;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => handleIndexClick(i)}
                  className="group flex w-full items-baseline justify-between border-b border-white/10 py-2.5 md:py-3.5 text-left transition-colors"
                  suppressHydrationWarning
                >
                  <span className="flex items-baseline gap-4 md:gap-5">
                    <span
                      className={`font-sans text-[0.625rem] tracking-[0.2em] transition-colors duration-500 ${
                        isActive ? 'text-terracotta' : 'text-white/30'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-serif text-lg font-light transition-all duration-500 md:text-xl lg:text-2xl ${
                        isActive
                          ? 'translate-x-2 text-paper'
                          : 'text-white/45 group-hover:text-white/75'
                      }`}
                    >
                      {m.name}
                    </span>
                  </span>
                  <motion.span
                    animate={{ width: isActive ? 32 : 0, opacity: isActive ? 1 : 0 }}
                    className="h-px bg-terracotta"
                    transition={{ duration: 0.45, ease }}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right — large showcase stage */}
        <div className="relative min-h-[50vh] lg:col-span-7 h-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.85, ease }}
              className="absolute inset-0 flex items-center justify-center p-6 pb-20 md:p-12 lg:p-16 lg:pb-28"
            >
              <div className="relative w-full aspect-square max-w-[500px] max-h-[48vh] overflow-hidden shadow-2xl bg-black">
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Caption plate */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-8 lg:p-12 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name + '-caption'}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease }}
              >
                <p className="font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-white/50">
                  Specimen {String(active + 1).padStart(2, '0')} /{' '}
                  {String(materials.length).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white">
                  {current.name}
                </h3>
                <p className="mt-2 max-w-sm font-sans text-xs md:text-sm font-light leading-[1.6] text-white/75">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Corner marks — museum frame */}
          <span className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-white/30 md:left-8 md:top-8" />
          <span className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-white/30 md:right-8 md:top-8" />
          <span className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-white/30 md:bottom-8 md:left-8" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-white/30 md:bottom-8 md:right-8" />
        </div>
      </div>
    </section>
  );
}
