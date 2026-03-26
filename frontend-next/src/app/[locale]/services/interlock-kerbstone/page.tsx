import type { Metadata } from "next";
import InterlockKerbstonePageClient from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Interlock & Kerbstone Installation in Qatar | CPC Qatar",
    description:
        "Interlock paving & kerbstone installation in Doha, Qatar. Walkways, driveways, plazas and decorative block paving for commercial and government projects.",
    alternates: { canonical: "/services/interlock-kerbstone" },
    keywords: [
        "interlock paving Qatar",
        "kerbstone installation Doha",
        "interlock block paving Qatar",
        "kerbstone contractor Qatar",
        "paver installation Doha",
        "walkway construction Qatar",
        "interlocking pavement Qatar",
        "decorative paving Doha",
        "concrete block paving Qatar",
        "kerb installation Qatar",
        "رصف انترلوك قطر",
        "تركيب حجر الرصيف الدوحة",
        "مقاول انترلوك قطر",
    ],
    openGraph: {
        title: "Interlock & Kerbstone Installation in Qatar | CPC Qatar",
        description:
            "Interlock paving, kerbstone installation, walkways, and decorative block paving. Professional contractor in Doha, Qatar.",
        url: "/services/interlock-kerbstone",
        images: [{ url: "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312054/cpc-website/services/interllock.jpg", width: 1200, height: 630, alt: "Interlock paving in Qatar by CPC" }],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "Interlock & Kerbstone", item: `${SITE_URL}/services/interlock-kerbstone` },
    ],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Interlock & Kerbstone Installation",
    description:
        "Professional interlock paving and kerbstone installation for walkways, driveways, plazas, and commercial areas in Qatar.",
    url: `${SITE_URL}/services/interlock-kerbstone`,
    provider: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
        url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    serviceType: "Interlock & Kerbstone Installation",
};

export default function InterlockKerbstonePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <InterlockKerbstonePageClient />
        </>
    );
}
