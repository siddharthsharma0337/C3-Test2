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
      className="flex flex-col items-center p-3 sm:p-4 rounded-xl border-soft"
      style={{ background:'var(--c-surface-2)', minWidth:60 }}
    >
      <span className="font-display font-bold text-2xl sm:text-3xl leading-none" style={{ color:'var(--c-mint)' }}>
        {String(value).padStart(2,'0')}
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em] uppercase mt-1.5" style={{ color:'var(--c-fg-mute)' }}>
        {label}
      </span>
    </div>
  );
}

const SOCIALS = [
  { id:'instagram', name:'Instagram', handle:'@c3.club',       desc:'Behind the scenes, project drops, and announcements.', icon:InstagramIcon, gradient:'grad-instagram', href:'#' },
  { id:'whatsapp',  name:'WhatsApp',  handle:'Community Group', desc:'Join the official WhatsApp community for updates.',     icon:MessageCircle,  gradient:'grad-whatsapp',  href:'#' },
  { id:'linkedin',  name:'LinkedIn',  handle:'C³ Club',         desc:'Professional updates, event recaps, and alumni network.',icon:LinkedinIcon, gradient:'grad-linkedin',  href:'#' },
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
          <p className="font-grotesk text-base md:text-lg body-text-width mb-12" style={{ color:'var(--c-fg-soft)' }}>
            Follow along and be the first to know when applications open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Social cards */}
          <div className="flex flex-col gap-4">
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
                  className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border-soft transition-all hover:scale-[1.02] group"
                  style={{ background:'var(--c-surface)' }}
                >
                  <div className={`${s.gradient} w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={20} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-base" style={{ color:'var(--c-fg)' }}>{s.name}</p>
                    <p className="font-mono text-xs mt-0.5" style={{ color:'var(--c-mint)' }}>{s.handle}</p>
                    <p className="font-grotesk text-sm mt-1 truncate" style={{ color:'var(--c-fg-mute)' }}>{s.desc}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color:'var(--c-fg-mute)' }}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Countdown */}
          <motion.div {...fadeUp(0.15)}>
            <div
              data-testid="countdown-card"
              className="rounded-2xl border-soft p-6 sm:p-8 flex flex-col items-center justify-center text-center h-full relative overflow-hidden"
              style={{ background:'var(--c-surface)' }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
                style={{ background:'radial-gradient(circle, rgba(74,240,160,0.10) 0%, transparent 70%)', filter:'blur(30px)' }}
              />
              <span className="eyebrow mb-1" style={{ justifyContent:'center' }}>Until Inauguration</span>
              <p className="font-display font-semibold text-xl mb-2" style={{ color:'var(--c-fg)' }}>15 May 2026</p>
              <div className="w-12 h-px mb-6 mt-2" style={{ background:'var(--c-border)' }} />

              <div className="flex items-start gap-2 sm:gap-3 mb-8">
                <CounterBox value={t.d} label="Days"    testId="countdown-days"    />
                <div className="font-display font-bold text-xl pt-3" style={{ color:'var(--c-fg-mute)' }}>:</div>
                <CounterBox value={t.h} label="Hours"   testId="countdown-hours"   />
                <div className="font-display font-bold text-xl pt-3" style={{ color:'var(--c-fg-mute)' }}>:</div>
                <CounterBox value={t.m} label="Mins"    testId="countdown-minutes" />
                <div className="font-display font-bold text-xl pt-3" style={{ color:'var(--c-fg-mute)' }}>:</div>
                <CounterBox value={t.s} label="Secs"    testId="countdown-seconds" />
              </div>

              <a
                data-testid="contact-cta"
                href="mailto:hello@c3.club"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-grotesk font-semibold text-base transition-all hover:scale-105"
                style={{ background:'var(--c-mint)', color:'var(--c-ink)', boxShadow:'0 0 20px rgba(74,240,160,0.25)' }}
              >
                Pre-register Interest
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
