import React from 'react';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Domains',  href: '#domains'  },
  { label: 'Why Join', href: '#why-join' },
  { label: 'FAQ',      href: '#faq'      },
  { label: 'Contact',  href: '#contact'  },
];

export default function Footer() {
  return (
    <footer
      data-testid="main-footer"
      style={{
        /* Always dark — intentional contrast closer */
        background: '#0a0f18',
        borderTop:  '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Top row */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-1 select-none shrink-0">
          <span className="font-display font-bold text-xl" style={{ color: '#4af0a0' }}>C</span>
          <sup className="font-display font-bold text-sm" style={{ color: '#38bfff', verticalAlign:'super', lineHeight:0 }}>³</sup>
          <span className="font-display font-semibold text-base ml-1" style={{ color: '#e2e8f0' }}>Club</span>
        </a>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g,'-')}`}
              href={l.href}
              className="font-grotesk text-sm transition-colors hover:text-[#4af0a0]"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
          © 2025–26 C³ Club
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #4af0a0 30%, #38bfff 70%, transparent)',
          opacity: 0.4,
        }}
      />
    </footer>
  );
}
