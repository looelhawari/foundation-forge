import type { Metadata } from "next";
import ServicesPageClient from "./page-client";

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
            <ServicesPageClient />
        </>
    );
}
