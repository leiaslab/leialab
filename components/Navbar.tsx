"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Apps", href: "#apps" },
  { label: "Servicios", href: "#servicios" },
  { label: "Casos de uso", href: "#casos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        {/* Logo mobile — queda en el navbar */}
        <Link href="/" className="relative z-50 flex-shrink-0 md:hidden">
          <Image
            src="/leia-logo.png"
            alt="Leia Lab"
            width={130}
            height={46}
            className="object-contain"
          />
        </Link>

        {/* Logo desktop — posición decorativa sobre el hero */}
        <Link href="/" className="relative z-50 flex-shrink-0 hidden md:block">
          <Image
            src="/leia-logo.png"
            alt="Leia Lab"
            width={298}
            height={104}
            className="object-contain"
            style={{
              transform: "translateY(151px) translateX(clamp(-152px, calc(-1 * (max(0px, (100vw - 1280px) / 2) + 16px) - 76px), -92px))"
            }}
          />
        </Link>

        {/* Desktop links — centrados y bajados 2.5cm */}
        <ul className="hidden md:flex items-center gap-0.5 absolute left-1/2 top-[calc(50%+1cm)] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="
                  relative group inline-flex items-center px-4 py-2 rounded-full
                  text-xl font-medium text-white/70
                  border border-transparent
                  transition-all duration-300 ease-out
                  hover:text-white
                  hover:border-purple-500/40
                  hover:bg-white/5
                  hover:scale-105
                  hover:shadow-[0_0_18px_rgba(139,92,246,0.4),0_0_6px_rgba(233,30,140,0.2)]
                "
              >
                {link.label}
                {/* línea inferior animada */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-2/3" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d0d1a]/95 backdrop-blur-md border-b border-purple-900/30">
          <ul className="flex flex-col px-4 py-4 gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-4 py-1.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-purple-600/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-sm font-medium text-white"
                onClick={() => setOpen(false)}
              >
                Contactar
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
