"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Revela con un fundido ascendente todos los elementos marcados con `data-reveal`. */
export default function Reveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(els, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }),
      });
    });
  });
  return null;
}
