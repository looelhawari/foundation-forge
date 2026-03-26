import type { Metadata } from "next";
import AboutPage from "./page-client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "About CPC Qatar | Road Construction & Civil Engineering Since 2017",
    description:
        "CPC Qatar — founded 2017 in Doha. 90+ road & infrastructure projects. Approved contractor CR 108122. Trusted by Ashghal, Ministry of Education & FIFA 2022.",
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
        "@id": `${SITE_URL}/#organization`,
        name: "Cosmo Projects & Construction and Trading W.L.L.",
        alternateName: "CPC Qatar",
        url: SITE_URL,
        foundingDate: "2017",
        foundingLocation: { "@type": "Place", name: "Doha, Qatar" },
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 200 },
        knowsAbout: [
            "Road Construction", "Asphalt Paving", "Infrastructure Development",
            "Earthworks", "Road Marking", "Interlock Paving",
            "Subgrade and Subbase Works", "Civil Engineering Qatar",
        ],
        hasCredential: [
            {
                "@type": "EducationalOccupationalCredential",
                name: "Commercial Registration CR 108122",
                url: `${SITE_URL}/certificates`,
                credentialCategory: "Government Contractor Registration",
            },
        ],
        // Work history — links CPC identity to client authority nodes
        workExample: [
            {
                "@type": "CreativeWork",
                name: "Road Construction & Infrastructure for Ministry of Education — Qatar",
                description: "Delivered road construction, earthworks, and paving infrastructure for multiple Ministry of Education school campuses across Qatar.",
                provider: { "@id": `${SITE_URL}/#organization` },
                client: {
                    "@type": "GovernmentOrganization",
                    "@id": "https://edu.gov.qa",
                    name: "Ministry of Education — State of Qatar",
                    url: "https://edu.gov.qa",
                },
            },
            {
                "@type": "CreativeWork",
                name: "Infrastructure Works for Ashghal — Qatar Public Works Authority",
                description: "Completed road construction and infrastructure development projects for Ashghal, Qatar's premier public works authority, across multiple zones.",
                provider: { "@id": `${SITE_URL}/#organization` },
                client: {
                    "@type": "GovernmentOrganization",
                    "@id": "https://www.ashghal.gov.qa",
                    name: "Ashghal — Public Works Authority Qatar",
                    url: "https://www.ashghal.gov.qa",
                },
            },
            {
                "@type": "CreativeWork",
                name: "Site Development for FIFA World Cup Qatar 2022 Contractors",
                description: "Road marking and infrastructure works for FIFA World Cup Qatar 2022 venue and surrounding development projects.",
                provider: { "@id": `${SITE_URL}/#organization` },
                client: {
                    "@type": "SportsOrganization",
                    "@id": "https://www.fifa.com",
                    name: "FIFA World Cup Qatar 2022",
                    url: "https://www.fifa.com",
                },
            },
            {
                "@type": "CreativeWork",
                name: "Pavement & Infrastructure Works for Qatar Museums",
                description: "Road and paving infrastructure works for Qatar Museums heritage and cultural sites.",
                provider: { "@id": `${SITE_URL}/#organization` },
                client: {
                    "@type": "Organization",
                    "@id": "https://www.qm.org.qa",
                    name: "Qatar Museums",
                    url: "https://www.qm.org.qa",
                },
            },
            {
                "@type": "CreativeWork",
                name: "Facility Infrastructure for Al Meera Consumer Goods",
                description: "Road and site infrastructure works for Al Meera branch facilities across Qatar.",
                provider: { "@id": `${SITE_URL}/#organization` },
                client: {
                    "@type": "Corporation",
                    "@id": "https://www.almeera.com.qa",
                    name: "Al Meera Consumer Goods Company",
                    url: "https://www.almeera.com.qa",
                },
            },
            {
                "@type": "CreativeWork",
                name: "Logistics Facility Infrastructure for DHL Qatar",
                description: "Infrastructure and paving works for DHL Qatar logistics and warehouse facilities.",
                provider: { "@id": `${SITE_URL}/#organization` },
                client: {
                    "@type": "Corporation",
                    "@id": "https://www.dhl.com/qa-en/home.html",
                    name: "DHL Qatar",
                    url: "https://www.dhl.com/qa-en/home.html",
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />
            <AboutPage />
        </>
    );
}
