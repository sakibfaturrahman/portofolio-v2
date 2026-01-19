"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { viewportSettings } from "@/lib/animations";

interface ScrollWrapperProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

// Default fade up animation
const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function ScrollWrapper({
  children,
  variants = defaultVariants,
  className = "",
  delay = 0,
}: ScrollWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
