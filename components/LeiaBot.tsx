import Image from "next/image";
import ContactIcon from "./ContactIcon";
import { WHATSAPP_URL } from "./contact-info";

const message = "Hola Mariano, te contacto desde Leia Lab. Quiero consultar por un proyecto.";
const contactUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

export default function LeiaBot() {
  return (
    <a
      href={contactUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con Mariano por WhatsApp, abre en otra pestaña"
      title="Hablemos por WhatsApp"
      className="fixed bottom-4 right-4 z-[100] block h-14 w-14 rounded-full shadow-lg sm:h-16 sm:w-16"
    >
      <span aria-hidden="true" className="leiabot-greeting absolute bottom-full right-0 mb-3 block w-max max-w-[calc(100vw-32px)] rounded-2xl rounded-br-sm border border-violet-400/40 bg-[#1c1c32] px-4 py-2.5 text-sm font-semibold text-violet-200 shadow-lg">
        ¡Guau guau! Soy LeiaBot 🐾
        <span className="mt-1 block text-xs font-normal text-slate-200">Hablemos por WhatsApp</span>
        <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-violet-400/40 bg-[#1c1c32]" />
      </span>
      <span className="block h-full w-full overflow-hidden rounded-full border border-violet-400/60 bg-[#171725]">
        <Image src="/images/leiabot.png" alt="" width={64} height={64} className="leiabot-wag h-full w-full object-cover" />
      </span>
      <span aria-hidden="true" className="absolute -bottom-0.5 -right-0.5 rounded-full border border-white/20 bg-[#11111c] p-1">
        <ContactIcon channel="whatsapp" size={18} />
      </span>
    </a>
  );
}
