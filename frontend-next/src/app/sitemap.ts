import type { MetadataRoute } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";
    const now = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/projects`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/clients`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/certificates`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${siteUrl}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Dynamic project pages — fetched from API
    let projectPages: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_URL}/projects?limit=1000&status=active`, {
            next: { revalidate: 3600 },
        });
        if (res.ok) {
            const json = await res.json();
            const projects = json.data?.projects || json.projects || [];
            projectPages = projects.map((p: any) => ({
                url: `${siteUrl}/projects/${p.slug || p.id}`,
                lastModified: p.updated_at || now,
                changeFrequency: "monthly" as const,
                priority: 0.7,
            }));
        }
    } catch {
        // API unavailable at build time — skip dynamic pages
    }

    return [...staticPages, ...projectPages];
}
