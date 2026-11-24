import Image from "next/image";
import { ChartNoAxesCombined, QrCode } from "lucide-react";

const projects = [
  {
    title: "Organiza+",
    category: "Organización personal",
    description: "Planificación semanal de recetas y categorías de gastos en una sola vista.",
    image: "/projects/organiza.webp",
    alt: "Vista de Organiza+ con las recetas de la semana y las categorías de gastos",
  },
  {
    title: "La Cucha de Hanna",
    category: "Gestión comercial",
    description: "Sistema de ventas con acceso por usuario para abrir la caja del comercio.",
    image: "/projects/hanna.webp",
    alt: "Pantalla de acceso del sistema de ventas La Cucha de Hanna",
  },
  {
    title: "Trébol",
    category: "Asistencias",
    description: "Control de asistencias y descansos para Trébol Seguridad.",
    image: "/projects/trebol.webp",
    alt: "Captura de la pantalla de acceso de Administración Trébol",
  },
  {
    title: "Timbre QR",
    category: "Contacto con QR",
    description: "Contacto desde la puerta mediante un código QR.",
    image: "/projects/timbre.webp",
    alt: "Captura de la pantalla de ingreso de administración de Timbre QR",
  },
];

const moreCases = [
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
      <p className="mt-3 text-base text-slate-300">Una referencia visual de los proyectos de Leia Lab.</p>
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
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {moreCases.map(project => {
          const Icon = project.icon;
          return (
            <article key={project.title} className="flex flex-col rounded-2xl border border-white/10 bg-[#101019] p-5 sm:p-6">
              <div className="flex items-center gap-3"><Icon size={24} aria-hidden="true" className="shrink-0 text-violet-300" /><h3 className="text-lg font-semibold">{project.title}</h3></div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
