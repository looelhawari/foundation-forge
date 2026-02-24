"use client";

/**
 * SEOHead — No-op in Next.js App Router
 * ─────────────────────────────────────────────────────────
 * In the Vite SPA, this used react-helmet-async to inject
 * <title>, <meta>, and structured data into <head>.
 *
 * In Next.js, SEO metadata is exported from each page.tsx
 * server component via the Metadata API — so this component
 * is kept as a no-op to avoid breaking existing page JSX.
 */

interface SEOHeadProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    keywords?: string;
    structuredData?: object;
    arDescription?: string;
    arTitle?: string;
    children?: React.ReactNode;
    [key: string]: any;
}

const SEOHead = (_props: SEOHeadProps) => {
    return null;
};

export default SEOHead;
