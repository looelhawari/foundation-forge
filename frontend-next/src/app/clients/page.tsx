import type { Metadata } from "next";
import ClientsPage from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Clients & Testimonials | Trusted by Leading Qatar Organizations",
    description:
        "See CPC Qatar trusted clients and testimonials — Ministry of Education, Ashghal, FIFA 2022 contractors, and leading construction firms across Qatar.",
    alternates: { canonical: "/clients" },
    keywords: [
        "CPC Qatar clients", "road construction testimonials Qatar", "Qatar construction partners",
        "Ashghal approved contractor", "FIFA 2022 contractor Qatar", "Ministry of Education contractor",
        "عملاء CPC قطر", "شهادات عملاء مقاولات",
    ],
    openGraph: {
        title: "Clients & Testimonials | CPC Qatar",
        description: "Trusted by Qatar's leading organizations. See our client list and testimonials.",
        url: "/clients",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Clients & Partners" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Clients | Trusted by Ministry of Education, Ashghal & More",
        description: "Government & private sector clients across Qatar. View testimonials from leading organizations.",
        images: ["/og-image.png"],
    },
};

const clientsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CPC Qatar Clients & Testimonials",
    description:
        "Trusted clients and testimonials for CPC Qatar — serving Ministry of Education, Ashghal, FIFA 2022 contractors, and leading organizations across Qatar.",
    url: `${SITE_URL}/clients`,
    isPartOf: { "@type": "WebSite", name: "CPC Qatar", url: SITE_URL },
    mainEntity: {
        "@type": "ItemList",
        name: "CPC Qatar Client Organizations",
        itemListElement: [
            { "@type": "ListItem", position: 1, item: { "@type": "Organization", name: "Ministry of Education — Qatar" } },
            { "@type": "ListItem", position: 2, item: { "@type": "Organization", name: "Ashghal — Public Works Authority" } },
            { "@type": "ListItem", position: 3, item: { "@type": "Organization", name: "FIFA World Cup Qatar 2022" } },
            { "@type": "ListItem", position: 4, item: { "@type": "Organization", name: "Imalco Qatar" } },
            { "@type": "ListItem", position: 5, item: { "@type": "Organization", name: "Techno Qatar" } },
        ],
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(clientsJsonLd) }}
            />
            <ClientsPage />
        </>
    );
}
