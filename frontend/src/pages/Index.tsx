import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/sections/CinematicHero";

import { ServicesImageGrid } from "@/components/sections/ServicesImageGrid";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { FullscreenVideo } from "@/components/sections/FullscreenVideo";
import { ClientLogosShowcase } from "@/components/sections/ClientLogosShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { QualityAndCertifications } from "@/components/sections/QualityAndCertifications";
import { FeaturedShowcase } from "@/components/sections/FeaturedShowcase";
import { ParallaxStats } from "@/components/sections/ParallaxStats";
import { ImmersiveTestimonials } from "@/components/sections/ImmersiveTestimonials";
import { MegaCTA } from "@/components/sections/MegaCTA";
import { ScrollProgress } from "@/components/animations/MotionGraphics";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

// ============================================
// LOADING SCREEN - Simplified for Mobile Performance
// ============================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // Faster progress on mobile
    const increment = isMobile ? 5 : 3.5;
    const interval = isMobile ? 20 : 30;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 150);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [onComplete, isMobile]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <img
            src={companyLogo}
            alt="CPC Logo"
            className="w-28 h-28 md:w-40 md:h-40 object-contain"
          />
        </motion.div>

        {/* Company Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="font-display text-2xl md:text-4xl lg:text-5xl tracking-[0.15em] text-gradient text-center mb-4"
        >
          CPC QATAR
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-sm md:text-lg text-muted-foreground text-center mb-8"
        >
          Building Qatar's Future
        </motion.p>

        {/* Simple Progress bar */}
        <div className="w-48 md:w-64">
          <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-primary mt-2 tabular-nums">
            {Math.floor(progress)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize smooth scroll
  useSmoothScroll();

  useEffect(() => {
    // Detect mobile for performance optimizations
    setIsMobile(window.innerWidth < 768);

    // Add AOS initialization if needed
    document.body.style.overflowX = 'hidden';

    // Mobile performance optimizations
    if (window.innerWidth < 768) {
      // Reduce animation complexity on mobile
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }

    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ScrollProgress />
        <Header />
        <main>
          <CinematicHero />

          <ServicesMarquee />
          <ServicesImageGrid />
          <FullscreenVideo />
          <ClientLogosShowcase />
          <WhyChooseUs />
          <ProcessTimeline />
          <QualityAndCertifications />
          <FeaturedShowcase />
          <ParallaxStats />
          <ImmersiveTestimonials />
          <MegaCTA />
        </main>

        {/* Floating Legal Documents Button */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            to="/certificates"
            className="group flex items-center gap-2 bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline-block group-hover:inline-block transition-all">
              Legal Docs
            </span>
          </Link>
        </motion.div>

        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;

