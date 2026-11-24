import { services } from "@/lib/site";

export default function Services() {
  return (
    <section className="section" id="servicios" aria-labelledby="servicios-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow" data-reveal>Qué hacemos</p>
          <h2 className="section__title" id="servicios-title" data-reveal>
            Cuatro formas de hacer crecer
            tu negocio en digital.
          </h2>
          <p className="section__lead" data-reveal>
            Empezamos por la solución más sencilla que resuelva tu problema, y la hacemos evolucionar
            cuando tu negocio lo necesite.
          </p>
        </header>

        <ul className="services">
          {services.map((s) => (
            <li className="card service" key={s.id} data-reveal>
              <div className="service__top">
                <span className="service__index">{s.index}</span>
                <span className="service__line">{s.line}</span>
              </div>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__text">{s.text}</p>
              <ul className="tags" aria-label="Tecnologías">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
