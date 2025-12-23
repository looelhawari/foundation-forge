import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const topProjects = [
    {
        id: 1,
        title: "School Bus Parking - Stage 2",
        client: "Ministry of Education",
        value: "2.1M QR",
        area: "22,000 m²",
        gradient: ["#fbbf24", "#f59e0b"]
    },
    {
        id: 2,
        title: "School Bus Parking - Stage 1",
        client: "Ministry of Education",
        value: "1.5M QR",
        area: "16,000 m²",
        gradient: ["#f59e0b", "#f97316"]
    },
    {
        id: 3,
        title: "Main Car Parking Area",
        client: "Ministry of Education",
        value: "950K QR",
        area: "11,400 m²",
        gradient: ["#f97316", "#ea580c"]
    },
    {
        id: 4,
        title: "FIFA World Cup 2022",
        client: "FIFA Qatar 2022",
        value: "736K QR",
        area: "45,000 m²",
        gradient: ["#ea580c", "#f59e0b"]
    },
    {
        id: 5,
        title: "Al Meera Branch",
        client: "Al Meera",
        value: "780K QR",
        area: "6,800 m²",
        gradient: ["#9ca3af", "#6b7280"]
    }
];

const topClients = [
    {
        name: "Ministry of Education",
        projects: "3 Major Projects",
        value: "4.55M QR",
        color: "#fbbf24"
    },
    {
        name: "FIFA World Cup Qatar 2022",
        projects: "International Event",
        value: "736K QR",
        color: "#f97316"
    },
    {
        name: "Qatar Museums",
        projects: "Heritage Sites",
        value: "865K QR",
        color: "#ea580c"
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
                className="relative h-[500px] rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Gradient overlay */}
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`
                    }}
                    animate={{
                        opacity: isHovered ? 0.4 : 0.2
                    }}
                />

                {/* Scan line effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ y: "-100%" }}
                    animate={isHovered ? { y: "100%" } : { y: "-100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                >
                    <div className="h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent blur-xl" />
                </motion.div>

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                    {/* Number indicator */}
                    <div className="flex items-start justify-between">
                        <motion.div
                            className="text-[120px] font-bold leading-none"
                            style={{
                                background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                opacity: 0.3
                            }}
                            animate={{
                                opacity: isHovered ? 0.5 : 0.3
                            }}
                        >
                            {project.id}
                        </motion.div>

                        {/* Badge */}
                        <motion.div
                            className="px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                            style={{
                                background: `linear-gradient(135deg, ${project.gradient[0]}20, ${project.gradient[1]}20)`,
                                border: `1px solid ${project.gradient[0]}40`
                            }}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                        >
                            <span style={{ color: project.gradient[0] }}>TOP {project.id}</span>
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
                            <p className="text-lg" style={{ color: project.gradient[0] }}>
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
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                <span>{project.area}</span>
                            </div>
                            <div className="h-4 w-px bg-gray-700" />
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                <span className="font-bold text-white">{project.value}</span>
                            </div>
                        </motion.div>

                        {/* Hover button */}
                        <motion.button
                            className="w-full py-4 rounded-xl font-medium backdrop-blur-sm border border-white/20 text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: `linear-gradient(135deg, ${project.gradient[0]}15, ${project.gradient[1]}15)`
                            }}
                        >
                            View Project Details
                        </motion.button>
                    </div>
                </div>

                {/* Corner accent */}
                <svg className="absolute top-0 right-0 w-32 h-32 opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M 128 0 L 128 128 L 0 128"
                        stroke={project.gradient[0]}
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
            className="relative w-72 h-80"
            style={{ transformStyle: "preserve-3d", perspective: 1500 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            {/* Front face */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8 flex flex-col items-center justify-center"
                style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d"
                }}
                animate={{
                    rotateY: isFlipped ? 180 : 0,
                    z: isFlipped ? -50 : 0
                }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGFwZXIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXBlcikiLz48L3N2Zz4=')] opacity-20" />

                {/* Fold crease lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke={client.color} strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke={client.color} strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke={client.color} strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke={client.color} strokeWidth="1" strokeDasharray="5,5" />
                </svg>

                <motion.div
                    className="text-6xl font-bold mb-4 relative z-10"
                    style={{ color: client.color }}
                    animate={{
                        textShadow: [
                            `0 0 20px ${client.color}`,
                            `0 0 40px ${client.color}`,
                            `0 0 20px ${client.color}`
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {client.name.split(" ").map(word => word[0]).join("")}
                </motion.div>
                <h4 className="text-xl font-bold text-white text-center relative z-10">
                    {client.name}
                </h4>
            </motion.div>

            {/* Back face */}
            <motion.div
                className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-center"
                style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    rotateY: 180,
                    background: `linear-gradient(135deg, ${client.color}20, ${client.color}40)`
                }}
                animate={{
                    rotateY: isFlipped ? 360 : 180,
                    z: isFlipped ? 0 : -50
                }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isFlipped ? 1 : 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    >
                        <p className="text-gray-300 text-lg">{client.projects}</p>
                        <p className="text-3xl font-bold mt-2" style={{ color: client.color }}>
                            {client.value}
                        </p>
                    </motion.div>

                    {/* Accordion stats */}
                    <motion.div
                        className="space-y-2"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isFlipped ? "auto" : 0,
                            opacity: isFlipped ? 1 : 0
                        }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <div className="bg-black/30 rounded-lg p-3">
                            <p className="text-white/60 text-sm">Status</p>
                            <p className="text-white font-bold">Active Partner</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-3">
                            <p className="text-white/60 text-sm">Rating</p>
                            <p className="text-amber-400 font-bold">⭐⭐⭐⭐⭐</p>
                        </div>
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
        <section className="relative py-32 bg-black overflow-hidden">
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
                    className="text-center mb-20"
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
