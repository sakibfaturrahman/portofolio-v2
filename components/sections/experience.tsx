"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerItemVariants } from "@/lib/animations";

interface TimelineItem {
  type: "education" | "work";
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
}

const timelineData: TimelineItem[] = [
  {
    type: "education",
    title: "Rekayasa Perangkat Lunak (Software Engineering)",
    organization: "SMK Negeri",
    period: "2021 - 2024",
    description:
      "Studied software engineering fundamentals including programming logic, database management, web development, and software project management. Developed strong foundation in Back-End development.",
    skills: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
  },
  {
    type: "work",
    title: "Web Developer Intern",
    organization: "CV Abdi Creative Technology",
    period: "2023 - 2024",
    description:
      "Gained hands-on experience in real-world web development projects. Collaborated with senior developers to build and maintain web applications. Learned industry best practices and agile methodologies.",
    skills: ["Laravel", "MySQL", "Git", "RESTful API"],
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const isEven = index % 2 === 0;
  const Icon = item.type === "education" ? GraduationCap : Briefcase;

  return (
    <motion.div
      variants={staggerItemVariants}
      className={`flex items-center gap-8 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
        <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden">
          <CardContent className="p-6">
            {/* Header */}
            <div
              className={`flex items-start gap-4 mb-4 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className={isEven ? "lg:text-right" : ""}>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-primary font-medium">{item.organization}</p>
              </div>
            </div>

            {/* Period */}
            <div
              className={`flex items-center gap-2 text-sm text-muted-foreground mb-4 ${
                isEven ? "lg:justify-end" : ""
              }`}
            >
              <Calendar className="w-4 h-4" />
              {item.period}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Skills */}
            {item.skills && (
              <div
                className={`flex flex-wrap gap-2 ${
                  isEven ? "lg:justify-end" : ""
                }`}
              >
                {item.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Timeline marker - Hidden on mobile */}
      <div className="hidden lg:flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
      </div>

      {/* Spacer for alignment */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress to timeline height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollWrapper className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            My Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A timeline of my professional growth and educational background that
            shaped my skills as a developer.
          </p>
        </ScrollWrapper>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical Timeline Line - Desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            {/* Background line */}
            <div className="absolute inset-0 bg-border" />
            {/* Progress line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="space-y-12"
          >
            {timelineData.map((item, index) => (
              <TimelineCard key={item.title} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
