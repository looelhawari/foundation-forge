import type { Metadata } from "next";
import EarthworksPageClient from "./page-client";

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
            <EarthworksPageClient />
        </>
    );
}
