"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, ExternalLink } from "lucide-react";
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
  isCurrent?: boolean;
}

const timelineData: TimelineItem[] = [
  {
    type: "education",
    title: "Informatika (Computer Science)",
    organization: "Universitas Perjuangan Tasikmalaya",
    period: "2024 - Present",
    isCurrent: true,
    description:
      "Currently pursuing a bachelor's degree with a focus on algorithm development, data structures, and information system architecture. Actively exploring modern technologies in an academic environment.",
    skills: ["Algorithm", "Data Structure", "System Analysis"],
  },
  {
    type: "work",
    title: "Freelance Full-Stack Developer",
    organization: "Self-Employed",
    period: "June 2024 - Present",
    isCurrent: true,
    description:
      "Building various custom web applications for local and international clients. Focus on back-end scalability and responsive front-end integration. Handling the entire software development lifecycle.",
    skills: ["Laravel", "Next.js", "MongoDB", "Tailwind CSS"],
  },
  {
    type: "work",
    title: "Web Developer Intern",
    organization: "CV Abdi Creative Technology",
    period: "2023 - 2024",
    description:
      "Collaborated in a team to develop company web-based applications. Learned professional workflows, Git flow, and RESTful API implementation in production scale.",
    skills: ["PHP", "Laravel", "MySQL", "Git"],
  },
  {
    type: "education",
    title: "Software Engineering",
    organization: "SMK Rekayasa Perangkat Lunak",
    period: "2021 - 2024",
    description:
      "Learning the basics of programming, computer logic, and database management. Becoming the main foundation in starting a career as a software developer.",
    skills: ["PHP", "JavaScript", "HTML/CSS", "Database Management"],
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const isEven = index % 2 === 0;
  const Icon = item.type === "education" ? GraduationCap : Briefcase;

  return (
    <motion.div
      variants={staggerItemVariants}
      className={`flex items-center gap-8 relative ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div
        className={`flex-1 w-full ${isEven ? "lg:text-right" : "lg:text-left"}`}
      >
        <Card
          className={`relative overflow-hidden bg-card/40 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 group ${item.isCurrent ? "ring-1 ring-primary/30" : ""}`}
        >
          {item.isCurrent && (
            <div className="absolute top-0 right-0 p-2">
              <Badge className="bg-primary text-primary-foreground text-[10px] animate-pulse">
                Present
              </Badge>
            </div>
          )}

          <CardContent className="p-6">
            <div
              className={`flex items-start gap-4 mb-4 ${isEven ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className={isEven ? "lg:text-right" : ""}>
                <h3 className="text-xl font-bold text-foreground font-montserrat tracking-tight">
                  {item.title}
                </h3>
                <p className="text-primary font-mono text-sm tracking-tighter uppercase">
                  {item.organization}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4 ${isEven ? "lg:justify-end" : ""}`}
            >
              <Calendar className="w-3.5 h-3.5 text-primary/60" />
              {item.period}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {item.description}
            </p>

            {item.skills && (
              <div
                className={`flex flex-wrap gap-2 ${isEven ? "lg:justify-end" : ""}`}
              >
                {item.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-[10px] py-0 border-primary/20 bg-primary/5"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Marker */}
      <div className="hidden lg:flex flex-col items-center z-10">
        <motion.div
          whileHover={{ scale: 1.5 }}
          className={`w-4 h-4 rounded-full border-4 border-background shadow-xl transition-colors duration-300 ${item.isCurrent ? "bg-primary" : "bg-muted-foreground/30"}`}
        />
      </div>

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

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-zinc-950/30">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollWrapper className="mb-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-montserrat tracking-tighter">
              Experience &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Education.
              </span>
            </h2>
            <div className="h-1 w-20 bg-primary/20 mt-6 rounded-full" />
          </div>
        </ScrollWrapper>

        <div ref={containerRef} className="relative mt-10">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/50 to-primary origin-top shadow-[0_0_15px_rgba(var(--primary),0.5)]"
              style={{ height: lineHeight }}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="space-y-16"
          >
            {timelineData.map((item, index) => (
              <TimelineCard
                key={item.title + index}
                item={item}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
