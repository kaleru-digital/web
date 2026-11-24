"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  className?: string;
};

/**
 * Carrusel horizontal con scroll-snap nativo (se desliza con el dedo) en móvil/tablet.
 * En escritorio (>860px) el CSS lo convierte en rejilla y oculta los controles.
 */
export default function Slider({ children, label, className = "" }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setIndex(items.indexOf(e.target as HTMLElement));
        }
      },
      { root: el, threshold: 0.6 }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  function go(dir: number) {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(count - 1, index + dir));
    const item = el.children[next] as HTMLElement;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    el.scrollTo({ left: item.offsetLeft - pad, behavior: "smooth" });
  }

  return (
    <div className="slider">
      <ul className={`slider__track ${className}`} ref={track} aria-label={label} tabIndex={0}>
        {children}
      </ul>
      <div className="slider__controls">
        <span className="slider__count" aria-live="polite">
          <b>{String(index + 1).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}
        </span>
        <span className="slider__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${(index + 1) / count})` }} />
        </span>
        <span className="slider__btns">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Anterior">
            ←
          </button>
          <button type="button" onClick={() => go(1)} disabled={index === count - 1} aria-label="Siguiente">
            →
          </button>
        </span>
      </div>
    </div>
  );
}
