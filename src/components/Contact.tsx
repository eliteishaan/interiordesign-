"use client";
import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ease } from '../lib/motion';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-ivory">
      {/* Giant background word */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 right-0 select-none overflow-hidden"
      >
        <motion.p
          initial={{ x: '4%' }}
          whileInView={{ x: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="whitespace-nowrap font-serif text-[clamp(5rem,18vw,14rem)] font-light leading-none text-charcoal/[0.04]"
        >
          Inquire · Collaborate · Begin
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40 lg:px-16 lg:py-48">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <motion.div style={{ y: headingY }} className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label mb-6"
            >
              Begin a Conversation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.15, delay: 0.1, ease }}
              className="font-serif text-[clamp(2.4rem,5vw,4.25rem)] font-light leading-[1.05] tracking-[-0.02em] text-charcoal"
            >
              Let's Design <br className="hidden md:block" />
              Something Meaningful.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.45, ease }}
              className="mt-8 max-w-sm font-sans text-[0.9375rem] font-light leading-[1.9] text-bark"
            >
              We take on a limited number of projects each year. Share a few words
              about your vision — we respond personally within three business days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-14 space-y-7 border-t border-soft-line pt-10"
            >
              <div>
                <p className="section-label mb-2">Email</p>
                <a
                  href="mailto:studio@rowanandash.com"
                  className="font-sans text-sm font-light text-charcoal transition-colors hover:text-terracotta"
                >
                  studio@rowanandash.com
                </a>
              </div>
              <div>
                <p className="section-label mb-2">Studios</p>
                <p className="font-sans text-sm font-light leading-relaxed text-bark">
                  Los Angeles · New York · London
                </p>
              </div>
              <div>
                <p className="section-label mb-2">By Appointment</p>
                <p className="font-sans text-sm font-light text-bark">
                  +1 (310) 555–0147
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            className="lg:col-span-6 lg:col-start-7"
          >
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center border border-soft-line bg-paper px-8 py-12 md:px-12">
                <p className="font-serif text-4xl font-light text-charcoal md:text-5xl">
                  Thank you.
                </p>
                <p className="mt-5 max-w-sm font-sans text-sm font-light leading-relaxed text-bark">
                  Your inquiry has been received. A principal will be in touch
                  within three business days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', project: '', message: '' });
                  }}
                  className="group mt-10 inline-flex items-center border-b border-charcoal/20 pb-1 font-sans text-[0.625rem] uppercase tracking-[0.24em] text-charcoal transition-colors hover:border-charcoal hover:text-bark"
                  suppressHydrationWarning
                >
                  Send Another
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
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-soft-line bg-paper px-6 py-10 md:px-10 md:py-12"
              >
                <p className="mb-8 section-label">Project Inquiry</p>
                <div className="space-y-1">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="sr-only">
                      Project type
                    </label>
                    <input
                      id="project"
                      type="text"
                      placeholder="Project type (e.g. residence, hospitality)"
                      value={form.project}
                      onChange={(e) => update('project', e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Tell us about your project
                    </label>
                    <textarea
                      id="message"
                      required
                      placeholder="Location, scope, and timeline"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-luxury"
                      rows={4}
                    />
                  </div>
                </div>
                <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <button 
                    type="submit" 
                    className="group inline-flex items-center border-b border-charcoal/20 pb-1 font-sans text-[0.625rem] uppercase tracking-[0.24em] text-charcoal transition-colors hover:border-charcoal hover:text-bark"
                    suppressHydrationWarning
                  >
                    Submit Inquiry
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
                  </button>
                  <p className="font-sans text-[0.625rem] font-light uppercase tracking-[0.18em] text-warm-gray">
                    Private &amp; confidential
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
