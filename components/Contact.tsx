import Image from "next/image";
import ContactIcon from "./ContactIcon";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "./contact-info";

const channels = [
  { channel: "whatsapp", label: "WhatsApp", detail: "+54 9 11 2836-5690", href: WHATSAPP_URL },
  { channel: "instagram", label: "Instagram", detail: "@" + INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
  ...(CONTACT_EMAIL ? [{ channel: "email", label: "Email", detail: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` } as const] : []),
] as const;

export default function Contact() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="border-y border-white/10 bg-white/[0.015]">
      <div className="mx-auto grid max-w-6xl gap-9 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <h2 id="contact-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Contame tu idea.</h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-300">Lo vemos juntos y buscamos una solución simple para tu negocio.</p>
          <div className="mt-7 flex items-start gap-4">
            <Image src="/mariano.jpg" alt="Mariano Arrieta" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover" />
            <div>
              <p className="font-semibold">Soy Mariano Arrieta</p>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-300">Desarrollo apps y automatizaciones. Te acompaño desde la idea hasta la puesta en marcha.</p>
            </div>
          </div>
        </div>
        <div role="group" aria-label="Canales de contacto" className="grid w-full gap-3">
          {channels.map(({ channel, label, detail, href }) => (
            <a key={channel} href={href} target={channel === "email" ? undefined : "_blank"} rel={channel === "email" ? undefined : "noopener noreferrer"} className={"grid w-full grid-cols-[40px_minmax(0,1fr)] items-center gap-3 rounded-xl border p-4 transition-colors " + (channel === "whatsapp" ? "border-green-500/30 bg-green-500/[0.06] hover:bg-green-500/10" : "border-white/10 bg-[#101019] hover:bg-white/5")}>
              <span className="flex h-10 w-10 items-center justify-center"><ContactIcon channel={channel} size={32} /></span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 text-white">{label}</span>
                <span className="mt-1 block text-sm leading-5 text-slate-300 [overflow-wrap:anywhere]">{detail}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
