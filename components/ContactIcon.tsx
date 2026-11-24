import Image from "next/image";

export type ContactChannel = "whatsapp" | "instagram" | "email";

export default function ContactIcon({
  channel,
  size = 48,
}: {
  channel: ContactChannel;
  size?: number;
}) {
  if (channel !== "email") {
    return (
      <Image
        src={`/brand/${channel}.${channel === "instagram" ? "png" : "svg"}`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        unoptimized
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-[25%] border border-white/20 shadow-[0_4px_16px_rgba(99,102,241,0.25)]"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 55%, #a855f7 100%)",
      }}
    >
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
        <rect x="10" y="14" width="28" height="21" rx="4" fill="white" />
        <path d="m11.5 32 9-8m16 8-9-8" stroke="#c7d2fe" strokeWidth="1.5" />
        <path
          d="m11.5 17 10.3 7.9a3.6 3.6 0 0 0 4.4 0L36.5 17"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
