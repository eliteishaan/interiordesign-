"use client";
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { featuredProject } from '../data/content';
import { ease } from '../lib/motion';

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Pin progress drives image sequence + text chapters
  const img1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.28, 0.35], [1, 1, 0, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.22, 0.32, 0.48, 0.55], [0, 1, 1, 0]);
  const img3Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.72, 0.8], [0, 1, 1, 0]);
  const img4Opacity = useTransform(scrollYProgress, [0.68, 0.78, 1], [0, 1, 1]);

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const ch1 = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.3], [0, 1, 1, 0]);
  const ch2 = useTransform(scrollYProgress, [0.25, 0.35, 0.48, 0.56], [0, 1, 1, 0]);
  const ch3 = useTransform(scrollYProgress, [0.5, 0.6, 0.72, 0.8], [0, 1, 1, 0]);
  const ch4 = useTransform(scrollYProgress, [0.72, 0.82, 1], [0, 1, 1]);

  const images = [
    { src: featuredProject.images.main, opacity: img1Opacity, alt: 'Main living space' },
    { src: featuredProject.images.living, opacity: img2Opacity, alt: 'Interior living detail' },
    { src: featuredProject.images.exterior, opacity: img3Opacity, alt: 'Architecture exterior' },
    { src: featuredProject.images.detail, opacity: img4Opacity, alt: 'Material detail' },
  ];

  const chapters = [
    {
      opacity: ch1,
      label: '01 — The Residence',
      title: featuredProject.title,
      body: featuredProject.description,
    },
    {
      opacity: ch2,
      label: '02 — Atmosphere',
      title: 'A sequence of light',
      body: featuredProject.philosophy,
    },
    {
      opacity: ch3,
      label: '03 — Architecture',
      title: 'Landscape as partner',
      body: `Set into the coastal cliffs of ${featuredProject.location}, the residence opens toward the horizon while interiors remain intimate — thresholds carefully tuned to privacy and prospect.`,
    },
    {
      opacity: ch4,
      label: '04 — Materials',
      title: 'Surfaces that age',
      body: featuredProject.materials.join(' · ') + ' — each chosen for honesty, touch, and the way they will weather into beauty over decades of living.',
    },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-charcoal"
      style={{ height: '400vh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-[100svh] w-full overflow-hidden"
      >
        {/* Full-bleed cinematic image stack */}
        <div className="absolute inset-0">
          {images.map((img) => (
            <motion.div
              key={img.src}
              style={{ opacity: img.opacity, scale: imgScale }}
              className="absolute inset-0"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-16">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease }}
                className="font-sans text-[0.625rem] uppercase tracking-[0.3em] text-white/55"
              >
                Featured Project
              </motion.p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-white/40">
                <span className="font-sans text-[0.625rem] uppercase tracking-[0.2em]">
                  {featuredProject.year}
                </span>
                <span className="h-px w-6 bg-white/25" />
                <span className="font-sans text-[0.625rem] uppercase tracking-[0.2em]">
                  {featuredProject.location}
                </span>
                <span className="hidden h-px w-6 bg-white/25 sm:block" />
                <span className="hidden font-sans text-[0.625rem] uppercase tracking-[0.2em] sm:inline">
                  {featuredProject.size}
                </span>
              </div>
            </div>
            <p className="hidden font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-white/40 md:block">
              Scroll to explore
            </p>
          </div>

          {/* Chapter text — crossfades */}
          <div className="relative max-w-xl pb-6 md:max-w-2xl">
            {chapters.map((ch) => (
              <motion.div
                key={ch.label}
                style={{ opacity: ch.opacity }}
                className="pointer-events-none absolute bottom-6 left-0 right-0 md:bottom-8"
              >
                <p className="mb-4 font-sans text-[0.625rem] uppercase tracking-[0.28em] text-terracotta">
                  {ch.label}
                </p>
                <h3
                  className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em] text-white"
                  style={{ textShadow: '0 4px 40px rgba(0,0,0,0.45)' }}
                >
                  {ch.title}
                </h3>
                <p
                  className="mt-5 max-w-lg font-sans text-[0.9375rem] font-light leading-[1.8] text-white/80"
                  style={{ textShadow: '0 2px 18px rgba(0,0,0,0.5)' }}
                >
                  {ch.body}
                </p>
              </motion.div>
            ))}
            {/* Spacer so absolute chapters don't collapse height */}
            <div className="invisible pointer-events-none">
              <p className="mb-4 text-[0.625rem]">00</p>
              <h3 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05]">
                {featuredProject.title}
              </h3>
              <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.8]">
                {featuredProject.description}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-white/80 origin-left"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
