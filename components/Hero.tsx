import RubiksCube from "./RubiksCube";
import Particles from "./Particles";

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pt-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.12),transparent_65%)]" />
      <Particles />
      <div className="relative z-10">
        <h1 id="hero-title" className="max-w-4xl text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-tight lg:text-5xl">
          Apps web y <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">automatizaciones</span><br />para negocios reales.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">Herramientas a medida para ordenar tu trabajo, ahorrar tiempo y hacer más simple el día a día.</p>
      </div>
      <div className="relative z-10 min-w-0">
        <div aria-hidden="true" className="hero-cube pointer-events-none flex h-28 items-center justify-center lg:h-36">
          <div className="flex h-28 w-44 items-center justify-center lg:h-36 lg:w-48"><div className="shrink-0 scale-[0.38] lg:scale-50"><RubiksCube /></div></div>
        </div>
        <div aria-hidden="true" className="hero-code mx-auto mt-7 w-full max-w-md rounded-2xl bg-gradient-to-br from-fuchsia-400/35 via-violet-400/25 to-blue-400/25 p-px shadow-[0_18px_70px_-24px_rgba(139,92,246,0.5)] lg:mt-8 lg:max-w-none">
          <div className="overflow-hidden rounded-[15px] bg-[#10101f]/95">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.025] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-auto font-mono text-xs text-slate-400">leia-lab.js</span>
            </div>
            <pre className="whitespace-pre-wrap break-words px-4 py-5 font-mono text-[13px] leading-7 text-slate-300 sm:px-5 sm:text-sm"><code><span className="text-violet-300">function</span>{" "}<span className="text-pink-400">crearImpacto</span>{"() {\n"}{"  "}<span className="text-blue-300">const</span>{" ideas "}<span className="text-pink-400">=</span>{" "}<span className="text-emerald-300">innovar()</span>{";\n"}{"  "}<span className="text-blue-300">const</span>{" impacto "}<span className="text-pink-400">=</span>{" "}<span className="text-emerald-300">transformar()</span>{";\n"}{"  "}<span className="text-violet-300">return</span>{" impacto;\n}"}<span className="hero-code-cursor ml-1 inline-block h-4 w-1.5 translate-y-0.5 bg-fuchsia-400" /></code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
