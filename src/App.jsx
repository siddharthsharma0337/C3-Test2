import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Domains from './components/Domains';
import WhyJoin from './components/WhyJoin';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseTrail from './components/MouseTrail';
import AuroraBg from './components/AuroraBg';
import CircuitDivider from './components/CircuitDivider';

function App() {
  const [loaded, setLoaded] = useState(false);

  /* ── Lenis smooth scroll ─────────────────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <ThemeProvider>
      <div data-testid="app-root" className="relative" style={{ overflowX: 'hidden' }}>
        {/* Aurora mesh gradient — behind everything */}
        <AuroraBg />

        {/* Spotlight mouse trail */}
        <MouseTrail />

        <AnimatePresence>
          {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
        </AnimatePresence>

        {loaded && (
          <>
            <Navbar />
            <main>
              {/* Hero: uses its own full-bleed dark-capable background */}
              <Hero />

              {/* About — section A */}
              <About sectionClass="sec-a" />

              <CircuitDivider />

              {/* Domains — section B */}
              <Domains sectionClass="sec-b" />

              <CircuitDivider />

              {/* Why Join — section C (mint tint) */}
              <WhyJoin sectionClass="sec-c" />

              <CircuitDivider />

              {/* FAQ — section B */}
              <FAQ sectionClass="sec-b" />

              {/* Contact — section A */}
              <Contact sectionClass="sec-a" />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
