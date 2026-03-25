"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client";
import { LanguageToggle } from "./LanguageToggle";

const cpcLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312003/cpc-website/cpc_logo-removebg-preview.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation('header');

  // Navigation links with translations
  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.services'), path: "/services" },
    { name: t('nav.projects'), path: "/projects" },
    { name: t('nav.clients'), path: "/clients" },
    { name: t('nav.contact'), path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Skip to main content — accessibility + SEO best practice */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        {t('accessibility.skipToContent', { ns: 'common' })}
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <Image src={cpcLogo} alt={t('logo.alt')} width={160} height={80} className="h-14 sm:h-16 md:h-20 w-auto object-contain" priority />
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label={t('accessibility.mainNavigation', { ns: 'common' })} className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-gold"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Language Toggle + CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageToggle />
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">{t('cta.getQuote')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground"
              aria-label={isMobileMenuOpen ? t('accessibility.closeMenu', { ns: 'common' }) : t('accessibility.openMenu', { ns: 'common' })}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border"
            >
              <nav aria-label="Mobile navigation" className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-3 text-lg font-medium ${location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <LanguageToggle />
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/contact">{t('cta.getQuote')}</Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
