"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { RotateCcw, Send, X } from "lucide-react";
import ContactIcon from "./ContactIcon";
import { WHATSAPP_URL } from "./contact-info";

type Message = { id: string; from: "bot" | "user"; text: string; timestamp: number };
const STORAGE_KEY = "leiabot_v3";
const OPTIONS = ["Una app para mi negocio", "Automatizar tareas", "Pedir presupuesto"];
const NEXT_STEP = "Podés agregar más detalles o continuar en WhatsApp para hablar con Mariano.";
function message(from: Message["from"], text: string): Message {
  return { id: Date.now().toString(36) + Math.random().toString(36).slice(2), from, text, timestamp: Date.now() };
}
function welcome(): Message[] {
  return [message("bot", "Hola, soy LeiaBot. Contame tu idea y prepará tu consulta para Mariano. La enviás al continuar en WhatsApp.")];
}
function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Message>;
  return typeof item.id === "string" && (item.from === "user" || item.from === "bot") && typeof item.text === "string" && typeof item.timestamp === "number";
}
function readHistory(): Message[] | null {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!Array.isArray(saved) || !saved.every(isMessage) || !saved.some(item => item.from === "user")) return null;
    return saved.slice(-50).map(item => item.from === "bot" && item.text.includes("Mariano lo va a ver pronto") ? { ...item, text: NEXT_STEP } : item);
  } catch { return null; }
}

export default function LeiaBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const hasUserMessage = messages.some(item => item.from === "user");
  useEffect(() => {
    if (!hasUserMessage) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch { /* Storage is optional. */ }
  }, [messages, hasUserMessage]);
  useEffect(() => { if (open) inputRef.current?.focus({ preventScroll: true }); }, [open]);
  useEffect(() => { if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [open, messages]);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !panelRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    }
    document.addEventListener("pointerdown", outside, true);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside, true); document.removeEventListener("keydown", escape); };
  }, [open]);
  function toggle() {
    if (!open && messages.length === 0) setMessages(readHistory() || welcome());
    setOpen(value => !value);
  }
  function addText(text: string) {
    if (!text.trim()) return;
    const next = message("user", text.trim());
    const guidance = message("bot", NEXT_STEP);
    setMessages(current => [...current, next, ...(current.some(item => item.from === "user") ? [] : [guidance])].slice(-50));
    setInput("");
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); addText(input); }
  function continueOnWhatsApp() {
    const lines = messages.filter(item => item.from === "user").slice(-20).map(item => item.text);
    if (input.trim()) lines.push(input.trim());
    const text = "Hola Mariano, te consulto desde Leia Lab:\n\n" + (lines.join("\n\n") || "Quiero conversar sobre un proyecto.");
    window.open(WHATSAPP_URL + "?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
  }
  function clear() {
    setMessages(welcome()); setInput("");
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage is optional. */ }
    inputRef.current?.focus({ preventScroll: true });
  }
  return (
    <>
      <button ref={toggleRef} type="button" onClick={toggle} aria-label={open ? "Minimizar chat" : "Abrir chat"} aria-expanded={open} aria-controls="leiabot-panel" className="fixed bottom-4 right-4 z-[100] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-[#171725] shadow-lg sm:h-16 sm:w-16">
        {open ? <X size={24} aria-hidden="true" /> : <Image src="/images/leiabot.png" alt="" width={64} height={64} className="h-full w-full object-cover" />}
      </button>
      {open && (
        <div ref={panelRef} id="leiabot-panel" role="region" aria-label="Chat con LeiaBot" className="fixed bottom-[88px] right-4 z-[99] flex h-[min(520px,calc(100dvh-104px))] w-[min(380px,calc(100vw-32px))] min-h-0 flex-col overflow-hidden rounded-2xl border border-violet-400/35 bg-[#11111c] shadow-2xl">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3"><Image src="/images/leiabot.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" /><div><p className="font-semibold">LeiaBot</p><p className="text-xs text-slate-300">Preparemos tu consulta</p></div></div>
            <div className="flex"><button type="button" onClick={clear} aria-label="Reiniciar conversación" title="Reiniciar conversación" className="rounded-lg p-2.5 text-slate-300 hover:bg-white/5"><RotateCcw size={17} aria-hidden="true" /></button><button type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Minimizar ventana de chat" className="rounded-lg p-2.5 text-slate-300 hover:bg-white/5"><X size={19} aria-hidden="true" /></button></div>
          </div>
          <div ref={logRef} role="log" aria-label="Conversación" aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
            {messages.map(item => <div key={item.id} className={item.from === "user" ? "flex justify-end" : "flex justify-start"}><p className={"max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-sm leading-relaxed [overflow-wrap:anywhere] " + (item.from === "user" ? "bg-violet-600 text-white" : "bg-white/5 text-slate-200")}><span className="sr-only">{item.from === "user" ? "Vos: " : "LeiaBot: "}</span>{item.text}</p></div>)}
            {!hasUserMessage && <div className="flex flex-col gap-2">{OPTIONS.map(option => <button type="button" key={option} onClick={() => addText(option)} className="rounded-xl border border-white/15 px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-white/5">{option}</button>)}</div>}
          </div>
          <div className="shrink-0 border-t border-white/10 p-3">
            <form onSubmit={submit} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2">
              <label htmlFor="leiabot-message" className="sr-only">Tu consulta para Mariano</label>
              <input ref={inputRef} id="leiabot-message" value={input} onChange={event => setInput(event.target.value)} maxLength={600} aria-describedby="leiabot-help" placeholder="Contame qué necesitás..." className="min-w-0 flex-1 rounded bg-transparent py-1 text-sm text-white placeholder:text-slate-400" />
              <button type="submit" aria-label="Agregar mensaje" disabled={!input.trim()} className="rounded-lg bg-violet-600 p-2 text-white hover:bg-violet-500 disabled:opacity-40"><Send size={17} aria-hidden="true" /></button>
            </form>
            <button type="button" onClick={continueOnWhatsApp} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-green-500/35 bg-green-500/10 px-3 py-2 text-sm font-semibold text-green-300 hover:bg-green-500/15"><ContactIcon channel="whatsapp" size={18} />Continuar en WhatsApp</button>
            <p id="leiabot-help" className="mt-2 text-center text-xs text-slate-300">El envío se completa en WhatsApp.</p>
          </div>
        </div>
      )}
    </>
  );
}
