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
  ArrowUpRight,
} from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 80 });
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
      className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Abstract Background Elements - Disesuaikan agar tetap bersih */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <ScrollWrapper className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                  Curriculum Vitae
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-montserrat leading-none">
                <span className="text-zinc-900 dark:text-white transition-colors">
                  Personal{" "}
                </span>
                <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Narrative.
                </span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-light border-l-2 border-primary/30 pl-6">
                “Fusing{" "}
                <span className="text-zinc-900 dark:text-white font-medium">
                  technical precision
                </span>{" "}
                with creative logic to architect high-performance digital
                foundations.”
              </p>
            </div>
          </div>
        </ScrollWrapper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {/* Main Bio Card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 md:row-span-2 group"
          >
            <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-xl shadow-lg dark:shadow-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
              <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase">
                      Tasikmalaya, Indonesia
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                      Architecting systems that <br />
                      <span className="text-primary underline underline-offset-4 decoration-2 decoration-primary/30">
                        define the future.
                      </span>
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
                      I am{" "}
                      <span className="text-zinc-900 dark:text-white font-semibold italic">
                        Sakib Faturrahman
                      </span>
                      . An engineer focused on building robust back-end
                      ecosystems at
                      <span className="text-zinc-900 dark:text-white font-medium">
                        {" "}
                        Universitas Perjuangan
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/50">
                  <div className="flex -space-x-2">
                    {["JS", "TS", "GO", "PY"].map((tech, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-zinc-600 dark:text-zinc-300"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Multi-Language Proficiency
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <motion.div variants={itemVariants}>
              <Card className="bg-primary dark:bg-primary/90 border-none overflow-hidden relative group h-full">
                <Briefcase className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" />
                <CardContent className="p-6 relative z-10">
                  <p className="text-[10px] font-bold text-primary-foreground/70 uppercase tracking-widest mb-1">
                    Since
                  </p>
                  <p className="text-4xl font-black text-primary-foreground tracking-tighter">
                    2024
                  </p>
                  <div className="mt-4">
                    <span className="text-[9px] font-bold py-1 px-2.5 bg-primary-foreground/10 text-primary-foreground rounded-lg backdrop-blur-md border border-primary-foreground/20 uppercase">
                      Freelance Ops
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-full hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 shadow-sm dark:shadow-none">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                    Semester 4
                  </p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 transition-colors">
                    UNPER Student
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Mini Stats Footer */}
          <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {[
              {
                label: "Experience",
                val: 3,
                suffix: "+ Yrs",
                icon: Code2,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
              },
              {
                label: "Stacks",
                val: 10,
                suffix: "+ Tools",
                icon: Layers,
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
              },
              {
                label: "Successful",
                val: 15,
                suffix: "+ Projs",
                icon: Zap,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
              },
              {
                label: "Efficiency",
                val: 100,
                suffix: "% Goal",
                icon: Target,
                color: "text-rose-500",
                bg: "bg-rose-500/10",
              },
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="p-5 h-full rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-primary/20 transition-all group flex flex-col items-center text-center">
                  <div
                    className={`p-3 rounded-xl ${s.bg} ${s.color} group-hover:scale-105 transition-transform`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter tabular-nums">
                      <Counter value={s.val} />
                    </p>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                      {s.label}{" "}
                      <span className="text-zinc-400 font-normal italic">
                        {s.suffix}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
