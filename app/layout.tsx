import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/navbar"; // Tambahkan Navbar di sini
import CustomCursor from "@/components/custom-cursor";
import FloatingAI from "@/components/floating-ai";
import "./globals.css";

// Konfigurasi Font dengan Display Swap untuk performa LCP yang lebih baik
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
    url: "https://sakibfaturrahman.dev", // Sesuaikan dengan domain kamu nanti
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
  maximumScale: 5, // Mengizinkan zoom untuk aksesibilitas
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
          {/* Smooth Scroll Wrapper harus membungkus seluruh konten interaktif */}
          <SmoothScrollProvider>
            {/* 1. Navbar (Kapsul Melayang) */}
            <Navbar />

            {/* 2. Custom Cursor (Logika Canvas Ular RGB) */}
            <CustomCursor />

            {/* 3. Main Content Container */}
            <main className="relative flex min-h-screen flex-col">
              {children}
            </main>

            {/* 4. Floating AI Assistant */}
            <FloatingAI />
          </SmoothScrollProvider>
        </ThemeProvider>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
