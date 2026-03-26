import type { Metadata } from "next";
import ProjectsPage from "./page-client";
import { projects, projectCategories, stats } from "@/data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";

export const metadata: Metadata = {
    title: "Projects | Road Construction & Infrastructure Portfolio",
    description:
        "Browse 90+ completed road construction & infrastructure projects by CPC Qatar across Doha and Qatar. Asphalt paving, road marking, earthworks, drainage and more.",
    alternates: { canonical: "/projects" },
    keywords: [
        "CPC Qatar projects", "road construction portfolio Qatar", "infrastructure projects Doha",
        "asphalt paving projects Qatar", "completed construction projects Doha",
        "highway construction Qatar", "road development projects", "مشاريع CPC قطر",
    ],
    openGraph: {
        title: "Projects | Road Construction & Infrastructure Portfolio | CPC Qatar",
        description: "Explore our portfolio of 90+ road construction & infrastructure projects delivered across Qatar.",
        url: "/projects",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Project Portfolio" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Projects | 90+ Road Construction Projects in Qatar",
        description: "Browse our portfolio of asphalt paving, road marking, earthworks & infrastructure projects.",
        images: ["/og-image.png"],
    },
};

const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CPC Qatar Project Portfolio",
    description: "Browse 90+ road construction and infrastructure projects completed by CPC Qatar across Doha and Qatar.",
    url: `${SITE_URL}/projects`,
    isPartOf: { "@type": "WebSite", name: "CPC Qatar", url: SITE_URL },
    mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.slice(0, 20).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "ConstructionProject",
                name: p.title,
                description: p.description,
                ...(p.location && { location: { "@type": "Place", name: p.location } }),
                ...(p.client && { contractor: { "@type": "Organization", name: p.client } }),
            },
        })),
    },
};

/* Group projects by category for server-rendered content */
const categoryGroups = projectCategories.filter(c => c !== "All").reduce((acc, cat) => {
    const matching = projects.filter(p => p.category === cat);
    if (matching.length > 0) acc[cat] = matching;
    return acc;
}, {} as Record<string, typeof projects>);

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />
            <ProjectsPage />

            {/* Server-rendered SEO content — ensures Google can crawl project data
                even though the interactive client component loads projects via API */}
            <section className="bg-background border-t border-border">
                <div className="container mx-auto px-6 py-16 max-w-5xl">
                    <h2 className="font-display text-3xl md:text-4xl mb-4">
                        CPC Qatar — Road Construction & Infrastructure Project Portfolio
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
                        Since 2017, <strong>Cosmo Projects &amp; Construction and Trading W.L.L. (CPC Qatar)</strong> has
                        delivered {stats.projectsCompleted}+ road construction, asphalt paving, earthworks, and civil
                        infrastructure projects across Doha and Qatar — serving government ministries, international
                        organisations, and private developers. Browse our full portfolio below.
                    </p>

                    {Object.entries(categoryGroups).map(([category, catProjects]) => (
                        <div key={category} className="mb-10">
                            <h3 className="text-xl font-semibold text-primary mb-3">
                                {category} Projects ({catProjects.length})
                            </h3>
                            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                                {catProjects.map((p) => (
                                    <li key={p.id} className="text-muted-foreground py-1">
                                        <a href={`/projects/${p.id}`} className="hover:text-primary transition-colors">
                                            <strong>{p.title}</strong>
                                            {p.location && <span className="text-sm"> — {p.location}</span>}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="mt-12 pt-8 border-t border-border grid sm:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Our Services</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><a href="/services/earthworks" className="hover:text-primary transition-colors">Earthworks &amp; Site Preparation</a></li>
                                <li><a href="/services/asphalt-works" className="hover:text-primary transition-colors">Asphalt Paving &amp; Hot Mix</a></li>
                                <li><a href="/services/road-marking" className="hover:text-primary transition-colors">Road Marking &amp; Traffic Solutions</a></li>
                                <li><a href="/services/interlock-kerbstone" className="hover:text-primary transition-colors">Interlock &amp; Kerbstone Installation</a></li>
                                <li><a href="/services/subgrade-subbase" className="hover:text-primary transition-colors">Sub-grade &amp; Sub-base Preparation</a></li>
                                <li><a href="/services/infrastructure-development" className="hover:text-primary transition-colors">Infrastructure Development</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Key Clients</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Ministry of Education, Ministry of Waqif, Qatar Museums, FIFA World Cup Qatar 2022,
                                DHL, Al Meera, Save Storage W.L.L., Galva Steel, National Factory for Foam and Furniture,
                                Mesopotamia For General Contracting, and private developers across Qatar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
