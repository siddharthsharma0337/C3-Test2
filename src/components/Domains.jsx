import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ALL_DOMAINS = [
  { id:'design',       slug:'design',       name:'Design',        category:'design',   desc:'UI/UX, graphic design, motion, and visual communication. Shape how things look and feel.', skills:['Figma','After Effects','Illustrator'], progress:88, color:'#4af0a0', colorRaw:'74,240,160', colorLight:'#0d9e5c' },
  { id:'tech',         slug:'tech',         name:'Tech',          category:'tech',     desc:'Web dev, ML, competitive programming, DevOps. Build the things that power everything.',    skills:['React','Python','DSA'],               progress:94, color:'#38bfff', colorRaw:'56,191,255', colorLight:'#0284c7' },
  { id:'creative',     slug:'creative',     name:'Creative',      category:'creative', desc:'Photography, video, audio, storytelling. Create content that moves people.',               skills:['Premiere','DaVinci','Lightroom'],      progress:76, color:'#f472b6', colorRaw:'244,114,182', colorLight:'#be185d' },
  { id:'ops',          slug:'ops',          name:'Ops',           category:'ops',      desc:'Events, partnerships, logistics, and growth. Make sure everything runs like clockwork.',   skills:['Planning','Outreach','Strategy'],      progress:70, color:'#facc15', colorRaw:'250,204,21',  colorLight:'#b45309' },
  { id:'brand-visuals',slug:'brand-visuals',name:'Brand & Visuals',category:'design',  desc:'Brand identity, style guides, marketing assets, and visual storytelling at scale.',       skills:['Branding','Copywriting','Strategy'],   progress:82, color:'#4af0a0', colorRaw:'74,240,160', colorLight:'#0d9e5c' },
  { id:'open-source',  slug:'open-source',  name:'Open Source',   category:'tech',     desc:'Contribute to OSS projects, build CLI tools, and learn in the open with the community.',  skills:['Git','APIs','OSS'],                   progress:65, color:'#38bfff', colorRaw:'56,191,255', colorLight:'#0284c7' },
];

const FILTERS = [
  { label:'All',      value:'all'      },
  { label:'Design',   value:'design'   },
  { label:'Tech',     value:'tech'     },
  { label:'Creative', value:'creative' },
  { label:'Ops',      value:'ops'      },
];

function ProgressBar({ value, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [width, setWidth] = useState(0);
  useEffect(() => { if (inView) setWidth(value); }, [inView, value]);
  return (
    <div ref={ref} className="progress-track mt-4">
      <div className="progress-fill" style={{ width:`${width}%`, background:`linear-gradient(90deg, ${color}, #38bfff)` }} />
    </div>
  );
}

function DomainCard({ domain, index }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const accent = isDark ? domain.color : domain.colorLight;
  const accentAlpha = isDark ? `rgba(${domain.colorRaw},0.35)` : `${domain.colorLight}55`;

  return (
    <motion.div
      data-testid={`domain-card-${domain.slug}`}
      layout
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-80px' }}
      transition={{ duration:0.5, delay:index*0.08, ease:[0.22,1,0.36,1] }}
      className="lift-card relative rounded-2xl border-soft overflow-hidden p-6 flex flex-col"
      style={{
        background:'var(--c-surface)',
        '--card-accent-border': accentAlpha,
      }}
    >
      {/* Accent top bar */}
      <div className="top-bar absolute top-0 left-0 right-0" style={{ background: accent }} />

      <div className="mb-4">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase px-2 py-1 rounded"
          style={{ color: accent, background:`rgba(${domain.colorRaw},${isDark?'0.12':'0.10'})` }}
        >
          {domain.category}
        </span>
      </div>

      <h3 className="font-display font-semibold text-xl mb-2" style={{ color:'var(--c-fg)' }}>
        {domain.name}
      </h3>
      <p className="font-grotesk text-sm leading-relaxed flex-1" style={{ color:'var(--c-fg-soft)' }}>
        {domain.desc}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {domain.skills.map((s) => (
          <span
            key={s}
            className="font-mono text-[10px] px-2 py-1 rounded border"
            style={{ color:'var(--c-fg-mute)', borderColor:'var(--c-border)' }}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="font-mono text-[10px] tracking-widest" style={{ color:'var(--c-fg-mute)' }}>Activity</span>
        <span className="font-mono text-[10px]" style={{ color: accent }}>{domain.progress}%</span>
      </div>
      <ProgressBar value={domain.progress} color={accent} />
    </motion.div>
  );
}

export default function Domains({ sectionClass = '' }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState('all');

  const list = filter === 'all' ? ALL_DOMAINS : ALL_DOMAINS.filter(d => d.category === filter);

  return (
    <section id="domains" data-testid="domains-section" className={`section-pad ${sectionClass}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
        >
          <span className="eyebrow">Domains</span>
          <h2 className="section-heading mb-4">
            Where you'll <span className="text-gradient-mint">live.</span>
          </h2>
          <p className="font-grotesk text-base md:text-lg body-text-width mb-10" style={{ color:'var(--c-fg-soft)' }}>
            Six specialisations under one roof. Pick your lane — or explore them all.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.5, delay:0.1, ease:[0.22,1,0.36,1] }}
          data-testid="domain-filters"
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                data-testid={`filter-btn-${f.value}`}
                onClick={() => setFilter(f.value)}
                className="px-4 py-2 rounded-full text-sm font-grotesk border transition-all"
                style={{
                  background:  active ? (isDark ? '#4af0a0' : '#0d9e5c') : 'var(--c-surface-2)',
                  color:       active ? (isDark ? '#080b10' : '#ffffff') : 'var(--c-fg)',
                  borderColor: active ? (isDark ? '#4af0a0' : '#0d9e5c') : 'var(--c-border)',
                  boxShadow:   active ? `0 2px 12px ${isDark ? 'rgba(74,240,160,0.30)' : 'rgba(13,158,92,0.28)'}` : 'none',
                  fontWeight:  active ? 700 : 500,
                  transform:   active ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* Card grid */}
        <motion.div
          layout
          className="grid gap-5"
          style={{ gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}
        >
          <AnimatePresence mode="popLayout">
            {list.map((d, i) => (
              <DomainCard key={d.id} domain={d} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
