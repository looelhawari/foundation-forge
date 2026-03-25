"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, Download, ExternalLink, Shield, Award, CheckCircle } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/lib/i18n/client";

// Certificate PDFs served from public/cert/
const commercialRegistration = "/cert/Commercial Registration Dec 2029.pdf";
const computerCard = "/cert/Computer Card 2028.pdf";
const taxCard = "/cert/CPC TAX CARD.pdf";
const commercialPermit = "/cert/CR Commercial Permit OCT 2029.pdf";

const certFiles = [commercialRegistration, computerCard, taxCard, commercialPermit];
const certIcons = [FileText, Award, Shield, CheckCircle];
const certColors = [
    "from-blue-500 to-blue-600",
    "from-emerald-500 to-emerald-600",
    "from-amber-500 to-amber-600",
    "from-purple-500 to-purple-600"
];

const Certificates = () => {
    const { t } = useTranslation('certificates');
    const [selectedCert, setSelectedCert] = useState<number | null>(null);

    // Get translations with proper guards
    const certificatesData = t('certificates', { returnObjects: true });
    const statsData = t('stats', { returnObjects: true });

    const certificates = Array.isArray(certificatesData) ? certificatesData as Array<{ title: string; description: string; validUntil: string }> : [];
    const stats = Array.isArray(statsData) ? statsData as Array<{ value: string; label: string }> : [];

    return (
        <div className="min-h-screen bg-background">
            <SEOHead
                title="Certificates & Legal Documents | Licensed Contractor CR 108122 | CPC Qatar"
                description="View CPC Qatar's official certificates — Commercial Registration CR 108122, Tax Card, Establishment Card & Commercial License. Fully licensed, government-approved contractor in Doha, Qatar."
                canonical="/certificates"
                arDescription="شهادات شركة كوزمو للمشاريع والإنشاءات — السجل التجاري والتراخيص الرسمية في قطر"
                keywords="CPC Qatar certificates, licensed contractor Qatar CR 108122, government approved construction Qatar, شهادات شركة مقاولات قطر"
            />
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            {t('hero.tag')}
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-6">
                            {t('hero.title.prefix')} <span className="text-gradient">{t('hero.title.highlight')}</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('hero.description')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Certificates Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {certificates.map((cert, index) => {
                            const IconComponent = certIcons[index];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${certColors[index]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                                        {cert.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                        {cert.description}
                                    </p>

                                    {/* Valid Until Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium mb-6">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        {t('actions.validUntil')} {cert.validUntil}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href={certFiles[index]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {t('actions.viewDocument')}
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                            {t('trust.title')}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('trust.description')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 bg-background rounded-xl border border-border"
                            >
                                <div className="font-display text-3xl md:text-4xl text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Certificates;
