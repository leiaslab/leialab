import { Code2, Plug, Zap } from "lucide-react";

const services = [
  { Icon: Code2, title: "Apps y sistemas", description: "Ventas, turnos y gestión en una herramienta pensada para tu forma de trabajar." },
  { Icon: Zap, title: "Automatizaciones", description: "Reducí tareas repetitivas y ganá tiempo para dedicarle a tu negocio." },
  { Icon: Plug, title: "Integraciones", description: "Conectá pagos, WhatsApp y las herramientas que ya usás en un mismo flujo." },
];

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="border-y border-white/10 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 id="services-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Qué podemos hacer juntos</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {services.map(({ Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-[#101019] p-6">
              <Icon size={24} className="mb-5 text-violet-300" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
