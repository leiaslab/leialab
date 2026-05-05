"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./Button";
import RubiksCube from "./RubiksCube";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center overflow-hidden min-h-svh"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Glow blobs */}
      <div
        className="glow-blob w-96 h-96 bg-pink-600 -top-20 -left-20"
        style={{ position: "absolute" }}
      />
      <div
        className="glow-blob w-96 h-96 bg-purple-700 top-1/2 -right-20"
        style={{ position: "absolute" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-32 pb-12 sm:pb-16">

        {/* Heading */}
        <h1 className="text-[clamp(1.75rem,7.5vw,5rem)] font-bold leading-tight mb-6 mt-8 break-words">
          <span className="text-white">Apps web y </span>
          <span className="gradient-text">automatizaciones</span>
          <br />
          <span className="text-white">para negocios reales</span>
        </h1>

        <p className="text-gray-400 text-xl sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Herramientas simples, visuales y funcionales para ordenar procesos,
          ahorrar tiempo y vender mejor.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '#apps'}
            className="text-lg px-10 py-5"
            icon={ArrowRight}
            iconSize={22}
          >
            Ver aplicaciones
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '#contacto'}
            className="text-lg px-10 py-5"
            icon={MessageCircle}
            iconSize={22}
          >
            Contactar
          </Button>
        </div>

        {/* Floating code snippet — aparece al hacer scroll */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-16 block w-full max-w-sm sm:max-w-md overflow-x-auto text-left bg-[#0d0d1a]/80 backdrop-blur-sm border border-purple-900/40 rounded-xl p-4 font-mono text-sm shadow-2xl"
        >
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="space-y-1">
            <div>
              <span className="text-purple-400">function</span>
              <span className="text-pink-400"> crearImpacto</span>
              <span className="text-gray-400">() {"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-blue-400">const</span>
              <span className="text-gray-300"> ideas </span>
              <span className="text-pink-400">=</span>
              <span className="text-green-400"> innovar()</span>
              <span className="text-gray-400">;</span>
            </div>
            <div className="pl-4">
              <span className="text-blue-400">const</span>
              <span className="text-gray-300"> impacto </span>
              <span className="text-pink-400">=</span>
              <span className="text-green-400"> transformar()</span>
              <span className="text-gray-400">;</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400">return</span>
              <span className="text-gray-300"> impacto</span>
              <span className="text-gray-400">;</span>
            </div>
            <div className="text-gray-400">{"}"}</div>
          </div>
        </motion.div>
      </div>

      {/* Rubik's Cube — solo desktop */}
      <div className="absolute top-[30%] -translate-y-1/2 z-10 hidden xl:block" style={{ right: "clamp(6.4rem, calc(6vw + 2.4rem), 11.4rem)" }}>
        <RubiksCube />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
