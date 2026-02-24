import type { Metadata } from "next";
import CertificatesPage from "./page-client";

export const metadata: Metadata = {
    title: "Certificates & Accreditations | Quality Standards",
    description:
        "View CPC Qatar official certificates, accreditations and quality standards. Government-approved contractor CR 108122 with ISO-compliant road construction practices.",
    alternates: { canonical: "/certificates" },
    keywords: [
        "CPC Qatar certificates", "construction accreditations Qatar", "ISO road construction Qatar",
        "CR 108122 contractor", "Qatar government approved contractor", "quality standards construction",
    ],
    openGraph: {
        title: "Certificates & Accreditations | CPC Qatar Quality Standards",
        description: "Official certificates and quality accreditations for CPC Qatar road construction.",
        url: "/certificates",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Certificates" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Certificates & Accreditations",
        description: "Government-approved contractor CR 108122. ISO-compliant road construction practices.",
        images: ["/og-image.png"],
    },
};

export default function Page() {
    return <CertificatesPage />;
}
