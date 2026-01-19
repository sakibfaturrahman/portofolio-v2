import { Navbar } from "@/components/navbar";
import { ProgressBar } from "@/components/progress-bar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      {/* Progress bar indicator */}
      <ProgressBar />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero Section - First impression with animated gradient and parallax */}
        <Hero />

        {/* About Section - Personal narrative with stats */}
        <About />

        {/* Skills Section - Interactive bento grid with tech stack */}
        <Skills />

        {/* Experience & Education - Animated timeline */}
        <Experience />

        {/* Projects - Glassmorphism cards with bento layout */}
        <Projects />

        {/* Contact - Form with validation */}
        <Contact />
      </main>

      {/* Footer with back-to-top button */}
      <Footer />
    </>
  );
}
