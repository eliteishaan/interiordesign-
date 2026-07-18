"use client";
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { journalArticles } from '../data/content';
import { ease } from '../lib/motion';

const ArrowIcon = () => (
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
);

export default function Journal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Inner parallax values (moving the image inside a fixed container)
  const coverY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const sideY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const [feature, ...rest] = journalArticles;

  return (
    <section
      id="journal"
      ref={ref}
      className="relative overflow-hidden bg-paper px-6 py-28 md:px-10 md:py-40 lg:px-16 lg:py-48"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Masthead */}
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="mb-4 font-sans text-[0.625rem] uppercase tracking-[0.3em] text-terracotta"
            >
              Journal · Vol. 0{feature.id}
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.1, ease }}
                className="font-serif text-[clamp(2.75rem,6.5vw,5.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-charcoal"
              >
                Notes on space
                <span className="block italic text-bark mt-1"> &amp; living.</span>
              </motion.h2>
            </div>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            href="#contact"
            className="group flex items-center font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-charcoal transition-colors hover:text-bark"
          >
            All Articles
            <ArrowIcon />
          </motion.a>
        </div>

        {/* Magazine spread - Swiss Grid structure */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24 border-t border-soft-line pt-10 md:pt-14">
          
          {/* Cover story */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1.1, ease }}
            className="group cursor-pointer lg:col-span-7 flex flex-col"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-warm-gray/20">
              {/* Inner Parallax Image */}
              <motion.img
                style={{ y: coverY }}
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 h-[116%] w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              
              {/* Clean Magazine Plate */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-7 pt-24 md:p-10 md:pt-32">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-paper">
                    Cover · {feature.category}
                  </span>
                  <span className="h-px w-4 bg-paper/40" />
                  <span className="font-sans text-[0.5625rem] uppercase tracking-[0.16em] text-paper/70">
                    {feature.date}
                  </span>
                </div>
                <h3 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.1] text-white" style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
                  {feature.title}
                </h3>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start md:flex-row md:items-end md:justify-between gap-6">
              <p className="max-w-md font-sans text-sm font-light leading-[1.8] text-charcoal/70 md:text-[0.9375rem]">
                {feature.excerpt}
              </p>
              <button className="group flex items-center font-sans text-[0.625rem] uppercase tracking-[0.24em] text-charcoal transition-colors hover:text-bark shrink-0 pb-1 border-b border-charcoal/20 hover:border-charcoal">
                Read Essay
                <ArrowIcon />
              </button>
            </div>
          </motion.article>

          {/* Side column — stacked essays */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div className="flex flex-col h-full">
              {rest.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                  className="group cursor-pointer border-t border-soft-line py-8 first:border-t-0 first:pt-0 md:py-10 flex-1 flex flex-col justify-center"
                >
                  <div className="grid grid-cols-5 gap-6 xl:gap-8 items-center">
                    <div className="col-span-2">
                      <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray/20">
                        {/* Inner Parallax Image */}
                        <motion.img
                          style={{ y: sideY }}
                          src={article.image}
                          alt={article.title}
                          className="absolute inset-0 h-[130%] w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 flex flex-col justify-center">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="font-sans text-[0.5625rem] uppercase tracking-[0.2em] text-charcoal/50">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-light leading-[1.2] text-charcoal transition-colors duration-400 group-hover:text-terracotta md:text-[1.35rem]">
                        {article.title}
                      </h3>
                      <button className="mt-6 flex items-center font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-charcoal/60 transition-colors group-hover:text-charcoal w-fit pb-1 border-b border-transparent group-hover:border-charcoal/30">
                        Read
                        <ArrowIcon />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Magazine folio mark */}
            <div className="border-t border-charcoal pt-8 mt-auto">
              <p className="font-serif text-2xl font-light italic text-charcoal">
                “Restraint is the most expressive material.”
              </p>
              <p className="mt-4 font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-charcoal/50">From the editors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
