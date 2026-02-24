import type { Metadata } from "next";
import TermsPage from "./page-client";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description:
        "Terms and conditions for CPC Qatar website and services. Read our terms of service, usage policies, and legal information.",
    alternates: { canonical: "/terms" },
    keywords: ["CPC Qatar terms", "terms of service", "construction company terms Qatar"],
    robots: { index: true, follow: true },
    openGraph: {
        title: "Terms & Conditions | CPC Qatar",
        description: "CPC Qatar terms and conditions of service.",
        url: "/terms",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Terms" }],
    },
    twitter: {
        card: "summary",
        title: "Terms & Conditions | CPC Qatar",
        description: "CPC Qatar terms and conditions of service.",
    },
};

export default function Page() {
    return <TermsPage />;
}
