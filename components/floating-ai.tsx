"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
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

const invitationTexts = [
  "Penasaran sama Sakib? Tanya AI aja! ✨",
  "Cari tahu pengalaman Sakib lebih cepat di sini. 🚀",
  "Ngobrol santai bareng asisten virtual Sakib, yuk! 👋",
  "NexaOrion siap bantu jawab pertanyaanmu. 🛠️",
  "Buka database pengetahuan Sakib di sini. 🧠",
  "Ada yang mau ditanyakan tentang Sakib? 💬",
];

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTooltipText, setCurrentTooltipText] = useState(
    invitationTexts[0],
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Logic Tooltip Dinamis ---
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * invitationTexts.length);
      setCurrentTooltipText(invitationTexts[randomIndex]);
      setShowTooltip(true);
      timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 7000);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen]);

  // --- Auto Scroll ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const getAIResponse = async (userInput: string, intent?: string) => {
    setIsLoading(true);
    try {
      if (isOnline) {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        });
        const data = await res.json();
        return data.text || "Waduh, koneksi ke Gemini terputus nih! 📡";
      } else {
        // MODE OFFLINE merender HTML dari buildResponse
        await new Promise((resolve) => setTimeout(resolve, 600));
        return buildResponse(intent || "unknown");
      }
    } catch (error) {
      return "Ouch! Ada kabel virtual yang sedikit korslet nih! ⚡";
    } finally {
      setIsLoading(false);
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
    if (!input.trim() || isLoading) return;
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
    <div className="fixed bottom-28 md:bottom-8 right-4 md:right-8 z-[100] flex flex-col items-end gap-3 transition-all duration-300">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative mr-2"
          >
            <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2.5 rounded-2xl rounded-br-none shadow-2xl flex items-center gap-2 border border-white/10 dark:border-zinc-200">
              <Sparkles size={14} className="text-primary" />
              <p className="text-[11px] font-bold">{currentTooltipText}</p>
              <button
                onClick={() => setShowTooltip(false)}
                className="ml-1 opacity-50 hover:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
            <div className="absolute -bottom-1 right-0 w-3 h-3 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[340px] md:w-[360px] h-[500px] md:h-[550px] flex flex-col bg-white dark:bg-zinc-900 border shadow-2xl rounded-[2.5rem] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b bg-zinc-50/50 dark:bg-zinc-800/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Orbit
                  className={`text-primary ${isOnline ? "animate-spin" : ""}`}
                  size={20}
                />
                <div className="leading-none">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    NexaOrion
                  </p>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`p-2 rounded-xl transition-all ${isOnline ? "bg-emerald-500/10 text-emerald-600 shadow-inner" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}
                >
                  {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {/* Pesan Awal */}
              <div className="flex gap-2">
                <div className="p-2 h-fit rounded-lg bg-primary/10">
                  <Cpu size={14} className="text-primary" />
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none text-xs text-zinc-800 dark:text-zinc-200">
                  Unit NexaOrion aktif! Ada yang bisa saya bantu untuk mengenal
                  Sakib lebih dalam? 🚀
                </div>
              </div>

              {/* Mapping Messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`p-2 rounded-lg h-fit ${msg.role === "user" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-primary/10"}`}
                  >
                    {msg.role === "user" ? (
                      <User
                        size={14}
                        className="text-zinc-600 dark:text-zinc-400"
                      />
                    ) : (
                      <Sparkles size={14} className="text-primary" />
                    )}
                  </div>

                  {/* Bubble Pesan dengan Render HTML */}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-tr-none font-medium"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none shadow-sm"
                    }`}
                    // PERBAIKAN: Menggunakan dangerouslySetInnerHTML untuk merender tag HTML dari asisten
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 italic px-6">
                  <Loader2 size={12} className="animate-spin" />{" "}
                  NEXA_PROCESSING...
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-4 border-t bg-zinc-50/30 dark:bg-zinc-900/30 backdrop-blur-md space-y-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { l: "👋 Tentang", i: "profile" },
                  { l: "🛠️ Stack", i: "skills" },
                  { l: "📂 Projects", i: "projects" },
                  { l: "📞 Kontak", i: "contact" },
                ].map((btn) => (
                  <button
                    key={btn.i}
                    onClick={() => handleAction(btn.i, btn.l)}
                    className="text-[10px] px-3 py-1.5 rounded-xl border bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-primary transition-all active:scale-95 font-medium text-zinc-700 dark:text-zinc-300 shadow-sm"
                  >
                    {btn.l}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={isOnline ? "Tanya Gemini..." : "Mode Offline..."}
                  disabled={!isOnline}
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none focus:border-primary transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isOnline || !input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:opacity-90 disabled:bg-zinc-400 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-2xl border border-white/10 dark:border-zinc-200 group relative"
      >
        <Orbit
          size={28}
          className={`${isOpen ? "rotate-45" : "group-hover:rotate-12"} transition-transform duration-300`}
        />
      </motion.button>
    </div>
  );
}
