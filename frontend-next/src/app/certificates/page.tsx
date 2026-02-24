import type { Metadata } from "next";
import CertificatesPage from "./page-client";

export const metadata: Metadata = {
    title: "Certificates & Accreditations | CPC Qatar Quality Standards",
    description:
        "View CPC Qatar official certificates, accreditations and quality standards. Government-approved contractor CR 108122 with ISO-compliant road construction practices.",
    alternates: { canonical: "/certificates" },
    keywords:
        "CPC Qatar certificates, construction accreditations Qatar, ISO road construction, CR 108122 contractor",
    openGraph: {
        title: "Certificates & Accreditations | CPC Qatar",
        description:
            "Official certificates and quality accreditations for CPC Qatar road construction.",
        url: "/certificates",
    },
};

export default function Page() {
    return <CertificatesPage />;
}
