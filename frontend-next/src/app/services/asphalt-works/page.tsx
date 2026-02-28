import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Asphalt Works & Road Paving Services in Qatar | CPC Qatar",
    description:
        "Asphalt paving, road resurfacing & hot mix asphalt in Doha, Qatar. Durable pavements for highways, parking lots & roads. Government-approved.",
    alternates: { canonical: "/services/asphalt-works" },
    keywords: [
        "asphalt paving Qatar",
        "asphalt works Doha",
        "road paving contractor Qatar",
        "hot mix asphalt Qatar",
        "asphalt resurfacing Doha",
        "road construction Qatar",
        "tarmac paving Qatar",
        "asphalt repair Qatar",
        "road surfacing company Doha",
        "highway asphalt contractor Qatar",
        "أعمال الأسفلت قطر",
        "رصف الطرق الدوحة",
        "مقاول أسفلت قطر",
    ],
    openGraph: {
        title: "Asphalt Works & Road Paving in Qatar | CPC Qatar",
        description:
            "Hot mix asphalt, road resurfacing, pavement construction & repairs. Government-approved asphalt contractor in Doha, Qatar.",
        url: "/services/asphalt-works",
        images: [{ url: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312049/cpc-website/services/asphalt.jpg", width: 1200, height: 630, alt: "Asphalt paving in Qatar by CPC" }],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Asphalt Works", item: `${SITE_URL}/services/asphalt-works` },
    ],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Asphalt Works & Road Paving",
    description:
        "Professional asphalt paving, road resurfacing, and hot mix asphalt services in Doha, Qatar. Durable road pavements, parking lots, and highway surfacing.",
    url: `${SITE_URL}/services/asphalt-works`,
    provider: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
        url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    serviceType: "Asphalt Paving & Road Construction",
};

export default function AsphaltWorksPage() {
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
                                src="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312049/cpc-website/services/asphalt.jpg"
                                alt="Asphalt paving project in Doha, Qatar by CPC Qatar"
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
                                    <li className="text-foreground">Asphalt Works</li>
                                </ol>
                            </nav>
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                Road Paving &amp; Surfacing
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide mb-6">
                                Asphalt Works <span className="text-gradient">&amp; Road Paving</span>
                                <span className="sr-only"> Services in Doha, Qatar — Hot Mix Asphalt Paving Contractor</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                CPC Qatar delivers high-quality asphalt paving solutions for highways, internal roads, parking lots,
                                and commercial areas across Qatar. We use hot mix asphalt (HMA) produced to Qatar Construction
                                Standards specifications for maximum durability.
                            </p>
                        </div>
                    </section>

                    {/* Scope of Work */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12">
                                Our Asphalt Paving Services
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Hot Mix Asphalt (HMA) Paving",
                                        text: "Dense graded and open graded HMA for highways, arterial roads, collector roads, and internal streets. We handle wearing course, binder course, and base course layers at specified compaction levels.",
                                    },
                                    {
                                        title: "Road Resurfacing & Milling",
                                        text: "Complete road rehabilitation including milling of existing pavement, leveling course application, and new wearing course overlay. Ideal for aging roads that need structural renewal.",
                                    },
                                    {
                                        title: "Parking Lot Construction",
                                        text: "Full parking area construction from grading and compaction through subbase, base course, and asphalt wearing course. Includes line marking and traffic flow design.",
                                    },
                                    {
                                        title: "Patching & Repair Works",
                                        text: "Pothole repair, utility cut restoration, and localized pavement patching using both hot and cold mix asphalt. Quick turnaround to minimize disruption.",
                                    },
                                    {
                                        title: "Surface Treatment & Tack Coat",
                                        text: "Prime coat, tack coat, and chip seal applications to prepare surfaces and extend pavement life. Applied between asphalt layers for structural bonding.",
                                    },
                                    {
                                        title: "Asphalt Testing & Quality Control",
                                        text: "Marshall stability tests, density testing, core sampling, and temperature monitoring. All works comply with QCS 2014 specifications and Ashghal requirements.",
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

                    {/* Process */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12 text-center">
                                Our Asphalt Paving Process
                            </h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                {[
                                    { step: "01", title: "Site Preparation", desc: "Grading, compaction, and subbase installation to create a stable foundation." },
                                    { step: "02", title: "Base Course", desc: "Aggregate base course placement and compaction per design thickness." },
                                    { step: "03", title: "Tack & Paving", desc: "Tack coat application followed by machine paving of HMA layers." },
                                    { step: "04", title: "Compaction & QC", desc: "Roller compaction to achieve target density, then core sampling and testing." },
                                ].map((s) => (
                                    <div key={s.step} className="text-center">
                                        <div className="text-4xl font-bold text-primary/30 mb-2">{s.step}</div>
                                        <h3 className="font-display text-lg mb-2">{s.title}</h3>
                                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SEO Content */}
                    <section className="py-16">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8">
                                Trusted Asphalt Contractor in Qatar
                            </h2>
                            <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    CPC Qatar has completed <strong>asphalt paving projects</strong> for government ministries,
                                    Ashghal contractors, FIFA World Cup 2022 infrastructure, and private developments across Doha,
                                    Al Wakrah, Al Khor, Lusail, and other areas of Qatar.
                                </p>
                                <p>
                                    Our fleet includes asphalt pavers, rollers (smooth drum, pneumatic tire, and tandem), milling
                                    machines, and material transport trucks. We source hot mix asphalt from certified batching plants
                                    and maintain strict temperature control from plant to site.
                                </p>
                                <p>
                                    Whether you need a new road constructed from scratch, an existing road resurfaced, or a parking
                                    lot paved, CPC Qatar delivers on time, within budget, and to Ashghal specifications. Contact us
                                    for a free site assessment and quote.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                Need Asphalt Paving in Qatar?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Contact CPC Qatar today for a free consultation and competitive quote on your asphalt project.
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
