"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

const allSkills = [
  {
    name: "HTML5",
    icon: "https://cdn.simpleicons.org/html5/E34F26",
    color: "#E34F26",
    type: "Web",
  },
  {
    name: "CSS3",
    icon: "https://cdn.simpleicons.org/css/1572B6",
    color: "#1572B6",
    type: "Web",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    color: "#F7DF1E",
    type: "Web",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    color: "#3178C6",
    type: "Web",
  },
  {
    name: "PHP",
    icon: "https://cdn.simpleicons.org/php/777BB4",
    color: "#777BB4",
    type: "Back-End",
  },
  {
    name: "Laravel",
    icon: "https://cdn.simpleicons.org/laravel/FF2D20",
    color: "#FF2D20",
    type: "Back-End",
  },
  {
    name: "Node.js",
    icon: "https://cdn.simpleicons.org/nodedotjs/339933",
    color: "#339933",
    type: "Back-End",
  },
  {
    name: "MySQL",
    icon: "https://cdn.simpleicons.org/mysql/4479A1",
    color: "#4479A1",
    type: "Database",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
    color: "#47A248",
    type: "Database",
  },
  {
    name: "Supabase",
    icon: "https://cdn.simpleicons.org/supabase/3ECF8E",
    color: "#3ECF8E",
    type: "Database",
  },
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    color: "#61DAFB",
    type: "Front-End",
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/white",
    color: "#ffffff",
    type: "Front-End",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    color: "#06B6D4",
    type: "Front-End",
  },
  {
    name: "Flutter",
    icon: "https://cdn.simpleicons.org/flutter/02569B",
    color: "#02569B",
    type: "Mobile",
  },
  {
    name: "Dart",
    icon: "https://cdn.simpleicons.org/dart/0175C2",
    color: "#0175C2",
    type: "Mobile",
  },
  {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git/F05032",
    color: "#F05032",
    type: "Tools",
  },
  {
    name: "Postman",
    icon: "https://cdn.simpleicons.org/postman/FF6C37",
    color: "#FF6C37",
    type: "Tools",
  },
  {
    name: "VS Code",
    isLucide: true,
    icon: Terminal,
    color: "#007ACC",
    type: "Tools",
  },
];

export function Skills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileLimit = 6;

  return (
    <section
      id="skills"
      className="py-16 md:py-24 relative overflow-hidden bg-zinc-950/20"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 text-center lg:text-left">
            <ScrollWrapper>
              <h2 className="text-3xl md:text-5xl font-black text-foreground font-montserrat tracking-tighter mb-6">
                Tools & <br className="hidden lg:block" />
                <span className="text-primary">Tech</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  stack.
                </span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                A curated selection of technologies I leverage to build robust,
                high-performance, and scalable digital solutions.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {["Back-End", "Front-End", "Database"].map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="text-[10px] uppercase font-mono border-primary/20 text-primary/70"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </ScrollWrapper>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 overflow-hidden"
            >
              <AnimatePresence>
                {allSkills.map((skill, index) => {
                  const isHiddenOnMobile = !isExpanded && index >= mobileLimit;
                  const IconComponent = skill.icon;

                  return (
                    <motion.div
                      key={skill.name}
                      variants={staggerItemVariants}
                      whileHover={{ y: -5 }}
                      className={`relative group ${
                        isHiddenOnMobile ? "hidden sm:block" : "block"
                      }`}
                    >
                      <div className="bg-card/40 backdrop-blur-sm border border-border/50 p-3.5 rounded-2xl flex items-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                        {/* Icon Wrapper */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-background/50 border border-border/20 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                          {skill.isLucide ? (
                            <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          ) : (
                            <img
                              src={skill.icon as string}
                              alt={skill.name}
                              className="w-6 h-6 object-contain transition-all duration-500 filter grayscale group-hover:grayscale-0"
                            />
                          )}
                        </div>

                        <div className="flex flex-col justify-center">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-none mb-1.5">
                            {skill.name}
                          </h4>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                            {skill.type}
                          </p>
                        </div>
                      </div>

                      {/* Glow effect on hover */}
                      <div
                        className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                        style={{ backgroundColor: `${skill.color}20` }}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* View More Button */}
            <div className="mt-8 flex justify-center sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary font-mono text-xs hover:bg-primary/10 group"
              >
                {isExpanded ? (
                  <>
                    Show Less{" "}
                    <ChevronUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  </>
                ) : (
                  <>
                    View All Skills{" "}
                    <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>

            {/* Learning Note */}
            <ScrollWrapper className="mt-12">
              <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse shrink-0">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <h5 className="text-xs md:text-sm font-bold mb-1 uppercase tracking-wider font-montserrat text-foreground">
                    Continuous Learning
                  </h5>
                  <p className="text-[10px] md:text-xs text-muted-foreground italic">
                    Currently exploring:{" "}
                    <span className="text-primary font-medium uppercase tracking-tighter">
                      AI Integration & Advanced System Architecture.
                    </span>
                  </p>
                </div>
              </div>
            </ScrollWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
