import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ScrollReset from "@/components/ScrollReset";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const resetScroll = `(() => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const startAtTop = () => {
    if (location.hash) {
      history.replaceState(history.state, "", location.pathname + location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  startAtTop();
  window.addEventListener("pageshow", startAtTop);
})();`;

export const metadata: Metadata = {
  title: "Leia Lab — Apps web y automatizaciones para negocios",
  description:
    "Desarrollamos apps web a medida, automatizaciones con IA y paneles administrativos para negocios reales. Tecnología con propósito.",
  keywords: [
    "desarrollo web",
    "automatización",
    "apps a medida",
    "Next.js",
    "SaaS",
    "Leia Lab",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <Script id="leia-start-at-top" strategy="beforeInteractive">{resetScroll}</Script>
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
