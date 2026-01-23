"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { Github, ExternalLink, Code2, Sparkles, Activity } from "lucide-react";

import { ScrollWrapper } from "@/components/scroll-wrapper";
import { ProjectCard } from "@/components/projects-card";

/* ======================================================
    Variants (High Performance)
====================================================== */
const lightStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const lightItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ======================================================
    GitHub Calendar (Client Side Only)
====================================================== */
interface GitHubCalendarProps {
  username: string;
  blockSize?: number;
  blockMargin?: number;
  fontSize?: number;
  theme?: any;
  colorScheme?: "light" | "dark";
}

const GitHubCalendar = dynamic<GitHubCalendarProps>(
  () => import("@/components/github-calendar-client"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[120px] w-full bg-white/[0.02] rounded-xl animate-pulse">
        <Activity className="w-5 h-5 text-zinc-700 animate-spin" />
      </div>
    ),
  },
);

const githubTheme = {
  light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const getIconUrl = (tag: string) => {
  const map: Record<string, string> = {
    Laravel: "laravel/FF2D20",
    Tailwind: "tailwindcss/06B6D4",
    "Tailwind CSS": "tailwindcss/06B6D4",
    MySQL: "mysql/4479A1",
    Livewire: "livewire/FB70A9",
    "Alpine.js": "alpinedotjs/8BC0D0",
    Bootstrap: "bootstrap/7952B3",
    "Express.js": "express/white",
    MongoDB: "mongodb/47A248",
    "Spotify API": "spotify/1DB954",
    Midtrans: "handshake/white",
  };
  const icon = map[tag] || "code/white";
  return `https://cdn.simpleicons.org/${icon}`;
};

export function Projects() {
  const projects = useMemo(
    () => [
      {
        title: "SIMPATIK APP",
        description:
          "An integrated Management and Attendance Information System for industrial internships.",
        image: "/projects/simpatik.png",
        tags: ["Laravel", "Tailwind", "MySQL", "Livewire", "Alpine.js"].map(
          (t) => ({ name: t, icon: getIconUrl(t) }),
        ),
        liveUrl: "https://example.com",
        featured: true,
      },
      {
        title: "PINLAB",
        description:
          "Centralized digital ecosystem for equipment lending services.",
        image: "/projects/pinlab.png",
        liveUrl: "https://example.com",
        tags: ["Laravel", "MySQL", "Bootstrap", "Livewire"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
      },
      {
        title: "Feeldrop",
        description:
          "Mood-sharing social platform integrated with Spotify API.",
        image: "/projects/feeldrop.png",
        tags: ["Express.js", "MongoDB", "Tailwind CSS", "Spotify API"].map(
          (t) => ({ name: t, icon: getIconUrl(t) }),
        ),
        githubUrl: "https://github.com/sakibfaturrahman",
        liveUrl: "https://example.com",
      },
      {
        title: "KilatCuci",
        description: "Laundry Management System featuring QR Code tracking.",
        image: "/projects/kilatcuci.png",
        tags: ["Laravel", "Bootstrap", "MySQL", "Livewire"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
        liveUrl: "https://example.com",
      },
      {
        title: "PSKU App",
        description: "Gaming center booking with Midtrans Payment integration.",
        image: "/projects/ps.png",
        tags: ["Laravel", "Tailwind CSS", "MySQL", "Midtrans"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
        liveUrl: "https://example.com",
      },
    ],
    [],
  );

  return (
    <section
      id="projects"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Decor - Statis & Ringan */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Modern Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-20">
          <ScrollWrapper>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 font-mono">
                  Portfolio Selection
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-foreground font-montserrat tracking-tight leading-none">
                Featured <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Works.
                </span>
              </h2>
            </div>
          </ScrollWrapper>

          <ScrollWrapper>
            <p className="text-zinc-500 text-sm md:text-base max-w-sm lg:ml-auto font-medium leading-relaxed">
              Focused on building scalable back-end systems with clean,
              performant user interfaces.
            </p>
          </ScrollWrapper>
        </div>

        {/* GitHub Contribution Section (New Interactive UI) */}
        <ScrollWrapper className="mb-20">
          <div className="relative group">
            {/* Glossy Border Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-[2rem] opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-6 md:p-8 rounded-[2rem] bg-[#0c0c0c] overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                    <Code2 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 tracking-tight">
                      Coding Activity
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      github.com/sakibfaturrahman
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold uppercase text-zinc-400">
                    2025/2026 Contributions
                  </div>
                </div>
              </div>

              {/* Calendar Container: Responsive & smooth scroll */}
              <div className="w-full overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing">
                <div className="min-w-[800px] flex justify-center py-2 translate-x-4 md:translate-x-0">
                  <GitHubCalendar
                    username="sakibfaturrahman"
                    blockSize={11}
                    blockMargin={4}
                    fontSize={11}
                    theme={githubTheme}
                    colorScheme="dark"
                  />
                </div>
              </div>

              {/* Fade edges for mobile scroll */}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0c0c0c] to-transparent md:hidden pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0c0c0c] to-transparent md:hidden pointer-events-none" />
            </div>
          </div>
        </ScrollWrapper>

        {/* Project Grid */}
        <motion.div
          variants={lightStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 will-change-transform"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={lightItemVariants}
              className={`${project.featured ? "md:col-span-2" : "col-span-1"}`}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Minimal Footer CTA */}
        <div className="mt-24 flex flex-col items-center gap-6">
          <div className="h-px w-24 bg-zinc-800" />
          <ScrollWrapper>
            <motion.a
              href="https://github.com/sakibfaturrahman"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 px-10 py-4 bg-white text-black rounded-full font-bold transition-all"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">Explore More Repository</span>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </ScrollWrapper>
        </div>
      </div>
    </section>
  );
}
