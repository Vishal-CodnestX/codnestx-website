// Single Motion Token File (Section 3.2)
export const MOTION_TOKENS = {
  easeOut: "expo.out", // cubic-bezier(.16, 1, .3, 1)
  easeInOut: "power3.inOut", // cubic-bezier(.65, 0, .35, 1)
  easeSpring: "back.out(1.5)", // hover/press only
  easeOutExpoFn: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  duration: {
    micro: 0.22, // 180-280ms
    reveal: 0.82, // 700-900ms
    heading: 0.95, // 900-1200ms
    countUp: 1.6,
    modal: 0.4,
  },
  stagger: {
    each: 0.065, // 50-80ms per item
    amountCap: 0.65, // capped <= 0.7s total per group
    headingLine: 0.1,
  },
  distance: {
    reveal: 32, // 24-40px translate, never more
    cardHover: -6,
  },
  lenis: {
    lerp: 0.085,
    wheelMultiplier: 0.9,
    syncTouch: false,
  },
};
