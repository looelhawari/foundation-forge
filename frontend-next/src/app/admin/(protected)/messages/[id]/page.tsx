import type { Metadata } from "next";
import AdminMessageViewPage from "./page-client";

export const metadata: Metadata = {
    title: "Message Details | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <AdminMessageViewPage />;
}
