import { demos } from "@/lib/site";
import SectionHead from "./SectionHead";
import Slider from "./Slider";

export default function Projects() {
  return (
    <section className="section" id="proyectos" aria-labelledby="proyectos-title">
      <div className="container">
        <SectionHead
          index="05"
          label="Laboratorio"
          titleId="proyectos-title"
          title={
            <>
              Lo que estamos <em className="serif">construyendo</em>.
            </>
          }
          lead="Proyectos de demostración con marcas y datos ficticios (y lo decimos claramente) para que veas cómo trabajamos antes de decidir."
        />

        <Slider label="Proyectos de demostración" className="demos">
          {demos.map((d, i) => (
            <li className="demo" key={d.title} data-reveal>
              <div className={`demo__visual demo__visual--${i + 1}`} aria-hidden="true">
                <span className="demo__num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="demo__body">
                <span className="demo__kind">{d.kind}</span>
                <h3 className="demo__title">{d.title}</h3>
                <p className="demo__text">{d.text}</p>
                <span className="demo__status">En preparación</span>
              </div>
            </li>
          ))}
        </Slider>
      </div>
    </section>
  );
}
