"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layers, Zap } from "lucide-react";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  staggerContainerVariants,
  staggerItemVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from "@/lib/animations";

const stats = [
  { icon: Code2, value: "3+", label: "Years Coding" },
  { icon: Database, value: "15+", label: "Projects Completed" },
  { icon: Layers, value: "10+", label: "Tech Stack" },
  { icon: Zap, value: "100%", label: "Dedication" },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollWrapper className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Passionate About Building
            <br />
            <span className="text-primary">Scalable Solutions</span>
          </h2>
        </ScrollWrapper>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <ScrollWrapper variants={slideInLeftVariants}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
                <img
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&h=500&fit=crop"
                  alt="Sakib working on code"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 md:right-6"
              >
                <Card className="bg-card/90 backdrop-blur-sm border-border shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          SMK RPL
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Graduate 2024
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </ScrollWrapper>

          {/* Content Side */}
          <ScrollWrapper variants={slideInRightVariants}>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="text-foreground font-medium">
                  Sakib Faturrahman
                </span>
                , a web developer with a strong focus on Back-End development. I
                graduated from SMK Rekayasa Perangkat Lunak (Software
                Engineering Vocational School) and have been passionate about
                building efficient, scalable systems ever since.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey began with understanding the fundamentals of
                programming logic and database management. Today, I specialize
                in creating clean architectures using technologies like{" "}
                <span className="text-primary font-medium">
                  PHP, Laravel, Node.js
                </span>
                , and various database systems.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                While my heart lies in Back-End development, I&apos;ve been
                expanding my skills to become a Full-Stack professional,
                combining robust server-side solutions with engaging front-end
                experiences.
              </p>
            </div>
          </ScrollWrapper>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItemVariants}>
              <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
