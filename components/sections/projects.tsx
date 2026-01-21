"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2, Sparkles } from "lucide-react";

import { ScrollWrapper } from "@/components/scroll-wrapper";
import { ProjectCard } from "@/components/projects-card";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

/* ======================================================
   Props & Dynamic Import
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
      <div className="flex flex-col items-center justify-center gap-3 py-10 opacity-50">
        <div className="h-1 w-32 bg-zinc-800 animate-pulse rounded-full" />
        <span className="text-[9px] font-mono animate-pulse uppercase tracking-widest">
          Fetching_Data...
        </span>
      </div>
    ),
  },
);

const githubTheme = {
  light: ["#f0f0f0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#1a1a1a", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

/* ======================================================
   Helper: Get Icon URL (Simple Icons)
====================================================== */
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
    Midtrans: "handshake/white", // Placeholder if not in simple icons
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
          "An integrated Management and Attendance Information System for Vocational High School industrial internships.",
        image: "/projects/simpatik.png",
        // Format tags diubah menjadi objek agar ProjectCard bisa merender icon
        tags: ["Laravel", "Tailwind", "MySQL", "Livewire", "Alpine.js"].map(
          (t) => ({ name: t, icon: getIconUrl(t) }),
        ),
        liveUrl: "https://example.com",
        featured: true,
      },
      {
        title: "PINLAB",
        description:
          "A centralized digital ecosystem designed for equipment lending services with high-precision management.",
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
          "A mood-sharing social platform integrated with the Spotify API for music synchronization.",
        image: "/projects/feeldrop.png",
        tags: ["Express.js", "MongoDB", "Tailwind CSS", "Spotify API"].map(
          (t) => ({ name: t, icon: getIconUrl(t) }),
        ),
        githubUrl: "https://github.com/sakibfaturrahman",
        liveUrl: "https://example.com",
      },
      {
        title: "KilatCuci",
        description:
          "A robust Laundry Management System featuring QR Code-based order tracking.",
        image: "/projects/kilatcuci.png",
        tags: ["Laravel", "Bootstrap", "MySQL", "Livewire"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
        liveUrl: "https://example.com",
      },
      {
        title: "PSKU App",
        description:
          "Online booking platform for gaming centers with secure Midtrans Payment Gateway integration.",
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
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      {/* Background Mesh */}
      <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <ScrollWrapper>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary font-mono">
                Archive
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-foreground font-montserrat tracking-tight leading-none">
              Featured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Works.
              </span>
            </h2>
          </ScrollWrapper>

          <ScrollWrapper>
            <div className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-500/50" />
              <p className="text-muted-foreground text-xs max-w-[200px]">
                Blending robust backend with clean user interfaces.
              </p>
            </div>
          </ScrollWrapper>
        </div>

        {/* GitHub Card (Compact) */}
        <ScrollWrapper className="mb-16">
          <div className="group relative p-6 rounded-3xl bg-zinc-900/10 border border-white/5 backdrop-blur-xl shadow-xl transition-all hover:border-primary/20">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-white/10">
                    <Code2 className="text-primary w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold font-mono uppercase tracking-widest text-muted-foreground">
                    Git.Stat
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">
                  /sakibfaturrahman
                </span>
              </div>

              <div className="overflow-x-auto pb-2 flex justify-center items-end min-h-[140px]">
                <GitHubCalendar
                  username="sakibfaturrahman"
                  blockSize={10}
                  blockMargin={4}
                  fontSize={11}
                  theme={githubTheme}
                  colorScheme="dark"
                />
              </div>
            </div>
          </div>
        </ScrollWrapper>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItemVariants}
              className={`${project.featured ? "md:col-span-2" : "col-span-1"}`}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Compact Elegant CTA */}
        <ScrollWrapper className="text-center mt-20">
          <motion.a
            href="https://github.com/sakibfaturrahman"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-foreground text-background rounded-full font-bold transition-all shadow-lg hover:shadow-primary/20"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm tracking-tight">View Full Repository</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </motion.a>
        </ScrollWrapper>
      </div>
    </section>
  );
}
