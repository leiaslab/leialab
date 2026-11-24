"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="relative z-40">
      <nav aria-label="Navegación principal" className="mx-auto flex min-h-[136px] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 md:min-h-36">
        <a href="#inicio" onClick={() => setOpen(false)} aria-label="Leia Lab, inicio" className="shrink-0 rounded-xl">
          <Image src="/leia-logo.png" alt="Leia Lab" width={144} height={144} sizes="(min-width: 768px) 144px, 136px" preload className="h-[136px] w-[136px] object-contain md:h-36 md:w-36" />
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(link => (
            <li key={link.href}><a href={link.href} className="rounded-md py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white">{link.label}</a></li>
          ))}
        </ul>
        <button ref={toggleRef} type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)} className="rounded-lg border border-white/15 p-3 text-slate-200 md:hidden">
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <nav id="mobile-navigation" aria-label="Navegación móvil" className="absolute inset-x-4 top-full rounded-2xl border border-white/15 bg-[#11111c] p-3 shadow-xl md:hidden">
          <ul>{NAV_LINKS.map(link => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-base text-slate-200 hover:bg-white/5">{link.label}</a></li>)}</ul>
        </nav>
      )}
    </header>
  );
}
