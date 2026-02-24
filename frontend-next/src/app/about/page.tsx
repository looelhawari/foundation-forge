import type { Metadata } from "next";
import AboutPage from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "About CPC Qatar | Road Construction & Civil Engineering Since 2017",
    description:
        "Learn about CPC Qatar (Cosmo Projects & Construction) — Founded in 2017 in Doha, Qatar. 90+ road & infrastructure projects delivered. Government-approved contractor CR 108122. Serving Ministry of Education, FIFA World Cup 2022 & more.",
    alternates: { canonical: "/about" },
    keywords: [
        "about CPC Qatar", "Cosmo Projects Construction history", "civil engineering contractor Doha",
        "construction company Qatar since 2017", "Qatar road contractor experience",
        "government contractor Qatar CR 108122", "شركة كوزمو للمشاريع والإنشاءات",
    ],
    openGraph: {
        title: "About CPC Qatar | Road Construction & Civil Engineering Since 2017",
        description: "Founded in 2017, CPC Qatar has delivered 90+ road & infrastructure projects across Qatar.",
        url: "/about",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About CPC Qatar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About CPC Qatar | Road Construction Since 2017",
        description: "Founded in 2017 in Doha. 90+ projects delivered. Government-approved contractor CR 108122.",
        images: ["/og-image.png"],
    },
};

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About CPC Qatar",
    description: "History, mission, and values of Cosmo Projects & Construction — road construction leaders in Qatar since 2017.",
    url: `${SITE_URL}/about`,
    mainEntity: {
        "@type": "Organization",
        name: "Cosmo Projects & Construction and Trading W.L.L.",
        foundingDate: "2017",
        foundingLocation: { "@type": "Place", name: "Doha, Qatar" },
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 200 },
        knowsAbout: [
            "Road Construction", "Asphalt Paving", "Infrastructure Development",
            "Earthworks", "Road Marking", "Interlock Paving",
        ],
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />
            <AboutPage />
        </>
    );
}
