import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Our Services | Road Construction, Asphalt Paving & Infrastructure in Qatar",
    description:
        "CPC Qatar offers comprehensive road construction services in Doha, Qatar: asphalt paving, road marking, earthworks, interlock & kerbstone, subgrade & subbase, and infrastructure development. Government-approved contractor.",
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

const services = [
    {
        title: "Asphalt Works",
        slug: "asphalt-works",
        description:
            "Professional asphalt pavement construction for highways, streets, and commercial areas across Qatar. Hot mix asphalt, cold mix, surface treatment, and road resurfacing.",
        image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312049/cpc-website/services/asphalt.jpg",
        features: ["Hot Mix Asphalt", "Cold Mix Asphalt", "Surface Treatment", "Road Resurfacing", "Patching & Repairs"],
    },
    {
        title: "Road Marking & Traffic Signs",
        slug: "road-marking",
        description:
            "Thermoplastic and cold paint road marking, traffic signs installation, lane striping, and road safety solutions throughout Qatar.",
        image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312058/cpc-website/services/road-markings-masters.jpg",
        features: ["Thermoplastic Marking", "Cold Paint Marking", "Traffic Signs", "Lane Striping", "Safety Barriers"],
    },
    {
        title: "Earthworks & Grading",
        slug: "earthworks",
        description:
            "Complete site preparation including excavation, grading, filling, compaction, and land leveling for construction projects in Doha and across Qatar.",
        image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg",
        features: ["Excavation", "Site Clearing", "Grading & Leveling", "Fill & Compaction", "Cut & Fill Operations"],
    },
    {
        title: "Interlock & Kerbstone",
        slug: "interlock-kerbstone",
        description:
            "Precision installation of interlocking block pavers, kerbstones, walkways, driveways, and decorative paving for commercial and public spaces in Qatar.",
        image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312054/cpc-website/services/interllock.jpg",
        features: ["Interlock Paving", "Kerbstone Installation", "Walkway Construction", "Pattern Design", "Finishing Works"],
    },
    {
        title: "Subgrade & Subbase Works",
        slug: "subgrade-subbase",
        description:
            "Foundation layer construction including subgrade preparation, subbase installation, base course works, and material testing for road projects in Qatar.",
        image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312062/cpc-website/services/subgrade_and_subbase.jpg",
        features: ["Subgrade Preparation", "Subbase Installation", "Base Course", "Material Testing", "Compaction Control"],
    },
    {
        title: "Infrastructure Development",
        slug: "infrastructure-development",
        description:
            "Complete civil infrastructure services including drainage systems, utilities installation, stormwater management, and public works across Qatar.",
        image: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312051/cpc-website/services/earth_work.jpg",
        features: ["Drainage Systems", "Utilities Installation", "Stormwater Management", "Curb Construction", "Public Works"],
    },
];

const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CPC Qatar Construction Services",
    description:
        "Comprehensive road construction and infrastructure services in Doha, Qatar — asphalt paving, road marking, earthworks, interlock, subgrade, and infrastructure development.",
    url: `${SITE_URL}/services`,
    isPartOf: { "@type": "WebSite", name: "CPC Qatar", url: SITE_URL },
    mainEntity: {
        "@type": "ItemList",
        name: "CPC Qatar Services",
        itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "Service",
                name: s.title,
                description: s.description,
                url: `${SITE_URL}/services/${s.slug}`,
                provider: {
                    "@type": "Organization",
                    name: "CPC Qatar — Cosmo Projects & Construction",
                },
            },
        })),
    },
};

export default function ServicesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
            />
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    {/* Hero */}
                    <section className="pt-32 pb-16 bg-gradient-to-b from-background to-card">
                        <div className="container mx-auto px-6 max-w-5xl text-center">
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                What We Do
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                                Our <span className="text-gradient">Services</span>
                                <span className="sr-only">
                                    {" "}— Road Construction, Asphalt Paving &amp; Infrastructure Services in Doha, Qatar
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                CPC Qatar delivers comprehensive road construction and civil engineering services across Qatar.
                                From asphalt paving and road marking to earthworks and infrastructure development — we handle
                                every phase of your road and infrastructure project with excellence.
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
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={service.image}
                                                alt={`${service.title} — CPC Qatar road construction service in Doha, Qatar`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SEO Content Block */}
                    <section className="py-16 bg-card">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
                                Why Choose CPC Qatar for Road Construction in Qatar?
                            </h2>
                            <div className="prose prose-lg prose-invert mx-auto text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    <strong>CPC Qatar (Cosmo Projects &amp; Construction and Trading W.L.L.)</strong> is a government-approved
                                    road construction and infrastructure contractor based in Doha, Qatar. Since our establishment in 2017,
                                    we have delivered over 90 projects for major clients including the Ministry of Education, Ashghal (Public Works Authority),
                                    FIFA World Cup Qatar 2022 contractors, Qatar Museums, DHL, and Al Meera.
                                </p>
                                <p>
                                    Our services cover the full spectrum of road construction — from initial <strong>earthworks and site preparation</strong>,
                                    through <strong>subgrade and subbase installation</strong>, to <strong>asphalt pavement construction</strong>,
                                    <strong>road marking and traffic sign installation</strong>, and <strong>interlock and kerbstone paving</strong>.
                                    We operate across all areas of Qatar including Doha, Al Wakrah, Al Khor, Lusail, Al Rayyan, and Al Shahaniya.
                                </p>
                                <p>
                                    Every project is managed by experienced civil engineers using modern equipment and materials that meet
                                    Qatar Construction Standards (QCS). We are committed to timely delivery, safety compliance, and
                                    quality assurance on every project.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                Ready to Start Your Project?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Contact our team for a free consultation and quote for your road construction or infrastructure project in Qatar.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-gradient-gold text-primary-foreground font-semibold h-14 rounded-md px-10 text-lg hover:shadow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                            >
                                Get a Free Quote
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
