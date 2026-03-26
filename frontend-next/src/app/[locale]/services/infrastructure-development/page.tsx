import type { Metadata } from "next";
import InfrastructureDevelopmentPageClient from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Infrastructure Development & Civil Works in Qatar | CPC Qatar",
    description:
        "Drainage systems, stormwater management, utility duct installation and civil works in Doha, Qatar. Government-approved infrastructure contractor.",
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
            <InfrastructureDevelopmentPageClient />
        </>
    );
}
