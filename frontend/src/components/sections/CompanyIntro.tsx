import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const introData = {
    title: "WHO WE ARE",
    subtitle: "Building Excellence",
    description: "Established in 2017, we've completed over 57 projects across Doha and beyond, serving government ministries, private developers, and international clients",

    mission: {
        title: "Mission",
        content: "To sustain the high level of qualified personnel and build a Professional team committed to serve our clients. Our pledge is to establish lasting relationships with our customers by exceeding their Expectations and gaining their trust, through exceptional Performance by every member of the construction team."
    },

    objectives: {
        title: "Objectives",
        content: "To be one of the leading firms in the state of Qatar in the field of road Construction. CPC will do the best to offer excellent services by providing high quality of work and applying the latest available technology for the industry."
    },

    overview: {
        title: "Overview",
        content: "CPC QATAR established to accept new challenges in Earthworks field especially Construction of Asphalt Pavements and Road Marking. CPC QATAR has proved its capacity to undertake projects in its related fields due to excellence in workmanship, professionalism and timely completion. Guided by able and experienced management, coupled by able and specialized staff in each of its divisions."
    }
};

const features = [
    "Project Planning",
    "Construction Management",
    "Engineering Supervision",
    "Quality Assurance",
    "Safety Inspection",
    "Project Cost Control"
];

// Floating geometric shapes component
const FloatingShape = ({ delay = 0, duration = 20, size = 100, top = "20%", left = "10%" }: { delay?: number; duration?: number; size?: number; top?: string; left?: string }) => (
    <motion.div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
            width: size,
            height: size,
            top,
            left,
            background: "linear-gradient(135deg, #fbbf24, #f97316, #ea580c)"
        }}
        animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

// Animated text reveal component
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const words = text.split(" ");

    return (
        <span>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        delay: delay + i * 0.05,
                        duration: 0.5,
                        ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    className="inline-block mr-[0.3em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

// Counter animation component
const CounterNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
};

export function CompanyIntro() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Animated Background Gradients */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3), transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.3), transparent 50%)",
                        "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.3), transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3), transparent 50%)"
                    ]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Geometric Shapes */}
            <FloatingShape size={200} top="10%" left="5%" duration={25} />
            <FloatingShape size={150} top="60%" left="80%" duration={20} delay={2} />
            <FloatingShape size={180} top="30%" left="70%" duration={30} delay={4} />
            <FloatingShape size={120} top="80%" left="20%" duration={22} delay={1} />

            {/* Animated Grid Lines */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px"
                    }}
                    animate={{
                        backgroundPosition: ["0px 0px", "50px 50px"]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity, scale }}>
                {/* Header with Parallax */}
                <motion.div style={{ y }} className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 mb-4">
                            <AnimatedText text={introData.title} />
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "200px" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <AnimatedText text={introData.subtitle} delay={0.3} />
                    </motion.p>

                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <AnimatedText text={introData.description} delay={0.5} />
                    </motion.p>

                    {/* Animated Stats */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-12"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                                <CounterNumber target={57} suffix="+" />
                            </div>
                            <div className="text-gray-400">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                                <CounterNumber target={8} suffix="+" />
                            </div>
                            <div className="text-gray-400">Years</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                                <CounterNumber target={26} suffix="M+" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Three Column Cards with Liquid Morphing Backgrounds */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
                    {[
                        { data: introData.mission, gradient: ["#fbbf24", "#f59e0b", "#f97316"], delay: 0 },
                        { data: introData.objectives, gradient: ["#f59e0b", "#f97316", "#ea580c"], delay: 0.2 },
                        { data: introData.overview, gradient: ["#9ca3af", "#6b7280", "#4b5563"], delay: 0.4 }
                    ].map((item, index) => (
                        <motion.div
                            key={item.data.title}
                            initial={{ opacity: 0, y: 100, rotateX: -30 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: item.delay, duration: 0.8, ease: "backOut" }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.05,
                                y: -20,
                                rotateY: 5,
                                transition: { duration: 0.3 }
                            }}
                            className="relative p-8 rounded-3xl backdrop-blur-sm border border-white/20 group overflow-hidden"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px"
                            }}
                        >
                            {/* Animated Liquid Background */}
                            <motion.div
                                className="absolute inset-0 opacity-20 blur-2xl"
                                animate={{
                                    background: [
                                        `radial-gradient(circle at 0% 0%, ${item.gradient[0]}, transparent 50%)`,
                                        `radial-gradient(circle at 100% 100%, ${item.gradient[1]}, transparent 50%)`,
                                        `radial-gradient(circle at 50% 50%, ${item.gradient[2]}, transparent 50%)`,
                                        `radial-gradient(circle at 0% 0%, ${item.gradient[0]}, transparent 50%)`
                                    ]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Animated Border */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: `linear-gradient(45deg, ${item.gradient.join(", ")})`,
                                    padding: "2px",
                                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    WebkitMaskComposite: "xor",
                                    maskComposite: "exclude"
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="relative z-10">
                                {/* Title with character animation */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: item.delay + 0.3, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
                                        {item.data.title.split("").map((char, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: item.delay + 0.4 + i * 0.05 }}
                                                viewport={{ once: true }}
                                                className="inline-block"
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </h3>
                                    <motion.div
                                        className="h-1 bg-gradient-to-r from-amber-400 to-transparent"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        transition={{ delay: item.delay + 0.6, duration: 0.8 }}
                                        viewport={{ once: true }}
                                    />
                                </motion.div>

                                <motion.p
                                    className="text-gray-300 leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: item.delay + 0.8, duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    {item.data.content}
                                </motion.p>
                            </div>

                            {/* Hover Glow Effect */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at center, ${item.gradient[1]}20, transparent 70%)`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Responsibilities Grid with Wave Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <motion.h3
                        className="text-4xl font-bold text-white mb-4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        viewport={{ once: true }}
                    >
                        Project Responsibilities
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-1 w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.6,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.15,
                                    rotateZ: 5,
                                    transition: { duration: 0.2 }
                                }}
                                className="relative p-6 rounded-2xl backdrop-blur-sm border border-white/10 group overflow-hidden cursor-pointer"
                            >
                                {/* Animated Background on Hover */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                    initial={false}
                                    animate={{
                                        background: [
                                            "linear-gradient(135deg, rgba(251, 191, 36, 0.1), transparent)",
                                            "linear-gradient(225deg, rgba(249, 115, 22, 0.1), transparent)",
                                            "linear-gradient(315deg, rgba(236, 72, 153, 0.1), transparent)",
                                            "linear-gradient(135deg, rgba(251, 191, 36, 0.1), transparent)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Animated Corner Accent */}
                                <motion.div
                                    className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-400/50 to-transparent opacity-0 group-hover:opacity-100"
                                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                                    initial={false}
                                    whileHover={{ scale: 1.5, rotate: 90 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <motion.p
                                    className="relative z-10 text-white font-medium text-center"
                                    animate={{
                                        color: ["#ffffff", "#fbbf24", "#ffffff"]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: index * 0.2
                                    }}
                                >
                                    {feature}
                                </motion.p>

                                {/* Particle Effect on Hover */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    initial={false}
                                >
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-amber-400 rounded-full"
                                            style={{
                                                top: "50%",
                                                left: "50%"
                                            }}
                                            animate={{
                                                x: [0, (Math.random() - 0.5) * 100],
                                                y: [0, (Math.random() - 0.5) * 100],
                                                opacity: [0, 1, 0],
                                                scale: [0, 1.5, 0]
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                                repeatDelay: 2
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                viewport={{ once: true }}
            />
        </section>
    );
}
