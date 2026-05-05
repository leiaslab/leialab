"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const highlights = [
  "Apps web a medida, intuitivas y escalables",
  "Soluciones a medida para tu proceso real",
  "Stack moderno y escalable",
  "Soporte y acompañamiento post-lanzamiento",
];

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
      <div className="glow-blob w-80 h-80 bg-purple-700 bottom-10 right-10 absolute" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: visual card */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md pt-5 pb-6 px-5">
              {/* Main card */}
              <div className="bg-[#0d0d1a] border border-purple-900/40 rounded-3xl p-8 shadow-2xl">
                {/* Avatar */}
                <div className="mb-6">
                  <Image
                    src="/mariano.jpg"
                    alt="Mariano Arrieta"
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-2 border-purple-500"
                  />
                </div>

                <h3 className="text-white font-bold text-xl mb-1">
                  Mariano Arrieta
                </h3>
                <p className="text-pink-400 text-sm font-medium mb-4">
                  Desarrollador web & automatizaciones
                </p>

                <div className="h-px bg-gradient-to-r from-pink-600/40 to-transparent mb-4" />

                <ul className="space-y-3">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2
                        size={16}
                        className="text-pink-400 flex-shrink-0 mt-0.5"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Floating badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl px-4 py-2 shadow-lg">
                <p className="text-white text-xs font-semibold">
                  Tecnología con propósito
                </p>
              </div>

              {/* Powered by badge */}
              <div className="absolute bottom-0 left-0 bg-[#0d0d1a] border border-purple-700/40 rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-300 text-xs font-medium">
                  Powered by Leia Lab
                </span>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-400 mb-3">
              Sobre mí
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Desarrollador de soluciones{" "}
              <span className="gradient-text">que funcionan</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Soy Mariano Arrieta, desarrollador de soluciones web y
              automatizaciones para negocios. Creo herramientas simples,
              visuales y funcionales para ordenar procesos, ahorrar tiempo y
              vender mejor.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Trabajo con emprendedores, comercios y equipos que quieren
              digitalizar lo que hacen sin complejidad innecesaria. Cada
              proyecto empieza entendiendo el problema real y termina con una
              herramienta que la gente realmente usa.
            </p>

            {/* Tech stack */}
            <div>
              <p className="text-sm text-gray-500 mb-3 uppercase tracking-widest text-xs">
                Stack tecnológico
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "Tailwind",
                  "Supabase",
                  "PostgreSQL",
                  "Vercel",
                  "WhatsApp API",
                  "Mercado Pago",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#12122a] border border-purple-900/40 text-gray-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
