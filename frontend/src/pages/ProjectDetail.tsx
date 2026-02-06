import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import {
  MapPin,
  Calendar,
  Building,
  ArrowLeft,
  Ruler,
  DollarSign,
  Wrench,
  Users,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/hooks/useProjects";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";
import SEOHead from "@/components/SEOHead";
import {
  PAGE_SEO,
  generateProjectSchema,
  generateBreadcrumbSchema,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

const ProjectDetail = () => {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="pt-20 relative h-[60vh] min-h-[500px]">
            <Skeleton className="absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12 z-10">
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-8 w-24 mb-4" />
              <Skeleton className="h-16 w-3/4" />
            </div>
          </section>
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-32 w-full" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Skeleton className="aspect-video" />
                    <Skeleton className="aspect-video" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-96 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Error or not found state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl sm:text-4xl mb-4">
              Project Not Found
            </h1>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              {error || "The project you're looking for doesn't exist."}
            </p>
            <Button variant="hero" asChild>
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get poster image (first image)
  const posterImage =
    project.images && project.images.length > 0 ? project.images[0] : null;

  // Dynamic SEO for this project
  const projectSEO = {
    ...PAGE_SEO.projectDetail,
    title: `${project.title} | ${project.category || "Project"} | CPC Qatar`,
    description: project.description
      ? `${project.description.substring(0, 155)}...`
      : `View details of ${project.title} - a ${project.category || "construction"} project by CPC Qatar in ${project.location || "Qatar"}.`,
    ogTitle: `${project.title} | CPC Qatar Project`,
    ogDescription: project.description
      ? project.description.substring(0, 200)
      : `${project.title} - ${project.category || "Construction"} project by CPC Qatar.`,
    ogImage: posterImage || DEFAULT_OG_IMAGE,
    keywords: `${project.title}, ${project.category || "construction"}, CPC Qatar, ${project.location || "Qatar"}, ${project.client || "construction project"}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        seo={projectSEO}
        path={`/projects/${id}`}
        structuredData={[
          generateProjectSchema({
            title: project.title,
            description: project.description,
            images: project.images,
            location: project.location,
            client: project.client,
            category: project.category,
            year: project.year,
            slug: id,
          }),
          generateBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Projects", url: `${SITE_URL}/projects` },
            { name: project.title, url: `${SITE_URL}/projects/${id}` },
          ]),
        ]}
      />
      <Header />
      <main>
        {/* Hero Image */}
        <section
          className={`pt-20 relative ${posterImage ? "h-[60vh] min-h-[500px]" : "h-auto"}`}
        >
          {posterImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${posterImage})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
            </div>
          ) : (
            <div className="bg-gradient-dark py-20">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-background" />
            </div>
          )}
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
              <span className="block px-3 py-1 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-full w-fit mb-4">
                {project.category}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide">
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
                    {project.description ||
                      "A quality road construction project delivered with excellence."}
                  </p>

                  {/* Gallery */}
                  {project.images && project.images.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4 mb-12">
                      {project.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.3 + index * 0.1,
                          }}
                          className="aspect-video rounded-lg overflow-hidden bg-muted/50"
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = companyLogo;
                              e.currentTarget.className =
                                "w-full h-full object-contain p-12";
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-8 p-8 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                      <p className="text-sm text-muted-foreground text-center">
                        This is a legacy project from our archives. Image
                        documentation is not available.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-gradient-card border border-border rounded-lg p-6 sticky top-24">
                  <h3 className="font-display text-xl tracking-wide mb-6">
                    PROJECT DETAILS
                  </h3>
                  <div className="space-y-4">
                    {project.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Location
                          </div>
                          <div className="text-sm">{project.location}</div>
                        </div>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Year
                          </div>
                          <div className="text-sm">{project.year}</div>
                        </div>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Client
                          </div>
                          <div className="text-sm">{project.client}</div>
                        </div>
                      </div>
                    )}
                    {project.main_contractor && (
                      <div className="flex items-center gap-3">
                        <Wrench className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Main Contractor
                          </div>
                          <div className="text-sm">
                            {project.main_contractor}
                          </div>
                        </div>
                      </div>
                    )}
                    {project.consultant && (
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Consultant
                          </div>
                          <div className="text-sm">{project.consultant}</div>
                        </div>
                      </div>
                    )}
                    {project.area && (
                      <div className="flex items-center gap-3">
                        <Ruler className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Area
                          </div>
                          <div className="text-sm">{project.area}</div>
                        </div>
                      </div>
                    )}
                    {project.value && (
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Project Value
                          </div>
                          <div className="text-sm">{project.value}</div>
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

            {/* Back to Projects */}
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Projects</span>
              </Link>
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
