import type { Metadata } from "next";
import AsphaltWorksPageClient from "./page-client";

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
            <AsphaltWorksPageClient />
        </>
    );
}
