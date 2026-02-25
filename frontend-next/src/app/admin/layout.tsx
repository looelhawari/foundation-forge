import type { Metadata } from "next";

// Ensure ALL admin pages are noindexed — single source of truth
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
