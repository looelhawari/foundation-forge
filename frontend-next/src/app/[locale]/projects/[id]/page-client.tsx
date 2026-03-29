"use client";

import { motion } from "framer-motion";
import { useParams, Link } from "@/lib/router-compat";
import { useState, useEffect } from "react";
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
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/hooks/useProjects";
import SEOHead from "@/components/SEOHead";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/api";

const companyLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312003/cpc-website/cpc_logo-removebg-preview.png";

interface ProjectDetailProps {
    initialProject?: Project | null;
}

const ProjectDetail = ({ initialProject }: ProjectDetailProps) => {
    const { id } = useParams();
    // Use initialProject from server if available, otherwise fetch client-side (fallback)
    const { project: clientProject, isLoading: clientLoading, error } = useProject(initialProject ? undefined : id);
    const project = initialProject || clientProject;
    const isLoading = !initialProject && clientLoading;
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const t = useTranslations('projects.detail');

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null || !project?.images) return;

            if (e.key === "Escape") {
                setLightboxIndex(null);
            } else if (e.key === "ArrowLeft") {
                setLightboxIndex((prev) =>
                    prev === null || prev === 0 ? project.images.length - 1 : prev - 1
                );
            } else if (e.key === "ArrowRight") {
                setLightboxIndex((prev) =>
                    prev === null || prev === project.images.length - 1 ? 0 : prev + 1
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, project?.images]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxIndex]);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    <section className="pt-20 relative h-[60vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
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
                        <h1 className="font-display text-3xl sm:text-4xl mb-4">{t('notFound.title')}</h1>
                        <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                            {error || t('notFound.message')}
                        </p>
                        <Button variant="hero" asChild>
                            <Link to="/projects">{t('notFound.backButton')}</Link>
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

    return (
        <div className="min-h-screen bg-background">
            <SEOHead
                title={`${project.title} | ${typeof project.category === 'object' ? (project.category as any)?.name : project.category || 'Project'} in ${project.location || 'Qatar'} | CPC Qatar`}
                description={`${(project.description || `${project.title} — Road construction & infrastructure project by CPC Qatar`).slice(0, 155)}. CPC Qatar infrastructure project in ${project.location || 'Doha, Qatar'}.`}
                canonical={`/projects/${id}`}
                ogImage={project.images?.[0] || undefined}
                keywords={`${project.title}, ${typeof project.category === 'object' ? (project.category as any)?.name : project.category || ''} project Qatar, CPC Qatar project, ${project.location || 'Doha'} construction`}
            />
            <Header />
            <main>
                {/* Hero Image */}
                <section className={`pt-20 relative ${posterImage ? 'h-[60vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px]' : 'h-auto'}`}>
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
                                {t('backToProjects')}
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
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <h2 className="font-display text-3xl tracking-wide mb-6">
                                        {t('projectOverview')} <span className="text-gradient">{t('overview')}</span>
                                    </h2>
                                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                        {project.description || t('defaultDescription')}
                                    </p>

                                    {/* Gallery */}
                                    {project.images && project.images.length > 0 ? (
                                        <div className="grid md:grid-cols-2 gap-4 mb-12">
                                            {project.images.map((image: string, index: number) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: 0.3 + index * 0.1,
                                                    }}
                                                    className="aspect-video rounded-lg overflow-hidden bg-muted/50 cursor-pointer group relative"
                                                    onClick={() => setLightboxIndex(index)}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${project.title} - Image ${index + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.currentTarget.src = companyLogo;
                                                            e.currentTarget.className =
                                                                "w-full h-full object-contain p-12";
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mb-8 p-8 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                                            <p className="text-sm text-muted-foreground text-center">
                                                {t('legacyMessage')}
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
                                        {t('projectDetails')}
                                    </h3>
                                    <div className="space-y-4">
                                        {project.location && (
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {t('location')}
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
                                                        {t('year')}
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
                                                        {t('client')}
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
                                                        {t('mainContractor')}
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
                                                        {t('consultant')}
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
                                                        {t('area')}
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
                                                        {t('projectValue')}
                                                    </div>
                                                    <div className="text-sm">{project.value}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-border">
                                        <Button variant="hero" className="w-full" asChild>
                                            <Link to="/contact">{t('startYourProject')}</Link>
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
                                <span>{t('backToAllProjects')}</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <ContactCTA />
            </main>
            <Footer />

            {/* Image Lightbox */}
            {lightboxIndex !== null && project?.images && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium">
                        {lightboxIndex + 1} / {project.images.length}
                    </div>

                    {/* Previous Button */}
                    {project.images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex((prev) =>
                                    prev === null || prev === 0
                                        ? project.images.length - 1
                                        : prev - 1
                                );
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                    )}

                    {/* Next Button */}
                    {project.images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex((prev) =>
                                    prev === null || prev === project.images.length - 1
                                        ? 0
                                        : prev + 1
                                );
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    )}

                    {/* Image */}
                    <motion.div
                        key={lightboxIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="relative max-w-7xl max-h-[90vh] w-full px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={project.images[lightboxIndex]}
                            alt={`${project.title} - Image ${lightboxIndex + 1}`}
                            className="w-full h-full object-contain mx-auto"
                            onError={(e) => {
                                e.currentTarget.src = companyLogo;
                            }}
                        />
                        {/* Image Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <p className="text-white text-center text-sm md:text-base">
                                {project.title} - Click to view full size on{" "}
                                <a
                                    href={project.images[lightboxIndex]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-primary"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    new tab
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
