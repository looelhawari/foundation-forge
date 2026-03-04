"use client";

import { useSiteSettings } from "@/hooks/useSiteSettings";

/**
 * Dynamic JSON-LD structured data that pulls contact info from site_settings.
 * Renders <script type="application/ld+json"> tags inside the document body.
 * Google reads JSON-LD from anywhere in the DOM — no need to be in <head>.
 */
export function StructuredData() {
    const { settings } = useSiteSettings();

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://cpc-qa.com/#organization",
        name: settings.site_name,
        alternateName: ["CPC Qatar", "CPC", "كوزمو للمشاريع والإنشاءات والتجارة"],
        url: "https://cpc-qa.com",
        logo: "https://cpc-qa.com/logo.png",
        description:
            "Leading road construction, asphalt paving, and infrastructure development company in Doha, Qatar. Delivering excellence since 2017.",
        foundingDate: "2017",
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 200 },
        address: {
            "@type": "PostalAddress",
            streetAddress: settings.head_office_address,
            addressLocality: "Doha",
            addressRegion: "Doha",
            addressCountry: "QA",
            postalCode: settings.po_box,
        },
        geo: { "@type": "GeoCoordinates", latitude: "25.2734836", longitude: "51.5014973" },
        areaServed: [
            { "@type": "Country", name: "Qatar" },
            { "@type": "City", name: "Doha" },
            { "@type": "City", name: "Al Wakrah" },
            { "@type": "City", name: "Al Khor" },
            { "@type": "City", name: "Lusail" },
        ],
        sameAs: [
            settings.show_linkedin && settings.linkedin_url,
            settings.show_facebook && settings.facebook_url,
            settings.show_instagram && settings.instagram_url,
            settings.show_twitter && settings.twitter_url,
            "https://cpc-qa.com",
        ].filter(Boolean),
        hasCredential: [
            {
                "@type": "EducationalOccupationalCredential",
                name: "Commercial Registration CR 108122",
                url: "https://cpc-qa.com/certificates",
                credentialCategory: "Government Contractor Registration",
                recognizedBy: {
                    "@type": "GovernmentOrganization",
                    name: "Ministry of Commerce and Industry — Qatar",
                    url: "https://www.moci.gov.qa",
                },
            },
        ],
        knowsAbout: [
            "Road Construction", "Asphalt Pavement Construction", "Infrastructure Development",
            "Earthworks and Site Grading", "Thermoplastic Road Marking", "Traffic Management Infrastructure",
            "Interlock Block Paving", "Kerbstone Installation", "Subgrade and Subbase Works",
            "Civil Engineering Qatar", "Highway Construction", "Stormwater Drainage Systems",
            "Utility Duct Installation", "Qatar Construction Industry",
        ],
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: settings.contact_phone,
                email: settings.contact_email,
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
                areaServed: "QA",
            },
            ...(settings.contact_phone_2 ? [{
                "@type": "ContactPoint",
                telephone: settings.contact_phone_2,
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
                areaServed: "QA",
            }] : []),
            ...(settings.contact_telephone ? [{
                "@type": "ContactPoint",
                telephone: settings.contact_telephone,
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
                areaServed: "QA",
            }] : []),
        ],
        ...(settings.contact_fax ? { faxNumber: settings.contact_fax } : {}),
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["GeneralContractor", "ConstructionCompany"],
        name: `CPC Qatar — ${settings.site_name}`,
        alternateName: "كوزمو للمشاريع والإنشاءات",
        image: "https://cpc-qa.com/logo.png",
        url: "https://cpc-qa.com",
        description:
            "Premier road construction and civil engineering company in Qatar specializing in asphalt pavements, road marking, earthworks, interlock paving, and infrastructure development.",
        priceRange: "$$$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: settings.head_office_address,
            addressLocality: "Doha",
            addressRegion: "Doha",
            postalCode: settings.po_box,
            addressCountry: "QA",
        },
        telephone: settings.contact_phone,
        ...(settings.contact_fax ? { faxNumber: settings.contact_fax } : {}),
        email: settings.contact_email,
        geo: { "@type": "GeoCoordinates", latitude: "25.2734836", longitude: "51.5014973" },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Construction Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Asphalt Pavement Construction",
                        description: "Professional asphalt paving and road surface construction for highways, streets, and commercial areas in Qatar.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Road Marking & Traffic Signs",
                        description: "Thermoplastic and cold paint road marking, traffic signs, and road safety installations across Qatar.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Earthworks & Grading",
                        description: "Site preparation, excavation, grading, filling, and land leveling services for construction projects.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Interlock & Block Paving",
                        description: "Decorative and functional interlock block paving for walkways, driveways, and commercial spaces.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Subgrade & Subbase Works",
                        description: "Foundation layer construction including subgrade preparation, subbase, and base course installation.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Infrastructure Development",
                        description: "Complete civil infrastructure including drainage, utilities, curbs, and stormwater management systems.",
                    },
                },
            ],
        },
        knowsLanguage: ["en", "ar"],
        areaServed: { "@type": "Country", name: "Qatar" },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    );
}
