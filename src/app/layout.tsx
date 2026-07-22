import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://crevis.pl"; // ← zmień na właściwą domenę

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Crevis",
  description:
    "Crevis to studio webdev. Projektujemy i wdrażamy szybkie, responsywne strony internetowe oraz grafikę dla firm.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Crevis",
    title: "Crevis",
    description:
      "Studio webdev. Projektujemy i wdrażamy szybkie, responsywne strony internetowe oraz grafikę dla firm.",
    images: [{ url: "/img/hero.png", width: 1200, height: 630, alt: "CREVIS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crevis",
    description:
      "Studio webdev. Szybkie, responsywne strony internetowe oraz grafika dla firm.",
    images: ["/img/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${archivo.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}<Analytics /></body>
    </html>
  );
}
