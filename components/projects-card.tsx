"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={featured ? "md:col-span-2 md:row-span-2" : ""}
    >
      <Card className="h-full overflow-hidden bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group backdrop-blur-sm">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-video">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />

          {/* Image with zoom effect */}
          <motion.img
            src={image}
            alt={`${title} project screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hover overlay with links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {githubUrl && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-primary/50 hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${title} on GitHub`}
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-primary/50 hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${title} live demo`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
