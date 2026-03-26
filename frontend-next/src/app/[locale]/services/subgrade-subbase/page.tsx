import type { Metadata } from "next";
import SubgradeSubbasePageClient from "./page-client";

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
            <SubgradeSubbasePageClient />
        </>
    );
}
