import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MegaCTA } from "@/components/sections/MegaCTA";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { ScrollProgress, AnimatedCounter, MorphingBlob, ImageReveal, TiltCard } from "@/components/animations/MotionGraphics";
import { Award, Users, Building, Target, Shield, Lightbulb, Star } from "lucide-react";
import engineerImage from "@/assets/engineer-portrait.jpg";
import heroImage from "@/assets/hero-construction.jpg";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

const values = [
  {
    icon: Target,
    title: "PRECISION",
    description: "Every project is executed with meticulous attention to detail and engineering accuracy.",
  },
  {
    icon: Shield,
    title: "QUALITY",
    description: "We never compromise on materials or workmanship, ensuring lasting infrastructure.",
  },
  {
    icon: Lightbulb,
    title: "INNOVATION",
    description: "Embracing modern technologies and methods to deliver superior results.",
  },
];

const milestones = [
  { year: "2017", title: "Company Founded", description: "CPC Qatar established under Chairman Mohammed Ahmed Mubarak Al-Nasr" },
  { year: "2019", title: "Educational Excellence", description: "Major contracts with Ministry of Education for school infrastructure" },
  { year: "2021", title: "Cultural Heritage", description: "Qatar Museums projects - preserving cultural landmarks" },
  { year: "2022", title: "FIFA World Cup", description: "Delivered parking infrastructure for FIFA World Cup Qatar 2022" },
  { year: "2024", title: "57 Projects Strong", description: "Achieved 57 completed projects with 26M+ QR total value" },
];

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 3.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-primary"
            style={{
              top: `${(i + 1) * 5}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="relative mb-8"
        >
          <motion.div
            className="absolute inset-0 blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img src={companyLogo} alt="Logo" className="w-32 h-32" />
          </motion.div>
          <img src={companyLogo} alt="CPC Logo" className="w-32 h-32 relative z-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-5xl tracking-[0.3em] text-gradient mb-4"
        >
          OUR STORY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm tracking-wider mb-8"
        >
          Since 2017
        </motion.p>

        <div className="w-64">
          <div className="h-1 bg-muted-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.div
            className="mt-2 text-center text-sm text-primary font-medium"
            key={Math.floor(progress)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {Math.floor(progress)}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const textY = useTransform(heroScroll, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollProgress />
        <Header />
        <main>
          {/* Company Intro Section */}
          <CompanyIntro />
          
          {/* Cinematic Hero */}
          <section ref={heroRef} className="relative h-[150vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
              <motion.div style={{ scale: heroScale }} className="absolute inset-0">
                <img
                  src={heroImage}
                  alt="Construction site"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, -200],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 3,
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                style={{ opacity: heroOpacity, y: textY }}
                className="relative z-10 h-full flex flex-col justify-center container mx-auto px-6"
              >
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-8"
                >
                  Our Story
                </motion.span>

                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[0.02em]"
                  >
                    BUILDING
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[0.02em] text-gradient"
                  >
                    LEGACY
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[0.02em]"
                  >
                    SINCE 2017
                  </motion.h1>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Story Section with Parallax */}
          <StorySection />

          {/* What is CPC Section */}
          <WhatIsCPCSection />

          {/* Values Section */}
          <ValuesSection values={values} />

          {/* Timeline Section */}
          <TimelineSection milestones={milestones} />

          {/* Stats Section */}
          <StatsSection />

          <MegaCTA />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
};

const StorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={ref} className="relative py-16 sm:py-24 md:py-32 lg:py-48 overflow-hidden">
      <MorphingBlob className="w-[500px] h-[500px] -top-48 -right-48" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Text */}
          <motion.div style={{ y: textY }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-8"
            >
              The Beginning
            </motion.span>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
              >
                SMALL BUT
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8 md:mb-12">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] text-gradient"
              >
                MIGHTY
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 md:space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed"
            >
              <p className="text-lg sm:text-xl font-medium text-foreground">
                <span className="text-gradient">CPC Qatar</span> (Cosmo Projects & Construction and Trading Co.) is a premier construction company specializing in civil engineering, road construction, and infrastructure development across the State of Qatar.
              </p>
              <p>
                Founded in 2017 by <span className="text-primary font-medium">Chairman Mohammed Ahmed Mubarak Al-Nasr</span> and <span className="text-primary font-medium">Founder Hisham Abdelfattah Radwan Mohamed</span>, our company was established with a clear vision: to deliver world-class infrastructure projects that serve Qatar's rapidly growing educational, cultural, and commercial sectors.
              </p>
              <p>
                With <span className="text-primary font-semibold">Commercial Registration No. 108122</span>, CPC Qatar operates from our headquarters at Mirqab Mall, Doha, bringing together a team of highly qualified engineers and construction specialists who share our commitment to excellence.
              </p>
              <p>
                Today, we stand proud with <span className="text-gradient font-bold">57 completed projects</span> valued at over <span className="text-gradient font-bold">26 Million QR</span>, serving prestigious clients including the Ministry of Education, Qatar Museums, FIFA World Cup Qatar 2022, DHL, Al Meera, and many more. Our expertise spans educational facilities, cultural heritage sites, parking infrastructure, roads and streets, earthworks, and asphalt paving.
              </p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div style={{ y: imageY, rotate }} className="relative">
            <motion.div
              className="aspect-[4/5] rounded-lg overflow-hidden"
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: -5,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <ImageReveal src={engineerImage} alt="Chairman Mohammed Ahmed Mubarak Al-Nasr" className="w-full h-full" />
              {/* Hover overlay effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* Floating badges for both founders */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              className="absolute -bottom-8 -left-8 bg-gradient-card border border-primary/50 rounded-lg p-6 shadow-card cursor-pointer backdrop-blur-sm"
            >
              <div className="font-display text-2xl text-primary mb-1">M.A.M Al-Nasr</div>
              <div className="text-xs text-muted-foreground mb-3">Chairman & Co-Founder</div>
              <div className="h-px bg-border my-2"></div>
              <div className="font-display text-2xl text-primary mb-1">H.A.R Mohamed</div>
              <div className="text-xs text-muted-foreground">Co-Founder</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhatIsCPCSection = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 lg:py-48 bg-gradient-to-b from-background via-secondary to-background overflow-hidden">
      <MorphingBlob className="w-[600px] h-[600px] top-1/2 -left-48 -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            Company Overview
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.05em]"
            >
              WHAT IS <span className="text-gradient">CPC?</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-card border border-primary/20 rounded-2xl p-6 sm:p-8 md:p-12"
          >
            <h3 className="font-display text-2xl sm:text-3xl mb-4 md:mb-6 text-gradient">Complete Construction Solutions</h3>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              <span className="text-primary font-bold">Cosmo Projects & Construction and Trading Co. (CPC Qatar)</span> is a leading construction company registered under <span className="text-primary">CR No. 108122</span>, dedicated to delivering exceptional civil engineering and infrastructure projects throughout the State of Qatar.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Headquartered at <span className="text-foreground">Mirqab Mall, Area No. 39, Street No. 840, Building No. 53, Block D - Office No. 307-308, Doha, Qatar</span>, we serve as a trusted partner for government ministries, cultural institutions, private enterprises, and international organizations.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Earthworks", desc: "Site preparation, excavation, grading, and compaction for solid foundations" },
              { title: "Road Construction", desc: "Sub-grade, sub-base preparation, and complete asphalt paving solutions" },
              { title: "Asphalt Works", desc: "Hot mix asphalt, cold mix, surface treatment, and maintenance" },
              { title: "Traffic Solutions", desc: "Thermoplastic road marking, traffic signs, and safety installations" },
              { title: "Interlock & Kerbstone", desc: "Precision paver installation, kerbstone laying, and pattern design" },
              { title: "Steel Works", desc: "Rebar installation, steel fabrication, and structural reinforcement" },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-gold"></div>
                </div>
                <h4 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-primary/30 rounded-xl p-4 sm:p-6 text-center">
              <div className="font-display text-3xl sm:text-4xl text-gradient mb-2">57</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Projects Completed</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-primary/30 rounded-xl p-4 sm:p-6 text-center">
              <div className="font-display text-3xl sm:text-4xl text-gradient mb-2">26M+ QR</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Total Project Value</div>
            </div>
            <div className="bg-gradient-to-br from-amber-400/10 to-orange-600/10 border border-primary/30 rounded-xl p-4 sm:p-6 text-center">
              <div className="font-display text-3xl sm:text-4xl text-gradient mb-2">45+</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Satisfied Clients</div>
            </div>
          </motion.div>

          {/* Major Clients */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-card border border-border rounded-2xl p-6 sm:p-8 md:p-12"
          >
            <h3 className="font-display text-xl sm:text-2xl mb-6 sm:mb-8 text-center">Trusted by Leading Organizations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {["Ministry of Education", "Qatar Museums", "FIFA World Cup", "Ministry of Waqif", "DHL Qatar", "Al Meera"].map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-background/50 rounded-lg p-4 text-center border border-border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="text-xs text-muted-foreground font-medium">{client}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ValuesSection = ({ values }: { values: typeof import("lucide-react") extends { Target: infer T } ? { icon: T; title: string; description: string }[] : never }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative py-16 sm:py-24 md:py-32 lg:py-48 bg-secondary overflow-hidden">
      <MorphingBlob className="w-[400px] h-[400px] bottom-0 -left-48" />

      {/* Floating geometric shapes */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rotate-45 hidden md:block"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            What Drives Us
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.05em]"
            >
              OUR <span className="text-gradient">VALUES</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="h-full">
                <motion.div
                  className="bg-gradient-card border border-border rounded-xl p-6 sm:p-8 h-full group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />

                  {/* Particle effect on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -50, -100],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.div
                    whileHover={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-primary/20 relative z-10"
                  >
                    <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />

                    {/* Rotating ring on hover */}
                    <motion.div
                      className="absolute inset-0 border-2 border-primary/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  <h3 className="font-display text-xl sm:text-2xl tracking-[0.1em] mb-3 sm:mb-4 group-hover:text-primary transition-colors relative z-10">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed relative z-10">{value.description}</p>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineSection = ({ milestones }: { milestones: { year: string; title: string; description: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated circuit board pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-about" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <motion.path
                d="M10 50 L30 50 L30 30 L50 30 L50 70 L70 70 L70 50 L90 50"
                stroke="#fbbf24"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <circle cx="30" cy="50" r="3" fill="#f97316" />
              <circle cx="50" cy="70" r="3" fill="#ea580c" />
              <circle cx="70" cy="50" r="3" fill="#fbbf24" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-about)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            Our Journey
          </span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 px-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            KEY <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">MILESTONES</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
          >
            From our founding in 2017 to becoming a trusted name in Qatar's construction industry
          </motion.p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline steps */}
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 80
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative mb-16 md:mb-24 last:mb-0"
              >
                <div className={`flex items-center gap-4 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content card */}
                  <motion.div
                    className="w-full md:w-5/12 ml-16 md:ml-0"
                    whileHover={{ scale: 1.05, x: isEven ? 10 : -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden group">
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10"
                        transition={{ duration: 0.3 }}
                      />

                      {/* Year badge with pulse animation */}
                      <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black font-bold text-lg sm:text-xl md:text-2xl mb-3 md:mb-4"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(251, 191, 36, 0.7)",
                            "0 0 0 20px rgba(251, 191, 36, 0)",
                            "0 0 0 0 rgba(251, 191, 36, 0)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      >
                        {milestone.year}
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                        {milestone.title}
                      </h3>

                      {/* Divider */}
                      <motion.div
                        className="h-px bg-gradient-to-r from-amber-400 to-transparent mb-4"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                        viewport={{ once: true }}
                      />

                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center node with animated circle */}
                  <div className="hidden md:flex md:w-2/12 justify-center">
                    <motion.div
                      className="relative w-16 h-16 md:w-20 md:h-20"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                    >
                      {/* Outer rotating ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />

                      {/* Inner pulsing circle */}
                      <motion.div
                        className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />

                      {/* Center dot */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-4 h-4 rounded-full bg-white"
                          animate={{
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const stats = [
    { icon: Building, value: 57, suffix: "", label: "PROJECTS COMPLETED" },
    { icon: Users, value: 45, suffix: "+", label: "SATISFIED CLIENTS" },
    { icon: Award, value: 26, suffix: "M+", label: "TOTAL VALUE (QR)" },
    { icon: Star, value: 100, suffix: "%", label: "CLIENT SATISFACTION" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-secondary overflow-hidden">
      <MorphingBlob className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div style={{ scale }} className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center group relative"
            >
              {/* Glowing background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotateY: 360,
                  rotateX: 10,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors relative"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <stat.icon className="w-8 h-8 text-primary relative z-10" />

                {/* Orbital ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-primary/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <motion.div
                className="font-display text-5xl md:text-6xl text-foreground mb-2 relative"
                whileHover={{
                  scale: 1.15,
                  textShadow: "0 0 20px rgba(251,191,36,0.5)",
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                {/* Sparkle effect on hover */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${25 + i * 20}%`,
                      top: `${i % 2 === 0 ? 0 : 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                ))}
              </motion.div>

              <div className="text-xs tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;