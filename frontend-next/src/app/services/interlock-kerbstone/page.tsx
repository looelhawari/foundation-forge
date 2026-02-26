import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Interlock & Kerbstone Installation in Qatar | CPC Qatar",
    description:
        "Professional interlock paving and kerbstone installation in Doha, Qatar. CPC Qatar delivers walkways, driveways, plazas, and decorative block paving for commercial, government, and residential projects.",
    alternates: { canonical: "/services/interlock-kerbstone" },
    keywords: [
        "interlock paving Qatar",
        "kerbstone installation Doha",
        "interlock block paving Qatar",
        "kerbstone contractor Qatar",
        "paver installation Doha",
        "walkway construction Qatar",
        "interlocking pavement Qatar",
        "decorative paving Doha",
        "concrete block paving Qatar",
        "kerb installation Qatar",
        "رصف انترلوك قطر",
        "تركيب حجر الرصيف الدوحة",
        "مقاول انترلوك قطر",
    ],
    openGraph: {
        title: "Interlock & Kerbstone Installation in Qatar | CPC Qatar",
        description:
            "Interlock paving, kerbstone installation, walkways, and decorative block paving. Professional contractor in Doha, Qatar.",
        url: "/services/interlock-kerbstone",
        images: [{ url: "/assets/services/interllock.jpeg", width: 1200, height: 630, alt: "Interlock paving in Qatar by CPC" }],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Interlock & Kerbstone", item: `${SITE_URL}/services/interlock-kerbstone` },
    ],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Interlock & Kerbstone Installation",
    description:
        "Professional interlock paving and kerbstone installation for walkways, driveways, plazas, and commercial areas in Qatar.",
    url: `${SITE_URL}/services/interlock-kerbstone`,
    provider: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
        url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    serviceType: "Interlock & Kerbstone Installation",
};

export default function InterlockKerbstonePage() {
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
                            <img
                                src="/assets/services/interllock.jpeg"
                                alt="Interlock paving and kerbstone installation in Qatar by CPC Qatar"
                                className="w-full h-full object-cover opacity-20"
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
                                    <li className="text-foreground">Interlock &amp; Kerbstone</li>
                                </ol>
                            </nav>
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                Paving &amp; Finishing Works
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide mb-6">
                                Interlock <span className="text-gradient">&amp; Kerbstone</span>
                                <span className="sr-only"> Installation Services in Doha, Qatar — Block Paving &amp; Kerbstone Contractor</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                CPC Qatar specializes in precision interlock block paving and kerbstone installation for walkways,
                                driveways, plazas, parking areas, and public spaces. Our skilled teams deliver clean, durable, and
                                aesthetically pleasing results across Qatar.
                            </p>
                        </div>
                    </section>

                    {/* Services */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12">
                                Our Interlock &amp; Kerbstone Services
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Interlock Block Paving",
                                        text: "Installation of concrete interlocking pavers in various patterns (herringbone, basket weave, running bond) for walkways, driveways, and plazas. Includes sand bedding layer preparation and joint filling.",
                                    },
                                    {
                                        title: "Kerbstone Installation",
                                        text: "Precast concrete kerbstone placement including upright kerbs, mountable kerbs, barrier kerbs, and drop kerbs. Set on concrete bed with precise alignment to design levels.",
                                    },
                                    {
                                        title: "Walkway & Pathway Construction",
                                        text: "Complete walkway construction from subgrade preparation through base course, bedding sand, and interlock paver installation. Includes tactile paving for accessibility compliance.",
                                    },
                                    {
                                        title: "Decorative Paving",
                                        text: "Colored and patterned interlock pavers for commercial areas, hotel entrances, public plazas, and premium developments. Multiple color and pattern options available.",
                                    },
                                    {
                                        title: "Median & Island Finishing",
                                        text: "Kerbstone and interlock installation for road medians, traffic islands, and roundabouts. Includes bollard installation and landscaping preparation.",
                                    },
                                    {
                                        title: "Repair & Reinstatement",
                                        text: "Removal and reinstatement of interlock and kerbstone after utility works or damage. Careful matching of existing patterns and colors for seamless integration.",
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

                    {/* SEO Content */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8">
                                Interlock &amp; Kerbstone Contractor in Qatar
                            </h2>
                            <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    <strong>CPC Qatar</strong> has installed thousands of square meters of interlock paving and kilometers
                                    of kerbstone for projects across Qatar. Our portfolio includes government school campuses (Ministry of Education),
                                    commercial developments, and public infrastructure projects for Ashghal contractors.
                                </p>
                                <p>
                                    We use high-quality <strong>precast concrete blocks</strong> and kerbstones sourced from approved manufacturers.
                                    All installations are performed with string-line precision, proper bedding preparation, and accurate
                                    leveling to ensure long-term durability and visual appeal.
                                </p>
                                <p>
                                    Our experienced labor teams are trained in multiple interlock patterns and can handle complex geometries
                                    including curves, radius kerbs, and transition zones. Quality is verified through level surveys and
                                    visual inspections at every stage.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                Need Interlock or Kerbstone Installation?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Contact CPC Qatar for professional interlock paving and kerbstone installation anywhere in Qatar.
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
