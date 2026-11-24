import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ContactIcon from "./ContactIcon";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "./contact-info";

export default function Contact() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="border-y border-white/10 bg-white/[0.015]">
      <div className="mx-auto grid max-w-6xl gap-9 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-14">
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
        <div className="flex flex-col items-start justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex w-full items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/[0.06] p-5 transition-colors hover:bg-green-500/10">
            <ContactIcon channel="whatsapp" size={40} />
            <div className="min-w-0 flex-1"><p className="text-base font-semibold">Hablemos por WhatsApp</p><p className="mt-1 text-sm text-slate-300">+54 9 11 2836-5690</p></div>
            <ArrowUpRight size={19} aria-hidden="true" className="shrink-0 text-slate-300" />
          </a>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-slate-300 hover:text-white"><ContactIcon channel="instagram" size={24} />@{INSTAGRAM_HANDLE}</a>
            <a href="mailto:hola@leialab.com" className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-slate-300 hover:text-white"><ContactIcon channel="email" size={24} />hola@leialab.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
