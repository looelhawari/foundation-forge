import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import processBg from "@/assets/real-process-bg.jpg";
import process1 from "@/assets/process-1.jpg";
import process2 from "@/assets/process-2.jpg";
import process3 from "@/assets/process-3.jpg";
import process4 from "@/assets/process-4.jpg";
import process5 from "@/assets/process-5.jpg";
import process6 from "@/assets/process-6.jpg";

const processSteps = [
    {
        step: "01",
        title: "Initial Consultation",
        description: "Understanding your project requirements, site conditions, and objectives through detailed discussions",
        tasks: ["Site Assessment", "Requirements Analysis", "Budget Discussion", "Timeline Planning"],
        image: process1
    },
    {
        step: "02",
        title: "Planning & Design",
        description: "Developing comprehensive project plans with technical specifications and resource allocation",
        tasks: ["Technical Design", "Material Selection", "Resource Planning", "Risk Assessment"],
        image: process2
    },
    {
        step: "03",
        title: "Approval & Permits",
        description: "Securing necessary approvals and permits from relevant authorities",
        tasks: ["Documentation", "Authority Coordination", "Permit Acquisition", "Compliance Check"],
        image: process3
    },
    {
        step: "04",
        title: "Mobilization",
        description: "Deploying equipment, materials, and skilled workforce to the project site",
        tasks: ["Site Preparation", "Equipment Deployment", "Team Assignment", "Safety Setup"],
        image: process4
    },
    {
        step: "05",
        title: "Execution",
        description: "Implementing the project plan with continuous monitoring and quality control",
        tasks: ["Construction Work", "Quality Testing", "Progress Monitoring", "Safety Inspection"],
        image: process5
    },
    {
        step: "06",
        title: "Completion & Handover",
        description: "Final inspection, documentation, and project handover to client",
        tasks: ["Final Inspection", "Documentation", "Client Training", "Warranty Activation"],
        image: process6
    }
];

export function ProcessTimeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={processBg}
                    alt="CPC construction process"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-black/85 to-gray-900/90" />
            </div>

            {/* Animated circuit board pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <motion.path
                                d="M10 50 L30 50 L30 30 L50 30 L50 70 L70 70 L70 50 L90 50"
                                stroke="#fbbf24"
                                strokeWidth="1"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                            />
                            <circle cx="30" cy="50" r="3" fill="#f97316" />
                            <circle cx="50" cy="70" r="3" fill="#ea580c" />
                            <circle cx="70" cy="50" r="3" fill="#fbbf24" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 px-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                        viewport={{ once: true }}
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Process</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6 md:mb-8"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
                    >
                        From consultation to completion - Our proven 6-step methodology
                    </motion.p>
                </motion.div>

                {/* Vertical timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Animated center line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 md:-translate-x-1/2">
                        <motion.div
                            className="w-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Timeline steps */}
                    {processSteps.map((process, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={process.step}
                                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                    type: "spring",
                                    stiffness: 80
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative mb-16 md:mb-24 last:mb-0"
                            >
                                <div className={`flex items-center gap-4 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Content card */}
                                    <motion.div
                                        className="w-full md:w-5/12 ml-16 md:ml-0"
                                        whileHover={{ scale: 1.05, x: isEven ? 10 : -10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden group">
                                            {/* Project Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={process.image}
                                                    alt={process.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                                                {/* Step number overlay on image */}
                                                <motion.div
                                                    className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold text-lg sm:text-xl md:text-2xl"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 0 0 rgba(251, 191, 36, 0.7)",
                                                            "0 0 0 20px rgba(251, 191, 36, 0)",
                                                            "0 0 0 0 rgba(251, 191, 36, 0)"
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: index * 0.3
                                                    }}
                                                >
                                                    {process.step}
                                                </motion.div>
                                            </div>

                                            <div className="p-4 sm:p-6 md:p-8">
                                                {/* Glow effect on hover */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10"
                                                    transition={{ duration: 0.3 }}
                                                />

                                                {/* Title */}
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                                                    {process.title}
                                                </h3>

                                                {/* Divider */}
                                                <motion.div
                                                    className="h-px bg-gradient-to-r from-amber-400 to-transparent mb-4"
                                                    initial={{ scaleX: 0 }}
                                                    whileInView={{ scaleX: 1 }}
                                                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                                                    viewport={{ once: true }}
                                                />

                                                {/* Description */}
                                                <p className="text-sm sm:text-base text-gray-400 mb-3 md:mb-4">
                                                    {process.description}
                                                </p>

                                                {/* Tasks list */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {process.tasks.map((task, taskIndex) => (
                                                        <motion.div
                                                            key={task}
                                                            className="flex items-center gap-2 text-xs sm:text-sm text-gray-500"
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: index * 0.2 + taskIndex * 0.1
                                                            }}
                                                            viewport={{ once: true }}
                                                        >
                                                            <motion.div
                                                                className="w-1.5 h-1.5 rounded-full bg-amber-400"
                                                                animate={{
                                                                    scale: [1, 1.5, 1],
                                                                    opacity: [0.5, 1, 0.5]
                                                                }}
                                                                transition={{
                                                                    duration: 2,
                                                                    repeat: Infinity,
                                                                    delay: taskIndex * 0.2
                                                                }}
                                                            />
                                                            {task}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Center node with animated circle */}
                                    <div className="hidden md:flex md:w-2/12 justify-center">
                                        <motion.div
                                            className="relative w-16 h-16 md:w-20 md:h-20"
                                            initial={{ scale: 0, rotate: -180 }}
                                            whileInView={{ scale: 1, rotate: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.2,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            {/* Outer rotating ring */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 10,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            />

                                            {/* Inner pulsing circle */}
                                            <motion.div
                                                className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [1, 0.8, 1]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.3
                                                }}
                                            />

                                            {/* Center dot */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    className="w-4 h-4 rounded-full bg-white"
                                                    animate={{
                                                        scale: [1, 1.5, 1]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        delay: index * 0.2
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden md:block md:w-5/12" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
