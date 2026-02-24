import type { Metadata } from "next";
import PrivacyPage from "./page-client";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "CPC Qatar privacy policy — How we collect, use and protect your personal data. Read our data protection and privacy practices.",
    alternates: { canonical: "/privacy" },
    keywords: ["CPC Qatar privacy policy", "data protection", "privacy practices construction company"],
    robots: { index: true, follow: true },
    openGraph: {
        title: "Privacy Policy | CPC Qatar",
        description: "CPC Qatar privacy policy and data protection practices.",
        url: "/privacy",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Privacy Policy" }],
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy | CPC Qatar",
        description: "CPC Qatar privacy policy and data protection practices.",
    },
};

export default function Page() {
    return <PrivacyPage />;
}
