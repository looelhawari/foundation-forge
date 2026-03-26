"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
const heroImage = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312015/cpc-website/hero-construction.jpg";

export const FullscreenVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations('fullscreenVideo');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.1 : 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? -30 : -100]);

  return (
    <section ref={containerRef} className={`relative ${isMobile ? 'h-[120vh]' : 'h-[150vh]'}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale, willChange: 'transform' }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="CPC Qatar road construction and infrastructure project site in Doha, Qatar"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="lazy"
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
            {t('tagline')}
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-[10vw] tracking-[0.1em] leading-none" aria-label="Where Vision Meets Road — CPC Qatar Engineering Excellence">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%", display: "block" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {t('line1')}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%", display: "block" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="block text-gradient"
              >
                {t('line2')}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%", display: "block" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="block"
              >
                {t('line3')}
              </motion.span>
            </div>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};
