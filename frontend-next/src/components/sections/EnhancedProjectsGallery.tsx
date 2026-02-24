"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { projects, projectCategories } from "@/data/projects";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export const EnhancedProjectsGallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const filteredProjects = selectedCategory === "All"
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    const openLightbox = (project: typeof projects[0], imageIndex: number = 0) => {
        setSelectedProject(project);
        setSelectedImageIndex(imageIndex);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        if (selectedProject) {
            setSelectedImageIndex((prev) =>
                prev === selectedProject.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedProject) {
            setSelectedImageIndex((prev) =>
                prev === 0 ? selectedProject.images.length - 1 : prev - 1
            );
        }
    };

    return (
        <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block text-primary font-display text-sm tracking-[0.3em] mb-4"
                    >
                        OUR WORK
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-5xl md:text-7xl lg:text-8xl mb-6"
                    >
                        Project <span className="text-gradient">Portfolio</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto"
                    >
                        Explore our diverse collection of 108+ completed projects across Qatar
                    </motion.p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {projectCategories.map((category, index) => (
                        <motion.button
                            key={category}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                                    : 'bg-card border border-border hover:border-primary/50'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid - Bento Layout */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onImageClick={(imgIndex) => openLightbox(project, imgIndex)}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-50 p-3 bg-card rounded-full border border-border hover:border-primary transition-all"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Navigation */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            whileHover={{ scale: 1.1, x: -5 }}
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 z-50 p-3 bg-card rounded-full border border-border hover:border-primary transition-all"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            whileHover={{ scale: 1.1, x: 5 }}
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 z-50 p-3 bg-card rounded-full border border-border hover:border-primary transition-all"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-6xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={selectedImageIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                src={selectedProject.images[selectedImageIndex]}
                                alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                                onError={(e) => {
                                    // Fallback for images that don't exist yet
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop';
                                }}
                            />

                            {/* Image Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent rounded-b-2xl"
                            >
                                <h3 className="font-display text-2xl mb-2">{selectedProject.title}</h3>
                                <p className="text-muted-foreground">
                                    Image {selectedImageIndex + 1} of {selectedProject.images.length}
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Background Elements */}
            <motion.div
                style={{ y }}
                className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            />
        </section>
    );
};

// Project Card Component
const ProjectCard = ({
    project,
    index,
    onImageClick
}: {
    project: typeof projects[0],
    index: number,
    onImageClick: (index: number) => void
}) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [hoveredImage, setHoveredImage] = useState(0);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
        >
            {/* Image Container with Ken Burns Effect */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <motion.img
                    src={project.images[hoveredImage]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop';
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Zoom Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onImageClick(hoveredImage)}
                        className="p-4 bg-primary text-primary-foreground rounded-full shadow-2xl"
                    >
                        <ZoomIn className="w-6 h-6" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {project.category}
                    </span>
                    {project.year && (
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                    )}
                </div>

                <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Image Counter & Thumbnails */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        {project.images.length} photos
                    </span>

                    {/* Mini Thumbnail Navigator */}
                    <div className="flex gap-1">
                        {project.images.slice(0, 3).map((_, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setHoveredImage(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${hoveredImage === idx ? 'bg-primary w-4' : 'bg-muted-foreground/30'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
