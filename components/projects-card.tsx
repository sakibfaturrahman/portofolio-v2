"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TechTag {
  name: string;
  icon: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: TechTag[]; // Diubah untuk mendukung objek icon
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? "md:col-span-2" : "col-span-1"}
    >
      <Card className="h-full overflow-hidden bg-zinc-900/40 border-white/5 hover:border-primary/50 transition-all duration-500 group backdrop-blur-md relative shadow-2xl">
        {/* Decorative Glow */}
        <div className="absolute -inset-px bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[16/9] md:aspect-auto md:h-64">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60" />

          <motion.img
            src={image}
            alt={`${title} showcase`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px] flex items-center justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {githubUrl && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-white/10 bg-white/5 hover:bg-primary hover:text-white transition-colors"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-white/10 bg-white/5 hover:bg-primary hover:text-white transition-colors"
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            {featured && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-widest border border-primary/20">
                Featured
              </span>
            )}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
            {description}
          </p>

          {/* Techstack with Icons */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <div
                key={tag.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950/50 border border-white/5 group/tag hover:border-primary/30 transition-colors"
              >
                <img
                  src={tag.icon}
                  alt={tag.name}
                  className="w-3.5 h-3.5 object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
                />
                <span className="text-[10px] font-mono font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
