import type { Metadata } from "next";
import AdminLoginPage from "./page-client";

export const metadata: Metadata = {
    title: "Admin Login | CPC Qatar",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <AdminLoginPage />;
}
