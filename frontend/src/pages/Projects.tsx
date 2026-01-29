import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { MapPin, ArrowLeft, Loader2, FolderOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";
import { useProjects, useCategories } from "@/hooks/useProjects";

// Category data with icons and descriptions
const categoryData: Record<string, { icon: string; description: string }> = {
  Educational: { icon: "🎓", description: "Schools & Educational Facilities" },
  Religious: { icon: "🕌", description: "Mosques & Religious Buildings" },
  "Commercial & Retail": {
    icon: "🏪",
    description: "Shopping Centers & Retail Spaces",
  },
  Residential: { icon: "🏘️", description: "Housing & Residential Compounds" },
  Industrial: { icon: "🏭", description: "Factories & Industrial Facilities" },
  "Logistics & Warehouse": {
    icon: "📦",
    description: "Warehouses & Storage Facilities",
  },
  "Public Infrastructure": {
    icon: "🏗️",
    description: "Roads, Parking & Public Works",
  },
  "Historical & Cultural": {
    icon: "🏛️",
    description: "Heritage & Cultural Sites",
  },
  "Road Work": { icon: "🛣️", description: "Road Construction & Maintenance" },
  Parking: { icon: "🅿️", description: "Parking Areas & Facilities" },
  Farm: { icon: "🌾", description: "Agricultural Facilities" },
  Commercial: { icon: "🏢", description: "Commercial Buildings" },
  Souq: { icon: "🛒", description: "Traditional Markets & Souqs" },
  FIFA: { icon: "⚽", description: "FIFA World Cup Projects" },
  Mosques: { icon: "🕌", description: "Mosque Construction" },
  Warehouse: { icon: "📦", description: "Warehouse Construction" },
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all projects from API
  const { projects, isLoading, pagination } = useProjects({
    page: currentPage,
    limit: selectedCategory ? 50 : 100, // Fetch more when viewing category
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
  });

  // Fetch categories from API
  const { categories, isLoading: isCategoriesLoading } = useCategories();

  // Get selected category object for display
  const selectedCategoryObj = useMemo(() => {
    if (!selectedCategory || !categories) return null;
    return categories.find((cat) => cat.slug === selectedCategory);
  }, [selectedCategory, categories]);

  // Get unique categories with project counts from the data
  const categoriesWithCounts = useMemo(() => {
    if (!categories || categories.length === 0) {
      // Fallback to calculating from projects if no categories from API
      const categoryMap = new Map<string, number>();
      projects.forEach((project) => {
        if (project.category) {
          categoryMap.set(
            project.category,
            (categoryMap.get(project.category) || 0) + 1,
          );
        }
      });
      return Array.from(categoryMap.entries()).map(([slug, count]) => ({
        name: slug,
        slug: slug,
        count,
      }));
    }
    return categories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      count: cat.project_count || 0,
    }));
  }, [categories, projects]);

  // Get filtered projects for display
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter by search if needed
    if (searchQuery && !selectedCategory) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.client?.toLowerCase().includes(query) ||
          p.location?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [projects, searchQuery, selectedCategory]);

  // Get poster image (first image or fallback)
  const getPosterImage = (images: string[] | undefined) => {
    if (!images || images.length === 0) return null;
    return images[0]; // First image is always the poster
  };

  // Loading skeleton for categories
  const CategorySkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-gradient-card border border-border rounded-lg p-8"
        >
          <Skeleton className="h-16 w-16 rounded-lg mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      ))}
    </div>
  );

  // Loading skeleton for projects
  const ProjectSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gradient-card border border-border rounded-lg overflow-hidden"
        >
          <Skeleton className="aspect-video w-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
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
                    <p className="text-xl text-muted-foreground mb-8">
                      Choose a category to explore our portfolio of excellence
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search projects..."
                        className="pl-12 h-12 bg-card border-border text-base"
                      />
                    </div>
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
                      <div className="font-display text-4xl text-gradient mb-2">
                        {isLoading ? (
                          <Skeleton className="h-10 w-16 mx-auto" />
                        ) : (
                          `${pagination?.totalItems || projects.length}+`
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Projects
                      </div>
                    </div>
                    <div className="bg-gradient-card border border-border rounded-lg p-6 text-center">
                      <div className="font-display text-4xl text-gradient mb-2">
                        {isCategoriesLoading ? (
                          <Skeleton className="h-10 w-10 mx-auto" />
                        ) : (
                          categoriesWithCounts.length
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Categories
                      </div>
                    </div>
                    <div className="bg-gradient-card border border-border rounded-lg p-6 text-center">
                      <div className="font-display text-4xl text-gradient mb-2">
                        100%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Success Rate
                      </div>
                    </div>
                    <div className="bg-gradient-card border border-border rounded-lg p-6 text-center">
                      <div className="font-display text-4xl text-gradient mb-2">
                        15+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Years Experience
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Search Results or Category Cards */}
              <section className="pb-24">
                <div className="container mx-auto px-6">
                  {searchQuery ? (
                    // Search Results
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-display">
                          Search Results for "{searchQuery}"
                        </h2>
                        <Button
                          variant="ghost"
                          onClick={() => setSearchQuery("")}
                          size="sm"
                        >
                          Clear Search
                        </Button>
                      </div>
                      {isLoading ? (
                        <ProjectSkeleton />
                      ) : filteredProjects.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {filteredProjects.map((project, index) => (
                            <motion.div
                              key={project.id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: index * 0.05,
                              }}
                            >
                              <Link
                                to={`/projects/${project.slug || project.id}`}
                                className="group block bg-gradient-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300"
                              >
                                <div className="aspect-video overflow-hidden bg-muted/50 relative">
                                  <img
                                    src={
                                      getPosterImage(project.images) ||
                                      companyLogo
                                    }
                                    alt={project.title}
                                    className={`w-full h-full ${
                                      getPosterImage(project.images)
                                        ? "object-cover group-hover:scale-110"
                                        : "object-contain p-12 opacity-50"
                                    } transition-transform duration-500`}
                                    loading="lazy"
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
                                    {project.description ||
                                      "Road construction project"}
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
                      ) : (
                        <div className="text-center py-16">
                          <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                          <h3 className="text-xl font-medium mb-2">
                            No projects found
                          </h3>
                          <p className="text-muted-foreground">
                            Try a different search term
                          </p>
                        </div>
                      )}
                    </div>
                  ) : isCategoriesLoading ? (
                    <CategorySkeleton />
                  ) : (
                    // Category Cards Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                      {categoriesWithCounts.map((category, index) => (
                        <motion.button
                          key={category.slug}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onClick={() => setSelectedCategory(category.slug)}
                          className="group bg-gradient-card border border-border rounded-lg p-8 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-left"
                        >
                          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {categoryData[category.name]?.icon || "📁"}
                          </div>
                          <h3 className="font-display text-xl tracking-wide mb-2 group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {categoryData[category.name]?.description ||
                              "Construction projects"}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-primary font-medium">
                              {category.count} Project
                              {category.count !== 1 ? "s" : ""}
                            </span>
                            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <ContactCTA />
            </motion.div>
          ) : (
            // Projects List View for Selected Category
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
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentPage(1);
                    }}
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
                      <span className="text-6xl">
                        {categoryData[selectedCategoryObj?.name || ""]?.icon ||
                          "📁"}
                      </span>
                      <div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
                          {selectedCategoryObj?.name || selectedCategory}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                          {isLoading ? (
                            <Skeleton className="h-5 w-24" />
                          ) : (
                            `${filteredProjects.length} Project${
                              filteredProjects.length !== 1 ? "s" : ""
                            }`
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Projects Grid */}
              <section className="pb-24">
                <div className="container mx-auto px-6">
                  {isLoading ? (
                    <ProjectSkeleton />
                  ) : filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
                        >
                          <Link
                            to={`/projects/${project.slug || project.id}`}
                            className="group block bg-gradient-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300"
                          >
                            <div className="aspect-video overflow-hidden bg-muted/50 relative">
                              <img
                                src={
                                  getPosterImage(project.images) || companyLogo
                                }
                                alt={project.title}
                                className={`w-full h-full ${
                                  getPosterImage(project.images)
                                    ? "object-cover group-hover:scale-110"
                                    : "object-contain p-12 opacity-50"
                                } transition-transform duration-500`}
                                loading="lazy"
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
                                {project.description ||
                                  "Road construction project"}
                              </p>
                              <div className="flex items-center justify-between">
                                {project.location && (
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    {project.location}
                                  </div>
                                )}
                                {project.year && (
                                  <span className="text-xs text-primary">
                                    {project.year}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">
                        No projects yet
                      </h3>
                      <p className="text-muted-foreground">
                        Projects in this category will appear here
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        disabled={!pagination.hasPrevPage}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        Previous
                      </Button>
                      <span className="flex items-center px-4 text-sm text-muted-foreground">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        disabled={!pagination.hasNextPage}
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
