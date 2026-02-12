import { motion } from "framer-motion";
import { useRef } from "react";
import whyChooseBg from "@/assets/real-why-choose-bg.jpg";
import whyChoose1 from "@/assets/why-choose-1.jpg";
import whyChoose2 from "@/assets/services/expert team.webp";
import whyChoose3 from "@/assets/why-choose-3.jpg";
import whyChoose4 from "@/assets/techno.jpg";
import whyChoose5 from "@/assets/why-choose-5.jpg";
import whyChoose6 from "@/assets/why-choose-6.jpg";

const advantages = [
    {
        number: "01",
        title: "Proven Track Record",
        description: "Over 57 successfully completed projects with government ministries, international events, and private sector leaders",
        image: whyChoose1
    },
    {
        number: "02",
        title: "Expert Team",
        description: "Highly qualified personnel with specialized expertise in road construction, earthworks, and infrastructure development",
        image: whyChoose2
    },
    {
        number: "03",
        title: "Quality Assurance",
        description: "Rigorous quality control measures ensuring excellence in workmanship and adherence to international standards",
        image: whyChoose3
    },
    {
        number: "04",
        title: "Latest Technology",
        description: "Utilizing cutting-edge equipment and modern construction techniques for efficient project delivery",
        image: whyChoose4
    },
    {
        number: "05",
        title: "Timely Completion",
        description: "Strong project management ensuring on-time delivery without compromising quality or safety standards",
        image: whyChoose5
    },
    {
        number: "06",
        title: "Client Satisfaction",
        description: "Building lasting relationships through exceptional performance and exceeding client expectations",
        image: whyChoose6
    }
];

// Unified brand color
const BRAND_COLOR = "#f59e0b"; // Amber-500 matching website identity

// Hexagon shape component
const Hexagon = ({ index }: { index: number }) => {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                stroke={BRAND_COLOR}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                transition={{
                    duration: 2,
                    delay: index * 0.15,
                    ease: "easeInOut"
                }}
                viewport={{ once: true }}
            />
        </svg>
    );
};

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export function WhyChooseUs() {
    return (
        <section className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-gray-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={whyChooseBg}
                    alt="CPC construction project"
                    className="w-full h-full object-cover opacity-10"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/80 to-gray-900/90" />
            </div>

            {/* Floating hexagons background - only on desktop, reduced count */}
            {!isMobile && (
                <div className="absolute inset-0 opacity-10">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-64 h-64"
                            style={{
                                top: `${20 + i * 30}%`,
                                left: `${10 + i * 35}%`
                            }}
                        >
                            <Hexagon index={i} />
                        </div>
                    ))}
                </div>
            )}

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 px-4">
                            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">CPC Qatar</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
                    >
                        Six compelling reasons that set us apart in Qatar's construction industry
                    </motion.p>
                </motion.div>

                {/* Isometric hexagon grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {advantages.map((advantage, index) => (
                        <motion.div
                            key={advantage.number}
                            initial={{ opacity: 0, y: 100, rotateX: -45, rotateY: -45 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 80
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 10,
                                rotateX: -10,
                                transition: { duration: 0.3 }
                            }}
                            className="relative group"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px"
                            }}
                        >
                            {/* Card container */}
                            <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={advantage.image}
                                        alt={advantage.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                                </div>

                                <div className="p-8">
                                    {/* Hexagon background */}
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                                        <Hexagon index={index} />
                                    </div>

                                    {/* Animated number with orbital rotation */}
                                    <motion.div
                                        className="relative w-20 h-20 mb-6"
                                        animate={{
                                            rotate: 360
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 opacity-30"
                                            style={{ borderColor: BRAND_COLOR }}
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.3, 0.6, 0.3]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
                                            style={{ color: BRAND_COLOR }}
                                            animate={{
                                                rotate: -360
                                            }}
                                            transition={{
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            {advantage.number}
                                        </motion.div>
                                    </motion.div>

                                    {/* Title with stagger animation */}
                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-4"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        {advantage.title.split("").map((char, i) => (
                                            <motion.span
                                                key={i}
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 }
                                                }}
                                                transition={{
                                                    duration: 0.3,
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
                                            background: `linear-gradient(90deg, ${BRAND_COLOR}, transparent)`
                                        }}
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                                        viewport={{ once: true }}
                                    />

                                    {/* Description */}
                                    <motion.p
                                        className="text-gray-400 leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        {advantage.description}
                                    </motion.p>

                                    {/* Hover glow effect */}
                                    <motion.div
                                        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl -z-10"
                                        style={{
                                            background: `linear-gradient(135deg, ${BRAND_COLOR}, transparent)`
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    {/* Corner dots animation */}
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        {[0, 1, 2].map((dot) => (
                                            <motion.div
                                                key={dot}
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: BRAND_COLOR }}
                                                animate={{
                                                    scale: [1, 1.5, 1],
                                                    opacity: [0.3, 1, 0.3]
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    delay: dot * 0.2
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
