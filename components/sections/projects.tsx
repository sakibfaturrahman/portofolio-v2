"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { ProjectCard } from "@/components/projects-card";
import { Github, ExternalLink, Code2 } from "lucide-react";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

const githubTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function Projects() {
  const [CalendarComponent, setCalendarComponent] = useState<any>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const mod = await import("react-github-calendar");
        const extractedComponent =
          mod.default?.default ||
          mod.default ||
          (mod as any).GitHubCalendar ||
          mod;

        if (
          typeof extractedComponent === "function" ||
          typeof extractedComponent === "object"
        ) {
          setCalendarComponent(() => extractedComponent);
        }
      } catch (err) {
        console.error("Failed to load GitHub Calendar:", err);
      }
    };

    loadComponent();
  }, []);

  const projects = useMemo(
    () => [
      {
        title: "SIMPATIK APP",
        description:
          "An integrated Management and Attendance Information System for Vocational High School industrial internships, featuring real-time tracking and automated reporting.",
        image: "/projects/simpatik.png",
        tags: ["Laravel", "Tailwind", "MySQL", "Livewire", "Alpine.js"],
        githubUrl: "https://github.com/sakibfaturrahman",
        liveUrl: "https://example.com",
        featured: true,
      },
      {
        title: "PINLAB",
        description:
          "A centralized digital ecosystem designed for equipment lending services, optimizing resource allocation with high-precision database management.",
        image: "/projects/pinlab.png",
        tags: ["Laravel", "MySQL", "Bootstrap", "Livewire"],
        githubUrl: "https://github.com/sakibfaturrahman",
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
        githubUrl: "https://github.com/sakibfaturrahman",
        liveUrl: "https://example.com",
      },
      {
        title: "PSKU App",
        description:
          "An automated online booking platform for gaming centers, featuring secure payment processing via Midtrans Payment Gateway integration.",
        image: "/projects/ps.png",
        tags: ["Laravel", "Tailwind CSS", "MySQL", "Midtrans"],
        githubUrl: "https://github.com/sakibfaturrahman",
      },
    ],
    [],
  );

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Glow Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <ScrollWrapper className="text-left">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-montserrat tracking-tighter">
              Featured <span className="text-primary">Projects.</span>
            </h2>
          </ScrollWrapper>

          <ScrollWrapper>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card/40 backdrop-blur-md border border-border/50 p-4 rounded-2xl flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest leading-none mb-1">
                  GitHub Status
                </p>
                <p className="text-sm font-bold text-foreground italic">
                  Active Contributor
                </p>
              </div>
            </motion.div>
          </ScrollWrapper>
        </div>

        {/* GitHub Contribution Activity */}
        <ScrollWrapper className="mb-12">
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-sm border border-border/50 overflow-hidden relative transition-all hover:border-primary/20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Code2 className="text-primary w-5 h-5" />
                <h3 className="text-sm font-bold font-mono tracking-tight uppercase">
                  Contribution Graph
                </h3>
              </div>

              <div className="overflow-x-auto pb-2 custom-scrollbar flex justify-center min-h-[150px]">
                {CalendarComponent ? (
                  <CalendarComponent
                    username="sakibfaturrahman"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={14}
                    theme={githubTheme}
                    colorScheme="dark"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                    <div className="h-4 w-48 bg-zinc-800 animate-pulse rounded" />
                    <span className="text-[10px] font-mono animate-pulse uppercase">
                      Initialising_Data...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollWrapper>

        {/* Projects Grid (Bento Style) */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItemVariants}
              className={project.featured ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Global CTA */}
        <ScrollWrapper className="text-center mt-20">
          <motion.a
            href="https://github.com/sakibfaturrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold overflow-hidden transition-all shadow-xl shadow-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Github className="w-5 h-5" />
            <span>Explore Entire Repository</span>
            <ExternalLink className="w-4 h-4 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </ScrollWrapper>
      </div>
    </section>
  );
}
