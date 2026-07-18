import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { materials } from '../data/content';
import { ease } from '../lib/motion';

export default function Materials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [active, setActive] = useState(0);
  const current = materials[active];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-charcoal text-paper"
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 lg:grid-cols-12">
        {/* Left — museum index */}
        <div className="flex flex-col justify-between px-6 py-24 md:px-10 md:py-32 lg:col-span-5 lg:px-16 lg:py-36">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="mb-5 font-sans text-[0.625rem] uppercase tracking-[0.28em] text-warm-gray"
            >
              Materials
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.1, ease }}
                className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
              >
                Chosen for character, not trend.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="mt-8 max-w-sm font-sans text-sm font-light leading-[1.85] text-warm-gray"
            >
              We source materials that age with dignity — woods that deepen,
              metals that patinate, stones that hold the memory of their origin.
            </motion.p>
          </div>

          {/* Index list */}
          <nav className="mt-16 space-y-0 border-t border-white/10" aria-label="Materials">
            {materials.map((m, i) => {
              const isActive = active === i;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group flex w-full items-baseline justify-between border-b border-white/10 py-5 text-left transition-colors"
                >
                  <span className="flex items-baseline gap-5">
                    <span
                      className={`font-sans text-[0.625rem] tracking-[0.2em] transition-colors duration-500 ${
                        isActive ? 'text-terracotta' : 'text-white/30'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-serif text-2xl font-light transition-all duration-500 md:text-3xl ${
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
        <div className="relative min-h-[70vh] lg:col-span-7 lg:min-h-[100svh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.85, ease }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent lg:from-charcoal/20" />
            </motion.div>
          </AnimatePresence>

          {/* Caption plate */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-12 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name + '-caption'}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease }}
              >
                <p className="font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-white/50">
                  Specimen {String(active + 1).padStart(2, '0')} /{' '}
                  {String(materials.length).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] font-light text-white">
                  {current.name}
                </h3>
                <p className="mt-4 max-w-md font-sans text-sm font-light leading-[1.8] text-white/75">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Corner marks — museum frame */}
          <span className="pointer-events-none absolute left-6 top-6 h-5 w-5 border-l border-t border-white/30 md:left-10 md:top-10" />
          <span className="pointer-events-none absolute right-6 top-6 h-5 w-5 border-r border-t border-white/30 md:right-10 md:top-10" />
          <span className="pointer-events-none absolute bottom-6 left-6 h-5 w-5 border-b border-l border-white/30 md:bottom-10 md:left-10" />
          <span className="pointer-events-none absolute bottom-6 right-6 h-5 w-5 border-b border-r border-white/30 md:bottom-10 md:right-10" />
        </div>
      </div>
    </section>
  );
}
