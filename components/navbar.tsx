"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar berubah saat di-scroll
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ID" ? "EN" : "ID"));
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto transition-all duration-500 ease-in-out overflow-hidden",
            // Desain Kapsul Melayang (Desktop)
            "w-full md:w-fit md:min-w-[500px] rounded-2xl md:rounded-full border border-border/50",
            "bg-background/60 backdrop-blur-xl shadow-lg",
            isScrolled ? "md:px-4 py-2" : "md:px-6 py-3",
          )}
        >
          <nav className="flex items-center justify-between gap-8 px-4 md:px-2">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-lg font-black text-foreground font-montserrat tracking-tighter shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SF<span className="text-primary">.</span>
            </motion.a>

            {/* Desktop Navigation Link */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              {/* Language */}
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="h-8 md:h-9 px-2 md:px-3 rounded-full hover:bg-primary/10"
              >
                <Languages className="h-4 w-4 text-primary mr-1 md:mr-2" />
                <span className="text-[10px] font-black font-mono leading-none">
                  {language}
                </span>
              </Button> */}

              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full hover:bg-primary/10"
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Sun className="h-4 w-4 text-yellow-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Moon className="h-4 w-4 text-blue-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              )}

              {/* Mobile Trigger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-50 bg-background/95 backdrop-blur-2xl border border-border rounded-3xl md:hidden shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary py-3 transition-colors border-b border-border/50 last:border-0"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
