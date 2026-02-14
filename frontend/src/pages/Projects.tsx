import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageLoader } from "@/components/layout/PageLoader";
import { MapPin, ArrowLeft, Loader2, FolderOpen, Search, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, useCategories } from "@/hooks/useProjects";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

// Category data with icons and descriptions - MATCHES DATABASE CATEGORIES
const categoryData: Record<string, { icon: string; description: string }> = {
  School: { icon: "🎓", description: "Educational Facilities & Schools" },
  Mosque: { icon: "🕌", description: "Religious Constructions & Mosques" },
  "Commercial Building": {
    icon: "🏢",
    description: "Commercial & Residential Constructions",
  },
  "Stores and Factory": {
    icon: "🏭",
    description: "Warehouses, Factories & Storage Facilities",
  },
  "Public Project": {
    icon: "🏗️",
    description: "Roads, Parking & Public Infrastructure",
  },
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProjectType, setSelectedProjectType] = useState<"new" | "old" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all projects from API
  const { projects, isLoading, pagination } = useProjects({
    page: currentPage,
    limit: selectedCategory || selectedProjectType === "old" ? 50 : 100,
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    isLegacy: selectedProjectType === "old" ? true : selectedProjectType === "new" ? false : undefined,
  });

  // Fetch legacy projects count
  const { projects: legacyProjects } = useProjects({
    limit: 1,
    isLegacy: true,
  });

  // Fetch categories from API
  const { categories, isLoading: isCategoriesLoading } = useCategories();

  // Show loader only while initial data is loading
  const showLoader = isLoading && projects.length === 0;

  // Get selected category object for display
  const selectedCategoryObj = useMemo(() => {
    if (!selectedCategory || !categories) return null;
    return categories.find((cat) => cat.name === selectedCategory);
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
      <AnimatePresence mode="wait">
        {showLoader && (
          <PageLoader title="PROJECTS" subtitle="Excellence in Every Construction" />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header />
        <main>
          <AnimatePresence mode="wait">
            {!selectedCategory && !selectedProjectType ? (
              // Main Project Type Selection View (New vs Old)
              <motion.div
                key="project-types"
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
                      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                        OUR <span className="text-gradient">PROJECTS</span>
                      </h1>
                      <p className="text-xl text-muted-foreground mb-8">
                        Explore our portfolio of excellence
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
                      <div className="bg-gradient-card border border-border rounded-lg p-4 sm:p-6 text-center">
                        <div className="font-display text-3xl sm:text-4xl text-gradient mb-2">
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
                      <div className="bg-gradient-card border border-border rounded-lg p-4 sm:p-6 text-center">
                        <div className="font-display text-3xl sm:text-4xl text-gradient mb-2">
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
                      <div className="bg-gradient-card border border-border rounded-lg p-4 sm:p-6 text-center">
                        <div className="font-display text-3xl sm:text-4xl text-gradient mb-2">
                          100%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Success Rate
                        </div>
                      </div>
                      <div className="bg-gradient-card border border-border rounded-lg p-4 sm:p-6 text-center">
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

                {/* Search Results or Main Project Type Cards */}
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
                                      className={`w-full h-full ${getPosterImage(project.images)
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
                                  <div className="p-4 sm:p-6">
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
                    ) : (
                      // Main Project Type Cards (New vs Old)
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* New Projects Card */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          onClick={() => setSelectedProjectType("new")}
                          className="group bg-gradient-card border border-border rounded-xl p-6 sm:p-8 md:p-10 hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 text-left relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                <Sparkles className="w-10 h-10 text-primary" />
                              </div>
                            </div>
                            <h3 className="font-display text-3xl tracking-wide mb-3 group-hover:text-primary transition-colors">
                              New Projects
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              Explore our latest construction projects organized by category. Modern infrastructure and innovative designs.
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-primary font-medium">
                                {categoriesWithCounts.length} Categories
                              </span>
                              <span className="text-primary group-hover:translate-x-2 transition-transform text-2xl">
                                →
                              </span>
                            </div>
                          </div>
                        </motion.button>

                        {/* Old Projects Card */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          onClick={() => setSelectedProjectType("old")}
                          className="group bg-gradient-card border border-border rounded-xl p-10 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 text-left relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="p-4 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                                <Clock className="w-10 h-10 text-amber-500" />
                              </div>
                            </div>
                            <h3 className="font-display text-3xl tracking-wide mb-3 group-hover:text-amber-500 transition-colors">
                              Old Projects
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              Browse our historical portfolio of completed projects. A testament to our years of experience and expertise.
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-amber-500 font-medium">
                                Legacy Collection
                              </span>
                              <span className="text-amber-500 group-hover:translate-x-2 transition-transform text-2xl">
                                →
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </section>

                <ContactCTA />
              </motion.div>
            ) : selectedProjectType === "new" && !selectedCategory ? (
              // Categories Grid View for New Projects
              <motion.div
                key="categories"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <section className="pt-32 pb-16">
                  <div className="container mx-auto px-6">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedProjectType(null);
                        setCurrentPage(1);
                      }}
                      className="mb-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Projects
                    </Button>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="max-w-4xl"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
                            New <span className="text-gradient">Projects</span>
                          </h1>
                          <p className="text-muted-foreground mt-2">
                            Select a category to explore
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </section>

                <section className="pb-24">
                  <div className="container mx-auto px-6">
                    {isCategoriesLoading ? (
                      <CategorySkeleton />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {categoriesWithCounts.map((category, index) => (
                          <motion.button
                            key={category.slug || category.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedCategory(category.name)}
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
            ) : selectedProjectType === "old" ? (
              // Old Projects List View
              <motion.div
                key="old-projects"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <section className="pt-32 pb-16">
                  <div className="container mx-auto px-6">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedProjectType(null);
                        setCurrentPage(1);
                      }}
                      className="mb-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Projects
                    </Button>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-500/10 rounded-xl">
                          <Clock className="w-8 h-8 text-amber-500" />
                        </div>
                        <div>
                          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
                            Old <span className="text-amber-500">Projects</span>
                          </h1>
                          <p className="text-muted-foreground mt-2">
                            {isLoading ? (
                              <Skeleton className="h-5 w-24" />
                            ) : (
                              `${pagination?.totalItems || filteredProjects.length} Legacy Project${(pagination?.totalItems || filteredProjects.length) !== 1 ? "s" : ""}`
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </section>

                <section className="pb-24">
                  <div className="container mx-auto px-6">
                    {isLoading ? (
                      <div className="space-y-4 max-w-4xl mx-auto">
                        {[...Array(6)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full rounded-lg" />
                        ))}
                      </div>
                    ) : filteredProjects.length > 0 ? (
                      <div className="max-w-4xl mx-auto space-y-4">
                        {filteredProjects.map((project, index) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <Link
                              to={`/projects/${project.slug || project.id}`}
                              className="group block bg-gradient-card border border-border rounded-lg p-6 hover:border-amber-500 transition-all duration-300 hover:shadow-lg"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-amber-500/10 rounded-lg">
                                      <Clock className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <h3 className="font-display text-lg md:text-xl tracking-wide group-hover:text-amber-500 transition-colors">
                                      {project.title}
                                    </h3>
                                  </div>

                                  {project.description && (
                                    <p className="text-sm text-muted-foreground mb-3 ml-11 line-clamp-2">
                                      {project.description}
                                    </p>
                                  )}

                                  <div className="flex flex-wrap items-center gap-4 ml-11">
                                    {project.location && (
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <MapPin className="w-3 h-3" />
                                        {project.location}
                                      </div>
                                    )}
                                    {project.client && (
                                      <div className="text-xs text-muted-foreground">
                                        Client: <span className="text-foreground">{project.client}</span>
                                      </div>
                                    )}
                                    {project.year && (
                                      <span className="text-xs font-medium text-amber-500 px-2 py-1 bg-amber-500/10 rounded">
                                        {project.year}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="text-muted-foreground group-hover:text-amber-500 transition-colors">
                                  <ArrowLeft className="w-5 h-5 rotate-180" />
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
                          No old projects yet
                        </h3>
                        <p className="text-muted-foreground">
                          Legacy projects will appear here
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
                          Page {pagination.currentPage} of{" "}
                          {pagination.totalPages}
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

                <ContactCTA />
              </motion.div>
            ) : (
              // Projects List View for Selected Category (inside New Projects)
              <motion.div
                key="category-projects"
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
                          {categoryData[selectedCategoryObj?.name || ""]
                            ?.icon || "📁"}
                        </span>
                        <div>
                          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
                            {selectedCategoryObj?.name || selectedCategory}
                          </h1>
                          <p className="text-muted-foreground mt-2">
                            {isLoading ? (
                              <Skeleton className="h-5 w-24" />
                            ) : (
                              `${filteredProjects.length} Project${filteredProjects.length !== 1 ? "s" : ""
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
                                    getPosterImage(project.images) ||
                                    companyLogo
                                  }
                                  alt={project.title}
                                  className={`w-full h-full ${getPosterImage(project.images)
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
                          Page {pagination.currentPage} of{" "}
                          {pagination.totalPages}
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

                <ContactCTA />
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
