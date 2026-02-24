import type { Metadata } from "next";
import AdminClientsPage from "./page-client";

export const metadata: Metadata = {
    title: "Clients | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <AdminClientsPage />;
}
