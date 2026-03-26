"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/router-compat";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/** Strip non-digit characters except leading + for tel: links */
const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const ContactCTA = () => {
  const t = useTranslations();
  const { settings } = useSiteSettings();

  return (
    <section className="py-32 bg-gradient-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              {t('projects.contactCTA.tagline')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
              {t('projects.contactCTA.heading')} <span className="text-gradient">{t('projects.contactCTA.headingHighlight')}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              {t('projects.contactCTA.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                {t('projects.contactCTA.quoteButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href={toTelHref(settings.contact_phone)}>
                <Phone className="w-5 h-5" />
                {t('projects.contactCTA.callButton')}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 text-muted-foreground"
          >
            <a
              href={toTelHref(settings.contact_phone)}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{settings.contact_phone}</span>
            </a>
            <a
              href={`mailto:${settings.contact_email}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{settings.contact_email}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
