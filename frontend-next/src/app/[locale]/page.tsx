import type { Metadata } from "next";
import HomePage from "./page-client";

export const metadata: Metadata = {
    title: {
        absolute: "CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar",
    },
    description:
        "CPC Qatar (Cosmo Projects & Construction) — Leading road construction & infrastructure company in Doha. Asphalt paving, road marking, earthworks, interlock & subbase works. 90+ projects delivered since 2017.",
    alternates: {
        canonical: "/",
    },
    keywords: [
        "CPC Qatar", "road construction Qatar", "infrastructure company Doha",
        "asphalt paving Qatar", "civil contractor Qatar", "road marking company Doha",
        "earthworks contractor Qatar", "interlock paving Qatar", "subbase works Doha",
        "construction company Qatar", "شركة مقاولات قطر", "بناء طرق قطر", "بنية تحتية قطر",
    ],
    openGraph: {
        title: "CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar",
        description:
            "90+ projects delivered across Qatar. Excellence in asphalt pavements, road marking, earthworks & infrastructure development since 2017.",
        url: "/",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar — Road Construction & Infrastructure" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar | Road Construction & Infrastructure Company in Doha",
        description: "90+ projects delivered. Asphalt paving, road marking, earthworks & infrastructure since 2017.",
        images: ["/og-image.png"],
    },
};

export default function Page() {
    return <HomePage />;
}
