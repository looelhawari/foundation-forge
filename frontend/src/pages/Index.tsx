import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";
import { PageLoader } from "@/components/layout/PageLoader";
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

    // Page is ready when DOM content is loaded
    // This happens almost instantly for static content
    const handleLoad = () => setIsLoading(false);

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      document.body.style.overflowX = 'auto';
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader title="CPC QATAR" subtitle="Building Qatar's Future" />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ScrollProgress />
        <Header />
        <FloatingContactButtons />
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

