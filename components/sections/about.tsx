"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Zap,
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeUpVariants,
} from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <ScrollWrapper className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground font-montserrat">
                Personal <span className="text-primary">Narrative.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed border-l-2 border-primary/30 pl-4 italic">
              "Building efficient back-end systems with a full-stack mindset
              since 2024."
            </p>
          </div>
        </ScrollWrapper>

        {/* Bento Grid Layout */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]"
        >
          {/* Main Bio - Large Card */}
          <motion.div
            variants={staggerItemVariants}
            className="md:col-span-8 md:row-span-2"
          >
            <Card className="h-full bg-card/40 backdrop-blur-md border-border/50 overflow-hidden group">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-mono tracking-widest uppercase">
                      Tasikmalaya, Indonesia
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    The Architect Behind the Logic
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hi, I&apos;m{" "}
                    <span className="text-foreground font-semibold">
                      Sakib Faturrahman
                    </span>
                    . My journey started at{" "}
                    <span className="text-primary">
                      SMK Rekayasa Perangkat Lunak
                    </span>
                    , where I fell in love with clean architecture. Now, as a
                    student at
                    <span className="font-medium text-foreground">
                      {" "}
                      Perjuangan University of Tasikmalaya
                    </span>
                    , I bridge the gap between robust back-end logic and
                    seamless user experiences.
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="flex -space-x-2">
                    {["PHP", "Laravel", "Node", "React"].map((t) => (
                      <div
                        key={t}
                        className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold"
                      >
                        {t[0]}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground self-center italic">
                    + more tech stack
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Highlight */}
          <motion.div
            variants={staggerItemVariants}
            className="md:col-span-4 md:row-span-1"
          >
            <Card className="h-full bg-primary text-primary-foreground border-none">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <Briefcase className="w-8 h-8 opacity-20" />
                <div>
                  <p className="text-3xl font-black">2024</p>
                  <p className="text-xs font-medium uppercase tracking-tighter opacity-80">
                    Active Freelance Career
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education Highlight */}
          <motion.div
            variants={staggerItemVariants}
            className="md:col-span-4 md:row-span-1"
          >
            <Card className="h-full bg-card/40 backdrop-blur-md border-border/50 border-dashed hover:border-solid transition-all">
              <CardContent className="p-6 flex items-center gap-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">
                    3rd Semester
                  </p>
                  <p className="text-xs text-muted-foreground">UNPER Student</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards - Mini Grid */}
          {[
            { label: "Years Coding", val: "3+", icon: Code2 },
            { label: "Tech Stack", val: "10+", icon: Layers },
            { label: "Completed", val: "15+", icon: Zap },
            { label: "Passion", val: "100%", icon: ExternalLink },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={staggerItemVariants}
              className="md:col-span-3 md:row-span-1"
            >
              <Card className="h-full bg-muted/30 border-border/50 hover:bg-primary/5 transition-all group">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                  <s.icon className="w-5 h-5 text-primary mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-2xl font-black tracking-tighter">
                    {s.val}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
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
