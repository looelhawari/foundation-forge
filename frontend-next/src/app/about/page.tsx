import type { Metadata } from "next";
import AboutPage from "./page-client";

export const metadata: Metadata = {
    title: "About CPC Qatar | Road Construction & Civil Engineering Since 2017 | Doha",
    description:
        "Learn about CPC Qatar (Cosmo Projects & Construction) — Founded in 2017 in Doha, Qatar. 90+ road & infrastructure projects delivered. Government-approved contractor CR 108122. Serving Ministry of Education, FIFA World Cup 2022 & more.",
    alternates: { canonical: "/about" },
    keywords:
        "CPC Qatar about, Cosmo Projects Construction history, civil engineering contractor Doha, construction company Qatar since 2017, شركة كوزمو للمشاريع والإنشاءات",
    openGraph: {
        title: "About CPC Qatar | Road Construction & Civil Engineering Since 2017",
        description:
            "Founded in 2017, CPC Qatar has delivered 90+ road & infrastructure projects across Qatar.",
        url: "/about",
    },
};

export default function Page() {
    return <AboutPage />;
}
