"use client";

import { useEffect, useState } from "react";

// Colores del cubo — paleta del sitio
const COLORS = [
  "#e91e8c", // 0 front  — pink
  "#8b5cf6", // 1 left   — purple
  "#3b82f6", // 2 back   — blue
  "#22c55e", // 3 right  — green
  "#f59e0b", // 4 top    — amber
  "#f0f0ff", // 5 bottom — white
];

// Transforma de cada cara del cubo
const TRANSFORMS = [
  "translateZ(99px)",
  "rotateY(-90deg) translateZ(99px)",
  "rotateY(180deg) translateZ(99px)",
  "rotateY(90deg) translateZ(99px)",
  "rotateX(90deg) translateZ(99px)",
  "rotateX(-90deg) translateZ(99px)",
];

function scramble(): number[][] {
  return COLORS.map((_, fi) =>
    Array.from({ length: 9 }, (_, ci) => {
      if (ci === 4) return fi; // centro siempre correcto
      return Math.random() < 0.45 ? Math.floor(Math.random() * 6) : fi;
    })
  );
}

// Cubo resuelto — estado estático seguro para SSR
const SOLVED: number[][] = COLORS.map((_, fi) => Array(9).fill(fi));

export default function RubiksCube() {
  const [faces, setFaces] = useState<number[][]>(SOLVED);

  useEffect(() => {
    setFaces(scramble());

    const id = setInterval(() => {
      setFaces(prev => {
        const next = prev.map(f => [...f]);
        // Cambiar 3-5 celdas aleatorias a colores aleatorios
        const n = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < n; i++) {
          const fi = Math.floor(Math.random() * 6);
          const ci = Math.floor(Math.random() * 9);
          if (ci !== 4) {
            next[fi][ci] = Math.floor(Math.random() * 6);
          }
        }
        return next;
      });
    }, 220);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        perspective: "520px",
        width: "198px",
        height: "198px",
        filter: "drop-shadow(0 0 24px rgba(139,92,246,0.45))",
      }}
    >
      <div
        style={{
          width: "198px",
          height: "198px",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "rubikSpin 14s linear infinite",
        }}
      >
        {faces.map((face, fi) => (
          <div
            key={fi}
            style={{
              position: "absolute",
              width: "198px",
              height: "198px",
              transform: TRANSFORMS[fi],
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
              padding: "5px",
              backgroundColor: "#08080f",
              borderRadius: "6px",
              backfaceVisibility: "hidden",
            }}
          >
            {face.map((colorIdx, ci) => (
              <div
                key={ci}
                style={{
                  backgroundColor: COLORS[colorIdx],
                  borderRadius: "4px",
                  transition: "background-color 0.25s ease",
                  boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.35)",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
