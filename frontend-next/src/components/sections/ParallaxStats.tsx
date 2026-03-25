"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import { AnimatedCounter } from "../animations/MotionGraphics";
import { stats } from "@/data/projects";
import { useTranslation } from "@/lib/i18n/client";

export const ParallaxStats = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // mobile-first SSR default
  const { t } = useTranslation('home');

  // Get labels from translations and combine with stat values
  const statLabels = t('parallaxStats.stats', { returnObjects: true }) as Array<{ label: string; value?: number; suffix?: string }>;
  const statsData = [
    { value: stats.projectsCompleted, suffix: "+", label: statLabels[0]?.label || "PROJECTS COMPLETED" },
    { value: stats.yearsExperience, suffix: "+", label: statLabels[1]?.label || "YEARS EXPERIENCE" },
    { value: stats.satisfiedClients, suffix: "+", label: statLabels[2]?.label || "TRUSTED CLIENTS" },
    { value: statLabels[3]?.value || 100, suffix: statLabels[3]?.suffix || "%", label: statLabels[3]?.label || "CLIENT SATISFACTION" },
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Only use parallax on desktop and when not reduced motion
  const enableParallax = !isMobile && !shouldReduceMotion;
  const y1 = useTransform(scrollYProgress, [0, 1], enableParallax ? [50, -50] : [0, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], enableParallax ? [30, -30] : [0, 0]);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-32 lg:py-48 overflow-hidden bg-secondary">
      {/* Floating geometric shapes - simplified */}
      {enableParallax && (
        <>
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rotate-45 will-change-transform"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-32 left-20 w-24 h-24 bg-primary/10 will-change-transform"
          />
        </>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            {t('parallaxStats.tag')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.05em] px-4">
            {t('parallaxStats.title.prefix')} <span className="text-gradient">{t('parallaxStats.title.highlight')}</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative mb-4">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground relative">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
              </div>

              <div className="text-xs tracking-[0.3em] text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator lines */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-gold origin-left will-change-transform"
      />
    </section>
  );
});

ParallaxStats.displayName = 'ParallaxStats';
