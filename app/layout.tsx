import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/navbar";
import CustomCursor from "@/components/custom-cursor";
import FloatingAI from "@/components/floating-ai";

import "./globals.css";

// 1. Optimasi Font: Menggunakan variabel CSS untuk konsistensi di Tailwind
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sakib Faturrahman | Fullstack Developer",
    template: "%s | Sakib Faturrahman",
  },
  description:
    "Active Full-Stack Developer specializing in Back-End systems, Laravel, and Node.js. Crafting scalable and clean web applications.",
  keywords: [
    "Sakib Faturrahman",
    "Web Developer",
    "Back-End Developer",
    "Laravel Developer Indonesia",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Sakib Faturrahman" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sakibfaturrahman.dev",
    title: "Sakib Faturrahman | Back-End Developer",
    description: "Building scalable systems with clean architecture.",
    siteName: "Sakib Portfolio",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning ditambahkan di sini karena ThemeProvider sering mengubah class pada <html>
    <html lang="id" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} 
          ${montserrat.variable} 
          ${jetBrainsMono.variable} 
          font-sans antialiased selection:bg-primary/30 selection:text-primary
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {/* Navigasi Utama */}
            <Navbar />

            {/* Elemen UI Melayang */}
            <CustomCursor />
            <FloatingAI />

            {/* Konten Utama */}
            <main className="relative flex min-h-screen flex-col">
              {children}
            </main>
          </SmoothScrollProvider>
        </ThemeProvider>

        {/* Analytics diletakkan di luar provider utama untuk menghindari re-render yang tidak perlu */}
        <Analytics />
      </body>
    </html>
  );
}
