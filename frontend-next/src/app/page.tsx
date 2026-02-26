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
    return (
        <>
            <HomePage />
            {/* Server-rendered SEO content block — visible to crawlers & screen readers */}
            <section className="bg-card py-16 border-t border-border">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
                        Road Construction &amp; Infrastructure Company in Qatar
                    </h2>
                    <div className="prose prose-lg prose-invert mx-auto text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
                        <p>
                            <strong>CPC Qatar (Cosmo Projects &amp; Construction and Trading W.L.L.)</strong> is a government-approved
                            road construction and infrastructure company based in Doha, Qatar. Established in 2017, we have
                            delivered over <strong>90 projects</strong> for leading public and private sector clients across Qatar.
                        </p>
                        <p>
                            Our core services include <a href="/services/asphalt-works" className="text-primary hover:underline">asphalt paving</a>,{" "}
                            <a href="/services/road-marking" className="text-primary hover:underline">road marking &amp; traffic signs</a>,{" "}
                            <a href="/services/earthworks" className="text-primary hover:underline">earthworks &amp; grading</a>,{" "}
                            <a href="/services/interlock-kerbstone" className="text-primary hover:underline">interlock &amp; kerbstone installation</a>,{" "}
                            <a href="/services/subgrade-subbase" className="text-primary hover:underline">subgrade &amp; subbase works</a>, and{" "}
                            <a href="/services/infrastructure-development" className="text-primary hover:underline">infrastructure development</a>.
                            We handle every phase of road construction from initial site preparation to final road marking and finishing.
                        </p>
                        <p>
                            Our clients include the <strong>Ministry of Education, Ashghal (Public Works Authority), FIFA World Cup Qatar
                                2022 contractors, Qatar Museums, DHL, Al Meera,</strong> and many other government institutions and
                            private developers. We operate across all areas of Qatar including Doha, Al Wakrah, Al Khor,
                            Lusail, Al Rayyan, and Al Shahaniya.
                        </p>
                        <p>
                            <a href="/contact" className="text-primary hover:underline font-semibold">Contact us today</a> for a
                            free consultation and quote on your road construction or infrastructure project in Qatar.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
