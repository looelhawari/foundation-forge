import type { Metadata } from "next";
import ClientsPage from "./page-client";

export const metadata: Metadata = {
    title: "Clients & Testimonials | Trusted by Leading Qatar Organizations",
    description:
        "See CPC Qatar trusted clients and testimonials — Ministry of Education, Ashghal, FIFA 2022 contractors, and leading construction firms across Qatar.",
    alternates: { canonical: "/clients" },
    keywords: [
        "CPC Qatar clients", "road construction testimonials Qatar", "Qatar construction partners",
        "Ashghal approved contractor", "FIFA 2022 contractor Qatar", "Ministry of Education contractor",
        "عملاء CPC قطر", "شهادات عملاء مقاولات",
    ],
    openGraph: {
        title: "Clients & Testimonials | CPC Qatar",
        description: "Trusted by Qatar's leading organizations. See our client list and testimonials.",
        url: "/clients",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CPC Qatar Clients & Partners" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CPC Qatar Clients | Trusted by Ministry of Education, Ashghal & More",
        description: "Government & private sector clients across Qatar. View testimonials from leading organizations.",
        images: ["/og-image.png"],
    },
};

export default function Page() {
    return <ClientsPage />;
}
