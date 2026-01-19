"use client";

import { motion } from "framer-motion";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { ProjectCard } from "@/components/projects-card";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with Laravel and React. Includes product management, cart functionality, payment integration, and admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Laravel", "React", "MySQL", "Stripe"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Task Management API",
    description:
      "RESTful API for task management with authentication, real-time updates, and team collaboration features.",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop",
    tags: ["Node.js", "Express", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "School Management System",
    description:
      "Comprehensive system for managing student records, grades, attendance, and academic schedules.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    tags: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    githubUrl: "https://github.com",
  },
  {
    title: "Inventory Tracker",
    description:
      "Real-time inventory management system with barcode scanning, stock alerts, and reporting features.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop",
    tags: ["Laravel", "Vue.js", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Blog CMS",
    description:
      "Headless CMS for blogs with markdown support, SEO optimization, and multi-author capabilities.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    tags: ["Node.js", "Next.js", "MongoDB", "AWS S3"],
    githubUrl: "https://github.com",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollWrapper className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            My Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in building
            scalable back-end systems and full-stack applications.
          </p>
        </ScrollWrapper>

        {/* Projects Bento Grid */}
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
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                featured={project.featured}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <ScrollWrapper className="text-center mt-12">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            View All Projects on GitHub
            <span className="text-lg">→</span>
          </motion.a>
        </ScrollWrapper>
      </div>
    </section>
  );
}
