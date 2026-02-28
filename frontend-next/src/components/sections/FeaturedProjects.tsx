"use client";

import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
const projectHighway = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312036/cpc-website/project-highway.jpg";
const projectStreet = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312040/cpc-website/project-street.jpg";
const projectInfrastructure = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312037/cpc-website/project-infrastructure.jpg";

const projects = [
  {
    id: 1,
    title: "Desert Highway Expansion",
    location: "Riyadh - Jeddah Corridor",
    year: "2023",
    category: "Highways",
    image: projectHighway,
  },
  {
    id: 2,
    title: "Downtown Street Revival",
    location: "Al Olaya District",
    year: "2023",
    category: "Streets",
    image: projectStreet,
  },
  {
    id: 3,
    title: "Industrial Zone Infrastructure",
    location: "Jubail Industrial City",
    year: "2022",
    category: "Infrastructure",
    image: projectInfrastructure,
  },
];

export const FeaturedProjects = () => {
  return (
    <section className="py-32 bg-gradient-dark noise-overlay">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
        >
          <div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Our Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
              FEATURED <span className="text-gradient">PROJECTS</span>
            </h2>
          </div>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/projects" className="group">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/projects/${project.id}`} className="group block">
                <div className="relative overflow-hidden rounded-lg bg-gradient-card border border-border">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl tracking-wide text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
