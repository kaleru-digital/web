import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  titleId: string;
  lead?: ReactNode;
  /** false en secciones que anima su propio componente (p. ej. con pin) */
  reveal?: boolean;
};

/** Cabecera editorial: etiqueta numerada a la izquierda, titular y entradilla a la derecha. */
export default function SectionHead({ index, label, title, titleId, lead, reveal = true }: Props) {
  const r = reveal ? { "data-reveal": "" } : {};
  return (
    <header className="head">
      <p className="head__label" {...r}>
        <span className="head__index">{index}</span>
        {label}
      </p>
      <div className="head__main">
        <h2 className="head__title" id={titleId} {...r}>
          {title}
        </h2>
        {lead && (
          <p className="head__lead" {...r}>
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
