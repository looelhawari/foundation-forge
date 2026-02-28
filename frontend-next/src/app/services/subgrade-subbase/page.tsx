import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Subgrade & Subbase Works for Roads in Qatar | CPC Qatar",
    description:
        "Subgrade preparation, subbase installation & base course construction in Doha, Qatar. Material testing, compaction control and QCS compliance.",
    alternates: { canonical: "/services/subgrade-subbase" },
    keywords: [
        "subgrade works Qatar",
        "subbase installation Doha",
        "road base course Qatar",
        "subgrade preparation Qatar",
        "road foundation contractor Doha",
        "granular subbase Qatar",
        "aggregate base course Qatar",
        "road layers contractor Qatar",
        "compaction testing Qatar",
        "road pavement layers Doha",
        "أعمال طبقة التأسيس قطر",
        "طبقة التحت أساس الدوحة",
        "مقاول أساسات الطرق قطر",
    ],
    openGraph: {
        title: "Subgrade & Subbase Works for Roads in Qatar | CPC Qatar",
        description:
            "Subgrade preparation, subbase installation, base course construction with material testing and compaction control in Qatar.",
        url: "/services/subgrade-subbase",
        images: [{ url: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312062/cpc-website/services/subgrade_and_subbase.jpg", width: 1200, height: 630, alt: "Subgrade and subbase works in Qatar by CPC" }],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Subgrade & Subbase", item: `${SITE_URL}/services/subgrade-subbase` },
    ],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Subgrade & Subbase Works",
    description:
        "Professional subgrade preparation, subbase installation, and base course construction for road projects in Qatar.",
    url: `${SITE_URL}/services/subgrade-subbase`,
    provider: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
        url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    serviceType: "Subgrade & Subbase Construction",
};

export default function SubgradeSubbasePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    {/* Hero */}
                    <section className="relative pt-32 pb-16">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312062/cpc-website/services/subgrade_and_subbase.jpg"
                                alt="Subgrade and subbase construction for road projects in Qatar by CPC Qatar"
                                fill
                                sizes="100vw"
                                className="object-cover opacity-20"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
                        </div>
                        <div className="relative z-10 container mx-auto px-6 max-w-5xl">
                            <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
                                <ol className="flex items-center gap-2">
                                    <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                                    <li>/</li>
                                    <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                                    <li>/</li>
                                    <li className="text-foreground">Subgrade &amp; Subbase</li>
                                </ol>
                            </nav>
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                Road Foundation Layers
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide mb-6">
                                Subgrade <span className="text-gradient">&amp; Subbase</span> Works
                                <span className="sr-only"> in Doha, Qatar — Road Foundation, Base Course &amp; Pavement Layer Contractor</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                CPC Qatar builds strong, lasting road foundations through expert subgrade preparation, subbase
                                installation, and base course construction. Proper foundation layers are critical for pavement
                                longevity — we get them right every time.
                            </p>
                        </div>
                    </section>

                    {/* Road Layers Explained */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12">
                                Road Pavement Layers We Build
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        layer: "Subgrade",
                                        desc: "The natural soil foundation. We prepare the subgrade by grading to design levels, treating weak soils (lime or cement stabilization), and compacting to 95%+ MDD. We perform CBR testing and proof rolling to verify bearing capacity before proceeding.",
                                    },
                                    {
                                        layer: "Capping Layer",
                                        desc: "Where the natural subgrade is weak, we install a capping layer of select granular material to improve bearing capacity. Placed in controlled lifts and compacted to specification.",
                                    },
                                    {
                                        layer: "Subbase Course",
                                        desc: "Crushed aggregate subbase installed on the prepared subgrade. CPC places subbase in specified lift thicknesses (typically 150-200mm) with controlled compaction to 98%+ MDD. Material is tested for gradation, plasticity, and CBR value.",
                                    },
                                    {
                                        layer: "Road Base Course",
                                        desc: "The main structural layer beneath the asphalt. We install crushed rock or stabilized base course at design thickness with precise level control and high compaction. This layer distributes traffic loads to the layers below.",
                                    },
                                ].map((item) => (
                                    <div key={item.layer} className="bg-card p-6 rounded-xl border border-border flex flex-col sm:flex-row gap-4">
                                        <div className="sm:w-48 shrink-0">
                                            <h3 className="font-display text-xl text-primary">{item.layer}</h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testing & QC */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
                                Material Testing &amp; Quality Control
                            </h2>
                            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                                Every layer is tested before, during, and after placement to ensure compliance with project specifications and QCS standards.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: "Compaction Testing", desc: "Nuclear density gauge and sand replacement tests to verify in-situ density meets minimum 95-100% MDD requirement." },
                                    { title: "CBR Testing", desc: "California Bearing Ratio testing of subgrade and subbase materials to confirm adequate bearing capacity." },
                                    { title: "Gradation Analysis", desc: "Sieve analysis of aggregate materials to ensure proper particle size distribution per specification." },
                                    { title: "Atterberg Limits", desc: "Liquid limit and plastic limit testing of soil materials to check plasticity index compliance." },
                                    { title: "Proctor Testing", desc: "Standard and modified Proctor tests to determine maximum dry density and optimum moisture content." },
                                    { title: "Level Survey", desc: "Continuous level monitoring using total station and GPS to verify layer thickness and finished levels." },
                                ].map((t) => (
                                    <div key={t.title} className="p-5 rounded-lg border border-border bg-background">
                                        <h3 className="font-display text-lg mb-2 text-primary">{t.title}</h3>
                                        <p className="text-sm text-muted-foreground">{t.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SEO Content */}
                    <section className="py-16">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8">
                                Subgrade &amp; Subbase Contractor in Qatar
                            </h2>
                            <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    <strong>CPC Qatar</strong> has extensive experience building road foundation layers for projects
                                    across Qatar. A properly constructed <strong>subgrade and subbase</strong> is the most important
                                    factor in road pavement life — even the best asphalt will fail on a weak foundation.
                                </p>
                                <p>
                                    Our teams work with third-party testing laboratories to verify every layer meets design
                                    requirements. We maintain detailed records of <strong>compaction test results, material
                                        certifications, and level surveys</strong> for project documentation and client assurance.
                                </p>
                                <p>
                                    We operate across all areas of Qatar including <strong>Doha, Lusail, Al Wakrah, Al Khor,
                                        Al Rayyan, and Al Shahaniya</strong>, delivering road foundation works on
                                    schedule and to specification.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                Need Subgrade &amp; Subbase Works?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Contact CPC Qatar for professional road foundation construction anywhere in Qatar.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center bg-gradient-gold text-primary-foreground font-semibold h-14 rounded-md px-10 text-lg hover:shadow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                                >
                                    Get a Free Quote
                                </Link>
                                <Link
                                    href="/projects"
                                    className="inline-flex items-center justify-center border border-border font-semibold h-14 rounded-md px-10 text-lg hover:bg-card transition-all duration-300"
                                >
                                    View Our Projects
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
