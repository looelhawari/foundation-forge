import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-construction.jpg";

export const FullscreenVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale, borderRadius }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Construction site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>

        <motion.div
          style={{ opacity, y: textY }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-8"
          >
            Engineering Excellence
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-[10vw] tracking-[0.1em] leading-none"
            >
              WHERE
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-[10vw] tracking-[0.1em] leading-none text-gradient"
            >
              VISION
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-[10vw] tracking-[0.1em] leading-none"
            >
              MEETS ROAD
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
