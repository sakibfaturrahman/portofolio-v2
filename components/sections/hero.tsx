"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import {
  textRevealContainerVariants,
  textRevealCharVariants,
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      variants={textRevealContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={textRevealCharVariants as any}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLSpanElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const imageX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const imageY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (helloRef.current) {
      const text = helloRef.current.innerText;
      helloRef.current.innerHTML = text
        .split("")
        .map(
          (c) =>
            `<span class="char inline-block">${c === " " ? "&nbsp;" : c}</span>`,
        )
        .join("");
      gsap.fromTo(
        ".char",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out",
          delay: 0.5,
        },
      );
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Konten Teks */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              variants={staggerItemVariants}
              className="mb-8 items-center lg:items-start flex flex-col"
            >
              <div className="bg-card/40 backdrop-blur-md border border-border/50 px-4 py-2 rounded-2xl">
                <p className="text-sm italic text-muted-foreground">
                  "developing future"
                </p>
              </div>
            </motion.div>

            <div className="mb-8">
              <span
                ref={helloRef}
                className="text-lg font-medium text-muted-foreground block mb-3"
              >
                Hello there, I'm
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-montserrat leading-[0.9]">
                <AnimatedText text="Sakib" />
                <br />
                <AnimatedText text="Faturrahman" />
              </h1>
            </div>

            <motion.p
              variants={fadeUpVariants}
              className="text-lg text-muted-foreground mb-10 max-w-md mx-auto lg:mx-0"
            >
              Back-End Focused. Building{" "}
              <span className="text-primary font-semibold">
                scalable systems
              </span>{" "}
              with clean architecture.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="rounded-xl group bg-primary">
                <FileText className="mr-2 h-5 w-5" /> Download My Resume
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl">
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Bagian Foto Profil */}
          <motion.div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              style={{ x: imageX, y: imageY }}
              className="relative lg:cursor-none"
              data-hide-cursor="true"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleImageMouseMove}
            >
              {/* Glow Aura */}
              <div
                className={`absolute -inset-10 bg-primary/10 rounded-full blur-3xl transition-opacity duration-1000 ${isHovered ? "opacity-100" : "opacity-30"}`}
              />

              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-[3rem] overflow-hidden border-[6px] border-card shadow-2xl transition-transform duration-500 hover:rotate-0 rotate-2 bg-zinc-900">
                {/* Layer 1: Base Image */}
                <img
                  src="/images/porto.webp"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isMobile
                      ? "grayscale-0 opacity-100 brightness-100"
                      : "grayscale opacity-30 brightness-50"
                  }`}
                  alt="Background"
                />

                {/* Layer 2: Colored Image (Hanya aktif di Desktop) */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={
                      {
                        WebkitMaskImage: isHovered
                          ? `radial-gradient(circle 100px at ${spotlightPos.x}% ${spotlightPos.y}%, black 20%, transparent 100%)`
                          : `radial-gradient(circle 0px at ${spotlightPos.x}% ${spotlightPos.y}%, black 0%, transparent 0%)`,
                        maskImage: isHovered
                          ? `radial-gradient(circle 100px at ${spotlightPos.x}% ${spotlightPos.y}%, black 20%, transparent 100%)`
                          : `radial-gradient(circle 0px at ${spotlightPos.x}% ${spotlightPos.y}%, black 0%, transparent 0%)`,
                      } as any
                    }
                    transition={{ type: "tween", ease: "circOut", duration: 0 }}
                  >
                    <img
                      src="/images/porto.webp"
                      className="w-full h-full object-cover"
                      alt="Foreground"
                    />
                  </motion.div>
                )}
              </div>

              {/* Float Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-6 top-1/4 px-5 py-2.5 bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-xl z-30"
              >
                <span className="text-sm font-bold flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${isHovered ? "bg-primary animate-pulse" : "bg-zinc-500"}`}
                  />
                  Fullstack Dev
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
