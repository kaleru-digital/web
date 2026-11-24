"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error" | "unavailable";

const SERVICES = ["Web estática", "Web con login", "App web o móvil", "Flujo agéntico / automatización", "Aún no lo sé"];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
        return;
      }
      if (res.status === 503) return setStatus("unavailable");
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "No se pudo enviar el mensaje.");
      setStatus("error");
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  return (
    <section className="section" id="contacto" aria-labelledby="contacto-title">
      <div className="container contact">
        <div className="contact__intro">
          <p className="eyebrow" data-reveal>Contacto</p>
          <h2 className="section__title" id="contacto-title" data-reveal>
            ¿Qué quieres <span className="grad">construir</span>?
          </h2>
          <p className="section__lead" data-reveal>
            Cuéntanos brevemente tu idea o el proceso que te quita tiempo. Te respondemos con una
            propuesta concreta, sin compromiso.
          </p>
          <p className="contact__mail" data-reveal>
            O escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <form className="card form" onSubmit={onSubmit} data-reveal>
          <div className="form__row">
            <label className="field">
              <span>Nombre</span>
              <input name="name" required maxLength={100} autoComplete="name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required maxLength={150} autoComplete="email" />
            </label>
          </div>
          <div className="form__row">
            <label className="field">
              <span>Empresa <em>(opcional)</em></span>
              <input name="company" maxLength={120} autoComplete="organization" />
            </label>
            <label className="field">
              <span>Servicio</span>
              <select name="service" defaultValue={SERVICES[0]}>
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="field">
            <span>Mensaje</span>
            <textarea name="message" required minLength={10} maxLength={3000} rows={5} />
          </label>

          {/* Honeypot anti-spam: invisible para personas */}
          <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <label className="consent">
            <input type="checkbox" name="consent" required />
            <span>
              He leído y acepto la <a href="/privacidad">política de privacidad</a>.
            </span>
          </label>

          <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando…" : "Enviar solicitud"}
          </button>

          <p className="form__status" role="status" aria-live="polite">
            {status === "ok" && "¡Gracias! Hemos recibido tu mensaje y te responderemos pronto."}
            {status === "error" && error}
            {status === "unavailable" && (
              <>
                El formulario aún no está activo. Escríbenos a{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
