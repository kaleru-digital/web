"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHead from "./SectionHead";

const NODES = [
  { k: "Entrada", t: "Llega un email, formulario o pedido" },
  { k: "IA", t: "Clasifica, extrae datos y prepara la respuesta" },
  { k: "Tú", t: "Revisas y apruebas con un clic", human: true },
  { k: "Acción", t: "Se registra en el CRM, calendario o ERP" },
  { k: "Registro", t: "Todo queda trazado y auditable" },
];

const GUARANTEES = [
  "Aprobación humana en acciones sensibles",
  "Permisos mínimos y registros de ejecución",
  "Límites de gasto en modelos de IA",
  "Datos tratados conforme al RGPD",
];

export default function AgentFlow() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 900px)",
        },
        (ctx) => {
          const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
          if (!motion) return;
          const q = gsap.utils.selector(root);
          const nodes = q(".flow__node");
          const links = q(".flow__link-fill");
          const hidden = wide ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)";

          const tl = gsap.timeline({
            scrollTrigger: { trigger: q(".flow")[0], start: "top 75%", end: "bottom 45%", scrub: 0.8 },
          });
          nodes.forEach((n, i) => {
            tl.fromTo(n, { autoAlpha: 0.25, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 });
            tl.fromTo(n, { "--glow": 0 }, { "--glow": 1, duration: 0.4 }, "<");
            if (links[i]) tl.fromTo(links[i], { clipPath: hidden }, { clipPath: "inset(0 0% 0% 0)", duration: 0.6, ease: "none" });
          });
        }
      );
    },
    { scope: root }
  );

  return (
    <section className="section section--ai" id="ia" ref={root} aria-labelledby="ia-title">
      <div className="container">
        <SectionHead
          index="02"
          label="Flujos agénticos"
          titleId="ia-title"
          title={
            <>
              IA que trabaja con tus herramientas y te pide <em className="serif">permiso</em>.
            </>
          }
          lead="Nada de chatbots genéricos. Automatizamos tareas concretas, como clasificar solicitudes o preparar respuestas, y tú das el visto bueno antes de que salga nada."
        />

        <ol className="flow" aria-label="Ejemplo de flujo automatizado">
          {NODES.map((n, i) => (
            <li className="flow__item" key={n.k}>
              <div className={`flow__node${n.human ? " flow__node--human" : ""}`}>
                <span className="flow__step">{String(i + 1).padStart(2, "0")}</span>
                <strong className="flow__key">{n.k}</strong>
                <span className="flow__text">{n.t}</span>
              </div>
              {i < NODES.length - 1 && (
                <span className="flow__link" aria-hidden="true">
                  <span className="flow__link-fill" />
                </span>
              )}
            </li>
          ))}
        </ol>

        <ul className="guarantees">
          {GUARANTEES.map((g, i) => (
            <li key={g} data-reveal>
              <span className="guarantees__n" aria-hidden="true">{String.fromCharCode(97 + i)})</span>
              {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
