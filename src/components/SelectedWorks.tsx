"use client";
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { projects } from '../data/content';
import { ease } from '../lib/motion';

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Horizontal travel of the gallery track
  const x = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '-68%']);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="selected"
      ref={sectionRef}
      className="relative bg-paper"
      style={{ height: '280vh' }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pb-6 pt-24 md:px-10 md:pt-28 lg:px-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                className="section-label mb-4"
              >
                Selected Works
              </motion.p>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  animate={headerInView ? { y: '0%' } : {}}
                  transition={{ duration: 1.1, ease }}
                  className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-light tracking-[-0.02em] text-charcoal"
                >
                  Residences of lasting character.
                </motion.h2>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              className="max-w-xs font-sans text-sm font-light leading-relaxed text-muted md:text-right"
            >
              Drag the scroll — a private collection spanning three continents.
            </motion.p>
          </div>
        </div>

        {/* Horizontal gallery */}
        <div className="relative flex flex-1 items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-[58vh] gap-5 pl-6 will-change-transform md:h-[62vh] md:gap-7 md:pl-10 lg:pl-16"
          >
            {projects.map((project, i) => (
              <article
                key={project.id}
                className={`group relative shrink-0 overflow-hidden ${
                  i % 2 === 0
                    ? 'w-[72vw] md:w-[42vw] lg:w-[34vw]'
                    : 'mt-8 w-[68vw] md:mt-14 md:w-[38vw] lg:w-[30vw]'
                }`}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-sans text-[0.625rem] tracking-[0.22em] text-white/60">
                        {project.id}
                      </span>
                      <span className="h-px w-5 bg-white/30" />
                      <span className="font-sans text-[0.5625rem] uppercase tracking-[0.2em] text-white/55">
                        {project.type}
                      </span>
                    </div>
                    <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-light text-white">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <p className="font-sans text-sm font-light text-white/70">
                        {project.location}
                      </p>
                      <span className="font-sans text-xs text-white/50">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* End panel */}
            <div className="flex w-[50vw] shrink-0 items-center justify-center md:w-[28vw]">
              <a href="#contact" className="btn-luxury">
                Commission a Project
              </a>
            </div>
          </motion.div>
        </div>

        {/* Progress */}
        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pb-10 pt-4 md:px-10 lg:px-16">
          <div className="flex items-center gap-4">
            <span className="font-sans text-[0.5625rem] uppercase tracking-[0.22em] text-warm-gray">
              Scroll
            </span>
            <div className="h-px flex-1 bg-soft-line">
              <motion.div
                className="h-full bg-charcoal origin-left"
                style={{ width: progress }}
              />
            </div>
            <span className="font-sans text-[0.5625rem] uppercase tracking-[0.22em] text-warm-gray">
              {String(projects.length).padStart(2, '0')} works
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
