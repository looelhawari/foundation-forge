import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Our Services | Road Construction, Asphalt Paving & Infrastructure in Qatar",
    description:
        "Asphalt paving, road marking, earthworks, interlock & infrastructure by CPC Qatar in Doha. Government-approved contractor serving Qatar since 2017.",
    alternates: { canonical: "/services" },
    keywords: [
        "road construction services Qatar",
        "asphalt paving services Doha",
        "infrastructure contractor Qatar",
        "road marking company Qatar",
        "earthworks contractor Doha",
        "interlock paving Qatar",
        "subgrade subbase works Qatar",
        "civil engineering services Qatar",
        "construction services Doha",
        "خدمات إنشاء الطرق قطر",
        "خدمات رصف الأسفلت الدوحة",
        "مقاولات بنية تحتية قطر",
    ],
    openGraph: {
        title: "Our Services | Road Construction & Infrastructure | CPC Qatar",
        description:
            "Full range of road construction & infrastructure services in Qatar — asphalt, road marking, earthworks, interlock, subgrade & infrastructure.",
        url: "/services",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Services" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Services | Road Construction & Infrastructure in Qatar",
        description:
            "Asphalt paving, road marking, earthworks, interlock, subgrade & infrastructure services in Doha, Qatar.",
        images: ["/og-image.png"],
    },
};

export default async function ServicesPage() {
    const t = await getTranslations('services');

    const services = [
        {
            slug: "asphalt-works",
            titleKey: "items.asphalt.title",
            descKey: "items.asphalt.description",
            featuresKey: "items.asphalt.features",
            image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312049/cpc-website/services/asphalt.jpg",
        },
        {
            slug: "road-marking",
            titleKey: "items.roadMarking.title",
            descKey: "items.roadMarking.description",
            featuresKey: "items.roadMarking.features",
            image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312058/cpc-website/services/road-markings-masters.jpg",
        },
        {
            slug: "earthworks",
            titleKey: "items.earthworks.title",
            descKey: "items.earthworks.description",
            featuresKey: "items.earthworks.features",
            image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg",
        },
        {
            slug: "interlock-kerbstone",
            titleKey: "items.interlock.title",
            descKey: "items.interlock.description",
            featuresKey: "items.interlock.features",
            image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312054/cpc-website/services/interllock.jpg",
        },
        {
            slug: "subgrade-subbase",
            titleKey: "items.subgrade.title",
            descKey: "items.subgrade.description",
            featuresKey: "items.subgrade.features",
            image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312062/cpc-website/services/subgrade_and_subbase.jpg",
        },
        {
            slug: "infrastructure-development",
            titleKey: "items.infrastructure.title",
            descKey: "items.infrastructure.description",
            featuresKey: "items.infrastructure.features",
            image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg",
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    {/* Hero */}
                    <section className="pt-32 pb-16 bg-gradient-to-b from-background to-card">
                        <div className="container mx-auto px-6 max-w-5xl text-center">
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                {t('hero.tagline')}
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                                {t('hero.heading')}
                                <span className="sr-only">
                                    {" "}— {t('hero.subheading')}
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                {t('hero.description')}
                            </p>
                        </div>
                    </section>

                    {/* Services Grid */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {services.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden relative">
                                            <Image
                                                src={service.image}
                                                alt={`${t(service.titleKey)} — CPC Qatar road construction service in Doha, Qatar`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h2 className="font-display text-2xl tracking-wide mb-3 group-hover:text-primary transition-colors">
                                                {t(service.titleKey)}
                                            </h2>
                                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                                {t(service.descKey)}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {t.raw(service.featuresKey).map((f: string) => (
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
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SEO Content Block */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
                                {t('seo.heading')}
                            </h2>
                            <div className="prose prose-lg prose-invert mx-auto text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    {t('seo.p1')}
                                </p>
                                <p>
                                    {t('seo.p2')}
                                </p>
                                <p>
                                    {t('seo.p3')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                {t('cta.heading')}
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                {t('cta.description')}
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-gradient-gold text-primary-foreground font-semibold h-14 rounded-md px-10 text-lg hover:shadow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                            >
                                {t('cta.button')}
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
