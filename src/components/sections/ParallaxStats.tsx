import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter, MorphingBlob } from "../animations/MotionGraphics";

const stats = [
  { value: 150, suffix: "+", label: "PROJECTS COMPLETED" },
  { value: 25, suffix: "+", label: "YEARS EXPERIENCE" },
  { value: 50, suffix: "+", label: "EXPERT ENGINEERS" },
  { value: 100, suffix: "%", label: "CLIENT SATISFACTION" },
];

export const ParallaxStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <section ref={containerRef} className="relative py-48 overflow-hidden bg-secondary">
      {/* Animated blobs */}
      <MorphingBlob className="w-96 h-96 top-1/4 -left-48" />
      <MorphingBlob className="w-80 h-80 bottom-1/4 -right-40" />
      
      {/* Floating geometric shapes */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rotate-45"
      />
      <motion.div
        style={{ y: y2, rotate: useTransform(scrollYProgress, [0, 1], [45, -45]) }}
        className="absolute bottom-32 left-20 w-24 h-24 bg-primary/10"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 right-1/4 w-4 h-4 bg-primary rounded-full"
      />

      <motion.div style={{ scale }} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            By The Numbers
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-7xl lg:text-8xl tracking-[0.05em]"
            >
              OUR <span className="text-gradient">IMPACT</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center group"
            >
              <div className="relative mb-4">
                {/* Glowing background */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"
                />
                
                <div className="font-display text-6xl md:text-7xl lg:text-8xl text-foreground relative">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.5 }}
                className="text-xs tracking-[0.3em] text-muted-foreground"
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator lines */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-gold origin-left"
      />
    </section>
  );
};
