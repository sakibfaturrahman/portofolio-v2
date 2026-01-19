"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillIconProps {
  name: string;
  icon: string;
  color?: string;
  className?: string;
}

export function SkillIcon({
  name,
  icon,
  color = "#666",
  className,
}: SkillIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative group flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer",
        className,
      )}
    >
      {/* Icon */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <img
          src={icon || "/placeholder.svg"}
          alt={`${name} logo`}
          className="w-10 h-10 object-contain dark:brightness-0 dark:invert"
          style={{ filter: color !== "#666" ? undefined : undefined }}
        />
      </div>

      {/* Name */}
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {name}
      </span>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
        style={{ backgroundColor: `${color}20` }}
      />
    </motion.div>
  );
}
