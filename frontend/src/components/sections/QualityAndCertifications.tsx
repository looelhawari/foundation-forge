import { motion } from "framer-motion";
import { FileText, Building2, Shield, Award } from "lucide-react";

const certifications = [
    {
        title: "CR 108122",
        subtitle: "Commercial Registration",
        description: "Ministry of Commerce - Valid until 08/12/2029 - Est. 11/12/2017",
        icon: Building2,
        doc: "Commercial Registration Dec 2029.pdf"
    },
    {
        title: "14-1191-01",
        subtitle: "Establishment Card",
        description: "Ministry of Interior - Valid until 13/10/2028",
        icon: Shield,
        doc: "Computer Card 2028.pdf"
    },
    {
        title: "TIN 5000716308",
        subtitle: "Tax Registration Card",
        description: "General Tax Authority - Registered 11/12/2017",
        icon: FileText,
        doc: "CPC TAX CARD.pdf"
    },
    {
        title: "License 111698",
        subtitle: "Commercial License",
        description: "Trade License - Valid until 13/10/2029",
        icon: Award,
        doc: "CR Commercial Permit OCT 2029.pdf"
    }
];

const standards = [
    "Ministry of Commerce & Industry Registration",
    "Ministry of Interior Establishment Approval",
    "General Tax Authority Registered",
    "Licensed for Construction & General Contracting (Activity 4100001)",
    "Authorized for Roads & Pavements Construction (Activity 4210100)",
    "Qatar Chamber of Commerce Member"
];

const CertificationBadge = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
    const IconComponent = cert.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
        >
            {/* Badge container */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
                {/* Static outer ring */}
                <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id={`badge-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fbbf24" />
                                <stop offset="50%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="100"
                            cy="100"
                            r="95"
                            fill="none"
                            stroke={`url(#badge-grad-${index})`}
                            strokeWidth="2"
                            strokeDasharray="10 5"
                            className="group-hover:stroke-amber-400 transition-colors duration-300"
                        />
                    </svg>
                </div>

                {/* Badge seal shape */}
                <div className="absolute inset-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            d="M50 5 L53 40 L65 15 L60 45 L80 25 L68 50 L95 40 L75 55 L95 60 L68 50 L80 75 L60 55 L65 85 L53 60 L50 95 L47 60 L35 85 L40 55 L20 75 L32 50 L5 60 L25 55 L5 40 L32 50 L20 25 L40 45 L35 15 L47 40 Z"
                            fill={`url(#badge-grad-${index})`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.9 }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            viewport={{ once: true }}
                        />
                    </svg>
                </div>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <IconComponent className="w-10 h-10 mx-auto mb-2 text-amber-400" />
                        <div className="text-xl font-bold text-white mb-1">{cert.title}</div>
                        <div className="text-sm text-amber-400 mb-2">{cert.subtitle}</div>
                        <div className="text-xs text-gray-400 px-2">{cert.description}</div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export function QualityAndCertifications() {
    return (
        <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-gray-900 via-black to-black overflow-hidden">
            {/* Static watermark */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                    className="text-[20rem] font-bold text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap -rotate-45"
                >
                    LICENSED
                </div>
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
                        initial={{ opacity: 0, rotateX: -90 }}
                        whileInView={{ opacity: 1, rotateX: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        viewport={{ once: true }}
                    >
                        Legal Documents & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Registration</span>
                    </motion.h2>
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
                        Fully licensed and registered company with all required government approvals and permits
                    </motion.p>
                </motion.div>

                {/* Certification badges */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mb-12 md:mb-24">
                    {certifications.map((cert, index) => (
                        <CertificationBadge key={cert.title} cert={cert} index={index} />
                    ))}
                </div>

                {/* Standards grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 md:mb-12">
                        Our <span className="text-amber-400">Compliance</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {standards.map((standard, index) => (
                            <motion.div
                                key={standard}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    x: 10,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                                className="relative bg-gray-800/40 border border-gray-700 rounded-xl p-6 overflow-hidden group hover:border-amber-500/30 transition-colors duration-300"
                            >
                                {/* Checkmark icon with draw animation */}
                                <motion.svg
                                    className="w-8 h-8 text-amber-400 mb-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <motion.path
                                        d="M5 13l4 4L19 7"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    />
                                </motion.svg>

                                <p className="text-white font-medium">{standard}</p>

                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Trust statement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-12 md:mt-20 text-center"
                >
                    <motion.div
                        className="inline-block bg-gradient-to-r from-amber-400/10 to-orange-500/10 border border-amber-400/30 rounded-2xl px-6 sm:px-8 md:px-12 py-6 sm:py-8"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <p className="text-2xl text-white mb-2">
                            <span className="text-amber-400 font-bold">Fully Licensed</span> & Government Approved
                        </p>
                        <p className="text-gray-400">
                            All legal documents verified and up to date
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
