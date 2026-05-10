import React, { useEffect, useRef } from 'react';

/* ─── floating code panel data ─── */
const PANELS = [
  {
    id: 'panel-tl',
    style: {
      top: '8%', left: '-18%',
      transform: 'rotateY(28deg) rotateX(-12deg) translateZ(40px)',
    },
    lines: ['import { useState }', "from 'react';", '', 'const Club = () => {', '  return <C3 />;', '};'],
    accent: '#4af0a0',
  },
  {
    id: 'panel-tr',
    style: {
      top: '4%', right: '-16%',
      transform: 'rotateY(-24deg) rotateX(-8deg) translateZ(60px)',
    },
    lines: ['git push origin', '  main', '✓ Deployed', '● Build passing', '↑ 3 ahead'],
    accent: '#38bfff',
  },
  {
    id: 'panel-bl',
    style: {
      bottom: '10%', left: '-14%',
      transform: 'rotateY(22deg) rotateX(14deg) translateZ(30px)',
    },
    lines: ['</>', 'HTML · CSS', 'Tailwind', 'Framer'],
    accent: '#c084fc',
  },
  {
    id: 'panel-br',
    style: {
      bottom: '6%', right: '-12%',
      transform: 'rotateY(-20deg) rotateX(10deg) translateZ(50px)',
    },
    lines: ['npm run dev', '> vite', '', 'VITE ready', 'http://localhost'],
    accent: '#fbbf24',
  },
];

export default function C3Hero3D() {
  const sceneRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const curRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef(null);

  useEffect(() => {
    /* ── use the scene's own bounding box so even small
       movements within the element register fully ── */
    const updateBounds = () => {
      if (sceneRef.current) {
        boundsRef.current = sceneRef.current
          .closest('.c3-3d-wrap')
          ?.getBoundingClientRect() ?? null;
      }
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);

    const onMove = (e) => {
      const b = boundsRef.current;
      if (b) {
        /* map mouse relative to the component's own rect — 
           tiny movements inside the element become full -1→1 range */
        const cx = b.left + b.width / 2;
        const cy = b.top + b.height / 2;
        /* use half-width as the normalisation radius so moving
           from center to edge = full ±1 */
        const rx = Math.max(b.width, 320) / 2;
        const ry = Math.max(b.height, 320) / 2;
        mouseRef.current = {
          x: Math.max(-1, Math.min(1, (e.clientX - cx) / rx)),
          y: Math.max(-1, Math.min(1, (e.clientY - cy) / ry)),
        };
      } else {
        /* fallback: full-window normalisation */
        mouseRef.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        };
      }
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      /* 
        Ease bumped from 0.06 → 0.10: snappier tracking.
        Still smooth but reacts noticeably to small movements.
      */
      const ease = 0.10;
      curRef.current.x += (mouseRef.current.x - curRef.current.x) * ease;
      curRef.current.y += (mouseRef.current.y - curRef.current.y) * ease;

      if (sceneRef.current) {
        /*
          Rotation angles bumped significantly:
            X (tilt up/down):  12 → 22 deg
            Y (tilt left/right): 16 → 28 deg
          This makes every small mouse shift clearly visible.
        */
        const rx = -curRef.current.y * 22;
        const ry = curRef.current.x * 28;

        /* Extra: slight Z-roll for depth feel on diagonal movement */
        const rz = curRef.current.x * curRef.current.y * 4;

        sceneRef.current.style.transform =
          `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', updateBounds);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── idle sway when mouse hasn't moved ── */
  useEffect(() => {
    let idleRaf;
    let idleT = 0;
    let lastMove = Date.now();

    const onMove = () => { lastMove = Date.now(); };
    window.addEventListener('mousemove', onMove);

    const idleTick = () => {
      const idle = Date.now() - lastMove > 2000; // 2s without movement
      if (idle && sceneRef.current) {
        idleT += 0.008;
        const swayX = Math.sin(idleT * 0.9) * 0.3;
        const swayY = Math.cos(idleT * 0.7) * 0.2;
        /* blend idle sway INTO the current lerped position */
        mouseRef.current = {
          x: swayX,
          y: swayY,
        };
      }
      idleRaf = requestAnimationFrame(idleTick);
    };
    idleRaf = requestAnimationFrame(idleTick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(idleRaf);
    };
  }, []);

  return (
    <>
      <style>{`
        .c3-3d-wrap {
          perspective: 700px;
          perspective-origin: 50% 42%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          min-height: 420px;
        }

        .c3-scene {
          position: relative;
          width: 260px;
          height: 260px;
          transform-style: preserve-3d;
          /* NO css transition here — rAF drives it directly for instant response */
          will-change: transform;
        }

        .c3-core {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(145deg, #0e1620 0%, #111b26 60%, #0a1018 100%);
          border: 1px solid rgba(74,240,160,0.25);
          box-shadow:
            0 0 0 1px rgba(74,240,160,0.10),
            0 0 60px rgba(74,240,160,0.18),
            0 0 120px rgba(56,191,255,0.10),
            inset 0 1px 0 rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          transform: translateZ(20px);
          animation: c3-float 4s ease-in-out infinite;
        }

        .c3-mark {
          font-family: 'Clash Display', sans-serif;
          font-size: 6.5rem;
          font-weight: 700;
          line-height: 1;
          display: flex;
          align-items: baseline;
          gap: 2px;
          filter: drop-shadow(0 0 24px rgba(74,240,160,0.6));
          transform: translateZ(40px);
          user-select: none;
        }
        .c3-mark .c  { color: #4af0a0; }
        .c3-mark sup {
          font-size: 2.8rem;
          color: #38bfff;
          line-height: 1;
          margin-bottom: 12px;
          filter: drop-shadow(0 0 12px rgba(56,191,255,0.8));
        }

        .c3-triangle {
          position: absolute;
          bottom: -22%;
          left: 50%;
          transform: translateX(-50%) translateZ(-10px) rotateX(10deg);
          width: 0; height: 0;
          border-left:  100px solid transparent;
          border-right: 100px solid transparent;
          border-top:   70px solid rgba(74,240,160,0.18);
          filter: blur(2px);
        }
        .c3-triangle-glow {
          position: absolute;
          bottom: -28%; left: 50%;
          transform: translateX(-50%) translateZ(-30px);
          width: 260px; height: 80px;
          background: radial-gradient(ellipse at 50% 0%, rgba(74,240,160,0.35) 0%, transparent 70%);
          filter: blur(12px);
          pointer-events: none;
        }

        .c3-panel {
          position: absolute;
          width: 140px;
          background: rgba(14,22,32,0.92);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 12px;
          transform-style: preserve-3d;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04);
          animation: c3-float 4s ease-in-out infinite;
          pointer-events: none;
        }
        .c3-panel:nth-child(2) { animation-delay: -0.8s;  animation-duration: 4.4s; }
        .c3-panel:nth-child(3) { animation-delay: -1.6s;  animation-duration: 3.8s; }
        .c3-panel:nth-child(4) { animation-delay: -2.4s;  animation-duration: 4.6s; }
        .c3-panel:nth-child(5) { animation-delay: -3.2s;  animation-duration: 4.2s; }

        .c3-panel-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          display: inline-block;
          margin-bottom: 8px;
        }
        .c3-panel-line {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          overflow: hidden;
        }
        .c3-panel-line.accent { font-weight: 500; }

        .c3-ring {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          border: 1px solid rgba(74,240,160,0.10);
          transform: rotateX(75deg) translateZ(-20px);
          animation: c3-spin 18s linear infinite;
          pointer-events: none;
        }
        .c3-ring::after {
          content: '';
          position: absolute;
          top: -3px; left: 50%;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4af0a0;
          box-shadow: 0 0 10px #4af0a0;
          transform: translateX(-50%);
        }
        .c3-ring-2 {
          position: absolute;
          inset: -70px;
          border-radius: 50%;
          border: 1px solid rgba(56,191,255,0.07);
          transform: rotateX(75deg) rotateZ(60deg) translateZ(-20px);
          animation: c3-spin 28s linear infinite reverse;
          pointer-events: none;
        }
        .c3-ring-2::after {
          content: '';
          position: absolute;
          top: -3px; left: 50%;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #38bfff;
          box-shadow: 0 0 8px #38bfff;
          transform: translateX(-50%);
        }

        .c3-corner-tag {
          position: absolute;
          bottom: -52px; left: 50%;
          transform: translateX(-50%) translateZ(10px);
          background: rgba(14,22,32,0.9);
          border: 1px solid rgba(74,240,160,0.2);
          border-radius: 8px;
          padding: 5px 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #4af0a0;
          white-space: nowrap;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          pointer-events: none;
        }

        @keyframes c3-float {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -14px; }
        }
        @keyframes c3-spin {
          from { transform: rotateX(75deg) translateZ(-20px) rotateZ(0deg); }
          to   { transform: rotateX(75deg) translateZ(-20px) rotateZ(360deg); }
        }

        @media (max-width: 640px) {
          .c3-scene { width: 180px; height: 180px; }
          .c3-mark  { font-size: 4.5rem; }
          .c3-mark sup { font-size: 2rem; }
          .c3-panel, .c3-ring, .c3-ring-2, .c3-triangle { display: none; }
        }
      `}</style>

      <div className="c3-3d-wrap">
        <div className="c3-scene" ref={sceneRef}>

          <div className="c3-ring" />
          <div className="c3-ring-2" />

          {PANELS.map((p) => (
            <div key={p.id} className="c3-panel" style={p.style}>
              <div>
                <span
                  className="c3-panel-dot"
                  style={{ background: p.accent, boxShadow: `0 0 6px ${p.accent}` }}
                />
              </div>
              {p.lines.map((line, i) => (
                <div
                  key={i}
                  className={`c3-panel-line${i === 0 ? ' accent' : ''}`}
                  style={i === 0 ? { color: p.accent } : {}}
                >
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          ))}

          <div className="c3-triangle" />
          <div className="c3-triangle-glow" />

          <div className="c3-core">
            <div className="c3-mark">
              <span className="c">C</span>
              <sup>³</sup>
            </div>
          </div>

          <div className="c3-corner-tag">Coding Centralized</div>

        </div>
      </div>
    </>
  );
}