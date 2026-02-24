import type { Metadata } from "next";
import TermsPage from "./page-client";

export const metadata: Metadata = {
    title: "Terms & Conditions | CPC Qatar",
    description:
        "Terms and conditions for CPC Qatar website and services. Read our terms of service, usage policies, and legal information.",
    alternates: { canonical: "/terms" },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Terms & Conditions | CPC Qatar",
        description: "CPC Qatar terms and conditions of service.",
        url: "/terms",
    },
};

export default function Page() {
    return <TermsPage />;
}
