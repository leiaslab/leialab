"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Package,
  Headphones,
  Calendar,
  BarChart2,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const apps = [
  {
    icon: ShoppingCart,
    title: "Sistema POS",
    description:
      "Punto de venta moderno para comercios. Gestión de ventas, caja y clientes en tiempo real.",
    tags: ["Ventas", "Caja", "Reportes"],
    color: "from-pink-600 to-rose-600",
    glow: "shadow-pink-900/30",
  },
  {
    icon: Package,
    title: "Control de stock",
    description:
      "Inventario inteligente con alertas de stock bajo, movimientos y trazabilidad de productos.",
    tags: ["Inventario", "Alertas", "Historial"],
    color: "from-purple-600 to-violet-700",
    glow: "shadow-purple-900/30",
  },
  {
    icon: Headphones,
    title: "Mesa de ayuda virtual",
    description:
      "Sistema de tickets y reclamos con seguimiento, estados y panel de administración.",
    tags: ["Tickets", "Admin", "Soporte"],
    color: "from-blue-600 to-indigo-700",
    glow: "shadow-blue-900/30",
  },
  {
    icon: Calendar,
    title: "Gestión de turnos",
    description:
      "Agenda digital para negocios de servicio. Turnos online, notificaciones y calendario.",
    tags: ["Agenda", "Turnos", "WhatsApp"],
    color: "from-fuchsia-600 to-purple-700",
    glow: "shadow-fuchsia-900/30",
  },
  {
    icon: BarChart2,
    title: "Reportes de caja",
    description:
      "Dashboard financiero con cierres diarios, ingresos, egresos y exportación a PDF.",
    tags: ["Finanzas", "Dashboard", "PDF"],
    color: "from-emerald-600 to-teal-700",
    glow: "shadow-emerald-900/30",
  },
  {
    icon: QrCode,
    title: "Menú digital QR",
    description:
      "Menú online escaneable con QR. Actualización en tiempo real sin impresiones.",
    tags: ["QR", "Restaurant", "Digital"],
    color: "from-orange-500 to-pink-600",
    glow: "shadow-orange-900/30",
  },
];

export default function Apps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;

  const prev = () =>
    setActiveIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setActiveIndex((i) => Math.min(apps.length - visibleCount, i + 1));

  return (
    <section id="apps" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="glow-blob w-80 h-80 bg-purple-700 top-10 right-0 absolute" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-400 mb-3">
            Aplicaciones
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Soluciones listas para{" "}
            <span className="gradient-text">tu negocio</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Apps web desarrolladas para resolver problemas reales. Simples de
            usar, potentes por dentro.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard key={app.title} app={app} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {apps.map((app) => (
                <div key={app.title} className="min-w-full px-1">
                  <AppCard app={app} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="p-2 rounded-full border border-purple-700/50 text-gray-400 hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {apps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "bg-pink-500 w-6"
                      : "bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={activeIndex === apps.length - 1}
              className="p-2 rounded-full border border-purple-700/50 text-gray-400 hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppCard({
  app,
}: {
  app: (typeof apps)[0];
}) {
  const Icon = app.icon;
  return (
    <div
      className={`group relative bg-[#0d0d1a] border border-purple-900/30 rounded-2xl p-6 hover:border-purple-600/50 transition-all duration-300 hover:-translate-y-1 shadow-xl ${app.glow}`}
    >
      <div
        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${app.color} mb-4 shadow-lg`}
      >
        <Icon size={22} className="text-white" />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{app.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {app.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-purple-900/30 border border-purple-800/30 text-purple-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover glow */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
      />
    </div>
  );
}
