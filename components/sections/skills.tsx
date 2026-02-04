"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Terminal, Cpu } from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Button } from "@/components/ui/button";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

const allSkills = [
  {
    name: "HTML5",
    icon: "https://cdn.simpleicons.org/html5/E34F26",
    color: "#E34F26",
    type: "Front-End",
  },
  {
    name: "CSS3",
    icon: "https://cdn.simpleicons.org/css/1572B6",
    color: "#1572B6",
    type: "Front-End",
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
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    color: "#3776AB",
    type: "Back-End",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.simpleicons.org/postgresql/4169E1",
    color: "#4169E1",
    type: "Database",
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
    icon: "https://cdn.simpleicons.org/supabase/3FCF8E",
    color: "#3FCF8E",
    type: "Tools",
  },
  {
    name: "Prisma",
    icon: "https://cdn.simpleicons.org/prisma/5A67D8",
    color: "#5A67D8",
    type: "Tools",
    isInvert: true,
  },
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    color: "#61DAFB",
    type: "Front-End",
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/black",
    color: "#ffffff",
    type: "Front-End",
    isNext: true,
  },
  {
    name: "Tailwind",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    color: "#06B6D4",
    type: "Front-End",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.simpleicons.org/bootstrap/7952B3",
    color: "#7952B3",
    type: "Front-End",
  },
  {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git/F05032",
    color: "#F05032",
    type: "Tools",
  },
  {
    name: "GitHub",
    icon: "https://cdn.simpleicons.org/github/181717",
    color: "#181717",
    type: "Tools",
    isGithub: true,
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

const categories = ["All", "Back-End", "Front-End", "Database", "Tools"];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileLimit = 6;

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return allSkills;
    return allSkills.filter((skill) => skill.type === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Background Decor - Opacity dikurangi agar tetap clean */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-1 lg:sticky lg:top-32">
            <ScrollWrapper>
              <div className="text-center lg:text-left space-y-6">
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white font-montserrat tracking-tighter leading-none">
                    Tools & <br className="hidden lg:block" />
                    <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                      Techstack.
                    </span>
                  </h2>
                </div>
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                  A collection of technologies I use to build robust,
                  high-performance, and scalable digital solutions.
                </p>

                {/* Category Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-4">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsExpanded(false);
                      }}
                      className={`text-[10px] uppercase font-bold h-9 px-5 rounded-full transition-all duration-300 ${
                        activeCategory === cat
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                          : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-primary/50"
                      }`}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollWrapper>
          </div>

          {/* Right Column: Skills Grid */}
          <div className="lg:col-span-2">
            <motion.div
              layout
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => {
                  const isHiddenOnMobile = !isExpanded && index >= mobileLimit;

                  return (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      variants={staggerItemVariants}
                      className={`${isHiddenOnMobile ? "hidden sm:block" : "block"}`}
                    >
                      <div className="group relative bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 p-4 rounded-2xl flex items-center gap-4 hover:bg-white dark:hover:bg-zinc-900 hover:border-primary/30 transition-all duration-500">
                        {/* Icon Wrapper */}
                        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 group-hover:border-primary/20 group-hover:scale-110 transition-all duration-500 shadow-sm">
                          {skill.isLucide ? (
                            <skill.icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-primary" />
                          ) : (
                            <img
                              src={skill.icon as string}
                              alt={skill.name}
                              className={`w-6 h-6 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 ${
                                skill.isNext || skill.isGithub || skill.isInvert
                                  ? "dark:invert"
                                  : ""
                              }`}
                            />
                          )}
                        </div>

                        <div className="flex flex-col">
                          <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">
                            {skill.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* View More Button */}
            {filteredSkills.length > mobileLimit && (
              <div className="mt-8 flex justify-center sm:hidden">
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary font-bold text-xs gap-2"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      View All {activeCategory}{" "}
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Note Card */}
            <ScrollWrapper className="mt-12">
              <div className="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50 flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-white mb-1">
                    Continuous Learning
                  </h5>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
                    Currently exploring:{" "}
                    <span className="text-primary font-semibold">
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
