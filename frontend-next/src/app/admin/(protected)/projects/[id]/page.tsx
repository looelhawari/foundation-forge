import type { Metadata } from "next";
import AdminProjectViewPage from "./page-client";

export const metadata: Metadata = {
    title: "Project Details | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <AdminProjectViewPage />;
}
