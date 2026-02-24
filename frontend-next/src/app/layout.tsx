import type { Metadata, Viewport } from "next";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

// ═══════════════════════════════════════════════════════
// ROOT METADATA — Server-side SEO (replaces index.html <head>)
// ═══════════════════════════════════════════════════════
export const metadata: Metadata = {
    metadataBase: new URL("https://cpc-qa.com"),
    title: {
        default:
            "CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar",
        template: "%s",
    },
    description:
        "CPC Qatar (Cosmo Projects & Construction) — Leading road construction & infrastructure company in Doha, Qatar. Asphalt paving, road marking, earthworks, interlock & subbase works. 90+ projects delivered since 2017. | كوزمو للمشاريع والإنشاءات — شركة رائدة في بناء الطرق والبنية التحتية في قطر.",
    keywords: [
        "CPC Qatar",
        "Cosmo Projects Construction",
        "road construction Qatar",
        "infrastructure contractor qatar",
        "asphalt paving Doha",
        "road marking Qatar",
        "earthworks Qatar",
        "civil engineering Qatar",
        "construction company Doha",
        "شركة مقاولات في قطر",
        "شركة إنشاء طرق قطر",
        "بنية تحتية قطر",
        "كوزمو للمشاريع والإنشاءات",
    ],
    authors: [
        { name: "Cosmo Projects & Construction and Trading W.L.L." },
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        url: "https://cpc-qa.com/",
        title:
            "CPC Qatar | Road Construction & Infrastructure Company in Doha",
        description:
            "90+ projects delivered across Qatar. Excellence in asphalt pavements, road marking, earthworks & infrastructure development since 2017.",
        images: [
            {
                url: "https://cpc-qa.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "CPC Qatar — Cosmo Projects & Construction",
            },
        ],
        siteName: "CPC Qatar — Cosmo Projects & Construction",
        locale: "en_US",
        alternateLocale: ["ar_QA"],
    },
    twitter: {
        card: "summary_large_image",
        site: "@CPCQatar",
        creator: "@CPCQatar",
        title: "CPC Qatar | Road Construction & Infrastructure Excellence",
        description:
            "Premier construction company in Doha — asphalt, road marking, earthworks, interlock & infrastructure. 90+ projects since 2017.",
        images: ["https://cpc-qa.com/og-image.png"],
    },
    alternates: {
        canonical: "https://cpc-qa.com/",
        languages: {
            en: "https://cpc-qa.com/",
            ar: "https://cpc-qa.com/?lang=ar",
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico?v=4", sizes: "any" },
        ],
        apple: [
            { url: "/favicon.ico?v=4", sizes: "180x180" },
        ],
    },
    manifest: "/manifest.json?v=4",
    other: {
        "geo.region": "QA",
        "geo.placename": "Doha, Qatar",
        "geo.position": "25.2734836;51.5014973",
        ICBM: "25.2734836, 51.5014973",
        language: "English, Arabic",
        "content-language": "en, ar",
    },
};

export const viewport: Viewport = {
    themeColor: "#1a1a2e",
};

// ═══════════════════════════════════════════════════════
// STRUCTURED DATA — Organization, LocalBusiness, WebSite, etc.
// ═══════════════════════════════════════════════════════
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cosmo Projects & Construction and Trading W.L.L.",
    alternateName: ["CPC Qatar", "CPC", "كوزمو للمشاريع والإنشاءات والتجارة"],
    url: "https://cpc-qa.com",
    logo: "https://cpc-qa.com/logo.png",
    description:
        "Leading road construction, asphalt paving, and infrastructure development company in Doha, Qatar. Delivering excellence since 2017.",
    foundingDate: "2017",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 200 },
    address: {
        "@type": "PostalAddress",
        streetAddress:
            "Mirqab Mall, Area No. 39, Street No. 840, Building No. 53, Block D, Office No. 307-308",
        addressLocality: "Doha",
        addressRegion: "Doha",
        addressCountry: "QA",
        postalCode: "15776",
    },
    geo: { "@type": "GeoCoordinates", latitude: "25.2734836", longitude: "51.5014973" },
    areaServed: [
        { "@type": "Country", name: "Qatar" },
        { "@type": "City", name: "Doha" },
        { "@type": "City", name: "Al Wakrah" },
        { "@type": "City", name: "Al Khor" },
        { "@type": "City", name: "Lusail" },
    ],
    sameAs: [],
    contactPoint: [
        {
            "@type": "ContactPoint",
            telephone: "+974-4432-2743",
            email: "Info@ctgroups.net",
            contactType: "customer service",
            availableLanguage: ["English", "Arabic"],
            areaServed: "QA",
        },
    ],
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "CPC Qatar — Cosmo Projects & Construction",
    alternateName: "كوزمو للمشاريع والإنشاءات",
    image: "https://cpc-qa.com/logo.png",
    url: "https://cpc-qa.com",
    description:
        "Premier road construction and civil engineering company in Qatar specializing in asphalt pavements, road marking, earthworks, interlock paving, and infrastructure development.",
    priceRange: "$$$$",
    address: {
        "@type": "PostalAddress",
        streetAddress:
            "Mirqab Mall, Area No. 39, Street No. 840, Building No. 53, Block D, Office No. 307-308",
        addressLocality: "Doha",
        addressRegion: "Doha",
        postalCode: "15776",
        addressCountry: "QA",
    },
    telephone: "+974-4432-2743",
    email: "Info@ctgroups.net",
    geo: { "@type": "GeoCoordinates", latitude: "25.2734836", longitude: "51.5014973" },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Construction Services",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Asphalt Pavement Construction",
                    description:
                        "Professional asphalt paving and road surface construction for highways, streets, and commercial areas in Qatar.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Road Marking & Traffic Signs",
                    description:
                        "Thermoplastic and cold paint road marking, traffic signs, and road safety installations across Qatar.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Earthworks & Grading",
                    description:
                        "Site preparation, excavation, grading, filling, and land leveling services for construction projects.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Interlock & Block Paving",
                    description:
                        "Decorative and functional interlock block paving for walkways, driveways, and commercial spaces.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Subgrade & Subbase Works",
                    description:
                        "Foundation layer construction including subgrade preparation, subbase, and base course installation.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Infrastructure Development",
                    description:
                        "Complete civil infrastructure including drainage, utilities, curbs, and stormwater management systems.",
                },
            },
        ],
    },
    knowsLanguage: ["en", "ar"],
    areaServed: { "@type": "Country", name: "Qatar" },
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CPC Qatar",
    alternateName: ["Cosmo Projects & Construction", "كوزمو للمشاريع والإنشاءات"],
    url: "https://cpc-qa.com",
    inLanguage: ["en", "ar"],
    potentialAction: {
        "@type": "SearchAction",
        target: "https://cpc-qa.com/projects?q={search_term_string}",
        "query-input": "required name=search_term_string",
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cpc-qa.com/" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://cpc-qa.com/about" },
        { "@type": "ListItem", position: 3, name: "Projects", item: "https://cpc-qa.com/projects" },
        { "@type": "ListItem", position: 4, name: "Clients", item: "https://cpc-qa.com/clients" },
        { "@type": "ListItem", position: 5, name: "Contact", item: "https://cpc-qa.com/contact" },
        { "@type": "ListItem", position: 6, name: "Certificates", item: "https://cpc-qa.com/certificates" },
    ],
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What construction services does CPC Qatar offer?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "CPC Qatar (Cosmo Projects & Construction) offers a full range of construction services including asphalt pavement construction, road marking and traffic signs, earthworks and grading, interlock block paving, subgrade and subbase works, steel fabrication, site preparation, and complete infrastructure development across Qatar.",
            },
        },
        {
            "@type": "Question",
            name: "Where is CPC Qatar located?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "CPC Qatar is headquartered in Doha, Qatar, and serves all areas including Lusail, Al Wakrah, Al Khor, Al Rayyan, and throughout the State of Qatar.",
            },
        },
        {
            "@type": "Question",
            name: "How many projects has CPC Qatar completed?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "CPC Qatar has successfully completed over 90 construction and infrastructure projects across Qatar since its establishment in 2017, serving both government and private sector clients.",
            },
        },
        {
            "@type": "Question",
            name: "ما هي خدمات شركة CPC قطر؟",
            acceptedAnswer: {
                "@type": "Answer",
                text: "تقدم شركة كوزمو للمشاريع والإنشاءات (CPC قطر) مجموعة كاملة من خدمات البناء تشمل رصف الأسفلت، علامات الطرق، الأعمال الترابية، رصف الانترلوك، أعمال التسوية والتأسيس، وتطوير البنية التحتية في جميع أنحاء قطر.",
            },
        },
        {
            "@type": "Question",
            name: "Does CPC Qatar handle government projects?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, CPC Qatar has extensive experience working on government infrastructure projects including road construction, highway development, and public facilities across Qatar. The company holds all necessary certifications and approvals for government contracting.",
            },
        },
    ],
};

// ═══════════════════════════════════════════════════════
// ROOT LAYOUT
// ═══════════════════════════════════════════════════════
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <head>
                {/* Performance — Preconnect & DNS Prefetch */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

                {/* Preload critical fonts */}
                <link
                    rel="preload"
                    href="https://fonts.gstatic.com/s/bebasneu/v14/JTUSjIg69CK48gW7PXoo9WdhyyTh89ZNpQ.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                {/* Google Fonts */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* Structured Data — Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                {/* Structured Data — LocalBusiness */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                {/* Structured Data — WebSite */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
                {/* Structured Data — BreadcrumbList */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                {/* Structured Data — FAQ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            </head>
            <body>
                {/* Noscript fallback for SEO crawlers */}
                <noscript>
                    <h1>CPC Qatar — Cosmo Projects &amp; Construction | Road Construction &amp; Infrastructure Company in Doha, Qatar</h1>
                    <h2>كوزمو للمشاريع والإنشاءات — شركة إنشاء طرق وبنية تحتية في قطر</h2>
                    <p>
                        CPC Qatar (Cosmo Projects &amp; Construction and Trading W.L.L.) is a leading road construction, asphalt paving, and
                        infrastructure development company headquartered in Doha, Qatar. Since 2017, we have delivered 90+ projects across
                        Qatar for clients including the Ministry of Education, FIFA World Cup Qatar 2022, Qatar Museums, DHL, and Al Meera.
                    </p>
                </noscript>

                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
