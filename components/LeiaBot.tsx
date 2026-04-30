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
};

function makeInitialMessages(): Message[] {
  const now = Date.now();
  return [
    {
      id: "init-1",
      from: "bot",
      text: "Hola, soy LeiaBot 🐾 ¿Querés cotizar una app, automatización o sistema para tu negocio?",
      timestamp: now,
    },
    {
      id: "init-2",
      from: "bot",
      text: "Elegí una opción o escribime lo que necesitás 👇",
      timestamp: now + 1,
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

const STORAGE_KEY = "leiabot_v2";
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
  const [messages, setMessages]   = useState<Message[]>(() => makeInitialMessages());
  const [input, setInput]         = useState("");
  const [showOptions, setOptions] = useState(true);
  const [pulse, setPulse]         = useState(false);
  const [typing, setTyping]       = useState(false);
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLInputElement>(null);

  /* Load localStorage */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Message[] = JSON.parse(saved);
        const hasUserMsg = parsed.some(m => m.from === "user");
        if (hasUserMsg) {
          setMessages(parsed);
          setOptions(false);
        }
      } catch { /* ignore */ }
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
      addMessage({ from: "bot", text: AUTO_RESPONSES[opt.id] });
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
        text: "¡Gracias por tu mensaje! Mariano lo va a ver pronto. También podés contactarlo directo por WhatsApp 👇",
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
        <div className="relative w-[68px] h-[68px]">
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
                width={68}
                height={68}
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
        <div className="fixed bottom-[96px] right-6 z-[99] w-[420px] max-w-[calc(100vw-1.5rem)]">
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
              <div className="flex items-center justify-between px-4 py-3.5"
                   style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <BotAvatar size={44} />
                  <div>
                    <p className="text-white font-bold text-[15px] leading-tight">LeiaBot</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">En línea</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={handleClear}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* ── Messages ── */}
              <div className="overflow-y-auto px-4 py-4 space-y-4 max-h-[460px] min-h-[180px]">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} items-end gap-2.5`}
                  >
                    {msg.from === "bot" && <BotAvatar size={30} />}

                    <div className={`flex flex-col gap-1 max-w-[78%] ${msg.from === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
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
                      <span className="text-[10px] text-gray-600 px-1">
                        {fmtTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex items-end gap-2.5">
                    <BotAvatar size={30} />
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
                        className="text-left px-3.5 py-2 rounded-xl border border-purple-700/40 bg-purple-900/15 text-purple-300 text-xs hover:bg-purple-800/30 hover:border-purple-500/60 hover:text-purple-200 transition-all duration-200"
                      >
                        {opt.label}
                      </button>
                    ))}

                    <button
                      onClick={sendWhatsApp}
                      className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-green-700/40 bg-green-900/15 text-green-400 text-xs hover:bg-green-800/25 hover:border-green-500/60 transition-all duration-200 mt-1"
                    >
                      <MessageCircle size={13} />
                      Enviar resumen a Mariano por WhatsApp
                    </button>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* ── Input ── */}
              <div className="px-4 pb-4 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 focus-within:border-purple-600/50"
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
                    className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
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
      )}
    </>
  );
}
