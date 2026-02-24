import type { Metadata } from "next";
import AdminSettingsPage from "./page-client";

export const metadata: Metadata = {
    title: "Settings | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <AdminSettingsPage />;
}
