"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Heart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/sakibfaturrahman",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/sakibfaturrahman",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:sakibfaturrahman92@gmail.com", label: "Email" },
];

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="relative pt-24 pb-12 overflow-hidden border-t border-border bg-background">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand Section */}
            <div className="md:col-span-5 space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter text-foreground font-montserrat">
                  SF.
                </h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto md:mx-0">
                Crafting robust back-end systems and seamless digital
                experiences with a focus on clean code and scalability.
              </p>

              {/* Social Badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border bg-card/40 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="md:col-span-3 text-center md:text-left">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-[0.3em] mb-8">
                Sitemap
              </h4>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-center justify-center md:justify-start text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all" />
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Status Section */}
            <div className="md:col-span-4 text-center md:text-left">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-[0.3em] mb-8">
                Availability
              </h4>
              <div className="p-6 rounded-[2rem] bg-card/40 backdrop-blur-md border border-border relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-foreground">
                      Open for Projects
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Have an idea? Let's turn it into reality. I'm currently
                    accepting freelance and full-time opportunities.
                  </p>
                </div>
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Mail className="w-12 h-12 rotate-12" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Made with</span>
              <span>by Sakib Faturrahman</span>
            </div>

            <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground/60">
              © {new Date().getFullYear()} — Tasikmalaya, Indonesia
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
