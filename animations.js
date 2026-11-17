(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  // 2. 6 BEFORE VS. AFTER CODNESTX PROBLEMS (REPLICATED FROM image_89a3bf.jpg & codnestx.com)
  var BEFORE_AFTER_PROBLEMS = [
    {
      num: "01",
      tag: "PROBLEM 01",
      badge: "RETAIL",
      title: "Retail Inventory & Reorder Automation",
      meta: "Retail Business · Retail Operations · Ahmedabad, Gujarat",
      desc: "From scattered inventory updates to a centralized system with real-time visibility and automated reorders.",
      afterTitle: "Inventory Dashboard",
      nodes: [
        { t1: "Excel stock sheet", t2: "Store A: 148 SKUs", bg: "#10B981", ico: "X", top: "6%", left: "4%", rot: "-4deg" },
        { t1: "WhatsApp update", t2: "Need 12 boxes", bg: "#22C55E", ico: "💬", top: "4%", left: "44%", rot: "3deg" },
        { t1: "Inventory checklist", t2: "Manual count pending", bg: "#3B82F6", ico: "📋", top: "33%", left: "14%", rot: "-2deg" },
        { t1: "Low stock missed", t2: "Reorder delayed", bg: "#F59E0B", ico: "⚠️", top: "30%", left: "54%", rot: "4deg" },
        { t1: "Duplicate entry", t2: "Extra stock mismatch", bg: "#EC4899", ico: "✕", top: "58%", left: "6%", rot: "3deg" },
        { t1: "Vendor reminder", t2: "Call supplier manually", bg: "#6366F1", ico: "📞", top: "56%", left: "48%", rot: "-3deg" },
        { t1: "Store note", t2: "Update after closing", bg: "#14B8A6", ico: "📝", top: "81%", left: "8%", rot: "-2deg" },
        { t1: "Uncounted carton", t2: "No live visibility", bg: "#F97316", ico: "📦", top: "80%", left: "46%", rot: "2deg" }
      ],
      metrics: [
        { lbl: "TOTAL SKUS", val: "1.8k" },
        { lbl: "STOCK ACCURACY", val: "82%" },
        { lbl: "LOW STOCK ALERTS", val: "14" },
        { lbl: "REORDERS DUE", val: "36" }
      ],
      bars: [42, 65, 54, 80, 70, 94, 86],
      outcomes: ["Real-time inventory visibility", "Automated reorder alerts", "Less manual stock checking", "Centralized store control"]
    },
    {
      num: "02",
      tag: "PROBLEM 02",
      badge: "REAL ESTATE",
      title: "Real Estate CRM",
      meta: "Real Estate Platform · Real Estate CRM · Ahmedabad, Gujarat",
      desc: "From scattered leads across portals, calls, and messages to an organized CRM pipeline with better follow-ups.",
      afterTitle: "CRM Pipeline",
      nodes: [
        { t1: "Portal lead", t2: "2BHK enquiry", bg: "#3B82F6", ico: "🏢", top: "6%", left: "4%", rot: "-3deg" },
        { t1: "WhatsApp enquiry", t2: "Price & brochure?", bg: "#22C55E", ico: "💬", top: "4%", left: "44%", rot: "3deg" },
        { t1: "Missed call", t2: "+91 98xx 12xx", bg: "#EF4444", ico: "📞", top: "33%", left: "14%", rot: "-2deg" },
        { t1: "Site visit email", t2: "Unassigned agent", bg: "#F59E0B", ico: "✉️", top: "30%", left: "54%", rot: "4deg" },
        { t1: "Lead spreadsheet", t2: "Agent column blank", bg: "#10B981", ico: "X", top: "58%", left: "6%", rot: "2deg" },
        { t1: "Follow-up missed", t2: "2 days overdue", bg: "#EC4899", ico: "⏰", top: "56%", left: "48%", rot: "-3deg" },
        { t1: "Duplicate lead", t2: "Same phone number", bg: "#6366F1", ico: "👥", top: "81%", left: "8%", rot: "-2deg" },
        { t1: "Property note", t2: "Tower B, 7th floor", bg: "#F97316", ico: "📌", top: "80%", left: "46%", rot: "3deg" }
      ],
      metrics: [
        { lbl: "NEW LEADS", val: "1.8k" },
        { lbl: "CONTACTED", val: "82%" },
        { lbl: "SITE VISITS", val: "14" },
        { lbl: "PROPOSALS", val: "36" }
      ],
      bars: [48, 60, 72, 64, 85, 78, 92],
      outcomes: ["All leads in one place", "Agent follow-up tracking", "Property data organized", "Clear conversion visibility"]
    },
    {
      num: "03",
      tag: "PROBLEM 03",
      badge: "SALES",
      title: "Sales Follow-Up Automation",
      meta: "Service-Based Company · Sales Operations · Ahmedabad, Gujarat",
      desc: "From missed follow-ups and manual reminders to a structured sales pipeline with activity tracking.",
      afterTitle: "Sales Dashboard",
      nodes: [
        { t1: "Missed call", t2: "No callback", bg: "#3B82F6", ico: "📞", top: "6%", left: "4%", rot: "-4deg" },
        { t1: "WhatsApp chat", t2: "Send quote?", bg: "#22C55E", ico: "💬", top: "4%", left: "44%", rot: "3deg" },
        { t1: "Website lead form", t2: "Budget: pending", bg: "#0284C7", ico: "🌐", top: "33%", left: "14%", rot: "-2deg" },
        { t1: "Manual reminder", t2: "Follow up Friday", bg: "#EAB308", ico: "📝", top: "30%", left: "54%", rot: "4deg" },
        { t1: "No owner assigned", t2: "Unclaimed", bg: "#F43F5E", ico: "👤", top: "58%", left: "6%", rot: "2deg" },
        { t1: "Call activity", t2: "Notes missing", bg: "#64748B", ico: "🕒", top: "56%", left: "48%", rot: "-3deg" },
        { t1: "Excel lead sheet", t2: "Stage outdated", bg: "#16A34A", ico: "X", top: "81%", left: "8%", rot: "-2deg" },
        { t1: "Lost lead?", t2: "No activity", bg: "#F59E0B", ico: "⚠️", top: "80%", left: "46%", rot: "3deg" }
      ],
      metrics: [
        { lbl: "FOLLOW-UPS DUE", val: "1.8k" },
        { lbl: "PIPELINE VALUE", val: "82%" },
        { lbl: "LEAD SOURCES", val: "14" },
        { lbl: "CONVERSION RATE", val: "36" }
      ],
      bars: [38, 62, 52, 78, 66, 92, 84],
      outcomes: ["All leads in one place", "Automated follow-up alerts", "Complete activity history", "Higher conversion clarity"]
    },
    {
      num: "04",
      tag: "PROBLEM 04",
      badge: "HRMS",
      title: "HRMS & Workforce Operations",
      meta: "Growing Enterprise · HR & Attendance · Ahmedabad, Gujarat",
      desc: "From manual attendance sheets, WhatsApp leave requests, and scattered files to one structured HRMS.",
      afterTitle: "HRMS Dashboard",
      nodes: [
        { t1: "Biometric CSV", t2: "Manual upload", bg: "#3B82F6", ico: "⏱️", top: "6%", left: "4%", rot: "-3deg" },
        { t1: "WhatsApp leave", t2: "Approved in chat?", bg: "#22C55E", ico: "💬", top: "4%", left: "44%", rot: "3deg" },
        { t1: "Onboarding docs", t2: "Pending ID proof", bg: "#0284C7", ico: "📁", top: "33%", left: "14%", rot: "-2deg" },
        { t1: "Shift roster", t2: "Old spreadsheet", bg: "#EAB308", ico: "📅", top: "30%", left: "54%", rot: "4deg" },
        { t1: "Payroll delay", t2: "Overtime mismatch", bg: "#F43F5E", ico: "₹", top: "58%", left: "6%", rot: "2deg" },
        { t1: "Asset tracking", t2: "Laptop #14 owner?", bg: "#6366F1", ico: "💻", top: "56%", left: "48%", rot: "-3deg" },
        { t1: "Excel attendance", t2: "Formula broken", bg: "#16A34A", ico: "X", top: "81%", left: "8%", rot: "-2deg" },
        { t1: "Role access", t2: "Unclear permissions", bg: "#F59E0B", ico: "🔒", top: "80%", left: "46%", rot: "3deg" }
      ],
      metrics: [
        { lbl: "ACTIVE WORKFORCE", val: "1.8k" },
        { lbl: "ATTENDANCE SYNC", val: "82%" },
        { lbl: "LEAVE REQUESTS", val: "14" },
        { lbl: "ROLES MAPPED", val: "36" }
      ],
      bars: [50, 68, 60, 82, 74, 90, 95],
      outcomes: ["Attendance visibility", "Structured leave approvals", "Paperless onboarding", "Less HR manual work"]
    },
    {
      num: "05",
      tag: "PROBLEM 05",
      badge: "ERP",
      title: "Manufacturing & Order ERP",
      meta: "Manufacturing Unit · Factory Operations · Ahmedabad, Gujarat",
      desc: "From disconnected purchase orders, raw material guesswork, and dispatch delays to a connected factory ERP.",
      afterTitle: "Factory ERP Board",
      nodes: [
        { t1: "Raw material note", t2: "Low steel stock", bg: "#F59E0B", ico: "🏗️", top: "6%", left: "4%", rot: "-3deg" },
        { t1: "Purchase order", t2: "Approval pending", bg: "#3B82F6", ico: "📄", top: "4%", left: "44%", rot: "3deg" },
        { t1: "Batch #428 status", t2: "Verbal floor update", bg: "#22C55E", ico: "⚙️", top: "33%", left: "14%", rot: "-2deg" },
        { t1: "Quality logbook", t2: "Paper inspection", bg: "#EAB308", ico: "✓", top: "30%", left: "54%", rot: "4deg" },
        { t1: "Dispatch gate", t2: "Challan missing", bg: "#F43F5E", ico: "🚚", top: "58%", left: "6%", rot: "2deg" },
        { t1: "Vendor invoice", t2: "Rate mismatch", bg: "#6366F1", ico: "🧾", top: "56%", left: "48%", rot: "-3deg" },
        { t1: "WIP Excel sheet", t2: "Not updated today", bg: "#16A34A", ico: "X", top: "81%", left: "8%", rot: "-2deg" },
        { t1: "Delivery delay", t2: "Client calling", bg: "#F97316", ico: "⚠️", top: "80%", left: "46%", rot: "3deg" }
      ],
      metrics: [
        { lbl: "WORK ORDERS", val: "1.8k" },
        { lbl: "PRODUCTION FLOW", val: "82%" },
        { lbl: "OPEN POS", val: "14" },
        { lbl: "DISPATCH READY", val: "36" }
      ],
      bars: [44, 58, 68, 76, 84, 88, 94],
      outcomes: ["Connected purchase-to-dispatch", "Live WIP stock tracking", "Controlled QA approvals", "Zero dispatch confusion"]
    },
    {
      num: "06",
      tag: "PROBLEM 06",
      badge: "ADMIN",
      title: "Admin Panel & Business Control",
      meta: "Growing Business Team · Admin Operations · Ahmedabad, Gujarat",
      desc: "From scattered users, roles, approvals, and reports to a centralized admin control panel.",
      afterTitle: "Admin Control Panel",
      nodes: [
        { t1: "Users sheet", t2: "Access rows outdated", bg: "#3B82F6", ico: "👥", top: "6%", left: "4%", rot: "-3deg" },
        { t1: "Roles note", t2: "Who can edit?", bg: "#6366F1", ico: "🔑", top: "4%", left: "44%", rot: "3deg" },
        { t1: "Approval message", t2: "Pending in chat", bg: "#22C55E", ico: "💬", top: "33%", left: "14%", rot: "-2deg" },
        { t1: "Report file", t2: "Final_v4.xlsx", bg: "#16A34A", ico: "X", top: "30%", left: "54%", rot: "4deg" },
        { t1: "Config note", t2: "Manual setting", bg: "#EAB308", ico: "⚙️", top: "58%", left: "6%", rot: "2deg" },
        { t1: "Access unclear", t2: "Security risk open", bg: "#F43F5E", ico: "🛡️", top: "56%", left: "48%", rot: "-3deg" },
        { t1: "Admin checklist", t2: "Manual weekly update", bg: "#0284C7", ico: "📋", top: "81%", left: "8%", rot: "-2deg" },
        { t1: "Siloed modules", t2: "No shared control", bg: "#F59E0B", ico: "⚠️", top: "80%", left: "46%", rot: "3deg" }
      ],
      metrics: [
        { lbl: "ACTIVE USERS", val: "1.8k" },
        { lbl: "ROLE COVERAGE", val: "82%" },
        { lbl: "APPROVALS", val: "14" },
        { lbl: "LIVE REPORTS", val: "36" }
      ],
      bars: [46, 64, 58, 82, 75, 90, 96],
      outcomes: ["Centralized business control", "Role-based access", "Approval flow visibility", "Better reporting structure"]
    }
  ];

  // 3. REDESIGNED PORTFOLIO SHOWCASE DATA (WITH BESPOKE TOP VISUAL HUD FLOWS)
  var CODNESTX_PORTFOLIO = [
    {
      num: "01",
      title: "Apex Logistics OS",
      domain: "erp.apex-logistics.os",
      category: "CRM/ERP Systems",
      sector: "Logistics & Supply Chain",
      hud: ["PROCESS LOGS", "APPROVALS", "AI DISPATCH"],
      kpiPill: "0 Stockouts · -15% Fuel",
      summary: "Unified ERP mapping global truck dispatches, warehouse inventory levels, and automated purchase requests.",
      stack: ["React", "Node.js", "TypeScript", "MongoDB", "Python AI Engine"],
      impact: "Eliminated warehouse stockouts entirely with 15% lower fuel waste via optimized dispatches"
    },
    {
      num: "02",
      title: "Zenith AI Broker",
      domain: "ai.zenith-broker.io",
      category: "AI & Automation",
      sector: "Real Estate & Brokerage",
      hud: ["WHATSAPP", "GPT-4 ENGINE", "ROI SCORE 96%"],
      kpiPill: "45s Lead Response",
      summary: "AI-native lead routing and pipeline automation engine that captures, scores, and routes leads via WhatsApp sequences.",
      stack: ["Next.js", "FastAPI", "WhatsApp Cloud API", "OpenAI API", "PostgreSQL"],
      impact: "Response times cut from 8 hours to 45 seconds, boosting close rates by 34%"
    },
    {
      num: "03",
      title: "Rutu Group CRM",
      domain: "crm.rutu-realty.com",
      category: "CRM/ERP Systems",
      sector: "Construction & Real Estate",
      hud: ["UNIT LEDGER", "MILESTONES", "BUYER PORTAL"],
      kpiPill: "-90% Query Calls",
      summary: "Customer onboarding portal and flat inventory ledger connecting home-buyers to payment milestones and construction progress.",
      stack: ["React", "Laravel", "MySQL", "Figma", "AWS S3"],
      impact: "90% drop in milestone query calls with billing realization cycles accelerated by 18 days"
    },
    {
      num: "04",
      title: "Kalyan Jewellers Hub",
      domain: "app.kalyan-jewellers-hub.com",
      category: "Web & Mobile",
      sector: "Luxury Retail & Gold Commerce",
      hud: ["24K LIVE RATE", "POS TERMINAL", "MULTI-STORE"],
      kpiPill: "90s Custom Billing",
      summary: "Central inventory, live metal rate tracker, and point-of-sale terminal generating custom tax invoices across stores.",
      stack: ["Next.js", "Node.js", "MongoDB", "Redis", "WebSockets"],
      impact: "Average billing time cut from 12 minutes to 90 seconds with zero rate computation mismatches"
    },
    {
      num: "05",
      title: "YAJYA Transactional OS",
      domain: "tx.yajya-fintech.app",
      category: "Web & Mobile",
      sector: "Consumer Services & Fintech",
      hud: ["TXN $14,250", "SETTLEMENT", "ADMIN HUB"],
      kpiPill: "99.98% Txn Reliability",
      summary: "Cross-platform mobile transactional engine integrated with an intuitive management dashboard and customer portal.",
      stack: ["Flutter", "Dart", "Node.js", "PostgreSQL", "Firebase"],
      impact: "99.98% transaction reliability with 45% lower payment settlement delay"
    },
    {
      num: "06",
      title: "360 Solutions Portal",
      domain: "app.360-solutions.com",
      category: "Web & Mobile",
      sector: "Professional Services",
      hud: ["WORKFLOWS", "ROLE PORTAL", "LIVE BI"],
      kpiPill: "-40% Delivery Cycle",
      summary: "Custom business management portal and analytics dashboard optimizing internal workflows and decision reporting.",
      stack: ["React JS", "Node.js", "TypeScript", "REST APIs", "PostgreSQL"],
      impact: "40% reduction in project delivery cycles and zero WhatsApp communication gaps"
    },
    {
      num: "07",
      title: "Akshar Infoline",
      domain: "app.akshar-infoline.com",
      category: "Websites",
      sector: "IT Services & Connectivity",
      hud: ["CATALOG OS", "LEAD FUNNEL", "ENTERPRISE"],
      kpiPill: "+180% Organic Leads",
      summary: "High-conversion enterprise portal highlighting custom IT solutions, service catalogs, and client engagement flows.",
      stack: ["WordPress", "PHP", "JavaScript", "HTML5/CSS3", "Framer Motion"],
      impact: "+180% organic enterprise leads captured within the first quarter"
    },
    {
      num: "08",
      title: "Mend & Mind",
      domain: "mend-and-mind.com",
      category: "Websites",
      sector: "Healthcare & Wellness",
      hud: ["SCHEDULE", "SELF-SERVICE", "AUTO-BOOK"],
      kpiPill: "3x Direct Bookings",
      summary: "Responsive wellness portal focusing on customer self-service, course scheduling, and automated booking flows.",
      stack: ["WordPress", "PHP", "Figma", "Tailwind CSS", "JavaScript"],
      impact: "3x increase in direct online bookings with zero manual scheduling overlap"
    },
    {
      num: "09",
      title: "Solstice Architecture",
      domain: "solstice-architecture.com",
      category: "Websites",
      sector: "Real Estate & Architecture",
      hud: ["SPATIAL UI", "PORTFOLIO", "1.1S LOAD"],
      kpiPill: "<1.2s Page Speed",
      summary: "Visual portfolio showcase engineered for sub-second speed, spatial project discovery, and client inquiries.",
      stack: ["WordPress", "PHP", "Vanilla JS", "Radix UI", "Tailwind"],
      impact: "Under 1.2s page load speed with 100% responsive portfolio visibility"
    },
    {
      num: "10",
      title: "M&R Education",
      domain: "app.mr-education.com",
      category: "Websites",
      sector: "Education & Academics",
      hud: ["ADMISSIONS", "STUDENT OS", "PAPERLESS"],
      kpiPill: "85% Faster Onboarding",
      summary: "Interactive educational platform facilitating student enrollment, institution discovery, and paperless onboarding.",
      stack: ["Laravel", "PHP", "MySQL", "Alpine.js", "Tailwind CSS"],
      impact: "85% faster admissions processing with completely paperless student onboarding"
    }
  ];

  var CODNESTX_PROCESS_GAPS = [
    {
      num: "GAP 01",
      title: "Leads Are Not Tracked Properly",
      domain: "process-audit://sales-pipeline",
      sector: "Lost Revenue Risk",
      hud: ["MULTI-CHANNEL", "NO FOLLOW-UP", "CUSTOM CRM"],
      kpiPill: "100% Pipeline Tracking",
      problem: "Inquiries come from multiple channels with no unified follow-up system. High-value opportunities slip through the cracks.",
      fix: "Custom CRM with structured pipeline & automated reminders"
    },
    {
      num: "GAP 02",
      title: "Teams Depend Too Much on WhatsApp",
      domain: "process-audit://chat-silos",
      sector: "Information Silos",
      hud: ["UNSTRUCTURED", "CHAT LOGS", "UNIFIED FLOW"],
      kpiPill: "Zero Missed Tasks",
      problem: "Critical business data, tasks, and approvals disappear inside unstructured chat threads.",
      fix: "Centralized workflow engine & synced WhatsApp logs"
    },
    {
      num: "GAP 03",
      title: "Excel Sheets Become the Actual System",
      domain: "process-audit://excel-chaos",
      sector: "Data Inconsistency",
      hud: ["VERSION MESS", "MANUAL ERRORS", "CLOUD ERP"],
      kpiPill: "Single Source of Truth",
      problem: "Spreadsheets multiply across departments with conflicting versions and manual entry errors.",
      fix: "Unified cloud ERP database & role-based dashboards"
    },
    {
      num: "GAP 04",
      title: "Owners Have No Real-Time Visibility",
      domain: "process-audit://blind-spots",
      sector: "Delayed Decisions",
      hud: ["MANUAL CHECKS", "BLIND SPOTS", "OWNER HUD"],
      kpiPill: "94% Live Visibility",
      problem: "Owners cannot see live status of leads, stock, attendance, or projects without asking around.",
      fix: "Owner command dashboard with 94%+ live metrics"
    },
    {
      num: "GAP 05",
      title: "Customers Need Repeated Manual Follow-Ups",
      domain: "process-audit://staff-fatigue",
      sector: "Staff Fatigue",
      hud: ["MANUAL CALLS", "DELAYED QUOTE", "TELE-X AI"],
      kpiPill: "Automated Sequences",
      problem: "Staff spend hours on repetitive client communication and quote follow-ups.",
      fix: "Automated customer follow-ups & Tele-X workflows"
    },
    {
      num: "GAP 06",
      title: "Approvals Are Slow and Unclear",
      domain: "process-audit://bottlenecks",
      sector: "Approval Bottlenecks",
      hud: ["EMAIL THREADS", "STALLED PO", "RBAC ALERTS"],
      kpiPill: "1-Click Role Approvals",
      problem: "Critical decisions stall because approval authority is vague or buried in email threads.",
      fix: "Defined role-based approval routing & instant alerts"
    },
    {
      num: "GAP 07",
      title: "AI Is Discussed But Not Placed Correctly",
      domain: "process-audit://ai-roadmap",
      sector: "Process Overhead",
      hud: ["AI HYPE", "WORKFLOW MAP", "TARGETED AI"],
      kpiPill: "ROI-Scored AI Placement",
      problem: "Teams want AI speed but lack a practical blueprint showing where it adds measurable ROI.",
      fix: "Business-first AI Process Audit & targeted AI copilots"
    },
    {
      num: "GAP 08",
      title: "Employees Repeat the Same Work Daily",
      domain: "process-audit://manual-entry",
      sector: "38h/wk Wasted",
      hud: ["COPY-PASTE", "WEEKLY REPORT", "AUTO-SYNC"],
      kpiPill: "38+ Hours Saved Weekly",
      problem: "Staff lose 38+ hours weekly copying data between disconnected tools and building manual reports.",
      fix: "Automated cross-department sync & 1-click reporting"
    }
  ];

  var SYSTEM_FLOW_DETAILS = {
    crm: {
      badge: "01 · CRM & Lead Management System",
      title: "Sales Control Panel — Trackable Lead-to-Deal Workflow",
      desc: "Built around your actual sales process—capturing inquiries from portals, calls, and WhatsApp into one structured pipeline with automated follow-up queues.",
      metrics: [
        { val: "128", lbl: "Active Leads" },
        { val: "42", lbl: "Follow-Ups Queued" },
        { val: "31%", lbl: "Conversion Rate" },
        { val: "₹84L", lbl: "Active Pipeline" }
      ],
      modules: ["Lead Pipeline Stages", "WhatsApp AI Follow-Up Queue", "Call Status Tracking", "Proposal Reminders", "Role-Based Sales Dashboard", "Tele-X Requirement Handoff"]
    },
    erp: {
      badge: "02 · ERP & Operations System",
      title: "Operations Control Board — Inventory, Production & Dispatch",
      desc: "Digitize raw materials, WIP, ready stock, purchase orders, production work orders, quality approvals, and dispatch fulfillment in one connected ERP.",
      metrics: [
        { val: "68%", lbl: "Production Progress" },
        { val: "Zero", lbl: "Stock Mismatch" },
        { val: "+84%", lbl: "Handoff Speed" },
        { val: "Live", lbl: "Stock & Dispatch" }
      ],
      modules: ["Raw / WIP / Ready Stock Ledger", "Automated Reorder Alerts", "Purchase Order Approvals", "Production Batch Tracking", "Controlled Gate Pass & Dispatch", "Vendor Settlement Portal"]
    },
    hrms: {
      badge: "03 · HRMS & Workforce System",
      title: "Workforce Control Center — Attendance, Leaves & Roles",
      desc: "Automate attendance tracking, leave approval workflows, employee onboarding, asset allocation, and payroll-ready reporting with less admin dependency.",
      metrics: [
        { val: "32+", lbl: "Active Directory" },
        { val: "84%", lbl: "Present Status" },
        { val: "99.5%", lbl: "Attendance Synced" },
        { val: "100%", lbl: "Role Permissions" }
      ],
      modules: ["Team Directory & Profiles", "Live Attendance Sync", "One-Click Leave Approvals", "Paperless Employee Onboarding", "Role-Based Access Control", "Payroll Data Export"]
    },
    admin: {
      badge: "04 · Admin Dashboard & Analytics",
      title: "Business Control Panel — Real-Time Owner Visibility",
      desc: "Centralized executive command center turning sales, finance, stock, and cross-department approvals into live, decision-ready analytics.",
      metrics: [
        { val: "128", lbl: "Reports Generated" },
        { val: "94%", lbl: "Live Visibility" },
        { val: "17", lbl: "Pending Approvals" },
        { val: "42", lbl: "Configured Roles" }
      ],
      modules: ["Centralized Owner KPIs", "Bottleneck & Delay Alerts", "Multi-Store Revenue Ledger", "Role & Permission Matrix", "Automated Weekly Reports", "Audit Trail Logs"]
    },
    planx: {
      badge: "05 · PlanX & CodnestX OS",
      title: "PlanX Delivery Workspace & CodnestX Internal OS",
      desc: "Our internal operating layer connecting 6 departments (Sales, Delivery, HR, Accounts, QA, Projects) with AI-assisted PRD drafting and sprint QA tracking.",
      metrics: [
        { val: "92%", lbl: "PRD Scope Clarity" },
        { val: "78%", lbl: "Sprint QA Coverage" },
        { val: "245", lbl: "Active OS Users" },
        { val: "6 Depts", lbl: "Unified Workflow" }
      ],
      modules: ["AI PRD Generator", "User Role & Scope Breakdown", "Sprint Task & Delivery Board", "Automated QA Checklists", "Client Approval Gates", "CodnestX OS Department Sync"]
    }
  };

  var TESTIMONIALS = [
    {
      role: "Founder, Retail & Distribution Operations",
      system: "Multi-Store Inventory & Custom ERP Command Platform",
      quote: "“CodnestX understood our retail operations before writing any code. They transformed our Excel and WhatsApp chaos into a proper system with real-time inventory visibility — zero inventory mismatch and 20h/week saved.”"
    },
    {
      role: "Operations Head, Apex Logistics & Supply Chain",
      system: "Apex Logistics OS — Dispatch Scheduling & Warehouse ERP",
      quote: "“Moving from scattered stock spreadsheets and manual phone calls to Apex Logistics OS eliminated warehouse stockouts entirely and reduced fuel waste by 15% through automated dispatch routing.”"
    },
    {
      role: "Director, Rutu Group Real Estate",
      system: "Rutu Group CRM — Buyer Onboarding & Flat Inventory Ledger",
      quote: "“With our custom CRM connecting home-buyers directly to payment ledgers and construction milestones, milestone query calls dropped by 90% and billing realization cycles accelerated by 18 days.”"
    },
    {
      role: "Managing Partner, Multi-Store Luxury Retail",
      system: "Real-Time Metal Rate Tracker, POS & Multi-Store Ledger",
      quote: "“Our central inventory and billing terminal tracks live rate changes across stores and generates custom tax invoices in 90 seconds instead of 12 minutes, with zero computation mismatches.”"
    }
  ];

  ready(function () {
    // 1. Sticky Header scroll state
    var header = document.querySelector("header");
    if (header) {
      var updateHeader = function () {
        if (window.scrollY > 20) {
          header.classList.remove("da-header-top");
        } else {
          header.classList.add("da-header-top");
        }
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }

    // 2. Client Logo Marquee (.flex.w-max)
    var marqueeTracks = document.querySelectorAll("div.flex.w-max");
    marqueeTracks.forEach(function (track) {
      if (track.children.length >= 10) {
        track.style.transform = "";
        track.classList.add("da-client-marquee");
      }
    });

    // 3. Buttery IntersectionObserver for all .da-reveal-* elements
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = el.getAttribute("data-da-delay");
            if (delay) {
              el.style.transitionDelay = delay + "ms";
            }
            el.classList.add("da-visible");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    function registerReveal(el, cls, delayMs) {
      if (!el) return;
      if (cls) el.classList.add(cls);
      if (delayMs !== undefined && delayMs !== null) {
        el.setAttribute("data-da-delay", String(delayMs));
      }
      revealObserver.observe(el);
    }

    document.querySelectorAll(".da-reveal-up, .da-reveal-fade, .da-reveal-blur, .da-line-draw").forEach(function (el) {
      revealObserver.observe(el);
    });

    // ==========================================================================
    // 4. Minimal Logo-Only Marquee Controller (#ecosystem-section)
    // ==========================================================================
    (function initEcosystemMarquee() {
      var sectionEl = document.getElementById("ecosystem-section");
      if (!sectionEl) return;

      // Protocol fallback: ensure /logos/integrations/ resolves if file:// protocol is used
      if (window.location && window.location.protocol === "file:") {
        var imgs = sectionEl.querySelectorAll("img[src^='/logos/']");
        imgs.forEach(function (img) {
          img.setAttribute("src", img.getAttribute("src").replace(/^\/logos\//, "logos/"));
        });
      }
      
      var isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReducedMotion) {
        sectionEl.classList.add("cx-int-revealed");
        return;
      }

      var rowWraps = sectionEl.querySelectorAll(".cx-int-row-wrap");
      var hairlineFill = document.getElementById("cx-int-hairline-fill");
      var hairlineTrack = sectionEl.querySelector(".cx-int-hairline-track");
      var headingLines = sectionEl.querySelectorAll(".cx-int-heading-line");
      var leadEl = sectionEl.querySelector(".cx-int-lead");

      // State for rows
      var rowControllers = [];

      rowWraps.forEach(function (rowWrap) {
        var rowNum = parseInt(rowWrap.getAttribute("data-row") || "1", 10);
        var direction = rowWrap.getAttribute("data-direction") || "left"; // 'left' or 'right'
        var duration = parseFloat(rowWrap.getAttribute("data-duration") || "50");
        var initialOffset = parseFloat(rowWrap.getAttribute("data-offset") || "0");
        var parallaxEl = rowWrap.querySelector(".cx-int-row-parallax");
        var trackEl = rowWrap.querySelector(".cx-int-track");
        var set1 = rowWrap.querySelector(".cx-int-set-1");

        if (!trackEl || !set1) return;

        var rowObj = {
          rowNum: rowNum,
          direction: direction,
          duration: duration,
          initialOffset: initialOffset,
          rowWrap: rowWrap,
          parallaxEl: parallaxEl,
          trackEl: trackEl,
          set1: set1,
          setWidth: 0,
          currentX: 0,
          baseSpeed: 0, // px per second
          timeScale: 1,
          targetTimeScale: 1,
          isHovered: false,
          isDragging: false,
          dragStartX: 0,
          dragStartCurrentX: 0,
          lastDragX: 0,
          dragVelocity: 0,
          lastDragTime: 0
        };

        function measure() {
          var w = set1.offsetWidth;
          if (w <= 0) {
            // Fallback estimation based on screen size
            var vw = window.innerWidth;
            var tileW = vw < 768 ? 132 : (vw < 1280 ? 176 : (rowNum === 2 ? 256 : 216));
            var gap = vw < 768 ? 14 : (vw < 1280 ? 18 : 24);
            w = 13 * (tileW + gap);
          }
          rowObj.setWidth = w;
          rowObj.baseSpeed = w / duration; // px/sec
        }
        measure();

        // Initial offset
        // For direction: 'left' moves negative X; 'right' moves positive X
        // Set initial position wrapped inside [-setWidth, 0]
        var startX = initialOffset;
        if (direction === "right") {
          // Keep in range [-setWidth, 0]
          startX = -rowObj.setWidth + (initialOffset % rowObj.setWidth);
        } else {
          startX = (initialOffset % rowObj.setWidth);
          if (startX > 0) startX -= rowObj.setWidth;
        }
        rowObj.currentX = startX;
        trackEl.style.transform = "translate3d(" + rowObj.currentX.toFixed(2) + "px, 0, 0)";

        // Hover slowdown: ease timeScale to 0.15 over 0.6s; ease back to 1 on leave
        rowWrap.addEventListener("mouseenter", function () {
          rowObj.isHovered = true;
          rowObj.targetTimeScale = 0.15;
        });
        rowWrap.addEventListener("mouseleave", function () {
          rowObj.isHovered = false;
          rowObj.targetTimeScale = 1;
        });

        // Touch & Pointer Drag / Swipe with inertia
        function onPointerDown(e) {
          if (e.button !== undefined && e.button !== 0) return; // primary click only
          rowObj.isDragging = true;
          rowObj.dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
          rowObj.dragStartCurrentX = rowObj.currentX;
          rowObj.lastDragX = rowObj.dragStartX;
          rowObj.dragVelocity = 0;
          rowObj.lastDragTime = performance.now();
          trackEl.style.willChange = "transform";
        }

        function onPointerMove(e) {
          if (!rowObj.isDragging) return;
          var clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
          var delta = clientX - rowObj.dragStartX;
          var now = performance.now();
          var dt = (now - rowObj.lastDragTime) / 1000;
          if (dt > 0.005) {
            rowObj.dragVelocity = (clientX - rowObj.lastDragX) / dt;
            rowObj.lastDragX = clientX;
            rowObj.lastDragTime = now;
          }

          var nextX = rowObj.dragStartCurrentX + delta;
          // Wrap so dragging never exposes empty space
          var w = rowObj.setWidth;
          if (w > 0) {
            while (nextX > 0) nextX -= w;
            while (nextX < -w) nextX += w;
          }
          rowObj.currentX = nextX;
          trackEl.style.transform = "translate3d(" + rowObj.currentX.toFixed(2) + "px, 0, 0)";
        }

        function onPointerUp() {
          if (!rowObj.isDragging) return;
          rowObj.isDragging = false;
          // Apply inertia if thrown
          var flingVel = rowObj.dragVelocity;
          if (Math.abs(flingVel) > 80) {
            var momentumDist = flingVel * 0.35; // slide for ~0.35s
            var targetX = rowObj.currentX + momentumDist;
            var startMTime = performance.now();
            var durationM = 400; // ms
            var startMX = rowObj.currentX;

            function stepMomentum(mNow) {
              if (rowObj.isDragging) return;
              var progress = Math.min(1, (mNow - startMTime) / durationM);
              var ease = 1 - Math.pow(1 - progress, 3); // cubic out
              var cur = startMX + momentumDist * ease;
              var w = rowObj.setWidth;
              if (w > 0) {
                while (cur > 0) cur -= w;
                while (cur < -w) cur += w;
              }
              rowObj.currentX = cur;
              trackEl.style.transform = "translate3d(" + rowObj.currentX.toFixed(2) + "px, 0, 0)";
              if (progress < 1) {
                requestAnimationFrame(stepMomentum);
              }
            }
            requestAnimationFrame(stepMomentum);
          }
        }

        rowWrap.addEventListener("mousedown", onPointerDown);
        window.addEventListener("mousemove", onPointerMove);
        window.addEventListener("mouseup", onPointerUp);

        rowWrap.addEventListener("touchstart", onPointerDown, { passive: true });
        window.addEventListener("touchmove", onPointerMove, { passive: true });
        window.addEventListener("touchend", onPointerUp, { passive: true });

        rowControllers.push(rowObj);
      });

      // Recalculate on window resize
      window.addEventListener("resize", function () {
        rowControllers.forEach(function (r) {
          var w = r.set1.offsetWidth;
          if (w > 0) {
            r.setWidth = w;
            r.baseSpeed = w / r.duration;
          }
        });
      });

      // Section visibility via IntersectionObserver
      var isSectionVisible = true;
      if ("IntersectionObserver" in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            isSectionVisible = entry.isIntersecting;
          });
        }, { threshold: 0 });
        sectionObserver.observe(sectionEl);
      }

      // Scroll Velocity Boost & Parallax Drift
      var scrollVelocityBoost = 1;
      var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
      var lastScrollTime = performance.now();
      var velocityDecayRate = 2.5; // decays back to 1 over ~0.8s

      window.addEventListener("scroll", function () {
        var now = performance.now();
        var currentY = window.pageYOffset || document.documentElement.scrollTop;
        var dt = (now - lastScrollTime) / 1000;
        if (dt > 0.005) {
          var v = Math.abs(currentY - lastScrollY) / dt;
          // Scale velocity: e.g. 1500px/s scroll gives ~2.5x boost, capped at 3x
          var boost = 1 + Math.min(2, v / 600);
          if (boost > scrollVelocityBoost) {
            scrollVelocityBoost = boost;
          }
          lastScrollY = currentY;
          lastScrollTime = now;
        }

        // Parallax drift & Hairline progress
        var rect = sectionEl.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        // Section progress from entering viewport (rect.top == vh) to leaving (rect.bottom == 0)
        var totalTravel = vh + rect.height;
        var currentTravel = vh - rect.top;
        var progress = Math.max(0, Math.min(1, currentTravel / totalTravel));

        // Hairline fill: scrub progress 0 -> 100%
        if (hairlineFill) {
          hairlineFill.style.transform = "scaleX(" + progress.toFixed(4) + ")";
        }

        // Parallax drift on each row (row 1: +60px, row 2: -90px, row 3: +60px)
        // Normalized centered progress: (progress - 0.5) ranges from -0.5 to 0.5
        var pCentered = (progress - 0.5) * 2; // -1 to 1
        rowControllers.forEach(function (r) {
          if (!r.parallaxEl) return;
          var driftMax = r.rowNum === 2 ? -90 : 60;
          var shiftX = pCentered * driftMax;
          r.parallaxEl.style.transform = "translate3d(" + shiftX.toFixed(2) + "px, 0, 0)";
        });
      }, { passive: true });

      // Main rAF Animation Loop
      var lastFrameTime = performance.now();

      function tick(now) {
        var dt = (now - lastFrameTime) / 1000;
        lastFrameTime = now;
        // Cap dt to prevent huge jumps on tab switch / lag
        if (dt > 0.1) dt = 0.1;

        if (isSectionVisible) {
          // Decay scroll velocity boost back to 1 over ~0.8s
          if (scrollVelocityBoost > 1) {
            scrollVelocityBoost = Math.max(1, scrollVelocityBoost - (velocityDecayRate * dt));
          }

          rowControllers.forEach(function (r) {
            // Smoothly ease timeScale toward targetTimeScale (0.6s transition)
            var tsEase = dt / 0.6;
            r.timeScale += (r.targetTimeScale - r.timeScale) * Math.min(1, tsEase * 4);

            if (!r.isDragging && r.setWidth > 0) {
              var effectiveSpeed = r.baseSpeed * r.timeScale * scrollVelocityBoost;
              var moveDist = effectiveSpeed * dt;

              if (r.direction === "right") {
                r.currentX += moveDist;
                // Wrap in range [-setWidth, 0]
                if (r.currentX > 0) {
                  r.currentX -= r.setWidth;
                }
              } else {
                r.currentX -= moveDist;
                // Wrap in range [-setWidth, 0]
                if (r.currentX < -r.setWidth) {
                  r.currentX += r.setWidth;
                }
              }

              r.trackEl.style.transform = "translate3d(" + r.currentX.toFixed(2) + "px, 0, 0)";
            }
          });
        }

        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      // Entrance Reveal Animation on scroll (5.1: triggers when section reaches ~80% of viewport)
      var entranceTriggered = false;

      function triggerEntrance() {
        if (entranceTriggered) return;
        entranceTriggered = true;

        if (window.gsap) {
          var gsap = window.gsap;
          var tl = gsap.timeline();

          // Heading line-by-line mask reveal (0.9s, expo.out, 0.12s apart)
          tl.to(headingLines, {
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.12
          }, 0);

          // Lead text fades/translates up 18px at +0.25s
          tl.to(leadEl, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }, 0.25);

          // Tiles entrance: animate from y: 36, scale: .94, opacity: 0 to rest, 0.9s, power3.out,
          // staggered outward from center (0.045s), row 2 leads then 1 and 3 start 0.12s apart
          var row1Tiles = sectionEl.querySelectorAll(".cx-int-row-1 .cx-int-tile");
          var row2Tiles = sectionEl.querySelectorAll(".cx-int-row-2 .cx-int-tile");
          var row3Tiles = sectionEl.querySelectorAll(".cx-int-row-3 .cx-int-tile");

          tl.to(row2Tiles, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: { each: 0.045, from: "center" }
          }, 0.35);

          tl.to(row1Tiles, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: { each: 0.045, from: "center" }
          }, 0.47);

          tl.to(row3Tiles, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: { each: 0.045, from: "center" }
          }, 0.47);

          // Hairline: scales in from center (scaleX 0 -> 1, 0.8s) after tiles
          if (hairlineTrack) {
            tl.to(hairlineTrack, {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out"
            }, 1.1);
          }
        } else {
          // Fallback smooth CSS reveal if GSAP CDN is loading/offline
          sectionEl.classList.add("cx-int-revealed");
        }
      }

      // Check entrance trigger on scroll or load
      if (window.ScrollTrigger && window.gsap) {
        window.ScrollTrigger.create({
          trigger: sectionEl,
          start: "top 80%",
          once: true,
          onEnter: triggerEntrance
        });
      } else {
        // Fallback Scroll Observer for entrance
        var entranceObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              triggerEntrance();
              entranceObserver.disconnect();
            }
          });
        }, { rootMargin: "0px 0px -20% 0px" });
        entranceObserver.observe(sectionEl);
      }
    })();

    // 5. Initialize Replicated 3D Dark "Problems We've Solved (Before vs. After CodnestX)" Carousel (Default = Index 2 -> PROBLEM 03 Sales Follow-Up Automation matching image_89a3bf.jpg!)
    var baActiveEl = document.getElementById("cx-ba-active-card");
    var baLeftEl = document.getElementById("cx-ba-peek-left");
    var baRightEl = document.getElementById("cx-ba-peek-right");
    var baTabsEl = document.getElementById("cx-ba-tabs");
    var baCounterEl = document.getElementById("cx-ba-counter");
    var baPrevBtn = document.getElementById("cx-ba-prev");
    var baNextBtn = document.getElementById("cx-ba-next");
    var activeBaIdx = 2; // PROBLEM 03: Sales Follow-Up Automation

    function buildBaCardHtml(prob, isFull) {
      var nodesHtml = prob.nodes.map(function (n) {
        return '<div class="cx-ba-chaos-node" style="top:' + n.top + ';left:' + n.left + ';transform:rotate(' + n.rot + ');">' +
          '<div class="cx-chaos-ico" style="background:' + n.bg + '26;color:' + n.bg + ';border:1px solid ' + n.bg + '66;">' + n.ico + '</div>' +
          '<div>' +
            '<div class="cx-chaos-t1">' + n.t1 + '</div>' +
            '<div class="cx-chaos-t2">' + n.t2 + '</div>' +
          '</div>' +
        '</div>';
      }).join("");

      var metricsHtml = prob.metrics.map(function (m) {
        return '<div class="cx-ba-mcell">' +
          '<div class="cx-ba-mcell-lbl">' + m.lbl + '</div>' +
          '<div class="cx-ba-mcell-val">' + m.val + '</div>' +
        '</div>';
      }).join("");

      var barsHtml = prob.bars.map(function (h) {
        return '<div class="cx-ba-bar" style="height:' + h + '%"></div>';
      }).join("");

      var outcomesHtml = prob.outcomes.map(function (o) {
        return '<div class="cx-ba-outcome-chip"><span>&#10003;</span> ' + o + '</div>';
      }).join("");

      return '<div class="cx-ba-card-top">' +
        '<div>' +
          '<div class="cx-ba-prob-tag">' + prob.tag + '</div>' +
          '<h3 class="cx-ba-prob-title">' + prob.title + '</h3>' +
          '<div class="cx-ba-prob-meta">' + prob.meta + '</div>' +
          '<p class="cx-ba-prob-desc">' + prob.desc + '</p>' +
        '</div>' +
        '<div class="cx-ba-sector-badge">' +
          '<span class="cx-ba-sector-icon">&#128200;</span>' +
          '<span>' + prob.badge + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="cx-ba-arena">' +
        '<div class="cx-ba-before-col">' +
          '<div class="cx-ba-col-head">' +
            '<span class="cx-ba-col-lbl">BEFORE CODNESTX</span>' +
            '<span class="cx-ba-no-flow">No single flow</span>' +
          '</div>' +
          '<div class="cx-ba-chaos-stage">' +
            '<svg class="cx-ba-curves-svg" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M90 35 C 230 35, 320 165, 435 165" stroke="#38BDF8" stroke-opacity="0.32" stroke-width="1.3" stroke-dasharray="4 4"/>' +
              '<path d="M250 30 C 340 40, 360 165, 435 165" stroke="#38BDF8" stroke-opacity="0.38" stroke-width="1.3" stroke-dasharray="4 4"/>' +
              '<path d="M130 120 C 260 120, 340 165, 435 165" stroke="#38BDF8" stroke-opacity="0.32" stroke-width="1.3" stroke-dasharray="4 4"/>' +
              '<path d="M290 115 C 360 125, 385 165, 435 165" stroke="#38BDF8" stroke-opacity="0.4" stroke-width="1.3" stroke-dasharray="4 4"/>' +
              '<path d="M100 205 C 250 205, 340 165, 435 165" stroke="#38BDF8" stroke-opacity="0.32" stroke-width="1.3" stroke-dasharray="4 4"/>' +
              '<path d="M280 200 C 355 195, 385 165, 435 165" stroke="#38BDF8" stroke-opacity="0.38" stroke-width="1.3" stroke-dasharray="4 4"/>' +
              '<path d="M110 280 C 265 280, 345 165, 435 165" stroke="#38BDF8" stroke-opacity="0.32" stroke-width="1.3" stroke-dasharray="4 4"/>' +
              '<path d="M275 275 C 355 265, 390 165, 435 165" stroke="#38BDF8" stroke-opacity="0.42" stroke-width="1.3" stroke-dasharray="4 4"/>' +
            '</svg>' +
            nodesHtml +
            '<div class="cx-ba-converge-btn">&rsaquo;</div>' +
          '</div>' +
        '</div>' +
        '<div class="cx-ba-after-card">' +
          '<div class="cx-ba-after-top">' +
            '<div>' +
              '<div class="cx-ba-after-eyebrow">AFTER CODNESTX</div>' +
              '<div class="cx-ba-after-title">' + prob.afterTitle + '</div>' +
            '</div>' +
            '<span class="cx-ba-live-badge"><i class="cx-ba-live-dot"></i> Live</span>' +
          '</div>' +
          '<div class="cx-ba-metrics-2x2">' + metricsHtml + '</div>' +
          '<div class="cx-ba-widgets-row">' +
            '<div class="cx-ba-barchart-box">' + barsHtml + '</div>' +
            '<div class="cx-ba-lines-box">' +
              '<div class="cx-ba-line-row"><span class="cx-ba-line-dot"></span><span class="cx-ba-line-bar"></span><span class="cx-ba-line-tag"></span></div>' +
              '<div class="cx-ba-line-row"><span class="cx-ba-line-dot"></span><span class="cx-ba-line-bar"></span><span class="cx-ba-line-tag"></span></div>' +
              '<div class="cx-ba-line-row"><span class="cx-ba-line-dot"></span><span class="cx-ba-line-bar"></span><span class="cx-ba-line-tag"></span></div>' +
              '<div class="cx-ba-line-progress"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      (isFull ? '<div class="cx-ba-outcomes-footer">' + outcomesHtml + '</div>' : '');
    }

    if (baActiveEl && baTabsEl) {
      baTabsEl.innerHTML = BEFORE_AFTER_PROBLEMS.map(function (p, i) {
        return '<button type="button" class="cx-ba-tab-pill' + (i === activeBaIdx ? ' active' : '') + '" data-ba-idx="' + i + '">' +
          p.num + ' &middot; ' + p.badge +
        '</button>';
      }).join("");

      function renderBaCarousel(idx) {
        var total = BEFORE_AFTER_PROBLEMS.length;
        activeBaIdx = ((idx % total) + total) % total;
        var prevIdx = (activeBaIdx - 1 + total) % total;
        var nextIdx = (activeBaIdx + 1) % total;

        baActiveEl.style.opacity = "0";
        baActiveEl.style.transform = "scale(0.96) translateY(10px)";

        setTimeout(function () {
          baActiveEl.innerHTML = buildBaCardHtml(BEFORE_AFTER_PROBLEMS[activeBaIdx], true);
          if (baLeftEl) baLeftEl.innerHTML = buildBaCardHtml(BEFORE_AFTER_PROBLEMS[prevIdx], false);
          if (baRightEl) baRightEl.innerHTML = buildBaCardHtml(BEFORE_AFTER_PROBLEMS[nextIdx], false);
          baActiveEl.style.opacity = "1";
          baActiveEl.style.transform = "scale(1) translateY(0)";
        }, 160);

        if (baCounterEl) {
          baCounterEl.textContent = BEFORE_AFTER_PROBLEMS[activeBaIdx].num + " / 06";
        }
        baTabsEl.querySelectorAll(".cx-ba-tab-pill").forEach(function (b, i) {
          b.classList.toggle("active", i === activeBaIdx);
        });
      }

      // Initial render without delay
      baActiveEl.innerHTML = buildBaCardHtml(BEFORE_AFTER_PROBLEMS[activeBaIdx], true);
      if (baLeftEl) baLeftEl.innerHTML = buildBaCardHtml(BEFORE_AFTER_PROBLEMS[1], false);
      if (baRightEl) baRightEl.innerHTML = buildBaCardHtml(BEFORE_AFTER_PROBLEMS[3], false);

      baTabsEl.querySelectorAll(".cx-ba-tab-pill").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var i = parseInt(btn.getAttribute("data-ba-idx") || "0", 10);
          renderBaCarousel(i);
        });
      });

      if (baPrevBtn) baPrevBtn.addEventListener("click", function () { renderBaCarousel(activeBaIdx - 1); });
      if (baNextBtn) baNextBtn.addEventListener("click", function () { renderBaCarousel(activeBaIdx + 1); });
      if (baLeftEl) baLeftEl.addEventListener("click", function () { renderBaCarousel(activeBaIdx - 1); });
      if (baRightEl) baRightEl.addEventListener("click", function () { renderBaCarousel(activeBaIdx + 1); });
    }

    // 6. KPI Bento Grid Section ("Highlighting Our Measurable Impact & KPIs")
    var growthSec = document.getElementById("kpi-bento-section");
    if (growthSec) {
      var growthH2 = growthSec.querySelector("h2");
      registerReveal(growthH2, "da-reveal-up", 0);
      var subH5 = growthSec.querySelector("h5");
      registerReveal(subH5, "da-reveal-up", 90);
      var lineEl = growthSec.querySelector("div[style*='transform-origin']");
      if (lineEl) registerReveal(lineEl, "da-line-draw", 140);

      var statCards = Array.from(growthSec.querySelectorAll("h4")).map(function (h4) {
        return h4.closest("div[class*='rounded-']");
      }).filter(Boolean);

      statCards.forEach(function (card, idx) {
        registerReveal(card, "da-reveal-up", idx * 80);
      });

      var countersAnimated = false;
      var counterObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !countersAnimated) {
              countersAnimated = true;
              obs.disconnect();
              var numericTargets = [50, 45, 5];
              statCards.forEach(function (card) {
                var spanEl = card.querySelector("h4 span");
                if (!spanEl) return;
                var rawTxt = spanEl.textContent.trim();
                var finalVal = parseInt(rawTxt, 10);
                if (!isNaN(finalVal) && numericTargets.indexOf(finalVal) !== -1 && String(finalVal) === rawTxt) {
                  (function (node, endVal) {
                    var startVal = Math.max(1, Math.floor(endVal * 0.15));
                    var duration = 1100;
                    var startTime = null;
                    function step(ts) {
                      if (!startTime) startTime = ts;
                      var progress = Math.min((ts - startTime) / duration, 1);
                      var eased = 1 - Math.pow(1 - progress, 3);
                      var current = Math.round(startVal + (endVal - startVal) * eased);
                      node.textContent = String(current);
                      if (progress < 1) {
                        requestAnimationFrame(step);
                      } else {
                        node.textContent = String(endVal);
                      }
                    }
                    requestAnimationFrame(step);
                  })(spanEl, finalVal);
                }
              });
            }
          });
        },
        { threshold: 0.2 }
      );
      counterObserver.observe(growthSec);
    }

    // 7. System Flow Modal handlers
    var modalEl = document.getElementById("cx-system-modal");
    var modalTitle = document.getElementById("cx-modal-title");
    var modalBadge = document.getElementById("cx-modal-badge");
    var modalDesc = document.getElementById("cx-modal-desc");
    var modalMetrics = document.getElementById("cx-modal-metrics");
    var modalModules = document.getElementById("cx-modal-modules");
    var modalClose = document.getElementById("cx-modal-close");
    var modalCancel = document.getElementById("cx-modal-cancel");
    var modalCta = document.getElementById("cx-modal-cta");

    function openSystemModal(key) {
      var info = SYSTEM_FLOW_DETAILS[key] || SYSTEM_FLOW_DETAILS.crm;
      if (!modalEl) return;
      modalBadge.textContent = info.badge;
      modalTitle.textContent = info.title;
      modalDesc.textContent = info.desc;
      modalMetrics.innerHTML = info.metrics.map(function (m) {
        return '<div class="cx-m-stat">' +
          '<div class="cx-m-stat-val">' + m.val + '</div>' +
          '<div class="cx-m-stat-lbl">' + m.lbl + '</div>' +
        '</div>';
      }).join("");
      modalModules.innerHTML = info.modules.map(function (mod) {
        return '<span class="cx-modal-mod-pill">&#10003; ' + mod + '</span>';
      }).join("");
      modalEl.style.display = "flex";
    }

    function closeSystemModal() {
      if (!modalEl) return;
      modalEl.style.display = "none";
    }

    document.querySelectorAll(".codnestx-flow-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var key = btn.getAttribute("data-system-flow") || "crm";
        openSystemModal(key);
      });
    });
    if (modalClose) modalClose.addEventListener("click", closeSystemModal);
    if (modalCancel) modalCancel.addEventListener("click", closeSystemModal);
    if (modalCta) modalCta.addEventListener("click", closeSystemModal);
    if (modalEl) {
      modalEl.addEventListener("click", function (e) {
        if (e.target === modalEl) closeSystemModal();
      });
    }

    // 8. Render Redesigned Split-Surface Cards for "Real Systems Built for Measurable Results"
    var portfolioGrid = document.getElementById("cx-portfolio-grid");
    var portfolioTabs = document.querySelectorAll("#cx-portfolio-tabs .cx-tab-btn");

    function renderPortfolio(filter) {
      if (!portfolioGrid) return;
      if (filter === "Process Gaps") {
        portfolioGrid.innerHTML = CODNESTX_PROCESS_GAPS.map(function (g, i) {
          var hudHtml = g.hud.map(function (step, idx) {
            return '<div class="cx-sc-hud-step">' + step + '</div>' +
              (idx < g.hud.length - 1 ? '<span class="cx-sc-hud-arrow">&rarr;</span>' : '');
          }).join("");

          return '<article class="cx-showcase-card" style="animation-delay:' + (i * 70) + 'ms">' +
            '<div class="cx-sc-visual">' +
              '<div class="cx-sc-vis-top">' +
                '<span class="cx-sc-domain-bar"><span class="cx-sc-domain-dots"><i></i><i></i></span> ' + g.domain + '</span>' +
                '<span class="cx-sc-num-badge">' + g.num + '</span>' +
              '</div>' +
              '<div class="cx-sc-hud-flow">' + hudHtml + '</div>' +
              '<div class="cx-sc-vis-bottom">' +
                '<span class="cx-sc-kpi-pill">&#9889; ' + g.kpiPill + '</span>' +
                '<span class="cx-sc-sector-lbl">' + g.sector + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="cx-sc-body">' +
              '<div>' +
                '<div class="cx-sc-cat-row">' +
                  '<span class="cx-sc-cat-tag">Operational Leak</span>' +
                '</div>' +
                '<h4 class="cx-sc-title">' + g.title + '</h4>' +
                '<p class="cx-sc-summary">' + g.problem + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="cx-sc-impact-footer">' +
              '<div class="cx-sc-impact-text">' +
                '<span class="cx-sc-impact-lbl">CODNESTX SYSTEM FIX</span>' +
                g.fix +
              '</div>' +
            '</div>' +
          '</article>';
        }).join("");
        return;
      }

      var items = CODNESTX_PORTFOLIO.filter(function (item) {
        return filter === "all" || item.category === filter;
      });

      function buildBespokeVisualWidget(p) {
        if (p.num === "01") {
          // Apex Logistics OS: Live Multi-Warehouse & Fleet Telemetry Bars
          return '<div class="cx-ui-Preview cx-ui-theme-logistics">' +
            '<div class="cx-ui-bar-grid">' +
              '<div class="cx-ui-metric-col"><span class="cx-ui-m-lbl">AMD Warehouse</span><div class="cx-ui-prog-track"><div class="cx-ui-prog-fill" style="width:98%;background:#38BDF8"></div></div><span class="cx-ui-m-val">98% Stock</span></div>' +
              '<div class="cx-ui-metric-col"><span class="cx-ui-m-lbl">BOM Dispatch</span><div class="cx-ui-prog-track"><div class="cx-ui-prog-fill" style="width:94%;background:#34D399"></div></div><span class="cx-ui-m-val">24 Trucks</span></div>' +
              '<div class="cx-ui-metric-col"><span class="cx-ui-m-lbl">Route AI Fuel</span><div class="cx-ui-prog-track"><div class="cx-ui-prog-fill" style="width:85%;background:#818CF8"></div></div><span class="cx-ui-m-val">-15% Fuel</span></div>' +
            '</div>' +
          '</div>';
        }
        if (p.num === "02") {
          // Zenith AI Broker: WhatsApp AI Lead Chat & Score Widget
          return '<div class="cx-ui-Preview cx-ui-theme-whatsapp">' +
            '<div class="cx-ui-chat-row incoming"><span class="cx-ui-chat-dot"></span><span>"Need 3BHK flat on SG Highway, budget ₹1.4Cr"</span></div>' +
            '<div class="cx-ui-chat-row outgoing"><span>&#9889; AI Qualified (96% Match) &rarr; Site Visit Booked in 45s</span></div>' +
          '</div>';
        }
        if (p.num === "03") {
          // Rutu Group CRM: Real Estate Tower & Unit Inventory Matrix
          return '<div class="cx-ui-Preview cx-ui-theme-realty">' +
            '<div class="cx-ui-unit-grid">' +
              '<div class="cx-ui-unit paid">A-402 &bull; Paid</div>' +
              '<div class="cx-ui-unit booked">B-701 &bull; Booked</div>' +
              '<div class="cx-ui-unit paid">C-204 &bull; Paid</div>' +
              '<div class="cx-ui-unit ready">D-102 &bull; Handover</div>' +
              '<div class="cx-ui-unit paid">A-803 &bull; Paid</div>' +
              '<div class="cx-ui-unit booked">B-305 &bull; Ledger</div>' +
            '</div>' +
          '</div>';
        }
        if (p.num === "04") {
          // Kalyan Jewellers Hub: Live 24K Bullion Ticker & Fast POS Invoice
          return '<div class="cx-ui-Preview cx-ui-theme-gold">' +
            '<div class="cx-ui-gold-row">' +
              '<div class="cx-ui-gold-pill"><span class="cx-ui-gold-lbl">24K LIVE RATE</span><span class="cx-ui-gold-val">&#8377;7,640/g &#9650;</span></div>' +
              '<div class="cx-ui-gold-pill"><span class="cx-ui-gold-lbl">POS BILLING</span><span class="cx-ui-gold-val">12m &rarr; 90s</span></div>' +
              '<div class="cx-ui-gold-pill"><span class="cx-ui-gold-lbl">MISMATCH</span><span class="cx-ui-gold-val">0.00%</span></div>' +
            '</div>' +
          '</div>';
        }
        if (p.num === "05") {
          // YAJYA: Mobile Fintech Instant Settlement & Wallet Split
          return '<div class="cx-ui-Preview cx-ui-theme-fintech">' +
            '<div class="cx-ui-fin-box">' +
              '<div class="cx-ui-fin-left"><div class="cx-ui-fin-sub">INSTANT ESCROW PAYOUT</div><div class="cx-ui-fin-amt">&#8377;1,42,500.00 <span>Settled</span></div></div>' +
              '<div class="cx-ui-fin-Spark"><i></i><i></i><i></i><i></i><i></i></div>' +
            '</div>' +
          '</div>';
        }
        if (p.num === "06") {
          // 360 Solutions: Multi-Role Sprint & Client SLA Board
          return '<div class="cx-ui-Preview cx-ui-theme-kanban">' +
            '<div class="cx-ui-kanban-cols">' +
              '<div class="cx-ui-kcol"><span class="cx-ui-kh">Scoped</span><span class="cx-ui-kv">14 Workflows</span></div>' +
              '<div class="cx-ui-kcol active"><span class="cx-ui-kh">In Sprint</span><span class="cx-ui-kv">99.4% SLA</span></div>' +
              '<div class="cx-ui-kcol done"><span class="cx-ui-kh">Delivered</span><span class="cx-ui-kv">-40% Cycle</span></div>' +
            '</div>' +
          '</div>';
        }
        // Cards 07 - 10: High-Conversion Web & Portal Telemetry
        var hudHtml = p.hud.map(function (step, idx) {
          return '<div class="cx-sc-hud-step">' + step + '</div>' +
            (idx < p.hud.length - 1 ? '<span class="cx-sc-hud-arrow">&rarr;</span>' : '');
        }).join("");
        return '<div class="cx-sc-hud-flow">' + hudHtml + '</div>';
      }

      var themeClasses = ["theme-ocean", "theme-emerald", "theme-indigo", "theme-amber", "theme-violet", "theme-cyan"];

      portfolioGrid.innerHTML = items.map(function (p, i) {
        var tagsHtml = p.stack.map(function (st) {
          return '<span class="cx-sc-chip">' + st + '</span>';
        }).join("");
        var tCls = themeClasses[i % themeClasses.length];
        var flowKey = (p.category === "CRM/ERP Systems") ? "erp" : ((p.category === "AI & Automation") ? "crm" : "planx");

        return '<article class="cx-showcase-card ' + tCls + '" data-sc-delay="' + (i * 85) + '">' +
          '<div class="cx-sc-visual ' + tCls + '">' +
            '<div class="cx-sc-vis-top">' +
              '<span class="cx-sc-domain-bar"><span class="cx-sc-domain-dots"><i></i><i></i><i></i></span> ' + p.domain + '</span>' +
              '<span class="cx-sc-num-badge">SYSTEM ' + p.num + '</span>' +
            '</div>' +
            buildBespokeVisualWidget(p) +
            '<div class="cx-sc-vis-bottom">' +
              '<span class="cx-sc-kpi-pill">&#10003; ' + p.kpiPill + '</span>' +
              '<span class="cx-sc-sector-lbl">' + p.sector + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="cx-sc-body">' +
            '<div>' +
              '<div class="cx-sc-cat-row">' +
                '<span class="cx-sc-cat-tag">' + p.category + '</span>' +
                '<span class="cx-sc-live-ind">&bull; Production System</span>' +
              '</div>' +
              '<h4 class="cx-sc-title">' + p.title + '</h4>' +
              '<p class="cx-sc-summary">' + p.summary + '</p>' +
            '</div>' +
            '<div class="cx-sc-stack-row">' + tagsHtml + '</div>' +
          '</div>' +
          '<div class="cx-sc-impact-footer">' +
            '<div class="cx-sc-impact-text">' +
              '<span class="cx-sc-impact-lbl">&#9889; VERIFIED BUSINESS IMPACT</span>' +
              '<div class="cx-sc-impact-val">' + p.impact + '</div>' +
            '</div>' +
            '<button type="button" class="cx-sc-arch-btn codnestx-flow-btn" data-system-flow="' + flowKey + '" title="Inspect System Architecture">&#8599;</button>' +
          '</div>' +
        '</article>';
      }).join("");

      // Re-bind modal triggers & staggered scroll reveal on newly rendered portfolio cards
      portfolioGrid.querySelectorAll(".codnestx-flow-btn").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          openSystemModal(btn.getAttribute("data-system-flow") || "crm");
        });
      });

      var scCards = portfolioGrid.querySelectorAll(".cx-showcase-card");
      var scObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var card = entry.target;
            var d = parseInt(card.getAttribute("data-sc-delay") || "0", 10);
            setTimeout(function () {
              card.classList.add("sc-in-view");
            }, d);
            obs.unobserve(card);
          }
        });
      }, { threshold: 0.08 });
      scCards.forEach(function (c) { scObs.observe(c); });
    }

    renderPortfolio("all");

    portfolioTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var filter = tab.getAttribute("data-cx-filter") || "all";
        portfolioTabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");
        renderPortfolio(filter);
      });
    });

    // 9. Industries Accordion
    var indSec = document.getElementById("industries-section");
    if (indSec) {
      var indH2 = indSec.querySelector("h2");
      registerReveal(indH2, "da-reveal-up", 0);
      var indButtons = Array.from(indSec.querySelectorAll("button")).filter(function (btn) {
        var span = btn.querySelector("span");
        return span && (span.textContent.trim() === "+" || span.textContent.trim() === "-");
      });

      indButtons.forEach(function (btn, rIdx) {
        registerReveal(btn.parentElement, "da-reveal-up", rIdx * 45);
        btn.addEventListener("click", function () {
          var row = btn.parentElement;
          var gridPanel = row.querySelector("div.grid");
          var signSpan = btn.querySelector("span");
          if (!gridPanel || !signSpan) return;

          var isOpen = signSpan.textContent.trim() === "-";

          indButtons.forEach(function (otherBtn) {
            var otherRow = otherBtn.parentElement;
            var otherGrid = otherRow.querySelector("div.grid");
            var otherSpan = otherBtn.querySelector("span");
            if (otherGrid && otherSpan && otherBtn !== btn) {
              otherGrid.style.gridTemplateRows = "0fr";
              otherSpan.textContent = "+";
            }
          });

          if (isOpen) {
            gridPanel.style.gridTemplateRows = "0fr";
            signSpan.textContent = "+";
          } else {
            gridPanel.style.gridTemplateRows = "1fr";
            signSpan.textContent = "-";
            var pills = gridPanel.querySelectorAll("span");
            pills.forEach(function (pill, idx) {
              pill.classList.remove("da-tag-animate");
              void pill.offsetWidth;
              pill.style.animationDelay = idx * 45 + "ms";
              pill.classList.add("da-tag-animate");
            });
          }
        });
      });
    }

    // 10. FAQ Accordion
    var faqButtons = Array.from(document.querySelectorAll('button[aria-controls^="panel-"]'));
    faqButtons.forEach(function (btn, fIdx) {
      var panelId = btn.getAttribute("aria-controls");
      var region = document.getElementById(panelId);
      if (!region) return;
      var wrapper = region.parentElement;
      wrapper.classList.add("da-faq-panel");
      var iconWrap = btn.querySelector("div.shrink-0");
      if (iconWrap) iconWrap.classList.add("da-faq-icon-wrap");
      registerReveal(btn.parentElement, "da-reveal-up", fIdx * 50);

      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        if (expanded) {
          wrapper.style.height = wrapper.scrollHeight + "px";
          requestAnimationFrame(function () {
            wrapper.style.height = "0px";
          });
          btn.setAttribute("aria-expanded", "false");
        } else {
          wrapper.style.height = region.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
          wrapper.addEventListener("transitionend", function onEnd() {
            if (btn.getAttribute("aria-expanded") === "true") {
              wrapper.style.height = "auto";
            }
            wrapper.removeEventListener("transitionend", onEnd);
          });
        }
      });
    });

    // 11. Testimonials Carousel
    var tIdx = 0;
    var roleEl = document.getElementById("cx-testimonial-role");
    var sysEl = document.getElementById("cx-testimonial-system");
    var quoteEl = document.getElementById("cx-testimonial-quote");
    var prevBtn = document.querySelector('button[aria-label="Navigate to previous testimonial"]');
    var nextBtn = document.querySelector('button[aria-label="Navigate to next testimonial"]');

    function renderTestimonial(idx) {
      var item = TESTIMONIALS[idx];
      if (!item || !roleEl || !sysEl || !quoteEl) return;
      roleEl.textContent = item.role;
      sysEl.textContent = item.system;
      quoteEl.textContent = item.quote;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        tIdx = (tIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
        renderTestimonial(tIdx);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        tIdx = (tIdx + 1) % TESTIMONIALS.length;
        renderTestimonial(tIdx);
      });
    }

    // 12. Contact Section Reveal & Interactive Form Submission
    var contactSec = document.getElementById("contact-section");
    if (contactSec) registerReveal(contactSec, "da-reveal-up", 0);
    var auditForm = document.getElementById("codnestx-audit-form");
    var toastEl = document.getElementById("cx-toast");
    if (auditForm) {
      auditForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (toastEl) {
          toastEl.style.display = "block";
          setTimeout(function () {
            toastEl.style.display = "none";
          }, 5000);
        }
        auditForm.reset();
      });
    }

    // 13. Rotating Headlines (1.5s ease vertical slide & fade)
    var rotatingHeadlines = Array.from(document.querySelectorAll("h2")).filter(function (h) {
      var cls = h.getAttribute("class") || "";
      return cls.indexOf("transition:opacity_1.5s_ease,transform_1.5s_ease") !== -1;
    });
    if (rotatingHeadlines.length > 1) {
      var activeIdx = rotatingHeadlines.findIndex(function (h) {
        return parseFloat(h.style.opacity || "0") === 1;
      });
      if (activeIdx === -1) activeIdx = 0;

      rotatingHeadlines.forEach(function (el, idx) {
        if (idx === activeIdx) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0px)";
          el.style.zIndex = "2";
        } else {
          el.style.transition = "none";
          el.style.opacity = "0";
          el.style.transform = "translateY(100%)";
          el.style.zIndex = "0";
        }
      });

      setInterval(function () {
        var prevIdx = activeIdx;
        activeIdx = (activeIdx + 1) % rotatingHeadlines.length;
        var outgoing = rotatingHeadlines[prevIdx];
        var incoming = rotatingHeadlines[activeIdx];

        incoming.style.transition = "none";
        incoming.style.opacity = "0";
        incoming.style.transform = "translateY(100%)";
        incoming.style.zIndex = "2";
        void incoming.offsetWidth;

        outgoing.style.transition = "opacity 1.5s ease, transform 1.5s ease";
        incoming.style.transition = "opacity 1.5s ease, transform 1.5s ease";

        outgoing.style.opacity = "0";
        outgoing.style.transform = "translateY(-100%)";
        outgoing.style.zIndex = "1";

        incoming.style.opacity = "1";
        incoming.style.transform = "translateY(0px)";
      }, 3200);
    }

    // 14. Lottie Centerpiece Animation (Desktop & Mobile JSONs with frozen SVG fallback)
    var lottieWrapper = Array.from(document.querySelectorAll("div")).find(function (d) {
      var cls = d.getAttribute("class") || "";
      return cls.indexOf("aspect-[1080/1920]") !== -1 && cls.indexOf("sm769:aspect-[1920/1400]") !== -1;
    });
    if (lottieWrapper) {
      var lottieInner = lottieWrapper.firstElementChild;
      var frozenSvg = lottieInner ? lottieInner.querySelector("svg") : null;
      if (lottieInner && frozenSvg) {
        var DESKTOP_JSON = "https://dnhm2py0jncte.cloudfront.net/new_Home_Page_Animation_Desktop_332ed511ec.json";
        var MOBILE_JSON = "https://dnhm2py0jncte.cloudfront.net/uploads/new_Home_Page_Animation_Mobile_e3923641de.json";
        var currentMode = null;
        var currentAnim = null;
        var mountEl = null;

        var mountLottie = function () {
          if (!window.lottie) return;
          var isDesktop = window.innerWidth >= 769;
          var nextMode = isDesktop ? "desktop" : "mobile";
          if (currentMode === nextMode && currentAnim) return;
          currentMode = nextMode;

          if (currentAnim) {
            currentAnim.destroy();
            currentAnim = null;
          }
          if (mountEl) {
            mountEl.remove();
          }
          frozenSvg.style.display = "";

          mountEl = document.createElement("div");
          mountEl.className = "da-lottie-mount";
          lottieInner.appendChild(mountEl);

          currentAnim = window.lottie.loadAnimation({
            container: mountEl,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: isDesktop ? DESKTOP_JSON : MOBILE_JSON
          });

          currentAnim.addEventListener("DOMLoaded", function () {
            frozenSvg.style.display = "none";
            try {
              var lottieSvg = mountEl.querySelector("svg");
              if (lottieSvg) {
                lottieSvg.querySelectorAll("image").forEach(function (imgEl) {
                  var href = imgEl.getAttribute("href") || imgEl.getAttribute("xlink:href") || "";
                  var hAttr = parseFloat(imgEl.getAttribute("height") || "0");
                  if (href.indexOf("data:image/png") === 0 && hAttr > 0 && hAttr <= 220) {
                    var im = new Image();
                    im.onload = function () {
                      var c = document.createElement("canvas");
                      c.width = im.naturalWidth || 1400;
                      c.height = im.naturalHeight || 176;
                      var ctx = c.getContext("2d");
                      ctx.drawImage(im, 0, 0);
                      ctx.globalCompositeOperation = "source-in";
                      var g = ctx.createLinearGradient(0, 0, c.width, 0);
                      g.addColorStop(0, "#1998DC");
                      g.addColorStop(0.55, "#0170BA");
                      g.addColorStop(1, "#1E3A5F");
                      ctx.fillStyle = g;
                      ctx.fillRect(0, 0, c.width, c.height);
                      var newUrl = c.toDataURL("image/png");
                      imgEl.setAttribute("href", newUrl);
                      imgEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", newUrl);
                    };
                    im.src = href;
                  }
                });
              }
            } catch (e) {}
          });
          currentAnim.addEventListener("data_failed", function () {
            if (mountEl) mountEl.remove();
            mountEl = null;
            frozenSvg.style.display = "";
          });
        };

        var loadLottieScript = function (cb) {
          if (window.lottie) {
            cb();
            return;
          }
          var s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
          s.async = true;
          s.onload = cb;
          document.head.appendChild(s);
        };

        loadLottieScript(mountLottie);

        var resizeTimer = null;
        window.addEventListener("resize", function () {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(mountLottie, 200);
        });
      }
    }
  });
})();
