(function () {
  "use strict";

  // ============================================================================
  // 1. MOTION TOKENS (Single Source of Truth)
  // ============================================================================
  var TOKENS = {
    easeOut: "expo.out", // cubic-bezier(.16, 1, .3, 1)
    easeInOut: "power3.inOut", // cubic-bezier(.65, 0, .35, 1)
    easeSpring: "back.out(1.5)",
    easeOutExpoFn: function (t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },
    dur: {
      micro: 0.22,
      reveal: 0.72,
      heading: 0.82,
      countUp: 1.5,
      modal: 0.38
    },
    stagger: {
      each: 0.055,
      cap: 0.55,
      line: 0.08
    },
    dist: 22
  };

  var SYSTEM_FLOW_DETAILS = {
    crm: {
      badge: "01 — CRM & LEAD MANAGEMENT SYSTEM",
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
      badge: "02 — ERP & OPERATIONS SYSTEM",
      title: "Operations Control Board — Inventory, Production & Dispatch",
      desc: "Digitize raw materials, WIP, ready stock, purchase orders, production work orders, quality approvals, and dispatch fulfillment in one connected ERP.",
      metrics: [
        { val: "68%", lbl: "Production Progress" },
        { val: "Zero", lbl: "Stock Mismatch" },
        { val: "+84%", lbl: "Handoff Speed" },
        { val: "99.9%", lbl: "Uptime SLA" }
      ],
      modules: ["Raw / WIP / Ready Stock Ledger", "Automated Reorder Alerts", "Purchase Order Approvals", "Production Batch Tracking", "Controlled Gate Pass & Dispatch", "Vendor Settlement Portal"]
    },
    hrms: {
      badge: "03 — HRMS & WORKFORCE SYSTEM",
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
      badge: "04 — ADMIN DASHBOARD & ANALYTICS",
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
      badge: "05 — PLANX & CODNESTX OS",
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

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasGSAP = typeof window.gsap !== "undefined";
    var hasST = hasGSAP && typeof window.ScrollTrigger !== "undefined";
    if (hasGSAP && typeof window.gsap.config === "function") { window.gsap.config({ nullTargetWarn: false }); }
    var hasFlip = hasGSAP && typeof window.Flip !== "undefined";
    var hasLenis = typeof window.Lenis !== "undefined";

    if (hasGSAP) {
      if (hasST) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.ScrollTrigger.config({ ignoreMobileResize: true });
      }
      if (hasFlip) window.gsap.registerPlugin(window.Flip);
      if (window.Draggable) window.gsap.registerPlugin(window.Draggable);
      if (window.Observer) window.gsap.registerPlugin(window.Observer);
    }

    // ==========================================================================
    // 2. BUTTERY LENIS SMOOTH SCROLLING + UNIFIED GSAP TICKER
    // ==========================================================================
    var lenis = null;
    if (hasLenis && !prefersReduced) {
      lenis = new window.Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false
      });

      window.__cxLenis = lenis;
      if (hasST) {
        lenis.on("scroll", window.ScrollTrigger.update);
      }
      if (hasGSAP) {
        window.gsap.ticker.lagSmoothing(0);
        window.gsap.ticker.add(function (time) {
          lenis.raf(time * 1000);
        });
      } else {
        function rafLoop(ts) {
          lenis.raf(ts);
          requestAnimationFrame(rafLoop);
        }
        requestAnimationFrame(rafLoop);
      }
    }

    // Smart Header: shrink after 80px, hide on scroll-down, reveal on scroll-up (rAF-throttled)
    var header = document.getElementById("cx-site-header");
    var lastY = window.scrollY || 0;
    var modalOpen = false;
    var mobileMenuOpen = false;
    var headerScrolled = false;
    var headerHidden = false;
    var headerScrollQueued = false;
    var headerDeltaAccum = 0;

    function applyHeaderScroll() {
      headerScrollQueued = false;
      var y = window.scrollY || window.pageYOffset || 0;
      var dy = y - lastY;
      if (header) {
        var nextScrolled = y > 80;
        if (nextScrolled !== headerScrolled) {
          headerScrolled = nextScrolled;
          header.classList.toggle("is-scrolled", nextScrolled);
        }
        if (dy > 0) {
          headerDeltaAccum = headerDeltaAccum > 0 ? headerDeltaAccum + dy : dy;
        } else if (dy < 0) {
          headerDeltaAccum = headerDeltaAccum < 0 ? headerDeltaAccum + dy : dy;
        }
        if (y > 160 && headerDeltaAccum > 18 && !mobileMenuOpen && !modalOpen) {
          if (!headerHidden) {
            headerHidden = true;
            header.classList.add("is-hidden");
          }
          headerDeltaAccum = 0;
        } else if (headerDeltaAccum < -10 || y <= 100) {
          if (headerHidden) {
            headerHidden = false;
            header.classList.remove("is-hidden");
          }
          headerDeltaAccum = 0;
        }
      }
      lastY = y;
    }
    function onWindowScroll() {
      if (!headerScrollQueued) {
        headerScrollQueued = true;
        requestAnimationFrame(applyHeaderScroll);
      }
    }
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    applyHeaderScroll();

    // Sliding Active Nav Pill via GSAP Flip
    var navLinks = Array.from(document.querySelectorAll(".cx-nav-link[data-section]"));
    var activeNavPill = document.getElementById("cx-nav-active-pill");

    function setActiveNavLink(targetLink) {
      if (!targetLink || !activeNavPill || targetLink.contains(activeNavPill)) return;
      var state = hasFlip && !prefersReduced ? window.Flip.getState(activeNavPill) : null;
      navLinks.forEach(function (lnk) {
        lnk.classList.remove("is-active");
      });
      targetLink.classList.add("is-active");
      targetLink.insertBefore(activeNavPill, targetLink.firstChild);
      if (state) {
        window.Flip.from(state, {
          duration: 0.38,
          ease: TOKENS.easeOut,
          absolute: true
        });
      }
    }

    if (hasST && navLinks.length) {
      navLinks.forEach(function (lnk) {
        var secId = lnk.getAttribute("data-section");
        var secEl = document.getElementById(secId);
        if (!secEl) return;
        window.ScrollTrigger.create({
          trigger: secEl,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: function () { setActiveNavLink(lnk); },
          onEnterBack: function () { setActiveNavLink(lnk); }
        });
      });
    }

    // Mobile Menu Drawer
    var mobileMenuBtn = document.getElementById("cx-mobile-menu-btn");
    var mobileDrawer = document.getElementById("cx-mobile-drawer");
    function toggleMobileMenu(forceOpen) {
      if (!mobileDrawer || !mobileMenuBtn) return;
      mobileMenuOpen = typeof forceOpen === "boolean" ? forceOpen : !mobileMenuOpen;
      mobileMenuBtn.setAttribute("aria-expanded", String(mobileMenuOpen));
      mobileDrawer.setAttribute("aria-hidden", String(!mobileMenuOpen));
      if (mobileMenuOpen) {
        mobileDrawer.classList.add("is-open");
        if (lenis && typeof lenis.stop === "function") lenis.stop();
        if (hasGSAP && !prefersReduced) {
          window.gsap.fromTo(
            mobileDrawer.querySelectorAll(".cx-mobile-link, .cx-mobile-cta"),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: TOKENS.easeOut, stagger: 0.04, clearProps: "transform,opacity" }
          );
        }
      } else {
        mobileDrawer.classList.remove("is-open");
        if (lenis && !modalOpen && typeof lenis.start === "function") lenis.start();
      }
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        toggleMobileMenu();
      });
    }

    // Smooth Anchor Navigation via lenis.scrollTo
    document.querySelectorAll('a[href^="#"], [data-lenis-link]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var href = anchor.getAttribute("data-lenis-link") || anchor.getAttribute("href");
        if (!href || href === "#" || href.indexOf("#system-flow-") === 0) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        if (mobileMenuOpen) toggleMobileMenu(false);
        var headerH = header ? header.offsetHeight : 72;
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -headerH,
            duration: 1.25,
            easing: TOKENS.easeOutExpoFn
          });
        } else {
          var topPos = target.getBoundingClientRect().top + window.pageYOffset - headerH;
          window.scrollTo({ top: topPos, behavior: prefersReduced ? "auto" : "smooth" });
        }
      });
    });

    // ==========================================================================
    // 3. HERO INTRO, SPHERE FLOAT & MOUSE PARALLAX (Guaranteed Visible)
    // ==========================================================================
    if (hasGSAP && !prefersReduced) {
      var gsap = window.gsap;
      var heroLines = document.querySelectorAll('[data-split-heading="hero"] .cx-line-inner');
      var heroStaggerEls = [
        document.querySelector("[data-hero-lead]"),
        document.querySelector("[data-hero-cta]"),
        document.querySelector("[data-hero-tags]"),
        document.querySelector("[data-hero-sla]")
      ].filter(Boolean);

      if (heroLines.length) {
        gsap.fromTo(
          heroLines,
          { y: 24, yPercent: 0, opacity: 0 },
          {
            y: 0,
            yPercent: 0,
            opacity: 1,
            duration: TOKENS.dur.heading,
            ease: TOKENS.easeOut,
            stagger: TOKENS.stagger.line,
            clearProps: "transform,opacity,willChange"
          }
        );
      }

      if (heroStaggerEls.length) {
        gsap.fromTo(
          heroStaggerEls,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: TOKENS.dur.reveal,
            delay: 0.14,
            ease: TOKENS.easeOut,
            stagger: 0.06,
            clearProps: "transform,opacity,willChange"
          }
        );
      }

      var sphereFloatEl = document.getElementById("cx-hero-sphere-float");
      if (sphereFloatEl) {
        gsap.to(sphereFloatEl, {
          y: 8,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      var sphereParallaxEl = document.getElementById("cx-hero-sphere-parallax");
      var heroSecEl = document.getElementById("hero-section");
      if (sphereParallaxEl && heroSecEl && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        var xTo = gsap.quickTo(sphereParallaxEl, "x", { duration: 0.6, ease: "power3.out" });
        var yTo = gsap.quickTo(sphereParallaxEl, "y", { duration: 0.6, ease: "power3.out" });
        heroSecEl.addEventListener("mousemove", function (e) {
          var rect = heroSecEl.getBoundingClientRect();
          var nx = (e.clientX - rect.left) / rect.width - 0.5;
          var ny = (e.clientY - rect.top) / rect.height - 0.5;
          xTo(nx * 16);
          yTo(ny * 12);
        });
        heroSecEl.addEventListener("mouseleave", function () {
          xTo(0);
          yTo(0);
        });
      }
    }

    // ==========================================================================
    // 4. SCROLL REVEAL SYSTEM ACROSS ALL SECTIONS (Zero Invisible Text Trap)
    // ==========================================================================
    document.querySelectorAll("div.flex.w-max").forEach(function (track) {
      if (track.children.length >= 10) {
        track.style.transform = "";
        track.classList.add("da-client-marquee");
      }
    });

    if (hasGSAP && hasST && !prefersReduced) {
      var g = window.gsap;

      document.querySelectorAll('[data-split-heading="true"]').forEach(function (heading) {
        var lines = heading.querySelectorAll(".cx-line-inner");
        if (!lines.length) return;
        g.fromTo(
          lines,
          { y: 22, yPercent: 0, opacity: 0 },
          {
            y: 0,
            yPercent: 0,
            opacity: 1,
            duration: TOKENS.dur.heading,
            ease: TOKENS.easeOut,
            stagger: TOKENS.stagger.line,
            clearProps: "transform,opacity,willChange",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              once: true
            }
          }
        );
      });

      document.querySelectorAll("[data-reveal-lead]").forEach(function (lead) {
        g.fromTo(
          lead,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: TOKENS.dur.reveal,
            delay: 0.08,
            ease: TOKENS.easeOut,
            clearProps: "transform,opacity,willChange",
            scrollTrigger: {
              trigger: lead,
              start: "top 92%",
              once: true
            }
          }
        );
      });

      var staggerParents = new Set();
      document.querySelectorAll("[data-stagger-item]").forEach(function (item) {
        if (item.parentElement) staggerParents.add(item.parentElement);
      });
      staggerParents.forEach(function (parent) {
        var items = Array.from(parent.querySelectorAll(":scope > [data-stagger-item]"));
        if (!items.length) items = Array.from(parent.querySelectorAll("[data-stagger-item]"));
        g.fromTo(
          items,
          { opacity: 0, y: TOKENS.dist },
          {
            opacity: 1,
            y: 0,
            duration: TOKENS.dur.reveal,
            ease: TOKENS.easeOut,
            stagger: { amount: Math.min(TOKENS.stagger.cap, items.length * TOKENS.stagger.each) },
            clearProps: "transform,opacity,willChange",
            scrollTrigger: {
              trigger: parent,
              start: "top 90%",
              once: true
            }
          }
        );
      });

      document.querySelectorAll("[data-countup]").forEach(function (el) {
        var targetVal = parseFloat(el.getAttribute("data-countup") || "0");
        var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var hasAnimated = false;
        function runCount() {
          if (hasAnimated) return;
          hasAnimated = true;
          var proxy = { val: 0 };
          g.to(proxy, {
            val: targetVal,
            duration: TOKENS.dur.countUp,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = proxy.val.toFixed(decimals) + suffix;
            },
            onComplete: function () {
              el.textContent = targetVal.toFixed(decimals) + suffix;
            }
          });
        }
        if (hasST) {
          window.ScrollTrigger.create({
            trigger: el.closest(".cx-bento-tile") || el,
            start: "top 92%",
            once: true,
            onEnter: runCount
          });
        } else if ("IntersectionObserver" in window) {
          var io = new IntersectionObserver(function (entries) {
            if (entries[0] && entries[0].isIntersecting) { runCount(); io.disconnect(); }
          }, { threshold: 0.15 });
          io.observe(el);
        } else {
          runCount();
        }
      });
    }

    // ==========================================================================
    // 5. KPI BENTO: REAL 3D ROTATING GLOBES AT MEDIUM-FAST SPEED
    //    - #cx-bento-globe-canvas (5+ Industries Served)
    //    - #cx-bento-lat-globe-canvas (99.9% Uptime SLA - image_45700b.png)
    // ==========================================================================
    (function initRotatingGlobes() {
      // Accurate simplified world continent polygons [latDeg, lonDeg] for crisp 3D globe rendering
      var CONTINENT_POLYGONS = [
        // North America
        [[70,-162],[71,-135],[69,-105],[63,-82],[56,-62],[47,-53],[43,-66],[35,-75],[25,-80],[29,-90],[26,-97],[18,-95],[14,-87],[9,-80],[15,-93],[22,-106],[32,-117],[40,-124],[49,-126],[59,-138],[61,-152],[65,-166]],
        // Greenland
        [[82,-32],[77,-18],[69,-24],[60,-44],[67,-54],[76,-68],[81,-52]],
        // South America
        [[11,-75],[10,-62],[4,-51],[-5,-35],[-14,-39],[-23,-43],[-35,-56],[-48,-66],[-55,-68],[-46,-74],[-30,-72],[-18,-71],[-5,-81],[4,-77]],
        // Europe
        [[70,28],[65,14],[58,6],[53,5],[48,-4],[43,-9],[36,-6],[37,0],[43,4],[45,12],[40,18],[38,24],[42,29],[48,38],[56,42],[64,42],[69,36]],
        // UK & Ireland
        [[58,-5],[57,-2],[51,1],[50,-5],[54,-5]],
        // Africa
        [[36,-6],[37,10],[32,16],[31,32],[22,37],[12,44],[11,51],[2,45],[-10,40],[-24,35],[-34,25],[-34,18],[-22,14],[-6,12],[4,9],[5,-4],[11,-16],[21,-17],[31,-10]],
        // Madagascar
        [[-13,49],[-18,50],[-25,47],[-24,44],[-16,45]],
        // Asia (including Middle East, India, China, SE Asia, Siberia)
        [[69,38],[72,72],[73,108],[70,145],[66,176],[60,164],[52,142],[42,132],[38,128],[31,122],[22,114],[16,108],[10,105],[14,100],[20,93],[22,88],[15,80],[8,77],[15,74],[23,68],[25,61],[23,59],[15,52],[13,44],[28,35],[36,36],[41,29],[44,40],[55,44]],
        // Japan
        [[44,144],[39,141],[34,136],[32,130],[36,136],[41,140]],
        // Indonesia / Borneo
        [[6,117],[1,118],[-3,115],[-2,109],[3,111]],
        // Australia
        [[-12,131],[-12,136],[-16,145],[-26,153],[-35,151],[-38,144],[-35,136],[-32,126],[-34,115],[-22,114],[-16,123]],
        // New Zealand
        [[-35,173],[-41,176],[-46,168],[-42,171]]
      ];

      // Pre-convert continent rings to unit-sphere 3D vectors (baseX, baseY, baseZ)
      var DEG = Math.PI / 180;
      var continentRings3D = CONTINENT_POLYGONS.map(function (ring) {
        // Subdivide longer edges so continents curve smoothly around the sphere
        var dense = [];
        for (var i = 0; i < ring.length; i++) {
          var a = ring[i];
          var b = ring[(i + 1) % ring.length];
          var dLat = b[0] - a[0];
          var dLon = b[1] - a[1];
          var segs = Math.max(1, Math.ceil(Math.hypot(dLat, dLon) / 5));
          for (var s = 0; s < segs; s++) {
            var t = s / segs;
            var lat = (a[0] + dLat * t) * DEG;
            var lon = (a[1] + dLon * t) * DEG;
            dense.push({
              bx: Math.cos(lat) * Math.sin(lon),
              by: -Math.sin(lat),
              bz: Math.cos(lat) * Math.cos(lon)
            });
          }
        }
        return dense;
      });

      var dpr = Math.min(2, window.devicePixelRatio || 1);

      // --- Globe A: #cx-bento-globe-canvas (Industries Bento Card — 60fps, 14 Global Connected Locations, 18 3D SLERP Arcs) ---
      var canvasA = document.getElementById("cx-bento-globe-canvas");
      var ctxA = canvasA ? canvasA.getContext("2d") : null;
      var sizeA = 220;
      var hubsA = [
        { name: "Ahmedabad", lat: 23.02 * DEG, lon: 72.57 * DEG, main: true },
        { name: "Mumbai", lat: 19.08 * DEG, lon: 72.88 * DEG },
        { name: "Bengaluru", lat: 12.97 * DEG, lon: 77.59 * DEG },
        { name: "Dubai", lat: 25.20 * DEG, lon: 55.27 * DEG },
        { name: "Riyadh", lat: 24.71 * DEG, lon: 46.68 * DEG },
        { name: "London", lat: 51.50 * DEG, lon: -0.12 * DEG },
        { name: "Frankfurt", lat: 50.11 * DEG, lon: 8.68 * DEG },
        { name: "New York", lat: 40.71 * DEG, lon: -74.00 * DEG },
        { name: "San Francisco", lat: 37.77 * DEG, lon: -122.42 * DEG },
        { name: "Toronto", lat: 43.65 * DEG, lon: -79.38 * DEG },
        { name: "Sao Paulo", lat: -23.55 * DEG, lon: -46.63 * DEG },
        { name: "Singapore", lat: 1.35 * DEG, lon: 103.82 * DEG },
        { name: "Tokyo", lat: 35.68 * DEG, lon: 139.65 * DEG },
        { name: "Sydney", lat: -33.86 * DEG, lon: 151.20 * DEG }
      ].map(function (h) {
        return {
          name: h.name,
          lat: h.lat,
          lon: h.lon,
          main: !!h.main,
          bx: Math.cos(h.lat) * Math.sin(h.lon),
          by: -Math.sin(h.lat),
          bz: Math.cos(h.lat) * Math.cos(h.lon)
        };
      });

      // 9 clean, globally balanced delivery arcs (halved for clarity and smooth visuals)
      var arcPairsA = [
        [0, 3],   // Ahmedabad -> Dubai
        [0, 5],   // Ahmedabad -> London
        [0, 11],  // Ahmedabad -> Singapore
        [3, 6],   // Dubai -> Frankfurt
        [5, 7],   // London -> New York
        [7, 8],   // New York -> San Francisco
        [7, 10],  // New York -> Sao Paulo
        [8, 12],  // San Francisco -> Tokyo
        [11, 13]  // Singapore -> Sydney
      ];

      // Precompute 3D great-circle SLERP sample points for every arc once (32 steps for silky curves)
      var ARC_STEPS = 32;
      var precomputedArcsA = arcPairsA.map(function (pair, idx) {
        var a = hubsA[pair[0]];
        var b = hubsA[pair[1]];
        var dot = Math.max(-0.9999, Math.min(0.9999, a.bx * b.bx + a.by * b.by + a.bz * b.bz));
        var omega = Math.acos(dot);
        var sinO = Math.sin(omega) || 1;
        var liftMax = 0.14 + Math.min(0.18, omega * 0.11);
        var pts = [];
        for (var s = 0; s <= ARC_STEPS; s++) {
          var t = s / ARC_STEPS;
          var w0 = Math.sin((1 - t) * omega) / sinO;
          var w1 = Math.sin(t * omega) / sinO;
          var lift = 1 + Math.sin(t * Math.PI) * liftMax;
          pts.push({
            bx: (a.bx * w0 + b.bx * w1) * lift,
            by: (a.by * w0 + b.by * w1) * lift,
            bz: (a.bz * w0 + b.bz * w1) * lift
          });
        }
        return { pts: pts, phaseOffset: (idx * 0.17) % 1, isHq: pair[0] === 0 };
      });

      var rotYA = -1.1;
      var tiltXA = 0.24;
      var cxA = sizeA / 2;
      var cyA = sizeA / 2;
      var RA = 88;
      var arcPacketPhase = 0;

      // Pre-cache static gradients once (never recreate 4 gradients 60x/sec)
      var glowGradA = null, sphereFillGradA = null, landGradA = null, rimShadeGradA = null;
      if (canvasA && ctxA) {
        canvasA.width = sizeA * dpr;
        canvasA.height = sizeA * dpr;
        ctxA.scale(dpr, dpr);

        glowGradA = ctxA.createRadialGradient(cxA, cyA, RA * 0.72, cxA, cyA, RA * 1.18);
        glowGradA.addColorStop(0, "rgba(25, 152, 220, 0.16)");
        glowGradA.addColorStop(0.7, "rgba(1, 112, 186, 0.07)");
        glowGradA.addColorStop(1, "rgba(1, 112, 186, 0)");

        sphereFillGradA = ctxA.createRadialGradient(cxA - 26, cyA - 26, 8, cxA, cyA, RA);
        sphereFillGradA.addColorStop(0, "#FFFFFF");
        sphereFillGradA.addColorStop(0.55, "#E9F6FE");
        sphereFillGradA.addColorStop(1, "#C7E8FC");

        landGradA = ctxA.createLinearGradient(cxA - RA, cyA - RA, cxA + RA, cyA + RA);
        landGradA.addColorStop(0, "rgba(25, 152, 220, 0.88)");
        landGradA.addColorStop(0.55, "rgba(1, 112, 186, 0.90)");
        landGradA.addColorStop(1, "rgba(12, 59, 117, 0.86)");

        rimShadeGradA = ctxA.createRadialGradient(cxA - 28, cyA - 28, RA * 0.25, cxA, cyA, RA);
        rimShadeGradA.addColorStop(0, "rgba(255, 255, 255, 0.22)");
        rimShadeGradA.addColorStop(0.72, "rgba(255, 255, 255, 0)");
        rimShadeGradA.addColorStop(1, "rgba(6, 24, 68, 0.18)");
      }

      var cosTiltA = Math.cos(tiltXA);
      var sinTiltA = Math.sin(tiltXA);

      function projectVec3A(bx, by, bz, sinY, cosY) {
        var x1 = bx * cosY + bz * sinY;
        var z1 = bz * cosY - bx * sinY;
        var y2 = by * cosTiltA - z1 * sinTiltA;
        var z2 = by * sinTiltA + z1 * cosTiltA;
        return { x: cxA + x1 * RA, y: cyA + y2 * RA, z: z2, ux: x1, uy: y2 };
      }

      function project3DA(lat, lon, radius) {
        var phi = lon + rotYA;
        var x = radius * Math.cos(lat) * Math.sin(phi);
        var y = -radius * Math.sin(lat);
        var z = radius * Math.cos(lat) * Math.cos(phi);
        var y2 = y * cosTiltA - z * sinTiltA;
        var z2 = y * sinTiltA + z * cosTiltA;
        return { x: cxA + x, y: cyA + y2, z: z2 };
      }

      function drawGlobeA() {
        if (!ctxA) return;
        ctxA.clearRect(0, 0, sizeA, sizeA);

        // Soft outer atmospheric halo
        ctxA.fillStyle = glowGradA;
        ctxA.beginPath();
        ctxA.arc(cxA, cyA, RA * 1.18, 0, Math.PI * 2);
        ctxA.fill();

        // Ocean sphere fill
        ctxA.fillStyle = sphereFillGradA;
        ctxA.beginPath();
        ctxA.arc(cxA, cyA, RA, 0, Math.PI * 2);
        ctxA.fill();

        var sinY = Math.sin(rotYA), cosY = Math.cos(rotYA);

        ctxA.save();
        ctxA.beginPath();
        ctxA.arc(cxA, cyA, RA - 0.5, 0, Math.PI * 2);
        ctxA.clip();

        // Subtle latitude/longitude graticule lines for 3D depth
        ctxA.strokeStyle = "rgba(1, 112, 186, 0.11)";
        ctxA.lineWidth = 0.7;
        for (var gLat = -60; gLat <= 60; gLat += 30) {
          var latRad = gLat * DEG;
          var started = false;
          ctxA.beginPath();
          for (var gLon = -180; gLon <= 180; gLon += 12) {
            var p = project3DA(latRad, gLon * DEG, RA);
            if (p.z >= 0) {
              if (!started) { ctxA.moveTo(p.x, p.y); started = true; }
              else ctxA.lineTo(p.x, p.y);
            } else {
              started = false;
            }
          }
          ctxA.stroke();
        }
        for (var mLon = -180; mLon < 180; mLon += 30) {
          var lonRad = mLon * DEG;
          var mStarted = false;
          ctxA.beginPath();
          for (var mLat = -80; mLat <= 80; mLat += 12) {
            var mp = project3DA(mLat * DEG, lonRad, RA);
            if (mp.z >= 0) {
              if (!mStarted) { ctxA.moveTo(mp.x, mp.y); mStarted = true; }
              else ctxA.lineTo(mp.x, mp.y);
            } else {
              mStarted = false;
            }
          }
          ctxA.stroke();
        }

        // Crisp 3D-projected continents with smooth circular horizon-limb wrapping (zero chord/texture artifacts)
        ctxA.fillStyle = landGradA;
        ctxA.strokeStyle = "rgba(1, 90, 156, 0.38)";
        ctxA.lineWidth = 0.7;
        ctxA.lineJoin = "round";

        function pushLimbArc(arr, x0, y0, x1, y1) {
          var a0 = Math.atan2(y0, x0);
          var a1 = Math.atan2(y1, x1);
          var da = a1 - a0;
          if (da > Math.PI) da -= Math.PI * 2;
          else if (da < -Math.PI) da += Math.PI * 2;
          var steps = Math.max(1, Math.ceil(Math.abs(da) / 0.12));
          for (var s = 1; s <= steps; s++) {
            var ang = a0 + (da * s) / steps;
            arr.push([cxA + Math.cos(ang) * RA, cyA + Math.sin(ang) * RA]);
          }
        }

        for (var rIdx = 0; rIdx < continentRings3D.length; rIdx++) {
          var ring = continentRings3D[rIdx];
          var n = ring.length;
          if (n < 3) continue;
          var proj = new Array(n);
          var anyFront = false;
          for (var vIdx = 0; vIdx < n; vIdx++) {
            var v = ring[vIdx];
            var x1 = v.bx * cosY + v.bz * sinY;
            var z1 = v.bz * cosY - v.bx * sinY;
            var y2 = v.by * cosTiltA - z1 * sinTiltA;
            var z2 = v.by * sinTiltA + z1 * cosTiltA;
            if (z2 > 0) anyFront = true;
            proj[vIdx] = { x: x1, y: y2, z: z2 };
          }
          if (!anyFront) continue;

          // Trace front-hemisphere vertices and wrap back-hemisphere segments cleanly along the outer horizon rim
          var clipped = [];
          var lastLimb = null;
          for (var i = 0; i < n; i++) {
            var curr = proj[i];
            var next = proj[(i + 1) % n];
            if (curr.z >= 0) {
              clipped.push([cxA + curr.x * RA, cyA + curr.y * RA]);
              lastLimb = null;
            } else {
              var cLen = Math.hypot(curr.x, curr.y);
              if (cLen > 0.05) {
                var lx = curr.x / cLen;
                var ly = curr.y / cLen;
                if (lastLimb) {
                  pushLimbArc(clipped, lastLimb[0], lastLimb[1], lx, ly);
                } else {
                  clipped.push([cxA + lx * RA, cyA + ly * RA]);
                }
                lastLimb = [lx, ly];
              }
            }
            if ((curr.z >= 0 && next.z < 0) || (curr.z < 0 && next.z >= 0)) {
              var tEdge = curr.z / (curr.z - next.z);
              var ix = curr.x + (next.x - curr.x) * tEdge;
              var iy = curr.y + (next.y - curr.y) * tEdge;
              var iLen = Math.hypot(ix, iy) || 1;
              var nx = ix / iLen;
              var ny = iy / iLen;
              if (lastLimb) {
                pushLimbArc(clipped, lastLimb[0], lastLimb[1], nx, ny);
              } else {
                clipped.push([cxA + nx * RA, cyA + ny * RA]);
              }
              lastLimb = next.z < 0 ? [nx, ny] : null;
            }
          }
          if (clipped.length < 3) continue;
          ctxA.beginPath();
          ctxA.moveTo(clipped[0][0], clipped[0][1]);
          for (var pIdx = 1; pIdx < clipped.length; pIdx++) {
            ctxA.lineTo(clipped[pIdx][0], clipped[pIdx][1]);
          }
          ctxA.closePath();
          ctxA.fill();
          ctxA.stroke();
        }

        // Subtle inner-rim 3D shading for realistic glass-sphere depth
        ctxA.fillStyle = rimShadeGradA;
        ctxA.beginPath();
        ctxA.arc(cxA, cyA, RA, 0, Math.PI * 2);
        ctxA.fill();
        ctxA.restore();

        // Crisp outer sphere border
        ctxA.strokeStyle = "rgba(1, 112, 186, 0.30)";
        ctxA.lineWidth = 1.25;
        ctxA.beginPath();
        ctxA.arc(cxA, cyA, RA, 0, Math.PI * 2);
        ctxA.stroke();

        // Draw all 18 3D SLERP global connection arcs (front-hemisphere segments always smoothly visible!)
        ctxA.lineCap = "round";
        for (var aIdx = 0; aIdx < precomputedArcsA.length; aIdx++) {
          var arc = precomputedArcsA[aIdx];
          var arcPts = arc.pts;
          var segStarted = false;
          ctxA.beginPath();
          for (var s = 0; s < arcPts.length; s++) {
            var sp = projectVec3A(arcPts[s].bx, arcPts[s].by, arcPts[s].bz, sinY, cosY);
            if (sp.z > -0.06) {
              if (!segStarted) { ctxA.moveTo(sp.x, sp.y); segStarted = true; }
              else ctxA.lineTo(sp.x, sp.y);
            } else {
              segStarted = false;
            }
          }
          ctxA.strokeStyle = arc.isHq ? "rgba(1, 112, 186, 0.62)" : "rgba(25, 152, 220, 0.44)";
          ctxA.lineWidth = arc.isHq ? 1.3 : 1.0;
          ctxA.stroke();

          // Travelling glowing data packet with smooth sub-frame linear interpolation
          var pktT = (arcPacketPhase + arc.phaseOffset) % 1;
          var exactIdx = pktT * (arcPts.length - 1);
          var idx0 = Math.min(arcPts.length - 2, Math.floor(exactIdx));
          var frac = exactIdx - idx0;
          var p0 = arcPts[idx0];
          var p1 = arcPts[idx0 + 1];
          var pktPt = projectVec3A(
            p0.bx + (p1.bx - p0.bx) * frac,
            p0.by + (p1.by - p0.by) * frac,
            p0.bz + (p1.bz - p0.bz) * frac,
            sinY,
            cosY
          );
          if (pktPt.z > 0.05) {
            var pktAlpha = Math.min(1, pktPt.z * 2.5);
            ctxA.fillStyle = "rgba(56, 189, 248, " + (pktAlpha * 0.95).toFixed(2) + ")";
            ctxA.beginPath();
            ctxA.arc(pktPt.x, pktPt.y, arc.isHq ? 2.2 : 1.7, 0, Math.PI * 2);
            ctxA.fill();
          }
        }

        // Draw all 14 connected location pins with smooth horizon depth fade
        for (var h = 0; h < hubsA.length; h++) {
          var hub = hubsA[h];
          var hp = projectVec3A(hub.bx, hub.by, hub.bz, sinY, cosY);
          if (hp.z <= 0.02) continue;
          var alpha = Math.min(1, hp.z * 3.0);
          if (hub.main) {
            // Pulsing Ahmedabad HQ beacon
            var pulseR = 5.5 + Math.sin(arcPacketPhase * Math.PI * 4) * 2.2;
            ctxA.fillStyle = "rgba(25, 152, 220, " + (0.28 * alpha).toFixed(2) + ")";
            ctxA.beginPath();
            ctxA.arc(hp.x, hp.y, pulseR, 0, Math.PI * 2);
            ctxA.fill();

            ctxA.fillStyle = "rgba(255, 255, 255, " + alpha.toFixed(2) + ")";
            ctxA.beginPath();
            ctxA.arc(hp.x, hp.y, 4.2, 0, Math.PI * 2);
            ctxA.fill();

            ctxA.fillStyle = "rgba(1, 112, 186, " + alpha.toFixed(2) + ")";
            ctxA.beginPath();
            ctxA.arc(hp.x, hp.y, 2.6, 0, Math.PI * 2);
            ctxA.fill();
          } else {
            ctxA.fillStyle = "rgba(255, 255, 255, " + (0.9 * alpha).toFixed(2) + ")";
            ctxA.beginPath();
            ctxA.arc(hp.x, hp.y, 3.0, 0, Math.PI * 2);
            ctxA.fill();

            ctxA.fillStyle = "rgba(25, 152, 220, " + alpha.toFixed(2) + ")";
            ctxA.beginPath();
            ctxA.arc(hp.x, hp.y, 2.0, 0, Math.PI * 2);
            ctxA.fill();
          }
        }
      }

      // --- Visual B: #cx-bento-lat-globe-canvas (99.9% Uptime SLA — Live System Telemetry & Node Network) ---
      var canvasB = document.getElementById("cx-bento-lat-globe-canvas");
      var ctxB = canvasB ? canvasB.getContext("2d") : null;
      var wB = 360;
      var hB = 270;
      var phaseB = 0;

      if (canvasB && ctxB) {
        canvasB.width = wB * dpr;
        canvasB.height = hB * dpr;
        ctxB.scale(dpr, dpr);
      }

      var nodesB = [
        { x: 112, y: 174, r: 5.5, phase: 0.0 },
        { x: 178, y: 122, r: 6.5, phase: 1.1 },
        { x: 244, y: 158, r: 6.0, phase: 2.2 },
        { x: 306, y: 116, r: 7.0, phase: 3.3 },
        { x: 214, y: 214, r: 5.0, phase: 4.4 },
        { x: 294, y: 204, r: 5.5, phase: 5.1 }
      ];
      var edgesB = [
        [0, 1], [1, 2], [2, 3], [1, 4], [4, 2], [2, 5], [3, 5]
      ];

      function drawGlobeB() {
        if (!ctxB) return;
        ctxB.clearRect(0, 0, wB, hB);
        if (!prefersReduced) {
          phaseB += 0.011; // Calm, smooth slower speed
        }

        // Subtle concentric SLA radar rings in bottom-right corner
        var cxR = 296, cyR = 224;
        for (var rIdx = 1; rIdx <= 4; rIdx++) {
          var rad = 46 * rIdx + Math.sin(phaseB * 0.8 + rIdx) * 3;
          ctxB.beginPath();
          ctxB.arc(cxR, cyR, rad, Math.PI * 0.92, Math.PI * 1.98);
          ctxB.strokeStyle = "rgba(1, 112, 186, " + (0.14 - rIdx * 0.025).toFixed(3) + ")";
          ctxB.lineWidth = 1;
          ctxB.stroke();
        }

        // Smooth dual-sine live uptime telemetry waveform
        for (var wIdx = 0; wIdx < 2; wIdx++) {
          ctxB.beginPath();
          for (var x = 76; x <= wB; x += 4) {
            var norm = (x - 76) / (wB - 76);
            var amp = (wIdx === 0 ? 14 : 9) * (0.4 + 0.6 * Math.sin(norm * Math.PI));
            var y =
              (wIdx === 0 ? 186 : 196) +
              Math.sin(norm * 6.5 - phaseB * (wIdx === 0 ? 1.1 : 0.75) + wIdx) * amp +
              Math.cos(norm * 3.2 + phaseB * 0.5) * 4;
            if (x === 76) ctxB.moveTo(x, y);
            else ctxB.lineTo(x, y);
          }
          ctxB.strokeStyle = wIdx === 0 ? "rgba(25, 152, 220, 0.36)" : "rgba(1, 112, 186, 0.16)";
          ctxB.lineWidth = wIdx === 0 ? 1.8 : 1.2;
          ctxB.stroke();
        }

        // Connected CodnestX system architecture edges + calm gliding signal packets
        for (var eIdx = 0; eIdx < edgesB.length; eIdx++) {
          var a = nodesB[edgesB[eIdx][0]];
          var b = nodesB[edgesB[eIdx][1]];
          ctxB.beginPath();
          ctxB.moveTo(a.x, a.y);
          ctxB.lineTo(b.x, b.y);
          ctxB.strokeStyle = "rgba(1, 112, 186, 0.22)";
          ctxB.lineWidth = 1.2;
          ctxB.stroke();

          var t = (phaseB * 0.26 + eIdx * 0.19) % 1;
          var px = a.x + (b.x - a.x) * t;
          var py = a.y + (b.y - a.y) * t;
          ctxB.beginPath();
          ctxB.arc(px, py, 2.3, 0, Math.PI * 2);
          ctxB.fillStyle = "rgba(25, 152, 220, 0.88)";
          ctxB.fill();
        }

        // System nodes with calm breathing halos
        for (var nIdx = 0; nIdx < nodesB.length; nIdx++) {
          var nd = nodesB[nIdx];
          var pulse = 0.5 + 0.5 * Math.sin(phaseB * 1.4 + nd.phase);
          ctxB.beginPath();
          ctxB.arc(nd.x, nd.y, nd.r + 5 + pulse * 4, 0, Math.PI * 2);
          ctxB.fillStyle = "rgba(25, 152, 220, " + (0.06 + pulse * 0.08).toFixed(3) + ")";
          ctxB.fill();

          ctxB.beginPath();
          ctxB.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
          ctxB.fillStyle = "#FFFFFF";
          ctxB.fill();
          ctxB.lineWidth = 1.8;
          ctxB.strokeStyle = nIdx === 3 ? "#0170BA" : "#1998DC";
          ctxB.stroke();

          ctxB.beginPath();
          ctxB.arc(nd.x, nd.y, 2.2, 0, Math.PI * 2);
          ctxB.fillStyle = "#0170BA";
          ctxB.fill();
        }
      }

      drawGlobeA();
      drawGlobeB();
      if (prefersReduced) return;

      // Default visible so globes spin immediately and never stall in iframes/Canvas
      var globeAVisible = true;
      var globeBVisible = true;
      if ('IntersectionObserver' in window) {
        var globeObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.target === canvasA) globeAVisible = entry.isIntersecting;
            if (entry.target === canvasB) globeBVisible = entry.isIntersecting;
          });
        }, { rootMargin: "350px 0px" });
        if (canvasA) globeObserver.observe(canvasA);
        if (canvasB) globeObserver.observe(canvasB);
      }
// Medium-fast spin speed: ~5.2s per full revolution (1.21 rad/sec)
      var MEDIUM_FAST_SPEED_A = (Math.PI * 2) / 5.5;
      var MEDIUM_FAST_SPEED_B = (Math.PI * 2) / 4.6;

      function tickGlobes(dtSec) {
        if ((!globeAVisible && !globeBVisible) || document.hidden) return;
        var clampedDt = Math.min(dtSec, 0.05);
        rotYA = (rotYA + MEDIUM_FAST_SPEED_A * clampedDt) % (Math.PI * 2);
        arcPacketPhase = (arcPacketPhase + clampedDt * 0.34) % 1;
        if (globeAVisible) drawGlobeA();
        if (globeBVisible) drawGlobeB();
      }

      if (hasGSAP) {
        window.gsap.ticker.add(function (time, deltaTime) {
          var dt = Math.min(0.05, Math.max(0.004, (deltaTime || 16.67) / 1000));
          tickGlobes(dt);
        });
      } else {
        var lastT = performance.now();
        function rafGlobe(now) {
          var dt = Math.min(0.05, Math.max(0.004, (now - lastT) / 1000));
          lastT = now;
          tickGlobes(dt);
          requestAnimationFrame(rafGlobe);
        }
        requestAnimationFrame(rafGlobe);
      }
    })();

    // Section 6 (BeforeAfterSlider) is now rendered by React in src/components/BeforeAfterSlider.jsx

    // ==========================================================================
    // 7. PORTFOLIO FILTERING WITH GSAP FLIP & SLIDING TAB PILL
    // ==========================================================================
    (function initPortfolioFlip() {
      var filterBar = document.getElementById("cx-portfolio-tabs");
      var grid = document.getElementById("cx-portfolio-grid");
      var pill = document.getElementById("cx-filter-active-pill");
      if (!filterBar || !grid) return;
      var buttons = Array.from(filterBar.querySelectorAll(".cx-filter-btn"));
      var cards = Array.from(grid.querySelectorAll(".cx-client-card"));
      var status = document.querySelector(".cx-client-filter-status");
      function selectCategory(btn) {
        var filter = btn.getAttribute("data-cx-filter") || "all";
        var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        buttons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", String(active));
          b.tabIndex = active ? 0 : -1;
        });
        if (pill) btn.insertBefore(pill, btn.firstChild);
        if (hasGSAP) window.gsap.killTweensOf(cards);
        var visible = cards.filter(function (card) {
          return filter === "all" || card.getAttribute("data-category") === filter;
        });
        cards.forEach(function (card) {
          card.hidden = visible.indexOf(card) === -1;
          card.style.display = "";
          card.style.opacity = "1";
          card.style.removeProperty("transform");
        });
        if (hasGSAP && !reduced) window.gsap.fromTo(visible,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.025, ease: "power2.out", clearProps: "opacity,transform" });
        if (status) status.textContent = filter === "all" ? "Showing " + visible.length + " featured projects" : "Showing " + visible.length + " " + btn.textContent.trim() + " projects";
        if (hasST) window.ScrollTrigger.refresh();
      }
      buttons.forEach(function (btn, index) {
        btn.tabIndex = index === 0 ? 0 : -1;
        btn.addEventListener("click", function () { selectCategory(btn); });
        btn.addEventListener("keydown", function (event) {
          var next;
          if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
          else if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = buttons.length - 1;
          else return;
          event.preventDefault(); buttons[next].focus(); selectCategory(buttons[next]);
        });
      });
    })();

    // Section 8 (BuildStage) is now rendered by React in src/components/BuildStage.jsx

    // ==========================================================================
    // 9. TESTIMONIALS CAROUSEL & UNIFIED CONTROLS
    // ==========================================================================
    (function initTestimonialsCarousel() {
      var stage = document.getElementById("cx-testi-stage");
      if (!stage) return;
      var slides = Array.from(stage.querySelectorAll(".cx-testi-slide"));
      var prevBtn = document.getElementById("cx-testi-prev") || document.querySelector('button[aria-label="Navigate to previous testimonial"]');
      var nextBtn = document.getElementById("cx-testi-next") || document.querySelector('button[aria-label="Navigate to next testimonial"]');
      var counterNum = document.getElementById("cx-testi-current-num");
      var activeT = 0;

      function switchTestimonial(nextIdx, dir) {
        if (!slides.length) return;
        var outgoing = slides[activeT];
        activeT = (nextIdx + slides.length) % slides.length;
        if (outgoing === slides[activeT]) return;
        var incoming = slides[activeT];

        if (counterNum) {
          counterNum.textContent = "0" + (activeT + 1);
        }

        if (hasGSAP && !prefersReduced) {
          var g = window.gsap;
          g.to(outgoing, {
            opacity: 0,
            x: -dir * 20,
            duration: 0.34,
            ease: TOKENS.easeOut,
            onComplete: function () {
              outgoing.classList.remove("is-active");
            }
          });
          incoming.classList.add("is-active");
          g.fromTo(
            incoming,
            { opacity: 0, x: dir * 20 },
            { opacity: 1, x: 0, duration: 0.44, delay: 0.06, ease: TOKENS.easeOut, clearProps: "transform" }
          );
        } else {
          outgoing.classList.remove("is-active");
          incoming.classList.add("is-active");
        }
      }

      if (prevBtn) prevBtn.addEventListener("click", function () { switchTestimonial(activeT - 1, -1); });
      if (nextBtn) nextBtn.addEventListener("click", function () { switchTestimonial(activeT + 1, 1); });

      var startX = 0;
      stage.addEventListener("pointerdown", function (e) { startX = e.clientX; });
      stage.addEventListener("pointerup", function (e) {
        var dx = e.clientX - startX;
        if (dx < -40) switchTestimonial(activeT + 1, 1);
        else if (dx > 40) switchTestimonial(activeT - 1, -1);
      });
    })();

    // ==========================================================================
    // 10. INDUSTRIES & FAQ ACCORDIONS
    // ==========================================================================
    var indSec = document.getElementById("industries-section");
    if (indSec) {
      var indButtons = Array.from(indSec.querySelectorAll("button")).filter(function (btn) {
        var span = btn.querySelector("span");
        return span && (span.textContent.trim() === "+" || span.textContent.trim() === "-");
      });

      indButtons.forEach(function (btn) {
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
            if (hasGSAP && !prefersReduced) {
              window.gsap.fromTo(
                gridPanel.querySelectorAll("span"),
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.32, ease: TOKENS.easeOut, stagger: 0.025, clearProps: "transform,opacity" }
              );
            }
          }
        });
      });
    }

    var faqButtons = Array.from(document.querySelectorAll('button[aria-controls^="panel-"]'));
    faqButtons.forEach(function (btn) {
      var panelId = btn.getAttribute("aria-controls");
      var region = document.getElementById(panelId);
      if (!region) return;
      var wrapper = region.parentElement;
      wrapper.classList.add("da-faq-panel");
      var iconWrap = btn.querySelector("div.shrink-0");
      if (iconWrap) iconWrap.classList.add("da-faq-icon-wrap");
      if (btn.getAttribute("aria-expanded") === "true") {
        wrapper.classList.add("is-open");
      }

      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";

        faqButtons.forEach(function (otherBtn) {
          if (otherBtn !== btn && otherBtn.getAttribute("aria-expanded") === "true") {
            var otherId = otherBtn.getAttribute("aria-controls");
            var otherReg = document.getElementById(otherId);
            if (otherReg && otherReg.parentElement) {
              var ow = otherReg.parentElement;
              ow.style.height = ow.scrollHeight + "px";
              requestAnimationFrame(function () { ow.style.height = "0px"; });
              ow.classList.remove("is-open");
              otherBtn.setAttribute("aria-expanded", "false");
            }
          }
        });

        if (expanded) {
          wrapper.style.height = wrapper.scrollHeight + "px";
          requestAnimationFrame(function () {
            wrapper.style.height = "0px";
          });
          wrapper.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        } else {
          wrapper.style.height = region.scrollHeight + "px";
          wrapper.classList.add("is-open");
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

    // ==========================================================================
    // 11. SYSTEM FLOW MODAL
    // ==========================================================================
    var modalEl = document.getElementById("cx-system-modal");
    var modalBox = document.getElementById("cx-modal-box");
    var modalTitle = document.getElementById("cx-modal-title");
    var modalBadge = document.getElementById("cx-modal-badge");
    var modalDesc = document.getElementById("cx-modal-desc");
    var modalMetrics = document.getElementById("cx-modal-metrics");
    var modalModules = document.getElementById("cx-modal-modules");
    var modalClose = document.getElementById("cx-modal-close");
    var modalCancel = document.getElementById("cx-modal-cancel");
    var modalCta = document.getElementById("cx-modal-cta");
    var lastFocusedEl = null;

    function openSystemModal(key) {
      var info = SYSTEM_FLOW_DETAILS[key] || SYSTEM_FLOW_DETAILS.crm;
      if (!modalEl || !modalBox) return;
      lastFocusedEl = document.activeElement;
      modalOpen = true;
      if (lenis && typeof lenis.stop === "function") lenis.stop();

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
        return '<span class="cx-modal-mod-pill">' + mod + '</span>';
      }).join("");

      modalEl.classList.add("is-open");
      modalEl.setAttribute("aria-hidden", "false");

      if (hasGSAP && !prefersReduced) {
        var g = window.gsap;
        var staggerTargets = modalBox.querySelectorAll("[data-modal-stagger]");
        g.to(modalEl, { opacity: 1, duration: 0.32, ease: TOKENS.easeOut });
        g.fromTo(
          modalBox,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: TOKENS.dur.modal, ease: TOKENS.easeOut }
        );
        g.fromTo(
          staggerTargets,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.38, delay: 0.06, ease: TOKENS.easeOut, stagger: 0.04, clearProps: "transform,opacity" }
        );
      } else {
        modalEl.style.opacity = "1";
        modalBox.style.opacity = "1";
        modalBox.style.transform = "scale(1)";
      }

      setTimeout(function () {
        if (modalClose) modalClose.focus();
      }, 50);
    }

    function closeSystemModal() {
      if (!modalEl || !modalBox || !modalOpen) return;
      modalOpen = false;
      modalEl.setAttribute("aria-hidden", "true");

      if (hasGSAP && !prefersReduced) {
        var g = window.gsap;
        g.to(modalBox, { opacity: 0, scale: 0.96, duration: 0.25, ease: TOKENS.easeInOut });
        g.to(modalEl, {
          opacity: 0,
          duration: 0.28,
          ease: TOKENS.easeInOut,
          onComplete: function () {
            modalEl.classList.remove("is-open");
            if (lenis && !mobileMenuOpen && typeof lenis.start === "function") lenis.start();
            if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
          }
        });
      } else {
        modalEl.style.opacity = "0";
        modalEl.classList.remove("is-open");
        if (lenis && !mobileMenuOpen && typeof lenis.start === "function") lenis.start();
        if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
      }
    }

    document.querySelectorAll(".codnestx-flow-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var key = btn.getAttribute("data-system-flow") || "crm";
        openSystemModal(key);
      });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          var key = btn.getAttribute("data-system-flow") || "crm";
          openSystemModal(key);
        }
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

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (modalOpen) closeSystemModal();
        if (mobileMenuOpen) toggleMobileMenu(false);
      }
      if (e.key === "Tab" && modalOpen && modalBox) {
        var focusables = Array.from(modalBox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // ==========================================================================
    // 12. CONTACT FORM VALIDATION & SUCCESS FEEDBACK
    // ==========================================================================
    var auditForm = document.getElementById("codnestx-audit-form");
    var feedbackEl = document.getElementById("cx-form-feedback");
    if (auditForm) {
      var inputs = Array.from(auditForm.querySelectorAll(".cx-fl-input[required]"));
      inputs.forEach(function (inp) {
        inp.addEventListener("input", function () {
          if (inp.value.trim()) {
            inp.closest(".cx-form-field").classList.remove("has-error");
          }
        });
      });

      auditForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var valid = true;
        inputs.forEach(function (inp) {
          var fieldWrap = inp.closest(".cx-form-field");
          var val = inp.value.trim();
          var isEmail = inp.type === "email";
          if (!val || (isEmail && val.indexOf("@") === -1)) {
            if (fieldWrap) fieldWrap.classList.add("has-error");
            valid = false;
          } else if (fieldWrap) {
            fieldWrap.classList.remove("has-error");
          }
        });

        if (!valid) return;

        if (feedbackEl) {
          feedbackEl.textContent = "Process Audit request received. Our engineering team at hello@codnestx.com will review your workflow and reply within 24 business hours.";
          feedbackEl.className = "cx-form-feedback is-success";
        }
        auditForm.reset();
      });
    }

    // ==========================================================================
    // 13. ROTATING HEADLINES & VIEWPORT-PAUSED LOTTIE CENTERPIECE
    // ==========================================================================
    var rotatingHeadlines = Array.from(document.querySelectorAll("h2.cx-rot-headline"));
    if (rotatingHeadlines.length > 1) {
      var activeRot = 0;
      rotatingHeadlines.forEach(function (el, idx) {
        if (idx === 0) {
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

      if (!prefersReduced) {
        setInterval(function () {
          var prev = activeRot;
          activeRot = (activeRot + 1) % rotatingHeadlines.length;
          var outEl = rotatingHeadlines[prev];
          var inEl = rotatingHeadlines[activeRot];

          inEl.style.transition = "none";
          inEl.style.opacity = "0";
          inEl.style.transform = "translateY(100%)";
          inEl.style.zIndex = "2";
          void inEl.offsetWidth;

          outEl.style.transition = "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
          inEl.style.transition = "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)";

          outEl.style.opacity = "0";
          outEl.style.transform = "translateY(-100%)";
          outEl.style.zIndex = "1";

          inEl.style.opacity = "1";
          inEl.style.transform = "translateY(0px)";
        }, 3200);
      }
    }

    function safeInvertMatrix(m) {
      if (!m) return null;
      var det = m.a * m.d - m.b * m.c;
      if (!det || !isFinite(det) || Math.abs(det) < 1e-7) return null;
      try { return m.inverse(); } catch (e) { return null; }
    }
    function safeGetBBox(el) {
      try { return el && typeof el.getBBox === "function" ? el.getBBox() : null; } catch (e) { return null; }
    }
    function safeGetCTM(el) {
      try { return el && typeof el.getCTM === "function" ? el.getCTM() : null; } catch (e) { return null; }
    }
    // Align the visual icon layers without moving their separately rendered text layers.
    function alignWorkflowOrbit(svg) {
      try {
        var orbit = svg && svg._cxWorkflowOrbit;
        var rootCTM = safeGetCTM(svg);
        var rootInverse = safeInvertMatrix(rootCTM);
        if (!orbit || !rootInverse) return;
        var ns = "http://www.w3.org/2000/svg";
        var orbitIcons = svg._cxOrbitIcons || (svg._cxOrbitIcons = Array.prototype.slice.call(svg.querySelectorAll(".cx-workflow-orbit-icon")));
        orbitIcons.forEach(function (icon) {
          try {
            if (!icon._cxOrbitCenter) {
              var box = safeGetBBox(icon);
              if (!box || !box.width || !box.height) return;
              icon._cxOrbitCenter = new DOMPoint(box.x + box.width / 2, box.y + box.height / 2);
            }
            var wrapper = icon.parentElement;
            if (!wrapper) return;
            if (!wrapper.classList.contains("cx-workflow-icon-orbit-position")) {
              wrapper = document.createElementNS(ns, "g");
              wrapper.setAttribute("class", "cx-workflow-icon-orbit-position");
              icon.parentElement.insertBefore(wrapper, icon);
              wrapper.appendChild(icon);
            }
            var pCTM = safeGetCTM(wrapper.parentElement);
            if (!pCTM) return;
            var parentMatrix = rootInverse.multiply(pCTM);
            var parentInverse = safeInvertMatrix(parentMatrix);
            if (!parentInverse) return;
            var transform = icon.transform && icon.transform.baseVal ? icon.transform.baseVal.consolidate() : null;
            var localCenter = icon._cxOrbitCenter.matrixTransform(transform ? transform.matrix : new DOMMatrix());
            var originalCenter = localCenter.matrixTransform(parentMatrix);
            var dx = originalCenter.x - orbit.reference.x, dy = originalCenter.y - orbit.reference.y;
            var distance = Math.hypot(dx, dy);
            if (!distance) return;
            var target = new DOMPoint(
              orbit.center.x + dx / distance * orbit.radius,
              orbit.center.y + dy / distance * orbit.radius
            ).matrixTransform(parentInverse);
            if (!isFinite(target.x) || !isFinite(target.y)) return;
            wrapper.setAttribute("transform", "translate(" + (target.x - localCenter.x).toFixed(5) + " " + (target.y - localCenter.y).toFixed(5) + ")");
          } catch (e) {}
        });
      } catch (e) {}
    }
    // Keep the authored text layout and transitions; use actual font text in its SVG.
    function applyWorkflowTextTheme(svg) {
      try {
      if (!svg) return;
      try {
      // Crop unused animation canvas space without changing any artwork coordinates.
      var desktopCanvas = svg.viewBox.baseVal.width === 1920;
      var croppedViewBox = desktopCanvas ? "0 140 1920 1120" : "0 60 1080 1860";
      if (svg.getAttribute("viewBox") !== croppedViewBox) svg.setAttribute("viewBox", croppedViewBox);
      svg.setAttribute("height", desktopCanvas ? "1120" : "1860");
      // Resize the background image only, so its animated child layers keep their positions.
      var globeImage = svg.querySelector("image[width='775px']");
      var ringImage = svg.querySelector("image[width='1433px'][height='1433px'], image[width='1151px'][height='1152px']");
      if (globeImage && ringImage && svg.getCTM() && globeImage.getCTM() && ringImage.parentElement.getCTM()) {
        var rootInverse = svg.getCTM().inverse();
        var globeMatrix = rootInverse.multiply(globeImage.getCTM());
        var ringParentMatrix = rootInverse.multiply(ringImage.parentElement.getCTM());
        var globeCenter = new DOMPoint(387.5, 382.5).matrixTransform(globeMatrix);
        var localCenter = globeCenter.matrixTransform(ringParentMatrix.inverse());
        var ringWidth = parseFloat(ringImage.getAttribute("width"));
        var ringHeight = parseFloat(ringImage.getAttribute("height"));
        var diameter = 775 * Math.hypot(globeMatrix.a, globeMatrix.b) * 1.25;
        var ringScale = diameter / (ringWidth * Math.hypot(ringParentMatrix.a, ringParentMatrix.b));
        var ringTransform = "matrix(" + [ringScale, 0, 0, ringScale, localCenter.x - ringWidth * ringScale / 2, localCenter.y - ringHeight * ringScale / 2].map(function (value) { return value.toFixed(5); }).join(" ") + ")";
        if (ringImage.getAttribute("transform") !== ringTransform) ringImage.setAttribute("transform", ringTransform);
        if (svg.viewBox.baseVal.width === 1920) {
          svg._cxWorkflowOrbit = {
            center: globeCenter,
            radius: diameter / 2,
            reference: new DOMPoint(ringWidth / 2, ringHeight / 2).matrixTransform(ringParentMatrix)
          };
          alignWorkflowOrbit(svg);
        }
      }
      var gradientId = svg.dataset.workflowGradient;
      if (!gradientId) {
        gradientId = "cx-workflow-text-gradient-" + Math.random().toString(36).slice(2, 10);
        svg.dataset.workflowGradient = gradientId;
      }
      svg.querySelectorAll("g[aria-label]").forEach(function (group) {
        if (group.dataset.nativeText || !group.querySelector("text")) return;
        var size = parseFloat(group.getAttribute("font-size")) || 24;
        var box = safeGetBBox(group);
        if (!box) return;
        var isHeading = group.classList.contains("cx-workflow-native-heading") || size >= 52;
        var scaledSize = isHeading ? Math.round(size * 1.18) : (size >= 26 ? Math.round(size * 1.16) : Math.round(size * 1.12));
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", String(box.x)); text.setAttribute("y", "0");
        text.setAttribute("font-family", isHeading ? "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" : "'Inter', -apple-system, BlinkMacSystemFont, sans-serif");
        text.setAttribute("font-size", String(scaledSize));
        text.setAttribute("font-weight", isHeading ? "700" : "600");
        text.setAttribute("letter-spacing", isHeading ? "-0.025em" : "-0.01em");
        group.getAttribute("aria-label").trim().split(/[\r\n]+/).forEach(function (line, index) {
          var span = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          span.setAttribute("x", String(box.x));
          if (index) span.setAttribute("dy", String(size === 28 ? 38 : size * 1.2));
          span.textContent = line.trim(); text.appendChild(span);
        });
        group.dataset.nativeText = "true"; group.replaceChildren(text);
      });
      var defs = svg.querySelector("defs");
      if (!defs) { defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"); svg.prepend(defs); }
      if (!defs.querySelector("#" + gradientId)) {
        var gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        gradient.id = gradientId; gradient.setAttribute("x1", "0%"); gradient.setAttribute("x2", "100%");
        [["0%", "#073B73"], ["100%", "#1A92DC"]].forEach(function (stopInfo) {
          var stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
          stop.setAttribute("offset", stopInfo[0]); stop.setAttribute("stop-color", stopInfo[1]); gradient.appendChild(stop);
        }); defs.appendChild(gradient);
      }
      svg.querySelectorAll(".cx-workflow-native-heading text, .cx-workflow-native-heading tspan, text.cx-workflow-native-heading").forEach(function (text) {
        var fill = "url(#" + gradientId + ")";
        if (text.getAttribute("fill") !== fill) text.setAttribute("fill", fill);
      });
      } catch (e) {}
    
      } catch (e) {}
    }
    function prepareFrozenWorkflow(svg) {
      try {
      if (!svg || svg.dataset.nativeWorkflow) return;
      try {
      svg.dataset.nativeWorkflow = "true";
      var ns = "http://www.w3.org/2000/svg";
      svg.querySelectorAll("g[aria-label]").forEach(function (group) {
        var value = group.getAttribute("aria-label");
        var size = parseFloat(group.getAttribute("font-size")) || 24;
        var box = safeGetBBox(group);
        if (!box) return;
        var text = document.createElementNS(ns, "text");
        text.setAttribute("font-family", "Inter, sans-serif"); text.setAttribute("font-size", String(size));
        text.setAttribute("font-weight", "500"); text.setAttribute("x", String(box.x)); text.setAttribute("y", "0");
        var color = group.getAttribute("fill");
        text.setAttribute("fill", color === "rgb(255,255,255)" ? "#FFFFFF" : "#1E293B");
        value.trim().split(/[\r\n]+/).forEach(function (line, index) {
          var span = document.createElementNS(ns, "tspan"); span.setAttribute("x", String(box.x));
          if (index) span.setAttribute("dy", String(size === 28 ? 38 : size * 1.2));
          span.textContent = line.trim(); text.appendChild(span);
        }); group.replaceChildren(text);
      });
      var titles = { "1140": "Idea to Impact", "1448": "Design & UX Strategy", "1258": "MVP Development", "1499": "GTM & Market Scaling", "1433": "Product Maintenance" };
      svg.querySelectorAll("image[height='176px']").forEach(function (image) {
        if (image.closest("defs")) return;
        var width = image.getAttribute("width").replace("px", "");
        if (!titles[width]) return;
        var text = document.createElementNS(ns, "text"); text.setAttribute("class", "cx-workflow-native-heading");
        text.setAttribute("x", "24"); text.setAttribute("y", "134"); text.setAttribute("font-size", "128");
        text.setAttribute("font-family", "Plus Jakarta Sans, sans-serif"); text.setAttribute("font-weight", "600");
        text.textContent = titles[width]; image.replaceWith(text);
      });
      var globe = svg.querySelector("image[width='775px']");
      if (globe) {
        var globeLayer = globe.parentElement, parent = globeLayer.parentElement;
        var pCtm = safeGetCTM(parent), gCtm = safeGetCTM(globe);
        if (pCtm && gCtm) {
        var matrix = pCtm.inverse().multiply(gCtm);
        var center = new DOMPoint(387.5, 382.5).matrixTransform(matrix);
        var wrap = document.createElementNS(ns, "g"); wrap.setAttribute("class", "cx-workflow-scaled-globe");
        var globeScale = 800 / (775 * Math.hypot(matrix.a, matrix.b));
        wrap.setAttribute("transform", "matrix(" + globeScale + " 0 0 " + globeScale + " " + (-center.x * globeScale) + " " + (center.y * (1 - globeScale)) + ")");
        parent.insertBefore(wrap, globeLayer); wrap.appendChild(globeLayer);
        }
      }
      var artRoot = svg.querySelector("g[clip-path]");
      if (artRoot) Array.from(artRoot.children).forEach(function (layer) {
        if (layer.tagName !== "g" || layer.querySelector("[aria-label], image")) return;
        var box = safeGetBBox(layer);
        if (box && box.width > 0 && box.width < 300 && box.height > 0 && box.height < 300) layer.classList.add("cx-workflow-orbit-icon");
      });
      applyWorkflowTextTheme(svg);
      } catch (e) {}
    
      } catch (e) {}
    }

    var lottieWrapper = document.querySelector(".cx-lottie-stage");
    if (lottieWrapper) {
      var lottieInner = lottieWrapper.firstElementChild;
      var frozenSvg = lottieInner ? lottieInner.querySelector("svg") : null;
      if (lottieInner && frozenSvg) {
        var __cxBase = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : ((typeof window !== "undefined" && window.__CX_BASE_URL) ? window.__CX_BASE_URL : "/");
        var DESKTOP_JSON = __cxBase + "animations/workflow-desktop.json";
        var MOBILE_JSON = __cxBase + "animations/workflow-mobile.json";
        var currentMode = null;
        var currentAnim = null;
        var mountEl = null;
        var isLottieInView = true;

        // Extract our 7 CodnestX Blue recolored base64 assets directly from frozenSvg
        var allFrozenImgs = Array.from(frozenSvg.querySelectorAll("image"));
        var themedByDim = {};
        allFrozenImgs.forEach(function (im) {
          var w = (im.getAttribute("width") || "").replace("px", "").trim();
          var h = (im.getAttribute("height") || "").replace("px", "").trim();
          var href = im.getAttribute("xlink:href") || im.getAttribute("href") || "";
          if (w && h && href) {
            themedByDim[w + "x" + h] = href;
          }
        });
        var dimOrder = ["775x765", "1433x1433", "1433x176", "1499x176", "1258x176", "1448x176", "1140x176"];
        var themedDefsImgs = dimOrder.map(function (k) { return themedByDim[k] || ""; });
        // Also map known dimensions of the 7 assets explicitly
        function matchThemedAsset(w, h, idx) {
          var key = w + "x" + h;
          if (themedByDim[key]) return themedByDim[key];
          var wn = parseInt(w, 10) || 0;
          var hn = parseInt(h, 10) || 0;
          if (wn > 0 && hn > 0 && Math.abs(wn - hn) < 40) {
            return wn < 960 ? themedByDim["775x765"] : themedByDim["1433x1433"];
          }
          return themedDefsImgs[idx] || null;
        }

        prepareFrozenWorkflow(frozenSvg);

        // Animate frozenSvg 3D orb while frozenSvg is visible (offline / pre-load fallback)
        var frozenOrbImg = frozenSvg.querySelector('image[width="775px"]');
        var frozenOrbAngle = 0;
        if (frozenOrbImg && hasGSAP && !prefersReduced) {
          window.gsap.ticker.add(function (time, deltaTime) {
            if (!isLottieInView || document.hidden || frozenSvg.style.display === "none") return;
            var dt = Math.min(0.05, (deltaTime || 16.67) / 1000);
            frozenOrbAngle = (frozenOrbAngle + 28 * dt) % 360;
            frozenOrbImg.setAttribute("transform", "rotate(" + frozenOrbAngle.toFixed(2) + " 387.5 382.5)");
          });
        }

        // Helper: remap [r, g, b] in 0..1 float space from DianApps purple/indigo/orange to CodnestX Blue
        function remapUnitRgb(r, g, b) {
          // Leave white and near-black text untouched
          if (r > 0.95 && g > 0.95 && b > 0.95) return [r, g, b];
          if (r < 0.16 && g < 0.16 && b < 0.24) return [r, g, b];
          // Light lavender / periwinkle background & bars (#eef2ff, #e0e7ff) -> CodnestX Ice Blue (#E9F5FC)
          if (r > 0.80 && g > 0.80 && b > 0.90) {
            return [0.914, 0.961, 0.988];
          }
          // Medium lavender / soft purple stroke or circle -> CodnestX Sky Blue (#1998DC)
          if (b > 0.65 && r > 0.34 && (b - g) > 0.05) {
            return [0.098, 0.596, 0.863];
          }
          // Royal purple/indigo (#3b52b5, #3f59b8) or warm orange/coral -> CodnestX Deep Blue (#0170BA)
          if ((b > 0.42 && r > 0.12 && g < 0.52) || (r > 0.50 && b < 0.62)) {
            return [0.004, 0.439, 0.729];
          }
          return [r, g, b];
        }

        function rethemeColorArray(arr) {
          if (!Array.isArray(arr) || arr.length < 3) return;
          if (typeof arr[0] === "number" && typeof arr[1] === "number" && typeof arr[2] === "number") {
            if (arr[0] <= 1.01 && arr[1] <= 1.01 && arr[2] <= 1.01) {
              var mapped = remapUnitRgb(arr[0], arr[1], arr[2]);
              arr[0] = mapped[0];
              arr[1] = mapped[1];
              arr[2] = mapped[2];
            }
          }
        }

        function rethemeGradientArray(arr) {
          if (!Array.isArray(arr) || arr.length < 4) return;
          // Lottie gradient array has [offset, r, g, b, offset, r, g, b, ...] followed by optional opacity stops
          for (var i = 0; i + 3 < arr.length; i += 4) {
            var off = arr[i];
            var r = arr[i + 1];
            var g = arr[i + 2];
            var b = arr[i + 3];
            if (typeof off === "number" && off >= 0 && off <= 1 && r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
              var mapped = remapUnitRgb(r, g, b);
              arr[i + 1] = mapped[0];
              arr[i + 2] = mapped[1];
              arr[i + 3] = mapped[2];
            }
          }
        }

        function walkAndRethemeLottieData(node) {
          if (!node || typeof node !== "object") return;
          if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              walkAndRethemeLottieData(node[i]);
            }
            return;
          }
          // Replace solid layer hex color if any
          if (typeof node.sc === "string" && node.sc.charAt(0) === "#") {
            var hex = node.sc.toLowerCase();
            if (hex !== "#ffffff" && hex !== "#000000") {
              node.sc = "#0170BA";
            }
          }
          // Fill or Stroke shape
          if ((node.ty === "fl" || node.ty === "st") && node.c && node.c.k) {
            if (Array.isArray(node.c.k)) {
              if (typeof node.c.k[0] === "number") {
                rethemeColorArray(node.c.k);
              } else {
                node.c.k.forEach(function (kf) {
                  if (kf && kf.s) rethemeColorArray(kf.s);
                  if (kf && kf.e) rethemeColorArray(kf.e);
                });
              }
            }
          }
          // Gradient Fill or Gradient Stroke
          if ((node.ty === "gf" || node.ty === "gs") && node.g && node.g.k && node.g.k.k) {
            var gk = node.g.k.k;
            if (Array.isArray(gk)) {
              if (typeof gk[0] === "number") {
                rethemeGradientArray(gk);
              } else {
                gk.forEach(function (kf) {
                  if (kf && kf.s) rethemeGradientArray(kf.s);
                  if (kf && kf.e) rethemeGradientArray(kf.e);
                });
              }
            }
          }
          var keys = Object.keys(node);
          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            if (key !== "p" && typeof node[key] === "object") {
              walkAndRethemeLottieData(node[key]);
            }
          }
        }

        function rethemeLottieJson(animData) {
          if (!animData || typeof animData !== "object") return animData;
          /* Restored native Step 1-5 Lottie text & pill layers */
          if (Array.isArray(animData.assets)) {
            var imgIdx = 0;
            animData.assets.forEach(function (asset) {
              if (asset && typeof asset.p === "string") {
                var replacement = matchThemedAsset(asset.w, asset.h, imgIdx);
                if (replacement) {
                  asset.p = replacement;
                  asset.u = "";
                  asset.e = 1;
                }
                imgIdx++;
              }
            });
          }
          walkAndRethemeLottieData(animData.layers);
          walkAndRethemeLottieData(animData.assets);
          // Sync smaller orbiting orbs ("Null 1" + "icon 1..5") linearly to scroll scrub range (0..160deg)
          // Eliminates stepped hold/snap keyframes so smaller orbs glide smoothly with scrolling
          try {
            if (Array.isArray(animData.layers)) {
              var ip = typeof animData.ip === "number" ? animData.ip : 59;
              var op = typeof animData.op === "number" ? animData.op : 680;
              var totalF = Math.max(1, (op - ip) - 1);
              var isDesk = (animData.w || 1920) >= 1200;
              var tStart = ip + (isDesk ? Math.min(30, totalF * 0.08) : 0);
              var tEnd = ip + (isDesk ? Math.min(totalF, 596) : Math.min(totalF, 544));
              var tSpan = Math.max(1, tEnd - tStart);
              var linIn = { x: [1], y: [1] };
              var linOut = { x: [0], y: [0] };

              animData.layers.forEach(function (lay) {
                if (!lay || !lay.ks) return;
                if (lay.nm === "Null 1" && lay.ks.r) {
                  lay.ks.r = {
                    a: 1,
                    k: [
                      { i: linIn, o: linOut, t: 0, s: [0] },
                      { i: linIn, o: linOut, t: tStart, s: [0] },
                      { i: linIn, o: linOut, t: tEnd, s: [160] },
                      { t: op + 100, s: [160] }
                    ],
                    ix: 10
                  };
                }
                var mIcon = typeof lay.nm === "string" ? lay.nm.match(/^icon\s*([1-5])$/i) : null;
                if (mIcon && lay.ks.o) {
                  var idx = parseInt(mIcon[1], 10) - 1; // 0..4
                  var centerP = idx * 0.25; // 0, 0.25, 0.5, 0.75, 1.0
                  var tc = tStart + centerP * tSpan;
                  var step = 0.25 * tSpan;
                  var keys = [];
                  if (tc - 2 * step > 0) {
                    keys.push({ i: linIn, o: linOut, t: Math.max(0, tc - 2 * step), s: [0] });
                  }
                  if (idx > 0) {
                    keys.push({ i: linIn, o: linOut, t: Math.max(0, tc - step), s: [52] });
                  } else {
                    keys.push({ i: linIn, o: linOut, t: 0, s: [100] });
                  }
                  keys.push({ i: linIn, o: linOut, t: tc, s: [100] });
                  if (idx < 4) {
                    keys.push({ i: linIn, o: linOut, t: tc + step, s: [52] });
                    keys.push({ t: Math.min(op + 100, tc + 2 * step), s: [0] });
                  } else {
                    keys.push({ t: op + 100, s: [100] });
                  }
                  lay.ks.o = { a: 1, k: keys, ix: 11 };
                }
              });
            }
          } catch (e) {}
          return animData;
        }

        // Also enforce CodnestX Blue on any rendered SVG DOM inside mountEl
        function remapSvgColorString(str) {
          if (!str || str.indexOf("rgb") === -1) return str;
          return str.replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function (match, rStr, gStr, bStr) {
            var r = parseInt(rStr, 10) / 255;
            var g = parseInt(gStr, 10) / 255;
            var b = parseInt(bStr, 10) / 255;
            var m = remapUnitRgb(r, g, b);
            return "rgb(" + Math.round(m[0] * 255) + "," + Math.round(m[1] * 255) + "," + Math.round(m[2] * 255) + ")";
          });
        }

        function enforceMountedSvgTheme(container) {
      try {
          if (!container) return;
          applyWorkflowTextTheme(container.querySelector("svg"));
          var imgs = container.querySelectorAll("image");
          imgs.forEach(function (im, i) {
            var w = (im.getAttribute("width") || "").replace("px", "").trim();
            var h = (im.getAttribute("height") || "").replace("px", "").trim();
            var targetHref = matchThemedAsset(w, h, i);
            if (targetHref) {
              if (im.getAttribute("href") !== targetHref) im.setAttribute("href", targetHref);
              if (im.getAttribute("xlink:href") !== targetHref) im.setAttribute("xlink:href", targetHref);
            }
          });
          var coloredEls = container.querySelectorAll("[fill], [stroke], stop[stop-color]");
          coloredEls.forEach(function (el) {
            var f = el.getAttribute("fill");
            if (f && f.indexOf("rgb") !== -1) {
              var nf = remapSvgColorString(f);
              if (nf !== f) el.setAttribute("fill", nf);
            }
            var s = el.getAttribute("stroke");
            if (s && s.indexOf("rgb") !== -1) {
              var ns = remapSvgColorString(s);
              if (ns !== s) el.setAttribute("stroke", ns);
            }
            var sc = el.getAttribute("stop-color");
            if (sc && sc.indexOf("rgb") !== -1) {
              var nsc = remapSvgColorString(sc);
              if (nsc !== sc) el.setAttribute("stop-color", nsc);
            }
          });
        
      } catch (e) {}
    }

        
        var CX_WF_STAGES = [
          {
            badge: "Ready in 1 Week",
            title: "Idea to",
            accent: "Impact",
            desc: "Transform your vision into a functional AI-driven concept with our end-to-end validation and prototyping approach.",
            pills: ["Business Insight Gathering", "Generative AI Brainstorming", "Agile Development & Iteration", "Rapid Prototyping", "Validation & Feasibility Analysis"]
          },
          {
            badge: "Ready in 1 Week",
            title: "Design &",
            accent: "UX Strategy",
            desc: "Design That Converts – Create visually appealing, intuitive, and user-friendly experiences.",
            pills: ["Brand Consistency", "AI-Powered Wireframing", "User Behavior Analysis", "Adaptive UX Optimization", "Modern Design Tool Leverage"]
          },
          {
            badge: "Ready Within 4 Weeks",
            title: "MVP",
            accent: "Development",
            desc: "Develop a fully functional, market-ready MVP software with AI-powered capabilities.",
            pills: ["Experimental Lab Solutions", "Core Feature Selection", "AI-Enhanced Prototyping", "Automated Development", "Data-Driven Refinement", "Intelligent Testing"]
          },
          {
            badge: "Tailored As Per Business Needs",
            title: "GTM & Market",
            accent: "Scaling",
            desc: "Accelerate market entry and maximize visibility through tailored, AI-powered GTM and digital marketing strategies.",
            pills: ["Customer Personas", "AI-Powered Market Research", "Sales Channel Strategy", "Content & SEO Optimization", "Smart Analytics", "Performance Tracking"]
          },
          {
            badge: "As Per Product Needs",
            title: "Product",
            accent: "Maintenance",
            desc: "Keeping your products running smoothly with continuous improvements and AI-driven optimizations.",
            pills: ["Quality Assurance and Testing", "Performance Monitoring", "Bug Fixes & Security", "Feature Enhancements", "User Support", "Continuous Optimization"]
          }
        ];

        var wfOverlayEl = lottieWrapper.querySelector(".cx-wf-live-panel");
        if (!wfOverlayEl) {
          wfOverlayEl = document.createElement("div");
          wfOverlayEl.className = "cx-wf-live-panel";
          wfOverlayEl.setAttribute("aria-live", "polite");
          lottieWrapper.appendChild(wfOverlayEl);
        }
        var lastWfStageIdx = -1;
        var cachedWfPillEls = [];
        var cachedWfCardEl = null;
        var cachedWfBadgeEl = null;
        var cachedWfTitleEl = null;
        var cachedWfDescEl = null;

        function easeOutCubic(x) {
          var c = Math.max(0, Math.min(1, x));
          return 1 - Math.pow(1 - c, 3);
        }

        function renderWfStage(stageIdx, stageLocalProgress) {
          var clamped = Math.max(0, Math.min(CX_WF_STAGES.length - 1, stageIdx));
          var lp = typeof stageLocalProgress === "number" ? Math.max(0, Math.min(1, stageLocalProgress)) : 1;

          if (clamped !== lastWfStageIdx || wfOverlayEl.children.length === 0) {
            lastWfStageIdx = clamped;
            var st = CX_WF_STAGES[clamped];
            var pillsHtml = st.pills.map(function (p) {
              return '<span class="cx-wf-live-pill">' + p + '</span>';
            }).join("");
            wfOverlayEl.style.opacity = "1";
            wfOverlayEl.style.visibility = "visible";
            wfOverlayEl.innerHTML =
              '<div class="cx-wf-live-card">' +
                '<div class="cx-wf-live-badge">' + st.badge + '</div>' +
                '<h3 class="cx-wf-live-title">' + st.title + ' <span class="cx-wf-live-accent">' + st.accent + '</span></h3>' +
                '<p class="cx-wf-live-desc">' + st.desc + '</p>' +
                '<div class="cx-wf-live-pills">' + pillsHtml + '</div>' +
              '</div>';
            cachedWfCardEl = wfOverlayEl.querySelector(".cx-wf-live-card");
            cachedWfBadgeEl = wfOverlayEl.querySelector(".cx-wf-live-badge");
            cachedWfTitleEl = wfOverlayEl.querySelector(".cx-wf-live-title");
            cachedWfDescEl = wfOverlayEl.querySelector(".cx-wf-live-desc");
            cachedWfPillEls = Array.prototype.slice.call(wfOverlayEl.querySelectorAll(".cx-wf-live-pill"));
          }

          // Smooth exit handoff near end of non-final stages so next stage enters cleanly
          var exitFactor = 1;
          var exitLiftY = 0;
          if (clamped < CX_WF_STAGES.length - 1 && lp > 0.88) {
            var exT = easeOutCubic((lp - 0.88) / 0.12);
            exitFactor = 1 - exT * 0.82;
            exitLiftY = -14 * exT;
          }

          if (cachedWfCardEl) {
            cachedWfCardEl.style.opacity = exitFactor.toFixed(3);
            cachedWfCardEl.style.transform = "translate3d(0," + exitLiftY.toFixed(2) + "px,0)";
          }

          // 1) Progressive Badge reveal (0.00 -> 0.14)
          if (cachedWfBadgeEl) {
            var bRaw = clamped === 0 ? Math.max(0.92, lp / 0.10) : (lp / 0.14);
            var bE = easeOutCubic(bRaw);
            cachedWfBadgeEl.style.opacity = bE.toFixed(3);
            cachedWfBadgeEl.style.transform = "translate3d(0," + ((1 - bE) * 20).toFixed(2) + "px,0)";
          }

          // 2) Progressive Heading reveal (0.05 -> 0.24)
          if (cachedWfTitleEl) {
            var tRaw = clamped === 0 ? Math.max(0.28, (lp - 0.01) / 0.18) : ((lp - 0.05) / 0.19);
            var tE = easeOutCubic(tRaw);
            cachedWfTitleEl.style.opacity = tE.toFixed(3);
            cachedWfTitleEl.style.transform = "translate3d(0," + ((1 - tE) * 28).toFixed(2) + "px,0) scale(" + (0.975 + 0.025 * tE).toFixed(3) + ")";
          }

          // 3) Progressive Description reveal (0.14 -> 0.34)
          if (cachedWfDescEl) {
            var dRaw = clamped === 0 ? ((lp - 0.07) / 0.20) : ((lp - 0.14) / 0.20);
            var dE = easeOutCubic(dRaw);
            cachedWfDescEl.style.opacity = dE.toFixed(3);
            cachedWfDescEl.style.transform = "translate3d(0," + ((1 - dE) * 24).toFixed(2) + "px,0)";
          }

          // 4) Progressive Blue Pills reveal sequentially (0.24 -> 0.80)
          var count = cachedWfPillEls.length;
          if (count > 0) {
            var spanStart = clamped === 0 ? 0.18 : 0.24;
            var spanEnd = 0.80;
            var stepSpan = (spanEnd - spanStart) / count;
            var pillFadeWindow = Math.max(0.11, stepSpan * 1.15);
            for (var i = 0; i < count; i++) {
              var pStart = spanStart + i * stepSpan;
              var pE = easeOutCubic((lp - pStart) / pillFadeWindow);
              var el = cachedWfPillEls[i];
              el.style.opacity = pE.toFixed(3);
              el.style.transform = "translate3d(0," + ((1 - pE) * 18).toFixed(2) + "px,0) scale(" + (0.92 + 0.08 * pE).toFixed(3) + ")";
            }
          }
        }

        function syncWorkflowVisualsFromProgress(progress) {
          var p = Math.max(0, Math.min(1, progress));
          var totalStages = CX_WF_STAGES.length;
          var scaled = p * totalStages;
          var stageIdx = Math.min(totalStages - 1, Math.floor(scaled));
          var localP = stageIdx === totalStages - 1
            ? Math.min(1, scaled - stageIdx)
            : (scaled - stageIdx);
          if (p >= 0.995) localP = 1;
          renderWfStage(stageIdx, localP);
        }
        renderWfStage(0, 0.0);

        var workflowST = null;
        var workflowLerpRaf = null;

        function applyProgressivePills(svg, progress) {
          syncWorkflowVisualsFromProgress(progress);
        }

        function bindWorkflowScrollScrub(anim, isDesktopAnim) {
          if (!anim || !hasGSAP || !hasST || prefersReduced) return;
          if (workflowST) {
            try { workflowST.kill(); } catch (e) {}
            workflowST = null;
          }
          if (workflowLerpRaf) {
            cancelAnimationFrame(workflowLerpRaf);
            workflowLerpRaf = null;
          }
          // Unlock smooth sub-frame interpolation for buttery 60/120fps scrubbing
          try { if (typeof anim.setSubframe === "function") anim.setSubframe(true); } catch (e) {}

          var totalFrames = Math.max(1, (anim.totalFrames || (isDesktopAnim ? 621 : 557)) - 1);
          var startFrame = isDesktopAnim ? Math.min(30, totalFrames * 0.08) : 0;
          var endFrame = isDesktopAnim ? Math.min(totalFrames, 596) : Math.min(totalFrames, 544);
          var spanFrames = Math.max(1, endFrame - startFrame);
          var sectionEl = document.getElementById("ai-engine-section") || lottieWrapper.closest("section") || lottieWrapper;
          var isDesktopView = window.innerWidth >= 769;

          var targetFrame = startFrame;
          var drawnFrame = startFrame;
          var lastTickTs = 0;

          try {
            anim.goToAndStop(startFrame, true);
            syncWorkflowVisualsFromProgress(0);
          } catch (e) {}

          function tickSmoothFrame(now) {
            if (!currentAnim) { workflowLerpRaf = null; lastTickTs = 0; return; }
            var dt = lastTickTs ? Math.min(0.05, Math.max(0.004, (now - lastTickTs) / 1000)) : 0.0167;
            lastTickTs = now;
            var diff = targetFrame - drawnFrame;
            if (Math.abs(diff) > 0.02) {
              // Delta-time normalized snappy catch-up so orb and data stay 100% locked with zero lag
              var factor = 1 - Math.exp(-18 * dt);
              drawnFrame += diff * factor;
              var renderedProgress = Math.max(0, Math.min(1, (drawnFrame - startFrame) / spanFrames));
              try {
                currentAnim.goToAndStop(drawnFrame, true);
              } catch (e) {}
              syncWorkflowVisualsFromProgress(renderedProgress);
              workflowLerpRaf = requestAnimationFrame(tickSmoothFrame);
            } else {
              drawnFrame = targetFrame;
              var finalProgress = Math.max(0, Math.min(1, (drawnFrame - startFrame) / spanFrames));
              try {
                currentAnim.goToAndStop(drawnFrame, true);
              } catch (e) {}
              syncWorkflowVisualsFromProgress(finalProgress);
              workflowLerpRaf = null;
              lastTickTs = 0;
            }
          }

          workflowST = window.ScrollTrigger.create({
            trigger: isDesktopView ? sectionEl : lottieWrapper,
            start: isDesktopView ? "top top" : "top 80%",
            end: isDesktopView ? "+=520%" : "bottom 20%",
            pin: isDesktopView ? sectionEl : false,
            pinSpacing: isDesktopView,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
              if (!currentAnim) return;
              targetFrame = startFrame + self.progress * spanFrames;
              if (!workflowLerpRaf) {
                lastTickTs = 0;
                workflowLerpRaf = requestAnimationFrame(tickSmoothFrame);
              }
            }
          });
        }

        // Also scrub frozenSvg orb on scroll as fallback if lottie-web CDN is unavailable
        if (frozenOrbImg && hasGSAP && hasST && !prefersReduced) {
          var fallbackSection = document.getElementById("ai-engine-section") || lottieWrapper;
          window.ScrollTrigger.create({
            trigger: fallbackSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: function (self) {
              if (frozenSvg.style.display === "none") return;
              var deg = self.progress * 360;
              frozenOrbImg.setAttribute("transform", "rotate(" + deg.toFixed(2) + " 387.5 382.5)");
              syncWorkflowVisualsFromProgress(self.progress);
            }
          });
        }

        var mountLottie = function () {
          if (!window.lottie) return;
          var isDesktop = window.innerWidth >= 769;
          var nextMode = isDesktop ? "desktop" : "mobile";
          if (currentMode === nextMode && currentAnim) return;
          currentMode = nextMode;

          if (workflowST) {
            try { workflowST.kill(); } catch (e) {}
            workflowST = null;
          }
          if (currentAnim) {
            try { currentAnim.destroy(); } catch (e) {}
            currentAnim = null;
          }
          if (mountEl) mountEl.remove();
          frozenSvg.style.display = "";

          mountEl = document.createElement("div");
          mountEl.className = "da-lottie-mount";
          lottieInner.appendChild(mountEl);

          var targetUrl = isDesktop ? DESKTOP_JSON : MOBILE_JSON;

          function initWithConfig(cfg) {
            cfg.autoplay = false;
            cfg.loop = false;
            cfg.rendererSettings = Object.assign({}, cfg.rendererSettings, { preserveAspectRatio: "xMinYMid meet" });
            currentAnim = window.lottie.loadAnimation(cfg);
            currentAnim.addEventListener("DOMLoaded", function () {
              enforceMountedSvgTheme(mountEl);
              try {
                var lSvg = mountEl.querySelector("svg");
                if (lSvg) {
                  lSvg.querySelectorAll("filter").forEach(function (f) { f.remove(); });
                  lSvg.querySelectorAll("[filter]").forEach(function (el) { el.removeAttribute("filter"); });
                }
              } catch (e) {}
              frozenSvg.style.display = "none";
              bindWorkflowScrollScrub(currentAnim, isDesktop);
              if (hasST) {
                try { window.ScrollTrigger.refresh(); } catch (e) {}
              }
            });
            currentAnim.addEventListener("drawnFrame", function () {
              if (mountEl) alignWorkflowOrbit(mountEl.querySelector("svg"));
            });
            currentAnim.addEventListener("data_failed", function () {
              if (mountEl) mountEl.remove();
              mountEl = null;
              frozenSvg.style.display = "";
            });
          }

          var preloadedData = (typeof window !== "undefined")
            ? (isDesktop ? (window.__CX_WORKFLOW_DESKTOP_JSON || window.__CX_WORKFLOW_DESKTOP_JSON__) : (window.__CX_WORKFLOW_MOBILE_JSON || window.__CX_WORKFLOW_DESKTOP_JSON))
            : null;
          if (preloadedData) {
            try {
              var clonedData = JSON.parse(JSON.stringify(preloadedData));
              var themedPre = rethemeLottieJson(clonedData);
              initWithConfig({
                container: mountEl,
                renderer: "svg",
                loop: false,
                autoplay: false,
                animationData: themedPre
              });
              return;
            } catch (e) {}
          }
          var __cxProto = (typeof window !== "undefined" && window.location) ? window.location.protocol : "";
          var __cxCanFetch = !(typeof window !== "undefined" && window.__CX_STANDALONE_PREVIEW__) && __cxProto !== "file:" && __cxProto !== "about:" && __cxProto !== "blob:" && __cxProto !== "data:";
          if (__cxCanFetch && typeof window.fetch === "function") {
            window.fetch(targetUrl)
              .then(function (res) {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
              })
              .then(function (rawJson) {
                var themedJson = rethemeLottieJson(rawJson);
                initWithConfig({
                  container: mountEl,
                  renderer: "svg",
                  loop: false,
                  autoplay: false,
                  animationData: themedJson
                });
              })
              .catch(function () {
                if (mountEl) mountEl.remove();
                mountEl = null;
                frozenSvg.style.display = "";
              });
          }
        };

        if (!prefersReduced) {
          if (!window.__cxLottieResizeBound) {
            window.__cxLottieResizeBound = true;
            var __cxLottieResizeTimer = null;
            window.addEventListener("resize", function () {
              clearTimeout(__cxLottieResizeTimer);
              __cxLottieResizeTimer = setTimeout(function () { if (window.lottie) mountLottie(); }, 200);
            }, { passive: true });
          }
          if (window.lottie) {
            mountLottie();
          } else {
            var s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
            s.async = true;
            s.onload = mountLottie;
            document.head.appendChild(s);
          }
        }
      }
    }

    // ==========================================================================
    // 14. 3-ROW INTEGRATIONS SECTION CONTROLLER (Zero Layout Reflow on Scroll)
    // ==========================================================================
    (function initIntegrationsCarousel() {
      var section = document.getElementById('ecosystem-section');
      if (!section) return;
      var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      var visible = false;
      section.classList.add('cx-int-ready');
      var states = Array.from(section.querySelectorAll('.cx-int-row')).map(function (row, index) {
        var viewport = row.querySelector('.cx-int-row-mask');
        var track = row.querySelector('.cx-int-track');
        var tiles = Array.from(track.children);
        var originals = tiles.slice(0, tiles.length / 2);
        tiles.slice(originals.length).forEach(function (tile) { tile.remove(); });
        var state = { row: row, viewport: viewport, track: track, originals: originals,
          width: 0, x: 0, rendered: '', direction: row.dataset.direction === 'left' ? -1 : 1,
          speed: 26 + index * 2, pointer: null, dragging: false, pending: 0, focused: false };
        track.setAttribute('aria-hidden', 'true');
        viewport.tabIndex = 0;
        viewport.setAttribute('role', 'group');
        viewport.setAttribute('aria-label', 'Integration row ' + (index + 1) + '. Use arrow keys to explore.');

        function render() {
          if (motion.matches || !state.width) return;
          state.x = ((state.x % state.width) + state.width) % state.width - state.width;
          var position = 'translate3d(' + state.x.toFixed(3) + 'px,0,0)';
          if (position !== state.rendered) { track.style.transform = position; state.rendered = position; }
        }
        state.render = render;

        function measure() {
          var fraction = state.width ? state.x / state.width : 0;
          var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
          state.width = originals.reduce(function (sum, tile) { return sum + tile.getBoundingClientRect().width + gap; }, 0);
          if (!state.width) return;
          state.x = fraction ? fraction * state.width : parseFloat(row.dataset.offset || '-72');
          state.pending = 0;
          track.querySelectorAll('[data-int-clone]').forEach(function (tile) { tile.remove(); });
          if (motion.matches) { track.style.transform = 'none'; state.rendered = ''; return; }
          var copies = Math.max(2, Math.ceil(viewport.clientWidth / state.width) + 1);
          for (var copy = 1; copy < copies; copy++) {
            originals.forEach(function (tile) {
              var clone = tile.cloneNode(true);
              clone.dataset.intClone = '';
              clone.setAttribute('aria-hidden', 'true');
              track.appendChild(clone);
            });
          }
          viewport.scrollLeft = 0;
          state.rendered = '';
          render();
        }

        viewport.addEventListener('keydown', function (event) {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          var distance = (originals[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0)) * (event.key === 'ArrowRight' ? 1 : -1);
          if (motion.matches) viewport.scrollBy({ left: distance, behavior: 'instant' });
          else state.pending -= distance;
        });
        viewport.addEventListener('focus', function () { state.focused = viewport.matches(':focus-visible'); });
        viewport.addEventListener('blur', function () { state.focused = false; });
        viewport.addEventListener('dragstart', function (event) { event.preventDefault(); });
        viewport.addEventListener('pointerdown', function (event) {
          if (motion.matches || !event.isPrimary || event.button !== 0) return;
          state.pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX };
          state.pending = 0;
          state.focused = false;
          viewport.setPointerCapture(event.pointerId);
        });
        viewport.addEventListener('pointermove', function (event) {
          var pointer = state.pointer;
          if (!pointer || event.pointerId !== pointer.id) return;
          if (!state.dragging) {
            var dx = Math.abs(event.clientX - pointer.x), dy = Math.abs(event.clientY - pointer.y);
            if (dy > dx && dy > 7) { release(event); return; }
            if (dx < 7) return;
            state.dragging = true;
            row.classList.add('is-dragging');
          }
          event.preventDefault();
          state.x += event.clientX - pointer.lastX;
          pointer.lastX = event.clientX;
          render();
        });
        function release(event) {
          if (!state.pointer || event.pointerId !== state.pointer.id) return;
          state.pointer = null;
          state.dragging = false;
          row.classList.remove('is-dragging');
          if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
        }
        viewport.addEventListener('pointerup', release);
        viewport.addEventListener('pointercancel', release);
        viewport.addEventListener('lostpointercapture', release);
        var resize = new ResizeObserver(measure);
        resize.observe(viewport);
        state.measure = measure;
        measure();
        return state;
      });

      var observer = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        section.classList.toggle('cx-int-active', visible && !motion.matches);
      });
      observer.observe(section);

      var lastReducedMotion = motion.matches;
      function syncMotionPreference() {
        lastReducedMotion = motion.matches;
        states.forEach(function (state) { state.measure(); });
        section.classList.toggle('cx-int-active', visible && !motion.matches);
      }
      motion.addEventListener('change', syncMotionPreference);

      // Only track translation is updated per frame. Scrolling never alters speed or direction.
      function tick(delta) {
        if (motion.matches !== lastReducedMotion) syncMotionPreference();
        if (!visible || document.hidden || motion.matches) return;
        states.forEach(function (state) {
          if (state.pointer || !state.width) return;
          if (Math.abs(state.pending) > 0.2) {
            var move = state.pending * (1 - Math.exp(-12 * delta));
            state.x += move; state.pending -= move;
          } else {
            state.pending = 0;
            if (!state.focused) state.x += state.direction * state.speed * delta;
          }
          state.render();
        });
      }
      if (hasGSAP) {
        window.gsap.ticker.add(function (time, delta) { tick(Math.min(0.04, (delta || 16.67) / 1000)); });
      } else {
        var last = performance.now();
        function frame(now) { var delta = Math.min(0.04, (now - last) / 1000); last = now; tick(delta); requestAnimationFrame(frame); }
        requestAnimationFrame(frame);
      }
    })();

  });
})();
