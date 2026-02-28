"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/lib/router-compat";
const projectHighway = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312036/cpc-website/project-highway.jpg";
const projectStreet = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312040/cpc-website/project-street.jpg";
const projectInfrastructure = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312037/cpc-website/project-infrastructure.jpg";

const projects = [
  {
    id: 1,
    title: "DESERT HIGHWAY",
    category: "HIGHWAYS",
    image: projectHighway,
    location: "RIYADH - JEDDAH",
    year: "2023",
  },
  {
    id: 2,
    title: "URBAN REVIVAL",
    category: "STREETS",
    image: projectStreet,
    location: "AL OLAYA DISTRICT",
    year: "2023",
  },
  {
    id: 3,
    title: "INDUSTRIAL ZONE",
    category: "INFRASTRUCTURE",
    image: projectInfrastructure,
    location: "JUBAIL CITY",
    year: "2022",
  },
];

export const CinematicProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-background">
      {/* Section Header */}
      <div className="container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24"
        >
          <div>
            <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
              Featured Work
            </span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
              >
                SELECTED <span className="text-gradient">PROJECTS</span>
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/projects"
              className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-sm tracking-widest uppercase">View All Projects</span>
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                <motion.svg
                  className="w-4 h-4 group-hover:text-primary-foreground transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  index 
}: { 
  project: typeof projects[0]; 
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, index % 2 === 0 ? -2 : 2]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}
    >
      {/* Image */}
      <Link 
        to={`/projects/${project.id}`} 
        className={`group relative overflow-hidden rounded-lg ${isEven ? "" : "lg:col-start-2"}`}
      >
        <motion.div
          style={{ rotate }}
          className="aspect-[4/3] overflow-hidden"
        >
          <motion.img
            style={{ scale: imageScale }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/20 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="w-24 h-24 rounded-full bg-primary flex items-center justify-center"
          >
            <span className="font-display text-primary-foreground tracking-widest text-sm">VIEW</span>
          </motion.div>
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-6 left-6">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.3em] text-primary bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            {project.category}
          </motion.span>
        </div>
      </Link>

      {/* Content */}
      <motion.div style={{ y }} className={isEven ? "" : "lg:col-start-1"}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-8xl md:text-9xl text-foreground/5 block mb-4"
        >
          0{index + 1}
        </motion.span>
        
        <Link to={`/projects/${project.id}`} className="group">
          <div className="overflow-hidden mb-4">
            <motion.h3
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.05em] group-hover:text-primary transition-colors"
            >
              {project.title}
            </motion.h3>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-8 text-sm text-muted-foreground"
        >
          <span className="tracking-widest">{project.location}</span>
          <span className="w-12 h-px bg-border" />
          <span className="tracking-widest">{project.year}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
