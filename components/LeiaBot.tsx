"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Mic,
  Globe,
  MessageCircle,
  Package,
  FileText,
  MoreHorizontal,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { WHATSAPP_URL } from "./contact-info";
import ContactIcon from "./ContactIcon";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
  timestamp: number;
  showWA?: boolean;
};

function makeInitialMessages(): Message[] {
  const now = Date.now();
  return [
    {
      id: "init-1",
      from: "bot",
      text: "Hola, soy LeiaBot 🐾 ¿Querés cotizar una app, automatización o sistema para tu negocio? Elegí una opción o escribime lo que necesitás 👇",
      timestamp: now,
    },
  ];
}

const QUICK_OPTIONS = [
  { id: "1", label: "Quiero una app web",           Icon: Globe,          color: "#8b5cf6" },
  { id: "2", label: "Quiero automatizar WhatsApp",  Icon: MessageCircle,  color: "#22c55e" },
  { id: "3", label: "Necesito un sistema de stock", Icon: Package,        color: "#f97316" },
  { id: "4", label: "Quiero pedir presupuesto",     Icon: FileText,       color: "#64748b" },
];

const AUTO_RESPONSES: Record<string, string> = {
  "1": "¡Genial! Desarrollamos apps web a medida con Next.js, paneles admin, dashboards y más. ¿Tenés una idea en mente? Contame o usá el botón de WhatsApp 🚀",
  "2": "Automatizamos WhatsApp con bots inteligentes para responder clientes, enviar notificaciones y gestionar turnos automáticamente. ¿Querés que Mariano te explique cómo funciona? 🤖",
  "3": "Desarrollamos sistemas de gestión de stock, inventario y ventas completamente a medida. Desde una tienda hasta una distribuidora. ¿Tenés algún requerimiento específico? 📦",
  "4": "¡Perfecto! Para armar tu presupuesto personalizado necesitamos charlar. Escribime acá o contactá a Mariano directo por WhatsApp 👇",
  "5": "¡Claro! Mariano está disponible para charlar sobre tu proyecto. Hacé clic en el botón de WhatsApp para contactarlo 👇",
};

const STORAGE_KEY = "leiabot_v3";

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

const AVATAR_SRC = "/images/leiabot.png";

function BotAvatar({ size }: { size: number }) {
  return (
    <div
      className="rounded-full flex-shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg,#e91e8c,#8b5cf6)",
        padding: 2,
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-[#0d0d1a]">
        <Image
          src={AVATAR_SRC}
          alt="LeiaBot"
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default function LeiaBot() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [showOptions, setOptions] = useState(true);
  const [pulse, setPulse]         = useState(false);
  const [typing, setTyping]       = useState(false);
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const panelRef                  = useRef<HTMLDivElement>(null);
  const toggleRef                 = useRef<HTMLButtonElement>(null);

  /* Load localStorage */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let restored = false;
    if (saved) {
      try {
        const parsed: Message[] = JSON.parse(saved);
        const hasUserMsg = parsed.some(m => m.from === "user");
        if (hasUserMsg) {
          setMessages(parsed);
          setOptions(false);
          restored = true;
        }
      } catch { /* ignore */ }
    }
    if (!restored) {
      setMessages(makeInitialMessages());
    }
    const t = setTimeout(() => setPulse(true), 3500);
    return () => clearTimeout(t);
  }, []);

  /* Persist solo si hay mensajes del usuario */
  useEffect(() => {
    if (messages.some(m => m.from === "user")) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* Focus on open */
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, [open]);

  /* Minimize without clearing the conversation when interacting outside. */
  useEffect(() => {
    if (!open) return;

    function handleOutsidePointer(event: PointerEvent) {
      const target = event.target;
      if (
        target instanceof Node &&
        !panelRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointer, true);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function addMessage(msg: Omit<Message, "id" | "timestamp">) {
    setMessages(prev => [
      ...prev,
      { ...msg, id: Math.random().toString(36).slice(2), timestamp: Date.now() },
    ]);
  }

  function handleOption(opt: (typeof QUICK_OPTIONS)[0]) {
    setOptions(false);
    addMessage({ from: "user", text: opt.label });
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage({ from: "bot", text: AUTO_RESPONSES[opt.id], showWA: true });
    }, 800);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setOptions(false);
    addMessage({ from: "user", text });
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage({
        from: "bot",
        text: "¡Gracias por tu mensaje! Mariano lo va a ver pronto.",
        showWA: true,
      });
    }, 900);
  }

  function sendWhatsApp() {
    const lines = messages.map(m => `${m.from === "bot" ? "LeiaBot" : "Vos"}: ${m.text}`);
    const text  = encodeURIComponent(`Hola Mariano, resumen del chat en LeiaBot:\n\n${lines.join("\n")}`);
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank");
  }

  function handleClear() {
    const init = makeInitialMessages();
    setMessages(init);
    setOptions(true);
    localStorage.removeItem(STORAGE_KEY);
  }

  /* ─── RENDER ─── */
  return (
    <>
      {/* ── Floating button ── */}
      <button
        ref={toggleRef}
        onClick={() => {
          setOpen(v => !v);
          setPulse(false);
        }}
        aria-label={open ? "Minimizar chat" : "Abrir chat"}
        aria-expanded={open}
        aria-controls="leiabot-panel"
        className="hidden md:block fixed bottom-6 right-6 z-[100] group"
      >
        <div className="relative w-[87px] h-[87px]">

          {/* Speech bubble loop */}
          {!open && (
            <div
              className="absolute bottom-full right-0 mb-3 pointer-events-none"
              style={{ animation: "leiabot-bubble 4s ease-in-out infinite" }}
            >
              <div className="relative bg-[#1c1c32] border border-purple-600/50 rounded-2xl rounded-br-sm px-5 py-3 shadow-xl whitespace-nowrap"
                style={{ boxShadow: "0 0 16px rgba(139,92,246,0.3)" }}
              >
                <span className="text-sm font-semibold text-purple-200">¡Guau guau! Soy LeiaBot 🐾</span>
                {/* Triangle pointing down-right */}
                <span className="absolute -bottom-[6px] right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1c1c32]" />
              </div>
            </div>
          )}

          {/* Neon ring */}
          <div
            className="absolute inset-0 rounded-full p-[2.5px] transition-all duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#e91e8c,#8b5cf6,#3b82f6)",
              boxShadow: "0 0 18px rgba(139,92,246,0.55)",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#07070f]">
              <Image
                src={AVATAR_SRC}
                alt="LeiaBot"
                width={87}
                height={87}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Notification dot */}
          {pulse && !open && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-[#07070f] animate-pulse z-10" />
          )}

          {/* Mini action badge */}
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-lg"
            style={{ background: "linear-gradient(135deg,#e91e8c,#8b5cf6)" }}
          >
            {open
              ? <X size={11} className="text-white" />
              : <Send size={11} className="text-white -translate-x-px" />
            }
          </div>
        </div>
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div className="hidden md:flex fixed inset-x-0 bottom-[115px] z-[99] justify-end pointer-events-none px-4">
        <div
          ref={panelRef}
          id="leiabot-panel"
          role="region"
          aria-label="Chat con LeiaBot"
          className="flex h-[min(560px,calc(100dvh-131px))] w-[380px] min-h-0 max-w-full flex-col pointer-events-auto"
        >
          {/* Gradient border */}
          <div
            className="flex min-h-0 flex-1 flex-col rounded-2xl overflow-hidden"
            style={{
              padding: "1.5px",
              background: "linear-gradient(135deg,#e91e8c,#8b5cf6,#3b82f6)",
              boxShadow: "0 0 50px rgba(139,92,246,0.25), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="min-h-0 flex-1 rounded-[14px] bg-[#0d0d1a] flex flex-col overflow-hidden">

              {/* ── Header ── */}
              <div className="flex shrink-0 items-center justify-between px-4 py-3"
                   style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <BotAvatar size={40} />
                  <div>
                    <p className="text-white font-bold text-base leading-tight">LeiaBot</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">En línea</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={handleClear}
                    aria-label="Reiniciar conversación"
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Minimizar ventana de chat"
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* ── Messages ── */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} items-end gap-2.5`}
                  >
                    <div className={`flex min-w-0 flex-col gap-1 max-w-[88%] ${msg.from === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed [overflow-wrap:anywhere] ${
                          msg.from === "user"
                            ? "text-white rounded-br-sm"
                            : "text-gray-200 rounded-bl-sm"
                        }`}
                        style={
                          msg.from === "user"
                            ? { background: "linear-gradient(135deg,#e91e8c,#8b5cf6)" }
                            : { background: "#1c1c32" }
                        }
                      >
                        {msg.text}
                      </div>
                      {msg.showWA && (
                        <button
                          onClick={sendWhatsApp}
                          className="flex items-center gap-2 mt-1 px-3.5 py-2 rounded-xl border border-green-700/50 bg-green-900/20 text-green-400 text-sm font-medium hover:bg-green-800/30 hover:border-green-500/60 transition-all duration-200"
                        >
                          <ContactIcon channel="whatsapp" size={16} />
                          Hablar con Mariano por WhatsApp
                        </button>
                      )}
                      <span className="text-xs text-gray-600 px-1">
                        {fmtTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex items-end gap-2.5">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[#1c1c32] flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                {/* Quick options */}
                {showOptions && (
                  <div className="flex flex-col gap-2 pt-1">
                    {QUICK_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleOption(opt)}
                        className="text-left px-4 py-2.5 rounded-xl border border-purple-700/40 bg-purple-900/15 text-purple-300 text-sm hover:bg-purple-800/30 hover:border-purple-500/60 hover:text-purple-200 transition-all duration-200"
                      >
                        {opt.label}
                      </button>
                    ))}

                    <button
                      onClick={sendWhatsApp}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-green-700/40 bg-green-900/15 text-green-400 text-sm hover:bg-green-800/25 hover:border-green-500/60 transition-all duration-200 mt-1"
                    >
                      <ContactIcon channel="whatsapp" size={16} />
                      Enviar resumen a Mariano por WhatsApp
                    </button>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* ── Input ── */}
              <div className="shrink-0 px-4 pb-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200 focus-within:border-purple-600/50"
                  style={{
                    background: "#161628",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    placeholder="Escribí tu mensaje..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                  />
                  <button className="text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0">
                    <Mic size={17} />
                  </button>
                  <button
                    onClick={handleSend}
                    aria-label="Enviar mensaje"
                    disabled={!input.trim()}
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-25"
                    style={{
                      background: "linear-gradient(135deg,#e91e8c,#8b5cf6)",
                      boxShadow: input.trim() ? "0 0 14px rgba(139,92,246,0.5)" : "none",
                    }}
                  >
                    <Send size={14} className="text-white translate-x-px" />
                  </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <Zap size={11} className="text-yellow-400" />
                  <span className="text-[11px] text-gray-600">Potenciado por Leia Lab</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
}
