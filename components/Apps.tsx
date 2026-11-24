import { BellRing, CalendarDays, ChartNoAxesCombined, Clover, PawPrint, QrCode } from "lucide-react";

const cases = [
  {
    title: "Organiza+",
    description: "Planificación semanal de recetas y categorías de gastos en una sola vista.",
    icon: CalendarDays,
  },
  {
    title: "La Cucha de Hanna",
    description: "Sistema de ventas con acceso por usuario para abrir la caja del comercio.",
    icon: PawPrint,
  },
  {
    title: "Trébol",
    description: "Control de asistencias y descansos para Trébol Seguridad.",
    icon: Clover,
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
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {cases.map(project => {
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
