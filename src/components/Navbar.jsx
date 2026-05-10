import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Domains',  href: '#domains'  },
  { label: 'Why Join', href: '#why-join' },
  { label: 'FAQ',      href: '#faq'      },
  { label: 'Contact',  href: '#contact'  },
];

/* ── Animated 3-line hamburger / X ── */
function HamburgerIcon({ open }) {
  return (
    <span
      className={`flex flex-col items-center justify-center gap-[5px] ${open ? 'ham-open' : ''}`}
      style={{ width: 20, height: 20 }}
      aria-hidden="true"
    >
      <span className="ham-line ham-line-1" />
      <span className="ham-line ham-line-2" />
      <span className="ham-line ham-line-3" />
    </span>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile,   setIsMobile]   = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isDark = theme === 'dark';

  return (
    <>
      {/* ─── NAV STYLES (scoped via class names) ─── */}
      <style>{`
        .c3-desktop-nav { display: flex; }
        .c3-join-btn     { display: inline-flex; }
        .c3-hamburger    { display: none; }

        @media (max-width: 768px) {
          .c3-desktop-nav { display: none !important; }
          .c3-join-btn    { display: none !important; }
          .c3-hamburger   { display: flex !important; }
        }

        .c3-nav-link {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--c-fg-soft);
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
          position: relative;
        }
        .c3-nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1.5px;
          background: var(--c-mint);
          border-radius: 999px;
          transition: width 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .c3-nav-link:hover { color: var(--c-fg); }
        .c3-nav-link:hover::after { width: 100%; }

        .c3-theme-btn {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid var(--c-border);
          background: var(--c-surface);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-fg-soft); cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .c3-theme-btn:hover {
          background: var(--c-surface-2);
          color: var(--c-fg);
          transform: rotate(15deg);
        }

        .c3-join-btn {
          align-items: center;
          padding: 8px 20px; border-radius: 9999px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 0.875rem; font-weight: 700;
          background: var(--c-mint); color: var(--c-ink);
          text-decoration: none; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 18px rgba(74,240,160,0.22);
        }
        .c3-join-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 6px 24px rgba(74,240,160,0.38);
        }

        /* Premium hamburger button */
        .c3-hamburger {
          width: 40px; height: 40px; border-radius: 10px;
          border: 1px solid var(--c-border);
          background: var(--c-surface);
          align-items: center; justify-content: center;
          color: var(--c-fg); cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .c3-hamburger:hover {
          background: var(--c-surface-2);
          border-color: var(--c-mint);
          transform: scale(1.05);
        }
        .c3-hamburger:active { transform: scale(0.96); }

        /* Drawer links */
        .c3-drawer-link {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(1.5rem, 6vw, 2rem); font-weight: 600;
          color: var(--c-fg);
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid var(--c-border);
          transition: color 0.2s, padding-left 0.2s;
          display: block;
        }
        .c3-drawer-link:hover {
          color: var(--c-mint);
          padding-left: 8px;
        }
        .c3-drawer-link:last-child { border-bottom: none; }
      `}</style>

      {/* ─── NAV SHELL ─── */}
      <header
        data-testid="main-navbar"
        style={{
          position:  'fixed',
          left:      '50%',
          transform: 'translateX(-50%)',
          zIndex:    50,
          top:            scrolled ? '12px'      : '0px',
          width:          scrolled ? '94vw'      : '100vw',
          maxWidth:       scrolled ? '760px'     : '100vw',
          borderRadius:   scrolled ? '9999px'    : '0px',
          padding:        scrolled ? '8px 18px'  : '0',
          background:     scrolled
            ? isDark
              ? 'rgba(8,11,16,0.82)'
              : 'rgba(248,250,249,0.88)'
            : 'transparent',
          backdropFilter:       scrolled ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          border:       scrolled ? '1px solid var(--c-border)' : '1px solid transparent',
          borderBottom: scrolled ? undefined : '1px solid var(--c-border)',
          boxShadow:    scrolled ? '0 8px 40px rgba(0,0,0,0.2)' : 'none',
          transition: [
            'top 0.55s cubic-bezier(0.22,1,0.36,1)',
            'width 0.55s cubic-bezier(0.22,1,0.36,1)',
            'max-width 0.55s cubic-bezier(0.22,1,0.36,1)',
            'border-radius 0.55s cubic-bezier(0.22,1,0.36,1)',
            'padding 0.45s cubic-bezier(0.22,1,0.36,1)',
            'background 0.4s ease',
            'backdrop-filter 0.4s ease',
            'border 0.3s ease',
            'box-shadow 0.4s ease',
          ].join(','),
        }}
      >
        <div style={{
          maxWidth:       scrolled ? '100%'  : '1200px',
          margin:         '0 auto',
          padding:        scrolled ? '0' : isMobile ? '14px 20px' : '16px 48px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '12px',
          transition:     'padding 0.45s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* ── LOGO ── */}
          <a
            data-testid="nav-logo"
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); }}
            style={{ display:'flex', alignItems:'baseline', gap:'1px', textDecoration:'none', flexShrink:0, userSelect:'none' }}
          >
            <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:'1.4rem', fontWeight:700, color:'var(--c-mint)', lineHeight:1 }}>C</span>
            <sup  style={{ fontFamily:"'Clash Display',sans-serif", fontSize:'0.7rem', fontWeight:700, color:'var(--c-electric)', lineHeight:1, verticalAlign:'super' }}>³</sup>
            <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:'1.2rem', fontWeight:600, color:'var(--c-fg)', marginLeft:'5px', lineHeight:1 }}>Club</span>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <nav className="c3-desktop-nav" style={{ alignItems:'center', gap:'26px', flex:1, justifyContent:'center' }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g,'-')}`}
                href={l.href}
                onClick={(e) => handleAnchor(e, l.href)}
                className="c3-nav-link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* ── RIGHT CONTROLS ── */}
          <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
            <button
              data-testid="theme-toggle"
              onClick={toggle}
              aria-label="Toggle theme"
              className="c3-theme-btn"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Join Now — desktop only */}
            <a
              href="#contact"
              onClick={(e) => handleAnchor(e, '#contact')}
              className="c3-join-btn"
            >
              Join Now
            </a>

            {/* Premium animated hamburger — mobile only */}
            <button
              data-testid="mobile-menu-button"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="c3-hamburger"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE RIGHT-SIDE PANEL ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — click to close */}
            <motion.div
              data-testid="mobile-menu-backdrop"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 60,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* Panel — slides in from right, never full-screen */}
            <motion.div
              data-testid="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: 'min(78vw, 300px)',   /* never wider than 300px */
                zIndex: 70,
                background: isDark ? '#0c1018' : '#ffffff',
                borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                boxShadow: '-12px 0 48px rgba(0,0,0,0.25)',
                overflowY: 'auto',
              }}
            >
              {/* Panel header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
              }}>
                {/* Mini logo */}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ display: 'flex', alignItems: 'baseline', gap: '1px', textDecoration: 'none', userSelect: 'none' }}
                >
                  <span style={{ fontFamily: "'Clash Display',sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--c-mint)' }}>C</span>
                  <sup style={{ fontFamily: "'Clash Display',sans-serif", fontSize: '0.6rem', fontWeight: 700, color: 'var(--c-electric)', verticalAlign: 'super' }}>³</sup>
                  <span style={{ fontFamily: "'Clash Display',sans-serif", fontSize: '1rem', fontWeight: 600, color: 'var(--c-fg)', marginLeft: '4px' }}>Club</span>
                </a>

                {/* Close — X icon */}
                <button
                  data-testid="mobile-menu-close"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'}`,
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--c-fg-mute)', cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <HamburgerIcon open={true} />
                </button>
              </div>

              {/* Nav links — stagger in */}
              <nav style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '8px 0' }}>
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: 'var(--c-fg)',
                      textDecoration: 'none',
                      padding: '13px 20px',
                      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.18s, color 0.18s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = isDark ? 'rgba(74,240,160,0.06)' : 'rgba(13,158,92,0.06)';
                      e.currentTarget.style.color = 'var(--c-mint)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--c-fg)';
                    }}
                  >
                    <span>{l.label}</span>
                    <span style={{ color: 'var(--c-fg-mute)', fontSize: '0.7rem', opacity: 0.6 }}>→</span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom: subtle version tag */}
              <div style={{
                padding: '14px 20px',
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
              }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: 'var(--c-fg-mute)', letterSpacing: '0.1em' }}>
                  C³ CLUB · INAUGURAL 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
}