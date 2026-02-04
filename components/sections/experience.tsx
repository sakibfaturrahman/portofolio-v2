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
          className={`relative overflow-hidden transition-all duration-500 group 
          bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 
          hover:border-primary/50 shadow-sm dark:shadow-none
          ${item.isCurrent ? "ring-1 ring-primary/30" : ""}`}
        >
          {item.isCurrent && (
            <div className="absolute top-0 right-0 p-2">
              <Badge className="bg-primary text-white text-[10px] animate-pulse border-none">
                Present
              </Badge>
            </div>
          )}

          <CardContent className="p-6">
            <div
              className={`flex items-start gap-4 mb-4 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className={isEven ? "lg:text-right" : ""}>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-montserrat tracking-tight">
                  {item.title}
                </h3>
                <p className="text-primary font-mono text-sm font-bold tracking-tighter uppercase">
                  {item.organization}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-4 ${
                isEven ? "lg:justify-end" : ""
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-primary/60" />
              {item.period}
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium">
              {item.description}
            </p>

            {item.skills && (
              <div
                className={`flex flex-wrap gap-2 ${
                  isEven ? "lg:justify-end" : ""
                }`}
              >
                {item.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-[10px] py-0 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Marker Dot */}
      <div className="hidden lg:flex flex-col items-center z-10">
        <motion.div
          whileHover={{ scale: 1.5 }}
          className={`w-4 h-4 rounded-full border-4 shadow-xl transition-colors duration-300 
          border-white dark:border-black
          ${item.isCurrent ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"}`}
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
    <section
      id="experience"
      className="py-24 md:py-32 relative bg-white dark:bg-black transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6">
        <ScrollWrapper className="mb-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white font-montserrat tracking-tighter">
              Experience &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Education.
              </span>
            </h2>
            <div className="h-1.5 w-24 bg-primary/10 mt-6 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary" />
            </div>
          </div>
        </ScrollWrapper>

        <div ref={containerRef} className="relative mt-10">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/50 via-primary to-primary origin-top shadow-[0_0_15px_rgba(var(--primary),0.5)]"
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
