"use client";
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useLenis } from 'lenis/react';

const ease = [0.22, 1, 0.36, 1] as const;

function SplitLine({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: '115%', rotateX: -55, opacity: 0 }}
        animate={{ y: '0%', rotateX: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease }}
        style={{ transformOrigin: '50% 100%', transformStyle: 'preserve-3d' }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [ready, setReady] = useState(false);
  const lenis = useLenis();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const fadeOut = useTransform(scrollYProgress, [0.4, 1], [0, 0.45]);

  const videoX = useTransform(springX, [-0.5, 0.5], [28, -28]);
  const videoY = useTransform(springY, [-0.5, 0.5], [18, -18]);
  const textX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const textY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const orbX = useTransform(springX, [-0.5, 0.5], [40, -40]);
  const orbY = useTransform(springY, [-0.5, 0.5], [28, -28]);
  const frameRotateY = useTransform(springX, [-0.5, 0.5], [2.2, -2.2]);
  const frameRotateX = useTransform(springY, [-0.5, 0.5], [-1.6, 1.6]);

  useEffect(() => {
    const t = window.setTimeout(() => setIntroDone(true), 1450);
    const t2 = window.setTimeout(() => setReady(true), 850);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      video.play().catch(() => undefined);
    };
    play();
    video.addEventListener('loadeddata', play);
    return () => video.removeEventListener('loadeddata', play);
  }, []);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0c0b0a]"
      style={{ perspective: '1400px' }}
    >
      {/* Cinematic intro curtain */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60] flex"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <motion.div
              className="h-full w-1/2 bg-[#0c0b0a]"
              initial={{ x: 0 }}
              animate={{ x: '-101%' }}
              transition={{ duration: 1.15, ease, delay: 0.4 }}
            />
            <motion.div
              className="h-full w-1/2 bg-[#0c0b0a]"
              initial={{ x: 0 }}
              animate={{ x: '101%' }}
              transition={{ duration: 1.15, ease, delay: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.55 }}
            >
              <span className="font-serif text-sm tracking-[0.45em] text-[#F5F1EA]">
                ROWAN &amp; ASH
              </span>
              <motion.span
                className="h-px w-10 bg-[#F5F1EA]/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D parallax media stage */}
      <motion.div
        className="absolute inset-[-10%] will-change-transform"
        style={{
          y: mediaY,
          scale: mediaScale,
          rotateX: frameRotateX,
          rotateY: frameRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ x: videoX, y: videoY }}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease, delay: 0.45 }}
        >
          <motion.div className="absolute inset-0">
            <video
              ref={videoRef}
              className="hero-video h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero.jpg"
              aria-label="Luxury interior atmosphere"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <img
              src="/images/hero.jpg"
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Readability system — strong bottom/left, open center for video */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: fadeOut }} />
        <div className="hero-grain absolute inset-0 opacity-[0.14]" />
        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.45)]" />
      </div>

      {/* Floating depth orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-[20%] z-[2] h-44 w-44 rounded-full md:h-72 md:w-72"
        style={{ 
          x: orbX, 
          y: orbY,
          background: 'radial-gradient(circle, rgba(196,112,85,0.4) 0%, rgba(196,112,85,0) 70%)'
        }}
        animate={{ opacity: [0.2, 0.42, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[26%] right-[8%] z-[2] h-52 w-52 rounded-full md:h-80 md:w-80"
        style={{ 
          x: videoX, 
          y: videoY,
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
        }}
        animate={{ opacity: [0.12, 0.28, 0.12], scale: [1.05, 0.92, 1.05] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Architectural frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-5 z-[3] hidden border border-white/15 md:inset-9 md:block lg:inset-12"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.9, ease }}
        style={{ x: textX, y: textY }}
      >
        <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-white/50" />
        <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-white/50" />
        <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-white/50" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-white/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 pt-36 md:px-10 md:pb-24 lg:px-16 lg:pb-28"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-3xl will-change-transform"
          style={{ x: textX, y: textY, transformStyle: 'preserve-3d' }}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={ready ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="mb-7 h-px w-12 origin-left bg-white/80 md:mb-9"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 1.1, ease }}
            className="mb-6 font-sans text-[0.6875rem] font-normal uppercase tracking-[0.34em] text-white md:mb-8 md:text-[0.75rem]"
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.65)' }}
          >
            Interior Architecture &amp; Design
          </motion.p>

          <h1
            className="font-serif text-[clamp(2.75rem,8vw,7.25rem)] font-light leading-[0.9] tracking-[-0.02em] text-white"
            style={{
              textShadow:
                '0 4px 48px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.45)',
              transformStyle: 'preserve-3d',
            }}
          >
            <SplitLine text="Spaces That" delay={1.2} />
            <SplitLine text="Endure." delay={1.38} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.6, ease }}
            className="mt-8 max-w-lg font-sans text-[1rem] font-light leading-relaxed text-white md:mt-10 md:text-[1.0625rem]"
            style={{ textShadow: '0 2px 22px rgba(0,0,0,0.7)' }}
          >
            We craft timeless interiors for those who value restraint,
            material honesty, and the quiet confidence of enduring design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.8, ease }}
            className="mt-10 flex flex-wrap items-center gap-8 md:mt-12"
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                if (lenis) lenis.scrollTo('#work');
                else document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hero-cta group text-white"
            >
              <span>Explore Our Work</span>
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              >
                <path
                  d="M0 5h16M12.5 1.5 16.5 5 12.5 8.5"
                  stroke="currentColor"
                  strokeWidth="0.9"
                />
              </svg>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (lenis) lenis.scrollTo('#contact');
                else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="pb-0.5 font-sans text-[0.625rem] uppercase tracking-[0.22em] text-white/50 transition-colors duration-400 hover:text-white/90"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}
            >
              Begin a Project
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.05, ease }}
          className="mt-14 hidden items-end justify-between border-t border-white/20 pt-6 md:mt-16 md:flex"
        >
          <div className="flex gap-12">
            {[
              { label: 'Discipline', value: 'Interior Architecture' },
              { label: 'Approach', value: 'Quiet Luxury' },
              { label: 'Materials', value: 'Stone · Wood · Light' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.15 + i * 0.08, duration: 0.6 }}
              >
                <p className="font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-white/55">
                  {item.label}
                </p>
                <p
                  className="mt-1.5 font-serif text-lg font-light text-white"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="max-w-[210px] text-right font-sans text-[0.625rem] uppercase leading-relaxed tracking-[0.18em] text-white/45">
            Scroll to enter the studio
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-3 md:right-10 lg:right-16"
      >
        <span
          className="font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-white/65"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="relative h-14 w-px overflow-hidden bg-white/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-white"
            animate={{ y: ['-100%', '220%'] }}
            transition={{ duration: 1.85, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
