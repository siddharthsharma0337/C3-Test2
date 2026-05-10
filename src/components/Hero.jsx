import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import C3Hero3D from './C3Hero3D';
import GlowCaret from './GlowCaret';
import { useTheme } from '../context/ThemeContext';

const PHRASES = [
  'Design & Visuals',
  'Web Development',
  'Creative Media',
  'Open Source',
  'Brand Strategy',
  'Competitive Coding',
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const headline1 = 'Coding'.split('');
const headline2 = 'Centralized'.split('');

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [phrase, setPhrase] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [mode, setMode] = useState('typing');
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timeout;
    const target = PHRASES[phraseIdx];
    if (mode === 'typing') {
      if (charIdx < target.length) {
        timeout = setTimeout(() => { setPhrase(target.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 70);
      } else {
        timeout = setTimeout(() => setMode('pausing'), 1400);
      }
    } else if (mode === 'pausing') {
      timeout = setTimeout(() => setMode('erasing'), 500);
    } else if (mode === 'erasing') {
      if (charIdx > 0) {
        timeout = setTimeout(() => { setPhrase(target.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 35);
      } else {
        setPhraseIdx(i => (i + 1) % PHRASES.length);
        setMode('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [mode, charIdx, phraseIdx]);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise"
      style={{ background: isDark ? 'var(--c-bg)' : '#0d1117' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid radial-mask" />

      {/* Ambient blobs — adjusted opacity per theme */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(74,240,160,${isDark ? '0.15' : '0.10'}) 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(56,191,255,${isDark ? '0.12' : '0.08'}) 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">

          {/* ── LEFT: text — full width + centered on mobile, left-aligned on desktop ── */}
          <div className="flex-1 min-w-0 w-full max-w-2xl lg:max-w-none text-center lg:text-left mx-auto lg:mx-0">
            {/* Headline — always white because hero is always dark */}
            <div className="overflow-hidden mb-1">
              <h1
                data-testid="hero-headline-top"
                className="font-display font-semibold whitespace-nowrap"
                style={{
                  color: '#f0f4f8',
                  fontSize: 'clamp(2.2rem, 6vw, 6.5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.02em',
                }}
                aria-label="Coding Centralized"
              >
                {headline1.map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    initial={{ x: randomBetween(-500,500), y: randomBetween(-300,300), rotate: randomBetween(-70,70), opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.0, delay: 0.3 + i * 0.04, ease: [0.22,1,0.36,1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>
            <div className="overflow-hidden mb-7">
              <h1
                data-testid="hero-headline-bottom"
                className="font-display font-semibold text-gradient-mint whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2.2rem, 6vw, 6.5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.02em',
                }}
                aria-hidden="true"
              >
                {headline2.map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    initial={{ x: randomBetween(-500,500), y: randomBetween(-300,300), rotate: randomBetween(-70,70), opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.0, delay: 0.3 + (headline1.length + i) * 0.04, ease: [0.22,1,0.36,1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Terminal */}
            <motion.div
              data-testid="hero-terminal"
              className="mb-7 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)' }}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:1.4 }}
            >
              <span className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
              <span className="font-mono text-sm" style={{ color: '#38bfff' }}>c3.club</span>
              <span className="font-mono text-sm mx-1" style={{ color: 'rgba(255,255,255,0.35)' }}>/</span>
              <span className="font-mono text-sm" style={{ color: '#4af0a0' }}>{phrase}</span>
              <GlowCaret />
            </motion.div>

            {/* Subline */}
            <motion.p
              className="font-grotesk text-base md:text-lg mb-8 body-text-width"
              style={{ color: 'rgba(255,255,255,0.62)' }}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:1.5 }}
            >
              One club. Four disciplines. Infinite possibilities.
              <br />
              Design. Code. Create. Grow — together.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:1.6 }}
            >
              <a
                data-testid="hero-cta-explore"
                href="#domains"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-grotesk font-semibold text-base transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: '#4af0a0', color: '#080b10', boxShadow:'0 0 28px rgba(74,240,160,0.30)' }}
              >
                Explore Domains
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D widget — hidden on mobile, shown on desktop only ── */}
          <motion.div
            className="hidden lg:block flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              width: 'clamp(320px, 38vw, 480px)',
              height: 'clamp(280px, 34vw, 440px)',
              background: '#0e1620',
              border: '1px solid rgba(74,240,160,0.15)',
              boxShadow: '0 0 60px rgba(74,240,160,0.08), 0 24px 80px rgba(0,0,0,0.5)',
            }}
            initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:1.0, delay:0.6, ease:[0.22,1,0.36,1] }}
          >
            <C3Hero3D />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:2.2, duration:0.8 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color:'rgba(255,255,255,0.3)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y:[0,6,0] }}
          transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
          style={{ color:'rgba(255,255,255,0.3)' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}