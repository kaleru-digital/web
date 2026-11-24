"use client";

import { useRef } from "react";
import { steps } from "@/lib/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionHead from "./SectionHead";

const R = 88;

/**
 * "Cómo trabajamos" inmersivo: la sección se fija en pantalla y, al hacer scroll,
 * las fases se apilan una tras otra mientras el contador gira como un odómetro,
 * el anillo se dibuja (DrawSVG) y la barra de progreso avanza.
 * Sin movimiento (reduced motion) o en pantallas muy bajas, se muestra como lista.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-height: 560px)", () => {
        const section = root.current!;
        const q = gsap.utils.selector(section);
        const cards = q(".pstep");
        const n = cards.length;

        section.classList.add("is-pinned");

        gsap.set(cards.slice(1), { yPercent: 115, rotate: 3, autoAlpha: 0 });
        gsap.set(q(".process__ring"), { rotate: -90 });
        gsap.set(q(".process__ring-fg"), { drawSVG: `0% ${100 / n}%` });
        gsap.set(q(".process__tick i"), { scaleX: 0 });
        gsap.set(q(".process__tick i")[0], { scaleX: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (n - 1) * 0.9}`,
            pin: true,
            scrub: 0.7,
            // Sin inercia: un gesto rápido no debe saltarse fases; avanza a la siguiente en la dirección del scroll
            snap: { snapTo: "labelsDirectional", inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: "power1.inOut" },
            invalidateOnRefresh: true,
          },
        });

        tl.addLabel("s0");
        for (let i = 1; i < n; i++) {
          tl.to(cards[i - 1], { yPercent: -8, scale: 0.92, autoAlpha: 0.0, rotate: -2, duration: 1 }, `s${i - 1}+=0.15`)
            .to(cards[i], { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1 }, "<0.1")
            .to(q(".process__digits"), { yPercent: (-100 / n) * i, duration: 1, ease: "expo.inOut" }, "<")
            .to(q(".process__ring-fg"), { drawSVG: `0% ${(100 / n) * (i + 1)}%`, duration: 1 }, "<")
            .to(q(".process__ring"), { rotate: -90 + 90 * i, duration: 1 }, "<")
            .to(q(".process__tick i")[i], { scaleX: 1, duration: 0.8 }, "<0.2")
            .addLabel(`s${i}`);
        }

        // Pequeño margen al final para que la última fase se lea antes de soltar el pin
        tl.to({}, { duration: 0.3 });

        ScrollTrigger.refresh();
        return () => section.classList.remove("is-pinned");
      });
    },
    { scope: root }
  );

  return (
    <section className="section process" id="proceso" ref={root} aria-labelledby="proceso-title">
      <div className="container process__wrap">
        <SectionHead
          index="04"
          label="Proceso"
          titleId="proceso-title"
          reveal={false}
          title={
            <>
              Así <em className="serif">trabajamos</em>.
            </>
          }
        />

        <div className="process__stage">
          <div className="process__visual" aria-hidden="true">
            <svg className="process__ring" viewBox="0 0 200 200">
              <circle className="process__ring-bg" cx="100" cy="100" r={R} />
              <circle className="process__ring-fg" cx="100" cy="100" r={R} />
            </svg>
            <div className="process__counter">
              <span className="process__digits">
                {steps.map((s) => (
                  <span key={s.step}>{s.step}</span>
                ))}
              </span>
            </div>
          </div>

          <ol className="process__cards">
            {steps.map((s) => (
              <li className="pstep" key={s.step}>
                <div className="pstep__top">
                  <span className="pstep__num">{s.step}</span>
                  <span className="pstep__time">{s.time}</span>
                </div>
                <h3 className="pstep__title">{s.title}</h3>
                <p className="pstep__text">{s.text}</p>
                <p className="pstep__out">
                  <span>Entregable</span>
                  {s.out}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="process__ticks" aria-hidden="true">
          {steps.map((s) => (
            <span className="process__tick" key={s.step}>
              <i />
              <small>{s.title}</small>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
