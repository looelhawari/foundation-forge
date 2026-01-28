import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";
import { projects, projectCategories } from "@/data/projects";

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
          PROJECTS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm tracking-wider mb-8"
        >
          Excellence in Every Build
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

// Category data with icons and descriptions
const categoryData: Record<string, { icon: string; description: string }> = {
  Educational: { icon: "🎓", description: "Schools & Educational Facilities" },
  Religious: { icon: "🕌", description: "Mosques & Religious Buildings" },
  "Commercial & Retail": { icon: "🏪", description: "Shopping Centers & Retail Spaces" },
  Residential: { icon: "🏘️", description: "Housing & Residential Compounds" },
  Industrial: { icon: "🏭", description: "Factories & Industrial Facilities" },
  "Logistics & Warehouse": { icon: "📦", description: "Warehouses & Storage Facilities" },
  "Public Infrastructure": { icon: "🏗️", description: "Roads, Parking & Public Works" },
  "Historical & Cultural": { icon: "🏛️", description: "Heritage & Cultural Sites" },
};

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get projects count per category
  const getCategoryCount = (category: string) => {
    return projects.filter((p) => p.category === category).length;
  };

  // Filter out "Mixed" category and use only the 8 main categories
  const mainCategories = projectCategories.filter((cat) => cat !== "Mixed");

  // Get filtered projects if category is selected
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : [];

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
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              // Categories Grid View
              <motion.div
                key="categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Hero Section */}
                <section className="pt-32 pb-16">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="max-w-4xl mx-auto text-center"
                    >
                      <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                        OUR <span className="text-gradient">PROJECTS</span>
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        Choose a category to explore our portfolio of excellence
                      </p>
                    </motion.div>
                  </div>
                </section>

                {/* Stats */}
                <section className="pb-16">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                    >
                      <div className="bg-gradient-card border border-border rounded-lg p-6 text-center">
                        <div className="font-display text-4xl text-gradient mb-2">{projects.length}+</div>
                        <div className="text-sm text-muted-foreground">Total Projects</div>
                      </div>
                      <div className="bg-gradient-card border border-border rounded-lg p-6 text-center">
                        <div className="font-display text-4xl text-gradient mb-2">8</div>
                        <div className="text-sm text-muted-foreground">Categories</div>
                      </div>
                      <div className="bg-gradient-card border border-border rounded-lg p-6 text-center">
                        <div className="font-display text-4xl text-gradient mb-2">100%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="bg-gradient-card border border-border rounded-lg p-6 text-center">
                        <div className="font-display text-4xl text-gradient mb-2">15+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Category Cards Grid - 4 columns, 2 rows */}
                <section className="pb-24">
                  <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                      {mainCategories.filter(cat => categoryData[cat]).map((category, index) => (
                        <motion.button
                          key={category}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onClick={() => setSelectedCategory(category)}
                          className="group bg-gradient-card border border-border rounded-lg p-8 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-left"
                        >
                          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {categoryData[category].icon}
                          </div>
                          <h3 className="font-display text-xl tracking-wide mb-2 group-hover:text-primary transition-colors">
                            {category}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {categoryData[category].description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-primary font-medium">
                              {getCategoryCount(category)} Project{getCategoryCount(category) !== 1 ? "s" : ""}
                            </span>
                            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </section>

                <ContactCTA />
              </motion.div>
            ) : (
              // Projects List View
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <section className="pt-32 pb-16">
                  <div className="container mx-auto px-6">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedCategory(null)}
                      className="mb-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Categories
                    </Button>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-6xl">{categoryData[selectedCategory]?.icon || "📁"}</span>
                        <div>
                          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
                            {selectedCategory}
                          </h1>
                          <p className="text-muted-foreground mt-2">
                            {filteredProjects.length} Project{filteredProjects.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Projects Grid */}
                <section className="pb-24">
                  <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Link
                            to={`/projects/${project.id}`}
                            className="group block bg-gradient-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300"
                          >
                            <div className="aspect-video overflow-hidden bg-muted/50 relative">
                              <img
                                src={
                                  project.images && project.images.length > 0
                                    ? project.images[0]
                                    : companyLogo
                                }
                                alt={project.title}
                                className={`w-full h-full ${project.images && project.images.length > 0
                                  ? "object-cover group-hover:scale-110"
                                  : "object-contain p-12 opacity-50"
                                  } transition-transform duration-500`}
                                onError={(e) => {
                                  e.currentTarget.src = companyLogo;
                                  e.currentTarget.className =
                                    "w-full h-full object-contain p-12 opacity-50";
                                }}
                              />
                            </div>
                            <div className="p-6">
                              <h3 className="font-display text-xl tracking-wide mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {project.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {project.description}
                              </p>
                              {project.location && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <MapPin className="w-3 h-3" />
                                  {project.location}
                                </div>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Projects;