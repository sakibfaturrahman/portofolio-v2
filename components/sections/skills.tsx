"use client";

import { motion } from "framer-motion";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { SkillIcon } from "@/components/skill-icon";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

// Skills data organized by category
const skillCategories = [
  {
    name: "Web Fundamentals",
    skills: [
      {
        name: "HTML5",
        icon: "https://cdn.simpleicons.org/html5/E34F26",
        color: "#E34F26",
      },
      {
        name: "CSS3",
        icon: "https://cdn.simpleicons.org/css3/1572B6",
        color: "#1572B6",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
        color: "#F7DF1E",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
        color: "#3178C6",
      },
    ],
  },
  {
    name: "Back-End",
    skills: [
      {
        name: "PHP",
        icon: "https://cdn.simpleicons.org/php/777BB4",
        color: "#777BB4",
      },
      {
        name: "Laravel",
        icon: "https://cdn.simpleicons.org/laravel/FF2D20",
        color: "#FF2D20",
      },
      {
        name: "Node.js",
        icon: "https://cdn.simpleicons.org/nodedotjs/339933",
        color: "#339933",
      },
      {
        name: "Express",
        icon: "https://cdn.simpleicons.org/express/000000",
        color: "#000000",
      },
    ],
  },
  {
    name: "Database",
    skills: [
      {
        name: "MySQL",
        icon: "https://cdn.simpleicons.org/mysql/4479A1",
        color: "#4479A1",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/4169E1",
        color: "#4169E1",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.simpleicons.org/mongodb/47A248",
        color: "#47A248",
      },
      {
        name: "Redis",
        icon: "https://cdn.simpleicons.org/redis/DC382D",
        color: "#DC382D",
      },
    ],
  },
  {
    name: "Front-End & Mobile",
    skills: [
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react/61DAFB",
        color: "#61DAFB",
      },
      {
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs/000000",
        color: "#000000",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        color: "#06B6D4",
      },
      {
        name: "Flutter",
        icon: "https://cdn.simpleicons.org/flutter/02569B",
        color: "#02569B",
      },
    ],
  },
  {
    name: "Tools & DevOps",
    skills: [
      {
        name: "Git",
        icon: "https://cdn.simpleicons.org/git/F05032",
        color: "#F05032",
      },
      {
        name: "Docker",
        icon: "https://cdn.simpleicons.org/docker/2496ED",
        color: "#2496ED",
      },
      {
        name: "VS Code",
        icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
        color: "#007ACC",
      },
      {
        name: "Postman",
        icon: "https://cdn.simpleicons.org/postman/FF6C37",
        color: "#FF6C37",
      },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollWrapper className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            My Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Technologies I Work With
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A curated selection of tools and technologies I use to build robust,
            scalable applications from front to back.
          </p>
        </ScrollWrapper>

        {/* Skills Bento Grid */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.name}>
              <ScrollWrapper>
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary" />
                  {category.name}
                </h3>
              </ScrollWrapper>

              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {category.skills.map((skill) => (
                  <motion.div key={skill.name} variants={staggerItemVariants}>
                    <SkillIcon
                      name={skill.name}
                      icon={skill.icon}
                      color={skill.color}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <ScrollWrapper className="mt-16">
          <div className="text-center p-8 rounded-2xl bg-card/50 border border-border">
            <p className="text-muted-foreground">
              Always learning and exploring new technologies to deliver the best
              solutions.
              <br />
              <span className="text-foreground font-medium">
                Currently exploring:
              </span>{" "}
              <span className="text-primary">
                AI/ML Integration, Cloud Architecture, System Design
              </span>
            </p>
          </div>
        </ScrollWrapper>
      </div>
    </section>
  );
}
