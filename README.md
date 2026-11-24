# KALERU digital · web corporativa

Web del estudio KALERU digital: webs estáticas, webs con login, apps web y móviles y flujos agénticos para empresas.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · GSAP 3 (ScrollTrigger, DrawSVG) · CSS sin frameworks · Vercel.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # compilación de producción
npm run typecheck
```

## Estructura

```
app/
  layout.tsx          fuentes, metadatos SEO, flag .js para animaciones
  page.tsx            composición de la home
  globals.css         tokens de diseño y estilos
  api/contact/        endpoint del formulario (Resend, opcional)
  privacidad/         política de privacidad (PROVISIONAL)
  sitemap.ts, robots.ts, icon.svg
components/
  Logo.tsx            logo animado de la navbar (GSAP)
  Hero.tsx            bienvenida 100vh animada (GSAP)
  AgentFlow.tsx       diagrama del flujo IA con aprobación humana (ScrollTrigger)
  Services, Pricing, Process, Projects, Contact, Footer, Navbar, Reveal
lib/
  site.ts             TODOS los textos editables: servicios, precios, RRSS, email
  gsap.ts             registro de plugins GSAP
```

Para cambiar textos, precios, email o enlaces de Instagram/TikTok/LinkedIn, edita solo `lib/site.ts`.
Una red social con `href: ""` aparece como "próximamente" en el pie.

## Animaciones

- **Logo:** se dibuja con DrawSVG al cargar, gira y hace una ola al pasar el ratón y se compacta al bajar del hero.
- **Hero (100svh):** rejilla y halos, titular por líneas enmascaradas, palabra rotatoria con los servicios, halo que sigue al puntero y salida con scroll (scrub).
- **Secciones:** aparición con `ScrollTrigger.batch` y flujo IA que se ilumina paso a paso.
- Con `prefers-reduced-motion: reduce` todo se muestra estático. Si el JS fallara, el contenido aparece a los 3 s por CSS.

## Despliegue: GitHub → Vercel

1. Crea un repositorio **privado** en GitHub (p. ej. `kaleru-web`) y sube esta carpeta:
   ```bash
   git add . && git commit -m "Web inicial de KALERU"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/kaleru-web.git
   git push -u origin main
   ```
2. En [vercel.com](https://vercel.com) → *Add New → Project* → importa el repositorio. Vercel detecta Next.js; no hace falta configurar nada.
3. En *Settings → Environment Variables* añade las de `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` (dominio final)
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` para activar el formulario
     (sin ellas, el formulario muestra el email como alternativa).
4. *Settings → Domains*: conecta tu dominio.

Cada `push` a `main` despliega a producción; cada rama o PR genera una URL de previsualización.

> **Plan de Vercel:** el plan Hobby es solo para uso personal/no comercial. Para la web de una empresa que vende servicios, usa el plan **Pro**.

## Pendiente antes de publicar

- [ ] Confirmar nombre y dominio (OEPM/EUIPO) y cambiar `email` en `lib/site.ts`.
- [ ] Completar `app/privacidad/page.tsx` con titular, NIF y domicilio (revisión legal).
- [ ] Imagen Open Graph (`app/opengraph-image.png`, 1200×630).
- [ ] Sustituir los visuales de demos por capturas/vídeos reales cuando estén listas.
- [ ] Añadir enlaces de Instagram y TikTok cuando existan las cuentas.
