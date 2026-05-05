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
  User,
  MoreHorizontal,
  Zap,
} from "lucide-react";
import Image from "next/image";

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
  { id: "5", label: "Hablar con Mariano",            Icon: User,           color: "#8b5cf6" },
];

const AUTO_RESPONSES: Record<string, string> = {
  "1": "¡Genial! Desarrollamos apps web a medida con Next.js, paneles admin, dashboards y más. ¿Tenés una idea en mente? Contame o usá el botón de WhatsApp 🚀",
  "2": "Automatizamos WhatsApp con bots inteligentes para responder clientes, enviar notificaciones y gestionar turnos automáticamente. ¿Querés que Mariano te explique cómo funciona? 🤖",
  "3": "Desarrollamos sistemas de gestión de stock, inventario y ventas completamente a medida. Desde una tienda hasta una distribuidora. ¿Tenés algún requerimiento específico? 📦",
  "4": "¡Perfecto! Para armar tu presupuesto personalizado necesitamos charlar. Escribime acá o contactá a Mariano directo por WhatsApp 👇",
  "5": "¡Claro! Mariano está disponible para charlar sobre tu proyecto. Hacé clic en el botón de WhatsApp para contactarlo 👇",
};

const STORAGE_KEY = "leiabot_v3";
const WA_NUMBER   = "541132751198";

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
    if (open) { setTimeout(() => inputRef.current?.focus(), 150); setPulse(false); }
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
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
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
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="fixed bottom-6 right-6 z-[100] group"
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
        <div className="fixed inset-x-0 bottom-[115px] z-[99] flex justify-end pointer-events-none px-4">
        <div className="w-[500px] max-w-full pointer-events-auto">
          {/* Gradient border */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              padding: "1.5px",
              background: "linear-gradient(135deg,#e91e8c,#8b5cf6,#3b82f6)",
              boxShadow: "0 0 50px rgba(139,92,246,0.25), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="rounded-[14px] bg-[#0d0d1a] flex flex-col overflow-hidden">

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 py-4"
                   style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <BotAvatar size={52} />
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">LeiaBot</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-sm font-medium">En línea</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={handleClear}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* ── Messages ── */}
              <div className="overflow-y-auto px-5 py-5 space-y-5 max-h-[520px] min-h-[200px]">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} items-end gap-2.5`}
                  >
                    <div className={`flex flex-col gap-1 max-w-[88%] ${msg.from === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-[16px] leading-relaxed ${
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
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.847L.054 23.25a.75.75 0 00.916.916l5.403-1.477A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.714 9.714 0 01-4.964-1.364l-.355-.212-3.686 1.006 1.006-3.686-.212-.355A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                          </svg>
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
                      <MessageCircle size={15} />
                      Enviar resumen a Mariano por WhatsApp
                    </button>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* ── Input ── */}
              <div className="px-5 pb-5 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div
                  className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 focus-within:border-purple-600/50"
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
                    className="flex-1 bg-transparent text-base text-white placeholder-gray-600 outline-none"
                  />
                  <button className="text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0">
                    <Mic size={17} />
                  </button>
                  <button
                    onClick={handleSend}
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
                <div className="flex items-center justify-center gap-1.5 mt-3">
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
