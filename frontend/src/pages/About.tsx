import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MegaCTA } from "@/components/sections/MegaCTA";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { AnimatedCounter, ImageReveal } from "@/components/animations/MotionGraphics";
import { Award, Users, Building, Target, Shield, Lightbulb, Star } from "lucide-react";
import engineerImage from "@/assets/engineer-portrait.jpg";
import heroImage from "@/assets/hero-construction.jpg";

// Import client logos
import moelogo from "@/assets/MOE-removebg-preview.png";
import fifaLogo from "@/assets/FIFA-removebg-preview.png";
import museumLogo from "@/assets/museum-removebg-preview.png";
import waqifLogo from "@/assets/waqif-removebg-preview.png";
import dhlLogo from "@/assets/DHL-removebg-preview.png";
import meeraLogo from "@/assets/meera-removebg-preview.png";
import arianeLogo from "@/assets/Ariane real state.png";
import ashghaalLogo from "@/assets/ashghaal.png";
import fbaLogo from "@/assets/FBA real estate.png";
import imalcoLogo from "@/assets/imalco.png";
import qnieLogo from "@/assets/qnie.png";

const majorClients = [
  { name: "Ministry of Education", logo: moelogo },
  { name: "Qatar Museums", logo: museumLogo },
  { name: "FIFA World Cup", logo: fifaLogo },
  { name: "Ministry of Waqif", logo: waqifLogo },
  { name: "DHL Qatar", logo: dhlLogo },
  { name: "Al Meera", logo: meeraLogo },
];

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

const About = () => {
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
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
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
                  CONSTRUCTING
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
          <motion.div style={{ y: imageY }} className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <ImageReveal src={engineerImage} alt="Chairman Mohammed Ahmed Mubarak Al-Nasr" className="w-full h-full" />
            </div>

            {/* Floating badges for both founders */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              className="absolute -bottom-8 -left-8 bg-gradient-card border border-primary/50 rounded-lg p-6 shadow-card cursor-pointer"
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
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
          />
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
              {majorClients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/90 rounded-lg p-4 flex flex-col items-center justify-center border border-border hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-12 sm:h-16 w-auto object-contain mb-2"
                  />
                  <div className="text-xs text-gray-600 font-medium text-center">{client.name}</div>
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
      {/* Decorative floating accents */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-24 h-24 border border-primary/15 rotate-45 hidden md:block will-change-transform"
      />
      <motion.div
        style={{ y }}
        className="absolute bottom-32 left-10 w-16 h-16 bg-primary/5 hidden md:block will-change-transform"
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
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
          />
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
              <motion.div
                className="bg-gradient-card border border-border rounded-xl p-6 sm:p-8 h-full group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl tracking-[0.1em] mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
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
                  <div className="w-full md:w-5/12 ml-16 md:ml-0">
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden group hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/10 transition-all duration-300 hover:-translate-y-1">
                      {/* Year badge */}
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black font-bold text-lg sm:text-xl md:text-2xl mb-3 md:mb-4">
                        {milestone.year}
                      </div>

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
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex md:w-2/12 justify-center">
                    <motion.div
                      className="relative w-16 h-16 md:w-20 md:h-20"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-400/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white shadow-md shadow-white/50" />
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

      <motion.div style={{ scale }} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-4">
            By The Numbers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.05em] mb-4">
            OUR <span className="text-gradient">IMPACT</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="h-1 w-32 sm:w-48 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
          />
        </motion.div>

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
              className="text-center group relative hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div className="font-display text-5xl md:text-6xl text-foreground mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

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