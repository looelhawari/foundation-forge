import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectHighway from "@/assets/project-highway.jpg";
import projectStreet from "@/assets/project-street.jpg";
import projectInfrastructure from "@/assets/project-infrastructure.jpg";
import projectInterchange from "@/assets/project-interchange.jpg";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

const categories = ["All", "Highways", "Streets", "Infrastructure"];

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
      {/* Construction grid animation */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="relative mb-8"
        >
          <motion.div
            className="absolute inset-0 blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
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
          PROJECTS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm tracking-wider mb-8"
        >
          57+ Completed Projects
        </motion.p>

        <div className="w-64">
          <div className="h-1 bg-muted-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <motion.div className="mt-2 text-center text-sm text-primary font-medium">
            {Math.floor(progress)}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

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
  const [isLoading, setIsLoading] = useState(true);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
                    className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === category
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
      </motion.div>
    </div>
  );
};

export default Projects;