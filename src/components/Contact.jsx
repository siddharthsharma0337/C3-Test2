import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

const InstagramIcon = ({ size=22, color='currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LinkedinIcon = ({ size=22, color='currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TARGET_DATE = new Date('2026-05-15T00:00:00+05:30').getTime();
function getDiff() {
  let secs = Math.max(0, Math.floor((TARGET_DATE - Date.now()) / 1000));
  const d = Math.floor(secs / 86400); secs -= d * 86400;
  const h = Math.floor(secs / 3600);  secs -= h * 3600;
  const m = Math.floor(secs / 60);    secs -= m * 60;
  return { d, h, m, s: secs };
}

function CounterBox({ value, label, testId }) {
  return (
    <div
      data-testid={testId}
      className="flex flex-col items-center rounded-xl border-soft"
      style={{ background:'var(--c-surface-2)', padding:'10px 12px', minWidth:52 }}
    >
      <span
        className="font-display font-bold leading-none"
        style={{ color:'var(--c-mint)', fontSize:'clamp(1.25rem, 5vw, 1.75rem)' }}
      >
        {String(value).padStart(2,'0')}
      </span>
      <span className="font-mono tracking-widest uppercase mt-1" style={{ color:'var(--c-fg-mute)', fontSize:'8px' }}>
        {label}
      </span>
    </div>
  );
}

const SOCIALS = [
  { id:'instagram', name:'Instagram', handle:'@c3.club',        desc:'Behind the scenes & announcements.',         icon:InstagramIcon, gradient:'grad-instagram', href:'#' },
  { id:'whatsapp',  name:'WhatsApp',  handle:'Community Group', desc:'Join the official community for updates.',   icon:MessageCircle, gradient:'grad-whatsapp',  href:'#' },
  { id:'linkedin',  name:'LinkedIn',  handle:'C³ Club',          desc:'Events, recaps, and alumni network.',        icon:LinkedinIcon,  gradient:'grad-linkedin',  href:'#' },
];

const fadeUp = (delay=0) => ({
  initial:     { opacity:0, y:24 },
  whileInView: { opacity:1, y:0  },
  viewport:    { once:true, margin:'-80px' },
  transition:  { duration:0.55, delay, ease:[0.22,1,0.36,1] },
});

export default function Contact({ sectionClass = '' }) {
  const [t, setT] = useState(getDiff());
  useEffect(() => {
    const id = setInterval(() => setT(getDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" data-testid="contact-section" className={`section-pad ${sectionClass}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <motion.div {...fadeUp(0)}>
          <span className="eyebrow">Contact</span>
          <h2 className="section-heading mb-4">
            Find us. <span className="text-gradient-mint">There.</span>
          </h2>
          <p className="font-grotesk text-base md:text-lg body-text-width mb-10" style={{ color:'var(--c-fg-soft)' }}>
            Follow along and be the first to know when applications open.
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8">

          {/* ── COUNTDOWN — first on mobile, right column on desktop ── */}
          <motion.div {...fadeUp(0.15)} className="lg:order-2">
            <div
              data-testid="countdown-card"
              className="rounded-2xl border-soft flex flex-col items-center justify-center text-center relative overflow-hidden"
              style={{ background:'var(--c-surface)', padding:'28px 20px' }}
            >
              {/* Ambient glow */}
              <div
                style={{
                  position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                  width:240, height:240, borderRadius:'50%', pointerEvents:'none',
                  background:'radial-gradient(circle, rgba(74,240,160,0.10) 0%, transparent 70%)',
                  filter:'blur(28px)',
                }}
              />

              <span className="eyebrow mb-1" style={{ justifyContent:'center' }}>Until Inauguration</span>
              <p className="font-display font-semibold text-lg mb-1" style={{ color:'var(--c-fg)' }}>
                15 May 2026
              </p>
              <div style={{ width:40, height:1, background:'var(--c-border)', margin:'10px 0 20px' }} />

              {/* Counter row */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:'clamp(4px, 2vw, 10px)', marginBottom:24 }}>
                <CounterBox value={t.d} label="Days"  testId="countdown-days"    />
                <span className="font-display font-bold" style={{ color:'var(--c-fg-mute)', paddingTop:10, fontSize:'1.1rem' }}>:</span>
                <CounterBox value={t.h} label="Hours" testId="countdown-hours"   />
                <span className="font-display font-bold" style={{ color:'var(--c-fg-mute)', paddingTop:10, fontSize:'1.1rem' }}>:</span>
                <CounterBox value={t.m} label="Mins"  testId="countdown-minutes" />
                <span className="font-display font-bold" style={{ color:'var(--c-fg-mute)', paddingTop:10, fontSize:'1.1rem' }}>:</span>
                <CounterBox value={t.s} label="Secs"  testId="countdown-seconds" />
              </div>

              <a
                data-testid="contact-cta"
                href="mailto:hello@c3.club"
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'11px 24px', borderRadius:9999,
                  fontFamily:"'Cabinet Grotesk',sans-serif", fontWeight:700, fontSize:'0.9rem',
                  background:'var(--c-mint)', color:'var(--c-ink)',
                  textDecoration:'none',
                  boxShadow:'0 0 18px rgba(74,240,160,0.22)',
                  transition:'transform 0.2s',
                  whiteSpace:'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Pre-register Interest
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* ── SOCIALS ── */}
          <div className="lg:order-1">
            {/* Desktop: full social cards */}
            <div className="hidden lg:flex flex-col gap-3">
              {SOCIALS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.id}
                    {...fadeUp(i * 0.1)}
                    data-testid={`social-${s.id}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border-soft"
                    style={{
                      background: 'var(--c-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 16px',
                      textDecoration: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <div
                      className={`${s.gradient} rounded-xl flex items-center justify-center`}
                      style={{ width:44, height:44, flexShrink:0 }}
                    >
                      <Icon size={19} color="white" />
                    </div>
                    <div style={{ flex:1, minWidth:0, overflow:'hidden' }}>
                      <p className="font-display font-semibold text-sm" style={{ color:'var(--c-fg)' }}>
                        {s.name}
                      </p>
                      <p className="font-mono text-[11px] mt-0.5" style={{ color:'var(--c-mint)' }}>
                        {s.handle}
                      </p>
                      <p
                        className="font-grotesk text-xs mt-0.5 leading-snug"
                        style={{ color:'var(--c-fg-mute)', whiteSpace:'normal', wordBreak:'break-word' }}
                      >
                        {s.desc}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      style={{ color:'var(--c-fg-mute)', flexShrink:0, transition:'transform 0.2s' }}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile: icon-only chips in a single equal row */}
            <div className="flex lg:hidden items-stretch gap-3">
              {SOCIALS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.id}
                    data-testid={`social-${s.id}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.38, ease: [0.22,1,0.36,1] }}
                    className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-soft"
                    style={{
                      background: 'var(--c-surface)',
                      textDecoration: 'none',
                      transition: 'transform 0.18s',
                    }}
                    onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.96)'; }}
                    onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <div
                      className={`${s.gradient} rounded-xl flex items-center justify-center`}
                      style={{ width:46, height:46, flexShrink:0, boxShadow:'0 4px 14px rgba(0,0,0,0.25)' }}
                    >
                      <Icon size={20} color="white" />
                    </div>
                    <span className="font-grotesk text-[11px] font-semibold" style={{ color:'var(--c-fg-soft)' }}>
                      {s.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
