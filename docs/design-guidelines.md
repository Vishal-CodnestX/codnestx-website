# CodnestX website design guidelines

Use the homepage as the visual reference. Match its shared styles when building new sections or pages.

| Area | Guideline |
| --- | --- |
| Color | Use white (`--cx-surface`, `#FFFFFF`) and pale blue (`--cx-surface-alt`, `#F6FAFE`) for backgrounds. Use navy (`--cx-navy`, `#060821`) for headings and primary CTAs, `--cx-body` (`#334155`) for copy and `--cx-muted` (`#546078`) for supporting text. Reserve `--cx-blue-deep` (`#0170BA`) and `--cx-blue` (`#1998DC`) for accents and interaction states. Use at most one `.cx-grad-accent` phrase per heading. |
| Typography | Use Plus Jakarta Sans (`--font-display`) for headings and buttons, and Inter (`--font-sans`) for copy and form fields. Headings use weight 600. Follow `.cx-sec-h2` (30–46 px) and `.cx-sec-lead` (17 px, max 62ch). Use `.cx-sec-label` for short uppercase section labels where needed. |
| Layout | Pair `.cx-section-container` with `.cx-container-inner` for a 1,360 px content cap and 24 px side gutters. Use `--space-*` for spacing. Start with 24 px card gaps and roughly 72–80 px vertical section padding on desktop, 48 px on mobile. Stack split headers at 900 px and let grids and controls reflow on narrow screens. |
| Components | Reuse the site header and footer. Use `.cx-btn-primary` for the main action and `.cx-btn-outline` for secondary actions. Use subtle borders and `--shadow-surface` for cards, with 16 px outlined, 20 px standard and 24 px media radii. Match the existing Lucide outline icons. |
| Imagery | Use existing logo assets and optimized WebP photos or product screenshots. Match the crop of the existing card variant. Keep labels and metrics in HTML and provide alt text for meaningful images. |
| Interaction | Use the existing GSAP/Lenis setup and shared motion timings (220 ms for controls, about 0.8 s for reveals). Honor `prefers-reduced-motion`. Use semantic links and buttons, visible keyboard focus, readable contrast, and clear active, error and success states where relevant. |

**Working in parallel.** The homepage markup lives in `index.html`. Shared styles live in `animations.css` and are mirrored in `src/styles/animations.css`. Scope new CSS to your section with `cx-` classes, and agree on shared token or component changes before editing them. In the PR, include screenshots at 390, 768 and 1,440 px. Check alignment with adjacent sections, horizontal overflow, keyboard navigation and reduced motion.
