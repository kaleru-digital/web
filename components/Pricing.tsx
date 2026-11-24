import { plans } from "@/lib/site";
import SectionHead from "./SectionHead";

export default function Pricing() {
  return (
    <section className="section" id="planes" aria-labelledby="planes-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Planes"
          titleId="planes-title"
          title={
            <>
              Precios de <em className="serif">lanzamiento</em>.
            </>
          }
          lead="Paquetes cerrados para empezar rápido. Después de una primera conversación te enviamos un presupuesto detallado."
        />

        <div className="plans">
          {plans.map((g) => (
            <div className="plans__group" key={g.group}>
              <h3 className="plans__group-title" data-reveal>{g.group}</h3>
              <ul className="plans__list">
                {g.items.map((p) => (
                  <li
                    key={p.name}
                    className={`card plan${"featured" in p && p.featured ? " plan--featured" : ""}`}
                    data-reveal
                  >
                    <div className="plan__head">
                      <h4 className="plan__name">{p.name}</h4>
                      <span className="plan__note">{p.note}</span>
                    </div>
                    <p className="plan__price">
                      {p.from && <span className="plan__from">desde</span>}
                      {p.price}
                    </p>
                    <p className="plan__text">{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="fineprint" data-reveal>
          Precios sin IVA. No incluyen dominio, hosting, licencias ni consumo de APIs de IA, que se
          detallan en cada presupuesto. Mantenimiento opcional desde 19 €/mes.
        </p>
      </div>
    </section>
  );
}
