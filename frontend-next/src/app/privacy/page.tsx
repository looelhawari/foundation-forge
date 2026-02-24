import type { Metadata } from "next";
import PrivacyPage from "./page-client";

export const metadata: Metadata = {
    title: "Privacy Policy | CPC Qatar",
    description:
        "CPC Qatar privacy policy — How we collect, use and protect your personal data. Read our data protection and privacy practices.",
    alternates: { canonical: "/privacy" },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Privacy Policy | CPC Qatar",
        description: "CPC Qatar privacy policy and data protection practices.",
        url: "/privacy",
    },
};

export default function Page() {
    return <PrivacyPage />;
}
