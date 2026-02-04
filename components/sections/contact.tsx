"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const lightItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sakibfaturrahman92@gmail.com",
    href: "mailto:sakibfaturrahman92@gmail.com",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 851 7958 4795",
    href: "tel:+6285179584795",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tasikmalaya, Indonesia",
    href: null,
    color: "bg-orange-500/10 text-orange-500",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--x", `${x}px`);
    currentTarget.style.setProperty("--y", `${y}px`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <section
      id="contact"
      // PERBAIKAN: bg-white untuk Light Mode, dark:bg-black untuk Dark Mode
      className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Glow Effect - Disesuaikan agar tetap halus di background putih */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Sisi Kiri: Info */}
          <div className="lg:col-span-5 space-y-10">
            <ScrollWrapper>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                  Contact
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-zinc-900 dark:text-white">
                Let&apos;s Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Greatness.
                </span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-sm">
                Ready to elevate your digital presence? Send me a message and
                let&apos;s turn your vision into reality.
              </p>
            </ScrollWrapper>

            <div className="space-y-3">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  variants={lightItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <a
                    href={info.href || "#"}
                    // PERBAIKAN: Background info card yang adaptif
                    className="group flex items-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 hover:border-primary/30 transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${info.color} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                        {info.label}
                      </p>
                      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 text-zinc-300 dark:text-zinc-800 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sisi Kanan: Form */}
          <ScrollWrapper className="lg:col-span-7">
            <Card
              onMouseMove={handleMouseMove}
              // PERBAIKAN: Card background adaptif
              className="relative bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl"
              style={
                {
                  backgroundImage: `radial-gradient(circle at var(--x) var(--y), rgba(59, 130, 246, 0.08) 0%, transparent 50%)`,
                } as any
              }
            >
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[10px] uppercase tracking-widest font-black text-zinc-400 dark:text-zinc-500 ml-1"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        // PERBAIKAN: Input background dan border adaptif
                        className="h-12 bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 rounded-xl focus-visible:ring-primary/30 transition-all text-sm text-zinc-900 dark:text-white"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-[10px] uppercase tracking-widest font-black text-zinc-400 dark:text-zinc-500 ml-1"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 rounded-xl focus-visible:ring-primary/30 transition-all text-sm text-zinc-900 dark:text-white"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-[10px] uppercase tracking-widest font-black text-zinc-400 dark:text-zinc-500 ml-1"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="h-12 bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 rounded-xl focus-visible:ring-primary/30 transition-all text-sm text-zinc-900 dark:text-white"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[10px] uppercase tracking-widest font-black text-zinc-400 dark:text-zinc-500 ml-1"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 rounded-2xl focus-visible:ring-primary/30 transition-all text-sm text-zinc-900 dark:text-white resize-none"
                      placeholder="Share your vision..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl bg-primary text-white hover:opacity-90 transition-all group overflow-hidden shadow-lg shadow-primary/20"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="text-xs font-bold uppercase tracking-widest">
                            Sending...
                          </span>
                        </motion.div>
                      ) : submitStatus === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ y: 10 }}
                          animate={{ y: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                          <span className="text-xs font-bold uppercase tracking-widest">
                            Success!
                          </span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest">
                            Send Message
                          </span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </AnimatePresence>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollWrapper>
        </div>
      </div>
    </section>
  );
}
