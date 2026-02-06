import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  COMPANY_NAME,
  generateOrganizationSchema,
  type PageSEO,
} from "@/lib/seo";

interface SEOHeadProps {
  seo: PageSEO;
  /** The path portion of the URL, e.g. "/about" */
  path?: string;
  /** Additional JSON-LD structured data objects */
  structuredData?: Record<string, unknown>[];
  /** Override the canonical URL completely */
  canonicalOverride?: string;
}

/**
 * Renders all SEO-relevant <head> tags for a page:
 * – <title>
 * – meta description / keywords / robots
 * – Open Graph tags
 * – Twitter Card tags
 * – Canonical link
 * – JSON-LD structured data
 */
const SEOHead = ({
  seo,
  path = "/",
  structuredData = [],
  canonicalOverride,
}: SEOHeadProps) => {
  const canonical = canonicalOverride || seo.canonical || `${SITE_URL}${path}`;
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
  const ogTitle = seo.ogTitle || seo.title;
  const ogDescription = seo.ogDescription || seo.description;
  const ogType = seo.ogType || "website";

  // Always include the Organization schema
  const allStructuredData = [generateOrganizationSchema(), ...structuredData];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      <meta name="author" content={COMPANY_NAME} />
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {seo.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo Meta (Qatar-specific) */}
      <meta name="geo.region" content="QA" />
      <meta name="geo.placename" content="Doha, Qatar" />
      <meta name="geo.position" content="25.2734836;51.5014973" />
      <meta name="ICBM" content="25.2734836, 51.5014973" />

      {/* JSON-LD Structured Data */}
      {allStructuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
