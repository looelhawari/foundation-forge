import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Road Marking & Traffic Signs Installation in Qatar | CPC Qatar",
    description:
        "Thermoplastic & cold paint road marking, traffic sign installation and lane striping in Doha, Qatar. Government-approved road safety contractor.",
    alternates: { canonical: "/services/road-marking" },
    keywords: [
        "road marking Qatar",
        "road marking company Doha",
        "thermoplastic road marking Qatar",
        "traffic signs installation Qatar",
        "lane striping Qatar",
        "road line painting Doha",
        "road marking contractor Qatar",
        "traffic safety Qatar",
        "road markings Qatar",
        "highway marking company Doha",
        "علامات الطرق قطر",
        "خطوط طريق الدوحة",
        "تركيب لوحات مرورية قطر",
    ],
    openGraph: {
        title: "Road Marking & Traffic Signs in Qatar | CPC Qatar",
        description:
            "Thermoplastic & cold paint road marking, traffic signs, lane striping and safety solutions. Government-approved contractor in Qatar.",
        url: "/services/road-marking",
        images: [{ url: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312058/cpc-website/services/road-markings-masters.jpg", width: 1200, height: 630, alt: "Road marking in Qatar by CPC" }],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Road Marking", item: `${SITE_URL}/services/road-marking` },
    ],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Road Marking & Traffic Signs Installation",
    description:
        "Professional thermoplastic and cold paint road marking, traffic sign installation, lane striping, and road safety solutions in Qatar.",
    url: `${SITE_URL}/services/road-marking`,
    provider: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
        url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    serviceType: "Road Marking & Traffic Signs",
};

export default function RoadMarkingPage() {
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
                                src="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312058/cpc-website/services/road-markings-masters.jpg"
                                alt="Road marking project in Doha, Qatar by CPC Qatar"
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
                                    <li className="text-foreground">Road Marking</li>
                                </ol>
                            </nav>
                            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                                Road Safety &amp; Marking
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide mb-6">
                                Road Marking <span className="text-gradient">&amp; Traffic Signs</span>
                                <span className="sr-only"> Installation Services in Doha, Qatar — Thermoplastic Road Line Marking Contractor</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                CPC Qatar provides professional road marking and traffic sign installation services throughout Qatar.
                                From thermoplastic line marking to reflective traffic signs, we enhance road safety and traffic management
                                with precision and compliance to Ashghal standards.
                            </p>
                        </div>
                    </section>

                    {/* Services Detail */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12">
                                Our Road Marking Services
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Thermoplastic Road Marking",
                                        text: "Hot-applied thermoplastic markings for center lines, edge lines, crosswalks, arrows, and symbols. High retroreflectivity with glass beads for night visibility. Long-lasting and suitable for high-traffic roads.",
                                    },
                                    {
                                        title: "Cold Paint Road Marking",
                                        text: "Solvent-based and water-based cold paint for internal roads, parking lots, and temporary markings. Quick drying and cost-effective for lighter traffic applications.",
                                    },
                                    {
                                        title: "Traffic Sign Installation",
                                        text: "Manufacturing and installation of regulatory, warning, and informational traffic signs. Reflective sheeting (diamond grade and high-intensity grade) per Qatar Traffic Manual standards.",
                                    },
                                    {
                                        title: "Lane Striping & Delineation",
                                        text: "Precision lane striping for multi-lane highways, roundabouts, intersections, and merging zones. Raised pavement markers (RPMs) and road studs for enhanced delineation.",
                                    },
                                    {
                                        title: "Parking Lot Marking",
                                        text: "Complete parking area marking including stall lines, directional arrows, handicap symbols, fire lane markings, speed bumps, and numbering systems.",
                                    },
                                    {
                                        title: "Road Safety Elements",
                                        text: "Installation of guardrails, delineator posts, chevron signs, speed bumps, bollards, and other road safety furniture to improve traffic management.",
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
                                Road Marking Contractor in Doha, Qatar
                            </h2>
                            <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    <strong>CPC Qatar</strong> has executed road marking projects for government agencies, Ashghal contractors,
                                    and private developers. Our team uses modern line marking machines (ride-on and walk-behind) and applies
                                    all markings according to Qatar Traffic Manual and Ashghal design standards.
                                </p>
                                <p>
                                    We provide both <strong>thermoplastic road marking</strong> for permanent, high-traffic applications and
                                    <strong> cold paint marking</strong> for internal roads, temporary works, and parking areas. All materials
                                    are sourced from approved suppliers and tested for retroreflectivity and skid resistance.
                                </p>
                                <p>
                                    Whether you need a complete road marking package for a new highway, re-marking of existing roads, or
                                    a parking lot layout in Doha, CPC Qatar delivers accurate, visible, and durable markings on schedule.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-16">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                                Need Road Marking Services in Qatar?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Contact CPC Qatar for professional road marking and traffic sign installation anywhere in Qatar.
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
