import { services } from "@/lib/site";
import SectionHead from "./SectionHead";
import Slider from "./Slider";

export default function Services() {
  return (
    <section className="section" id="servicios" aria-labelledby="servicios-title">
      <div className="container">
        <SectionHead
          index="01"
          label="Servicios"
          titleId="servicios-title"
          title={
            <>
              Cuatro cosas que hacemos <em className="serif">bien</em>.
            </>
          }
          lead="Empezamos por lo más sencillo que resuelva tu problema. Si tu negocio crece, el proyecto crece con él."
        />

        <Slider label="Servicios" className="services">
          {services.map((s) => (
            <li className="service" key={s.id} data-reveal>
              <span className="service__index">{s.index}</span>
              <span className="service__line">{s.line}</span>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__text">{s.text}</p>
              <p className="service__tags">{s.tags.join(" / ")}</p>
            </li>
          ))}
        </Slider>
      </div>
    </section>
  );
}
