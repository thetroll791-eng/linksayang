import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkSayang 💌 — Kirim Pesan Spesial Lewat Satu Link",
  description:
    "Buat link pesan spesial untuk orang spesial. Pilih tema (termasuk tema pacar 'Are You Love Me?' dan tema hitam elegan), pasang foto, atur bahasa Indonesia/English, dan bagikan satu link penuh kejutan. Gratis & siap di-upload ke Netlify.",
  keywords: [
    "LinkSayang",
    "pesan spesial",
    "link pesan",
    "are you love me",
    "kirim pesan",
    "special message link",
    "Netlify",
  ],
  authors: [{ name: "LinkSayang" }],
  openGraph: {
    title: "LinkSayang 💌 — Pesan Spesial dalam Satu Link",
    description:
      "Bikin link pesan romantis penuh kejutan. 10 tema, bisa pasang foto, 2 bahasa, gratis!",
    type: "website",
    siteName: "LinkSayang",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff0f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
