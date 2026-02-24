import type { Metadata } from "next";
import ClientsPage from "./page-client";

export const metadata: Metadata = {
    title: "Clients & Testimonials | Trusted by Leading Qatar Organizations | CPC Qatar",
    description:
        "See CPC Qatar trusted clients and testimonials — Ministry of Education, Ashghal, FIFA 2022 contractors, and leading construction firms across Qatar.",
    alternates: { canonical: "/clients" },
    keywords:
        "CPC Qatar clients, road construction testimonials, Qatar construction clients, Ashghal contractor, عملاء CPC قطر",
    openGraph: {
        title: "Clients & Testimonials | CPC Qatar",
        description:
            "Trusted by Qatar's leading organizations. See our client list and testimonials.",
        url: "/clients",
    },
};

export default function Page() {
    return <ClientsPage />;
}
