import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    keywords?: string;
    noindex?: boolean;
    structuredData?: object;
    arTitle?: string;
    arDescription?: string;
}

const BASE_URL = 'https://cpc-qa.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'CPC Qatar — Cosmo Projects & Construction';

export const SEOHead = ({
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = 'website',
    twitterTitle,
    twitterDescription,
    keywords,
    noindex = false,
    structuredData,
    arTitle,
    arDescription,
}: SEOHeadProps) => {
    const fullTitle = title;
    const fullCanonical = canonical ? `${BASE_URL}${canonical}` : undefined;
    const metaDescription = arDescription
        ? `${description} | ${arDescription}`
        : description;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            {fullCanonical && <link rel="canonical" href={fullCanonical} />}

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={ogTitle || fullTitle} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
            <meta property="og:site_name" content={SITE_NAME} />
            {fullCanonical && <meta property="og:url" content={fullCanonical} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={twitterTitle || ogTitle || fullTitle} />
            <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
            <meta name="twitter:image" content={ogImage || DEFAULT_OG_IMAGE} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
