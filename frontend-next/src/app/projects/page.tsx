import type { Metadata } from "next";
import ProjectsPage from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Projects | Road Construction & Infrastructure Portfolio",
    description:
        "Browse 90+ completed road construction & infrastructure projects by CPC Qatar across Doha and Qatar. Asphalt paving, road marking, earthworks, drainage and more.",
    alternates: { canonical: "/projects" },
    keywords: [
        "CPC Qatar projects", "road construction portfolio Qatar", "infrastructure projects Doha",
        "asphalt paving projects Qatar", "completed construction projects Doha",
        "highway construction Qatar", "road development projects", "مشاريع CPC قطر",
    ],
    openGraph: {
        title: "Projects | Road Construction & Infrastructure Portfolio | CPC Qatar",
        description: "Explore our portfolio of 90+ road construction & infrastructure projects delivered across Qatar.",
        url: "/projects",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Project Portfolio" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Projects | 90+ Road Construction Projects in Qatar",
        description: "Browse our portfolio of asphalt paving, road marking, earthworks & infrastructure projects.",
        images: ["/og-image.png"],
    },
};

const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CPC Qatar Project Portfolio",
    description: "Browse 90+ road construction and infrastructure projects completed by CPC Qatar across Doha and Qatar.",
    url: `${SITE_URL}/projects`,
    isPartOf: { "@type": "WebSite", name: "CPC Qatar", url: SITE_URL },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />
            <ProjectsPage />
        </>
    );
}
