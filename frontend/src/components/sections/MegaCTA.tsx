import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const MegaCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 md:py-48 lg:py-64 bg-secondary overflow-hidden">
      {/* Grid background */}
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
          Ready to Construct?
        </motion.span>

        {/* Main headline */}
        <div className="mb-12">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[10vw] tracking-[0.05em] leading-none"
            >
              {t("megaCta.line1", "LET'S CREATE")}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[10vw] tracking-[0.05em] leading-none text-gradient"
            >
              {t("megaCta.line2", "SOMETHING")}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[10vw] tracking-[0.05em] leading-none"
            >
              {t("megaCta.line3", "EXTRAORDINARY")}
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
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center"
          >
            {/* Static ring label */}
            <span className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-muted-foreground/20 flex items-center justify-center">
              <span className="sr-only">Start your project</span>
            </span>

            {/* Central button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-gold flex items-center justify-center group-hover:shadow-gold transition-shadow"
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
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 sm:mt-20 md:mt-24 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 text-sm text-muted-foreground"
        >
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">{t("megaCta.email", "Email")}</span>
            <a href="mailto:Info@ctgroups.net" className="hover:text-primary transition-colors">
              Info@ctgroups.net
            </a>
          </div>
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">{t("megaCta.phone", "Phone")}</span>
            <a href="tel:+97444322743" className="hover:text-primary transition-colors">
              +974 4432-2743
            </a>
          </div>
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">{t("megaCta.location", "Location")}</span>
            <span>Doha, Qatar</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
