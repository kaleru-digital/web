"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LETTERS = "KALERU".split("");

/**
 * Logo de la barra de navegación.
 * - Entrada: se dibuja el símbolo (DrawSVG) y las letras suben desde una máscara.
 * - Hover: el símbolo gira y las letras hacen una pequeña ola.
 * - Scroll: al salir del hero, el wordmark se repliega y queda solo el símbolo.
 * Con `prefers-reduced-motion: reduce` se muestra estático.
 */
export default function Logo() {
  const root = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const strokes = q(".logo__stroke");
        const letters = q(".logo__letter");
        const tag = q(".logo__tag");
        const dot = q(".logo__dot");
        const mark = q(".logo__mark");

        // 1 · Intro
        gsap.set(root.current, { autoAlpha: 1 });
        const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
        intro
          .from(strokes, { drawSVG: 0, duration: 0.9, stagger: 0.12, ease: "power2.inOut" })
          .from(dot, { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)" }, "-=0.35")
          .from(letters, { yPercent: 110, duration: 0.6, stagger: 0.05 }, "-=0.6")
          .from(tag, { autoAlpha: 0, x: -8, duration: 0.5 }, "-=0.3");

        // 2 · Hover
        const hover = gsap.timeline({ paused: true });
        hover
          .to(mark, { rotate: 90, duration: 0.6, ease: "back.inOut(2)" }, 0)
          .to(letters, { yPercent: -18, duration: 0.18, stagger: 0.04, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0)
          .to(dot, { fill: "var(--accent-2)", duration: 0.3 }, 0);

        const onEnter = contextSafe!(() => {
          if (intro.isActive()) return;
          hover.restart();
        });
        root.current?.addEventListener("mouseenter", onEnter);
        root.current?.addEventListener("focus", onEnter);

        // 3 · Compactar al hacer scroll
        const compact = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: "power2.inOut" } });
        compact
          .to(tag, { autoAlpha: 0, x: -6 }, 0)
          .to(letters, { yPercent: -110, stagger: { each: 0.03, from: "end" } }, 0)
          .to(mark, { scale: 0.9 }, 0);

        const st = ScrollTrigger.create({
          start: () => window.innerHeight * 0.6,
          onEnter: () => compact.play(),
          onLeaveBack: () => compact.reverse(),
        });

        return () => {
          root.current?.removeEventListener("mouseenter", onEnter);
          root.current?.removeEventListener("focus", onEnter);
          st.kill();
        };
      });
    },
    { scope: root }
  );

  return (
    <a href="#inicio" className="logo" ref={root} aria-label="KALERU digital · inicio" data-intro>
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id="logo-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <path className="logo__stroke" d="M12 2H28A10 10 0 0 1 38 12V28A10 10 0 0 1 28 38H12A10 10 0 0 1 2 28V12A10 10 0 0 1 12 2Z" />
        <path className="logo__stroke logo__stroke--k" d="M14 10V30" />
        <path className="logo__stroke logo__stroke--k" d="M27 10L15.5 21" />
        <path className="logo__stroke logo__stroke--k" d="M19 17.5L28 30" />
        <circle className="logo__dot" cx="30.5" cy="9.5" r="2.4" />
      </svg>
      <span className="logo__word" aria-hidden="true">
        {LETTERS.map((l, i) => (
          <span className="logo__mask" key={i}>
            <span className="logo__letter">{l}</span>
          </span>
        ))}
        <span className="logo__tag">digital</span>
      </span>
    </a>
  );
}
