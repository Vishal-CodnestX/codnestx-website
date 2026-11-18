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
        lerp: 0.095,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        smoothWheel: true,
        syncTouch: false
      });

      if (hasST) {
        lenis.on("scroll", window.ScrollTrigger.update);
      }
      if (hasGSAP) {
        window.gsap.ticker.lagSmoothing(500, 33);
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

    // Smart Header: shrink after 80px, hide on scroll-down, reveal on scroll-up
    var header = document.getElementById("cx-site-header");
    var lastY = window.scrollY || 0;
    var modalOpen = false;
    var mobileMenuOpen = false;

    function onWindowScroll() {
      var y = window.scrollY || window.pageYOffset || 0;
      if (header) {
        if (y > 80) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
        if (y > 180 && y - lastY > 8 && !mobileMenuOpen && !modalOpen) {
          header.classList.add("is-hidden");
        } else if (lastY - y > 6 || y <= 100) {
          header.classList.remove("is-hidden");
        }
      }
      lastY = y;
    }
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    onWindowScroll();

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
        if (lenis) lenis.stop();
        if (hasGSAP && !prefersReduced) {
          window.gsap.fromTo(
            mobileDrawer.querySelectorAll(".cx-mobile-link, .cx-mobile-cta"),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: TOKENS.easeOut, stagger: 0.04, clearProps: "transform,opacity" }
          );
        }
      } else {
        mobileDrawer.classList.remove("is-open");
        if (lenis && !modalOpen) lenis.start();
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
        var proxy = { val: 0 };
        g.to(proxy, {
          val: targetVal,
          duration: TOKENS.dur.countUp,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true
          },
          onUpdate: function () {
            el.textContent = proxy.val.toFixed(decimals) + suffix;
          },
          onComplete: function () {
            el.textContent = targetVal.toFixed(decimals) + suffix;
          }
        });
      });
    }

    // ==========================================================================
    // 5. KPI BENTO: REAL 3D ROTATING GLOBES AT MEDIUM-FAST SPEED
    //    - #cx-bento-globe-canvas (5+ Industries Served)
    //    - #cx-bento-lat-globe-canvas (99.9% Uptime SLA - image_45700b.png)
    // ==========================================================================
    (function initRotatingGlobes() {
      var patches = [
        { lat0: 10, lat1: 55, lon0: -125, lon1: -65 },
        { lat0: -45, lat1: 10, lon0: -80, lon1: -35 },
        { lat0: 35, lat1: 65, lon0: -10, lon1: 45 },
        { lat0: -32, lat1: 32, lon0: -15, lon1: 50 },
        { lat0: 8, lat1: 60, lon0: 50, lon1: 140 },
        { lat0: -38, lat1: -12, lon0: 115, lon1: 152 }
      ];

      function inContinent(latDeg, lonDeg) {
        for (var i = 0; i < patches.length; i++) {
          var p = patches[i];
          if (latDeg >= p.lat0 && latDeg <= p.lat1 && lonDeg >= p.lon0 && lonDeg <= p.lon1) {
            return true;
          }
        }
        return false;
      }

      var dpr = Math.min(2, window.devicePixelRatio || 1);

      // --- Globe A: #cx-bento-globe-canvas (Industries Bento Card) ---
      var canvasA = document.getElementById("cx-bento-globe-canvas");
      var ctxA = canvasA ? canvasA.getContext("2d") : null;
      var sizeA = 220;
      var dotsA = [];
      var hubsA = [
        { lat: (23.02 * Math.PI) / 180, lon: (72.57 * Math.PI) / 180, main: true },
        { lat: (51.5 * Math.PI) / 180, lon: (-0.12 * Math.PI) / 180 },
        { lat: (37.77 * Math.PI) / 180, lon: (-122.4 * Math.PI) / 180 },
        { lat: (25.2 * Math.PI) / 180, lon: (55.27 * Math.PI) / 180 },
        { lat: (-33.86 * Math.PI) / 180, lon: (151.2 * Math.PI) / 180 }
      ];
      var rotYA = -1.1;
      var tiltXA = 0.24;
      var cxA = sizeA / 2;
      var cyA = sizeA / 2;
      var RA = 88;

      if (canvasA && ctxA) {
        canvasA.width = sizeA * dpr;
        canvasA.height = sizeA * dpr;
        ctxA.scale(dpr, dpr);

        for (var lat = -70; lat <= 70; lat += 6) {
          var stepLon = Math.max(6, Math.round(7 / Math.max(0.25, Math.cos((lat * Math.PI) / 180))));
          for (var lon = -180; lon < 180; lon += stepLon) {
            dotsA.push({
              lat: (lat * Math.PI) / 180,
              lon: (lon * Math.PI) / 180,
              isLand: inContinent(lat, lon)
            });
          }
        }
      }

      function project3DA(lat, lon, radius) {
        var phi = lon + rotYA;
        var x = radius * Math.cos(lat) * Math.sin(phi);
        var y = -radius * Math.sin(lat);
        var z = radius * Math.cos(lat) * Math.cos(phi);
        var y2 = y * Math.cos(tiltXA) - z * Math.sin(tiltXA);
        var z2 = y * Math.sin(tiltXA) + z * Math.cos(tiltXA);
        return { x: cxA + x, y: cyA + y2, z: z2 };
      }

      // Cache globe geometry; rotation only needs one sine/cosine pair per frame.
      dotsA.forEach(function (dot) {
        dot.baseX = RA * Math.cos(dot.lat) * Math.sin(dot.lon);
        dot.baseY = -RA * Math.sin(dot.lat);
        dot.baseZ = RA * Math.cos(dot.lat) * Math.cos(dot.lon);
      });
      var dotBucketsA = Array.from({ length: 16 }, function () { return []; });

      function drawGlobeA() {
        if (!ctxA) return;
        ctxA.clearRect(0, 0, sizeA, sizeA);

        var glow = ctxA.createRadialGradient(cxA, cyA, RA * 0.65, cxA, cyA, RA * 1.18);
        glow.addColorStop(0, "rgba(25, 152, 220, 0.14)");
        glow.addColorStop(0.7, "rgba(1, 112, 186, 0.06)");
        glow.addColorStop(1, "rgba(1, 112, 186, 0)");
        ctxA.fillStyle = glow;
        ctxA.beginPath();
        ctxA.arc(cxA, cyA, RA * 1.18, 0, Math.PI * 2);
        ctxA.fill();

        var sphereFill = ctxA.createRadialGradient(cxA - 22, cyA - 22, 10, cxA, cyA, RA);
        sphereFill.addColorStop(0, "rgba(255, 255, 255, 0.94)");
        sphereFill.addColorStop(1, "rgba(224, 242, 254, 0.58)");
        ctxA.fillStyle = sphereFill;
        ctxA.beginPath();
        ctxA.arc(cxA, cyA, RA, 0, Math.PI * 2);
        ctxA.fill();

        ctxA.strokeStyle = "rgba(1, 112, 186, 0.22)";
        ctxA.lineWidth = 1.1;
        ctxA.stroke();

        var sinY = Math.sin(rotYA), cosY = Math.cos(rotYA);
        var sinTilt = Math.sin(tiltXA), cosTilt = Math.cos(tiltXA);
        dotBucketsA.forEach(function (bucket) { bucket.length = 0; });
        for (var i = 0; i < dotsA.length; i++) {
          var dot = dotsA[i];
          var x = dot.baseX * cosY + dot.baseZ * sinY;
          var z = dot.baseZ * cosY - dot.baseX * sinY;
          var depth = dot.baseY * sinTilt + z * cosTilt;
          if (depth < -12) continue;
          var alpha = Math.max(0.08, (depth + 12) / (RA + 12));
          var bucket = Math.min(7, Math.floor(alpha * 8)) + (dot.isLand ? 8 : 0);
          dotBucketsA[bucket].push(cxA + x, cyA + dot.baseY * cosTilt - z * sinTilt);
        }
        dotBucketsA.forEach(function (points, index) {
          if (!points.length) return;
          var land = index >= 8, radius = land ? 1.5 : 0.95;
          var alpha = ((index % 8 + 0.5) / 8) * (land ? 0.82 : 0.24);
          ctxA.fillStyle = land ? 'rgba(1,112,186,' + alpha + ')' : 'rgba(25,152,220,' + alpha + ')';
          ctxA.beginPath();
          for (var point = 0; point < points.length; point += 2) {
            ctxA.moveTo(points[point] + radius, points[point + 1]);
            ctxA.arc(points[point], points[point + 1], radius, 0, Math.PI * 2);
          }
          ctxA.fill();
        });

        var hq = project3DA(hubsA[0].lat, hubsA[0].lon, RA);
        if (hq.z > 0) {
          for (var h = 1; h < hubsA.length; h++) {
            var dest = project3DA(hubsA[h].lat, hubsA[h].lon, RA);
            if (dest.z > -8) {
              var midLat = (hubsA[0].lat + hubsA[h].lat) / 2;
              var midLon = (hubsA[0].lon + hubsA[h].lon) / 2;
              var ctrl = project3DA(midLat, midLon, RA * 1.24);
              ctxA.strokeStyle = "rgba(1, 112, 186, 0.45)";
              ctxA.lineWidth = 1.2;
              ctxA.beginPath();
              ctxA.moveTo(hq.x, hq.y);
              ctxA.quadraticCurveTo(ctrl.x, ctrl.y, dest.x, dest.y);
              ctxA.stroke();

              ctxA.fillStyle = "#1998DC";
              ctxA.beginPath();
              ctxA.arc(dest.x, dest.y, 2.3, 0, Math.PI * 2);
              ctxA.fill();
            }
          }
          ctxA.fillStyle = "#0170BA";
          ctxA.beginPath();
          ctxA.arc(hq.x, hq.y, 3.4, 0, Math.PI * 2);
          ctxA.fill();
        }
      }

      // --- Globe B: #cx-bento-lat-globe-canvas (99.9% Uptime SLA Card - image_45700b.png) ---
      // Renders the exact stacked concentric latitude-ring dotted world dome on the right side
      // of the Uptime SLA card and spins it smoothly at a medium-fast speed (~5.2s per rotation).
      var canvasB = document.getElementById("cx-bento-lat-globe-canvas");
      var ctxB = canvasB ? canvasB.getContext("2d") : null;
      var wB = 360;
      var hB = 270;
      var cxB = 314;
      var cyB = 258;
      var RB = 226;
      var tiltXB = 0.28; // 17.2 deg tilt matching the stacked latitude ellipses in image_45700b.png
      var rotYB = 0.0;
      var latRingsB = [];

      if (canvasB && ctxB) {
        canvasB.width = wB * dpr;
        canvasB.height = hB * dpr;
        ctxB.scale(dpr, dpr);

        for (var latDeg = -14; latDeg <= 84; latDeg += 5.5) {
          var latRad = (latDeg * Math.PI) / 180;
          var ringDots = [];
          var numDots = Math.max(24, Math.round(76 * Math.cos(latRad * 0.85)));
          for (var j = 0; j < numDots; j++) {
            var lonDeg = -180 + (360 * j) / numDots;
            var lonRad = (lonDeg * Math.PI) / 180;
            var land = inContinent(latDeg, lonDeg);
            // Smooth longitudinal wave so rotational motion along the latitude ellipses is unmistakably visible
            var wave = 0.5 + 0.5 * Math.sin(lonRad * 3.0 + latRad * 2.2);
            ringDots.push({
              lat: latRad,
              lon: lonRad,
              isLand: land,
              wave: wave
            });
          }
          latRingsB.push({ lat: latRad, dots: ringDots });
        }
      }

      function project3DB(lat, lon, radius) {
        var phi = lon + rotYB;
        var x = radius * Math.cos(lat) * Math.sin(phi);
        var y = -radius * Math.sin(lat);
        var z = radius * Math.cos(lat) * Math.cos(phi);
        var y2 = y * Math.cos(tiltXB) - z * Math.sin(tiltXB);
        var z2 = y * Math.sin(tiltXB) + z * Math.cos(tiltXB);
        return { x: cxB + x, y: cyB + y2, z: z2 };
      }

      latRingsB.forEach(function (ring) {
        ring.dots.forEach(function (dot) {
          dot.baseX = RB * Math.cos(dot.lat) * Math.sin(dot.lon);
          dot.baseY = -RB * Math.sin(dot.lat);
          dot.baseZ = RB * Math.cos(dot.lat) * Math.cos(dot.lon);
          dot.radius = 0.85 + 0.55 * dot.wave + (dot.isLand ? 0.25 : 0);
        });
      });
      var dotBucketsB = Array.from({ length: 32 }, function () { return []; });

      function drawGlobeB() {
        if (!ctxB) return;
        ctxB.clearRect(0, 0, wB, hB);

        // Subtle radial ambient glow under the dotted dome
        var domeGlow = ctxB.createRadialGradient(cxB - 30, cyB - 40, RB * 0.2, cxB, cyB, RB * 1.05);
        domeGlow.addColorStop(0, "rgba(25, 152, 220, 0.10)");
        domeGlow.addColorStop(0.65, "rgba(1, 112, 186, 0.04)");
        domeGlow.addColorStop(1, "rgba(25, 152, 220, 0)");
        ctxB.fillStyle = domeGlow;
        ctxB.beginPath();
        ctxB.arc(cxB, cyB, RB * 1.05, 0, Math.PI * 2);
        ctxB.fill();

        var sinY = Math.sin(rotYB), cosY = Math.cos(rotYB);
        var sinTilt = Math.sin(tiltXB), cosTilt = Math.cos(tiltXB);
        dotBucketsB.forEach(function (bucket) { bucket.length = 0; });
        latRingsB.forEach(function (ring) {
          ring.dots.forEach(function (dot) {
            var x = cxB + dot.baseX * cosY + dot.baseZ * sinY;
            var z = dot.baseZ * cosY - dot.baseX * sinY;
            var y = cyB + dot.baseY * cosTilt - z * sinTilt;
            var depth = dot.baseY * sinTilt + z * cosTilt;
            if (depth < -RB * 0.45 || x < -10 || x > wB + 10 || y < -10 || y > hB + 10) return;
            var depthNorm = Math.max(0.12, Math.min(1, (depth + RB * 0.45) / (RB * 1.45)));
            var alpha = depthNorm * (x < cxB ? 1.15 : 0.85) * (0.38 + 0.58 * dot.wave + (dot.isLand ? 0.18 : 0));
            alpha = Math.max(0.14, Math.min(0.95, alpha));
            var bucket = Math.min(15, Math.floor(alpha * 16)) + (dot.isLand ? 16 : 0);
            dotBucketsB[bucket].push(x, y, dot.radius);
          });
        });
        dotBucketsB.forEach(function (points, index) {
          if (!points.length) return;
          var alpha = (index % 16 + 0.5) / 16;
          ctxB.fillStyle = index >= 16 ? 'rgba(1,112,186,' + alpha + ')' : 'rgba(25,152,220,' + alpha + ')';
          ctxB.beginPath();
          for (var point = 0; point < points.length; point += 3) {
            ctxB.moveTo(points[point] + points[point + 2], points[point + 1]);
            ctxB.arc(points[point], points[point + 1], points[point + 2], 0, Math.PI * 2);
          }
          ctxB.fill();
        });
      }

      drawGlobeA();
      drawGlobeB();
      if (prefersReduced) return;

      var globeAVisible = !('IntersectionObserver' in window);
      var globeBVisible = globeAVisible;
      if ('IntersectionObserver' in window) {
        var globeObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.target === canvasA) globeAVisible = entry.isIntersecting;
            if (entry.target === canvasB) globeBVisible = entry.isIntersecting;
          });
        });
        if (canvasA) globeObserver.observe(canvasA);
        if (canvasB) globeObserver.observe(canvasB);
      }

      // Medium-fast spin speed: ~5.2s per full revolution (1.21 rad/sec)
      var MEDIUM_FAST_SPEED_A = (Math.PI * 2) / 5.5;
      var MEDIUM_FAST_SPEED_B = (Math.PI * 2) / 4.6;

      var globeFrameTime = 0;
      function tickGlobes(dtSec) {
        if ((!globeAVisible && !globeBVisible) || document.hidden) { globeFrameTime = 0; return; }
        globeFrameTime += dtSec;
        if (globeFrameTime < 1 / 30) return;
        dtSec = Math.min(globeFrameTime, 0.0667);
        globeFrameTime = 0;
        rotYA += MEDIUM_FAST_SPEED_A * dtSec;
        rotYB += MEDIUM_FAST_SPEED_B * dtSec;
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

    // ==========================================================================
    // 6. "PROBLEMS WE'VE SOLVED" BEFORE -> AFTER CAROUSEL & SVG CONNECTOR DRAW
    // ==========================================================================
    (function initBeforeAfterCarousel() {
      var track = document.getElementById("cx-ba-track");
      var viewport = document.getElementById("cx-ba-viewport");
      if (!track || !viewport) return;

      var slides = Array.from(track.querySelectorAll(".cx-ba-slide"));
      var prevBtn = document.getElementById("cx-ba-prev");
      var nextBtn = document.getElementById("cx-ba-next");
      var currentNumEl = document.getElementById("cx-ba-current-num");
      var activeIdx = 0;

      function computeSlideConnectors(slideEl) {
        var svg = slideEl.querySelector(".cx-ba-connector-svg");
        var nodes = Array.from(slideEl.querySelectorAll(".cx-ba-before-node"));
        var paths = Array.from(slideEl.querySelectorAll(".cx-ba-flow-path"));
        var hub = slideEl.querySelector(".cx-ba-flow-hub");
        if (!svg || !nodes.length || !paths.length) return;

        var svgRect = svg.getBoundingClientRect();
        if (svgRect.height < 20) return;
        var w = 160;
        var h = 320;
        var hubY = h / 2;
        if (hub) {
          hub.setAttribute("cx", String(w - 6));
          hub.setAttribute("cy", String(hubY));
        }

        nodes.forEach(function (nodeEl, i) {
          var pathEl = paths[i];
          if (!pathEl) return;
          var nRect = nodeEl.getBoundingClientRect();
          var relY = ((nRect.top + nRect.height / 2 - svgRect.top) / svgRect.height) * h;
          relY = Math.max(16, Math.min(h - 16, relY));
          var d = "M 0 " + relY.toFixed(1) + " C " + (w * 0.52).toFixed(1) + " " + relY.toFixed(1) + ", " + (w * 0.52).toFixed(1) + " " + hubY.toFixed(1) + ", " + (w - 6) + " " + hubY.toFixed(1);
          pathEl.setAttribute("d", d);
        });
      }

      function animateSlideEntrance(slideEl, dir) {
        computeSlideConnectors(slideEl);
        if (!hasGSAP || prefersReduced) return;
        var g = window.gsap;
        var paths = slideEl.querySelectorAll(".cx-ba-flow-path");
        var nodes = slideEl.querySelectorAll(".cx-ba-before-node");
        var metrics = slideEl.querySelectorAll(".cx-ba-metric-cell, .cx-ba-outcome-item");

        g.fromTo(
          nodes,
          { opacity: 0, x: dir * 16 },
          { opacity: 1, x: 0, duration: 0.48, ease: TOKENS.easeOut, stagger: 0.04, clearProps: "transform,opacity" }
        );
        g.fromTo(
          paths,
          { strokeDashoffset: 260 },
          { strokeDashoffset: 0, duration: 0.68, delay: 0.12, ease: TOKENS.easeOut, stagger: 0.04 }
        );
        g.fromTo(
          metrics,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.48, delay: 0.18, ease: TOKENS.easeOut, stagger: 0.035, clearProps: "transform,opacity" }
        );
      }

      function goToSlide(nextIndex, animate) {
        var prevIdx = activeIdx;
        activeIdx = (nextIndex + slides.length) % slides.length;
        var dir = activeIdx >= prevIdx ? 1 : -1;

        slides.forEach(function (sl, i) {
          if (i === activeIdx) sl.classList.add("is-active");
          else sl.classList.remove("is-active");
        });

        if (currentNumEl) {
          currentNumEl.textContent = "0" + (activeIdx + 1);
        }

        var slideW = slides[0].offsetWidth;
        var gap = 32;
        var vpW = viewport.offsetWidth;
        var centerOffset = Math.max(0, (vpW - slideW) / 2);
        var targetX = -(activeIdx * (slideW + gap)) + centerOffset;

        if (hasGSAP && animate && !prefersReduced) {
          window.gsap.to(track, {
            x: targetX,
            duration: 0.68,
            ease: TOKENS.easeOut
          });
          animateSlideEntrance(slides[activeIdx], dir);
        } else {
          track.style.transform = "translate3d(" + targetX.toFixed(1) + "px, 0, 0)";
          computeSlideConnectors(slides[activeIdx]);
        }
      }

      if (prevBtn) prevBtn.addEventListener("click", function () { goToSlide(activeIdx - 1, true); });
      if (nextBtn) nextBtn.addEventListener("click", function () { goToSlide(activeIdx + 1, true); });

      slides.forEach(function (sl, idx) {
        sl.addEventListener("click", function () {
          if (idx !== activeIdx) goToSlide(idx, true);
        });
      });

      var baSec = document.getElementById("before-after-section");
      if (baSec) {
        baSec.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight") goToSlide(activeIdx + 1, true);
          if (e.key === "ArrowLeft") goToSlide(activeIdx - 1, true);
        });
      }

      var dragStartX = 0;
      var dragging = false;
      viewport.addEventListener("pointerdown", function (e) {
        if (e.target.closest("button")) return;
        dragging = true;
        dragStartX = e.clientX;
      });
      viewport.addEventListener("pointerup", function (e) {
        if (!dragging) return;
        dragging = false;
        var dx = e.clientX - dragStartX;
        if (dx < -45) goToSlide(activeIdx + 1, true);
        else if (dx > 45) goToSlide(activeIdx - 1, true);
      });

      window.addEventListener("resize", function () {
        goToSlide(activeIdx, false);
      });

      setTimeout(function () {
        goToSlide(0, false);
      }, 60);
    })();

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
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          card.style.display = match ? "" : "none";
          card.style.opacity = "1";
          card.style.transform = "none";
          return match;
        });
        if (hasGSAP && !reduced) window.gsap.fromTo(visible,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.025, ease: "power2.out", clearProps: "opacity,transform" });
        if (status) status.textContent = filter === "all" ? "Showing all 10 projects" : "Showing " + visible.length + " " + btn.textContent.trim() + " projects";
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

    // ==========================================================================
    // 8. 9-STAGE DELIVERY FRAMEWORK SCROLL PROGRESS (Direct 1:1 with Lenis)
    // ==========================================================================
    (function initMethodProgress() {
      var methodSec = document.getElementById("method-section");
      var fillEl = document.getElementById("cx-method-progress-fill");
      var stages = Array.from(document.querySelectorAll(".cx-method-stage"));
      if (!methodSec || !stages.length) return;

      stages[0].classList.add("is-active");

      if (hasGSAP && hasST && !prefersReduced) {
        window.ScrollTrigger.create({
          trigger: methodSec,
          start: "top 70%",
          end: "bottom 45%",
          onUpdate: function (self) {
            var p = self.progress;
            if (fillEl) {
              fillEl.style.transform = "scaleX(" + Math.max(0.11, p).toFixed(3) + ")";
            }
            var activeCount = Math.max(1, Math.ceil(p * stages.length));
            stages.forEach(function (st, idx) {
              if (idx < activeCount) st.classList.add("is-active");
              else st.classList.remove("is-active");
            });
          }
        });
      } else {
        stages.forEach(function (st) { st.classList.add("is-active"); });
        if (fillEl) fillEl.style.transform = "scaleX(1)";
      }
    })();

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
      if (lenis) lenis.stop();

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
            if (lenis && !mobileMenuOpen) lenis.start();
            if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
          }
        });
      } else {
        modalEl.style.opacity = "0";
        modalEl.classList.remove("is-open");
        if (lenis && !mobileMenuOpen) lenis.start();
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

    // Align the visual icon layers without moving their separately rendered text layers.
    function alignWorkflowOrbit(svg) {
      var orbit = svg && svg._cxWorkflowOrbit;
      if (!orbit || !svg.getCTM()) return;
      var ns = "http://www.w3.org/2000/svg", rootInverse = svg.getCTM().inverse();
      svg.querySelectorAll(".cx-workflow-orbit-icon").forEach(function (icon) {
        if (!icon._cxOrbitCenter) {
          var box = icon.getBBox();
          if (!box.width || !box.height) return;
          icon._cxOrbitCenter = new DOMPoint(box.x + box.width / 2, box.y + box.height / 2);
        }
        var wrapper = icon.parentElement;
        if (!wrapper.classList.contains("cx-workflow-icon-orbit-position")) {
          wrapper = document.createElementNS(ns, "g"); wrapper.setAttribute("class", "cx-workflow-icon-orbit-position");
          icon.parentElement.insertBefore(wrapper, icon); wrapper.appendChild(icon);
        }
        var parentMatrix = rootInverse.multiply(wrapper.parentElement.getCTM());
        var transform = icon.transform.baseVal.consolidate();
        var localCenter = icon._cxOrbitCenter.matrixTransform(transform ? transform.matrix : new DOMMatrix());
        var originalCenter = localCenter.matrixTransform(parentMatrix);
        var dx = originalCenter.x - orbit.reference.x, dy = originalCenter.y - orbit.reference.y;
        var distance = Math.hypot(dx, dy);
        if (!distance) return;
        var target = new DOMPoint(orbit.center.x + dx / distance * orbit.radius, orbit.center.y + dy / distance * orbit.radius).matrixTransform(parentMatrix.inverse());
        wrapper.setAttribute("transform", "translate(" + (target.x - localCenter.x).toFixed(5) + " " + (target.y - localCenter.y).toFixed(5) + ")");
      });
    }
    // Keep the authored text layout and transitions; use actual font text in its SVG.
    function applyWorkflowTextTheme(svg) {
      if (!svg) return;
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
        var box = group.getBBox();
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", String(box.x)); text.setAttribute("y", "0");
        if (group.classList.contains("cx-workflow-native-heading")) text.setAttribute("font-weight", "600");
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
    }
    function prepareFrozenWorkflow(svg) {
      if (!svg || svg.dataset.nativeWorkflow) return;
      svg.dataset.nativeWorkflow = "true";
      var ns = "http://www.w3.org/2000/svg";
      svg.querySelectorAll("g[aria-label]").forEach(function (group) {
        var value = group.getAttribute("aria-label");
        var size = parseFloat(group.getAttribute("font-size")) || 24;
        var box = group.getBBox();
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
        var matrix = parent.getCTM().inverse().multiply(globe.getCTM());
        var center = new DOMPoint(387.5, 382.5).matrixTransform(matrix);
        var wrap = document.createElementNS(ns, "g"); wrap.setAttribute("class", "cx-workflow-scaled-globe");
        var globeScale = 800 / (775 * Math.hypot(matrix.a, matrix.b));
        wrap.setAttribute("transform", "matrix(" + globeScale + " 0 0 " + globeScale + " " + (-center.x * globeScale) + " " + (center.y * (1 - globeScale)) + ")");
        parent.insertBefore(wrap, globeLayer); wrap.appendChild(globeLayer);
      }
      var artRoot = svg.querySelector("g[clip-path]");
      if (artRoot) Array.from(artRoot.children).forEach(function (layer) {
        if (layer.tagName !== "g" || layer.querySelector("[aria-label], image")) return;
        var box = layer.getBBox();
        if (box.width > 0 && box.width < 300 && box.height > 0 && box.height < 300) layer.classList.add("cx-workflow-orbit-icon");
      });
      applyWorkflowTextTheme(svg);
    }

    var lottieWrapper = document.querySelector(".cx-lottie-stage");
    if (lottieWrapper) {
      var lottieInner = lottieWrapper.firstElementChild;
      var frozenSvg = lottieInner ? lottieInner.querySelector("svg") : null;
      if (lottieInner && frozenSvg) {
        var DESKTOP_JSON = "/animations/workflow-desktop.json";
        var MOBILE_JSON = "/animations/workflow-mobile.json";
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
        }

        if ("IntersectionObserver" in window) {
          var lottieObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              isLottieInView = entry.isIntersecting;
              if (currentAnim) {
                if (isLottieInView) currentAnim.play();
                else currentAnim.pause();
              }
            });
          }, { rootMargin: "150px" });
          lottieObs.observe(lottieWrapper);
        }

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
          if (mountEl) mountEl.remove();
          frozenSvg.style.display = "";

          mountEl = document.createElement("div");
          mountEl.className = "da-lottie-mount";
          lottieInner.appendChild(mountEl);

          var targetUrl = isDesktop ? DESKTOP_JSON : MOBILE_JSON;

          function initWithConfig(cfg) {
            currentAnim = window.lottie.loadAnimation(cfg);
            currentAnim.addEventListener("DOMLoaded", function () {
              enforceMountedSvgTheme(mountEl);
              frozenSvg.style.display = "none";
              if (!isLottieInView) currentAnim.pause();
              if ("MutationObserver" in window && mountEl) {
                var mo = new MutationObserver(function () {
                  enforceMountedSvgTheme(mountEl);
                });
                mo.observe(mountEl, { attributes: true, subtree: true, attributeFilter: ["fill", "stroke", "href", "xlink:href"] });
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

          if (typeof window.fetch === "function") {
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
                  loop: true,
                  autoplay: isLottieInView,
                  animationData: themedJson
                });
              })
              .catch(function () {
                initWithConfig({
                  container: mountEl,
                  renderer: "svg",
                  loop: true,
                  autoplay: isLottieInView,
                  path: targetUrl
                });
              });
          } else {
            initWithConfig({
              container: mountEl,
              renderer: "svg",
              loop: true,
              autoplay: isLottieInView,
              path: targetUrl
            });
          }
        };

        var s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
        s.async = true;
        s.onload = mountLottie;
        if (!prefersReduced) document.head.appendChild(s);
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
