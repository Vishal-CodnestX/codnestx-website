# CodnestX Website Template (v3.0 — GSAP + Lenis Motion System & React + Vite)

## Key Updates in v3.0
1. **Missing Logos Integrated (`practo.svg` & `unicommerce.svg`) + Shadows & Optical Alignment**:
   - Processed and embedded the uploaded Practo (`images.jpg`) and UNV/Unicommerce (`images.png`) logos into `logos/integrations/` and `public/logos/integrations/`.
   - Added subtle drop-shadows behind all 39 integration logos and multi-layered elevation shadows on each tile with strict optical centering.
2. **Unified GSAP 3.12.5 + ScrollTrigger + Flip + Draggable + Lenis 1.1.13 Motion System**:
   - Single token definition (`src/motion/tokens.js` & CSS `:root` tokens) and reusable React primitives (`src/motion/primitives.jsx`: `<Reveal>`, `<SplitHeading>`, `<Stagger>`, `<ParallaxImage>`, `<CountUp>`, `useScrollTrigger`).
   - Buttery Lenis smooth scrolling driven by `gsap.ticker`, slim 18px-blur header that hides on scroll-down and reveals on scroll-up, and a single sliding `Flip` active nav pill.
3. **Section Rebuilds & Anti-AI Audit**:
   - **KPI Bento (`#kpi-bento-section`)**: Restored a real rotating 3D spherical globe (`#cx-bento-globe-canvas`) at `devicePixelRatio` (cap 2) with dotted continents, wireframe rings, and animated connection arcs.
   - **Before -> After Carousel (`#before-after-section`)**: All 6 slides rendered once in the DOM, dynamic SVG cubic-Bezier connector drawing from Before items to the After card, 4 real metrics + 4 outcomes, and a single unified control bar.
   - **Portfolio Title Cards (`#portfolio-explorer`)**: All 10 portfolio cards + 8 Common Process Gaps rendered in the DOM once with 16:10 visual previews, one neutral meta line, and smooth `GSAP Flip` filtering + sliding tab indicator.
