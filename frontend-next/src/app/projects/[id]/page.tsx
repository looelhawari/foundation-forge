import type { Metadata } from "next";
import ProjectDetailPage from "./page-client";

export const metadata: Metadata = {
    title: "Project Details | CPC Qatar Infrastructure & Road Construction",
    description:
        "View detailed information about CPC Qatar road construction and infrastructure projects. Quality road & civil works delivered across Qatar since 2017.",
    alternates: { canonical: "/projects" },
    openGraph: {
        title: "Project Details | CPC Qatar",
        description:
            "Detailed project information — CPC Qatar road construction & infrastructure.",
    },
    robots: { index: true, follow: true },
};

export default function Page() {
    return <ProjectDetailPage />;
}
