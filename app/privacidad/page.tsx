import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacidad y aviso legal", robots: { index: false } };

// IMPORTANTE: texto provisional. Debe revisarse y completarse con los datos del titular
// (nombre, NIF, domicilio) antes de publicar la web comercialmente.
export default function Privacidad() {
  return (
    <main className="legal container" id="main">
      <a href="/" className="legal__back">
        ← Volver
      </a>
      <h1>Privacidad y aviso legal</h1>
      <p className="legal__warn">Documento provisional pendiente de revisión.</p>

      <h2>Titular</h2>
      <p>
        {site.name} · [Nombre y apellidos del titular] · NIF [pendiente] · [Domicilio] · {site.email}
      </p>

      <h2>Datos que recogemos</h2>
      <p>
        A través del formulario de contacto recogemos nombre, email, empresa (opcional) y el mensaje que nos
        envías, con la única finalidad de responder a tu solicitud y, en su caso, preparar un presupuesto.
      </p>

      <h2>Base legal y conservación</h2>
      <p>
        La base legal es tu consentimiento y la aplicación de medidas precontractuales a petición tuya. Los
        datos se conservan el tiempo necesario para atender la solicitud y las obligaciones legales aplicables.
      </p>

      <h2>Encargados del tratamiento</h2>
      <p>
        Alojamiento web: Vercel Inc. Envío de emails: Resend. Ambos pueden implicar transferencias
        internacionales amparadas en las garantías previstas por el RGPD.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
        escribiendo a {site.email}. También puedes reclamar ante la Agencia Española de Protección de Datos
        (aepd.es).
      </p>

      <h2>Cookies</h2>
      <p>Esta web no utiliza cookies de seguimiento ni analítica de terceros en este momento.</p>
    </main>
  );
}
