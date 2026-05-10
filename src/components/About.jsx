import React from 'react';
import { motion } from 'framer-motion';

const PARA1 = "C³ Club is the central hub for every creative and technical mind on campus. Whether you push pixels, write algorithms, cut reels, or craft brand stories — there's a seat at the table.";
const PARA2 = "We believe the best ideas happen at the intersection of disciplines. That's why we built one roof for all four — and made collaboration the default.";

const STATS = [
  { id: 'domains', value: '06', label: 'Active Domains',  icon: '⬡' },
  { id: 'open',    value: 'All', label: 'Open to Anyone', icon: '∞' },
  { id: 'backed',  value: 'AI',  label: 'AI-Augmented',  icon: '⚡' },
  { id: 'handled', value: '04',  label: 'Disciplines',    icon: '◈' },
];

const fadeUp = (delay = 0) => ({
  initial:     { opacity:0, y:28 },
  whileInView: { opacity:1, y:0  },
  viewport:    { once:true, margin:'-80px' },
  transition:  { duration:0.55, delay, ease:[0.22,1,0.36,1] },
});

export default function About({ sectionClass = '' }) {
  return (
    <section
      id="about"
      data-testid="about-section"
      className={`section-pad ${sectionClass}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left col */}
          <div className="lg:col-span-6">
            <motion.span {...fadeUp(0)} className="eyebrow">About</motion.span>

            <h2 className="section-heading mb-6">
              <motion.span {...fadeUp(0.06)} style={{ display:'block' }}>
                One club.{' '}
                <motion.span {...fadeUp(0.12)} className="text-gradient-mint" style={{ display:'inline-block' }}>
                  Four
                </motion.span>
              </motion.span>
              <motion.span {...fadeUp(0.18)} style={{ display:'block' }}>
                disciplines.
              </motion.span>
            </h2>

            <motion.p
              {...fadeUp(0.24)}
              className="font-grotesk text-base md:text-lg leading-relaxed mb-5 body-text-width"
              style={{ color:'var(--c-fg-soft)' }}
            >
              {PARA1}
            </motion.p>
            <motion.p
              {...fadeUp(0.3)}
              className="font-grotesk text-base leading-relaxed body-text-width"
              style={{ color:'var(--c-fg-mute)' }}
            >
              {PARA2}
            </motion.p>
          </div>

          {/* Right col — stat cards */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.id}
                {...fadeUp(i * 0.09)}
                data-testid={`stat-${s.id}`}
                className="slide-card rounded-2xl p-5 md:p-6 border-soft"
                style={{ background:'var(--c-surface)' }}
              >
                <span
                  className="block text-2xl mb-3 select-none"
                  aria-hidden="true"
                  style={{ color:'var(--c-mint)', fontFamily:'monospace' }}
                >
                  {s.icon}
                </span>
                <span
                  className="font-display font-bold text-5xl block mb-1"
                  style={{ color:'var(--c-mint)' }}
                >
                  {s.value}
                </span>
                <span
                  className="font-grotesk text-sm font-medium"
                  style={{ color:'var(--c-fg-soft)' }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
