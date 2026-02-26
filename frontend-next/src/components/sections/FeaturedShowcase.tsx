"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

// Import project images
const busParking2 = "/assets/bus parking stage 2 .png";
const busParking1 = "/assets/bus parking stage 1 .png";
const warehouseImg = "/assets/Ware house (instead of main parrking area).png";
const fwcq2Project = "/assets/FWCQ2(in project section).png";
const farmsImg = "/assets/farms instaed of el meera branch .png";

// Import client logos
const moeLogo = "/assets/MOE-removebg-preview.png";
const fifaLogo = "/assets/FIFA-removebg-preview.png";
const waqifLogo = "/assets/waqif-removebg-preview.png";

// Import client project images (for hover)
const moeProjectImg = "/assets/MOE.png";
const fwcq2ClientImg = "/assets/FWCQ2(in client section).png";
const mosquesImg = "/assets/mosques.png";

const topProjects = [
    {
        id: 1,
        title: "School Bus Parking - Stage 2",
        client: "Ministry of Education",
        area: "22,000 m²",
        status: "Completed",
        image: busParking2
    },
    {
        id: 2,
        title: "School Bus Parking - Stage 1",
        client: "Ministry of Education",
        area: "16,000 m²",
        status: "Completed",
        image: busParking1
    },
    {
        id: 3,
        title: "Warehouse",
        client: "Manateq",
        area: "11,400 m²",
        status: "Completed",
        image: warehouseImg
    },
    {
        id: 4,
        title: "FIFA World Cup 2022",
        client: "FIFA Qatar 2022",
        area: "45,000 m²",
        status: "Delivered",
        image: fwcq2Project
    },
    {
        id: 5,
        title: "Farms",
        client: "",
        area: "6,800 m²",
        status: "Completed",
        image: farmsImg
    }
];

const topClients = [
    {
        name: "Ministry of Education",
        projects: "3 Major Projects",
        highlight: "Government Partner",
        color: "#fbbf24",
        logo: moeLogo,
        projectImage: moeProjectImg
    },
    {
        name: "FIFA World Cup Qatar 2022",
        projects: "International Event",
        highlight: "Global Event",
        color: "#f97316",
        logo: fifaLogo,
        projectImage: fwcq2ClientImg
    },
    {
        name: "Ministry of Endowments and Islamic Affairs",
        projects: "Heritage Sites",
        highlight: "Cultural Heritage",
        color: "#ea580c",
        logo: waqifLogo,
        projectImage: mosquesImg
    }
];

// Minimal glass morphism project card with scroll reveal
const MinimalProjectCard = ({ project, index }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y, opacity }}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                className="relative h-[350px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                animate={{
                    y: isHovered ? -20 : 0,
                    scale: isHovered ? 1.02 : 1
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Project Image Background */}
                <div className="absolute inset-0">
                    <motion.img
                        src={project.image}
                        alt={`CPC Qatar project: ${project.title} — ${project.area} for ${project.client || 'private client'}, ${project.status}`}
                        className="w-full h-full object-cover"
                        animate={{
                            scale: isHovered ? 1.15 : 1
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    {/* Overlay fades on hover to reveal image */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"
                        animate={{
                            opacity: isHovered ? 0 : 1
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Content - hides on hover to show image */}
                <motion.div
                    className="relative h-full p-8 flex flex-col justify-between"
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        y: isHovered ? 30 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Number indicator */}
                    <div className="flex items-start justify-between">
                        <motion.div
                            className="text-[60px] sm:text-[80px] md:text-[120px] font-bold leading-none text-primary/30"
                        >
                            {project.id}
                        </motion.div>

                        {/* Badge */}
                        <motion.div
                            className="px-4 py-2 rounded-full text-xs font-bold bg-primary/20 border border-primary/40"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                        >
                            <span className="text-primary">TOP {project.id}</span>
                        </motion.div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-2">
                                {project.title}
                            </h3>
                            <p className="text-lg text-primary">
                                {project.client}
                            </p>
                        </motion.div>

                        {/* Stats bar */}
                        <motion.div
                            className="flex items-center gap-6 text-sm text-gray-400"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                            viewport={{ once: true }}
                            style={{ transformOrigin: "left" }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span>{project.area}</span>
                            </div>
                            <div className="h-4 w-px bg-gray-700" />
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="font-bold text-green-400">{project.status}</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Corner accent */}
                <svg className="absolute top-0 right-0 w-32 h-32 opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M 128 0 L 128 128 L 0 128"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.6 }}
                        viewport={{ once: true }}
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};

// Origami Folding Client Card
const OrigamiClientCard = ({ client, index }: any) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, rotateX: -90, z: -300 }}
            whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
            transition={{
                duration: 1.2,
                delay: index * 0.3,
                type: "spring",
                stiffness: 60
            }}
            viewport={{ once: true }}
            className="relative w-full sm:w-72 h-80"
            style={{ transformStyle: "preserve-3d", perspective: 1500 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            {/* Front face - Logo */}
            <motion.div
                className="absolute inset-0 rounded-2xl border border-gray-600 p-8 flex flex-col items-center justify-center overflow-hidden"
                style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)"
                }}
                animate={{
                    rotateY: isFlipped ? 180 : 0,
                    z: isFlipped ? -50 : 0
                }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
                {/* Subtle pattern background */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20px 20px, ${client.color} 1px, transparent 1px)`,
                        backgroundSize: "40px 40px"
                    }}
                />

                {/* Logo */}
                <div className="w-36 h-36 mb-4 relative z-10 flex items-center justify-center">
                    <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                        loading="lazy"
                    />
                </div>
                <h4 className="text-lg font-bold text-gray-800 text-center relative z-10">
                    {client.name}
                </h4>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <span className="inline-block w-4 h-0.5 bg-gray-400"></span>
                    Hover to see project
                    <span className="inline-block w-4 h-0.5 bg-gray-400"></span>
                </p>
            </motion.div>

            {/* Back face - Project Image */}
            <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    rotateY: 180
                }}
                animate={{
                    rotateY: isFlipped ? 360 : 180,
                    z: isFlipped ? 0 : -50
                }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
                {/* Project Image */}
                <img
                    src={client.projectImage}
                    alt={`${client.name} project`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isFlipped ? 0 : 20, opacity: isFlipped ? 1 : 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <p className="text-lg font-bold text-white mb-1">{client.name}</p>
                        <p className="text-gray-300 text-sm">{client.projects}</p>
                        <p className="text-sm font-bold mt-2" style={{ color: client.color }}>
                            {client.highlight}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Layered shadow effect */}
            <motion.div
                className="absolute inset-0 -z-10 rounded-2xl bg-gray-800/50 blur-xl"
                animate={{
                    scale: isFlipped ? 1.1 : 1,
                    y: isFlipped ? 20 : 10
                }}
                transition={{ duration: 0.8 }}
            />
        </motion.div>
    );
};

export function FeaturedShowcase() {
    return (
        <section className="relative py-16 sm:py-24 md:py-32 bg-black overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 px-4">
                        <span className="text-white">Featured </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                            Excellence
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                        Our most prestigious projects and valued partnerships
                    </p>
                </motion.div>

                {/* Top 5 Projects - Minimal Glass Cards */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl sm:text-2xl font-light text-gray-400 mb-8 md:mb-12 tracking-wider"
                    >
                        TOP <span className="text-white font-bold">5</span> PROJECTS
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
                        {topProjects.map((project, index) => (
                            <MinimalProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Top 3 Clients - Origami Fold */}
                <div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl sm:text-2xl font-light text-gray-400 mb-8 md:mb-12 tracking-wider"
                    >
                        TOP <span className="text-white font-bold">3</span> CLIENTS
                    </motion.div>

                    <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 flex-wrap">
                        {topClients.map((client, index) => (
                            <OrigamiClientCard key={client.name} client={client} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
