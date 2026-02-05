"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Github, Code2, Sparkles, Activity, ArrowRight } from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import ProjectModal from "@/components/projectModal";

const lightStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const GitHubCalendar = dynamic<any>(
  () => import("@/components/github-calendar-client"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[120px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse">
        <Activity className="w-5 h-5 text-zinc-400 animate-spin" />
      </div>
    ),
  },
);

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [calendarBlockSize, setCalendarBlockSize] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCalendarBlockSize(10); // Sedikit lebih besar agar mudah dilihat saat di-scroll
      } else {
        setCalendarBlockSize(12);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getIconUrl = (tag: string) => {
    const map: Record<string, string> = {
      Laravel: "laravel/FF2D20",
      Tailwind: "tailwindcss/06B6D4",
      MySQL: "mysql/4479A1",
      Livewire: "livewire/FB70A9",
      MongoDB: "mongodb/47A248",
      Midtrans: "handshake/8B5CF6",
    };
    return `https://cdn.simpleicons.org/${map[tag] || "code/71717a"}`;
  };

  const projects = useMemo(
    () => [
      {
        title: "SIMPATIK APP",
        description:
          "Management and Attendance System for industrial internships.",
        image: "/projects/simpatik.png",
        tags: ["Laravel", "Tailwind", "MySQL", "Livewire"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
        liveUrl: "#",
      },
      {
        title: "PINLAB",
        description: "Digital ecosystem for equipment lending services.",
        image: "/projects/pinlab.png",
        tags: ["Laravel", "MySQL", "Livewire"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
        liveUrl: "#",
      },
      {
        title: "Feeldrop",
        description:
          "Mood-sharing social platform integrated with Spotify API.",
        image: "/projects/feeldrop.png",
        tags: ["Express.js", "MongoDB", "Spotify API"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
        liveUrl: "#",
      },
      {
        title: "PSKU App",
        description: "Gaming center booking with Midtrans integration.",
        image: "/projects/ps.png",
        tags: ["Laravel", "Tailwind CSS", "Midtrans"].map((t) => ({
          name: t,
          icon: getIconUrl(t),
        })),
        liveUrl: "#",
      },
    ],
    [],
  );

  return (
    <section
      id="projects"
      className="py-20 md:py-24 bg-white dark:bg-black transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 font-mono">
                Portfolio
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-black dark:text-white tracking-tighter">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Projects.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm max-w-[300px] font-medium border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
            Curated systems designed for scale, performance, and impact.
          </p>
        </div>

        {/* GitHub Calendar Section - UPDATED FOR SCROLLING */}
        <ScrollWrapper className="mb-12 md:mb-16">
          <div className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-50 dark:bg-[#080808] border border-zinc-100 dark:border-zinc-900 overflow-hidden group">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6 md:mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                      <Code2 className="text-blue-600 dark:text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-black dark:text-white">
                        GitHub Contributions
                      </h3>
                      <p className="text-[9px] md:text-[10px] text-zinc-500 font-mono">
                        @sakibfaturrahman
                      </p>
                    </div>
                  </div>
                  {/* Info Geser di Mobile */}
                  <span className="md:hidden text-[10px] font-bold text-zinc-400 animate-pulse flex items-center gap-1">
                    Scroll →
                  </span>
                </div>

                {/* Calendar Container: overflow-x-auto memungkinkan geser ke samping */}
                <div className="w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-2">
                  {/* min-w memastikan kalender tidak mengecil dan memaksa adanya area scroll */}
                  <div className="min-w-[700px] md:min-w-full transition-all duration-500 group-hover:filter group-hover:brightness-110">
                    <GitHubCalendar
                      username="sakibfaturrahman"
                      blockSize={calendarBlockSize}
                      blockMargin={4}
                      fontSize={10}
                      key={`${new Date().getDay()}-${calendarBlockSize}`}
                      colorScheme="dark"
                      theme={{
                        dark: [
                          "#161b22",
                          "#0e4429",
                          "#006d32",
                          "#26a641",
                          "#39d353",
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="hidden lg:block lg:border-l lg:border-zinc-200 dark:lg:border-zinc-800 lg:pl-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Code Pulse
                  </span>
                  <Activity className="text-blue-500 w-4 h-4 animate-pulse" />
                </div>
                <h4 className="text-2xl font-bold text-black dark:text-white leading-tight">
                  Consistent <br />
                  <span className="text-zinc-400 dark:text-zinc-600 italic">
                    Evolution.
                  </span>
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Every commit represents a step towards building more robust
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </ScrollWrapper>

        {/* Project Grid */}
        <motion.div
          variants={lightStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-zinc-50 dark:bg-[#080808] border border-zinc-100 dark:border-zinc-900 rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] md:aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="p-3 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-sm md:text-2xl font-bold text-black dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <div className="flex gap-1.5 md:gap-3 overflow-hidden">
                    {project.tags.slice(0, 3).map((tag: any) => (
                      <img
                        key={tag.name}
                        src={tag.icon}
                        alt={tag.name}
                        className="h-3 md:h-4 w-auto grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all"
                      />
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex w-12 h-12 rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all shadow-sm">
                  <ArrowRight className="w-6 h-6 text-black dark:text-white group-hover:text-white transform -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Minimal Footer CTA */}
        <div className="mt-12 md:mt-20 flex justify-center">
          <motion.a
            href="https://github.com/sakibfaturrahman"
            target="_blank"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-[10px] md:text-xs tracking-widest transition-all shadow-xl"
          >
            <Github className="w-4 h-4 md:w-5 md:h-5" />
            VIEW FULL ARCHIVE
          </motion.a>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
