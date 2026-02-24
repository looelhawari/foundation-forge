import type { Metadata } from "next";
import AdminDashboardPage from "./page-client";

export const metadata: Metadata = {
    title: "Dashboard | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <AdminDashboardPage />;
}
