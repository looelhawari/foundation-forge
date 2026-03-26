import type { Metadata } from "next";
import ProjectsPage from "./page-client";
import { projects, projectCategories, stats } from "@/data/projects";
import { getTranslations } from "next-intl/server";

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

export default async function Page() {
    const t = await getTranslations('projects');
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />
            <ProjectsPage />

            {/* Server-rendered SEO content — hidden from users but crawlable by search engines */}
            <section className="hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Hero Section */}
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm font-medium text-primary">Our Portfolio</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
                            CPC Qatar Project Portfolio
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                            Since 2017, <strong>Cosmo Projects &amp; Construction and Trading W.L.L.</strong> has delivered <strong className="text-primary">{stats.projectsCompleted}+ projects</strong> across road construction, asphalt paving, earthworks, and civil infrastructure — serving government ministries, international organisations, and private developers throughout Doha and Qatar.
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="mb-20">
                        <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-10 text-center">
                            {t('categories.heading')}
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {Object.entries(categoryGroups).map(([category, catProjects]) => (
                                <div key={category} className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="font-display text-xl tracking-wide text-foreground group-hover:text-primary transition-colors">
                                                {category}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {catProjects.length} {catProjects.length === 1 ? 'project' : 'projects'}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                            {catProjects.length}
                                        </span>
                                    </div>
                                    <ul className="space-y-2">
                                        {catProjects.slice(0, 4).map((p) => (
                                            <li key={p.id} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                                <a href={`/projects/${p.id}`} className="flex items-start gap-2 group/item">
                                                    <span className="text-primary/60 group-hover/item:text-primary mt-0.5">→</span>
                                                    <div>
                                                        <div className="font-medium text-foreground">{p.title}</div>
                                                        {p.location && <div className="text-xs text-muted-foreground">{p.location}</div>}
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                        {catProjects.length > 4 && (
                                            <li className="text-xs font-medium text-primary pt-2">
                                                +{catProjects.length - 4} {t('seo.moreProjects')}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Services & Clients */}
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Services */}
                        <div>
                            <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-8">
                                {t('seo.servicesHeading')}
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { title: "Earthworks &amp; Site Preparation", href: "/services/earthworks" },
                                    { title: "Asphalt Paving &amp; Hot Mix", href: "/services/asphalt-works" },
                                    { title: "Road Marking &amp; Traffic Solutions", href: "/services/road-marking" },
                                    { title: "Interlock &amp; Kerbstone Installation", href: "/services/interlock-kerbstone" },
                                    { title: "Sub-grade &amp; Sub-base Preparation", href: "/services/subgrade-subbase" },
                                    { title: "Infrastructure Development", href: "/services/infrastructure-development" }
                                ].map((service, i) => (
                                    <a
                                        key={i}
                                        href={service.href}
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                                            ✓
                                        </div>
                                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                            {service.title}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Key Clients */}
                        <div>
                            <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-8">
                                {t('seo.clientsHeading')}
                            </h3>
                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {t('seo.clientsIntro')}
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Ministry of Education",
                                        "Ministry of Waqif",
                                        "Qatar Museums",
                                        "FIFA World Cup Qatar 2022",
                                        "DHL",
                                        "Al Meera",
                                        "Save Storage W.L.L.",
                                        "Galva Steel",
                                        "National Factory for Foam and Furniture",
                                        "And leading private developers across Qatar"
                                    ].map((client, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="inline-flex w-5 h-5 rounded-full bg-primary/20 items-center justify-center text-xs text-primary font-semibold">
                                                ★
                                            </span>
                                            <span className="text-sm font-medium text-foreground">{client}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
