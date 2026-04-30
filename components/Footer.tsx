import { MessageCircle, AtSign, Mail } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Apps", href: "#apps" },
  { label: "Servicios", href: "#servicios" },
  { label: "Casos de uso", href: "#casos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

const socials = [
  { icon: MessageCircle, href: "https://wa.me/541128365690", label: "WhatsApp" },
  { icon: AtSign, href: "https://www.instagram.com/leialab.app?igsh=bXF3aDdkbXh6dnow&utm_source=qr", label: "Instagram" },
  { icon: Mail, href: "mailto:hola@leialab.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-purple-900/30 bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image
                src="/footer-logo.png"
                alt="Leia Lab"
                width={200}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Tecnología con propósito. Soluciones que transforman.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-gray-400 font-semibold text-sm mb-4 uppercase tracking-widest text-xs">
              Navegación
            </p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-gray-500 hover:text-gray-200 text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-gray-400 font-semibold text-sm mb-4 uppercase tracking-widest text-xs">
              Contacto
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-[#0d0d1a] border border-purple-900/30 text-gray-400 hover:text-white hover:border-purple-600/50 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-800/40 to-transparent mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Leia Lab — Todos los derechos reservados.</p>
          <p>
            Hecho con{" "}
            <span className="text-pink-500">♥</span> por Mariano Arrieta
          </p>
        </div>
      </div>
    </footer>
  );
}
