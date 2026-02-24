import type { Metadata } from "next";
import { Suspense } from "react";
import AdminProjectsPage from "./page-client";

export const metadata: Metadata = {
    title: "Projects | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <Suspense>
            <AdminProjectsPage />
        </Suspense>
    );
}
