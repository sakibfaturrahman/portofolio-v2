"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  // Tutup modal saat menekan tombol Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/80"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-3xl bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-2xl transition-colors duration-500"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 p-2 bg-zinc-100/80 dark:bg-black/50 rounded-full border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-zinc-900 dark:text-white" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-64 md:h-full min-h-[350px] bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info Side */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag: any) => (
                    <div
                      key={tag.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 dark:bg-white/5 rounded-md border border-zinc-200 dark:border-white/10"
                    >
                      <img
                        src={tag.icon}
                        alt={tag.name}
                        className="h-3.5 w-auto"
                      />
                      <span className="text-[10px] text-zinc-600 dark:text-zinc-300 font-bold uppercase tracking-wider">
                        {tag.name}
                      </span>
                    </div>
                  ))}
                </div>

                <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 leading-tight">
                  {project.title}
                </h3>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95"
                  >
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
