import React, { useState } from 'react';
import {
  CODNESTX_COMPANY,
  CODNESTX_KPIS,
  CODNESTX_BUILT_SYSTEMS,
  CODNESTX_PORTFOLIO,
} from './data/codnestxData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'CRM/ERP Systems', 'AI & Automation', 'Web Applications', 'Mobile Apps', 'Websites'];

  const filteredPortfolio =
    activeCategory === 'All'
      ? CODNESTX_PORTFOLIO
      : CODNESTX_PORTFOLIO.filter((item) => item.category === activeCategory);

  return (
    <div className="font-sans text-[#060821] bg-slate-50">
      {/* React + Vite Quick Control Bar */}
      <div className="bg-[#060821] text-white px-6 py-2.5 text-xs font-bold flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          <span>{CODNESTX_COMPANY.name} &mdash; {CODNESTX_COMPANY.badge}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>KPIs Active: {CODNESTX_KPIS.map((k) => `${k.value} ${k.label}`).slice(0, 3).join(' · ')}</span>
          <a href={`mailto:${CODNESTX_COMPANY.email}`} className="text-[#38BDF8] font-extrabold hover:underline">
            {CODNESTX_COMPANY.email}
          </a>
        </div>
      </div>
    </div>
  );
}
