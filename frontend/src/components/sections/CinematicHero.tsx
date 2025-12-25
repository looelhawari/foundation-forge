import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, memo } from "react";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";
import projectHighway from "@/assets/real-project-fifa.jpg";
import projectStreet from "@/assets/real-project-mosque.jpg";
import projectInfrastructure from "@/assets/real-project-redevelopment.jpg";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export const CinematicHero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // First scene (0 - 0.3)
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scene1Y = useTransform(scrollYProgress, [0, 0.25], ["0%", "-50%"]);
  const scene1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);
  const scene1Rotate = useTransform(scrollYProgress, [0, 0.25], [0, -15]);

  // Second scene (0.2 - 0.5)
  const scene2Opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.45, 0.6], [0, 1, 1, 0]);
  const scene2Y = useTransform(scrollYProgress, [0.2, 0.35, 0.5], ["100%", "0%", "-50%"]);
  const scene2Scale = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [1.2, 1, 1, 0.8]);
  const scene2Rotate = useTransform(scrollYProgress, [0.45, 0.6], [0, 15]);

  // Third scene (0.5 - 0.8)
  const scene3Opacity = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.95], [0, 1, 1, 0]);
  const scene3X = useTransform(scrollYProgress, [0.55, 0.7, 0.85], ["-100%", "0%", "100%"]);
  const scene3Scale = useTransform(scrollYProgress, [0.55, 0.65, 0.85, 0.95], [0.8, 1, 1, 1.2]);

  // Fourth scene (0.75 - 1)
  const scene4Opacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const scene4Y = useTransform(scrollYProgress, [0.8, 0.95], ["50%", "0%"]);
  const scene4Scale = useTransform(scrollYProgress, [0.8, 0.95], [0.5, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      {/* Fixed Hero Content */}
      <div className="sticky top-0 h-screen overflow-hidden bg-background">

        {/* SCENE 1: Initial Hero */}
        <motion.div
          style={{
            opacity: scene1Opacity,
            y: scene1Y,
            scale: scene1Scale,
            rotate: scene1Rotate,
            willChange: 'transform, opacity'
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Highway construction at sunset"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-primary font-display text-lg tracking-[0.5em] mb-8 block"
              >
                SINCE 2017
              </motion.span>
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[0.02em]"
              >
                BUILDING THE <span className="text-gradient">ROADS</span> OF TOMORROW
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* SCENE 2: Highway Projects */}
        <motion.div
          style={{
            opacity: scene2Opacity,
            y: scene2Y,
            scale: scene2Scale,
            rotate: scene2Rotate,
            willChange: 'transform, opacity'
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={projectHighway}
              alt="FIFA 2022 road work project"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <motion.span className="text-primary font-display text-lg tracking-[0.5em] mb-8 block">
                HIGHWAYS & INFRASTRUCTURE
              </motion.span>
              <motion.h1 className="font-display text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] tracking-[0.02em]">
                57+ MAJOR PROJECTS<br />
                <span className="text-gradient">DELIVERED</span>
              </motion.h1>
              <motion.p className="mt-8 text-xl text-muted-foreground max-w-2xl">
                From massive highway expansions to complex interchange systems, we deliver excellence at scale.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* SCENE 3: Urban Development */}
        <motion.div
          style={{
            opacity: scene3Opacity,
            x: scene3X,
            scale: scene3Scale,
            willChange: 'transform, opacity'
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={projectStreet}
              alt="Mosque road construction project"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <motion.span className="text-primary font-display text-lg tracking-[0.5em] mb-8 block">
                URBAN EXCELLENCE
              </motion.span>
              <motion.h1 className="font-display text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] tracking-[0.02em]">
                TRANSFORMING<br />
                <span className="text-gradient">QATAR'S CITIES</span>
              </motion.h1>
              <motion.p className="mt-8 text-xl text-muted-foreground max-w-2xl">
                Modern urban infrastructure that connects communities and drives economic growth.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* SCENE 4: Innovation & Future */}
        <motion.div
          style={{
            opacity: scene4Opacity,
            y: scene4Y,
            scale: scene4Scale,
            willChange: 'transform, opacity'
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={projectInfrastructure}
              alt="Redevelopment project"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
              <motion.span className="text-primary font-display text-lg tracking-[0.5em] mb-8 block">
                YOUR VISION, OUR EXPERTISE
              </motion.span>
              <motion.h1 className="font-display text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] tracking-[0.02em]">
                LET'S BUILD<br />
                <span className="text-gradient">SOMETHING GREAT</span>
              </motion.h1>
              <motion.p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
                Partner with Qatar's trusted construction leader. Excellence guaranteed.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: scene1Opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

CinematicHero.displayName = 'CinematicHero';
