"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  ChevronUp,
  Loader2,
  User,
  Zap,
  Globe,
} from "lucide-react";

type Message = {
  role: "user" | "ai";
  text: string;
  timestamp: Date;
};

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleSendMessage = async (customMessage?: string) => {
    const msgToSend = customMessage || input;
    if (!msgToSend.trim() || isLoading) return;

    const newUserMsg: Message = {
      role: "user",
      text: msgToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Pastikan history diformat sesuai keinginan Gemini (user & model)
      const chatHistory = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgToSend,
          history: chatHistory,
        }),
      });

      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: data.text, timestamp: new Date() },
        ]);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "I'm having trouble connecting to my brain. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[50] flex flex-col items-end gap-4">
      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-card/80 backdrop-blur-xl border border-border shadow-xl hover:bg-primary hover:text-white transition-all group"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Jendela Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            // PERBAIKAN: max-h dan h dinamis agar tidak melewati header
            className="w-[calc(100vw-2rem)] md:w-[400px] h-fit max-h-[70vh] md:max-h-[600px] flex flex-col bg-card/95 backdrop-blur-2xl border border-border shadow-2xl rounded-[2.5rem] overflow-hidden mb-2"
          >
            {/* Header */}
            <div className="p-5 border-b border-border bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground leading-none mb-1">
                    Sakib AI
                  </h3>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Area Pesan */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide min-h-[300px]"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted/50 border border-border p-3.5 rounded-2xl rounded-tl-none text-[13px] leading-relaxed">
                  Hi! I'm Sakib's AI assistant. Ask me anything about his
                  projects, skills, or experience!
                </div>
              </div>

              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-primary border-primary shadow-lg shadow-primary/20" : "bg-muted border-border"}`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} className="text-white" />
                    ) : (
                      <Globe size={14} className="text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${msg.role === "user" ? "bg-primary text-white rounded-tr-none" : "bg-muted/80 border border-border text-foreground rounded-tl-none"}`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-xl bg-muted shrink-0" />
                  <div className="bg-muted h-10 w-24 rounded-2xl rounded-tl-none" />
                </div>
              )}
            </div>

            {/* Footer Input */}
            <div className="p-5 border-t border-border bg-card shrink-0">
              {messages.length === 0 && (
                <div className="pb-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSendMessage("What is Sakib's stack?")}
                    className="text-[10px] font-bold py-1.5 px-3 rounded-full border border-border bg-background hover:bg-primary/10 transition-all"
                  >
                    🚀 Stack
                  </button>
                  <button
                    onClick={() => handleSendMessage("Show me projects")}
                    className="text-[10px] font-bold py-1.5 px-3 rounded-full border border-border bg-background hover:bg-primary/10 transition-all"
                  >
                    📂 Projects
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 bg-muted/40 border border-border rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none text-xs px-2 focus:ring-0 outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-white disabled:opacity-50 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Utama */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl group"
      >
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
        <div className="relative z-20">
          {isOpen ? (
            <X className="text-white" size={24} />
          ) : (
            <MessageSquare className="text-white" size={24} />
          )}
        </div>
      </motion.button>
    </div>
  );
}
