import Image from "next/image";
import { BellRing, ChartNoAxesCombined, Clover, QrCode, ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "./contact-info";

const projects = [
  {
    title: "Organiza+",
    category: "Organización personal",
    description: "Planificación semanal de recetas y categorías de gastos en una sola vista.",
    image: "/projects/organiza.webp",
    alt: "Vista de Organiza+ con las recetas de la semana y las categorías de gastos",
    url: "https://organiza-semanal.vercel.app/",
    action: "Ver proyecto",
    note: "Aplicación pública",
  },
  {
    title: "La Cucha de Hanna",
    category: "Gestión comercial",
    description: "Sistema de ventas con acceso por usuario para abrir la caja del comercio.",
    image: "/projects/hanna.webp",
    alt: "Pantalla de acceso del sistema de ventas La Cucha de Hanna",
    url: "https://la-cucha-de-hanna.vercel.app/",
    action: "Ver acceso",
    note: "Requiere una cuenta",
  },
];

const moreCases = [
  {
    title: "Trébol",
    description: "Control de asistencias y descansos para Trébol Seguridad.",
    icon: Clover,
    url: "https://asistencias-punto-mariano.mariano1983.chatgpt.site/",
    action: "Ver acceso",
    note: "Acceso para administradores y guardias",
  },
  {
    title: "Timbre QR",
    description: "Contacto desde la puerta mediante un código QR.",
    icon: BellRing,
  },
  {
    title: "Menú QR",
    description: "Carta digital para consultar desde el celular escaneando un QR.",
    icon: QrCode,
  },
  {
    title: "Financiera Pro",
    description: "Gestión financiera en una aplicación a medida.",
    icon: ChartNoAxesCombined,
  },
];

export default function Apps() {
  return (
    <section id="proyectos" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <h2 id="projects-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Casos de uso</h2>
      <p className="mt-3 text-base text-slate-300">Proyectos para resolver tareas concretas en distintos negocios.</p>
      <div className="mt-7 grid gap-6 md:grid-cols-2">
        {projects.map(project => (
          <article key={project.title} className="overflow-hidden rounded-2xl border border-white/10 bg-[#101019]">
            <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
              <Image src={project.image} alt={project.alt} fill sizes="(min-width: 1152px) 540px, (min-width: 768px) 46vw, 92vw" className="object-cover" />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-medium text-violet-300">{project.category}</p>
              <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-violet-300 hover:text-violet-200">{project.action}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">: {project.title}, abre en otra pestaña</span></a>
                <span className="text-xs text-slate-400">{project.note}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {moreCases.map(project => {
          const Icon = project.icon;
          const hasDemo = "url" in project;
          const href = hasDemo ? project.url : WHATSAPP_URL + "?text=" + encodeURIComponent("Hola Mariano, quiero conocer el proyecto " + project.title + ".");
          return (
            <article key={project.title} className="flex flex-col rounded-2xl border border-white/10 bg-[#101019] p-5 sm:p-6">
              <div className="flex items-center gap-3"><Icon size={24} aria-hidden="true" className="shrink-0 text-violet-300" /><h3 className="text-lg font-semibold">{project.title}</h3></div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-violet-300 hover:text-violet-200">{hasDemo ? project.action : "Consultar por WhatsApp"}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">: {project.title}, abre en otra pestaña</span></a>
                {hasDemo && <span className="text-xs text-slate-400">{project.note}</span>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
