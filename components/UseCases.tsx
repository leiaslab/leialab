"use client";

import { Store, PawPrint, UtensilsCrossed, Building2, Megaphone, GraduationCap } from "lucide-react";

const cases = [
  {
    icon: Store,
    title: "Comercios",
    description:
      "Control de ventas, stock y caja para negocios minoristas. Todo en un panel simple.",
    examples: ["Ferreterías", "Ropa y calzado", "Librería", "Electrodomésticos"],
    color: "from-pink-600 to-rose-700",
  },
  {
    icon: PawPrint,
    title: "Pet shops",
    description:
      "Gestión de turnos de baño y corte, stock de productos y ficha por mascota.",
    examples: ["Peluquería canina", "Venta de alimentos", "Veterinaria", "Hotel de mascotas"],
    color: "from-purple-600 to-fuchsia-700",
  },
  {
    icon: UtensilsCrossed,
    title: "Gastronomía",
    description:
      "Menú digital QR, gestión de pedidos y reportes de caja para restaurantes y bares.",
    examples: ["Restaurantes", "Cafeterías", "Dark kitchens", "Delivery"],
    color: "from-orange-500 to-pink-600",
  },
  {
    icon: Building2,
    title: "Oficinas",
    description:
      "Automatizaciones internas, paneles de gestión y herramientas colaborativas para equipos.",
    examples: ["Estudios contables", "Inmobiliarias", "Consultorios", "Agencias"],
    color: "from-blue-600 to-indigo-700",
  },
  {
    icon: Megaphone,
    title: "Campañas y atención ciudadana",
    description:
      "Sistemas de mesa de ayuda, registro de reclamos y seguimiento para organismos públicos.",
    examples: ["Municipios", "ONGs", "Centros vecinales", "Campañas políticas"],
    color: "from-emerald-500 to-teal-700",
  },
  {
    icon: GraduationCap,
    title: "Educación y capacitación",
    description:
      "Plataformas para gestionar alumnos, cursos, pagos y seguimiento académico de forma centralizada.",
    examples: ["Institutos privados", "Academias", "Tutorías online", "Centros de idiomas"],
    color: "from-violet-600 to-purple-800",
  },
];

export default function UseCases() {
  return (
    <section id="casos" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="glow-blob w-80 h-80 bg-blue-700 top-1/2 right-10 absolute opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-400 mb-3">
            Casos de uso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Para cada tipo de{" "}
            <span className="gradient-text">negocio</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Trabajamos con negocios de distintos rubros. Si tenés un proceso que
            querés digitalizar, lo hacemos.
          </p>
        </div>

        {/* Cases — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-thin">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="group min-w-[280px] md:min-w-0 snap-start flex-shrink-0 bg-[#0d0d1a] border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${c.color} mb-4 shadow-lg`}
                >
                  <Icon size={20} className="text-white" />
                </div>

                <h3 className="text-white font-semibold text-lg mb-2">
                  {c.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {c.description}
                </p>

                <ul className="space-y-1.5">
                  {c.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500 flex-shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-blue-900/30 border border-purple-700/30 p-8 text-center">
          <div className="glow-blob w-64 h-64 bg-purple-600 -top-20 left-1/2 -translate-x-1/2 absolute" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              ¿Tu rubro no está en la lista?
            </h3>
            <p className="text-gray-400 mb-6">
              Si tenés un proceso que repetís todos los días, podemos
              automatizarlo o digitalizarlo.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Hablemos de tu caso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
