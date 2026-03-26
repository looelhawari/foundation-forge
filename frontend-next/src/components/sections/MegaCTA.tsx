"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTranslations, useLocale } from "next-intl";

/** Strip non-digit characters except leading + for tel: links */
const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const MegaCTA = () => {
  const { settings } = useSiteSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const t = useTranslations('megaCta');
  const locale = useLocale();
  const isRTL = locale === 'ar';

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
          {t('readyToConstruct')}
        </motion.span>

        {/* Main headline */}
        <h2 aria-label={t('ariaLabel')} className="mb-12">
          <span className="block overflow-hidden">
            <motion.span
              className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[10vw] tracking-[0.05em] leading-none"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('headline1')}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[10vw] tracking-[0.05em] leading-none text-gradient"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {t('headline2')}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[10vw] tracking-[0.05em] leading-none"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {t('headline3')}
            </motion.span>
          </span>
        </h2>

        {/* CTA Button with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative inline-block"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center"
            aria-label={t('buttonAriaLabel')}
          >
            {/* Static ring label */}
            <span className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-muted-foreground/20 flex items-center justify-center">
              <span className="sr-only">{t('startProject')}</span>
            </span>

            {/* Central button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-gold flex items-center justify-center group-hover:shadow-gold transition-shadow"
            >
              <svg
                className={`w-8 h-8 text-primary-foreground ${isRTL ? 'rotate-[135deg] group-hover:rotate-180' : '-rotate-45 group-hover:rotate-0'} transition-transform duration-500`}
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
            <span className="block text-xs tracking-widest uppercase mb-2">{t('email')}</span>
            <a href={`mailto:${settings.contact_email}`} className="hover:text-primary transition-colors">
              {settings.contact_email}
            </a>
          </div>
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">{t('phone')}</span>
            <a href={toTelHref(settings.contact_phone)} className="hover:text-primary transition-colors">
              {settings.contact_phone}
            </a>
          </div>
          <div>
            <span className="block text-xs tracking-widest uppercase mb-2">{t('location')}</span>
            <span>{settings.public_location}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
