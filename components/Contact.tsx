"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mail, CheckCircle2, XCircle } from "lucide-react";
import FormField from "./FormField";
import Button from "./Button";
import { contactSchema, type ContactFormData } from "./schemas";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(false);
    setErrorMessage("");

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fallo al enviar el email');
      }

      setSent(true);
      reset(); // Limpia el formulario
    } catch (err: any) {
      console.error("Error al enviar el email:", err);
      setServerError(true);
      setErrorMessage(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="glow-blob w-96 h-96 bg-pink-700 bottom-0 right-0 absolute opacity-10" />
      <div className="glow-blob w-96 h-96 bg-purple-700 top-0 left-0 absolute opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-400 mb-3">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Empecemos a{" "}
            <span className="gradient-text">construir</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Contame qué necesitás y te respondo en menos de 24 hs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            {sent && !serverError ? (
              <div className="flex flex-col items-center justify-center h-full py-10 sm:py-16 text-center bg-[#0d0d1a] rounded-2xl border border-purple-900/30">
                <CheckCircle2 size={48} className="text-green-400 mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-gray-400 text-sm">
                  Te respondo pronto. Gracias por escribirme.
                </p>
              </div>
            ) : serverError ? (
              <div className="flex flex-col items-center justify-center h-full py-10 sm:py-16 text-center bg-[#0d0d1a] rounded-2xl border border-red-900/30">
                <XCircle size={48} className="text-red-400 mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">
                  ¡Error al enviar el mensaje!
                </h3>
                <p className="text-gray-400 text-sm">
                  {errorMessage || "Hubo un problema al enviar tu mensaje. Por favor, intentá de nuevo."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#0d0d1a] border border-purple-900/30 rounded-2xl p-5 sm:p-8 space-y-5"
              >
                {/* Honeypot Field - Invisible para usuarios */}
                <div className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden" aria-hidden="true">
                  <input
                    type="text"
                    {...register("website")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Nombre"
                    error={errors.name?.message}
                    {...register("name")}
                    placeholder="Tu nombre"
                  />
                  <FormField
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                    placeholder="tu@email.com"
                  />
                </div>

                <FormField
                  label="Mensaje"
                  isTextArea
                  rows={5}
                  error={errors.message?.message}
                  {...register("message")}
                  placeholder="Contame qué necesitás..."
                />

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  icon={Send}
                  className="w-full"
                >
                  Enviar mensaje
                </Button>
              </form>
            )}
          </div>

          {/* Contact links */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-start">
            <p className="text-gray-400 text-sm mb-2">
              O contactame directamente:
            </p>

            <a
              href="https://wa.me/541128365690"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#0d0d1a] border border-green-900/40 hover:border-green-600/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="48" height="48" rx="10" fill="#25D366"/>
                  <path d="M24 8C15.163 8 8 15.163 8 24c0 2.837.737 5.5 2.027 7.817L8 40l8.418-2.007A15.932 15.932 0 0024 40c8.837 0 16-7.163 16-16S32.837 8 24 8z" fill="#25D366"/>
                  <path d="M24 10.4C16.48 10.4 10.4 16.48 10.4 24c0 2.624.72 5.08 1.976 7.184L10.4 37.6l6.576-1.944A13.52 13.52 0 0024 37.6c7.52 0 13.6-6.08 13.6-13.6S31.52 10.4 24 10.4z" fill="white"/>
                  <path d="M19.04 16.8c-.336-.784-.688-.8-1.008-.816-.264-.016-.56-.016-.856-.016-.296 0-.784.112-1.192.56-.408.448-1.56 1.528-1.56 3.72s1.592 4.312 1.816 4.608c.224.296 3.088 4.92 7.6 6.704 3.76 1.488 4.52 1.192 5.336 1.12.816-.072 2.624-1.072 2.992-2.112.368-1.04.368-1.928.256-2.112-.112-.184-.408-.296-.856-.52-.448-.224-2.624-1.296-3.032-1.44-.408-.144-.704-.224-1 .224-.296.448-1.144 1.44-1.408 1.736-.256.296-.52.336-.968.112-.448-.224-1.888-.696-3.6-2.224-1.328-1.184-2.232-2.648-2.488-3.096-.256-.448-.024-.688.2-.912.2-.2.448-.52.672-.784.224-.264.296-.448.448-.744.144-.296.08-.56-.04-.784-.12-.224-.984-2.424-1.352-3.24z" fill="#25D366"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">WhatsApp</p>
                <p className="text-gray-500 text-xs">Respuesta rápida</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/leialab.app?igsh=bXF3aDdkbXh6dnow&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#0d0d1a] border border-pink-900/40 hover:border-pink-600/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <radialGradient id="ig-grad1" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#ffd600"/>
                      <stop offset="50%" stopColor="#ff6f00"/>
                      <stop offset="100%" stopColor="#e91e8c"/>
                    </radialGradient>
                    <radialGradient id="ig-grad2" cx="0%" cy="100%" r="100%">
                      <stop offset="0%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#8b5cf600"/>
                    </radialGradient>
                  </defs>
                  <rect width="48" height="48" rx="10" fill="url(#ig-grad1)"/>
                  <rect width="48" height="48" rx="10" fill="url(#ig-grad2)"/>
                  <rect x="10" y="10" width="28" height="28" rx="8" stroke="white" strokeWidth="2.8" fill="none"/>
                  <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="2.8" fill="none"/>
                  <circle cx="33" cy="15" r="2" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Instagram</p>
                <p className="text-gray-500 text-xs">@leialab</p>
              </div>
            </a>

            <a
              href="mailto:hola@leialab.com"
              className="group flex items-center gap-4 bg-[#0d0d1a] border border-purple-900/40 hover:border-purple-600/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
                <Mail size={22} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Email</p>
                <p className="text-gray-500 text-xs">hola@leialab.com</p>
              </div>
            </a>

            {/* Tagline */}
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-purple-700/30">
              <p className="text-gray-300 text-sm italic leading-relaxed">
                "Trabajo con negocios que quieren crecer sin complicarse. Si
                tenés un proceso repetitivo, lo automatizamos."
              </p>
              <p className="text-pink-400 text-xs font-medium mt-2">
                — Mariano Arrieta
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
