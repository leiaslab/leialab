import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { START_AT_TOP_SCRIPT } from "@/components/scroll-reset-script";
import ScrollReset from "@/components/ScrollReset";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


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
      <head>
        <script id="leia-start-at-top" dangerouslySetInnerHTML={{ __html: START_AT_TOP_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
