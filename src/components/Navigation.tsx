"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { navLinks } from '../data/content';
import { useLenis } from 'lenis/react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      lenis?.scrollTo(href);
      setMenuOpen(false);
    }
  };

  const light = !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className={`transition-all duration-700 ${
          scrolled
            ? 'border-b border-soft-line/60 bg-paper/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}>
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-16 lg:py-6">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className={`font-serif text-[1.35rem] font-medium tracking-[0.08em] transition-colors duration-500 md:text-[1.5rem] ${
              light ? 'text-white' : 'text-charcoal'
            }`}
            style={light ? { textShadow: '0 1px 18px rgba(0,0,0,0.35)' } : undefined}
          >
            ROWAN &amp; ASH
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link ${light ? 'nav-link-light' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`hidden lg:inline-flex ${
              light ? 'btn-luxury-light' : 'btn-luxury'
            }`}
          >
            Inquire
          </a>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            suppressHydrationWarning
          >
            <span className="flex w-6 flex-col gap-[6px]">
              <span
                className={`block h-px w-full transition-all duration-400 ${
                  light && !menuOpen ? 'bg-white' : 'bg-charcoal'
                } ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
              />
              <span
                className={`block h-px w-full transition-all duration-400 ${
                  light && !menuOpen ? 'bg-white' : 'bg-charcoal'
                } ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-paper lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="font-serif text-4xl font-light text-charcoal"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-16"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-luxury"
                >
                  Begin a Project
                </a>
              </motion.div>
            </div>
            <div className="border-t border-soft-line px-8 py-8">
              <p className="section-label">Los Angeles · New York · London</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
