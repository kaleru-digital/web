import { demos } from "@/lib/site";

export default function Projects() {
  return (
    <section className="section" id="proyectos" aria-labelledby="proyectos-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow" data-reveal>Laboratorio</p>
          <h2 className="section__title" id="proyectos-title" data-reveal>
            Demos navegables,
            no promesas.
          </h2>
          <p className="section__lead" data-reveal>
            Estamos preparando proyectos de demostración para que pruebes el resultado antes de
            decidir. Son marcas y datos ficticios, y así lo indicamos.
          </p>
        </header>

        <ul className="demos">
          {demos.map((d, i) => (
            <li className="card demo" key={d.title} data-reveal>
              <div className={`demo__visual demo__visual--${i + 1}`} aria-hidden="true" />
              <div className="demo__body">
                <span className="demo__kind">{d.kind}</span>
                <h3 className="demo__title">{d.title}</h3>
                <p className="demo__text">{d.text}</p>
                <span className="badge">Demo · próximamente</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
