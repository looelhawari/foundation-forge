import type { Metadata } from "next";
import HomePage from "./page-client";

export const metadata: Metadata = {
    title: "CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar",
    description:
        "CPC Qatar (Cosmo Projects & Construction) — Leading road construction & infrastructure company in Doha. Asphalt paving, road marking, earthworks, interlock & subbase works. 90+ projects delivered since 2017.",
    alternates: {
        canonical: "/",
    },
    keywords:
        "CPC Qatar, road construction Qatar, infrastructure company Doha, asphalt paving Qatar, civil contractor Qatar, شركة مقاولات قطر, بناء طرق قطر, بنية تحتية قطر",
    openGraph: {
        title: "CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar",
        description:
            "90+ projects delivered across Qatar. Excellence in asphalt pavements, road marking, earthworks & infrastructure development since 2017.",
        url: "/",
    },
};

export default function Page() {
    return <HomePage />;
}
