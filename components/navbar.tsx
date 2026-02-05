"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  User,
  Code2,
  Briefcase,
  LayoutGrid,
  Mail,
  Home,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#experience", label: "Exp", icon: Briefcase },
  { href: "#projects", label: "Work", icon: LayoutGrid },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setMounted(true);

    // Observer untuk mendeteksi section aktif secara otomatis saat scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Menggunakan threshold yang pas agar deteksi akurat di mobile
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: "-10% 0px -20% 0px", // Offset agar deteksi terjadi sebelum section mentok ke atas
      },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    // Deteksi jika di paling atas (Home)
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* --- HEADER (Desktop & Mobile Logo/Theme) --- */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "pointer-events-auto transition-all duration-500",
            "w-full md:w-fit md:min-w-[500px] rounded-2xl md:rounded-full border border-border/50",
            "bg-background/60 backdrop-blur-xl shadow-lg px-4 py-2",
          )}
        >
          <nav className="flex items-center justify-between gap-8">
            <motion.a
              href="#"
              className="text-lg font-black text-foreground font-montserrat tracking-tighter"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              SF<span className="text-primary">.</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabDesktop"
                        className="absolute inset-0 bg-primary/10 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.3,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-9 w-9 rounded-full hover:bg-primary/10 transition-transform active:scale-90"
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                      >
                        <Sun className="h-4 w-4 text-yellow-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                      >
                        <Moon className="h-4 w-4 text-blue-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              )}
            </div>
          </nav>
        </motion.header>
      </div>

      {/* --- MOBILE BOTTOM BAR --- */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto bg-background/80 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] shadow-2xl p-2 w-full max-w-[400px]"
        >
          <div className="flex items-center justify-around relative">
            {/* Nav Item: Home */}
            <MobileNavItem
              href=""
              label="Home"
              icon={Home}
              isActive={activeSection === ""}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("");
              }}
            />

            {/* Nav Item: Sections */}
            {navLinks.map((link) => (
              <MobileNavItem
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                isActive={activeSection === link.href}
                onClick={() => handleNavClick(link.href)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

// Sub-Komponen untuk Navigasi Mobile agar kode bersih
function MobileNavItem({ href, label, icon: Icon, isActive, onClick }: any) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "relative flex flex-col items-center gap-1 p-3 transition-all duration-300 rounded-2xl",
        isActive ? "text-primary" : "text-muted-foreground",
      )}
    >
      {/* Efek Hover (Hanya terlihat saat ditekan/hover di mobile tertentu) */}
      <motion.div
        className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0"
        whileHover={{ opacity: 1 }}
      />

      <Icon
        className={cn(
          "h-5 w-5 relative z-10 transition-transform",
          isActive && "scale-110",
        )}
      />
      <span className="text-[9px] font-bold uppercase relative z-10">
        {label}
      </span>

      {/* Indikator Active Meluncur */}
      {isActive && (
        <motion.div
          layoutId="activeTabMobile"
          className="absolute inset-0 bg-primary/10 rounded-2xl border-t-2 border-primary/20"
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}
