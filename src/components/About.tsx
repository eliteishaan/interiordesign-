"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { team } from '../data/content';
import { ease } from '../lib/motion';

export default function About() {
  const ref = useRef(null);
  const quoteRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const quoteInView = useInView(quoteRef, { once: true, margin: '-20% 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const img2Y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const quoteX = useTransform(scrollYProgress, [0.2, 0.6], ['4%', '0%']);

  return (
    <section id="studio" ref={ref} className="relative overflow-hidden bg-ivory">
      {/* Intro band */}
      <div className="mx-auto max-w-[1600px] px-6 pt-28 md:px-10 md:pt-40 lg:px-16 lg:pt-48">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-terracotta lg:col-span-2"
          >
            The Studio
          </motion.p>
          <div className="lg:col-span-9 lg:col-start-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.15, delay: 0.15, ease }}
              className="font-serif text-[clamp(2.1rem,4.8vw,4rem)] font-light leading-[1.12] tracking-[-0.02em] text-charcoal"
            >
              A practice built on patience, craft, and the belief that homes should feel inevitable.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Overlapping image composition */}
      <div className="relative mx-auto mt-16 max-w-[1600px] px-6 md:mt-24 md:px-10 lg:mt-28 lg:px-16">
        <div className="relative grid grid-cols-12 gap-4 md:gap-6">
          <motion.div
            style={{ y: imgY }}
            className="col-span-12 overflow-hidden md:col-span-8"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-[21/11]">
                  <motion.img
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease }}
                    src="/images/about-space.jpg"
                    alt="Studio environment"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                style={{ y: img2Y }}
                className="col-span-8 col-start-5 -mt-16 md:col-span-4 md:col-start-9 md:-mt-0 md:pt-24"
              >
                <div className="relative aspect-[3/4] overflow-hidden shadow-[-24px_24px_0_0_#F5F1EA] md:shadow-[-32px_32px_0_0_#F5F1EA]">
                  <img
                    src="/images/studio-materials.jpg"
                    alt="Material library"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-6 font-sans text-[0.625rem] uppercase tracking-[0.15em] text-charcoal/60">
                  Material library · Los Angeles
                </p>
              </motion.div>
            </div>
          </div>

          {/* Full-width pull quote */}
          <div
            ref={quoteRef}
            className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36 lg:px-16"
          >
            <motion.blockquote
              style={{ x: quoteX }}
              className="relative border-l border-terracotta/40 pl-8 md:pl-14"
            >
              <motion.span
                aria-hidden
                initial={{ opacity: 0, y: 20 }}
                animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease }}
                className="mb-4 block font-serif text-[clamp(4rem,12vw,9rem)] font-light leading-none text-soft-line"
              >
                “
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.15, delay: 0.2, ease }}
                className="max-w-4xl font-serif text-[clamp(1.5rem,3.4vw,2.85rem)] font-light italic leading-[1.3] tracking-[-0.01em] text-charcoal"
              >
                Architecture is the careful framing of life. Our role is to make that frame so well-considered that it disappears — leaving only the experience of being home.
              </motion.p>
              <motion.footer
                initial={{ opacity: 0 }}
                animate={quoteInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-10"
              >
                <cite className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-terracotta not-italic">
                  — Elena Rowan, Founding Principal
                </cite>
              </motion.footer>
            </motion.blockquote>
          </div>

          {/* Team — staggered portraits */}
          <div className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40 lg:px-16">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
              <div className="grid grid-cols-2 gap-4 md:gap-8 lg:col-span-7">
                {team.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 1, delay: i * 0.12, ease }}
                    className={i === 1 ? 'mt-10 md:mt-20' : ''}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 1.1, ease }}
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[15%]"
                      />
                </div>
                <h3 className="mt-5 font-serif text-xl font-light text-charcoal md:text-2xl">
                  {member.name}
                </h3>
                <p className="mt-2 font-sans text-[0.625rem] uppercase tracking-[0.15em] text-charcoal/60">
                  {member.role}
                </p>
                <p className="mt-4 font-sans text-sm font-light leading-relaxed text-charcoal/80">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="flex flex-col justify-between lg:col-span-4 lg:col-start-9"
          >
            <div>
              <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-terracotta mb-8">Our Approach</p>
              <p className="font-sans text-[1.0625rem] md:text-[1.125rem] font-light leading-[1.8] text-charcoal/80">
                From our studios in Los Angeles, New York, and London, we serve a
                global clientele of private homeowners, architects, and boutique
                hospitality groups. Each project is led personally by a founding
                principal.
              </p>
              <p className="mt-6 font-sans text-[1.0625rem] md:text-[1.125rem] font-light leading-[1.8] text-charcoal/80">
                We maintain a curated library of materials, samples, and rare
                objects — a living archive that informs every palette we compose.
              </p>
            </div>
            <div className="mt-12 border-t border-soft-line pt-8">
              <p className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-light leading-[1.2] text-charcoal">
                Three cities.
                <br />
                One standard of care.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
