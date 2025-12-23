import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { ServicesBreakdown } from "@/components/sections/ServicesBreakdown";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { FullscreenVideo } from "@/components/sections/FullscreenVideo";
import { ClientLogosShowcase } from "@/components/sections/ClientLogosShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { QualityAndCertifications } from "@/components/sections/QualityAndCertifications";
import { FeaturedShowcase } from "@/components/sections/FeaturedShowcase";
import { EquipmentShowcase } from "@/components/sections/EquipmentShowcase";
import { ParallaxStats } from "@/components/sections/ParallaxStats";
import { ImmersiveTestimonials } from "@/components/sections/ImmersiveTestimonials";
import { MegaCTA } from "@/components/sections/MegaCTA";
import { ScrollProgress } from "@/components/animations/MotionGraphics";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

// ============================================
// LOADING SCREEN - Typing Effect Animation
// ============================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [displayedName, setDisplayedName] = useState("");
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const companyName = "COSMO PROJECTS & CONSTRUCTION";
  const tagline = "Building Qatar's Future, One Road at a Time";

  useEffect(() => {
    // Progress counter
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 3.5;
      });
    }, 30);

    // Type company name and tagline simultaneously
    let nameIndex = 0;
    let taglineIndex = 0;

    const nameTimer = setInterval(() => {
      if (nameIndex <= companyName.length) {
        setDisplayedName(companyName.slice(0, nameIndex));
        nameIndex++;
      } else {
        clearInterval(nameTimer);
      }
    }, 35);

    const taglineTimer = setInterval(() => {
      if (taglineIndex <= tagline.length) {
        setDisplayedTagline(tagline.slice(0, taglineIndex));
        taglineIndex++;
      } else {
        clearInterval(taglineTimer);
        setShowCursor(false);
      }
    }, 55);

    // Cursor blink
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(nameTimer);
      clearInterval(taglineTimer);
      clearInterval(cursorTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      exit={{
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)"
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--primary-rgb), 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(var(--primary-rgb), 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, -300],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6">
        {/* Logo with entrance animation */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.1,
          }}
        >
          {/* Logo glow effect */}
          <motion.div
            className="absolute inset-0 blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src={companyLogo}
              alt="CPC Logo"
              className="w-40 h-40 object-contain"
            />
          </motion.div>

          {/* Main logo */}
          <motion.img
            src={companyLogo}
            alt="CPC Logo"
            className="w-40 h-40 object-contain relative z-10"
            animate={{
              filter: [
                "drop-shadow(0 0 30px rgba(var(--primary-rgb), 0.6))",
                "drop-shadow(0 0 50px rgba(var(--primary-rgb), 1))",
                "drop-shadow(0 0 30px rgba(var(--primary-rgb), 0.6))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Orbiting ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            style={{ width: 180, height: 180, left: -20, top: -20 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-primary"
              style={{ top: -6, left: "50%", marginLeft: -6 }}
              animate={{
                boxShadow: [
                  "0 0 10px rgba(var(--primary-rgb), 0.5)",
                  "0 0 30px rgba(var(--primary-rgb), 1)",
                  "0 0 10px rgba(var(--primary-rgb), 0.5)",
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Company Name - Typing Effect */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] text-gradient">
            {displayedName}
            {displayedName.length < companyName.length && showCursor && (
              <motion.span
                className="inline-block w-1 h-12 md:h-16 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </h1>
        </motion.div>

        {/* Tagline - Typing Effect */}
        <motion.div
          className="mb-12 text-center min-h-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            {displayedTagline}
            {displayedTagline.length < tagline.length && showCursor && (
              <motion.span
                className="inline-block w-0.5 h-6 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>

        {/* Progress bar with percentage */}
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-2">
            <motion.span
              className="text-xs tracking-[0.3em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              LOADING
            </motion.span>
            <motion.span
              className="text-sm font-medium text-primary tabular-nums"
              key={Math.floor(progress)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>

          <div className="relative h-1 bg-muted-foreground/10 rounded-full overflow-hidden">
            {/* Background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Loading dots animation */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/60"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animated corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16">
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
      </div>
      <div className="absolute top-8 right-8 w-16 h-16">
        <motion.div
          className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </div>
      <div className="absolute bottom-8 left-8 w-16 h-16">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-primary to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16">
        <motion.div
          className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-primary to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scroll
  useSmoothScroll();

  useEffect(() => {
    // Add AOS initialization if needed
    document.body.style.overflowX = 'hidden';
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
        <MinimalHeader />
        <main>
          <CinematicHero />
          <CompanyIntro />
          <ServicesMarquee />
          <ServicesBreakdown />
          <FullscreenVideo />
          <ClientLogosShowcase />
          <WhyChooseUs />
          <ProcessTimeline />
          <QualityAndCertifications />
          <FeaturedShowcase />
          <EquipmentShowcase />
          <ParallaxStats />
          <ImmersiveTestimonials />
          <MegaCTA />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
