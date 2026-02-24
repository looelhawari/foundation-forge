import type { Metadata } from "next";
import { Suspense } from "react";
import AdminTestimonialsPage from "./page-client";

export const metadata: Metadata = {
    title: "Testimonials | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <Suspense>
            <AdminTestimonialsPage />
        </Suspense>
    );
}
