"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
const whyChooseBg = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312048/cpc-website/real-why-choose-bg.jpg";
const whyChoose1 = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312072/cpc-website/why-choose-1.jpg";
const whyChoose2 = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312053/cpc-website/services/expert_team.jpg";
const whyChoose3 = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312074/cpc-website/why-choose-3.jpg";
const whyChoose4 = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312067/cpc-website/techno.jpg";
const whyChoose5 = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312077/cpc-website/why-choose-5.jpg";
const whyChoose6 = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312079/cpc-website/why-choose-6.jpg";

const advantageImages = [whyChoose1, whyChoose2, whyChoose3, whyChoose4, whyChoose5, whyChoose6];
const advantageKeys = ['proven', 'expert', 'quality', 'technology', 'timely', 'satisfaction'];

const BRAND_COLOR = "#f59e0b";

export function WhyChooseUs() {
    const t = useTranslations('whyChooseUs');
    
    return (
        <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-black via-gray-900 to-gray-900 overflow-hidden">
            {/* Background Image — hidden on mobile to save bandwidth */}
            <div className="absolute inset-0 hidden md:block">
                <img
                    src={whyChooseBg}
                    alt={t('bgAlt')}
                    className="w-full h-full object-cover opacity-10"
                    width={1920}
                    height={1080}
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
                        {t('whyChoose')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{t('cpcQatar')}</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {advantageKeys.map((key, index) => (
                        <motion.div
                            key={key}
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
                                        src={advantageImages[index]}
                                        alt={`CPC Qatar — ${t(`advantages.${key}.title`)}: ${t(`advantages.${key}.description`)}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        width={600}
                                        height={400}
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
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {t(`advantages.${key}.title`)}
                                    </h3>

                                    {/* Divider — uses transform for composited animation */}
                                    <div
                                        className="h-px mb-4 w-full origin-left transition-transform duration-500"
                                        style={{
                                            background: `linear-gradient(90deg, ${BRAND_COLOR}, transparent)`,
                                            transform: 'scaleX(0.25)',
                                        }}
                                    />

                                    {/* Description */}
                                    <p className="text-gray-300 leading-relaxed">
                                        {t(`advantages.${key}.description`)}
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
