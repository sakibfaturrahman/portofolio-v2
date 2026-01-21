"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  ChevronUp,
  Loader2,
  User,
  Orbit,
  Cpu,
  Sparkles,
  Wifi,
  WifiOff,
} from "lucide-react";
import profile from "@/data/profile.json";
import { buildResponse } from "@/lib/response-builder";

type Message = {
  role: "user" | "ai";
  text: string;
  timestamp: Date;
};

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fungsi Render Link
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 font-bold break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Auto Scroll - Diperkuat agar selalu ke bawah saat loading/pesan bertambah
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAIResponse = async (userInput: string, intent?: string) => {
    setIsLoading(true);
    if (isOnline) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        });
        const data = await res.json();
        return data.text || "Waduh, koneksi ke Gemini terputus nih! 📡";
      } catch (error) {
        return "Ouch! Ada kabel virtual yang sedikit korslet nih! ⚡ Coba lagi nanti ya.";
      } finally {
        setIsLoading(false);
      }
    } else {
      // MODE OFFLINE - Delay sedikit agar terasa natural
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsLoading(false);
      return buildResponse(intent || "unknown");
    }
  };

  const handleAction = async (intent: string, label: string) => {
    const userMsg: Message = {
      role: "user",
      text: label,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const responseText = await getAIResponse(label, intent);
    const aiMsg: Message = {
      role: "ai",
      text: responseText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      role: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    const responseText = await getAIResponse(currentInput);
    const aiMsg: Message = {
      role: "ai",
      text: responseText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-3">
      {/* Scroll Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 border shadow-xl"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[360px] h-[550px] flex flex-col bg-white dark:bg-zinc-900 border shadow-2xl rounded-[2.5rem] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Orbit
                  className={`text-primary ${isOnline ? "animate-spin" : ""}`}
                  size={20}
                />
                <div>
                  <p className="text-sm font-bold">NexaOrion</p>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`}
                    />
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                      {isOnline ? "Online Core" : "Offline Storage"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`p-2 rounded-xl transition-all ${isOnline ? "bg-emerald-500/10 text-emerald-600 shadow-inner" : "bg-zinc-100 dark:bg-zinc-700 text-zinc-500"}`}
                >
                  {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth overscroll-contain"
              style={{ scrollbarWidth: "thin" }}
            >
              <div className="flex gap-2">
                <div className="p-2 h-fit rounded-lg bg-primary/10">
                  <Cpu size={14} className="text-primary" />
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none text-xs leading-relaxed">
                  Unit NexaOrion aktif! Mode:{" "}
                  <b>{isOnline ? "Gemini Online" : "Offline Core"}</b>. Ada yang
                  bisa saya bantu untuk mengenal Sakib lebih dalam? 🚀
                </div>
              </div>

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`p-2 rounded-lg h-fit ${
                      msg.role === "user"
                        ? "bg-zinc-200 dark:bg-zinc-700"
                        : "bg-primary/10"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User
                        size={14}
                        className="text-zinc-600 dark:text-zinc-300"
                      />
                    ) : (
                      <Sparkles size={14} className="text-primary" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] p-3 rounded-2xl text-xs whitespace-pre-line shadow-sm leading-relaxed transition-colors duration-200 ${
                      msg.role === "user"
                        ? `
                        /* Mode Light: Bubble Hitam, Teks Putih */
                        bg-zinc-900 text-zinc-50 
                        
                        /* Mode Dark: Bubble Putih, Teks Hitam */
                        dark:bg-zinc-100 dark:text-zinc-950 
                        
                        rounded-tr-none
                        font-medium
                      `
                        : `
                        bg-zinc-100
                        dark:bg-zinc-800
                        text-zinc-800
                        dark:text-zinc-200
                        rounded-tl-none
                      `
                    }`}
                  >
                    {renderTextWithLinks(msg.text)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-zinc-400 text-[10px] font-mono italic px-6"
                >
                  <Loader2 size={12} className="animate-spin" />{" "}
                  NEXA_PROCESSING...
                </motion.div>
              )}
            </div>

            {/* Footer Control */}
            <div className="p-4 border-t space-y-3 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "👋 Tentang", intent: "profile" },
                  { label: "🛠️ Stack", intent: "skills" },
                  { label: "📂 Projects", intent: "projects" },
                  { label: "🎓 Edu", intent: "education" },
                  { label: "📞 Kontak", intent: "contact" },
                ].map((c) => (
                  <button
                    key={c.intent}
                    onClick={() => handleAction(c.intent, c.label)}
                    className="text-[10px] px-3 py-1.5 rounded-xl border bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-primary dark:hover:border-primary transition-all active:scale-95 shadow-sm font-medium"
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={
                    isOnline
                      ? "Tanya apa saja ke Gemini..."
                      : "Gunakan tombol di atas (Offline)..."
                  }
                  disabled={!isOnline}
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-zinc-800 disabled:bg-zinc-100 dark:disabled:bg-zinc-900/50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isOnline || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:bg-zinc-400 transition-all shadow-lg shadow-primary/20"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-2xl border border-white/10 dark:border-zinc-200 group"
      >
        <Orbit
          size={28}
          className={`${isOpen ? "rotate-45" : "group-hover:rotate-12"} transition-transform duration-300`}
        />
      </motion.button>
    </div>
  );
}
