"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Image from "next/image";
const cpcLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312003/cpc-website/cpc_logo-removebg-preview.png";

export const Header = () => {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.services'), path: "/services" },
    { name: t('nav.projects'), path: "/projects" },
    { name: t('nav.clients'), path: "/clients" },
    { name: t('nav.contact'), path: "/contact" },
  ];

  // Get current path without locale prefix for comparison
  const currentPath = pathname.replace(`/${locale}`, '') || '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Skip to main content — accessibility + SEO best practice */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        {t('skipToContent')}
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
            <Link href="/" className="flex items-center gap-3 group">
              <Image src={cpcLogo} alt="CPC Qatar - Cosmo Projects & Construction logo" width={160} height={80} className="h-14 sm:h-16 md:h-20 w-auto object-contain" priority />
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${currentPath === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.name}
                  {currentPath === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-gold"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Language Switcher + CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="hero" size="lg" asChild>
                <Link href="/contact">{tCommon('getQuote')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground"
                aria-label={isMobileMenuOpen ? t('closeMenu') : t('menu')}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
                    initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.path}
                      className={`block py-3 text-lg font-medium ${currentPath === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Button variant="hero" size="lg" className="w-full mt-4" asChild>
                    <Link href="/contact">{tCommon('getQuote')}</Link>
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
