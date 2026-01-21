"use client";

import React, { useState, useRef } from "react";
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
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

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
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.current = clientX - left;
    mouseY.current = clientY - top;
    (currentTarget as HTMLElement).style.setProperty(
      "--mouse-x",
      `${mouseX.current}px`,
    );
    (currentTarget as HTMLElement).style.setProperty(
      "--mouse-y",
      `${mouseY.current}px`,
    );
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
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Bagian Kiri (Tetap) */}
          <div className="lg:col-span-5 space-y-12">
            <ScrollWrapper>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold tracking-widest uppercase text-primary">
                  Contact
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
                Let&apos;s Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400">
                  Greatness.
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md">
                Ready to elevate your digital presence? Send me a message and
                let&apos;s turn your vision into a high-performance reality.
              </p>
            </ScrollWrapper>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              className="space-y-4"
            >
              {contactInfo.map((info, idx) => (
                <motion.div key={idx} variants={staggerItemVariants}>
                  <a
                    href={info.href || "#"}
                    className="group flex items-center p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-primary/50 hover:bg-zinc-900 transition-all duration-300 shadow-xl"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        {info.label}
                      </p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 text-zinc-700 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bagian Form (Pembaruan dengan Radius) */}
          <ScrollWrapper className="lg:col-span-7">
            <Card
              onMouseMove={handleMouseMove}
              className="relative group bg-zinc-900/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.1), transparent 40%)`,
                }}
              />

              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-xs uppercase tracking-widest font-bold ml-1 text-zinc-400"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus-visible:ring-primary/50 focus-visible:border-primary transition-all text-sm"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs uppercase tracking-widest font-bold ml-1 text-zinc-400"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus-visible:ring-primary/50 focus-visible:border-primary transition-all text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-xs uppercase tracking-widest font-bold ml-1 text-zinc-400"
                    >
                      Project Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus-visible:ring-primary/50 focus-visible:border-primary transition-all text-sm"
                      placeholder="What are we building?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-xs uppercase tracking-widest font-bold ml-1 text-zinc-400"
                    >
                      Message Details
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-white/[0.03] border-white/10 rounded-3xl focus-visible:ring-primary/50 focus-visible:border-primary transition-all text-sm resize-none p-5"
                      placeholder="Tell me more about your vision..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-500 group relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span className="font-bold uppercase tracking-widest text-xs">
                            Transmitting...
                          </span>
                        </motion.div>
                      ) : submitStatus === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="font-bold uppercase tracking-widest text-xs">
                            Message Received!
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          className="flex items-center gap-2"
                        >
                          <span className="font-bold uppercase tracking-widest text-xs">
                            Launch Message
                          </span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.div>
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
