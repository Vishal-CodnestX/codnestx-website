import React, { useEffect, useRef, useState } from 'react';
import '../styles/codnestx-redesign.css';

const INDUSTRIES = [
  {
    "idx": 1,
    "num": "001.",
    "cat": "MANUFACTURING & ERP",
    "title": "Manufacturing",
    "desc": "Replace fragmented floor sheets and delayed shift handoffs with a unified production, inventory, and quality ERP that tracks every raw material batch through final dispatch.",
    "cards": [
      {
        "img": "mfg_1.jpg",
        "kicker": "PROBLEM SOLVED",
        "pills": [
          "SKU-4821 \u00b7 matched",
          "Plant B \u00b7 100% synced"
        ],
        "title": "Zero Stock Mismatch Across Multi-Plant Warehouses",
        "sub": "Automated raw, WIP, and finished-goods reconciliation synced with floor scanners.",
        "metric_val": "Zero",
        "metric_lbl": "stock mismatch across warehouses"
      },
      {
        "img": "mfg_2.jpg",
        "kicker": "SYSTEM ENGINEERED",
        "pills": [
          "Batch #428 \u00b7 68%",
          "QC passed \u2713"
        ],
        "title": "Live Production Floor & Quality Control Ledger",
        "sub": "Real-time job cards, rejection analytics, and automated reorder triggers.",
        "metric_val": "+84%",
        "metric_lbl": "faster order-to-dispatch handoff"
      }
    ]
  },
  {
    "idx": 2,
    "num": "002.",
    "cat": "SUPPLY CHAIN & WMS",
    "title": "Trading, Distribution & Logistics",
    "desc": "Eliminate blind spots between warehouses, dealers, and fleet routes. Synchronize bulk quotes, credit limits, courier tracking, and live deliveries in one control tower.",
    "cards": [
      {
        "img": "log_1.jpg",
        "kicker": "PROBLEM SOLVED",
        "pills": [
          "Fleet #14 \u00b7 On Route",
          "42 Depots \u00b7 Live"
        ],
        "title": "Real-Time Fleet & Multi-Depot Dispatch Control",
        "sub": "Connected barcode scanning, live courier tracking, and instant dealer alerts.",
        "metric_val": "-15%",
        "metric_lbl": "lower fuel & route waste"
      },
      {
        "img": "log_2.jpg",
        "kicker": "SYSTEM ENGINEERED",
        "pills": [
          "Dealer PO \u00b7 Approved",
          "Pick-List \u00b7 Auto"
        ],
        "title": "Self-Serve B2B Dealer & Credit Approval Engine",
        "sub": "Automated tiered pricing, ledger checks, and one-click invoice generation.",
        "metric_val": "60%",
        "metric_lbl": "faster order processing"
      }
    ]
  },
  {
    "idx": 3,
    "num": "003.",
    "cat": "INFRASTRUCTURE & PROPTECH",
    "title": "Construction, Infrastructure & Real Estate",
    "desc": "Unify site progress, BOQ procurement, channel partner leads, and milestone billing so project heads and sales teams operate from a single verified source of truth.",
    "cards": [
      {
        "img": "con_1.jpg",
        "kicker": "PROBLEM SOLVED",
        "pills": [
          "Tower A \u00b7 94% Booked",
          "Broker Sync \u00b7 Live"
        ],
        "title": "Live Unit Availability & Channel Partner CRM",
        "sub": "Zero double-bookings with mobile-first site visit logging and follow-up alerts.",
        "metric_val": "-90%",
        "metric_lbl": "fewer manual status calls"
      },
      {
        "img": "con_2.jpg",
        "kicker": "SYSTEM ENGINEERED",
        "pills": [
          "BOQ Indent \u00b7 Verified",
          "Stage 4 \u00b7 Billed"
        ],
        "title": "Site Material Requisition & Milestone Tracker",
        "sub": "Field mobile apps for indents, site progress photos, and stage-wise billing.",
        "metric_val": "40%",
        "metric_lbl": "faster vendor approvals"
      }
    ]
  },
  {
    "idx": 4,
    "num": "004.",
    "cat": "OMNICHANNEL COMMERCE",
    "title": "Retail, E-commerce & Consumer Goods",
    "desc": "Connect storefronts, multi-city outlets, POS billing, and settlements into one real-time stock and margin engine that prevents stockouts automatically.",
    "cards": [
      {
        "img": "ret_1.jpg",
        "kicker": "PROBLEM SOLVED",
        "pills": [
          "28 Stores \u00b7 Synced",
          "Reorder \u00b7 Triggered"
        ],
        "title": "Instant Multi-Store Stock & Automated Reorders",
        "sub": "Unified online and physical store inventory with threshold-based vendor POs.",
        "metric_val": "99.4%",
        "metric_lbl": "real-time inventory accuracy"
      },
      {
        "img": "ret_2.jpg",
        "kicker": "SYSTEM ENGINEERED",
        "pills": [
          "Settlement \u00b7 Matched",
          "GST Ledger \u00b7 Clean"
        ],
        "title": "Automated Gateway & Marketplace Reconciliation",
        "sub": "Zero-touch matching across digital payments, COD remittances, and GST invoices.",
        "metric_val": "18h",
        "metric_lbl": "saved weekly per store"
      }
    ]
  },
  {
    "idx": 5,
    "num": "005.",
    "cat": "CLINICAL & PATIENT SYSTEMS",
    "title": "Healthcare",
    "desc": "Streamline patient intake, diagnostic workflows, appointment scheduling, and compliant digital records with role-based security and automated follow-ups.",
    "cards": [
      {
        "img": "hea_1.jpg",
        "kicker": "PROBLEM SOLVED",
        "pills": [
          "Queue \u00b7 4 min wait",
          "Lab Report \u00b7 Sent"
        ],
        "title": "Zero-Friction Patient Intake & Queue Automation",
        "sub": "Automated booking confirmations, instant lab report delivery, and follow-up nudges.",
        "metric_val": "-52%",
        "metric_lbl": "reduction in patient no-shows"
      },
      {
        "img": "hea_2.jpg",
        "kicker": "SYSTEM ENGINEERED",
        "pills": [
          "12 Clinics \u00b7 Active",
          "SSO \u00b7 Verified"
        ],
        "title": "Role-Secured Multi-Clinic Operations Suite",
        "sub": "Enterprise authentication, doctor rostering, pharmacy alerts, and unified billing.",
        "metric_val": "99.9%",
        "metric_lbl": "system uptime SLA"
      }
    ]
  },
  {
    "idx": 6,
    "num": "006.",
    "cat": "PROFESSIONAL SERVICES & AI",
    "title": "Services & Consulting",
    "desc": "Turn manual lead qualification, proposal generation, client onboarding, and timesheet billing into an AI-assisted operating system that scales without overhead.",
    "cards": [
      {
        "img": "ser_1.jpg",
        "kicker": "PROBLEM SOLVED",
        "pills": [
          "Lead Score \u00b7 96/100",
          "Call Booked \u00b7 45s"
        ],
        "title": "45-Second AI Lead Qualification & CRM Routing",
        "sub": "Enriches inbound prospects, drafts tailored replies, and books discovery calls.",
        "metric_val": "45s",
        "metric_lbl": "average lead response time"
      },
      {
        "img": "ser_2.jpg",
        "kicker": "SYSTEM ENGINEERED",
        "pills": [
          "Retainer \u00b7 On Track",
          "Margin \u00b7 +24%"
        ],
        "title": "Unified Client Delivery, HRMS & Retainer Ledger",
        "sub": "Brings project milestones, team utilization, invoicing, and margins into one hub.",
        "metric_val": "3.8x",
        "metric_lbl": "faster client onboarding"
      }
    ]
  }
];

export default function ProblemsWeSolved() {
  const [activeIdx, setActiveIdx] = useState(1);
  const bannerRef = useRef(null);
  const canvasRef = useRef(null);
  const setShapeRef = useRef(null);

  useEffect(() => {
    const bn = bannerRef.current;
    const cv = canvasRef.current;
    if (!bn || !cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const punch = (c, f) => {
      c.globalCompositeOperation = 'destination-out';
      f();
      c.globalCompositeOperation = 'source-over';
    };

    const shapes = [
      (c) => { c.translate(18, 16); for (let i = 0; i < 8; i++) { c.save(); c.rotate(i * Math.PI / 4); c.fillRect(-2, -14, 4, 5); c.restore(); } c.beginPath(); c.arc(0, 0, 10.5, 0, 7); c.fill(); punch(c, () => { c.beginPath(); c.arc(0, 0, 4.5, 0, 7); c.fill(); }); },
      (c) => { c.fillRect(5, 8, 16, 13); c.beginPath(); c.moveTo(22, 12); c.lineTo(29, 12); c.lineTo(33, 17); c.lineTo(33, 21); c.lineTo(22, 21); c.closePath(); c.fill(); punch(c, () => { c.fillRect(25, 14, 5, 3); [11, 27].forEach((x) => { c.beginPath(); c.arc(x, 22, 4.8, 0, 7); c.fill(); }); }); [11, 27].forEach((x) => { c.beginPath(); c.arc(x, 23, 3.4, 0, 7); c.fill(); }); },
      (c) => { c.fillRect(9, 3, 14, 26); c.fillRect(23, 12, 8, 17); c.fillRect(4, 29, 28, 1.8); punch(c, () => { for (let r = 0; r < 5; r++) for (let k = 0; k < 3; k++) c.fillRect(11.2 + k * 4.2, 5.5 + r * 4.4, 2.4, 2.4); for (let r = 0; r < 3; r++) for (let k = 0; k < 2; k++) c.fillRect(25 + k * 3.2, 14.5 + r * 4.6, 2, 2); }); },
      (c) => { c.fillRect(8, 10, 20, 18); c.lineWidth = 2.2; c.beginPath(); c.arc(18, 10, 5.5, Math.PI, 2 * Math.PI); c.stroke(); punch(c, () => { [14, 22].forEach((x) => { c.beginPath(); c.arc(x, 14, 1.1, 0, 7); c.fill(); }); }); },
      (c) => { c.beginPath(); c.roundRect(14, 3, 8, 26, 2); c.fill(); c.beginPath(); c.roundRect(5, 12, 26, 8, 2); c.fill(); c.lineWidth = 1.4; c.beginPath(); c.arc(18, 16, 15.5, 0, 7); c.stroke(); },
      (c) => { c.beginPath(); c.roundRect(5, 10, 26, 18, 2); c.fill(); c.lineWidth = 2.4; c.lineJoin = 'round'; c.beginPath(); c.moveTo(13, 10); c.lineTo(13, 5.5); c.lineTo(23, 5.5); c.lineTo(23, 10); c.stroke(); punch(c, () => { c.fillRect(5, 17, 26, 1.6); }); c.fillRect(16, 15.2, 4, 4.6); }
    ];

    const GAP = 0.86, BG_R = 0.95, BG_A = 0.34, SHAPE_R = 1.84, K = 0.050, DAMP = 0.86, CYCLE = 4500, POP = 0.70, POPADD = 0.7;
    let W = bn.clientWidth || 460, H = bn.clientHeight || 540, SP = 12.78, SPD = SP * GAP, COLS = 36, ROWS = 42, N = COLS * ROWS, cx = 18, cy = 16, OX = 0, OY = 0;
    let cov = [], cur, vel, tgt, delay, wc;
    let idx = 0, t0 = performance.now(), last = t0, timer = null, rafId = 0;

    const buildGrid = () => {
      W = bn.clientWidth || 460; H = bn.clientHeight || 540;
      const dpr = window.devicePixelRatio || 1;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      SP = Math.min(W / 36, (H * 0.45) / 30); SPD = SP * GAP;
      COLS = Math.max(36, Math.ceil(W / SPD) + 2); ROWS = Math.max(36, Math.ceil(H / SPD) + 2); N = COLS * ROWS;
      cx = Math.round(COLS / 2); cy = Math.round((H * 0.335) / SPD); OX = W * 0.5; OY = H * 0.335;
      cov = shapes.map((f) => {
        const o = document.createElement('canvas'); o.width = COLS; o.height = ROWS;
        const c = o.getContext('2d'); c.fillStyle = '#000'; c.strokeStyle = '#000';
        c.save(); c.translate(cx - 18, cy - 16); f(c); c.restore();
        const d = c.getImageData(0, 0, COLS, ROWS).data;
        const a = new Float32Array(N); for (let i = 0; i < N; i++) a[i] = d[i * 4 + 3] / 255;
        return a;
      });
      cur = new Float32Array(N).fill(BG_R); vel = new Float32Array(N); tgt = new Float32Array(N).fill(BG_R); delay = new Float32Array(N); wc = new Float32Array(N);
    };

    const chain = () => {
      for (let i = 0; i < N; i++) { wc[i] = 0.044 + Math.random() * 0.036; delay[i] = 1e9; }
      const s = Math.min(ROWS - 1, Math.max(0, cy)) * COLS + Math.min(COLS - 1, Math.max(0, cx)); delay[s] = 0; const q = [s];
      while (q.length) {
        const i = q.shift(), c = i % COLS, r = (i / COLS) | 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nc = c + dx, nr = r + dy;
          if (nc < 0 || nr < 0 || nc >= COLS || nr >= ROWS) continue;
          const j = nr * COLS + nc, nd = delay[i] + wc[j] * (dx && dy ? 1.4 : 1);
          if (nd < delay[j] - 1e-4) { delay[j] = nd; q.push(j); }
        }
      }
    };

    const setShape = (k) => {
      idx = ((k % 6) + 6) % 6;
      const c2 = cov[idx]; if (!c2) return;
      for (let i = 0; i < N; i++) tgt[i] = BG_R + Math.pow(c2[i], 0.85) * (SHAPE_R - BG_R);
      chain(); t0 = performance.now();
    };

    const restart = () => { clearInterval(timer); timer = setInterval(() => setShape((idx + 1) % 6), CYCLE); };

    const frame = (ts) => {
      const dt = Math.min((ts - last) / 16.67, 2.5); last = ts; const now = (ts - t0) / 1000;
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#38BDF8';
      const kd = Math.pow(DAMP, dt);
      for (let i = 0; i < N; i++) {
        const col = i % COLS, row = (i / COLS) | 0, x = OX + (col - cx) * SPD, y = OY + (row - cy) * SPD;
        if (tgt[i] <= BG_R + 0.02 && cur[i] <= BG_R + 0.02) { cur[i] = BG_R; vel[i] = 0; ctx.globalAlpha = BG_A; ctx.beginPath(); ctx.arc(x, y, BG_R, 0, 7); ctx.fill(); continue; }
        const age = now - delay[i]; let bump = 0;
        if (age > 0) { vel[i] += (tgt[i] - cur[i]) * K * dt; vel[i] *= kd; cur[i] += vel[i] * dt; if (age < POP && tgt[i] > BG_R + 0.02) bump = Math.sin(Math.PI * age / POP); }
        const lvl = Math.min(1, Math.max(0, (cur[i] - BG_R) / (SHAPE_R - BG_R)));
        const r = Math.max(BG_R, cur[i]) + POPADD * bump * (1 - 0.55 * lvl);
        ctx.globalAlpha = Math.min(1, BG_A + (1 - BG_A) * lvl + 0.25 * bump * (1 - lvl));
        ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      }
      rafId = requestAnimationFrame(frame);
    };

    buildGrid(); setShape(0); restart(); rafId = requestAnimationFrame(frame);
    setShapeRef.current = (k) => { if (k !== idx) setShape(k); restart(); };
    return () => { clearInterval(timer); cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => {
    if (setShapeRef.current) setShapeRef.current(activeIdx - 1);
  }, [activeIdx]);

  useEffect(() => {
    const items = document.querySelectorAll('#problems-solved-section .cx-ps-item');
    if (!items.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-ps-index') || '1', 10);
            setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: 0.05 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const circumference = 2 * Math.PI * 26;
  const dashOffset = (circumference * (1 - activeIdx / INDUSTRIES.length)).toFixed(2);

  return (
    <section
      id="problems-solved-section"
      className="cx-ps-section"
      aria-labelledby="cx-ps-heading"
    >
      <div className="cx-ps-container">
        <div className="cx-ps-split">
          <aside className="cx-ps-sticky-col">
            <div ref={bannerRef} className="cx-ps-dark-banner" style={{ background: "radial-gradient(circle at 60% 40%, #0D2966 0%, #07112B 55%, #040714 100%)" }}>
              <canvas ref={canvasRef} id="cx-ps-dotmatrix-cv" className="cx-ps-dotmatrix-canvas" aria-hidden="true" />
              <div className="cx-ps-banner-top">
                <div className="cx-ps-banner-code">
                  <span className="cx-ps-code-box" />
                  <span>[CX - 03]</span>
                </div>
                <div className="cx-ps-banner-eyebrow">PROBLEMS WE&apos;VE SOLVED</div>
              </div>
              <div className="cx-ps-banner-bottom">
                <h2 id="cx-ps-heading" className="cx-ps-banner-title">
                  Problems
                  <br />
                  We&apos;ve Solved
                </h2>
                <p className="cx-ps-banner-lead">
                  Six core industries engineered with custom ERP, CRM, AI automation, and unified business workflows.
                </p>
                <div className="cx-ps-banner-foot">
                  <a href="#cx-cta-section" className="cx-ps-banner-cta">
                    <span>START A PROJECT</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <div className="cx-ps-progress-dial" aria-label="Active industry progress">
                    <svg viewBox="0 0 64 64" className="cx-ps-dial-svg">
                      <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.16)" strokeWidth="2.5" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                        fill="none"
                        strokeDasharray={circumference.toFixed(2)}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <span className="cx-ps-dial-text">
                      {activeIdx}/{INDUSTRIES.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="cx-ps-scroll-col">
            {INDUSTRIES.map((ind) => (
              <article
                key={ind.idx}
                className="cx-ps-item"
                data-ps-index={ind.idx}
                id={`industry-${ind.idx}`}
              >
                <div className="cx-ps-eyebrow-row">
                  <span className="cx-ps-num">{ind.num}</span>
                  <span className="cx-ps-cat">{ind.cat}</span>
                </div>
                <h3 className="cx-ps-title">{ind.title}</h3>
                <p className="cx-ps-desc">{ind.desc}</p>
                <div className="cx-ps-cards-grid">
                  {ind.cards.map((card, cIdx) => (
                    <div key={cIdx} className="cx-ps-case-card cx-ps-visual-card">
                      <img
                        className="cx-ps-card-bg-img"
                        src={`/images/industries/${card.img}`}
                        alt={card.title}
                        loading="lazy"
                      />
                      <div className="cx-ps-card-scrim" aria-hidden="true" />
                      <div className="cx-ps-card-overlay">
                        <div className="cx-ps-card-bottom">
                          <h4 className="cx-ps-case-title">{card.title}</h4>
                          <p className="cx-ps-case-desc">{card.sub}</p>
                          <div className="cx-ps-case-metric">
                            <strong>{card.metric_val}</strong>
                            <span>{card.metric_lbl}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
