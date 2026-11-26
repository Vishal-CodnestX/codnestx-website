/* ==========================================================================
   CodnestX 3D Section Redesigns — Interactive Controller
   Powers:
     1) 01-portfolio 3D Card Deck Carousel (drag, wheel, keys, filter, dock)
     2) 04-city-light Interactive Isometric Connected City
     3) 05-order Scroll-Driven + Scrubbable 3D Order Journey
   ========================================================================== */
(function () {
  "use strict";

  var PORTFOLIO_ITEMS = [
    {
      slug: "apex-logistics",
      brand: "Apex Logistics",
      title: "Apex Logistics OS",
      sub: "Dispatch & Stock ERP",
      category: "CRM/ERP Systems",
      catLabel: "CRM / ERP",
      metricVal: "15%",
      metricNum: 15,
      metricPrefix: "",
      metricSuffix: "%",
      metricDecimals: 0,
      metricLbl: "Lower fuel waste",
      beforeAfter: "Weekly audits → Real-time",
      liveText: "Live · 14 routes tracked",
      img: "/images/clients/apex-warehouse.webp",
      spark: "M6 34 C 36 30, 58 24, 86 22 C 112 20, 128 8, 162 6"
    },
    {
      slug: "rutu-group",
      brand: "Rutu Group",
      title: "Rutu Group CRM",
      sub: "Real Estate CRM",
      category: "CRM/ERP Systems",
      catLabel: "CRM / ERP",
      metricVal: "90%",
      metricNum: 90,
      metricPrefix: "",
      metricSuffix: "%",
      metricDecimals: 0,
      metricLbl: "Fewer status calls",
      beforeAfter: "Manual calls → Buyer portal",
      liveText: "Live · 6 towers synced",
      img: "/images/clients/rutu-residences.webp",
      spark: "M6 36 C 34 32, 62 18, 92 16 C 122 14, 140 8, 162 4"
    },
    {
      slug: "kalyan-hub",
      brand: "Kalyan Hub",
      title: "Kalyan Jewellers Hub",
      sub: "Multi-Store Gold POS",
      category: "Web & Mobile",
      catLabel: "Web & Mobile",
      metricVal: "90s",
      metricNum: 90,
      metricPrefix: "",
      metricSuffix: "s",
      metricDecimals: 0,
      metricLbl: "Store billing time",
      beforeAfter: "12 min bill → 90 sec POS",
      liveText: "Live · Gold rate synced",
      img: "/images/clients/kalyan-showroom.webp",
      spark: "M6 28 C 36 26, 66 20, 96 14 C 126 10, 144 8, 162 5"
    },
    {
      slug: "yajya-fintech",
      brand: "YAJYA",
      title: "YAJYA Transactional OS",
      sub: "Fintech & Consumer OS",
      category: "Web & Mobile",
      catLabel: "Web & Mobile",
      metricVal: "99.98%",
      metricNum: 99.98,
      metricPrefix: "",
      metricSuffix: "%",
      metricDecimals: 2,
      metricLbl: "Transaction reliability",
      beforeAfter: "Manual settle → Instant OS",
      liveText: "Live · 45% faster payout",
      img: "/images/clients/yajya-fintech.webp",
      spark: "M6 32 C 38 22, 72 18, 102 12 C 130 9, 146 6, 162 5"
    },
    {
      slug: "360-solutions",
      brand: "360 Solutions",
      title: "360 Solutions Portal",
      sub: "Operations Analytics OS",
      category: "Web & Mobile",
      catLabel: "Web & Mobile",
      metricVal: "40%",
      metricNum: 40,
      metricPrefix: "",
      metricSuffix: "%",
      metricDecimals: 0,
      metricLbl: "Faster delivery cycles",
      beforeAfter: "Chat handoffs → Live portal",
      liveText: "Live · 0 handoff gaps",
      img: "/images/clients/360-solutions.webp",
      spark: "M6 35 C 34 29, 64 25, 96 16 C 124 11, 142 8, 162 4"
    },
    {
      slug: "akshar-infoline",
      brand: "Akshar Infoline",
      title: "Akshar Infoline",
      sub: "Enterprise IT Portal",
      category: "CRM/ERP Systems",
      catLabel: "CRM / ERP",
      metricVal: "+180%",
      metricNum: 180,
      metricPrefix: "+",
      metricSuffix: "%",
      metricDecimals: 0,
      metricLbl: "Organic enterprise leads",
      beforeAfter: "Static catalog → Lead engine",
      liveText: "Live · Q1 pipeline surge",
      img: "/images/clients/akshar-infoline.webp",
      spark: "M6 36 C 36 33, 68 24, 98 15 C 128 8, 146 6, 162 4"
    },
    {
      slug: "mend-and-mind",
      brand: "Mend & Mind",
      title: "Mend & Mind",
      sub: "Wellness Booking Portal",
      category: "Web & Mobile",
      catLabel: "Web & Mobile",
      metricVal: "3×",
      metricNum: 3,
      metricPrefix: "",
      metricSuffix: "×",
      metricDecimals: 0,
      metricLbl: "Direct online bookings",
      beforeAfter: "Phone slots → Auto booking",
      liveText: "Live · 0 slot overlaps",
      img: "/images/clients/mend-and-mind.webp",
      spark: "M6 34 C 36 28, 66 20, 96 16 C 126 12, 144 6, 162 5"
    },
    {
      slug: "solstice-arch",
      brand: "Solstice Arch",
      title: "Solstice Architecture",
      sub: "Spatial Showcase Portal",
      category: "Web & Mobile",
      catLabel: "Web & Mobile",
      metricVal: "1.2s",
      metricNum: 1.2,
      metricPrefix: "",
      metricSuffix: "s",
      metricDecimals: 1,
      metricLbl: "Sub-second load speed",
      beforeAfter: "Heavy PDFs → Live spatial UI",
      liveText: "Live · 100% mobile score",
      img: "/images/clients/solstice-arch.webp",
      spark: "M6 30 C 38 26, 68 18, 98 14 C 128 10, 144 7, 162 6"
    },
    {
      slug: "mr-education",
      brand: "M&R Education",
      title: "M&R Education",
      sub: "Admissions & Onboarding",
      category: "AI & Automation",
      catLabel: "AI & Automation",
      metricVal: "85%",
      metricNum: 85,
      metricPrefix: "",
      metricSuffix: "%",
      metricDecimals: 0,
      metricLbl: "Faster admissions",
      beforeAfter: "Paper forms → Instant enroll",
      liveText: "Live · Paperless workflow",
      img: "/images/clients/mr-education.webp",
      spark: "M6 35 C 34 27, 66 22, 98 14 C 126 9, 144 6, 162 4"
    },
    {
      slug: "zenith-ai",
      brand: "Zenith AI",
      title: "Zenith AI Broker",
      sub: "AI Lead Automation",
      category: "AI & Automation",
      catLabel: "AI & Automation",
      metricVal: "45s",
      metricNum: 45,
      metricPrefix: "",
      metricSuffix: "s",
      metricDecimals: 0,
      metricLbl: "Lead response time",
      beforeAfter: "8 hr delay → 45 sec AI reply",
      liveText: "Live · +34% close rate",
      img: "/images/clients/zenith-ai.webp",
      spark: "M6 34 C 36 24, 68 16, 98 12 C 126 9, 146 6, 162 4"
    }
  ];

  var CITY_SYSTEMS = {
    crm: {
      key: "crm",
      live: "LIVE · SALES CRM & LEAD ENGINE",
      title: "Follow-ups and WhatsApp leads in one pipeline",
      desc: "Capture portal and WhatsApp inquiries automatically, score buyer intent, assign reps in 45 seconds, and track ₹84L+ active deals with zero missed callbacks.",
      stat1Val: "31%",
      stat1Lbl: "Conversion across 128 active leads",
      stat2Val: "45s",
      stat2Lbl: "Automated WhatsApp lead routing"
    },
    erp: {
      key: "erp",
      live: "LIVE · OPERATIONS & INVENTORY ERP",
      title: "Stock, production and dispatch in one ledger",
      desc: "Raw, WIP and ready stock, purchase orders, batch tracking and quality approvals, without a spreadsheet in sight.",
      stat1Val: "Zero",
      stat1Lbl: "Stock mismatch across warehouses",
      stat2Val: "+84%",
      stat2Lbl: "Faster order-to-dispatch handoff"
    },
    hrms: {
      key: "hrms",
      live: "LIVE · WORKFORCE & HRMS CAMPUS",
      title: "Attendance, leaves and payroll running on autopilot",
      desc: "Biometric punch sync, shift rosters, one-click manager leave approvals, and paperless onboarding feeding straight into month-end payroll.",
      stat1Val: "100%",
      stat1Lbl: "Biometric & shift attendance sync",
      stat2Val: "82%",
      stat2Lbl: "Faster monthly payroll prep"
    },
    admin: {
      key: "admin",
      live: "LIVE · ADMIN CONTROL TOWER",
      title: "Owner visibility across every branch in real time",
      desc: "Granular role-based access control, automated exception alerts, and decision-ready cross-department KPIs without waiting for Friday spreadsheets.",
      stat1Val: "128",
      stat1Lbl: "Live executive reports synced",
      stat2Val: "99.9%",
      stat2Lbl: "Uptime SLA across branches"
    },
    planx: {
      key: "planx",
      live: "LIVE · PLANX AI LAB",
      title: "AI PRDs, sprint QA and delivery orchestration",
      desc: "Our internal AI engineering layer connecting Sales, Delivery, HR, Accounts, QA, and Projects with automated PRD synthesis and release tracking.",
      stat1Val: "6",
      stat1Lbl: "Departments on one AI OS",
      stat2Val: "40%",
      stat2Lbl: "Faster delivery cycle velocity"
    }
  };

  function initPortfolioDeck() {
    var root = document.getElementById("cx-deck3d-root");
    if (!root) return;

    var stage = root.querySelector("#cx-deck3d-stage");
    var dock = root.querySelector("#cx-deck3d-dock");
    var counterNum = root.querySelector("#cx-deck3d-num");
    var counterTotal = root.querySelector("#cx-deck3d-total");
    var filterBtns = Array.prototype.slice.call(root.querySelectorAll(".cx-deck3d-filter-btn"));
    var prevBtn = root.querySelector("#cx-deck3d-prev");
    var nextBtn = root.querySelector("#cx-deck3d-next");

    var currentFilter = "all";
    var filtered = PORTFOLIO_ITEMS.slice();
    var activeIdx = 0;

    function getImgSrc(item) {
      if (window.__CX_EMBEDDED_IMAGES__ && window.__CX_EMBEDDED_IMAGES__[item.slug]) {
        return window.__CX_EMBEDDED_IMAGES__[item.slug];
      }
      var base = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : ((typeof window !== "undefined" && window.__CX_BASE_URL) ? window.__CX_BASE_URL : "/");
      return base + item.img.replace(/^\/+/, "");
    }

    function animateMetric(el, item) {
      if (!el) return;
      var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || !window.gsap) {
        el.textContent = item.metricVal;
        return;
      }
      var obj = { v: 0 };
      window.gsap.to(obj, {
        v: item.metricNum,
        duration: 0.72,
        ease: "power2.out",
        onUpdate: function () {
          var formatted = item.metricDecimals > 0 ? obj.v.toFixed(item.metricDecimals) : String(Math.round(obj.v));
          el.textContent = item.metricPrefix + formatted + item.metricSuffix;
        }
      });
    }

    function renderDeck() {
      stage.innerHTML = "";
      dock.innerHTML = "";
      if (counterTotal) counterTotal.textContent = String(filtered.length);

      filtered.forEach(function (item, idx) {
        var card = document.createElement("article");
        card.className = "cx-deck3d-card";
        card.dataset.index = String(idx);
        card.innerHTML =
          '<div class="cx-deck3d-card-shell">' +
            '<div class="cx-deck3d-media">' +
              '<img src="' + getImgSrc(item) + '" alt="' + item.title + '" loading="lazy"/>' +
              '<span class="cx-deck3d-cat-pill">' + item.catLabel + '</span>' +
              '<div class="cx-deck3d-brand-overlay">' + item.brand + '</div>' +
            '</div>' +
            '<div class="cx-deck3d-body">' +
              '<h3 class="cx-deck3d-name">' + item.title + '</h3>' +
              '<p class="cx-deck3d-sub">' + item.sub + '</p>' +
              '<div class="cx-deck3d-metric-row">' +
                '<div class="cx-deck3d-metric-val" data-metric-el="true">' + item.metricVal + '</div>' +
                '<div class="cx-deck3d-metric-lbl">' + item.metricLbl + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<a class="cx-deck3d-cta-pill" href="#cx-cta-section" data-lenis-link="#cx-cta-section">Discuss similar build ↗</a>';

        card.addEventListener("click", function (e) {
          if (idx !== activeIdx) {
            e.preventDefault();
            goTo(idx);
          }
        });
        stage.appendChild(card);

        var thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "cx-deck3d-thumb";
        thumb.setAttribute("aria-label", "View " + item.title);
        thumb.innerHTML = '<img src="' + getImgSrc(item) + '" alt=""/>';
        thumb.addEventListener("click", function () {
          goTo(idx);
        });
        dock.appendChild(thumb);
      });

      layoutCards(false);
    }

    function layoutCards(shouldCount) {
      var cards = Array.prototype.slice.call(stage.querySelectorAll(".cx-deck3d-card"));
      var thumbs = Array.prototype.slice.call(dock.querySelectorAll(".cx-deck3d-thumb"));
      var n = cards.length;
      if (!n) return;

      if (counterNum) {
        counterNum.textContent = String(activeIdx + 1).padStart(2, "0");
      }

      cards.forEach(function (card, idx) {
        var rel = idx - activeIdx;
        if (rel > n / 2) rel -= n;
        if (rel < -n / 2) rel += n;

        var abs = Math.abs(rel);
        var isActive = rel === 0;
        card.classList.toggle("is-active", isActive);

        if (abs > 2) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.zIndex = "1";
          card.style.transform = "translate3d(" + (rel > 0 ? 780 : -780) + "px, 24px, -320px) rotateY(" + (rel > 0 ? -36 : 36) + "deg) scale(0.7)";
        } else if (isActive) {
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
          card.style.zIndex = "10";
          card.style.filter = "none";
          card.style.transform = "translate3d(0px, 0px, 40px) rotateY(0deg) scale(1)";
          if (shouldCount) {
            animateMetric(card.querySelector("[data-metric-el]"), filtered[idx]);
          }
        } else {
          var dir = rel > 0 ? 1 : -1;
          var tx = dir * (abs === 1 ? 490 : 800);
          var tz = abs === 1 ? -110 : -240;
          var ry = -dir * (abs === 1 ? 22 : 34);
          var sc = abs === 1 ? 0.84 : 0.72;
          card.style.opacity = abs === 1 ? "0.94" : "0.35";
          card.style.pointerEvents = abs === 1 ? "auto" : "none";
          card.style.zIndex = String(8 - abs);
          card.style.filter = abs === 1 ? "none" : "blur(1px)";
          card.style.transform = "translate3d(" + tx + "px, " + (abs * 14) + "px, " + tz + "px) rotateY(" + ry + "deg) scale(" + sc + ")";
        }
      });

      thumbs.forEach(function (t, i) {
        t.classList.toggle("is-active", i === activeIdx);
      });
    }

    function goTo(nextIdx) {
      var n = filtered.length;
      if (!n) return;
      activeIdx = ((nextIdx % n) + n) % n;
      layoutCards(true);
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter") || "all";
        if (f === currentFilter) return;
        currentFilter = f;
        filterBtns.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        filtered = f === "all"
          ? PORTFOLIO_ITEMS.slice()
          : PORTFOLIO_ITEMS.filter(function (it) { return it.category === f; });
        activeIdx = 0;
        renderDeck();
      });
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(activeIdx - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(activeIdx + 1); });

    // Drag gesture on stage
    var dragStartX = null;
    stage.addEventListener("pointerdown", function (e) {
      if (e.target.closest("a, button")) return;
      dragStartX = e.clientX;
    });
    window.addEventListener("pointerup", function (e) {
      if (dragStartX === null) return;
      var dx = e.clientX - dragStartX;
      dragStartX = null;
      if (Math.abs(dx) > 42) {
        goTo(dx < 0 ? activeIdx + 1 : activeIdx - 1);
      }
    });

    // Horizontal wheel / shift-wheel support
    var wheelLock = 0;
    stage.addEventListener("wheel", function (e) {
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) < 18) return;
      e.preventDefault();
      var now = Date.now();
      if (now - wheelLock < 340) return;
      wheelLock = now;
      goTo(delta > 0 ? activeIdx + 1 : activeIdx - 1);
    }, { passive: false });

    // Keyboard navigation when focused inside deck
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(activeIdx - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIdx + 1); }
    });

    // === 5-SECOND AUTO-SLIDER ===
    var autoTimer = null;
    var isPaused = false;
    function startAutoSlide() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        if (!isPaused && !document.hidden && filtered.length > 1) {
          goTo(activeIdx + 1);
        }
      }, 5000);
    }
    function resetAutoSlide() {
      startAutoSlide();
    }
    // Pause auto-slide ONLY when hovering over portfolio cards; resume when cursor leaves cards
    if (stage) {
      stage.addEventListener("mouseover", function (e) {
        if (e.target && e.target.closest && e.target.closest(".cx-deck3d-card")) {
          isPaused = true;
        }
      });
      stage.addEventListener("mouseout", function (e) {
        var rel = e.relatedTarget;
        if (!rel || !rel.closest || !rel.closest(".cx-deck3d-card")) {
          isPaused = false;
        }
      });
    }
    root.addEventListener("pointerdown", function () { resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener("click", resetAutoSlide);
    if (nextBtn) nextBtn.addEventListener("click", resetAutoSlide);
    filterBtns.forEach(function (b) { b.addEventListener("click", resetAutoSlide); });

    renderDeck();
    startAutoSlide();
  }

  function initBusinessCity() {
    var root = document.getElementById("cx-city-root");
    if (!root) return;

    var liveEl = root.querySelector("#cx-city-live");
    var titleEl = root.querySelector("#cx-city-title");
    var descEl = root.querySelector("#cx-city-desc");
    var stat1Val = root.querySelector("#cx-city-s1-val");
    var stat1Lbl = root.querySelector("#cx-city-s1-lbl");
    var stat2Val = root.querySelector("#cx-city-s2-val");
    var stat2Lbl = root.querySelector("#cx-city-s2-lbl");
    var flowBtn = root.querySelector("#cx-city-flow-btn");

    var triggers = Array.prototype.slice.call(root.querySelectorAll("[data-city-sys]"));

    function selectSystem(key) {
      var data = CITY_SYSTEMS[key] || CITY_SYSTEMS.erp;
      if (liveEl) liveEl.textContent = data.live;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (stat1Val) stat1Val.textContent = data.stat1Val;
      if (stat1Lbl) stat1Lbl.textContent = data.stat1Lbl;
      if (stat2Val) stat2Val.textContent = data.stat2Val;
      if (stat2Lbl) stat2Lbl.textContent = data.stat2Lbl;
      if (flowBtn) {
        flowBtn.setAttribute("data-system-flow", data.key);
        flowBtn.setAttribute("href", "#system-flow-" + data.key);
      }

      triggers.forEach(function (el) {
        var isMatch = el.getAttribute("data-city-sys") === data.key;
        el.classList.toggle("is-active", isMatch);
        if (el.tagName === "BUTTON") {
          el.setAttribute("aria-pressed", isMatch ? "true" : "false");
        }
      });
    }

    triggers.forEach(function (el) {
      var key = el.getAttribute("data-city-sys");
      el.addEventListener("click", function () { selectSystem(key); });
      el.addEventListener("mouseenter", function () { selectSystem(key); });
    });

    selectSystem("erp");
  }

  function initOrderJourney() {
    var root = document.getElementById("cx-order-root");
    if (!root) return;

    var trackPath = root.querySelector("#cx-order-main-path");
    var glowPath = root.querySelector("#cx-order-glow-path");
    var orb = root.querySelector("#cx-order-orb");
    var scrubInput = root.querySelector("#cx-order-scrub");
    var scrubFill = root.querySelector("#cx-order-scrub-fill");
    var scrubThumb = root.querySelector("#cx-order-scrub-thumb");
    var stops = Array.prototype.slice.call(root.querySelectorAll(".cx-order-stop"));
    var segs = Array.prototype.slice.call(root.querySelectorAll(".cx-order-status-seg"));

    var totalLen = trackPath && trackPath.getTotalLength ? trackPath.getTotalLength() : 1000;
    if (glowPath) {
      glowPath.style.strokeDasharray = String(totalLen);
      glowPath.style.strokeDashoffset = String(totalLen * 0.54);
    }

    function setProgress(p) {
      var clamped = Math.max(0.04, Math.min(0.98, p));
      if (glowPath) {
        glowPath.style.strokeDashoffset = String(totalLen * (1 - clamped));
      }
      if (trackPath && trackPath.getPointAtLength && orb) {
        var pt = trackPath.getPointAtLength(totalLen * clamped);
        orb.style.left = ((pt.x / 1200) * 100).toFixed(2) + "%";
        orb.style.top = ((pt.y / 480) * 100).toFixed(2) + "%";
      }
      var pct = Math.round(clamped * 100);
      if (scrubInput) scrubInput.value = String(pct);
      if (scrubFill) scrubFill.style.width = pct + "%";
      if (scrubThumb) scrubThumb.style.left = pct + "%";

      // Highlight active stop & 5-segment header pill
      var activeStopIdx = clamped < 0.28 ? 0 : clamped < 0.52 ? 1 : clamped < 0.78 ? 2 : 3;
      stops.forEach(function (s, i) {
        s.classList.toggle("is-active", i === activeStopIdx);
      });
      var litCount = Math.min(5, Math.max(1, Math.ceil(clamped * 5)));
      segs.forEach(function (seg, i) {
        seg.classList.toggle("is-lit", i < litCount);
      });
    }

    if (scrubInput) {
      scrubInput.addEventListener("input", function () {
        setProgress(Number(scrubInput.value) / 100);
      });
    }

    var stopPositions = [0.16, 0.38, 0.56, 0.84];
    stops.forEach(function (stopEl, i) {
      stopEl.addEventListener("click", function () {
        setProgress(stopPositions[i] || 0.5);
      });
    });

    // ScrollTrigger sync on desktop
    var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced && window.gsap && window.ScrollTrigger) {
      window.ScrollTrigger.create({
        trigger: root,
        start: "top 72%",
        end: "bottom 35%",
        scrub: true,
        onUpdate: function (self) {
          setProgress(0.1 + self.progress * 0.82);
        }
      });
    }

    setProgress(0.41);
  }


  // === ROUND3_SLIDING_FILTERS_AND_3D_STACK ===
  function initSlidingFilterPills() {
    var groups = Array.prototype.slice.call(
      document.querySelectorAll(".cx-deck3d-filters, .cx-ba3d-tabs, .cx-city-pills")
    );
    groups.forEach(function (group) {
      if (group.dataset.cxSlidingInit === "1") return;
      group.dataset.cxSlidingInit = "1";
      group.classList.add("cx-has-sliding-pill");

      var glider = document.createElement("span");
      glider.className = "cx-sliding-pill-glider";
      glider.setAttribute("aria-hidden", "true");
      group.insertBefore(glider, group.firstChild);

      function positionGlider(immediate) {
        var active = group.querySelector(".is-active");
        if (!active) return;
        if (immediate) glider.style.transition = "none";
        glider.style.width = active.offsetWidth + "px";
        glider.style.height = active.offsetHeight + "px";
        glider.style.transform = "translate3d(" + active.offsetLeft + "px, " + active.offsetTop + "px, 0)";
        if (immediate) {
          glider.offsetHeight;
          glider.style.transition = "";
        }
      }

      // Re-position whenever any button inside the group is clicked or class changes
      group.addEventListener("click", function () {
        requestAnimationFrame(function () { positionGlider(false); });
      });
      var obs = new MutationObserver(function () {
        positionGlider(false);
      });
      obs.observe(group, { attributes: true, subtree: true, attributeFilter: ["class"] });
      window.addEventListener("resize", function () { positionGlider(true); }, { passive: true });
      requestAnimationFrame(function () { positionGlider(true); });
      setTimeout(function () { positionGlider(true); }, 250);
    });
  }

  function initHero3DScrollStack() {
    return; // Handled by pinned ScrollTrigger + clickable 6-step controller
    var section = document.getElementById("hero-3d");
    if (!section) return;
    var iso = section.querySelector(".cx-lsh-v2-iso");
    var planes = Array.prototype.slice.call(section.querySelectorAll(".cx-lsh-v2-plane"));
    var beams = Array.prototype.slice.call(section.querySelectorAll(".cx-lsh-beam"));
    var labels = Array.prototype.slice.call(section.querySelectorAll(".cx-lsh-v2-label-row"));
    var events = Array.prototype.slice.call(section.querySelectorAll(".cx-lsh-event"));
    var steps = Array.prototype.slice.call(section.querySelectorAll("#cx-hero-stepper .cx-lsh-step"));
    var chips = Array.prototype.slice.call(section.querySelectorAll("#cx-hero-chips .cx-lsh-v2-chip"));
    var progBar = document.getElementById("cx-hero-prog");
    var dots = section.querySelector(".cx-lsh-dots-bg");
    if (!iso || planes.length < 5) return;

    var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    var currentP = 0;
    var targetP = 0;
    var manualStepLockUntil = 0;

    function applyStackProgress(p) {
      var clamped = Math.max(0, Math.min(1, p));
      // Smooth isometric tilt from flatter (30deg / -14deg) into full 3D (55deg / -36deg)
      var rx = 30 + clamped * 25;
      var rz = -14 - clamped * 22;
      iso.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateZ(" + rz.toFixed(2) + "deg)";

      if (dots) {
        dots.style.transform = "translate3d(0, " + (-clamped * 34).toFixed(1) + "px, 0)";
      }

      // Sequential 3D stacking up on scroll down, reversing smoothly on scroll up
      planes.forEach(function (plane, i) {
        var layerStart = i * 0.12;
        var layerSpan = 0.42;
        var lp = Math.max(0, Math.min(1, (clamped - layerStart) / layerSpan));
        // Ease out cubic
        var eased = 1 - Math.pow(1 - lp, 3);
        var zBase = i * 10;
        var zTarget = i * 68;
        var z = zBase + (zTarget - zBase) * eased;
        var sc = 0.92 + 0.08 * eased;
        var op = i === 0 ? 1 : (0.18 + 0.82 * eased);
        plane.style.transform = "translate3d(0, 0, " + z.toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
        plane.style.opacity = op.toFixed(3);
        plane.classList.toggle("is-lit", lp > 0.35 || i === 0);
      });

      // Vertical corner beams stretch as layers stack up
      beams.forEach(function (b) {
        var bp = Math.max(0, Math.min(1, (clamped - 0.08) / 0.55));
        b.style.transform = "rotateX(-90deg) scaleY(" + bp.toFixed(3) + ")";
        b.style.opacity = bp.toFixed(3);
      });

      // Right-side pill labels glide in sequentially (DOM order is top->bottom: 4..0)
      labels.forEach(function (lbl) {
        var li = Number(lbl.getAttribute("data-lbl-idx"));
        var lp = Math.max(0, Math.min(1, (clamped - li * 0.12) / 0.35));
        lbl.style.opacity = (0.15 + 0.85 * lp).toFixed(3);
        lbl.style.transform = "translateX(" + ((1 - lp) * 18).toFixed(1) + "px)";
        lbl.classList.toggle("is-lit", lp > 0.45);
      });

      // Floating live business event cards appear smoothly as top layers stack
      events.forEach(function (ev, idx) {
        var ep = Math.max(0, Math.min(1, (clamped - (0.35 + idx * 0.12)) / 0.28));
        ev.style.opacity = ep.toFixed(3);
        ev.style.transform = "translateY(" + ((1 - ep) * 16).toFixed(1) + "px) scale(" + (0.92 + 0.08 * ep).toFixed(3) + ")";
      });

      if (Date.now() > manualStepLockUntil) {
        var stepIdx = Math.min(5, Math.floor(clamped * 6));
        steps.forEach(function (b, i) { b.classList.toggle("is-active", i === stepIdx); });
        chips.forEach(function (c) {
          var ci = Number(c.getAttribute("data-step"));
          c.classList.toggle("is-lit", stepIdx >= ci);
        });
        if (progBar) {
          progBar.style.transform = "scaleX(" + Math.max(1 / 6, (stepIdx + 1) / 6).toFixed(4) + ")";
        }
      }
    }

    function computeScrollProgress() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || 900;
      // Progress goes 0 -> 1 as section enters from bottom (top = 0.85*vh) through center/top (top = -0.15*vh)
      var startY = vh * 0.85;
      var endY = -vh * 0.12;
      var raw = (startY - rect.top) / (startY - endY);
      return Math.max(0, Math.min(1, raw));
    }

    function tick() {
      targetP = computeScrollProgress();
      currentP += (targetP - currentP) * 0.14;
      if (Math.abs(targetP - currentP) < 0.0005) currentP = targetP;
      applyStackProgress(currentP);
      requestAnimationFrame(tick);
    }

    // Clicking a step temporarily highlights that layer height
    steps.forEach(function (b) {
      b.addEventListener("click", function () {
        manualStepLockUntil = Date.now() + 2500;
      });
    });

    currentP = computeScrollProgress();
    applyStackProgress(currentP);
    requestAnimationFrame(tick);
  }

  function boot() {
    initPortfolioDeck();
    initBusinessCity();
    initOrderJourney();
    initSlidingFilterPills();
    initHero3DScrollStack();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

(function () {
  // 1) Interactive 03-hero controls (rAF-throttled pointer tilt + glare + sliding 6-step rail + smooth GPU 3D stack)
  var stage = document.getElementById("cx-hero-stage");
  if (stage) {
    var stageRect = null;
    var pointerRaf = 0;
    var lastPointerEvent = null;
    stage.addEventListener("pointerenter", function () {
      stageRect = stage.getBoundingClientRect();
    }, { passive: true });
    stage.addEventListener("pointermove", function (e) {
      lastPointerEvent = e;
      if (pointerRaf) return;
      pointerRaf = requestAnimationFrame(function () {
        pointerRaf = 0;
        if (!lastPointerEvent) return;
        var r = stageRect || (stageRect = stage.getBoundingClientRect());
        if (!r.width || !r.height) return;
        var nx = ((lastPointerEvent.clientX - r.left) / r.width - 0.5) * 2;
        var ny = ((lastPointerEvent.clientY - r.top) / r.height - 0.5) * 2;
        stage.style.setProperty("--cx-tilt-x", (-ny * 5.0).toFixed(2) + "deg");
        stage.style.setProperty("--cx-tilt-y", (nx * 6.0).toFixed(2) + "deg");
        stage.style.setProperty("--cx-glare-x", (50 + nx * 38).toFixed(1) + "%");
        stage.style.setProperty("--cx-glare-y", (50 + ny * 38).toFixed(1) + "%");
      });
    }, { passive: true });
    stage.addEventListener("pointerleave", function () {
      stageRect = null;
      stage.style.setProperty("--cx-tilt-x", "0deg");
      stage.style.setProperty("--cx-tilt-y", "0deg");
    }, { passive: true });
    window.addEventListener("resize", function () { stageRect = null; }, { passive: true });
  }
  var heroSection = document.getElementById("engineered-impact-section") || document.getElementById("hero-3d");
  var heroIso = document.querySelector("#hero-3d .cx-lsh-v2-iso");
  var heroStepperTrack = document.querySelector("#cx-hero-stepper .cx-lsh-stepper-track");
  var heroChipsWrap = document.getElementById("cx-hero-chips");
  var heroSteps = document.querySelectorAll("#cx-hero-stepper .cx-lsh-step");
  var heroChips = document.querySelectorAll("#cx-hero-chips .cx-lsh-v2-chip");
  var heroPlanes = document.querySelectorAll("#hero-3d .cx-lsh-v2-plane");
  var heroLbls = document.querySelectorAll("#hero-3d .cx-lsh-v2-label-row");
  var heroEvents = document.querySelectorAll("#hero-3d .cx-lsh-event");
  var heroBeams = document.querySelectorAll("#hero-3d .cx-lsh-beam");
  var heroProg = document.getElementById("cx-hero-prog");
  var layerZ = [0, 50, 100, 150, 200];
  var currentHeroStep = -1;
  var heroST = null;
  var manualLockUntil = 0;

  // Create smooth GPU sliding gliders for both the 6-step bottom rail and the 5 layer chips
  var stepGlider = null;
  if (heroStepperTrack) {
    heroStepperTrack.classList.add("cx-lsh-has-glider");
    stepGlider = heroStepperTrack.querySelector(".cx-lsh-step-glider");
    if (!stepGlider) {
      stepGlider = document.createElement("span");
      stepGlider.className = "cx-lsh-step-glider";
      stepGlider.setAttribute("aria-hidden", "true");
      heroStepperTrack.insertBefore(stepGlider, heroStepperTrack.firstChild);
    }
  }
  var chipGlider = null;
  if (heroChipsWrap) {
    heroChipsWrap.classList.add("cx-lsh-chips-has-glider");
    chipGlider = heroChipsWrap.querySelector(".cx-lsh-chip-glider");
    if (!chipGlider) {
      chipGlider = document.createElement("span");
      chipGlider.className = "cx-lsh-chip-glider";
      chipGlider.setAttribute("aria-hidden", "true");
      heroChipsWrap.insertBefore(chipGlider, heroChipsWrap.firstChild);
    }
  }

  function positionHeroGliders(immediate) {
    if (stepGlider && heroStepperTrack) {
      var activeStep = heroStepperTrack.querySelector(".cx-lsh-step.is-active");
      if (activeStep) {
        if (immediate) stepGlider.style.transition = "none";
        stepGlider.style.width = activeStep.offsetWidth + "px";
        stepGlider.style.height = activeStep.offsetHeight + "px";
        stepGlider.style.transform = "translate3d(" + activeStep.offsetLeft + "px, " + activeStep.offsetTop + "px, 0)";
        stepGlider.style.opacity = "1";
        if (immediate) {
          stepGlider.offsetHeight;
          stepGlider.style.transition = "";
        }
      }
    }
    if (chipGlider && heroChipsWrap) {
      var activeChip = heroChipsWrap.querySelector(".cx-lsh-v2-chip.is-focused");
      if (activeChip) {
        if (immediate) chipGlider.style.transition = "none";
        chipGlider.style.width = activeChip.offsetWidth + "px";
        chipGlider.style.height = activeChip.offsetHeight + "px";
        chipGlider.style.transform = "translate3d(" + activeChip.offsetLeft + "px, " + activeChip.offsetTop + "px, 0)";
        chipGlider.style.opacity = "1";
        if (immediate) {
          chipGlider.offsetHeight;
          chipGlider.style.transition = "";
        }
      }
    }
  }
  window.addEventListener("resize", function () { positionHeroGliders(true); }, { passive: true });

  function setHeroStep(idx, syncScroll) {
    idx = Math.max(0, Math.min(5, idx));
    if (idx === currentHeroStep && !syncScroll) return;
    currentHeroStep = idx;
    var visibleUpTo = Math.min(4, idx);

    if (heroIso) {
      var rx = idx === 0 ? 46 : 53;
      var rz = idx === 0 ? -28 : -35;
      heroIso.style.transform = "rotateX(" + rx + "deg) rotateZ(" + rz + "deg)";
    }

    heroSteps.forEach(function (b, i) { b.classList.toggle("is-active", i === idx); });

    heroPlanes.forEach(function (p) {
      var li = Number(p.getAttribute("data-layer-idx"));
      var show = li <= visibleUpTo;
      var focused = li === visibleUpTo;
      p.classList.toggle("is-lit", show);
      p.classList.toggle("is-focused", focused);
      p.style.opacity = show ? "1" : "0";
      p.style.pointerEvents = show ? "auto" : "none";
      var zPos = show ? layerZ[li] : Math.max(0, layerZ[li] - 28);
      p.style.transform = "translate3d(0px, 0px, " + zPos + "px)" + (focused ? " scale(1.018)" : " scale(1)");
    });

    heroLbls.forEach(function (l) {
      var li = Number(l.getAttribute("data-lbl-idx"));
      var show = li <= visibleUpTo;
      var focused = li === visibleUpTo;
      l.classList.toggle("is-lit", show);
      l.classList.toggle("is-focused", focused);
      l.style.opacity = show ? "1" : "0.28";
      l.style.transform = show ? "translate3d(0px, 0px, 0px)" : "translate3d(10px, 0px, 0px)";
    });

    heroChips.forEach(function (c) {
      var li = Number(c.getAttribute("data-step"));
      c.classList.toggle("is-lit", li <= visibleUpTo);
      c.classList.toggle("is-focused", li === visibleUpTo);
    });

    heroBeams.forEach(function (b) {
      b.style.opacity = visibleUpTo > 0 ? "1" : "0.22";
    });

    heroEvents.forEach(function (ev, ei) {
      var showEv = idx >= 5 || (idx >= 4 && ei === 0) || (idx >= 2 && ei === 1) || (idx >= 1 && ei === 2);
      ev.style.opacity = showEv ? "1" : "0";
      ev.style.transform = showEv ? "translate3d(0px, 0px, 0px) scale(1)" : "translate3d(0px, 14px, 0px) scale(0.94)";
    });

    if (heroProg) heroProg.style.transform = "scaleX(" + ((idx + 1) / 6).toFixed(4) + ")";

    // Smoothly glide both active indicators
    positionHeroGliders(false);

    if (syncScroll) {
      manualLockUntil = Date.now() + 850;
      if (heroST && window.innerWidth >= 1120) {
        var tp = (idx + 0.5) / 6;
        var targetY = heroST.start + tp * (heroST.end - heroST.start);
        if (window.__cxLenis && typeof window.__cxLenis.scrollTo === "function") {
          window.__cxLenis.scrollTo(targetY, { duration: 0.65, immediate: false });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    }
  }

  heroSteps.forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setHeroStep(Number(b.getAttribute("data-step")), true);
    });
  });
  heroChips.forEach(function (c) {
    c.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setHeroStep(Number(c.getAttribute("data-step")), true);
    });
  });
  heroLbls.forEach(function (l) {
    l.setAttribute("role", "button");
    l.setAttribute("tabindex", "0");
    l.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setHeroStep(Number(l.getAttribute("data-lbl-idx")), true);
    });
    l.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setHeroStep(Number(l.getAttribute("data-lbl-idx")), true);
      }
    });
  });

  // Start collapsed at Step 01 until user reaches the full section
  setHeroStep(0, false);
  requestAnimationFrame(function () { positionHeroGliders(true); });
  setTimeout(function () { positionHeroGliders(true); }, 250);

  // Pin & freeze screen ONLY when section covers full viewport, scrubbing all 6 steps smoothly without double-scrub lag
  function bindHeroPin() {
    if (!heroSection || window.innerWidth < 1120 || !window.gsap || !window.ScrollTrigger) return;
    if (heroST) { try { heroST.kill(); } catch (e) {} }
    heroST = window.ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "+=260%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        if (Date.now() < manualLockUntil) return;
        var nextIdx = Math.min(5, Math.floor(self.progress * 6));
        if (nextIdx !== currentHeroStep) {
          setHeroStep(nextIdx, false);
        }
      }
    });
  }
  if (document.readyState === "complete") {
    setTimeout(bindHeroPin, 150);
  } else {
    window.addEventListener("load", function () { setTimeout(bindHeroPin, 150); });
  }
  var outcomes = ["You Achieve More.", "You Ship Faster.", "You Spend Less.", "You See Clearer."];
  var oIdx = 0;
  var cycleEl = document.getElementById("cx-hero-cycle");
  setInterval(function () {
    if (!cycleEl) return;
    oIdx = (oIdx + 1) % outcomes.length;
    cycleEl.textContent = outcomes[oIdx];
  }, 3200);

  // 2) Interactive 02-problems 3D split scene slider
  var baScenes = [
    {
      sheets: ["STOCK_FINAL_v4.xlsx", "STORE_B_COPY(2).xlsx", "EXCEL STOCK SHEET — FINAL_V4.XLSX", "Vendor_PO_old.xlsx", "audit_march_FINAL_final.xlsx"],
      rows: [["KRT-101","48","—","48 ?"],["KRT-102","12","12","#N/A"],["DNM-032","0","31","#N/A"],["SHT-204","76","70","76"],["TEE-310","—","—","#N/A"],["SAR-018","9","14","9 ?"]],
      waFrom: "Store A · WhatsApp", waMsg: "bhai stock kitna hai? 😩", sticky: "Ask Ramesh for count!!",
      errTop: "Weekly audit delays", errBot: "Store A: 148 SKUs out of sync",
      kpis: [["1.8k","Total SKUs tracked"],["82%","Stock accuracy gain"],["14","Automated reorder rules"],["36","Vendor POs synced"]],
      layers: ["Live dashboard","Reorder automation","Every store, one ledger"],
      poOk: "✓ PO sent", poBig: "36 vendors", poSub: "auto-synced today",
      sOld: "Weekly audit delays", sNew: "Real-time multi-store visibility"
    },
    {
      sheets: ["PORTAL_LEADS_v9.xlsx", "99ACRES_EXPORT(3).xlsx", "AGENT LEAD SHEET — FINAL_V4.XLSX", "Tower_Units_old.xlsx", "site_visits_FINAL_final.xlsx"],
      rows: [["LD-401","99acres","—","48h ?"],["LD-402","MagicBrk","R. Shah","#N/A"],["LD-403","WhatsApp","—","#N/A"],["LD-404","Walk-in","A. Patel","Called"],["LD-405","99acres","—","#N/A"],["LD-406","Referral","M. Joshi","Lost ?"]],
      waFrom: "Broker Group · WhatsApp", waMsg: "2BHK brochure kisko bheja? 😩", sticky: "Call back Mehta ji!!",
      errTop: "48h+ lead response gap", errBot: "23 unassigned buyer inquiries",
      kpis: [["1.8k","Active buyer leads"],["82%","Contacted within 15m"],["14","Site visits scheduled"],["36","Proposals issued"]],
      layers: ["Live CRM board","Auto lead routing","Every tower, one ledger"],
      poOk: "✓ Assigned", poBig: "14 visits", poSub: "scheduled automatically",
      sOld: "48h+ lead response gap", sNew: "Contacted within 15 minutes"
    },
    {
      sheets: ["QUOTES_Q3_v6.xlsx", "PIPELINE_COPY(2).xlsx", "EXCEL PIPELINE — FINAL_V4.XLSX", "Followups_old.xlsx", "revenue_FINAL_final.xlsx"],
      rows: [["QT-118","K. Mehta","₹2.4L","Overdue ?"],["QT-119","—","₹1.8L","#N/A"],["QT-120","S. Nair","—","#N/A"],["QT-121","P. Desai","₹4.1L","Sent"],["QT-122","—","—","#N/A"],["QT-123","K. Mehta","₹95k","Stale ?"]],
      waFrom: "Sales Ops · WhatsApp", waMsg: "quote approve hua kya sir? 😩", sticky: "Friday callback missed!!",
      errTop: "Forgotten Friday callbacks", errBot: "₹18.4L quotes stuck in chat",
      kpis: [["1.8k","Follow-ups tracked"],["82%","Pipeline velocity"],["14","Connected lead channels"],["36","Quotes approved"]],
      layers: ["Live sales panel","Quote automation","Every deal, one pipeline"],
      poOk: "✓ Approved", poBig: "36 quotes", poSub: "auto-followed up today",
      sOld: "Forgotten Friday callbacks", sNew: "Structured lead-to-order stages"
    },
    {
      sheets: ["SHIFT_ROSTER_v5.xlsx", "BIOMETRIC_USB(2).xlsx", "EXCEL SHIFT ROSTER — FINAL_V4.XLSX", "Leave_Log_old.xlsx", "payroll_march_FINAL.xlsx"],
      rows: [["EMP-21","Day-A","4.5","Err ?"],["EMP-22","Night","—","#N/A"],["EMP-23","Day-B","#REF!","#N/A"],["EMP-24","Day-A","2.0","OK"],["EMP-25","—","—","#N/A"],["EMP-26","Night","6.0","Unlog ?"]],
      waFrom: "HR Desk · WhatsApp", waMsg: "kal leave approve kar do pls 😩", sticky: "Fix OT formula before 1st!!",
      errTop: "Overtime formula errors", errBot: "42 unlogged shift swaps",
      kpis: [["1.8k","Attendance logs synced"],["82%","Faster payroll prep"],["14","Department workflows"],["36","Configured role policies"]],
      layers: ["Live HRMS portal","Leave & payroll rules","Every shift, one ledger"],
      poOk: "✓ Payroll synced", poBig: "1.8k logs", poSub: "biometric-verified today",
      sOld: "Overtime formula errors", sNew: "Zero errors at month-end payroll"
    },
    {
      sheets: ["WIP_BATCHES_v7.xlsx", "FLOOR_SHEET(2).xlsx", "FACTORY WIP SHEET — FINAL_V4.XLSX", "Gate_Pass_old.xlsx", "dispatch_FINAL_final.xlsx"],
      rows: [["B-428","Steel","—","Hold ?"],["B-429","Coil","62%","#N/A"],["B-430","—","—","#N/A"],["B-431","Sheet","100%","OK"],["B-432","Tube","—","#N/A"],["B-433","Steel","40%","Lag ?"]],
      waFrom: "Plant Floor · WhatsApp", waMsg: "batch #428 ready hua kya? 😩", sticky: "Check gate challan #14!!",
      errTop: "Pending PO approvals", errBot: "Batch #428 status unknown",
      kpis: [["1.8k","Work orders digitized"],["82%","Order-to-dispatch speed"],["14","Live production lines"],["36","Daily dispatches verified"]],
      layers: ["Live factory ERP","Stage-gate QA rules","Raw, WIP & ready ledger"],
      poOk: "✓ Dispatched", poBig: "36 trucks", poSub: "gate-verified today",
      sOld: "Pending PO approvals", sNew: "Full PO-to-dispatch traceability"
    },
    {
      sheets: ["BRANCH_KPI_v8.xlsx", "ACCOUNTS_COPY(3).xlsx", "DEPT REPORTS — FINAL_V4.XLSX", "Margin_old.xlsx", "board_deck_FINAL_final.xlsx"],
      rows: [["AMD-HQ","₹42L","—","Lag ?"],["SUR-02","₹18L","#DIV/0","#N/A"],["VAD-03","—","14%","#N/A"],["RAJ-04","₹26L","19%","OK"],["MUM-05","—","—","#N/A"],["PUN-06","₹31L","11%","Old ?"]],
      waFrom: "Branch Ops · WhatsApp", waMsg: "final_v4 bhej diya check karo 😩", sticky: "Numbers don't match Tally!!",
      errTop: "3-day lag on branch KPIs", errBot: "6 conflicting dept sheets",
      kpis: [["1.8k","Daily operations logged"],["82%","Faster exec decisions"],["14","Live branch dashboards"],["36","Automated KPI reports"]],
      layers: ["Executive Admin OS","Exception alert rules","Every branch, one truth"],
      poOk: "✓ Board synced", poBig: "14 branches", poSub: "live KPI feed active",
      sOld: "3-day lag on branch KPIs", sNew: "Decision-ready live analytics"
    }
  ];

  var baCard = document.getElementById("cx-ba-card");
  var baChaos = document.getElementById("cx-ba-chaos");
  var baKpis = document.getElementById("cx-ba-kpis");
  var baCallouts = document.getElementById("cx-ba-callouts");
  var baScrub = document.getElementById("cx-ba-scrub-input");
  var baFill = document.getElementById("cx-ba-scrub-fill");
  var baThumb = document.getElementById("cx-ba-scrub-thumb");

  var currentSplit = 50;
  var targetSplit = 50;
  var splitRaf = null;

  function renderSplitFrame(val) {
    if (baCard) {
      baCard.style.setProperty("--cx-ba-split", val.toFixed(2) + "%");
      baCard.style.setProperty("--cx-ba-shift", ((val - 50) / 50).toFixed(4));
    }
    if (baScrub && document.activeElement !== baScrub) baScrub.value = String(Math.round(val));
    if (baFill) baFill.style.width = (100 - val).toFixed(2) + "%";
    if (baThumb) baThumb.style.left = val.toFixed(2) + "%";
  }

  function tickSplit() {
    var diff = targetSplit - currentSplit;
    if (Math.abs(diff) > 0.04) {
      currentSplit += diff * 0.24;
      renderSplitFrame(currentSplit);
      splitRaf = requestAnimationFrame(tickSplit);
    } else {
      currentSplit = targetSplit;
      renderSplitFrame(currentSplit);
      splitRaf = null;
    }
  }

  function setSplit(pct) {
    targetSplit = Math.max(8, Math.min(92, pct));
    if (!splitRaf) {
      splitRaf = requestAnimationFrame(tickSplit);
    }
  }

  function renderBaScene(idx) {
    var s = baScenes[idx] || baScenes[0];
    var sheetsHtml = s.sheets.map(function (title, si) {
      var rowsHtml = s.rows.map(function (r) {
        return '<div class="cx-ba3d-sheet-row">' + r.map(function (cell, ci) {
          var err = ci > 0 && (cell === "#N/A" || cell === "—" || cell.indexOf("?") > -1 || cell.charAt(0) === "#");
          return '<span class="cx-ba3d-cell' + (err ? ' is-err' : '') + '">' + cell + '</span>';
        }).join("") + '</div>';
      }).join("");
      return '<div class="cx-ba3d-sheet cx-ba3d-sheet--' + (si + 1) + '"><div class="cx-ba3d-sheet-title">' + title + '</div><div class="cx-ba3d-sheet-grid">' + rowsHtml + '</div></div>';
    }).join("");
    if (baChaos) {
      baChaos.innerHTML = sheetsHtml +
        '<div class="cx-ba3d-wa-bubble cx-wa-mini cx-wa-mini--chaos">' +'<div class="cx-wa-mini-hd"><span class="cx-wa-mini-av"><svg class="cx-wa-ico" viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.01c-.25.7-1.44 1.34-2 1.42-.51.08-1.17.11-1.89-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.37-5.15-4.57-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.69.52.25.6.85 2.08.93 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.32-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.45 1.51.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.23.58.35.08.13.08.73-.17 1.43z"/></svg></span>' +'<div class="cx-wa-mini-meta"><span class="cx-wa-mini-name">' + s.waFrom.replace(' · WhatsApp', '') + '</span><span class="cx-wa-mini-status">WhatsApp</span></div></div>' +'<div class="cx-wa-mini-body"><div class="cx-wa-msg cx-wa-msg--in">' + s.waMsg + '<span class="cx-wa-time">11:08</span></div></div></div>' +
        '<div class="cx-ba3d-sticky"><span class="cx-ba3d-pin"></span><p>' + s.sticky + '</p></div>' +
        '<div class="cx-ba3d-err-pill cx-ba3d-err-pill--top">' + s.errTop + '</div>' +
        '<div class="cx-ba3d-err-pill cx-ba3d-err-pill--bot">' + s.errBot + '</div>' +'<div class="cx-ba3d-sheet cx-ba3d-sheet--6"><div class="cx-ba3d-sheet-title">GST_mismatch_v2.xlsx</div><div class="cx-ba3d-sheet-grid">' + s.rows.map(function(r){return '<div class="cx-ba3d-sheet-row">'+r.map(function(c,ci){return '<span class="cx-ba3d-cell'+(ci>0&&(c==="#N/A"||c==="—"||c.indexOf("?")>-1)?' is-err':'')+'">'+c+'</span>';}).join('')+'</div>';}).join('') + '</div></div>' +'<div class="cx-ba3d-sheet cx-ba3d-sheet--7"><div class="cx-ba3d-sheet-title">WhatsApp_Orders_March.xlsx</div><div class="cx-ba3d-sheet-grid">' + s.rows.map(function(r){return '<div class="cx-ba3d-sheet-row">'+r.map(function(c,ci){return '<span class="cx-ba3d-cell'+(ci>0&&(c==="#N/A"||c==="—"||c.indexOf("?")>-1)?' is-err':'')+'">'+c+'</span>';}).join('')+'</div>';}).join('') + '</div></div>' +'<div class="cx-ba3d-sheet cx-ba3d-sheet--8"><div class="cx-ba3d-sheet-title">Manual_Reconcile_OLD.xlsx</div><div class="cx-ba3d-sheet-grid">' + s.rows.map(function(r){return '<div class="cx-ba3d-sheet-row">'+r.map(function(c,ci){return '<span class="cx-ba3d-cell'+(ci>0&&(c==="#N/A"||c==="—"||c.indexOf("?")>-1)?' is-err':'')+'">'+c+'</span>';}).join('')+'</div>';}).join('') + '</div></div>' +'<div class="cx-ba3d-sticky cx-ba3d-sticky--2"><span class="cx-ba3d-pin"></span><p>Re-check Store B stock!!</p></div>' +'<div class="cx-ba3d-err-pill cx-ba3d-err-pill--right">3 versions circulated on chat</div>';
    }
    if (baKpis) {
      baKpis.innerHTML = s.kpis.map(function (k) {
        return '<div class="cx-ba3d-kpi-cell"><strong>' + k[0] + '</strong><span>' + k[1] + '</span></div>';
      }).join("");
    }
    if (baCallouts) {
      baCallouts.innerHTML = s.layers.map(function (l) {
        return '<div class="cx-ba3d-callout-row"><span class="cx-ba3d-callout-line"></span><span class="cx-ba3d-callout-pill">' + l + '</span></div>';
      }).join("");
    }
    var _baEl;
    if ((_baEl = document.getElementById("cx-ba-po-ok"))) _baEl.textContent = s.poOk;
    if ((_baEl = document.getElementById("cx-ba-po-big"))) _baEl.textContent = s.poBig;
    if ((_baEl = document.getElementById("cx-ba-po-sub"))) _baEl.textContent = s.poSub;
    if ((_baEl = document.getElementById("cx-ba-strike-old"))) _baEl.textContent = s.sOld;
    if ((_baEl = document.getElementById("cx-ba-strike-new"))) _baEl.textContent = s.sNew;
  }

  var dragging = false;
  if (baCard) {
    baCard.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      dragging = true;
      try { baCard.setPointerCapture(e.pointerId); } catch (err) {}
      var r = baCard.getBoundingClientRect();
      setSplit(((e.clientX - r.left) / r.width) * 100);
    });
    baCard.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var r = baCard.getBoundingClientRect();
      setSplit(((e.clientX - r.left) / r.width) * 100);
    });
    baCard.addEventListener("pointerup", function (e) {
      dragging = false;
      try { baCard.releasePointerCapture(e.pointerId); } catch (err) {}
    });
    baCard.addEventListener("pointercancel", function () { dragging = false; });
  }
  if (baScrub) {
    baScrub.addEventListener("input", function () { setSplit(Number(baScrub.value)); });
  }
  document.querySelectorAll("#cx-ba-tabs .cx-bas-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("#cx-ba-tabs .cx-bas-tab").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      renderBaScene(Number(btn.getAttribute("data-ba-idx")));
    });
  });
  renderBaScene(0);
})();

(function() {
  var stages = [["01", "Business Understanding", "Discovery", "Understand business objectives, challenges, stakeholders, and project goals.", ["Business objectives", "Success criteria", "Stakeholder alignment", "Current challenges", "Strategic priorities"], "Clear project direction and business alignment."], ["02", "Business Understanding", "Business Process Understanding", "Analyze how work currently flows through the organization.", ["Existing workflows", "Team interactions", "Operational bottlenecks", "Manual processes", "Decision points"], "Complete visibility into current-state operations."], ["03", "Business Understanding", "AI Opportunity Mapping", "Identify where AI can create measurable business value \u2014 and where it should not be used.", ["Repetitive tasks", "Data-heavy processes", "Reporting workflows", "Knowledge management", "Decision support"], "Clear understanding of AI opportunities and limitations."], ["04", "Design & Build", "Architecture", "Design the technical foundation required to support long-term business goals.", ["Scalability", "API Connectivity", "Data flow", "Security", "Future growth"], "A solution architecture aligned with business needs."], ["05", "Design & Build", "UI/UX Design", "Create experiences that fit how teams actually work.", ["User journeys", "Operational workflows", "Efficiency", "Usability", "Adoption"], "Interfaces designed around real users and real processes."], ["06", "Design & Build", "Development", "Build the solution using validated requirements and architecture.", ["Core functionality", "API Connectivity", "Automation", "AI implementation", "Performance"], "Reliable software aligned with project goals."], ["07", "Deliver & Evolve", "Quality Assurance", "Validate that the solution performs as intended.", ["Functionality", "Workflow testing", "Edge cases", "Performance", "User acceptance"], "Confidence before deployment."], ["08", "Deliver & Evolve", "Deployment", "Launch the solution smoothly with minimal disruption.", ["Rollout planning", "Data migration", "Team readiness", "Training", "Launch support"], "Successful transition into production."], ["09", "Deliver & Evolve", "Support & Continuous Improvement", "Ensure the solution evolves alongside the business.", ["Monitoring", "Enhancements", "Process optimization", "New opportunities", "Long-term scalability"], "Technology that continues delivering value over time."]];
  var listEl = document.getElementById("cx-method-list");
  var cardEl = document.getElementById("cx-method-card");
  if (!listEl || !cardEl) return;
  function selectStage(idx) {
    var s = stages[idx] || stages[0];
    Array.prototype.forEach.call(listEl.children, function(b, i) {
      var on = i === idx;
      b.style.background = on ? "#060821" : "#ffffff";
      b.style.color = on ? "#ffffff" : "#060821";
      b.style.borderColor = on ? "#060821" : "rgba(6,8,33,0.08)";
    });
    cardEl.innerHTML =
      '<div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0170ba;margin-bottom:8px;">STAGE ' + s[0] + ' · ' + s[1] + '</div>' +
      '<h3 style="font-family:var(--font-display);font-size:28px;font-weight:700;color:#060821;margin:0 0 12px;">' + s[2] + '</h3>' +
      '<p style="font-size:15.5px;line-height:1.65;color:#546078;margin:0 0 22px;">' + s[3] + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">' +
        s[4].map(function(f) { return '<span style="padding:7px 14px;border-radius:999px;background:#eef6fd;color:#060821;font-size:13px;font-weight:600;">✓ ' + f + '</span>'; }).join("") +
      '</div>' +
      '<div style="padding:16px 20px;border-radius:16px;background:#f4f9fe;border:1px solid rgba(25,152,220,0.18);">' +
        '<div style="font-size:11px;font-weight:800;letter-spacing:0.08em;color:#0170ba;text-transform:uppercase;margin-bottom:4px;">STAGE OUTCOME</div>' +
        '<div style="font-size:15px;font-weight:600;color:#060821;">' + s[5] + '</div>' +
      '</div>';
  }
  stages.forEach(function(s, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.style.cssText = "text-align:left;padding:12px 16px;border-radius:14px;border:1px solid rgba(6,8,33,0.08);background:#fff;cursor:pointer;font-family:var(--font-display);font-size:13.5px;font-weight:600;transition:all 0.2s ease;";
    btn.innerHTML = '<span style="opacity:0.65;margin-right:8px;">' + s[0] + '</span>' + s[2];
    btn.addEventListener("click", function() { selectStage(i); });
    listEl.appendChild(btn);
  });
  selectStage(0);
})();

/* === cx-v6-redesign-script === */
(function () {
  function initProblemsSolvedTracker() {
    var items = Array.prototype.slice.call(document.querySelectorAll("#problems-solved-section .cx-ps-item"));
    var counterEl = document.getElementById("cx-ps-counter");
    var arcEl = document.getElementById("cx-ps-dial-arc");
    if (!items.length || !counterEl) return;

    var total = items.length;
    var circumference = 2 * Math.PI * 26;

    function setActive(idx) {
      counterEl.textContent = idx + "/" + total;
      if (arcEl) {
        var frac = Math.max(1, Math.min(total, idx)) / total;
        arcEl.style.strokeDashoffset = (circumference * (1 - frac)).toFixed(2);
      }
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = parseInt(entry.target.getAttribute("data-ps-index") || "1", 10);
            setActive(idx);
          }
        });
      }, { rootMargin: "-30% 0px -45% 0px", threshold: 0.05 });

      items.forEach(function (el) { io.observe(el); });
    }
    setActive(1);
  }

  function initFooterEntrance() {
    var cols = Array.prototype.slice.call(document.querySelectorAll("#bottom-footer .cx-footer-main > div"));
    if (!cols.length || !("IntersectionObserver" in window)) return;
    cols.forEach(function (c, idx) {
      c.style.opacity = "0";
      c.style.transform = "translateY(22px)";
      c.style.transitionDelay = (idx * 85) + "ms";
    });
    var footerEl = document.getElementById("bottom-footer");
    if (!footerEl) return;
    var fio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          cols.forEach(function (c) {
            c.style.opacity = "1";
            c.style.transform = "translateY(0)";
          });
          fio.disconnect();
        }
      });
    }, { threshold: 0.12 });
    fio.observe(footerEl);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initProblemsSolvedTracker();
      initFooterEntrance();
    });
  } else {
    initProblemsSolvedTracker();
    initFooterEntrance();
  }
})();

/* === cx-smooth-scroll-v7 === */
(function () {
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  function ensureSmoothScroll() {
    // If original Lenis is active, just refresh ScrollTrigger after assets settle (zero duplicate instances!)
    if (window.__cxLenis) {
      window.addEventListener("load", function () {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        });
      }
      return;
    }

    // Zero-dependency delta-time inertial wheel fallback ONLY if Lenis CDN is unavailable
    var targetY = window.scrollY || window.pageYOffset || 0;
    var currentY = targetY;
    var animating = false;
    var lastStepTs = 0;

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function step(now) {
      var dt = lastStepTs ? Math.min(0.05, Math.max(0.004, (now - lastStepTs) / 1000)) : 0.0167;
      lastStepTs = now;
      var diff = targetY - currentY;
      if (Math.abs(diff) < 0.35) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        if (window.ScrollTrigger) window.ScrollTrigger.update();
        animating = false;
        lastStepTs = 0;
        return;
      }
      var factor = 1 - Math.exp(-14.5 * dt);
      currentY += diff * factor;
      window.scrollTo(0, currentY);
      if (window.ScrollTrigger) window.ScrollTrigger.update();
      requestAnimationFrame(step);
    }

    window.addEventListener("wheel", function (e) {
      if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;
      var modal = document.querySelector(".cx-modal.is-open, .cx-mobile-drawer.is-open");
      if (modal) return;
      e.preventDefault();
      if (!animating) {
        currentY = window.scrollY || window.pageYOffset || 0;
        targetY = currentY;
      }
      var dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 32;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      targetY = Math.max(0, Math.min(maxScroll(), targetY + dy * 1.0));
      if (!animating) {
        animating = true;
        requestAnimationFrame(step);
      }
    }, { passive: false });

    window.addEventListener("scroll", function () {
      if (!animating) {
        currentY = window.scrollY || window.pageYOffset || 0;
        targetY = currentY;
      }
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureSmoothScroll);
  } else {
    ensureSmoothScroll();
  }
})();

/* === cx-v10-cta-dynamic === */
(function () {
  var card = document.querySelector("#cx-cta-section .cx-dark-cta-card");
  if (!card) return;
  var rect = null;
  var raf = 0;
  var lastEv = null;
  card.addEventListener("pointerenter", function () { rect = card.getBoundingClientRect(); }, { passive: true });
  card.addEventListener("pointermove", function (e) {
    lastEv = e;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      if (!lastEv) return;
      var r = rect || (rect = card.getBoundingClientRect());
      if (!r.width || !r.height) return;
      var x = (((lastEv.clientX - r.left) / r.width) * 100).toFixed(1) + "%";
      var y = (((lastEv.clientY - r.top) / r.height) * 100).toFixed(1) + "%";
      card.style.setProperty("--cta-mx", x);
      card.style.setProperty("--cta-my", y);
    });
  }, { passive: true });
  card.addEventListener("pointerleave", function () {
    rect = null;
    card.style.setProperty("--cta-mx", "50%");
    card.style.setProperty("--cta-my", "50%");
  }, { passive: true });
  window.addEventListener("resize", function () { rect = null; }, { passive: true });
})();

/* === cx-v7-perf-observer === */
(function () {
  if (!("IntersectionObserver" in window)) return;
  function initAnimPauseObserver() {
    var selectors = [
      "#hero-section",
      "#kpi-bento-section",
      "#problems-solved-section",
      "#trusted-section",
      "#ai-engine-section",
      "#cx-cta-section",
      "#engineered-impact-section",
      "#bottom-footer"
    ];
    var els = [];
    selectors.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) els.push(el);
    });
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("cx-anim-paused", !entry.isIntersecting);
      });
    }, { rootMargin: "220px 0px 220px 0px", threshold: 0.01 });

    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimPauseObserver);
  } else {
    initAnimPauseObserver();
  }
})();

/* === cx-v10-viewport-perf === */
(function () {
  if (!("IntersectionObserver" in window)) return;
  function initViewportAnimOptimizer() {
    var targets = Array.prototype.slice.call(
      document.querySelectorAll(
        "#hero-section, .cx-trusted-section, #problems-solved-section, #trusted-section, .cx-ba3d-section, .cx-city-section, #cx-cta-section, #engineered-impact-section, #bottom-footer"
      )
    );
    if (!targets.length) return;
    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          e.target.classList.toggle("cx-anim-paused", !e.isIntersecting);
        }
      },
      { rootMargin: "260px 0px 260px 0px", threshold: 0.01 }
    );
    targets.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initViewportAnimOptimizer);
  } else {
    initViewportAnimOptimizer();
  }
})();
