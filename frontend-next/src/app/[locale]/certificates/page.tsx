import type { Metadata } from "next";
import CertificatesPage from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Certificates & Accreditations | CPC Qatar Quality Standards",
    description:
        "View CPC Qatar official certificates, accreditations and quality standards. Government-approved contractor CR 108122 with ISO-compliant road construction practices.",
    alternates: { canonical: "/certificates" },
    keywords: [
        "CPC Qatar certificates", "construction accreditations Qatar", "ISO road construction Qatar",
        "CR 108122 contractor", "Qatar government approved contractor", "quality standards construction",
    ],
    openGraph: {
        title: "Certificates & Accreditations | CPC Qatar Quality Standards",
        description: "Official certificates and quality accreditations for CPC Qatar road construction.",
        url: "/certificates",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Certificates" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Certificates & Accreditations",
        description: "Government-approved contractor CR 108122. ISO-compliant road construction practices.",
        images: ["/og-image.png"],
    },
};

const certificatesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CPC Qatar Certificates & Accreditations",
    description:
        "Official company certificates, commercial registration, tax card, and commercial permit for Cosmo Projects & Construction and Trading W.L.L. (CR 108122).",
    url: `${SITE_URL}/certificates`,
    isPartOf: { "@type": "WebSite", name: "CPC Qatar", url: SITE_URL },
    mainEntity: {
        "@type": "ItemList",
        name: "CPC Qatar Official Documents",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "CreativeWork",
                    name: "Commercial Registration",
                    description: "Government-issued commercial registration CR 108122, valid through December 2029.",
                    url: `${SITE_URL}/cert/Commercial%20Registration%20Dec%202029.pdf`,
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "CreativeWork",
                    name: "Computer Card",
                    description: "Official computer card for Cosmo Projects & Construction, valid through 2028.",
                    url: `${SITE_URL}/cert/Computer%20Card%202028.pdf`,
                },
            },
            {
                "@type": "ListItem",
                position: 3,
                item: {
                    "@type": "CreativeWork",
                    name: "Tax Card",
                    description: "CPC Qatar official tax registration card.",
                    url: `${SITE_URL}/cert/CPC%20TAX%20CARD.pdf`,
                },
            },
            {
                "@type": "ListItem",
                position: 4,
                item: {
                    "@type": "CreativeWork",
                    name: "Commercial Permit",
                    description: "Commercial permit for CPC Qatar, valid through October 2029.",
                    url: `${SITE_URL}/cert/CR%20Commercial%20Permit%20OCT%202029.pdf`,
                },
            },
        ],
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(certificatesJsonLd) }}
            />
            <CertificatesPage />
        </>
    );
}
