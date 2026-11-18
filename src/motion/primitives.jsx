import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_TOKENS } from "./tokens";

gsap.registerPlugin(ScrollTrigger);

export function useScrollTrigger(callback, deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      callback(el, gsap, ScrollTrigger);
    }, el);
    return () => ctx.revert();
  }, deps);
  return ref;
}

export function Reveal({ children, delay = 0, y = MOTION_TOKENS.distance.reveal, className = "" }) {
  const ref = useScrollTrigger((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: MOTION_TOKENS.duration.reveal,
        delay,
        ease: MOTION_TOKENS.easeOut,
        clearProps: "transform,opacity,willChange",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  }, [delay, y]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function SplitHeading({ lines = [], as: Tag = "h2", className = "" }) {
  const ref = useScrollTrigger((el) => {
    const lineEls = el.querySelectorAll(".cx-line-inner");
    gsap.fromTo(
      lineEls,
      { y: 22, yPercent: 0, opacity: 0 },
      {
        y: 0,
        yPercent: 0,
        opacity: 1,
        duration: MOTION_TOKENS.duration.heading,
        ease: MOTION_TOKENS.easeOut,
        stagger: MOTION_TOKENS.stagger.headingLine,
        clearProps: "transform,opacity,willChange",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  }, [lines.join("|")]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="cx-line-mask">
          <span className="cx-line-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Stagger({ children, className = "" }) {
  const ref = useScrollTrigger((el) => {
    const items = el.children;
    if (!items.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: MOTION_TOKENS.distance.reveal },
      {
        opacity: 1,
        y: 0,
        duration: MOTION_TOKENS.duration.reveal,
        ease: MOTION_TOKENS.easeOut,
        stagger: { amount: Math.min(MOTION_TOKENS.stagger.amountCap, items.length * MOTION_TOKENS.stagger.each) },
        clearProps: "transform,opacity,willChange",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

export function ParallaxImage({ src, alt, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-contain block" />
    </div>
  );
}

export function CountUp({ end, decimals = 0, suffix = "", className = "" }) {
  const ref = useScrollTrigger((el) => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: MOTION_TOKENS.duration.countUp,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = obj.val.toFixed(decimals) + suffix;
      },
    });
  }, [end, decimals, suffix]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {Number(end).toFixed(decimals)}{suffix}
    </span>
  );
}
