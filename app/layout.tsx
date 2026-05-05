import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/ScrollReset";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#07070f] text-white overflow-x-hidden">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
