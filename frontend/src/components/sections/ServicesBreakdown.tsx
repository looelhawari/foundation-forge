import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const services = [
    {
        title: "Earth Works",
        description: "Comprehensive earthmoving, excavation, and land preparation services for all construction needs.",
        features: ["Site Clearing", "Excavation", "Grading", "Compaction"],
        gradient: ["#fbbf24", "#f59e0b"],
        pattern: "M0 0h40v40H0z M20 0h40v40H20z"
    },
    {
        title: "Sub-Grade & Sub-Base",
        description: "Professional sub-grade and sub-base preparation ensuring solid foundation for all road projects.",
        features: ["Layer Preparation", "Material Testing", "Compaction Control", "Quality Assurance"],
        gradient: ["#f59e0b", "#ea580c"],
        pattern: "M0 0l20 20M20 0L0 20M20 20l20 20M40 20L20 40"
    },
    {
        title: "Asphalt Works",
        description: "Expert asphalt paving and road surfacing using latest technology and quality materials.",
        features: ["Hot Mix Asphalt", "Cold Mix Asphalt", "Surface Treatment", "Maintenance"],
        gradient: ["#6b7280", "#4b5563"],
        pattern: "M20 0v40M0 20h40"
    },
    {
        title: "Traffic Signs & Road Marking",
        description: "Complete traffic management solutions including signage installation and road marking services.",
        features: ["Thermoplastic Marking", "Sign Installation", "Safety Measures", "Line Marking"],
        gradient: ["#eab308", "#fbbf24"],
        pattern: "M0 0h20v20H0zM20 20h20v20H20z"
    },
    {
        title: "Interlock & Kerbstone",
        description: "Precision installation of interlocking pavers and kerbstones for aesthetic and functional excellence.",
        features: ["Paver Installation", "Kerbstone Laying", "Pattern Design", "Finishing Works"],
        gradient: ["#ea580c", "#f97316"],
        pattern: "M10 0L20 10L10 20L0 10z"
    },
    {
        title: "Rod & Steel Works",
        description: "Structural steel reinforcement and rod work for concrete structures and foundations.",
        features: ["Rebar Installation", "Steel Fabrication", "Structural Support", "Quality Control"],
        gradient: ["#9ca3af", "#6b7280"],
        pattern: "M0 0L40 40M40 0L0 40"
    }
];

// Magnetic card component
const MagneticCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            initial={{ opacity: 0, scale: 0.8, z: -100 }}
            whileInView={{ opacity: 1, scale: 1, z: 0 }}
            transition={{
                duration: 0.7,
                delay: index * 0.15,
                type: "spring",
                stiffness: 80
            }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
};

// SVG animated pattern background
const AnimatedPattern = ({ pattern, gradient }: { pattern: string; gradient: string[] }) => {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={`grad-${gradient[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: gradient[0], stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: gradient[1], stopOpacity: 1 }} />
                </linearGradient>
                <pattern id={`pattern-${gradient[0]}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <motion.path
                        d={pattern}
                        stroke={`url(#grad-${gradient[0]})`}
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${gradient[0]})`} />
        </svg>
    );
};

// Reveal text with mask animation
const RevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
        <motion.div
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1, delay, ease: "easeInOut" }}
            viewport={{ once: true }}
        >
            {text}
        </motion.div>
    );
};

// Ripple effect on hover
const RippleButton = ({ children, gradient }: { children: React.ReactNode; gradient: string[] }) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { x, y, id: Date.now() };
        setRipples([...ripples, newRipple]);
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
    };

    return (
        <div className="relative overflow-hidden cursor-pointer" onClick={handleClick}>
            {children}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 10,
                        height: 10,
                        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
                    }}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 30, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            ))}
        </div>
    );
};

// Elastic bounce animation for features
const ElasticFeature = ({ text, index }: { text: string; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15
            }}
            whileHover={{
                x: 10,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-gray-300"
        >
            <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                whileHover={{ scale: 2 }}
                transition={{ type: "spring", stiffness: 500 }}
            />
            <span>{text}</span>
        </motion.div>
    );
};

export function ServicesBreakdown() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
            {/* Parallax wave background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-20"
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#fbbf24", stopOpacity: 0.3 }} />
                            <stop offset="50%" style={{ stopColor: "#f97316", stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: "#ea580c", stopOpacity: 0.3 }} />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 V200 H0 Z"
                        fill="url(#wave-gradient)"
                        initial={{ d: "M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 V200 H0 Z" }}
                        animate={{
                            d: [
                                "M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 V200 H0 Z",
                                "M0,100 Q250,150 500,100 T1000,100 T1500,100 T2000,100 V200 H0 Z",
                                "M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 V200 H0 Z"
                            ]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M0,150 Q250,100 500,150 T1000,150 T1500,150 T2000,150 V250 H0 Z"
                        fill="url(#wave-gradient)"
                        opacity="0.5"
                        initial={{ d: "M0,150 Q250,100 500,150 T1000,150 T1500,150 T2000,150 V250 H0 Z" }}
                        animate={{
                            d: [
                                "M0,150 Q250,100 500,150 T1000,150 T1500,150 T2000,150 V250 H0 Z",
                                "M0,150 Q250,200 500,150 T1000,150 T1500,150 T2000,150 V250 H0 Z",
                                "M0,150 Q250,100 500,150 T1000,150 T1500,150 T2000,150 V250 H0 Z"
                            ]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                </svg>
            </motion.div>

            {/* Spotlight effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: [
                        "radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.15), transparent 50%)",
                        "radial-gradient(circle at 70% 60%, rgba(249, 115, 22, 0.15), transparent 50%)",
                        "radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.15), transparent 50%)"
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <motion.div className="container mx-auto px-6 relative z-10" style={{ scale }}>
                {/* Header with split reveal animation */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-sm tracking-[0.3em] text-amber-400 mb-4 uppercase">
                            <RevealText text="WHAT WE DO" />
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0, rotateZ: -180 }}
                        whileInView={{ scale: 1, rotateZ: 0 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold">
                            <span className="text-white">Our </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
                                Services
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "300px", opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        Comprehensive construction solutions tailored to your project needs
                    </motion.p>
                </div>

                {/* Services grid with magnetic 3D cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <MagneticCard key={service.title} index={index}>
                            <RippleButton gradient={service.gradient}>
                                <motion.div
                                    className="relative h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 overflow-hidden group"
                                    whileHover={{ borderColor: service.gradient[0] }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Animated SVG pattern background */}
                                    <AnimatedPattern pattern={service.pattern} gradient={service.gradient} />

                                    {/* Gradient overlay on hover */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-20"
                                        style={{
                                            background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Corner accent with draw animation */}
                                    <svg className="absolute top-0 right-0 w-20 h-20 opacity-30" xmlns="http://www.w3.org/2000/svg">
                                        <motion.path
                                            d="M80 0 L80 80 L0 80"
                                            stroke={service.gradient[0]}
                                            strokeWidth="2"
                                            fill="none"
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, delay: index * 0.2 }}
                                            viewport={{ once: true }}
                                        />
                                    </svg>

                                    <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                                        {/* Title with character stagger */}
                                        <motion.h3
                                            className="text-2xl font-bold text-white mb-4"
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                        >
                                            {service.title.split("").map((char, i) => (
                                                <motion.span
                                                    key={i}
                                                    variants={{
                                                        hidden: { opacity: 0, y: 50, rotateX: -90 },
                                                        visible: { opacity: 1, y: 0, rotateX: 0 }
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: index * 0.1 + i * 0.03
                                                    }}
                                                    style={{ display: "inline-block" }}
                                                >
                                                    {char === " " ? "\u00A0" : char}
                                                </motion.span>
                                            ))}
                                        </motion.h3>

                                        {/* Animated divider */}
                                        <motion.div
                                            className="h-px mb-4"
                                            style={{
                                                background: `linear-gradient(90deg, ${service.gradient[0]}, ${service.gradient[1]})`
                                            }}
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            transition={{ duration: 0.8, delay: index * 0.15 }}
                                            viewport={{ once: true }}
                                        />

                                        {/* Description with fade in */}
                                        <motion.p
                                            className="text-gray-400 mb-6 leading-relaxed"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            {service.description}
                                        </motion.p>

                                        {/* Features with elastic animation */}
                                        <div className="space-y-2">
                                            {service.features.map((feature, fIndex) => (
                                                <ElasticFeature key={feature} text={feature} index={fIndex} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Glow effect on hover */}
                                    <motion.div
                                        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl"
                                        style={{
                                            background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </motion.div>
                            </RippleButton>
                        </MagneticCard>
                    ))}
                </div>

                {/* Call to action with bounce */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <motion.p
                        className="text-2xl text-gray-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        Need a custom solution? <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-bold">We're here to help</span>
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    );
}
