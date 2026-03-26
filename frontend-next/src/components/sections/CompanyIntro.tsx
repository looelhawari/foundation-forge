"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const CounterNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(target);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    // Reset to 0 then animate up
                    setCount(0);
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
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [target]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
};

export function CompanyIntro() {
    const t = useTranslations('companyIntro');
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Static grid background */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px"
                    }}
                />
            </div>

            <motion.div className="container mx-auto px-4 sm:px-6 relative z-10" style={{ opacity }}>
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 mb-4">
                            {t('title')}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-1 w-[200px] origin-center bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {t('subtitle')}
                    </motion.p>

                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {t('description')}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                                <CounterNumber target={57} suffix="+" />
                            </div>
                            <div className="text-gray-400">{t('stats.projects')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                                <CounterNumber target={8} suffix="+" />
                            </div>
                            <div className="text-gray-400">{t('stats.years')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                                <CounterNumber target={26} suffix="M+" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Three Column Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
                    {[
                        { titleKey: 'mission.title', contentKey: 'mission.content', delay: 0 },
                        { titleKey: 'objectives.title', contentKey: 'objectives.content', delay: 0.1 },
                        { titleKey: 'overview.title', contentKey: 'overview.content', delay: 0.2 }
                    ].map((item) => (
                        <motion.div
                            key={item.titleKey}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: item.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-gray-800/40 border border-white/10 hover:border-amber-500/30 transition-colors duration-300 group"
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
                                    {t(item.titleKey)}
                                </h3>
                                <div className="h-1 bg-gradient-to-r from-amber-400 to-transparent mb-6 w-16 group-hover:w-full transition-all duration-500" />
                                <p className="text-gray-300 leading-relaxed">
                                    {t(item.contentKey)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Responsibilities Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        {t('responsibilities')}
                    </h3>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-1 w-48 sm:w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8 md:mb-12"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { key: 'planning' },
                            { key: 'management' },
                            { key: 'supervision' },
                            { key: 'assurance' },
                            { key: 'safety' },
                            { key: 'control' }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.5
                                }}
                                viewport={{ once: true }}
                                className="p-4 sm:p-6 rounded-2xl bg-gray-800/30 border border-white/10 hover:border-amber-500/30 transition-colors duration-300 cursor-pointer"
                            >
                                <p className="text-white font-medium text-center">
                                    {t(`features.${feature.key}`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
