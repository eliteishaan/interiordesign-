import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from '../lib/motion';

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-soft-line bg-paper">
      {/* Oversized studio name */}
      <div className="mx-auto max-w-[1600px] px-6 pt-16 md:px-10 md:pt-20 lg:px-16">
        <div className="overflow-hidden border-b border-soft-line pb-10 md:pb-14">
          <motion.a
            href="#top"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1.2, ease }}
            className="block font-serif text-[clamp(2.5rem,10vw,8rem)] font-light leading-none tracking-[-0.03em] text-charcoal transition-colors hover:text-bark"
          >
            ROWAN &amp; ASH
          </motion.a>
        </div>

        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-4">
            <p className="max-w-xs font-sans text-sm font-light leading-relaxed text-muted">
              Interior architecture and design for residences and hospitality
              spaces of enduring quality.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <p className="section-label mb-5">Navigate</p>
            <ul className="space-y-3">
              {[
                { label: 'Work', href: '#work' },
                { label: 'Studio', href: '#studio' },
                { label: 'Process', href: '#process' },
                { label: 'Journal', href: '#journal' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm font-light text-bark transition-colors hover:text-charcoal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="section-label mb-5">Studios</p>
            <ul className="space-y-3 font-sans text-sm font-light text-bark">
              <li>Los Angeles</li>
              <li>New York</li>
              <li>London</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="section-label mb-5">Connect</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:studio@rowanandash.com"
                  className="font-sans text-sm font-light text-bark transition-colors hover:text-charcoal"
                >
                  studio@rowanandash.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-light text-bark transition-colors hover:text-charcoal"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-light text-bark transition-colors hover:text-charcoal"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-soft-line py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[0.6875rem] font-light tracking-[0.06em] text-warm-gray">
            © {year} Rowan &amp; Ash Studio. All rights reserved.
          </p>
          <a
            href="#top"
            className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.18em] text-warm-gray transition-colors hover:text-charcoal"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
