"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2, Rocket } from "lucide-react";

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
        <div className="h-4 w-48 bg-zinc-800 animate-pulse rounded-full" />
        <span className="text-[10px] font-mono animate-pulse uppercase tracking-widest">
          Synchronizing_Commit_Data...
        </span>
      </div>
    ),
  },
);

const githubTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function Projects() {
  const projects = useMemo(
    () => [
      {
        title: "SIMPATIK APP",
        description:
          "An integrated Management and Attendance Information System for Vocational High School industrial internships, featuring real-time tracking and automated reporting.",
        image: "/projects/simpatik.png",
        tags: ["Laravel", "Tailwind", "MySQL", "Livewire", "Alpine.js"],

        liveUrl: "https://example.com",
        featured: true, // Mengambil 2 kolom di desktop
      },
      {
        title: "PINLAB",
        description:
          "A centralized digital ecosystem designed for equipment lending services, optimizing resource allocation with high-precision database management.",
        image: "/projects/pinlab.png",
        liveUrl: "https://example.com",
        tags: ["Laravel", "MySQL", "Bootstrap", "Livewire"],
      },
      {
        title: "Feeldrop",
        description:
          "A mood-sharing social platform integrated with the Spotify API, allowing users to express emotions through curated music synchronization.",
        image: "/projects/feeldrop.png",
        tags: ["Express.js", "MongoDB", "Tailwind CSS", "Spotify API"],
        githubUrl: "https://github.com/sakibfaturrahman",
        liveUrl: "https://example.com",
      },
      {
        title: "KilatCuci",
        description:
          "A robust Laundry Management System featuring QR Code-based order tracking and automated customer notification workflows.",
        image: "/projects/kilatcuci.png",
        tags: ["Laravel", "Bootstrap", "MySQL", "Livewire"],
        liveUrl: "https://example.com",
      },
      {
        title: "PSKU App",
        description:
          "An automated online booking platform for gaming centers, featuring secure payment processing via Midtrans Payment Gateway integration.",
        image: "/projects/ps.png",
        tags: ["Laravel", "Tailwind CSS", "MySQL", "Midtrans"],
        liveUrl: "https://example.com",
      },
    ],
    [],
  );

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <ScrollWrapper>
            <div className="flex items-center gap-2 text-primary mb-4">
              <Rocket className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase font-mono">
                Portfolio
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-foreground font-montserrat tracking-tighter">
              Selected <span className="text-primary">Works.</span>
            </h2>
          </ScrollWrapper>

          <ScrollWrapper>
            <p className="text-muted-foreground max-w-xs text-sm md:text-right leading-relaxed italic">
              "Focusing on backend architecture and seamless user experiences."
            </p>
          </ScrollWrapper>
        </div>

        {/* GitHub Activity Card */}
        <ScrollWrapper className="mb-12">
          <div className="group p-6 md:p-8 rounded-[2.5rem] bg-zinc-900/20 backdrop-blur-md border border-white/5 relative overflow-hidden transition-all hover:border-primary/20">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Github className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code2 className="text-primary w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-mono uppercase tracking-widest">
                    Github_Activity_Log
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">
                    Live Data
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto pb-4 custom-scrollbar flex justify-center">
                <GitHubCalendar
                  username="sakibfaturrahman"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={13}
                  theme={githubTheme}
                  colorScheme="dark"
                />
              </div>
            </div>
          </div>
        </ScrollWrapper>

        {/* Projects Bento Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={staggerItemVariants}
              className={project.featured ? "md:col-span-2" : "col-span-1"}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Global CTA */}
        <ScrollWrapper className="text-center mt-24">
          <motion.a
            href="https://github.com/sakibfaturrahman"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-foreground text-background rounded-2xl font-black transition-all hover:bg-primary hover:text-white shadow-2xl"
          >
            <Github className="w-6 h-6" />
            <span className="text-lg">View More on GitHub</span>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </ScrollWrapper>
      </div>
    </section>
  );
}
