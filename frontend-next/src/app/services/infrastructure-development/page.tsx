import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Infrastructure Development & Civil Works in Qatar | CPC Qatar",
    description:
        "Complete infrastructure development services in Doha, Qatar — drainage systems, stormwater management, utility duct installation, and public civil works. Government-approved infrastructure contractor.",
    alternates: { canonical: "/services/infrastructure-development" },
    keywords: [
        "infrastructure development Qatar",
        "civil works contractor Doha",
        "drainage construction Qatar",
        "stormwater management Qatar",
        "utility installation Doha",
        "infrastructure contractor Qatar",
        "public works Qatar",
        "civil construction Qatar",
        "drainage system Doha",
        "infrastructure project Qatar",
        "تطوير البنية التحتية قطر",
        "أعمال مدنية الدوحة",
        "بناء شبكات الصرف قطر",
    ],
    openGraph: {
        title: "Infrastructure Development & Civil Works in Qatar | CPC Qatar",
        description:
            "Drainage, utilities, stormwater, and civil infrastructure. Government-approved infrastructure contractor in Doha, Qatar.",
        url: "/services/infrastructure-development",
        images: [{ url: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg", width: 1200, height: 630, alt: "Infrastructure development in Qatar by CPC" }],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Infrastructure Development", item: `${SITE_URL}/services/infrastructure-development` },
    ],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Infrastructure Development & Civil Works",
    description:
        "Complete infrastructure development services — drainage systems, stormwater management, utility installation, and public civil works in Qatar.",
    url: `${SITE_URL}/services/infrastructure-development`,
    provider: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
        url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    serviceType: "Infrastructure Development & Civil Works",
};

export default function InfrastructureDevelopmentPage() {
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
                                src="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg"
                                alt="Infrastructure development project in Qatar by CPC Qatar"
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
                                    <li className="text-foreground">Infrastructure Development</li>
                                </ol>
                            </nav>
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                Civil &amp; Infrastructure Works
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide mb-6">
                                Infrastructure <span className="text-gradient">Development</span>
                                <span className="sr-only"> &amp; Civil Works in Doha, Qatar — Drainage, Utilities &amp; Public Works Contractor</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                CPC Qatar delivers complete infrastructure development solutions encompassing drainage systems,
                                utility installations, stormwater management, and civil engineering works. We build the essential
                                infrastructure that supports Qatar&apos;s growth.
                            </p>
                        </div>
                    </section>

                    {/* Services */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12">
                                Our Infrastructure Services
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Drainage & Sewer Systems",
                                        text: "Installation of stormwater drains, foul sewer networks, manholes, catch basins, and gully connections. HDPE, GRP, and concrete pipe installation with proper bedding and backfill.",
                                    },
                                    {
                                        title: "Stormwater Management",
                                        text: "Design-assisted construction of stormwater collection systems, attenuation tanks, soakaways, and outfall structures. Critical for Qatar's flash flood management requirements.",
                                    },
                                    {
                                        title: "Utility Duct Installation",
                                        text: "Trenching and installation of utility ducts for telecommunications, electrical cables, and water services. Includes duct banks, pull boxes, and handhole chambers.",
                                    },
                                    {
                                        title: "Water Network Works",
                                        text: "Installation of potable water mains (DI, HDPE), service connections, valve chambers, and fire hydrant connections. Pressure testing and chlorination per Kahramaa standards.",
                                    },
                                    {
                                        title: "Concrete Structures",
                                        text: "Construction of retaining walls, culverts, box culverts, headwalls, wing walls, boundary walls, and concrete channels. Reinforced concrete works with formwork and steel fixing.",
                                    },
                                    {
                                        title: "Site Infrastructure",
                                        text: "Complete site infrastructure packages including internal roads, parking, lighting foundations, fencing, landscaping preparation, and surface water drainage for developments.",
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

                    {/* Project Types */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
                                Types of Infrastructure Projects
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: "Road Infrastructure", desc: "Complete road construction packages including earthworks, drainage, utilities, pavement, and finishing." },
                                    { title: "Building Infrastructure", desc: "External works for buildings including access roads, parking, drainage, utilities, and landscaping." },
                                    { title: "Public Areas", desc: "Infrastructure for parks, plazas, waterfronts, and public spaces including pathways, lighting, and drainage." },
                                    { title: "Industrial Sites", desc: "Heavy-duty infrastructure for warehouses, factories, and logistics facilities including heavy pavement and drainage." },
                                    { title: "School Campuses", desc: "Complete campus infrastructure — roads, walkaways, parking, drainage, sports facilities, and fencing." },
                                    { title: "Utility Corridors", desc: "Multi-utility corridor construction with coordinated trenching, duct installation, and reinstatement." },
                                ].map((t) => (
                                    <div key={t.title} className="p-5 rounded-lg border border-border bg-background">
                                        <h3 className="font-display text-lg mb-2">{t.title}</h3>
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
                                Infrastructure Contractor in Doha, Qatar
                            </h2>
                            <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    <strong>CPC Qatar (Cosmo Projects &amp; Construction and Trading W.L.L.)</strong> is a trusted
                                    infrastructure contractor in Qatar with experience across government and private sector projects.
                                    Our infrastructure division handles everything from drainage and utilities to complete site
                                    development packages.
                                </p>
                                <p>
                                    We have delivered infrastructure projects for <strong>Ministry of Education school campuses,
                                        Ashghal road projects, FIFA World Cup 2022 support infrastructure, and private developments</strong>
                                    across Doha, Al Wakrah, Al Khor, Lusail, and other areas of Qatar.
                                </p>
                                <p>
                                    Our approach combines experienced project management, skilled crews, modern equipment, and
                                    strict <strong>QCS compliance</strong>. We coordinate with design engineers, testing labs, and
                                    utility authorities to deliver integrated infrastructure solutions on time and to specification.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                Need Infrastructure Development in Qatar?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Contact CPC Qatar for complete infrastructure solutions — from drainage and utilities to full site development.
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
