import { nav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">KALERU <span>digital</span></p>
          <p className="footer__claim">Experiencias digitales, software e inteligencia artificial.</p>
        </div>

        <nav className="footer__col" aria-label="Secciones">
          <p className="footer__title">Secciones</p>
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="footer__col">
          <p className="footer__title">Síguenos</p>
          {site.social.map((s) =>
            s.href ? (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">{s.name}</a>
            ) : (
              <span key={s.name} className="footer__soon">
                {s.name} <small>próximamente</small>
              </span>
            )
          )}
        </div>

        <div className="footer__col">
          <p className="footer__title">Contacto</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.location}</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} {site.name}</span>
        <span>
          <a href="/privacidad">Privacidad y aviso legal</a>
        </span>
      </div>
    </footer>
  );
}
