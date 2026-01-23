"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TechTag {
  name: string;
  icon: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: TechTag[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative h-full ${featured ? "md:col-span-2" : "col-span-1"}`}
    >
      <Card className="h-full group overflow-hidden bg-[#0a0a0a] border-zinc-800/50 hover:border-primary/40 transition-all duration-500 shadow-none hover:shadow-[0_0_30px_-15px_rgba(59,130,246,0.3)] will-change-transform">
        {/* Top Action Buttons - Overlay Kecil di Pojok */}
        <div className="absolute top-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-zinc-900/80 border border-zinc-700 hover:bg-zinc-800 hover:border-primary/50 text-zinc-400 hover:text-primary transition-all shadow-xl"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-zinc-900/80 border border-zinc-700 hover:bg-zinc-800 hover:border-primary/50 text-zinc-400 hover:text-primary transition-all shadow-xl"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Image Section dengan Aspect Ratio yang Fleksibel */}
        <div
          className={`relative overflow-hidden ${featured ? "aspect-[21/9]" : "aspect-video"} bg-zinc-900`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80" />

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            loading="lazy"
          />

          {/* Featured Badge yang Lebih Minimalis */}
          {featured && (
            <div className="absolute bottom-6 left-6 z-20">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Featured Project
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 pt-2 flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-zinc-100 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="mt-3 text-zinc-400 text-sm leading-relaxed line-clamp-2 group-hover:text-zinc-300 transition-colors">
              {description}
            </p>
          </div>

          {/* Techstack - Pill Style yang Lebih Rapih */}
          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            {tags.slice(0, 5).map((tag) => (
              <div
                key={tag.name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50 group/tag hover:border-zinc-700 transition-all"
              >
                <img
                  src={tag.icon}
                  alt={tag.name}
                  className="w-3.5 h-3.5 opacity-60 group-hover/tag:opacity-100 transition-opacity"
                />
                <span className="text-[10px] font-mono text-zinc-500 group-hover/tag:text-zinc-300 transition-colors">
                  {tag.name}
                </span>
              </div>
            ))}
            {tags.length > 5 && (
              <span className="px-2 py-1 text-[10px] text-zinc-600 font-mono">
                +{tags.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Progress Bar Decor */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );
}
