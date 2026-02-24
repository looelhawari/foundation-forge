import type { Metadata } from "next";
import ProjectDetailPage from "./page-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Generate unique metadata per project (server-side fetch)
export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    try {
        const res = await fetch(`${API_URL}/projects/${params.id}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        const project = json.data || json;

        const title = project.title || "Project Details";
        const description =
            project.description ||
            `View ${title} — a road construction & infrastructure project by CPC Qatar in ${project.location || "Qatar"}.`;

        return {
            title: `${title} | CPC Qatar Projects`,
            description,
            alternates: { canonical: `/projects/${params.id}` },
            openGraph: {
                title: `${title} | CPC Qatar`,
                description,
                images: project.images?.[0]
                    ? [{ url: project.images[0], width: 1200, height: 630, alt: title }]
                    : [],
                url: `/projects/${params.id}`,
            },
            twitter: {
                card: "summary_large_image",
                title: `${title} | CPC Qatar`,
                description,
                images: project.images?.[0] ? [project.images[0]] : [],
            },
            robots: { index: true, follow: true },
        };
    } catch {
        return {
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
    }
}

export default function Page() {
    return <ProjectDetailPage />;
}
