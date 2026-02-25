"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
const cpcLogo = "/assets/cpc_logo-removebg-preview.png";
const earthworks = "/assets/services/earth work.jpg";
const subgrade = "/assets/services/subgrade and subbase.jpg";
const asphalt = "/assets/services/asphalt.jpeg";
const traffic = "/assets/services/road-markings-masters.jpeg";
const interlock = "/assets/services/interllock.jpeg";

const services = [
  {
    title: "Earth Works",
    subtitle: "Foundation & Groundwork",
    description: "Comprehensive earthmoving, excavation, and land preparation services for all construction needs.",
    features: ["Site Clearing", "Excavation", "Grading", "Compaction"],
    image: earthworks,
  },
  {
    title: "Sub-Grade & Sub-Base",
    subtitle: "Road Foundation",
    description: "Professional sub-grade and sub-base preparation ensuring solid foundation for all road projects.",
    features: ["Layer Preparation", "Material Testing", "Compaction Control", "Quality Assurance"],
    image: subgrade,
  },
  {
    title: "Asphalt Works",
    subtitle: "Paving & Surfacing",
    description: "Expert asphalt paving and road surfacing using latest technology and quality materials.",
    features: ["Hot Mix Asphalt", "Cold Mix Asphalt", "Surface Treatment", "Maintenance"],
    image: asphalt,
  },
  {
    title: "Traffic Signs & Road Marking",
    subtitle: "Safety & Signage",
    description: "Complete traffic management solutions including signage installation and road marking services.",
    features: ["Thermoplastic Marking", "Sign Installation", "Safety Measures", "Line Marking"],
    image: traffic,
  },
  {
    title: "Interlock & Kerbstone",
    subtitle: "Precision Paving",
    description: "Precision installation of interlocking pavers and kerbstones for aesthetic and functional excellence.",
    features: ["Paver Installation", "Kerbstone Laying", "Pattern Design", "Finishing Works"],
    image: interlock,
  },
];

/* ─── Bento Card ─── */
const BentoCard = ({
  service,
  index,
  isLarge = false,
}: {
  service: (typeof services)[0];
  index: number;
  isLarge?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${isLarge ? "min-h-[300px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[500px]" : "min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[400px]"
        }`}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
          animate={{ opacity: hovered ? 0.92 : 0.7 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Number watermark */}
      <div className="absolute top-4 right-5 z-10">
        <motion.span
          className="font-display text-[72px] md:text-[96px] leading-none font-bold text-white/[0.06] select-none"
          animate={{ opacity: hovered ? 0.12 : 0.06 }}
          transition={{ duration: 0.4 }}
        >
          {num}
        </motion.span>
      </div>

      {/* Top-left accent line */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 z-10"
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : "40%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 md:p-8 z-10">
        {/* Subtitle pill */}
        <motion.div
          className="mb-3"
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-medium bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1">
            {service.subtitle}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className={`font-bold text-white mb-2 leading-tight ${isLarge
            ? "text-2xl sm:text-3xl md:text-4xl"
            : "text-xl sm:text-2xl md:text-3xl"
            }`}
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {service.title}
        </motion.h3>

        {/* Description — slides in on hover */}
        <motion.p
          className="text-white/80 text-sm md:text-base leading-relaxed mb-4 max-w-md"
          animate={{ y: hovered ? 0 : 15, opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {service.description}
        </motion.p>

        {/* Feature tags — stagger in */}
        <motion.div
          className="flex flex-wrap gap-2"
          animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
        >
          {service.features.map((f, i) => (
            <motion.span
              key={i}
              className="text-[11px] sm:text-xs text-white/90 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: hovered ? 1 : 0,
                scale: hovered ? 1 : 0.85,
              }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.25 }}
            >
              {f}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-amber-400/0 pointer-events-none z-20"
        animate={{
          borderColor: hovered ? "rgba(251,191,36,0.5)" : "rgba(251,191,36,0)",
          boxShadow: hovered
            ? "inset 0 0 40px rgba(251,191,36,0.08), 0 0 20px rgba(251,191,36,0.1)"
            : "inset 0 0 0px rgba(251,191,36,0), 0 0 0px rgba(251,191,36,0)",
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

/* ─── Main Section ─── */
export const ServicesImageGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
      {/* Subtle moving grid */}
      <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          {/* Logo badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-amber-400/30 bg-amber-400/5 mb-6"
          >
            <img src={cpcLogo} alt="CPC Qatar - Cosmo Projects & Construction logo" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 px-4">
            What We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Do
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 sm:w-36 md:w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"
          />

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Comprehensive construction solutions — from groundwork to final finish
          </p>
        </motion.div>

        {/* ─── Bento Grid: 3 top + 2 bottom ─── */}
        {/* Row 1 — large hero card + 2 standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
          {/* Earth Works — hero card spanning 2 cols on lg */}
          <div className="lg:col-span-2">
            <BentoCard service={services[0]} index={0} isLarge />
          </div>
          {/* Sub-Grade */}
          <div className="lg:col-span-1">
            <BentoCard service={services[1]} index={1} />
          </div>
        </div>

        {/* Row 2 — 1 standard + 2 spanning */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Asphalt */}
          <div className="lg:col-span-1">
            <BentoCard service={services[2]} index={2} />
          </div>
          {/* Traffic — hero card spanning 2 cols on lg */}
          <div className="lg:col-span-2">
            <BentoCard service={services[3]} index={3} isLarge />
          </div>
        </div>

        {/* Row 3 — centered single card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5">
          <div className="md:col-start-1 md:col-span-3 lg:col-start-1 lg:col-span-3">
            <BentoCard service={services[4]} index={4} isLarge />
          </div>
        </div>
      </div>
    </section>
  );
};
