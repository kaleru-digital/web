import { steps } from "@/lib/site";

export default function Process() {
  return (
    <section className="section" id="proceso" aria-labelledby="proceso-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow" data-reveal>Cómo trabajamos</p>
          <h2 className="section__title" id="proceso-title" data-reveal>
            De la idea a producción,
            sin sorpresas.
          </h2>
        </header>

        <ol className="steps">
          {steps.map((s) => (
            <li className="step" key={s.step} data-reveal>
              <span className="step__num">{s.step}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
