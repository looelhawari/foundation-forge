import type { Metadata } from "next";
import ContactPage from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Contact CPC Qatar | Get a Free Quote for Road Construction",
    description:
        "Contact CPC Qatar for road construction, asphalt paving, earthworks & infrastructure projects in Doha, Qatar. Call +974 4432 2743 or request a free quote online.",
    alternates: { canonical: "/contact" },
    keywords: [
        "contact CPC Qatar", "road construction quote Qatar", "civil contractor Doha contact",
        "construction quote Doha", "infrastructure project inquiry Qatar",
        "اتصل بنا CPC قطر", "طلب عرض سعر مقاولات",
    ],
    openGraph: {
        title: "Contact CPC Qatar | Get a Free Quote for Road Construction",
        description: "Request a free quote for your road construction or infrastructure project in Qatar.",
        url: "/contact",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact CPC Qatar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact CPC Qatar | Free Road Construction Quote",
        description: "Call +974 4432 2743 or request a free quote for your construction project in Doha, Qatar.",
        images: ["/og-image.png"],
    },
};

const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact CPC Qatar",
    description: "Get in touch with CPC Qatar for road construction and infrastructure projects.",
    url: `${SITE_URL}/contact`,
    mainEntity: {
        "@type": "Organization",
        name: "CPC Qatar — Cosmo Projects & Construction",
        telephone: "+974-4432-2743",
        email: "Info@ctgroups.net",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Mirqab Mall, Area No. 39, Street No. 840, Building No. 53",
            addressLocality: "Doha",
            addressCountry: "QA",
            postalCode: "15776",
        },
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
            />
            <ContactPage />
        </>
    );
}
