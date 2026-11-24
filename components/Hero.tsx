import { ArrowRight, ArrowUpRight } from "lucide-react";
import RubiksCube from "./RubiksCube";
import Particles from "./Particles";
import { WHATSAPP_URL } from "./contact-info";

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_192px] lg:items-start lg:gap-12 lg:pt-8">
      <Particles />
      <div className="relative z-10">
        <h1 id="hero-title" className="max-w-4xl text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-tight">
          Apps y automatizaciones<br /><span className="text-violet-300">para tu negocio.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">Herramientas a medida para ordenar tu trabajo, ahorrar tiempo y hacer más simple el día a día.</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500">
            Hablemos por WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href="#proyectos" className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-slate-200 hover:text-violet-300">Ver proyectos <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none relative z-10 hidden h-48 w-48 items-center justify-center lg:flex">
        <div className="shrink-0 scale-[0.58]"><RubiksCube /></div>
      </div>
    </section>
  );
}
