"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="/leia-logo.png"
            alt="Leia Lab"
            width={180}
            height={60}
            className="object-contain translate-y-[2cm]"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative group inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-purple-600/20 hover:shadow-[0_0_12px_rgba(168,85,247,0.35)]"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 group-hover:w-3/4" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <Button
          onClick={() => window.location.href = '#contacto'}
          className="hidden md:flex px-5 py-2 text-xs"
        >
          Contactar
        </Button>

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
