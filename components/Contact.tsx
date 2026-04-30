"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, MessageCircle, AtSign, Mail, CheckCircle2, XCircle } from "lucide-react";
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
              <div className="flex flex-col items-center justify-center h-full py-16 text-center bg-[#0d0d1a] rounded-2xl border border-purple-900/30">
                <CheckCircle2 size={48} className="text-green-400 mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-gray-400 text-sm">
                  Te respondo pronto. Gracias por escribirme.
                </p>
              </div>
            ) : serverError ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center bg-[#0d0d1a] rounded-2xl border border-red-900/30">
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
                className="bg-[#0d0d1a] border border-purple-900/30 rounded-2xl p-8 space-y-5"
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
              <div className="p-3 rounded-xl bg-green-600/20 border border-green-600/20 group-hover:bg-green-600/30 transition-colors">
                <MessageCircle size={22} className="text-green-400" />
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
              <div className="p-3 rounded-xl bg-pink-600/20 border border-pink-600/20 group-hover:bg-pink-600/30 transition-colors">
                <AtSign size={22} className="text-pink-400" />
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
