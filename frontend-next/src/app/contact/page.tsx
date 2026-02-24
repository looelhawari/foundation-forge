import type { Metadata } from "next";
import ContactPage from "./page-client";

export const metadata: Metadata = {
    title: "Contact CPC Qatar | Get a Free Quote for Road Construction | Doha",
    description:
        "Contact CPC Qatar for road construction, asphalt paving, earthworks & infrastructure projects in Doha, Qatar. Call +974 4442 7724 or request a free quote online.",
    alternates: { canonical: "/contact" },
    keywords:
        "contact CPC Qatar, road construction quote Qatar, civil contractor Doha contact, اتصل بنا CPC قطر",
    openGraph: {
        title: "Contact CPC Qatar | Get a Free Quote",
        description:
            "Request a free quote for your road construction or infrastructure project in Qatar.",
        url: "/contact",
    },
};

export default function Page() {
    return <ContactPage />;
}
