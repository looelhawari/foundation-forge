import type { Metadata } from "next";
import ProjectFormPage from "./page-client";

export const metadata: Metadata = {
    title: "New Project | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <ProjectFormPage />;
}
