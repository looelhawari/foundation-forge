import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Tajawal } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

// ═══════════════════════════════════════════════════════
// OPTIMIZED FONTS — next/font eliminates render-blocking requests
// ═══════════════════════════════════════════════════════
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-inter",
    preload: true,
});

const bebasNeue = Bebas_Neue({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
    variable: "--font-bebas-neue",
    preload: true,
});

const tajawal = Tajawal({
    subsets: ["arabic", "latin"],
    display: "swap",
    weight: ["300", "400", "500", "700"],
    variable: "--font-tajawal",
    preload: true,
});

// ═══════════════════════════════════════════════════════
// ROOT METADATA — Server-side SEO (replaces index.html <head>)
// ═══════════════════════════════════════════════════════
export const metadata: Metadata = {
    metadataBase: new URL("https://cpc-qa.com"),
    title: {
        default:
            "CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar",
        template: "%s | CPC Qatar",
    },
    description:
        "CPC Qatar — Road construction & infrastructure company in Doha, Qatar. Asphalt paving, road marking, earthworks, interlock. 90+ projects delivered since 2017.",
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
        // iOS PWA — required for mobile-first indexing
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
        "apple-mobile-web-app-title": "CPC Qatar",
    },
};

export const viewport: Viewport = {
    themeColor: "#1a1a2e",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

// ═══════════════════════════════════════════════════════
// STRUCTURED DATA — WebSite, BreadcrumbList, FAQ (static)
// Organization & LocalBusiness schemas are rendered dynamically
// by the <StructuredData /> client component using site_settings.
// ═══════════════════════════════════════════════════════

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
        { "@type": "ListItem", position: 3, name: "Services", item: "https://cpc-qa.com/services" },
        { "@type": "ListItem", position: 4, name: "Projects", item: "https://cpc-qa.com/projects" },
        { "@type": "ListItem", position: 5, name: "Clients", item: "https://cpc-qa.com/clients" },
        { "@type": "ListItem", position: 6, name: "Contact", item: "https://cpc-qa.com/contact" },
        { "@type": "ListItem", position: 7, name: "Certificates", item: "https://cpc-qa.com/certificates" },
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
                text: "CPC Qatar offers asphalt pavement construction, road marking and traffic signs, earthworks and grading, interlock block paving, subgrade and subbase works, and complete infrastructure development across Qatar.",
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
        <html suppressHydrationWarning className={`${inter.variable} ${bebasNeue.variable} ${tajawal.variable}`}>
            <head>
                {/* Performance — Preconnect & DNS Prefetch (fonts handled by next/font) */}
                <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

                {/* Preload LCP hero image — responsive for mobile/desktop */}
                <link
                    rel="preload"
                    as="image"
                    imageSrcSet="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto,w_828/v1772312015/cpc-website/hero-construction.jpg 828w, https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312015/cpc-website/hero-construction.jpg 1920w"
                    imageSizes="100vw"
                    fetchPriority="high"
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

                <ClientProviders><StructuredData /><main id="main-content">{children}</main></ClientProviders>
            </body>
        </html>
    );
}
