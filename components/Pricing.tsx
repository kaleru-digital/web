import { plans } from "@/lib/site";

export default function Pricing() {
  return (
    <section className="section" id="planes" aria-labelledby="planes-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow" data-reveal>Planes de lanzamiento</p>
          <h2 className="section__title" id="planes-title" data-reveal>
            Precios claros, alcance por escrito.
          </h2>
          <p className="section__lead" data-reveal>
            Paquetes cerrados para empezar rápido. Cada proyecto se confirma con un presupuesto
            detallado tras una primera conversación.
          </p>
        </header>

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
