import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { journalArticles } from '../data/content';
import { ease } from '../lib/motion';

export default function Journal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const sideY = useTransform(scrollYProgress, [0, 1], ['8%', '-4%']);

  const [feature, ...rest] = journalArticles;

  return (
    <section
      id="journal"
      ref={ref}
      className="relative overflow-hidden bg-paper px-6 py-28 md:px-10 md:py-40 lg:px-16 lg:py-48"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Masthead */}
        <div className="mb-16 flex flex-col gap-8 border-b border-soft-line pb-10 md:mb-20 md:flex-row md:items-end md:justify-between md:pb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label mb-4"
            >
              Journal · Vol. 0{feature.id}
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.1, ease }}
                className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light tracking-[-0.025em] text-charcoal"
              >
                Notes on space
                <span className="italic text-bark"> &amp; living.</span>
              </motion.h2>
            </div>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            href="#contact"
            className="btn-luxury shrink-0"
          >
            All Articles
          </motion.a>
        </div>

        {/* Magazine spread */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Cover story */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1.1, ease }}
            className="group cursor-pointer lg:col-span-7"
          >
            <div className="relative overflow-hidden">
              <motion.div style={{ y: coverY }} className="aspect-[4/5] md:aspect-[5/6]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-[115%] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </motion.div>
              {/* Magazine cover plate */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent p-7 pt-24 md:p-10 md:pt-32">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-terracotta">
                    Cover · {feature.category}
                  </span>
                  <span className="h-px w-4 bg-white/30" />
                  <span className="font-sans text-[0.5625rem] tracking-[0.16em] text-white/55">
                    {feature.date}
                  </span>
                </div>
                <h3 className="font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-snug text-white">
                  {feature.title}
                </h3>
              </div>
            </div>
            <p className="mt-6 max-w-lg font-sans text-sm font-light leading-[1.85] text-muted md:text-[0.9375rem]">
              {feature.excerpt}
            </p>
            <span className="btn-luxury mt-6">Read Essay</span>
          </motion.article>

          {/* Side column — stacked essays */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:pl-6">
            <motion.div style={{ y: sideY }} className="space-y-0">
              {rest.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                  className="group cursor-pointer border-t border-soft-line py-8 first:border-t-0 first:pt-0 md:py-10"
                >
                  <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-2 overflow-hidden">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 flex flex-col justify-center">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="section-label !text-[0.5625rem]">
                          {article.category}
                        </span>
                        <span className="h-px w-3 bg-soft-line" />
                        <span className="font-sans text-[0.5625rem] tracking-[0.12em] text-warm-gray">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-light leading-snug text-charcoal transition-colors duration-400 group-hover:text-bark md:text-[1.45rem]">
                        {article.title}
                      </h3>
                      <p className="mt-3 hidden font-sans text-sm font-light leading-relaxed text-muted sm:block">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Magazine folio mark */}
            <div className="border-t border-soft-line pt-8">
              <p className="font-serif text-2xl font-light italic text-bark">
                “Restraint is the most expressive material.”
              </p>
              <p className="mt-3 section-label">From the editors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
