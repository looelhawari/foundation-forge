import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Earthworks & Grading Services in Qatar | CPC Qatar",
    description:
        "Earthworks, excavation, grading & site preparation in Doha, Qatar. Cut & fill, compaction and earthmoving for road and construction projects.",
    alternates: { canonical: "/services/earthworks" },
    keywords: [
        "earthworks Qatar",
        "excavation contractor Doha",
        "grading and leveling Qatar",
        "site preparation Qatar",
        "earthmoving company Doha",
        "cut and fill Qatar",
        "land leveling Qatar",
        "compaction services Qatar",
        "soil excavation Doha",
        "site clearing Qatar",
        "أعمال حفريات قطر",
        "تسوية أراضي الدوحة",
        "مقاول حفريات قطر",
    ],
    openGraph: {
        title: "Earthworks & Grading Services in Qatar | CPC Qatar",
        description:
            "Excavation, grading, cut & fill, compaction and site preparation. Professional earthworks contractor in Doha, Qatar.",
        url: "/services/earthworks",
        images: [{ url: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg", width: 1200, height: 630, alt: "Earthworks project in Qatar by CPC" }],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Earthworks", item: `${SITE_URL}/services/earthworks` },
    ],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Earthworks & Grading",
    description:
        "Professional earthworks, excavation, grading, site preparation, and land leveling services in Qatar for road and construction projects.",
    url: `${SITE_URL}/services/earthworks`,
    provider: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
        url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    serviceType: "Earthworks & Grading",
};

export default function EarthworksPage() {
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
                                src="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg"
                                alt="Earthworks and grading project in Qatar by CPC Qatar"
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
                                    <li className="text-foreground">Earthworks</li>
                                </ol>
                            </nav>
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                Site Preparation &amp; Grading
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide mb-6">
                                Earthworks <span className="text-gradient">&amp; Grading</span>
                                <span className="sr-only"> Services in Doha, Qatar — Excavation, Cut &amp; Fill, Site Preparation Contractor</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                CPC Qatar provides comprehensive earthworks and grading services for road construction, building
                                sites, and infrastructure projects. From excavation and site clearing to precision grading and
                                compaction — we prepare the ground for success.
                            </p>
                        </div>
                    </section>

                    {/* Services */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12">
                                Our Earthworks Services
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Excavation & Trenching",
                                        text: "Bulk excavation for road alignment, trenching for utilities and drainage, and foundation excavation for structures. All earth removed is disposed of or stockpiled per project requirements.",
                                    },
                                    {
                                        title: "Site Clearing & Demolition",
                                        text: "Removal of existing structures, vegetation, debris, and unsuitable materials to prepare the site for construction. Includes stripping of topsoil as required.",
                                    },
                                    {
                                        title: "Grading & Leveling",
                                        text: "Precision grading to achieve design levels and slopes using GPS-guided graders. Essential for proper drainage and road geometry on every project.",
                                    },
                                    {
                                        title: "Cut & Fill Operations",
                                        text: "Earth balancing by cutting high areas and filling low areas to achieve design profile. Includes transport, placement, and compaction of fill materials in controlled lifts.",
                                    },
                                    {
                                        title: "Compaction & Soil Stabilization",
                                        text: "Mechanical compaction using vibratory rollers and padfoot rollers. Soil stabilization with cement, lime, or geosynthetics for weak subgrade conditions.",
                                    },
                                    {
                                        title: "Material Supply & Haulage",
                                        text: "Supply and transport of approved fill materials including granular fill, select fill, and rock fill. Coordinated fleet of dump trucks and loaders for efficient material movement.",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="bg-card p-6 rounded-xl border border-border">
                                        <h3 className="font-display text-xl mb-3 text-primary">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Equipment */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
                                Heavy Equipment Fleet
                            </h2>
                            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                                CPC Qatar operates a modern fleet of earthmoving equipment to handle projects of any scale.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                {["Excavators", "Wheel Loaders", "Motor Graders", "Dump Trucks", "Bulldozers", "Vibratory Rollers", "Backhoe Loaders", "Skid Steer Loaders"].map((e) => (
                                    <div key={e} className="p-4 rounded-lg border border-border bg-background">
                                        <span className="text-sm font-medium">{e}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SEO Content */}
                    <section className="py-16">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8">
                                Earthworks Contractor in Doha, Qatar
                            </h2>
                            <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    <strong>Earthworks form the foundation of every road and infrastructure project.</strong> At CPC Qatar,
                                    we understand that proper site preparation is critical to the longevity of the finished structure.
                                    Our earthworks team has experience on projects ranging from internal road grading to large-scale
                                    highway earthworks.
                                </p>
                                <p>
                                    We have completed earthworks for projects across <strong>Doha, Al Wakrah, Al Khor, Lusail, Al Rayyan,
                                        and Al Shahaniya</strong>. Our clients include Ashghal contractors, private developers, and government
                                    entities requiring precise grading, stable compaction, and timely completion.
                                </p>
                                <p>
                                    All earthworks are performed in accordance with <strong>Qatar Construction Standards (QCS)</strong>
                                    with in-situ density testing, moisture content monitoring, and survey verification at every stage.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                Need Earthworks Services in Qatar?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Contact CPC Qatar for professional excavation, grading, and site preparation services.
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
