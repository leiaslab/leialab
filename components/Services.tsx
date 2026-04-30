"use client";

import {
  Code2,
  Zap,
  LayoutDashboard,
  Plug,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo de apps web a medida",
    description:
      "Construimos aplicaciones web completas adaptadas a tu negocio. Desde la idea hasta el deploy, con stack moderno y escalable.",
    features: ["Next.js / React", "Supabase / PostgreSQL", "Deploy en la nube"],
  },
  {
    icon: Zap,
    title: "Automatización con IA",
    description:
      "Reducí el trabajo manual conectando tus herramientas con flujos inteligentes. Notificaciones, procesamiento de datos y más.",
    features: ["Flujos automáticos", "Procesamiento de datos", "Notificaciones"],
  },
  {
    icon: LayoutDashboard,
    title: "Paneles administrativos",
    description:
      "Dashboards claros y funcionales para visualizar métricas, gestionar usuarios y operar tu negocio desde cualquier dispositivo.",
    features: ["Tablas y filtros", "Gráficos en tiempo real", "Roles y permisos"],
  },
  {
    icon: Plug,
    title: "Integraciones",
    description:
      "Conectamos tu app con las herramientas que ya usás. Pagos, mensajería, planillas, documentos y más.",
    features: [
      "WhatsApp",
      "Google Sheets",
      "Supabase",
      "Mercado Pago",
      "PDF",
    ],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
      <div className="glow-blob w-72 h-72 bg-pink-600 bottom-0 left-0 absolute" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-400 mb-3">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            ¿Qué podemos{" "}
            <span className="gradient-text">construir juntos?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Cada servicio está pensado para resolver un problema concreto en tu
            operación.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative bg-[#0d0d1a] border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300"
              >
                {/* Number */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-purple-900/30 group-hover:text-purple-800/40 transition-colors select-none">
                  0{i + 1}
                </span>

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-600/20 to-purple-700/20 border border-pink-500/20">
                    <Icon size={22} className="text-pink-400" />
                  </div>
                  <h3 className="text-white font-semibold text-xl leading-snug pt-1">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-[#12122a] border border-purple-900/40 text-gray-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-pink-500" />
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-600/5 to-purple-700/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
