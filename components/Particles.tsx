"use client";

import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dots = Array.from({ length: 32 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.0003,
      size: Math.random() * 1.2 + 0.7,
      alpha: Math.random() * 0.3 + 0.2,
    }));
    let width = 0;
    let height = 0;
    let frame = 0;
    let inView = true;
    let lastTime = 0;

    function paint(time = 0) {
      const moving = !reducedMotion.matches && inView && !document.hidden;
      const delta = lastTime ? Math.min((time - lastTime) / 16.7, 2) : 1;
      lastTime = time;
      context!.clearRect(0, 0, width, height);
      for (const dot of dots) {
        if (moving) {
          dot.x = (dot.x + dot.vx * delta + 1) % 1;
          dot.y = (dot.y + dot.vy * delta + 1) % 1;
        }
        context!.beginPath();
        context!.arc(dot.x * width, dot.y * height, dot.size, 0, Math.PI * 2);
        context!.fillStyle = "rgba(167, 139, 250, " + dot.alpha + ")";
        context!.fill();
      }
      if (moving) frame = requestAnimationFrame(paint);
    }

    function restart() { cancelAnimationFrame(frame); lastTime = 0; paint(); }
    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      restart();
    }

    const observer = new ResizeObserver(resize);
    const visibility = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      restart();
    });
    observer.observe(canvas);
    visibility.observe(canvas);
    reducedMotion.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect(); visibility.disconnect();
      reducedMotion.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
