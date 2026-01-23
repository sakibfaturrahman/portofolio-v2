"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  Variants,
} from "framer-motion";
import {
  Code2,
  Layers,
  Zap,
  GraduationCap,
  Briefcase,
  MapPin,
  Target,
} from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Card, CardContent } from "@/components/ui/card";

// Variants dioptimalkan agar lebih ringan
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) =>
      setDisplayValue(Math.floor(latest)),
    );
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
    <section
      id="about"
      className="py-20 md:py-32 relative overflow-hidden bg-background"
    >
      {/* Background Decor - Statis & Ringan */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <ScrollWrapper className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter font-montserrat leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Personal
                </span>{" "}
                Narrative.
              </h2>
              <div className="h-1.5 w-16 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground max-w-sm text-sm md:text-base border-l-2 border-primary/30 pl-4 italic font-medium leading-relaxed">
              "Building efficient back-end systems with a full-stack mindset
              since 2024."
            </p>
          </div>
        </ScrollWrapper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 auto-rows-min md:auto-rows-[160px]"
        >
          {/* Main Bio */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 md:col-span-8 md:row-span-2 will-change-transform"
          >
            <Card className="h-full bg-zinc-900/20 border-zinc-800/50 hover:border-primary/30 transition-colors duration-500 shadow-sm group">
              <CardContent className="p-6 md:p-10 flex flex-col h-full justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary bg-primary/5 w-fit px-3 py-1 rounded-full border border-primary/10">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">
                      Tasikmalaya, ID
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-100">
                    The Architect Behind the{" "}
                    <span className="text-primary">Logic.</span>
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-2xl">
                    Hi, I&apos;m{" "}
                    <span className="text-zinc-100 font-bold">
                      Sakib Faturrahman
                    </span>
                    . My journey started at SMK RPL, where I fell in love with
                    code. Now, as a student at{" "}
                    <span className="text-primary font-semibold">
                      Perjuangan University
                    </span>
                    , I focus on creating scalable systems that just work.
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-6 border-t border-zinc-800/50">
                  <div className="flex -space-x-2">
                    {["P", "L", "N", "R"].map((char, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center text-[10px] md:text-xs font-black shadow-lg"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Full-Stack Versatility
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Launch Year */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 md:row-span-1 will-change-transform"
          >
            <Card className="h-full bg-primary text-primary-foreground border-none shadow-lg shadow-primary/10 relative overflow-hidden group">
              <Briefcase className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform duration-500" />
              <CardContent className="p-6 flex flex-col justify-center h-full relative z-10">
                <p className="text-4xl md:text-5xl font-black tracking-tighter">
                  2024
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mt-1">
                  Freelance Launch
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 md:row-span-1 will-change-transform"
          >
            <Card className="h-full bg-zinc-900/20 border-zinc-800/50 hover:bg-primary/5 transition-all group">
              <CardContent className="p-6 flex items-center gap-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                    Semester 3
                  </p>
                  <p className="text-base font-bold text-zinc-100">
                    UNPER Student
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mini Stats Grid */}
          {[
            {
              label: "Years",
              val: 3,
              suffix: "+",
              icon: Code2,
              color: "text-blue-400",
            },
            {
              label: "Stack",
              val: 10,
              suffix: "+",
              icon: Layers,
              color: "text-emerald-400",
            },
            {
              label: "Projs",
              val: 15,
              suffix: "+",
              icon: Zap,
              color: "text-amber-400",
            },
            {
              label: "Goal",
              val: 100,
              suffix: "%",
              icon: Target,
              color: "text-rose-400",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="md:col-span-3 will-change-transform"
            >
              <Card className="h-full bg-zinc-900/10 border-zinc-800/50 hover:bg-zinc-900/40 transition-all text-center">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <s.icon className={`w-4 h-4 mb-2 ${s.color}`} />
                  <p className="text-2xl font-black tracking-tighter text-zinc-100">
                    <Counter value={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-[8px] uppercase font-bold text-zinc-500 tracking-widest mt-1">
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
