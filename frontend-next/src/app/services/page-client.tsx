"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n/client";

const serviceImages = [
    "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312049/cpc-website/services/asphalt.jpg",
    "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312058/cpc-website/services/road-markings-masters.jpg",
    "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg",
    "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312054/cpc-website/services/interllock.jpg",
    "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312062/cpc-website/services/subgrade_and_subbase.jpg",
    "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg"
];

export default function ServicesPageClient() {
    const { t } = useTranslation('services');
    const services = t('services', { returnObjects: true }) as Array<{
        title: string;
        slug: string;
        description: string;
        features: string[];
    }>;
    const seoParagraphs = t('seo.paragraphs', { returnObjects: true }) as string[];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                {/* Hero */}
                <section className="pt-32 pb-16 bg-gradient-to-b from-background to-card">
                    <div className="container mx-auto px-6 max-w-5xl text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block"
                        >
                            {t('page.tag')}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6"
                        >
                            {t('page.title.prefix')} <span className="text-gradient">{t('page.title.highlight')}</span>
                            <span className="sr-only">
                                {" "}— Road Construction, Asphalt Paving &amp; Infrastructure Services in Doha, Qatar
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                        >
                            {t('page.description')}
                        </motion.p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden relative">
                                            <Image
                                                src={serviceImages[index]}
                                                alt={`${service.title} — CPC Qatar road construction service in Doha, Qatar`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h2 className="font-display text-2xl tracking-wide mb-3 group-hover:text-primary transition-colors">
                                                {service.title}
                                            </h2>
                                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                                {service.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {service.features.map((f) => (
                                                    <span
                                                        key={f}
                                                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                                                    >
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEO Content Block */}
                <section className="py-16 bg-card">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center"
                        >
                            {t('seo.title')}
                        </motion.h2>
                        <div className="prose prose-lg prose-invert mx-auto text-muted-foreground leading-relaxed space-y-4">
                            {seoParagraphs.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl tracking-wide mb-6"
                        >
                            {t('cta.title')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                        >
                            {t('cta.description')}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-gradient-gold text-primary-foreground font-semibold h-14 rounded-md px-10 text-lg hover:shadow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                            >
                                {t('cta.button')}
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
