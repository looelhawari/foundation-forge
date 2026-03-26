import type { Metadata } from "next";
import RoadMarkingPageClient from "./page-client";

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
            <RoadMarkingPageClient />
        </>
    );
}
