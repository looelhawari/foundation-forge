import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { MapPin, Calendar, Clock, Building, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
          <Button variant="hero" asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Image */}
        <section className="pt-20 relative h-[60vh] min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: project.images && project.images.length > 0
                ? `url(${project.images[0]})`
                : `url(${companyLogo})`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <span className="block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full w-fit mb-4">
                {project.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="font-display text-3xl tracking-wide mb-6">
                    PROJECT <span className="text-gradient">OVERVIEW</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Gallery */}
                  <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {project.images && project.images.length > 0 ? (
                      project.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                          className="aspect-video rounded-lg overflow-hidden bg-muted/50"
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = companyLogo;
                              e.currentTarget.className = "w-full h-full object-contain p-12";
                            }}
                          />
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 aspect-video rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center">
                        <img src={companyLogo} alt="CPC Logo" className="w-48 h-48 object-contain opacity-50" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-gradient-card border border-border rounded-lg p-6 sticky top-24">
                  <h3 className="font-display text-xl tracking-wide mb-6">PROJECT DETAILS</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-sm">{project.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Year</div>
                        <div className="text-sm">{project.year || "N/A"}</div>
                      </div>
                    </div>
                    {project.client && (
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Client</div>
                          <div className="text-sm">{project.client}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/contact">Start Your Project</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-border">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{prevProject.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextProject && (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>{nextProject.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
