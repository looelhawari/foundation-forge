import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectHighway from "@/assets/project-highway.jpg";
import projectStreet from "@/assets/project-street.jpg";
import projectInfrastructure from "@/assets/project-infrastructure.jpg";
import projectInterchange from "@/assets/project-interchange.jpg";

const categories = ["All", "Highways", "Streets", "Infrastructure"];

const projects = [
  {
    id: 1,
    title: "Desert Highway Expansion",
    location: "Riyadh - Jeddah Corridor",
    year: "2023",
    category: "Highways",
    image: projectHighway,
    description: "Major 120km highway expansion connecting two major cities.",
  },
  {
    id: 2,
    title: "Downtown Street Revival",
    location: "Al Olaya District",
    year: "2023",
    category: "Streets",
    image: projectStreet,
    description: "Complete urban street renovation in the heart of Riyadh.",
  },
  {
    id: 3,
    title: "Industrial Zone Infrastructure",
    location: "Jubail Industrial City",
    year: "2022",
    category: "Infrastructure",
    image: projectInfrastructure,
    description: "Comprehensive infrastructure development for industrial zone.",
  },
  {
    id: 4,
    title: "King Fahd Interchange",
    location: "Central Riyadh",
    year: "2022",
    category: "Infrastructure",
    image: projectInterchange,
    description: "Complex multi-level highway interchange construction.",
  },
  {
    id: 5,
    title: "Coastal Highway Project",
    location: "Red Sea Coast",
    year: "2021",
    category: "Highways",
    image: projectHighway,
    description: "Scenic coastal highway with modern engineering solutions.",
  },
  {
    id: 6,
    title: "Business District Roads",
    location: "King Abdullah Financial District",
    year: "2021",
    category: "Streets",
    image: projectStreet,
    description: "Premium road network for the financial district.",
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Portfolio
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                OUR <span className="text-gradient">PROJECTS</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Explore our portfolio of completed infrastructure projects spanning 
                highways, urban streets, and complex engineering systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter & Projects */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-gold text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground border border-border hover:border-primary/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                >
                  <Link to={`/projects/${project.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-lg bg-gradient-card border border-border hover:border-primary/50 transition-colors">
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl tracking-wide text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
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
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
