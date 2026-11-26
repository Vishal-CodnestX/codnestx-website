import React, { useEffect, useState } from 'react';
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
            <div className="cx-ps-dark-banner">
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
