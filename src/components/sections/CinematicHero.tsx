import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

export const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Fixed Hero Content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background with Parallax */}
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Highway construction at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col justify-center"
        >
          <div className="container mx-auto px-6">
            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <span className="text-primary font-display text-lg tracking-[0.5em]">
                SINCE 1998
              </span>
            </motion.div>

            {/* Main Title - Cinematic Typography */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[0.02em]"
              >
                BUILDING
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[0.02em]"
              >
                THE <span className="text-gradient">ROADS</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[0.02em]"
              >
                OF TOMORROW
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 text-lg md:text-xl text-muted-foreground max-w-xl tracking-wide"
            >
              Premier civil engineering excellence in roads, highways, and infrastructure development.
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Scroll for details
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Side Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8"
        >
          {[
            { value: "150+", label: "Projects" },
            { value: "25+", label: "Years" },
            { value: "50+", label: "Engineers" },
          ].map((stat, index) => (
            <div key={index} className="text-right">
              <div className="font-display text-3xl text-primary">{stat.value}</div>
              <div className="text-xs tracking-widest text-muted-foreground uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
