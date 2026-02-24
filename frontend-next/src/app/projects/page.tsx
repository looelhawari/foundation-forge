import type { Metadata } from "next";
import ProjectsPage from "./page-client";

export const metadata: Metadata = {
    title: "Projects | Road Construction & Infrastructure Portfolio | CPC Qatar",
    description:
        "Browse 90+ completed road construction & infrastructure projects by CPC Qatar across Doha and Qatar. Asphalt paving, road marking, earthworks, drainage and more.",
    alternates: { canonical: "/projects" },
    keywords:
        "CPC Qatar projects, road construction portfolio Qatar, infrastructure projects Doha, asphalt paving projects Qatar, مشاريع CPC قطر",
    openGraph: {
        title: "Projects | Road Construction Portfolio | CPC Qatar",
        description:
            "Explore our portfolio of 90+ road construction & infrastructure projects delivered across Qatar.",
        url: "/projects",
    },
};

export default function Page() {
    return <ProjectsPage />;
}
