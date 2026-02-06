// ============================================================================
// SEO Configuration for CPC Qatar
// Centralized SEO constants, meta data, and structured data generators
// ============================================================================

// ---------------------------------------------------------------------------
// Site-wide constants
// ---------------------------------------------------------------------------
export const SITE_NAME = "CPC Qatar - Cosmo Projects & Construction";
export const SITE_URL = "https://cpc-qa.com"; // Update with your actual domain
export const SITE_LOGO = `${SITE_URL}/cpc-logo.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const COMPANY_NAME = "Cosmo Projects & Construction and Trading";
export const COMPANY_SHORT = "CPC Qatar";
export const COMPANY_PHONE = "+974 4432-2743";
export const COMPANY_EMAIL = "Info@ctgroups.net";
export const COMPANY_ADDRESS = {
  street:
    "Mirqab Mall, Area No. 39, Street No.840, Building No.53, Block D, Office No. 307-308",
  city: "Doha",
  region: "Doha",
  postalCode: "15776",
  country: "QA",
};

// ---------------------------------------------------------------------------
// Per-page SEO meta data
// ---------------------------------------------------------------------------
export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title:
      "CPC Qatar | Road Construction, Asphalt Paving & Infrastructure in Doha",
    description:
      "CPC Qatar (Cosmo Projects & Construction) is a leading construction company in Qatar specializing in asphalt pavements, road marking, earthworks, and infrastructure development. Established 2017, delivering 57+ projects across Doha.",
    keywords:
      "CPC Qatar, construction company Qatar, road construction Doha, asphalt paving Qatar, road marking, earthworks, infrastructure development Qatar, civil engineering Doha, highway construction, street development",
    ogTitle: "CPC Qatar | Leading Construction & Infrastructure Company",
    ogDescription:
      "Excellence in asphalt pavements, road marking & infrastructure development. 57+ projects delivered across Qatar since 2017.",
    ogType: "website",
  },
  about: {
    title:
      "About CPC Qatar | Our Story, Mission & Values | Cosmo Projects & Construction",
    description:
      "Learn about CPC Qatar (Cosmo Projects & Construction), a premier construction company in Qatar since 2017. Led by Chairman Mohammed Ahmed Mubarak Al-Nasr, we have completed 57+ projects worth 26M+ QR including FIFA World Cup infrastructure.",
    keywords:
      "CPC Qatar about, Cosmo Projects Construction history, Qatar construction company, civil engineering Qatar, Mohammed Ahmed Mubarak Al-Nasr, FIFA World Cup Qatar infrastructure",
    ogTitle: "About CPC Qatar | Building Legacy Since 2017",
    ogDescription:
      "Premier construction company in Qatar. 57+ projects, 26M+ QR value. FIFA World Cup infrastructure partner.",
  },
  projects: {
    title:
      "Our Projects | CPC Qatar Construction Portfolio | Schools, Roads, Infrastructure",
    description:
      "Explore CPC Qatar's portfolio of 57+ completed construction projects including schools, mosques, commercial buildings, public infrastructure, and road works across Qatar. View our project gallery.",
    keywords:
      "CPC Qatar projects, construction portfolio Qatar, school construction Doha, mosque construction, road construction projects, infrastructure projects Qatar, commercial building Qatar",
    ogTitle: "CPC Qatar Projects | 57+ Construction Projects in Qatar",
    ogDescription:
      "Browse our portfolio of schools, mosques, commercial buildings, and infrastructure projects across Qatar.",
  },
  projectDetail: {
    title: "Project Details | CPC Qatar Construction",
    description:
      "View detailed information about this CPC Qatar construction project, including gallery, specifications, location, and scope of work.",
    keywords:
      "CPC Qatar project, construction project details, Qatar construction, project gallery",
    ogTitle: "Project Details | CPC Qatar",
    ogDescription:
      "Detailed project information from CPC Qatar's construction portfolio.",
  },
  clients: {
    title:
      "Our Clients & Testimonials | CPC Qatar | Government, Corporate & Industrial Partners",
    description:
      "CPC Qatar is trusted by Qatar's leading organizations including Ministry of Education, Qatar Museums, FIFA World Cup, DHL, and Al Meera. Read client testimonials and see our partnerships.",
    keywords:
      "CPC Qatar clients, Qatar construction clients, Ministry of Education Qatar, FIFA World Cup construction, Qatar Museums, DHL Qatar, construction testimonials, government contractor Qatar",
    ogTitle: "CPC Qatar Clients | Trusted by Qatar's Top Organizations",
    ogDescription:
      "Ministry of Education, Qatar Museums, FIFA World Cup and more. See why Qatar's top organizations trust CPC.",
  },
  contact: {
    title: "Contact CPC Qatar | Get a Free Quote | Construction Services Doha",
    description:
      "Contact CPC Qatar for road construction, asphalt paving, and infrastructure services. Visit us at Mirqab Mall, Doha or call +974 4432-2743. Get a free project consultation and quote.",
    keywords:
      "contact CPC Qatar, construction quote Doha, road construction inquiry, CPC Qatar phone, CPC Qatar email, construction services Doha, free consultation Qatar",
    ogTitle: "Contact CPC Qatar | Free Project Consultation",
    ogDescription:
      "Get in touch for road construction, asphalt paving & infrastructure services. Free consultation & quote. Call +974 4432-2743.",
  },
  certificates: {
    title:
      "Company Certificates & Legal Documents | CPC Qatar | Verified & Compliant",
    description:
      "View CPC Qatar's official company certificates including Commercial Registration, Tax Card, Computer Card, and Commercial Permit. All documents verified and compliant with Qatar regulations.",
    keywords:
      "CPC Qatar certificates, commercial registration Qatar, tax card Qatar, construction company license, Qatar business permit, legal documents construction company",
    ogTitle: "CPC Qatar Certificates | Licensed & Compliant",
    ogDescription:
      "Fully licensed construction company in Qatar. View our Commercial Registration, Tax Card, and official permits.",
  },
  terms: {
    title: "Terms of Use | CPC Qatar Website",
    description:
      "Read the Terms of Use for the CPC Qatar (Cosmo Projects & Construction) website. Learn about website usage conditions, intellectual property, and legal disclaimers.",
    keywords:
      "CPC Qatar terms of use, website terms, legal terms, construction company terms",
    ogTitle: "Terms of Use | CPC Qatar",
    ogDescription: "Terms and conditions for using the CPC Qatar website.",
  },
  privacy: {
    title: "Privacy Policy | CPC Qatar | Data Protection",
    description:
      "CPC Qatar's Privacy Policy. Learn how we collect, use, and protect your personal information. We are committed to transparency and minimal data collection.",
    keywords:
      "CPC Qatar privacy policy, data protection, personal information, privacy Qatar, construction company privacy",
    ogTitle: "Privacy Policy | CPC Qatar",
    ogDescription:
      "How CPC Qatar collects, uses, and protects your personal information. Committed to transparency.",
  },
  notFound: {
    title: "Page Not Found | CPC Qatar",
    description:
      "The page you are looking for does not exist. Return to CPC Qatar's homepage.",
    keywords: "",
    noindex: true,
  },
};

// ---------------------------------------------------------------------------
// JSON-LD Structured Data Generators
// ---------------------------------------------------------------------------

/** Organization schema - used on every page */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    alternateName: COMPANY_SHORT,
    url: SITE_URL,
    logo: SITE_LOGO,
    description:
      "Leading construction company in Qatar specializing in asphalt pavements, road marking, earthworks, and infrastructure development.",
    foundingDate: "2017",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS.street,
      addressLocality: COMPANY_ADDRESS.city,
      addressRegion: COMPANY_ADDRESS.region,
      postalCode: COMPANY_ADDRESS.postalCode,
      addressCountry: COMPANY_ADDRESS.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
      contactType: "customer service",
      areaServed: "QA",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [],
  };
}

/** LocalBusiness schema - used on home/contact pages */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: COMPANY_NAME,
    alternateName: COMPANY_SHORT,
    url: SITE_URL,
    logo: SITE_LOGO,
    image: DEFAULT_OG_IMAGE,
    description:
      "Premier construction company in Qatar specializing in road construction, asphalt pavements, earthworks, and infrastructure development since 2017.",
    foundingDate: "2017",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS.street,
      addressLocality: COMPANY_ADDRESS.city,
      addressRegion: COMPANY_ADDRESS.region,
      postalCode: COMPANY_ADDRESS.postalCode,
      addressCountry: COMPANY_ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2734836,
      longitude: 51.5014973,
    },
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Qatar",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Highway & Road Construction",
            description:
              "Complete highway and road construction services including asphalt paving and road infrastructure.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Asphalt Pavements",
            description:
              "Professional asphalt paving and pavement construction for roads and parking areas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Road Marking",
            description:
              "Precision road marking and line painting services for highways and streets.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Earthworks",
            description:
              "Site preparation, grading, and earthwork services for construction projects.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Infrastructure Development",
            description:
              "Complete infrastructure development and civil engineering projects.",
          },
        },
      ],
    },
  };
}

/** WebSite schema with search action */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Official website of CPC Qatar - Cosmo Projects & Construction. Construction company specializing in road works and infrastructure in Qatar.",
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
  };
}

/** BreadcrumbList schema */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Single project schema */
export function generateProjectSchema(project: {
  title: string;
  description?: string | null;
  images?: string[];
  location?: string | null;
  client?: string | null;
  category?: string | null;
  year?: string | null;
  slug?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description:
      project.description ||
      `Construction project by CPC Qatar: ${project.title}`,
    image: project.images?.[0] || DEFAULT_OG_IMAGE,
    creator: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
    locationCreated: project.location
      ? {
          "@type": "Place",
          name: project.location,
          address: {
            "@type": "PostalAddress",
            addressCountry: "QA",
          },
        }
      : undefined,
    dateCreated: project.year || undefined,
    genre: project.category || "Construction",
    url: `${SITE_URL}/projects/${project.slug || ""}`,
  };
}

/** FAQ schema for About page */
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does CPC Qatar provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CPC Qatar specializes in highway and road construction, asphalt pavements, road marking, earthworks, and infrastructure development across Qatar.",
        },
      },
      {
        "@type": "Question",
        name: "Where is CPC Qatar located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CPC Qatar is located at Mirqab Mall, Area No. 39, Street No.840, Building No.53, Block D, Office No. 307-308, P.O. Box: 15776, Doha, Qatar.",
        },
      },
      {
        "@type": "Question",
        name: "How many projects has CPC Qatar completed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CPC Qatar has completed over 57 construction projects with a total value exceeding 26 million QR, including projects for the Ministry of Education, Qatar Museums, and FIFA World Cup Qatar 2022.",
        },
      },
      {
        "@type": "Question",
        name: "When was CPC Qatar established?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CPC Qatar (Cosmo Projects & Construction and Trading) was established in 2017 under the leadership of Chairman Mohammed Ahmed Mubarak Al-Nasr.",
        },
      },
    ],
  };
}
