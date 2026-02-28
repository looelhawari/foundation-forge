import type { Metadata } from "next";
import ClientsPage from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Clients & Testimonials | Trusted by Leading Qatar Organizations",
    description:
        "See CPC Qatar trusted clients and testimonials — Ministry of Education, Ashghal, FIFA 2022 contractors, and leading construction firms across Qatar.",
    alternates: { canonical: "/clients" },
    keywords: [
        "CPC Qatar clients", "road construction testimonials Qatar", "Qatar construction partners",
        "Ashghal approved contractor", "FIFA 2022 contractor Qatar", "Ministry of Education contractor",
        "عملاء CPC قطر", "شهادات عملاء مقاولات",
    ],
    openGraph: {
        title: "Clients & Testimonials | CPC Qatar",
        description: "Trusted by Qatar's leading organizations. See our client list and testimonials.",
        url: "/clients",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Clients & Partners" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Clients | Trusted by Ministry of Education, Ashghal & More",
        description: "Government & private sector clients across Qatar. View testimonials from leading organizations.",
        images: ["/og-image.png"],
    },
};

// ─── Verified client organization entities ────────────────────────────────
const CLIENT_ORGS = [
    {
        position: 1,
        "@type": "GovernmentOrganization",
        "@id": "https://www.ashghal.gov.qa",
        name: "Ashghal — Public Works Authority Qatar",
        alternateName: "هيئة الأشغال العامة",
        url: "https://www.ashghal.gov.qa",
        sameAs: "https://www.ashghal.gov.qa",
        description: "Qatar's Public Works Authority responsible for major infrastructure and road projects.",
    },
    {
        position: 2,
        "@type": "GovernmentOrganization",
        "@id": "https://edu.gov.qa",
        name: "Ministry of Education — State of Qatar",
        alternateName: "وزارة التربية والتعليم قطر",
        url: "https://edu.gov.qa",
        sameAs: "https://edu.gov.qa",
        description: "Qatar's Ministry of Education and Higher Education, responsible for educational infrastructure.",
    },
    {
        position: 3,
        "@type": "SportsOrganization",
        "@id": "https://www.fifa.com",
        name: "FIFA World Cup Qatar 2022",
        url: "https://www.fifa.com",
        sameAs: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022",
        description: "FIFA World Cup 2022 hosted in Qatar — stadium and infrastructure projects.",
    },
    {
        position: 4,
        "@type": "Organization",
        "@id": "https://www.qm.org.qa",
        name: "Qatar Museums",
        alternateName: "متاحف قطر",
        url: "https://www.qm.org.qa",
        sameAs: "https://www.qm.org.qa",
        description: "Qatar's authority overseeing national museums and cultural heritage sites.",
    },
    {
        position: 5,
        "@type": "Corporation",
        "@id": "https://www.dhl.com/qa-en/home.html",
        name: "DHL Qatar",
        url: "https://www.dhl.com/qa-en/home.html",
        sameAs: "https://www.dhl.com",
        description: "DHL Express logistics and supply chain operations in Qatar.",
    },
    {
        position: 6,
        "@type": "Corporation",
        "@id": "https://www.almeera.com.qa",
        name: "Al Meera Consumer Goods Company",
        alternateName: "الميرة للسلع الاستهلاكية",
        url: "https://www.almeera.com.qa",
        sameAs: "https://www.almeera.com.qa",
        description: "Qatar's leading retail and consumer goods chain with facilities across Qatar.",
    },
    {
        position: 7,
        "@type": "Corporation",
        "@id": "https://www.imalco.com",
        name: "IMALCO Qatar",
        url: "https://www.imalco.com",
        sameAs: "https://www.imalco.com",
        description: "Qatar's largest tire, battery, lubricant and industrial equipment distributor.",
    },
    {
        position: 8,
        "@type": "GovernmentOrganization",
        "@id": "https://awqaf.gov.qa",
        name: "Ministry of Awqaf & Islamic Affairs — Qatar",
        alternateName: "وزارة الأوقاف والشؤون الإسلامية",
        url: "https://awqaf.gov.qa",
        sameAs: "https://awqaf.gov.qa",
        description: "Qatar's ministry responsible for mosque construction and Islamic affairs infrastructure.",
    },
];

const clientsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CPC Qatar Clients & Testimonials",
    description:
        "Trusted clients and testimonials for CPC Qatar — serving Ministry of Education, Ashghal, FIFA 2022 contractors, Qatar Museums, DHL, Al Meera, and leading organizations across Qatar.",
    url: `${SITE_URL}/clients`,
    isPartOf: { "@type": "WebSite", name: "CPC Qatar", url: SITE_URL },
    mainEntity: {
        "@type": "ItemList",
        name: "CPC Qatar Major Client Organizations",
        numberOfItems: CLIENT_ORGS.length,
        itemListElement: CLIENT_ORGS.map(({ position, ...org }) => ({
            "@type": "ListItem",
            position,
            item: org,
        })),
    },
};

// Contractor relationship schema — tells Google CPC worked WITH these authorities
const contractorRelationshipSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Cosmo Projects & Construction and Trading W.L.L.",
    alternateName: "CPC Qatar",
    url: SITE_URL,
    knowsAbout: [
        "Road Construction", "Asphalt Pavement", "Infrastructure Development",
        "Earthworks and Grading", "Road Marking and Traffic Signs",
        "Interlock Block Paving", "Subgrade and Subbase Works",
        "Civil Engineering Qatar", "Highway Construction",
    ],
    // Projects performed for government and corporate clients
    makesOffer: CLIENT_ORGS.map(org => ({
        "@type": "Offer",
        offeredBy: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
        itemOffered: {
            "@type": "Service",
            name: "Road Construction & Infrastructure Works",
            provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
        },
        eligibleCustomer: { "@type": org["@type"] as string, name: org.name, url: org.url },
    })),
};

export default function Page() {
    return (
        <>
            {/* Schema 1: CollectionPage with full org entities + real URLs */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(clientsJsonLd) }}
            />
            {/* Schema 2: Contractor relationship — CPC ↔ authority orgs */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contractorRelationshipSchema) }}
            />
            <ClientsPage />

            {/* ─── Static SEO section ─────────────────────────────────────
                Rendered server-side for Google to crawl.
                Contains real outbound links to authority domains so Google
                understands the contractor relationship via HTML link graph.
             ─────────────────────────────────────────────────────────────── */}
            <section className="bg-card border-t border-border py-16">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="font-display text-2xl md:text-3xl tracking-wide mb-4 text-center">
                        Trusted by Qatar&apos;s Leading Authorities
                    </h2>
                    <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                        CPC Qatar is an approved contractor delivering road construction and infrastructure works
                        for Qatar&apos;s most prominent government and private sector organizations.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm" aria-label="CPC Qatar major clients">
                        {[
                            { name: "Ashghal — Public Works Authority Qatar", url: "https://www.ashghal.gov.qa", note: "Road & infrastructure projects" },
                            { name: "Ministry of Education — Qatar", url: "https://edu.gov.qa", note: "School campus infrastructure" },
                            { name: "Qatar Museums", url: "https://www.qm.org.qa", note: "Museum site development" },
                            { name: "DHL Qatar", url: "https://www.dhl.com/qa-en/home.html", note: "Logistics facility works" },
                            { name: "Al Meera Consumer Goods", url: "https://www.almeera.com.qa", note: "Retail branch infrastructure" },
                            { name: "IMALCO Qatar", url: "https://www.imalco.com", note: "Industrial facility works" },
                            { name: "Ministry of Awqaf & Islamic Affairs", url: "https://awqaf.gov.qa", note: "Mosque infrastructure" },
                            { name: "FIFA World Cup Qatar 2022", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022", note: "World Cup venue works" },
                        ].map(({ name, url, note }) => (
                            <li key={name} className="border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener"
                                    className="font-semibold text-foreground hover:text-primary transition-colors block mb-1"
                                >
                                    {name}
                                </a>
                                <span className="text-muted-foreground text-xs">{note}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
