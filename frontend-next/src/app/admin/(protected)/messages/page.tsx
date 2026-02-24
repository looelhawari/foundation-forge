import type { Metadata } from "next";
import AdminMessagesPage from "./page-client";

export const metadata: Metadata = {
    title: "Messages | CPC Admin",
    robots: { index: false, follow: false },
};

export default function Page() {
    return <AdminMessagesPage />;
}
