// Configuración central del sitio. Cambia aquí textos de contacto y RRSS.

export const site = {
  name: "KALERU digital",
  shortName: "KALERU",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Estudio tecnológico en España: webs estáticas, webs con login, aplicaciones web y móviles y flujos agénticos que automatizan procesos de empresa.",
  // TODO: sustituir por el email definitivo cuando el dominio esté verificado.
  email: "hola@kaleru.digital",
  location: "España",
  // Deja `href` vacío mientras la cuenta no exista: se mostrará como "Próximamente".
  social: [
    { name: "Instagram", href: "" },
    { name: "TikTok", href: "" },
    { name: "LinkedIn", href: "" },
  ],
} as const;

export const nav = [
  { label: "Servicios", href: "#servicios" },
  { label: "IA", href: "#ia" },
  { label: "Planes", href: "#planes" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const services = [
  {
    id: "web",
    index: "01",
    title: "Webs estáticas",
    line: "Creative Web",
    text: "Webs corporativas y landing pages rápidas, con diseño propio, animaciones con propósito y SEO técnico desde el primer día.",
    tags: ["Next.js", "GSAP", "SEO", "Responsive"],
  },
  {
    id: "login",
    index: "02",
    title: "Webs con login",
    line: "Creative Web + Software",
    text: "Áreas privadas, portales de clientes, reservas y paneles con autenticación segura y datos propios.",
    tags: ["Auth", "Supabase", "PostgreSQL", "Roles"],
  },
  {
    id: "apps",
    index: "03",
    title: "Apps web y móviles",
    line: "Apps & Software",
    text: "MVPs, herramientas internas y aplicaciones multiplataforma que pueden crecer contigo sin rehacerlo todo.",
    tags: ["React", "Expo", "APIs", "Paneles"],
  },
  {
    id: "agents",
    index: "04",
    title: "Flujos agénticos",
    line: "AI & Automation",
    text: "Automatizamos procesos reales de tu empresa conectando correo, CRM, calendarios y documentos, con supervisión humana en lo importante.",
    tags: ["n8n", "LLMs", "Webhooks", "Trazabilidad"],
  },
] as const;

export const plans = [
  {
    group: "Web Experience",
    items: [
      { name: "KALERU Web", price: "590 €", from: false, note: "1–5 páginas", text: "Web corporativa responsive, formulario, SEO técnico inicial, analítica básica y animaciones discretas." },
      { name: "KALERU Experience", price: "1.290 €", from: false, note: "Alcance cerrado", text: "Diseño más personalizado, animaciones GSAP, microinteracciones y una experiencia móvil especialmente cuidada.", featured: true },
      { name: "KALERU Immersive", price: "2.500 €", from: true, note: "A medida", text: "Experiencias 3D, storytelling interactivo y transiciones avanzadas." },
    ],
  },
  {
    group: "AI & Automation",
    items: [
      { name: "KALERU Automate", price: "490 €", from: true, note: "Un proceso", text: "Automatización acotada: recibir formularios, clasificar solicitudes y registrarlas en tu CRM." },
      { name: "KALERU Agent", price: "1.200 €", from: true, note: "Con validación humana", text: "Agente con herramientas y fuentes controladas, integraciones, pruebas y trazabilidad." },
    ],
  },
  {
    group: "Apps & Software",
    items: [
      { name: "KALERU Apps", price: "2.500 €", from: true, note: "MVP web", text: "Portal de clientes, panel administrativo o herramienta interna. Apps móviles desde 3.500 €." },
    ],
  },
] as const;

export const steps = [
  { step: "01", title: "Descubrimiento", text: "Entendemos tu negocio y el problema concreto. Sin jerga, con un alcance por escrito." },
  { step: "02", title: "Prototipo", text: "Diseño o demo funcional con datos de prueba para validar antes de invertir más." },
  { step: "03", title: "Desarrollo", text: "Construimos, probamos y desplegamos con entregas frecuentes que puedes revisar." },
  { step: "04", title: "Evolución", text: "Mantenimiento y mejoras: de web a reservas, de reservas a portal, de portal a app." },
] as const;

export const demos = [
  { title: "Web inmersiva", kind: "Creative Web", text: "Experiencia interactiva para una marca ficticia." },
  { title: "Flujo IA con aprobación", kind: "AI & Automation", text: "n8n + IA que clasifica solicitudes y espera tu visto bueno." },
  { title: "App con login", kind: "Apps & Software", text: "Producto web con autenticación y operaciones reales." },
] as const;
