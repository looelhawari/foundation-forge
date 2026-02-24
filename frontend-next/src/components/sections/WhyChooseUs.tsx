"use client";

import { motion } from "framer-motion";
const whyChooseBg = "/assets/real-why-choose-bg.jpg";
const whyChoose1 = "/assets/why-choose-1.jpg";
const whyChoose2 = "/assets/services/expert team.webp";
const whyChoose3 = "/assets/why-choose-3.jpg";
const whyChoose4 = "/assets/techno.jpg";
const whyChoose5 = "/assets/why-choose-5.jpg";
const whyChoose6 = "/assets/why-choose-6.jpg";

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
        description: "Constructing lasting relationships through exceptional performance and exceeding client expectations",
        image: whyChoose6
    }
];

const BRAND_COLOR = "#f59e0b";

export function WhyChooseUs() {
    return (
        <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-black via-gray-900 to-gray-900 overflow-hidden">
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

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 px-4">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">CPC Qatar</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                        Six compelling reasons that set us apart in Qatar's construction industry
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {advantages.map((advantage, index) => (
                        <motion.div
                            key={advantage.number}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="relative h-full bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-colors duration-300">
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={advantage.image}
                                        alt={advantage.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                                </div>

                                <div className="p-5 sm:p-6 md:p-8">
                                    {/* Number */}
                                    <div
                                        className="text-4xl font-bold mb-4 opacity-60"
                                        style={{ color: BRAND_COLOR }}
                                    >
                                        {advantage.number}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {advantage.title}
                                    </h3>

                                    {/* Divider */}
                                    <div
                                        className="h-px mb-4 w-16 group-hover:w-full transition-all duration-500"
                                        style={{
                                            background: `linear-gradient(90deg, ${BRAND_COLOR}, transparent)`
                                        }}
                                    />

                                    {/* Description */}
                                    <p className="text-gray-400 leading-relaxed">
                                        {advantage.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
