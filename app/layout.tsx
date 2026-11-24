import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
