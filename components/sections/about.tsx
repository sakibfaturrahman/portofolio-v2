"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Code2,
  Layers,
  Zap,
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
  Target,
} from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

// --- Komponen Counter Animasi ---
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <ScrollWrapper className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground font-montserrat">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Personal
                </span>{" "}
                <span className="text-primary">Narrative.</span>
              </h2>
              <div className="h-1.5 w-24 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground max-w-sm text-base leading-relaxed border-l-4 border-primary/20 pl-6 italic font-medium">
              "Building efficient back-end systems with a full-stack mindset
              since 2024."
            </p>
          </div>
        </ScrollWrapper>

        {/* Bento Grid Layout - Responsive focus */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 auto-rows-min md:auto-rows-[180px]"
        >
          {/* Main Bio - Large Card */}
          <motion.div
            variants={staggerItemVariants}
            className="col-span-1 sm:col-span-2 md:col-span-8 md:row-span-2 order-1"
          >
            <Card className="h-full bg-card/30 backdrop-blur-xl border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-2xl shadow-black/5">
              <CardContent className="p-8 md:p-10 flex flex-col h-full justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary bg-primary/5 w-fit px-4 py-1.5 rounded-full border border-primary/10">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      Tasikmalaya, Indonesia
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                    The Architect Behind <br /> the{" "}
                    <span className="text-primary">Logic.</span>
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                    Hi, I&apos;m{" "}
                    <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">
                      Sakib Faturrahman
                    </span>
                    . My journey started at{" "}
                    <span className="text-primary font-semibold">
                      SMK Rekayasa Perangkat Lunak
                    </span>
                    , where I discovered my passion for clean architecture. Now,
                    as a computer science student at
                    <span className="font-semibold text-foreground">
                      {" "}
                      Perjuangan University
                    </span>
                    , I bridge the gap between robust back-end logic and
                    seamless user experiences.
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-border/50">
                  <div className="flex -space-x-3">
                    {["PHP", "Laravel", "Node", "React"].map((t, i) => (
                      <motion.div
                        key={t}
                        whileHover={{ y: -5, zIndex: 10 }}
                        className="w-10 h-10 rounded-xl border-2 border-background bg-zinc-900 flex items-center justify-center text-xs font-black shadow-xl"
                      >
                        {t[0]}
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-primary/40 animate-pulse"
                        />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                      Full-Stack Versatility
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Highlight - Blue Accent */}
          <motion.div
            variants={staggerItemVariants}
            className="col-span-1 md:col-span-4 md:row-span-1 order-2"
          >
            <Card className="h-full bg-primary text-primary-foreground border-none shadow-xl shadow-primary/20 group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                <Briefcase size={80} />
              </div>
              <CardContent className="p-8 flex flex-col justify-between h-full relative z-10">
                <Briefcase className="w-8 h-8 opacity-50" />
                <div className="mt-4">
                  <p className="text-5xl font-black tracking-tighter">2024</p>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-90 mt-1">
                    Freelance Career Launch
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education Highlight */}
          <motion.div
            variants={staggerItemVariants}
            className="col-span-1 md:col-span-4 md:row-span-1 order-3"
          >
            <Card className="h-full bg-card/40 backdrop-blur-md border-border/50 border-dashed hover:border-solid hover:bg-primary/5 transition-all duration-300 group">
              <CardContent className="p-8 flex items-center gap-6 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                    3rd Semester
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    UNPER Student
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards - Multi Grid */}
          {[
            {
              label: "Years Coding",
              val: 3,
              suffix: "+",
              icon: Code2,
              color: "text-blue-500",
            },
            {
              label: "Tech Stack",
              val: 10,
              suffix: "+",
              icon: Layers,
              color: "text-emerald-500",
            },
            {
              label: "Completed",
              val: 15,
              suffix: "+",
              icon: Zap,
              color: "text-amber-500",
            },
            {
              label: "Passion",
              val: 100,
              suffix: "%",
              icon: Target,
              color: "text-rose-500",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={staggerItemVariants}
              className="col-span-1 sm:col-span-1 md:col-span-3 md:row-span-1 order-4"
            >
              <Card className="h-full bg-muted/20 border-border/50 hover:bg-card hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                  <div
                    className={`p-2 rounded-lg bg-background mb-3 shadow-inner group-hover:scale-110 transition-transform ${s.color}`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl font-black tracking-tighter">
                    <Counter value={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                    {s.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
