"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const ROTATING = ["webs estáticas", "webs con login", "apps web y móviles", "flujos agénticos"];
const LONGEST = ROTATING.reduce((a, b) => (b.length > a.length ? b : a));

/**
 * Bienvenida a pantalla completa (100svh).
 * Secuencia: rejilla y halos → titular por líneas enmascaradas → palabra rotatoria
 * con los servicios → texto y CTAs. Al hacer scroll, el contenido se desplaza y se
 * desvanece (scrub). El halo sigue al puntero en dispositivos con ratón.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(pointer: fine)",
        },
        (ctx) => {
          const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
          const q = gsap.utils.selector(root);
          const words = q(".rotator__item");

          if (!motion) {
            // Sin animaciones: mostrar todo y dejar visible la primera palabra.
            gsap.set(q("[data-hero]"), { autoAlpha: 1 });
            gsap.set(words.slice(1), { autoAlpha: 0 });
            return;
          }

          // 1 · Intro
          const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.35 });
          intro
            .set(q("[data-hero]"), { autoAlpha: 1 })
            .from(q(".hero__grid"), { autoAlpha: 0, scale: 1.08, duration: 1.6, ease: "power2.out" }, 0)
            .from(q(".hero__orb"), { autoAlpha: 0, scale: 0.4, duration: 1.8, stagger: 0.2, ease: "expo.out" }, 0)
            .from(q(".hero__eyebrow"), { autoAlpha: 0, y: 16, duration: 0.8 }, 0.25)
            .from(q(".hero__line-inner"), { yPercent: 115, rotate: 2, duration: 1.1, stagger: 0.12 }, 0.35)
            .from(q(".hero__rotator"), { autoAlpha: 0, y: 20, duration: 0.8 }, 0.95)
            .from(q(".hero__lead"), { autoAlpha: 0, y: 20, duration: 0.8 }, 1.05)
            .from(q(".hero__ctas > *"), { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.08 }, 1.15)
            .from(q(".hero__meta > *"), { autoAlpha: 0, duration: 0.6, stagger: 0.1 }, 1.3)
            .from(q(".hero__scroll"), { autoAlpha: 0, y: -10, duration: 0.6 }, 1.5);

          // 2 · Palabra rotatoria (bucle infinito)
          gsap.set(words, { yPercent: 100, autoAlpha: 0 });
          gsap.set(words[0], { yPercent: 0, autoAlpha: 1 });
          const loop = gsap.timeline({ repeat: -1, paused: true });
          words.forEach((w, i) => {
            const next = words[(i + 1) % words.length];
            loop
              .to(w, { yPercent: -100, autoAlpha: 0, duration: 0.55, ease: "power3.in" }, "+=1.6")
              .fromTo(next, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", immediateRender: false }, "<0.3");
          });
          intro.call(() => loop.play(), undefined, ">");

          // 3 · Indicador de scroll
          gsap.to(q(".hero__scroll-line"), {
            scaleY: 0,
            transformOrigin: "50% 100%",
            duration: 1.2,
            repeat: -1,
            ease: "power2.inOut",
          });

          // 4 · Salida con scroll (scrub)
          gsap
            .timeline({
              scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
            })
            .to(q(".hero__inner"), { yPercent: -18, autoAlpha: 0.1, scale: 0.96, ease: "none" }, 0)
            .to(q(".hero__grid"), { yPercent: 12, ease: "none" }, 0)
            .to(q(".hero__orb--a"), { yPercent: 40, ease: "none" }, 0)
            .to(q(".hero__orb--b"), { yPercent: -30, ease: "none" }, 0);

          // 5 · Halo que sigue al puntero
          if (fine) {
            const orb = q(".hero__cursor")[0];
            const xTo = gsap.quickTo(orb, "x", { duration: 0.8, ease: "power3.out" });
            const yTo = gsap.quickTo(orb, "y", { duration: 0.8, ease: "power3.out" });
            const onMove = (e: PointerEvent) => {
              const r = root.current!.getBoundingClientRect();
              xTo(e.clientX - r.left);
              yTo(e.clientY - r.top);
            };
            gsap.set(orb, { autoAlpha: 1, x: window.innerWidth / 2, y: window.innerHeight / 2 });
            root.current!.addEventListener("pointermove", onMove);
            return () => root.current?.removeEventListener("pointermove", onMove);
          }
        }
      );
    },
    { scope: root }
  );

  return (
    <section className="hero" id="inicio" ref={root} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__cursor" />
        <div className="hero__noise" />
      </div>

      <div className="hero__inner container">
        <p className="hero__eyebrow" data-hero>
          <span>Estudio independiente</span>
          <span>España — {new Date().getFullYear()}</span>
        </p>

        <h1 className="hero__title" id="hero-title" data-hero>
          <span className="hero__line"><span className="hero__line-inner">Webs, apps</span></span>
          <span className="hero__line"><span className="hero__line-inner">e <em className="serif">inteligencia</em></span></span>
          <span className="hero__line"><span className="hero__line-inner">artificial a medida.</span></span>
        </h1>

        <p className="hero__rotator" data-hero>
          <span className="hero__rotator-label">Hacemos</span>
          <span className="rotator">
            <span className="rotator__sizer" aria-hidden="true">{LONGEST}</span>
            {ROTATING.map((w, i) => (
              <span className="rotator__item" key={w} aria-hidden={i > 0}>
                {w}
              </span>
            ))}
          </span>
        </p>

        <p className="hero__lead" data-hero>
          Somos un estudio pequeño. Diseñamos webs con carácter, desarrollamos las herramientas que tu
          negocio necesita y automatizamos el trabajo repetitivo para que dediques el tiempo a lo importante.
        </p>

        <div className="hero__ctas" data-hero>
          <a href="#contacto" className="btn btn--primary">
            Empezar un proyecto <span aria-hidden="true">↗</span>
          </a>
          <a href="#servicios" className="btn btn--ghost">
            Ver servicios
          </a>
        </div>

        <ul className="hero__meta" data-hero aria-label="Líneas de negocio">
          <li>Creative Web</li>
          <li>AI &amp; Automation</li>
          <li>Apps &amp; Software</li>
        </ul>
      </div>

      <a href="#servicios" className="hero__scroll" data-hero aria-label="Bajar a servicios">
        <span>Scroll</span>
        <span className="hero__scroll-track">
          <span className="hero__scroll-line" />
        </span>
      </a>
    </section>
  );
}
