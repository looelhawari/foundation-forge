"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/lib/router-compat";
const projectHighway = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312036/cpc-website/project-highway.jpg";
const projectStreet = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312040/cpc-website/project-street.jpg";
const projectInfrastructure = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312037/cpc-website/project-infrastructure.jpg";
const projectInterchange = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312039/cpc-website/project-interchange.jpg";

const projects = [
  {
    id: 1,
    title: "Desert Highway",
    subtitle: "Riyadh - Jeddah",
    image: projectHighway,
    year: "2023",
  },
  {
    id: 2,
    title: "Downtown Revival",
    subtitle: "Al Olaya District",
    image: projectStreet,
    year: "2023",
  },
  {
    id: 3,
    title: "Industrial Zone",
    subtitle: "Jubail City",
    image: projectInfrastructure,
    year: "2022",
  },
  {
    id: 4,
    title: "King Fahd Interchange",
    subtitle: "Central Riyadh",
    image: projectInterchange,
    year: "2022",
  },
];

export const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      {/* Section Title */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-20 left-6 md:left-12 z-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-2"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl tracking-[0.1em]"
          >
            FEATURED WORK
          </motion.h2>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-8 px-6 md:px-12"
        >
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group relative shrink-0"
            >
              <div className="relative w-[70vw] md:w-[50vw] lg:w-[40vw] aspect-[16/10] overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-primary text-xs tracking-[0.3em] uppercase block mb-2"
                      >
                        {project.year}
                      </motion.span>
                      <h3 className="font-display text-3xl md:text-4xl tracking-[0.05em] group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{project.subtitle}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                      <svg
                        className="w-4 h-4 text-foreground group-hover:text-primary-foreground transition-colors -rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* View All CTA */}
          <Link
            to="/projects"
            className="shrink-0 w-[40vw] md:w-[30vw] aspect-[16/10] rounded-lg border border-border bg-gradient-card flex flex-col items-center justify-center group hover:border-primary/50 transition-colors"
          >
            <span className="font-display text-4xl md:text-5xl tracking-[0.1em] group-hover:text-primary transition-colors">
              VIEW ALL
            </span>
            <span className="text-muted-foreground text-sm mt-2 tracking-widest">PROJECTS</span>
          </Link>
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <span className="text-xs text-muted-foreground tracking-widest">01</span>
          <div className="w-32 h-px bg-border relative overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 bg-primary origin-left"
            />
          </div>
          <span className="text-xs text-muted-foreground tracking-widest">04</span>
        </div>
      </div>
    </section>
  );
};
