import Image from "next/image";
import ContactIcon from "./ContactIcon";
import { INSTAGRAM_URL, WHATSAPP_URL } from "./contact-info";
import { NAV_LINKS } from "./navigation";

const socials = [
  { channel: "whatsapp", href: WHATSAPP_URL, label: "WhatsApp" },
  { channel: "instagram", href: INSTAGRAM_URL, label: "Instagram" },
  { channel: "email", href: "mailto:hola@leialab.com", label: "Email" },
] as const;

export default function Footer() {
  return (
    <footer className="pb-24">
      <div className="mx-auto max-w-6xl px-4 pt-7 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="#inicio" aria-label="Leia Lab, volver al inicio" className="relative block aspect-[3/1] w-full max-w-[320px] overflow-hidden rounded-xl">
            <Image src="/footer-logo.png" alt="Leia Lab" fill sizes="320px" className="object-cover" />
          </a>
          <div className="flex flex-col gap-5 md:items-end">
            <nav aria-label="Navegación del pie"><ul className="flex flex-wrap gap-x-5 gap-y-2">{NAV_LINKS.map(link => <li key={link.href}><a href={link.href} className="inline-flex min-h-11 items-center rounded-md text-sm text-slate-300 hover:text-white">{link.label}</a></li>)}</ul></nav>
            <div className="flex gap-4">{socials.map(({ channel, href, label }) => <a key={label} href={href} target={channel === "email" ? undefined : "_blank"} rel={channel === "email" ? undefined : "noopener noreferrer"} aria-label={label} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5"><ContactIcon channel={channel} size={24} /></a>)}</div>
          </div>
        </div>
        <p className="mt-6 border-t border-white/10 pt-5 text-xs text-slate-400">© {new Date().getFullYear()} Leia Lab · Mariano Arrieta</p>
      </div>
    </footer>
  );
}
