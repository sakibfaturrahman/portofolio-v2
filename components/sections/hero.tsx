"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import ShinyText from "@/components/ShinyText";
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

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 70, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 70, damping: 25 });

  const imageX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const imageY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    let ctx = gsap.context(() => {
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
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            delay: 0.5,
          },
        );
      }
    });

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      window.requestAnimationFrame(() => {
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlightPos({ x, y });
    },
    [isMobile],
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white dark:bg-black transition-colors duration-500"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
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
                <ShinyText
                  text="developing future"
                  speed={2}
                  className="text-sm italic font-medium"
                  color="#71717a"
                  shineColor="#ffffff"
                  spread={120}
                />
              </div>
            </motion.div>

            <div className="mb-8">
              <span
                ref={helloRef}
                className="text-lg font-medium text-zinc-500 dark:text-zinc-400 block mb-3"
              >
                Hello there, I&apos;m
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] font-montserrat text-black dark:text-white">
                <AnimatedText text="Sakib" />
                <br />
                <AnimatedText text="Faturrahman" />
              </h1>
            </div>

            <motion.p
              variants={fadeUpVariants}
              className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto lg:mx-0"
            >
              Back-End Focused Developer. Building{" "}
              <span className="text-primary font-semibold">
                scalable systems
              </span>{" "}
              with clean architecture.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-xl group bg-primary">
                <a
                  href="/file/CV%20SAKIB%20FATURRAHMAN.pdf"
                  download
                  className="inline-flex items-center"
                >
                  <FileText className="mr-2 h-5 w-5" /> Download My Resume
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact Me
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image Section */}
          <motion.div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              style={{
                x: isMobile ? 0 : imageX,
                y: isMobile ? 0 : imageY,
                willChange: "transform",
              }}
              className="relative lg:cursor-none"
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleImageMouseMove}
            >
              {/* Glow Aura Decor */}
              <div
                className={`absolute -inset-10 bg-primary/10 rounded-full blur-3xl transition-opacity duration-1000 ${isHovered ? "opacity-100" : "opacity-30"}`}
              />

              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-[3rem] overflow-hidden border-[6px] border-zinc-100 dark:border-zinc-900 shadow-2xl bg-zinc-900 transition-transform duration-500 hover:rotate-0 rotate-2">
                <Image
                  src="/images/porto.webp"
                  alt="Profile Background"
                  fill
                  priority
                  sizes="(max-width: 1024px) 384px, 420px"
                  className={`object-cover transition-all duration-700 ${
                    !isMobile
                      ? isHovered
                        ? "grayscale brightness-50"
                        : "grayscale opacity-60"
                      : "grayscale-0 brightness-100"
                  }`}
                />

                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={
                      {
                        WebkitMaskImage: `radial-gradient(circle 130px at ${spotlightPos.x}% ${spotlightPos.y}%, black 40%, transparent 100%)`,
                        maskImage: `radial-gradient(circle 130px at ${spotlightPos.x}% ${spotlightPos.y}%, black 40%, transparent 100%)`,
                      } as any
                    }
                  >
                    <Image
                      src="/images/porto.webp"
                      alt="Profile Spotlight"
                      fill
                      className="object-cover grayscale-0 brightness-110"
                    />
                  </motion.div>
                )}
              </div>

              {/* Float Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden lg:flex absolute -left-6 top-1/4 px-5 py-2.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-30"
              >
                <span className="text-sm font-bold flex items-center gap-2 text-black dark:text-white">
                  <div
                    className={`w-2 h-2 rounded-full ${isHovered ? "bg-green-500 animate-pulse" : "bg-zinc-500"}`}
                  />
                  Fullstack
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                    {" "}
                    Developer.
                  </span>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
