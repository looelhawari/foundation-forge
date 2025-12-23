import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { CircularText, Magnetic } from "../animations/MotionGraphics";

export const MegaCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} className="relative py-48 md:py-64 bg-secondary overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating circles */}
      <motion.div
        style={{ rotate }}
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-full"
      />
      <motion.div
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-primary/10 rounded-full"
      />

      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        {/* Pre-headline */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-8"
        >
          Ready to Build?
        </motion.span>

        {/* Main headline */}
        <div className="mb-12">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-7xl lg:text-[10vw] tracking-[0.05em] leading-none"
            >
              LET'S CREATE
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display text-6xl md:text-7xl lg:text-[10vw] tracking-[0.05em] leading-none text-gradient"
            >
              SOMETHING
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-display text-6xl md:text-7xl lg:text-[10vw] tracking-[0.05em] leading-none"
            >
              EXTRAORDINARY
            </motion.h2>
          </div>
        </div>

        {/* CTA Button with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative inline-block"
        >
          <Magnetic>
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center"
            >
              {/* Circular rotating text */}
              <div className="absolute w-48 h-48">
                <CircularText
                  text="START YOUR PROJECT • START YOUR PROJECT • "
                  className="w-full h-full text-muted-foreground"
                />
              </div>

              {/* Central button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-32 h-32 rounded-full bg-gradient-gold flex items-center justify-center group-hover:shadow-gold transition-shadow"
              >
                <svg
                  className="w-8 h-8 text-primary-foreground -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </Link>
          </Magnetic>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 flex flex-wrap justify-center gap-12 text-sm text-muted-foreground"
        >
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">Email</span>
            <a href="mailto:info@alrashid.com" className="hover:text-primary transition-colors">
              info@alrashid.com
            </a>
          </div>
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">Phone</span>
            <a href="tel:+966123456789" className="hover:text-primary transition-colors">
              +966 12 345 6789
            </a>
          </div>
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">Location</span>
            <span>Riyadh, Saudi Arabia</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
