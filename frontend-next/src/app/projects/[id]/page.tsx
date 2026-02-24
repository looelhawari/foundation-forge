import type { Metadata } from "next";
import ProjectDetailPage from "./page-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

async function getProject(id: string) {
    try {
        const res = await fetch(`${API_URL}/projects/${id}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data || json;
    } catch {
        return null;
    }
}

// Generate unique metadata per project (server-side fetch)
export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const project = await getProject(params.id);

    if (!project) {
        return {
            title: "Project Details",
            description:
                "View detailed information about CPC Qatar road construction and infrastructure projects. Quality road & civil works delivered across Qatar since 2017.",
            alternates: { canonical: "/projects" },
            openGraph: {
                title: "Project Details | CPC Qatar",
                description: "Detailed project information — CPC Qatar road construction & infrastructure.",
                images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Projects" }],
            },
            twitter: {
                card: "summary_large_image",
                title: "Project Details | CPC Qatar",
                description: "Detailed project information — CPC Qatar road construction & infrastructure.",
                images: ["/og-image.png"],
            },
            robots: { index: true, follow: true },
        };
    }

    const title = project.title || "Project Details";
    const description =
        project.description?.slice(0, 160) ||
        `View ${title} — a road construction & infrastructure project by CPC Qatar in ${project.location || "Qatar"}.`;

    return {
        title,
        description,
        alternates: { canonical: `/projects/${params.id}` },
        keywords: [
            title,
            project.location ? `construction project ${project.location}` : "",
            typeof project.category === "object" ? project.category?.name : project.category,
            "CPC Qatar project",
            "road construction Qatar",
        ].filter(Boolean),
        openGraph: {
            title: `${title} | CPC Qatar`,
            description,
            images: project.images?.[0]
                ? [{ url: project.images[0], width: 1200, height: 630, alt: title }]
                : [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar" }],
            url: `/projects/${params.id}`,
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | CPC Qatar`,
            description,
            images: project.images?.[0] ? [project.images[0]] : ["/og-image.png"],
        },
        robots: { index: true, follow: true },
    };
}

// Server component — render JSON-LD structured data + client page
export default async function Page({
    params,
}: {
    params: { id: string };
}) {
    const project = await getProject(params.id);

    // Build ConstructionProject JSON-LD if we have data
    const jsonLd = project
        ? {
              "@context": "https://schema.org",
              "@type": "ConstructionProject" as const,
              name: project.title,
              description: project.description || undefined,
              url: `${SITE_URL}/projects/${params.id}`,
              image: project.images?.[0] || undefined,
              location: project.location
                  ? {
                        "@type": "Place" as const,
                        name: project.location,
                        address: {
                            "@type": "PostalAddress" as const,
                            addressLocality: project.location,
                            addressCountry: "QA",
                        },
                    }
                  : undefined,
              contractor: {
                  "@type": "Organization" as const,
                  name: "CPC Qatar — Cosmo Projects & Construction",
                  url: SITE_URL,
              },
              client: project.client
                  ? { "@type": "Organization" as const, name: project.client }
                  : undefined,
              dateCreated: project.year || undefined,
          }
        : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <ProjectDetailPage />
        </>
    );
}
