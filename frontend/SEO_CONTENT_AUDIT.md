# CPC Qatar — Complete Frontend SEO Content Audit

**Domain:** https://cpc-qa.com/  
**Company:** COSMO PROJECTS & CONSTRUCTION AND TRADING W.L.L. (CPC Qatar)  
**CR:** 108122 | **TIN:** 5000716308  
**Founded:** 2017 | **HQ:** Mirqab Mall, Area 39, Street 840, Building 53, Block D, Office 307-308, P.O. Box 15776, Doha, Qatar  
**Phone:** +974 4432-2743 | **Fax:** +974 4029-1295 | **Email:** Info@ctgroups.net  
**Leadership:** Chairman Mohammed Ahmed Mubarak Al-Nasr, Founder Hisham Abdelfattah Radwan Mohamed  

---

## TABLE OF CONTENTS

1. [Technical SEO Foundation](#1-technical-seo-foundation)
2. [Page-by-Page Content Inventory](#2-page-by-page-content-inventory)
3. [Services Catalog](#3-services-catalog)
4. [Project Data Inventory](#4-project-data-inventory)
5. [Client & Testimonial Data](#5-client--testimonial-data)
6. [Internal Link Map](#6-internal-link-map)
7. [Arabic (i18n) Content](#7-arabic-i18n-content)
8. [Keyword Inventory](#8-keyword-inventory)
9. [Structured Data (JSON-LD)](#9-structured-data-json-ld)
10. [SEO Issues & Recommendations](#10-seo-issues--recommendations)

---

## 1. TECHNICAL SEO FOUNDATION

### index.html Meta Tags
| Tag | Value |
|-----|-------|
| **Title** | `CPC Qatar \| Road Construction, Asphalt Paving & Infrastructure in Doha — شركة إنشاءات قطر` |
| **Meta Description** | `CPC Qatar (Cosmo Projects & Construction) — Premier road construction, asphalt paving, earthworks, and infrastructure company in Doha, Qatar. CR 108122. 90+ projects since 2017. شركة كوزمو للمشاريع والإنشاءات — مقاولات طرق، أسفلت، أعمال ترابية، بنية تحتية في الدوحة، قطر` |
| **Keywords** | `CPC Qatar, Cosmo Projects Construction, road construction Qatar, asphalt paving Doha, earthworks Qatar, interlock paving Qatar, subgrade subbase Qatar, steel works Qatar, civil engineering Qatar, مقاولات قطر, شركة إنشاءات قطر, بناء طرق قطر, أسفلت الدوحة, أعمال ترابية, بلاط متداخل, أعمال حديد, هندسة مدنية, highway construction Qatar, road marking Qatar, traffic signs Qatar, infrastructure Doha, construction company Qatar, grading compaction Qatar, kerbstone installation Qatar, road maintenance Qatar` |
| **Canonical** | `https://cpc-qa.com/` |
| **hreflang** | `en` → `https://cpc-qa.com/`, `ar` → `https://cpc-qa.com/?lang=ar`, `x-default` → `https://cpc-qa.com/` |
| **OG Title** | `CPC Qatar — Road Construction & Infrastructure Excellence` |
| **OG Description** | `Premier road construction, asphalt paving, earthworks, and infrastructure company in Doha, Qatar since 2017. CR 108122.` |
| **OG Image** | `/og-image.jpg` (1200×630) |
| **OG URL** | `https://cpc-qa.com/` |
| **OG Type** | `website` |
| **Twitter Card** | `summary_large_image` |
| **Geo** | Region: QA, Place: Doha, Qatar, Position: 25.2734836;51.5014973, ICBM: 25.2734836, 51.5014973 |
| **Theme Color** | `#1a1a2e` |
| **Fonts** | Bebas Neue (display), Inter (body) |
| **Noscript H1** | `CPC Qatar — Cosmo Projects & Construction | شركة كوزمو للمشاريع والإنشاءات` |

### robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*
Sitemap: https://cpc-qa.com/sitemap.xml
```

### sitemap.xml (8 URLs)
| URL | Priority | Changefreq | hreflang |
|-----|----------|------------|----------|
| `/` | 1.0 | weekly | en, ar |
| `/about` | 0.9 | monthly | en, ar |
| `/projects` | 0.9 | weekly | en, ar |
| `/clients` | 0.8 | monthly | en, ar |
| `/contact` | 0.8 | monthly | en, ar |
| `/certificates` | 0.7 | monthly | — |
| `/privacy` | 0.3 | yearly | — |
| `/terms` | 0.3 | yearly | — |

> **Note:** All `<lastmod>` dates are set to `2026-02-12` (future date — likely an error).

### manifest.json
- **Name:** CPC Qatar — Cosmo Projects & Construction
- **Short Name:** CPC Qatar
- **Categories:** business, construction

---

## 2. PAGE-BY-PAGE CONTENT INVENTORY

---

### 2.1 HOME PAGE (`/` → Index.tsx)

**Component Stack (top to bottom):**
1. Header
2. CinematicHero
3. ServicesMarquee
4. ServicesImageGrid
5. FullscreenVideo
6. ClientLogosShowcase
7. WhyChooseUs
8. ProcessTimeline
9. QualityAndCertifications
10. FeaturedShowcase
11. ParallaxStats
12. ImmersiveTestimonials
13. MegaCTA
14. Footer

**Floating Elements:** "Legal Docs" button → `/certificates`

#### CinematicHero
| Element | Content |
|---------|---------|
| **H1** | `CONSTRUCTING THE ROADS OF TOMORROW` |
| **Tagline** | `SINCE 2017 — DOHA, QATAR` |
| **Stats** | 90+ Projects, 10+ Years, 57+ Major Clients |
| **CTAs** | "Our Projects" → `/projects`, "Contact Us" → `/contact` |
| **Media** | Hero background image + flyover video |

#### ServicesMarquee
| Element | Content |
|---------|---------|
| **H3** | `OUR EXPERTISE` |
| **Marquee** | `HIGHWAY CONSTRUCTION · STREET DEVELOPMENT · INFRASTRUCTURE · BRIDGE CONSTRUCTION · ROAD MAINTENANCE` |
| **CTA** | "Explore Our Projects" → `/projects` |

#### ServicesImageGrid
| Element | Content |
|---------|---------|
| **H2** | `What We Do` |
| **Service 1** | **Earth Works** — Site Clearing, Excavation, Grading, Compaction |
| **Service 2** | **Sub-Grade & Sub-Base** — Layer Preparation, Material Testing, Compaction Control, Quality Assurance |
| **Service 3** | **Asphalt Works** — Hot Mix, Cold Mix, Surface Treatment, Maintenance |
| **Service 4** | **Traffic Signs & Road Marking** — Thermoplastic Marking, Sign Installation, Safety Measures, Line Marking |
| **Service 5** | **Interlock & Kerbstone** — Paver Installation, Kerbstone Laying, Pattern Design, Finishing Works |

#### FullscreenVideo
| Element | Content |
|---------|---------|
| **H2** | `WHERE VISION MEETS ROAD` |
| **Subtitle** | `From blueprint to blacktop, every project is an act of precision engineering` |
| **CTA** | "View Our Projects" → `/projects` |

#### ClientLogosShowcase
| Element | Content |
|---------|---------|
| **H2** | `Trusted By Industry Leaders` |
| **Subtitle** | `Partnering with Qatar's most prestigious organizations` |
| **Stats** | 45+ Major Clients, 90+ Projects Delivered, 100% Satisfaction Rate |
| **Logos (10)** | Ministry of Education, Ministry of Awqaf, Qatar Museums, FIFA, DHL, Ministry of Ashghal, IMALCO, Al Meera, Ariane Real Estate, FBA Real Estate |

#### WhyChooseUs
| Element | Content |
|---------|---------|
| **H2** | `Why Choose CPC Qatar` |
| **Advantage 1** | **Proven Track Record** — 57 successfully completed projects across Qatar |
| **Advantage 2** | **Expert Team** — Skilled professionals with years of industry experience |
| **Advantage 3** | **Quality Assurance** — Rigorous quality control at every project stage |
| **Advantage 4** | **Latest Technology** — State-of-the-art equipment and modern methods |
| **Advantage 5** | **Timely Completion** — On-schedule delivery with no compromises |
| **Advantage 6** | **Client Satisfaction** — 100% client satisfaction rate maintained |

#### ProcessTimeline
| Element | Content |
|---------|---------|
| **H2** | `Our Process` |
| **Step 1** | **Initial Consultation** — Understanding project requirements and vision |
| **Step 2** | **Planning & Design** — Detailed engineering plans and specifications |
| **Step 3** | **Approval & Permits** — Securing necessary approvals and compliance |
| **Step 4** | **Mobilization** — Equipment and team deployment to site |
| **Step 5** | **Execution** — Precision construction with quality monitoring |
| **Step 6** | **Completion & Handover** — Final inspection and project delivery |

#### QualityAndCertifications
| Element | Content |
|---------|---------|
| **H2** | `Legal Documents & Registration` |
| **Cert 1** | Commercial Registration (C.R. 108122) — Valid: 8/12/2029 |
| **Cert 2** | Establishment Card (14-1191-01) — Valid: 13/10/2028 |
| **Cert 3** | Tax Identification Number (5000716308) |
| **Cert 4** | Commercial License (111698) — Valid: 13/10/2029 |
| **Licensed Activities** | Construction & General Contracting (4100001), Roads & Pavements Construction (4210100) |
| **6 Standards** | ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, ASTM Standards, AASHTO Standards, Qatar Construction Specifications |

#### FeaturedShowcase
| Element | Content |
|---------|---------|
| **H2** | `Featured Excellence` |
| **Subtitle** | `Our most prestigious projects and valued partnerships` |
| **Top 5 Projects** | |
| 1 | School Bus Parking Stage 2 — 22,000 m², Ministry of Education |
| 2 | School Bus Parking Stage 1 — 16,000 m², Ministry of Education |
| 3 | Warehouse / Manateq — 11,400 m², Manateq |
| 4 | FIFA World Cup 2022 — 45,000 m², FIFA |
| 5 | Farms — 6,800 m², Private |
| **Top 3 Clients** | |
| 1 | Ministry of Education — 23+ Projects, "Largest Government Partner" |
| 2 | FIFA — World Cup 2022 Parking, "Global Sporting Legacy" |
| 3 | Ministry of Endowments — Mosque Roads, "Sacred Infrastructure" |

#### ParallaxStats
| Element | Content |
|---------|---------|
| **H2** | `OUR IMPACT` |
| **Stats** | 57+ Projects Completed, 10+ Years Experience, 45+ Trusted Clients, 45% Client Satisfaction |

> ⚠️ **SEO Issue:** "45% Client Satisfaction" appears to be a bug — uses `stats.satisfiedClients` (= 45) but renders as percentage. Should be "100% Satisfaction" to match other sections.

#### ImmersiveTestimonials
| Element | Content |
|---------|---------|
| **H2** | `CLIENT TESTIMONIALS` |
| **Subtitle** | `What They Say` |
| **Source** | Dynamically fetched from backend API (testimonialsApi.getApproved) |
| **Client Logo Marquee (10)** | Ministry of Education, Al Meera, FBA Real Estate, National Foam, Ministry of Awqaf, FIFA, Ariane Real Estate, DHL, Qatar Museums, IMALCO |

#### MegaCTA
| Element | Content |
|---------|---------|
| **H2** | `LET'S CREATE SOMETHING EXTRAORDINARY` |
| **CTAs** | "Start a Project" → `/contact`, Email → `Info@ctgroups.net`, Phone → `+974 4432-2743` |
| **Location** | Doha, Qatar |

---

### 2.2 ABOUT PAGE (`/about` → About.tsx)

**Component Stack:**
1. Header → CompanyIntro → CinematicHero → StorySection → WhatIsCPCSection → ValuesSection → TimelineSection → StatsSection → MegaCTA → Footer

#### CompanyIntro
| Element | Content |
|---------|---------|
| **H2** | `WHO WE ARE` |
| **Mission** | To deliver top-tier infrastructure solutions that set the standard for quality and precision in Qatar's construction landscape |
| **Objectives** | Achieve excellence in every project phase from planning to completion, ensuring client satisfaction and sustainable development |
| **Overview** | Founded in 2017, CPC Qatar has grown from a vision to a leading force in Qatar's construction industry, completing 57+ projects valued at over 26 million QR |
| **Stats** | 57+ Projects Completed, 8+ Years of Excellence, 26M+ QR Total Project Value |
| **Features** | Project Planning, Construction Management, Engineering Supervision, Quality Assurance, Safety Inspection, Project Cost Control |
| **H3** | `Project Responsibilities` |

#### CinematicHero (About version)
| Element | Content |
|---------|---------|
| **H1** | `CONSTRUCTING LEGACY SINCE 2017` |
| **Subtitle** | `Cosmo Projects & Construction` |

#### StorySection
| Element | Content |
|---------|---------|
| **H2** | `SMALL BUT MIGHTY` |
| **Body** | "CPC Qatar (Cosmo Projects & Construction and Trading Co.) is a leading civil engineering and infrastructure development company in Qatar, established in 2017 under the vision of Chairman Mohammed Ahmed Mubarak Al-Nasr and Founder Hisham Abdelfattah Radwan Mohamed. Registered under CR 108122 and headquartered at Mirqab Mall, Doha, we specialize in road construction, asphalt works, earthworks, and urban infrastructure. With 57 completed projects valued at over 26 million QR and partnerships with major clients including the Ministry of Education, Qatar Museums, FIFA World Cup, and DHL, CPC Qatar stands as a testament to quality, precision, and national development." |
| **Major Clients** | Ministry of Education, Qatar Museums, FIFA World Cup, Ministry of Waqif, DHL Qatar, Al Meera |

#### WhatIsCPCSection
| Element | Content |
|---------|---------|
| **H2** | `WHAT IS CPC?` |
| **Service 1** | **Earthworks** — Site preparation, excavation, and land grading |
| **Service 2** | **Road Construction** — Complete road building and resurfacing |
| **Service 3** | **Asphalt Works** — Hot mix asphalt, cold mix, surface treatment |
| **Service 4** | **Traffic Solutions** — Signs, road markings, safety measures |
| **Service 5** | **Interlock & Kerbstone** — Paver installation and finishing |
| **Service 6** | **Steel Works** — Structural steel fabrication and installation |

#### ValuesSection
| Element | Content |
|---------|---------|
| **H2** | `OUR VALUES` |
| **Value 1** | **Precision** — Every measurement matters. Every detail counts. |
| **Value 2** | **Quality** — No shortcuts. No compromises. Only excellence. |
| **Value 3** | **Innovation** — Modern solutions for tomorrow's challenges. |

#### TimelineSection
| Element | Content |
|---------|---------|
| **H2** | `OUR JOURNEY` |
| **2017** | **Founded** — CPC Qatar established |
| **2019** | **Educational Excellence** — Major Ministry of Education contracts |
| **2021** | **Cultural Heritage** — Qatar Museums projects |
| **2022** | **FIFA World Cup** — Parking infrastructure for FIFA WC Qatar 2022 |
| **2024** | **57 Projects Strong** — Total value 26M+ QR |

#### StatsSection
| Element | Content |
|---------|---------|
| **Stats** | 57 Projects Completed, 45+ Satisfied Clients, 26M+ QR Total Value, 100% Satisfaction Rate |

---

### 2.3 PROJECTS PAGE (`/projects` → Projects.tsx)

| Element | Content |
|---------|---------|
| **H1** | `OUR PROJECTS` |
| **Subtitle** | `Built with precision. Delivered with pride.` |
| **Categories** | All, School, Mosque, Commercial Building, Stores and Factory, Public Project |
| **Tabs** | New Projects (from API, by category) vs Old Projects (legacy static data) |
| **Stats** | Total Projects (count), Categories (count), 100% Success Rate, 10+ Years Experience |
| **Features** | Search (title, description, client, location), Category filtering, Pagination |
| **Card Data** | Title, description, location, client, year, images, category |
| **CTAs** | Each card links to `/projects/:id` |

---

### 2.4 PROJECT DETAIL PAGE (`/projects/:id` → ProjectDetail.tsx)

| Element | Content |
|---------|---------|
| **H1** | `{project.title}` (dynamic) |
| **H2** | `PROJECT OVERVIEW` |
| **Sidebar: PROJECT DETAILS** | Location, Year, Client, Main Contractor, Consultant, Area (m²), Project Value |
| **Body** | Project description, image gallery with lightbox |
| **CTAs** | "Start Your Project" → `/contact`, Back to Projects → `/projects` |
| **Bottom** | ContactCTA section: "LET'S CONSTRUCT TOGETHER" |

---

### 2.5 CLIENTS PAGE (`/clients` → Clients.tsx)

| Element | Content |
|---------|---------|
| **H2** | `OUR CLIENTS` |
| **Subtitle** | `Partnerships Built on Trust` |
| **Client Categories** | Government, Corporate, Industrial, Real Estate, Retail, Other |
| **Stats** | 45+ Major Clients, 57+ Completed Projects, 26M+ Total Value, 100% Satisfaction |
| **Named Clients** | Ministry of Education, Ministry of Awqaf, Qatar Museums, Ministry of Ashghal, FIFA World Cup Qatar 2022, DHL Qatar, Al Meera, IMALCO, Ariane Real Estate, FBA Real Estate, QNIE |
| **Source** | clientsApi (from database) |
| **Sub-sections** | |
| TestimonialsSection | H2: "CLIENT TESTIMONIALS" — Fetched from API, star ratings, testimonial submission form |
| WhyChooseSection | H2: "TRUSTED EXCELLENCE" — 4 features: Government Approved (CR 108122), Proven Track Record (90+ projects, 26M+ QR), Quality Assurance (ISO standards), Diverse Expertise (8+ sectors) |
| Testimonial Form | Fields: Name*, Company, Position, Email, Company Logo upload, Rating (1-5 stars), Content* (min 20 chars) |

---

### 2.6 CONTACT PAGE (`/contact` → Contact.tsx)

| Element | Content |
|---------|---------|
| **H1** | `CONTACT US` |
| **H2 (Form)** | `SEND US A MESSAGE` |
| **H2 (Info)** | `CONTACT INFORMATION` |
| **Form Fields** | Name*, Email*, Phone, Company, Subject (dropdown), Message* |
| **Subject Options** | General Inquiry, Project Quote, Partnership, Career, Other |
| **Head Office** | Mirqab Mall, Area No. 39, Street No.840, Building No.53, Block D – Office No. 307-308, P.O. Box: 15776, Doha, Qatar |
| **Phone** | +974 4432-2743 |
| **Fax** | +974 4029-1295 |
| **Email** | Info@ctgroups.net |
| **Map** | Embedded Google Maps iframe (Cosmo Projects & Construction and Trading, Doha) |
| **API** | contactApi.submit() |

---

### 2.7 CERTIFICATES PAGE (`/certificates` → Certificates.tsx)

| Element | Content |
|---------|---------|
| **H1** | `Company Certificates` |
| **Subtitle** | `Official documentation and certifications` |
| **Certificate 1** | **Commercial Registration** — CR 108122, Issued by: Ministry of Commerce and Industry, Valid until: December 2029 |
| **Certificate 2** | **Computer Card** — Establishment Card, Issued by: Ministry of Interior, Valid until: 2028 |
| **Certificate 3** | **Tax Card** — Tax Identification, Issued by: General Tax Authority, Status: Active |
| **Certificate 4** | **Commercial Permit** — Business License, Issued by: Municipality, Valid until: October 2029 |
| **Trust Indicators** | 10+ Years in Business, 100+ Projects Completed, 4 Active Certifications, 100% Compliance Rate |
| **H2** | `Committed to Transparency` |
| **Body** | "At CPC Qatar, we believe in complete transparency. All our certifications and legal documents are maintained up-to-date..." |

---

### 2.8 PRIVACY POLICY (`/privacy` → Privacy.tsx)

| Element | Content |
|---------|---------|
| **H1** | `PRIVACY POLICY` |
| **Last Updated** | December 24, 2025 |
| **8 Sections** | Information We Collect, How We Use Information, Data Protection, Cookie Policy, Third-Party Services, Health & Safety Policy (5 subsections), Quality Policy (5 bullets), Contact Information |
| **Contact** | Info@ctgroups.net, +974 4432-2743 |

---

### 2.9 TERMS OF USE (`/terms` → Terms.tsx)

| Element | Content |
|---------|---------|
| **H1** | `TERMS OF USE` |
| **Last Updated** | December 24, 2025 |
| **8 Sections** | About This Website, Company Information, Website Content, Project Information, Project Quotes, Privacy, Updates to Terms, Contact Information |
| **Company Details** | Legal Name: Cosmo Projects & Construction and Trading W.L.L., CR: 108122, Full address, phone, fax, email |

---

### 2.10 NOT FOUND (`/404` → NotFound.tsx)

| Element | Content |
|---------|---------|
| **H1** | `404` |
| **Body** | "Oops! Page not found" |
| **CTA** | "Return to Home" → `/` |

---

## 3. SERVICES CATALOG

### Complete Services List (compiled from all pages/components)

| Service | Sub-services | Source Components |
|---------|-------------|-------------------|
| **Earth Works / Earthworks** | Site Clearing, Excavation, Grading, Compaction, Site Preparation, Land Grading | ServicesImageGrid, WhatIsCPC |
| **Sub-Grade & Sub-Base** | Layer Preparation, Material Testing, Compaction Control, Quality Assurance | ServicesImageGrid |
| **Asphalt Works / Asphalt Pavement Construction** | Hot Mix Asphalt, Cold Mix, Surface Treatment, Maintenance | ServicesImageGrid, WhatIsCPC, Structured Data |
| **Traffic Signs & Road Marking** | Thermoplastic Marking, Sign Installation, Safety Measures, Line Marking | ServicesImageGrid, WhatIsCPC |
| **Interlock & Kerbstone / Block Paving** | Paver Installation, Kerbstone Laying, Pattern Design, Finishing Works | ServicesImageGrid, WhatIsCPC |
| **Steel Works** | Structural Steel Fabrication, Installation | WhatIsCPC |
| **Road Construction** | Complete Road Building, Resurfacing | WhatIsCPC, Structured Data |
| **Highway Construction** | — | ServicesMarquee, Footer |
| **Street Development** | — | ServicesMarquee |
| **Infrastructure Development** | — | ServicesMarquee, Structured Data |
| **Bridge Construction** | — | ServicesMarquee |
| **Road Maintenance** | — | ServicesMarquee, Footer |

### Licensed Activities (from Certificates/Structured Data)
- Construction & General Contracting (Code: 4100001)
- Roads & Pavements Construction (Code: 4210100)

---

## 4. PROJECT DATA INVENTORY

### Static Project Data (projects.ts — "Old Projects")

#### Educational Projects (23)
All under **Client: Ministry of Education** | **Main Contractor: Mesopotamia**

| # | Project Name | Location | Images |
|---|-------------|----------|--------|
| 1 | MOE Parking - Al Qutaifiya | Al Qutaifiya | 10 |
| 2 | MOE Parking - Qatar Academy Msheireb | Qatar Academy Msheireb | 8 |
| 3 | MOE Parking - Al Sailiya | Al Sailiya | 9 |
| 4 | MOE Parking - Al Shahaniya | Al Shahaniya | 7 |
| 5 | MOE Parking - Rawdat Rashed | Rawdat Rashed | 6 |
| 6 | MOE Parking - Al Thumama | Al Thumama | 6 |
| 7 | MOE Parking - Muaither Stage 1 | Muaither | 8 |
| 8 | MOE Parking - Muaither Stage 2 | Muaither | 7 |
| 9 | MOE Parking - Al Gharafa 1 | Al Gharafa | 7 |
| 10 | MOE Parking - Al Gharafa 2 | Al Gharafa | 7 |
| 11 | MOE Parking - Al Gharafa 3 | Al Gharafa | 5 |
| 12 | MOE Parking - Al Rayyan 1 | Al Rayyan | 6 |
| 13 | MOE Parking - Al Rayyan 2 | Al Rayyan | 6 |
| 14 | MOE Parking - Al Rayyan 3 | Al Rayyan | 6 |
| 15 | MOE Parking - Al Rayyan 4 | Al Rayyan | 6 |
| 16 | MOE Parking - Al Rayyan 5 | Al Rayyan | 6 |
| 17 | MOE Parking - Al Wakra 1 | Al Wakra | 6 |
| 18 | MOE Parking - Al Wakra 2 | Al Wakra | 6 |
| 19 | MOE Parking - Al Wakra 3 | Al Wakra | 6 |
| 20 | MOE Parking - Doha 1 | Doha | 6 |
| 21 | MOE Parking - Doha 2 | Doha | 6 |
| 22 | MOE Parking - Doha 3 | Doha | 6 |
| 23 | MOE Parking - Doha 4 | Doha | 6 |

#### Named Major Projects (from projects.ts)

| Project | Location | Area | Category | Client |
|---------|----------|------|----------|--------|
| Ministry Education Parking (Al Qutaifiya) | Al Qutaifiya, Doha | — | Educational | Ministry of Education |
| School Bus Parking Stage 1 | Various, Qatar | 16,000 m² | Educational | Ministry of Education |
| School Bus Parking Stage 2 | Various, Qatar | 22,000 m² | Educational | Ministry of Education |
| Mona Gardens - 237 Villas | El Rayan, Doha | 14,900 m² | Residential | — |
| DHL Warehouse | SEZ | 4,310 m² | Logistics & Warehouse | DHL |
| FIFA World Cup 2022 Parking | Doha | 45,000 m² | Public Infrastructure | FIFA |
| Qatar Museum Roads Lusail | Lusail | 9,250 m² | Historical & Cultural | Qatar Museums |
| Alzubara Historical Castle | — | — | Historical & Cultural | — |
| Mosques Road Work | — | — | Religious | — |
| Al Meera Rawdat Al Hamama | Rawdat Al Hamama | 6,800 m² | Commercial & Retail | Al Meera |
| National Foam Factory | New Industrial Area | 3,000 m² | Industrial | — |
| Galva Steel Factory | Wakra Logistic Park | 4,857 m² | Industrial | — |
| Compound 126 Villas | Al-Messila | 7,650 m² | Residential | — |
| Save Storage Warehouse | — | — | Logistics & Warehouse | — |
| Farm Road Work | — | 6,800 m² | Mixed | — |

#### Project Categories in Database (API)
- School
- Mosque
- Commercial Building
- Stores and Factory
- Public Project

#### Project Categories in Static Data
- Educational
- Religious
- Industrial
- Residential
- Commercial & Retail
- Logistics & Warehouse
- Historical & Cultural
- Public Infrastructure
- Mixed

#### Stats Object (projects.ts)
- Total Projects: 57
- Total Images: 409
- Years of Experience: 10
- Clients Served: 45

### Geographic Coverage
**Locations mentioned across all projects:**
Doha, Al Wakra, Al Rayyan, Al Gharafa, Al Shahaniya, Lusail, Rawdat Rashed, Muaither, Al Thumama, Al Sailiya, New Industrial Area, Wakra Logistic Park, SEZ (Special Economic Zone), Al Qutaifiya, Al-Messila, Qatar Academy Msheireb, Rawdat Al Hamama, El Rayan

**Structured Data areas served:** Qatar, Doha, Al Wakrah, Al Khor, Lusail

---

## 5. CLIENT & TESTIMONIAL DATA

### Named Clients (compiled from all sources)

| Client | Category | Mentioned In |
|--------|----------|-------------|
| Ministry of Education | Government | About, Clients, FeaturedShowcase, Testimonials logos, projects data |
| Ministry of Awqaf / Endowments / Waqif | Government | About, Clients, FeaturedShowcase, Testimonials logos |
| Qatar Museums | Government/Cultural | About, Clients, Testimonials logos, projects data |
| Ministry of Ashghal | Government | Clients, Testimonials logos |
| FIFA World Cup Qatar 2022 | International | About, Clients, FeaturedShowcase, Testimonials logos, projects data |
| DHL Qatar | Corporate/Logistics | About, Clients, Testimonials logos, projects data |
| Al Meera | Retail | About, Clients, Testimonials logos, projects data |
| IMALCO | Corporate | Clients, Testimonials logos |
| Ariane Real Estate | Real Estate | Clients, Testimonials logos |
| FBA Real Estate | Real Estate | Clients, Testimonials logos |
| QNIE | Corporate | Clients |
| National Foam | Industrial | Testimonials logos, projects data |
| Mesopotamia | Contractor | projects data (main contractor) |
| Manateq | Government | FeaturedShowcase |

### Client Stats (across site)
- 45+ / 57+ / 90+ — Numbers vary by section (inconsistency)

### Testimonials
- **Source:** Backend API (`testimonialsApi.getApproved`)
- **Submission Form:** Available on Clients page
- **Form Fields:** Name*, Company, Position, Email, Phone, Rating (1-5), Content* (min 20 chars), Company Logo upload
- **Review Process:** Submitted testimonials reviewed before publishing, pending reviews expire after 72 hours

---

## 6. INTERNAL LINK MAP

### Header Navigation (Header.tsx)
| Link Text | Path |
|-----------|------|
| Home | `/` |
| About | `/about` |
| Projects | `/projects` |
| Clients | `/clients` |
| Contact | `/contact` |
| **Get a Quote** (CTA) | `/contact` |

### Footer Navigation (Footer.tsx)
**Quick Links:**
| Link Text | Path |
|-----------|------|
| Home | `/` |
| About | `/about` |
| Projects | `/projects` |
| Clients | `/clients` |
| Contact | `/contact` |
| Terms of Use | `/terms` |

**Legal Documents:**
| Link Text | Path |
|-----------|------|
| Company Certificates | `/certificates` |
| Commercial Registration | `/certificates` |
| Tax Card | `/certificates` |
| Commercial Permit | `/certificates` |

**Bottom Bar:**
| Link Text | Path |
|-----------|------|
| Privacy Policy | `/privacy` |
| Terms of Use | `/terms` |

**Footer Services (text only, not linked):**
- Highway Construction, Street Development, Infrastructure, Road Maintenance, Bridge Construction

**External:**
| Link | URL |
|------|-----|
| Designer credit | `https://eliteera.web.app/` |

### Floating Contact Buttons (FloatingContactButtons.tsx)
| Button | Target |
|--------|--------|
| Contact Us | `/contact` (internal) |
| Email | `mailto:Info@ctgroups.net` |
| Map | Google Maps link |
| Phone | `tel:+97444322743` |

### All Routes (App.tsx)
**Public:**
`/`, `/about`, `/projects`, `/projects/:id`, `/clients`, `/contact`, `/terms`, `/privacy`, `/certificates`

**Admin (Disallowed in robots.txt):**
`/admin/login`, `/admin`, `/admin/dashboard`, `/admin/projects`, `/admin/projects/:id`, `/admin/projects/new`, `/admin/projects/:id/edit`, `/admin/messages`, `/admin/messages/:id`, `/admin/clients`, `/admin/testimonials`, `/admin/settings`

---

## 7. ARABIC (i18n) CONTENT

### Source: ar.json — Full Arabic Translation

#### Navigation
| English | Arabic |
|---------|--------|
| Home | الرئيسية |
| About | من نحن |
| Projects | المشاريع |
| Clients | العملاء |
| Contact | اتصل بنا |
| Privacy Policy | سياسة الخصوصية |
| Terms & Conditions | الشروط والأحكام |

#### Common UI
| English | Arabic |
|---------|--------|
| Loading | جاري التحميل |
| Get a Quote | احصل على عرض سعر |
| Learn More | اعرف المزيد |
| Contact Us | اتصل بنا |
| Read More | اقرأ المزيد |
| View All | عرض الكل |
| Submit | إرسال |
| Send Message | إرسال الرسالة |
| Close | إغلاق |

#### Home Page
| English | Arabic |
|---------|--------|
| COSMO PROJECTS & CONSTRUCTION | كوزمو للمشاريع والإنشاءات |
| Constructing Qatar's Future, One Road at a Time | نبني مستقبل قطر، طريق واحد في كل مرة |
| CONSTRUCTING QATAR'S INFRASTRUCTURE | بناء البنية التحتية لدولة قطر |
| Premier road construction and civil engineering excellence since 2017 | التميز في إنشاء الطرق والهندسة المدنية منذ عام 2017 |
| Explore Our Projects | استكشف مشاريعنا |
| Projects Completed | مشروع منجز |
| Years Experience | سنوات من الخبرة |
| Happy Clients | عميل سعيد |
| Skilled Workforce | قوة عاملة ماهرة |
| OUR SERVICES | خدماتنا |
| WHY CHOOSE US | لماذا تختارنا |
| Excellence in Every Project | التميز في كل مشروع |
| Unmatched Quality | جودة لا مثيل لها |
| Proven Track Record | سجل حافل بالإنجازات |
| Modern Technology | التكنولوجيا الحديثة |
| Safety First | السلامة أولاً |
| OUR PROCESS | عمليتنا |
| From Vision to Reality | من الرؤية إلى الواقع |
| Planning & Design | التخطيط والتصميم |
| Execution | التنفيذ |
| Delivery | التسليم |
| WHAT WE DO | ماذا نفعل |
| Quality & Certifications | الجودة والشهادات |
| CLIENT TESTIMONIALS | شهادات العملاء |
| Ready to Start Your Project? | هل أنت مستعد لبدء مشروعك؟ |
| Get Started Today | ابدأ اليوم |

#### About Page
| English | Arabic |
|---------|--------|
| OUR STORY | قصتنا |
| Since 2017 | منذ عام 2017 |
| ABOUT US | من نحن |
| Construction Excellence Since 2017 | نبني التميز منذ عام 2017 |
| WHO WE ARE | من نحن |
| (Full company description) | كوزمو للمشاريع والإنشاءات هي شركة رائدة في الهندسة المدنية وإنشاء الطرق في قطر، تأسست برؤية رئيس مجلس الإدارة محمد أحمد مبارك النصر. منذ عام 2017، نقوم بتحويل المشهد البنية التحتية لقطر بدقة وجودة وابتكار. |
| OUR VALUES | قيمنا |
| PRECISION | الدقة |
| QUALITY | الجودة |
| INNOVATION | الابتكار |
| OUR JOURNEY | رحلتنا |
| Company Founded | تأسيس الشركة |
| Educational Excellence | التميز التعليمي |
| Cultural Heritage | التراث الثقافي |
| FIFA World Cup | كأس العالم فيفا |
| 57 Projects Strong | 57 مشروعاً قوياً |
| Chairman & Founder | رئيس مجلس الإدارة والمؤسس |
| Mohammed Ahmed Mubarak Al-Nasr | محمد أحمد مبارك النصر |

#### Projects Page
| English | Arabic |
|---------|--------|
| OUR PROJECTS | مشاريعنا |
| Excellence in Execution | التميز في التنفيذ |
| All Projects | جميع المشاريع |
| Road Works | أعمال الطرق |
| Educational | تعليمي |
| Cultural | ثقافي |
| Commercial | تجاري |
| Parking | مواقف السيارات |

#### Clients Page
| English | Arabic |
|---------|--------|
| OUR CLIENTS | عملاؤنا |
| Trusted by Qatar's Leading Organizations | موثوق به من قبل المؤسسات الرائدة في قطر |
| Government Entities | الجهات الحكومية |
| Private Sector | القطاع الخاص |
| Cultural Institutions | المؤسسات الثقافية |

#### Contact Page
| English | Arabic |
|---------|--------|
| CONTACT US | اتصل بنا |
| Let's Construct Together | لنبني معاً |
| Get In Touch | تواصل معنا |
| SEND US A MESSAGE | أرسل لنا رسالة |
| Full Name | الاسم الكامل |
| Email | البريد الإلكتروني |
| Phone | الهاتف |
| Company | الشركة |
| Your Message | رسالتك |
| Send Message | إرسال الرسالة |
| Message Sent! | تم إرسال الرسالة! |
| Business Hours | ساعات العمل |
| Sunday - Thursday: 7:00 AM - 5:00 PM | الأحد - الخميس: 7:00 صباحاً - 5:00 مساءً |

#### Footer
| English | Arabic |
|---------|--------|
| About CPC | عن كوزمو |
| Leading civil engineering and road construction company in Qatar since 2017 | شركة رائدة في الهندسة المدنية وإنشاء الطرق في قطر منذ عام 2017 |
| Quick Links | روابط سريعة |
| © 2024 COSMO PROJECTS & CONSTRUCTION. All rights reserved. | © 2024 كوزمو للمشاريع والإنشاءات. جميع الحقوق محفوظة. |

### Arabic Keywords from index.html meta tag
`مقاولات قطر, شركة إنشاءات قطر, بناء طرق قطر, أسفلت الدوحة, أعمال ترابية, بلاط متداخل, أعمال حديد, هندسة مدنية`

### Arabic from Structured Data (FAQPage)
- Q: "ما هي خدمات شركة كوزمو للمشاريع والإنشاءات في قطر؟"
- A: "تقدم شركة كوزمو (CPC Qatar) خدمات إنشاء الطرق، رصف الأسفلت، الأعمال الترابية، رصف المتداخل والأرصفة، علامات المرور وخطوط الطرق، والبنية التحتية في الدوحة وقطر. رقم السجل التجاري 108122."

---

## 8. KEYWORD INVENTORY

### Primary Keywords (by frequency/prominence)

| Keyword | Frequency (approx) |
|---------|-------------------|
| CPC Qatar | Very High — title, meta, structured data, all pages |
| Cosmo Projects & Construction | Very High — legal name, footer, about, structured data |
| road construction Qatar | High — meta, structured data, multiple sections |
| asphalt paving Doha | High — meta, services, structured data |
| earthworks Qatar | High — meta, services |
| construction company Qatar | High — meta, structured data |
| civil engineering Qatar | High — meta, about, structured data |
| infrastructure Doha/Qatar | High — hero, marquee, structured data |

### Secondary Keywords

| Keyword | Sources |
|---------|---------|
| interlock paving Qatar | meta, services |
| kerbstone installation Qatar | meta, services |
| subgrade subbase Qatar | meta, services |
| steel works Qatar | meta, about services |
| highway construction Qatar | meta, marquee, footer |
| road marking Qatar | meta, services |
| traffic signs Qatar | meta, services |
| grading compaction Qatar | meta, services |
| road maintenance Qatar | meta, marquee, footer |

### Long-tail Keywords (from structured data & content)

- "road construction company in Doha Qatar"
- "asphalt paving contractor Qatar"
- "FIFA World Cup Qatar parking construction"
- "Ministry of Education school parking Qatar"
- "interlock paving and kerbstone installation"
- "subgrade and subbase works Qatar"
- "commercial registration 108122 Qatar"
- "earthworks and grading services Qatar"
- "hot mix asphalt cold mix Qatar"
- "thermoplastic road marking Qatar"

### Brand Keywords
- CPC Qatar
- Cosmo Projects & Construction
- COSMO PROJECTS & CONSTRUCTION AND TRADING W.L.L.
- CR 108122
- ctgroups.net
- cpc-qa.com

### Geographic Keywords
- Qatar, Doha, Al Wakrah, Al Khor, Lusail, Al Rayyan, Al Gharafa, Al Shahaniya, Muaither, Al Thumama, Al Sailiya, Al Wakra, Al Messila

---

## 9. STRUCTURED DATA (JSON-LD)

### 1. Organization
```json
{
  "@type": "Organization",
  "name": "CPC Qatar — Cosmo Projects & Construction",
  "alternateName": ["CPC Qatar", "Cosmo Projects & Construction", "كوزمو للمشاريع والإنشاءات"],
  "url": "https://cpc-qa.com/",
  "logo": "https://cpc-qa.com/cpc_logo.png",
  "contactPoint": { "telephone": "+974-4432-2743", "email": "Info@ctgroups.net" },
  "sameAs": [] // empty
}
```

### 2. LocalBusiness (GeneralContractor)
```json
{
  "@type": "GeneralContractor",
  "name": "CPC Qatar — Cosmo Projects & Construction and Trading W.L.L.",
  "address": "Mirqab Mall, Area 39, Street 840, Building 53, Block D, Office 307-308, Doha, Qatar",
  "geo": { "latitude": 25.2734836, "longitude": 51.5014973 },
  "priceRange": "$$$$",
  "foundingDate": "2017",
  "numberOfEmployees": { "minValue": 50, "maxValue": 200 },
  "areaServed": ["Qatar", "Doha", "Al Wakrah", "Al Khor", "Lusail"],
  "hasOfferCatalog": 6 services listed
}
```

### 3. WebSite + SearchAction
```json
{
  "@type": "WebSite",
  "name": "CPC Qatar",
  "url": "https://cpc-qa.com/",
  "potentialAction": { "@type": "SearchAction", "target": "https://cpc-qa.com/projects?search={search_term_string}" }
}
```

### 4. BreadcrumbList
- Home → About, Home → Projects, Home → Clients, Home → Contact, Home → Certificates

### 5. FAQPage (5 questions)
1. "What services does CPC Qatar offer?" → Lists 6 services
2. "Where is CPC Qatar located?" → Full address
3. "How many projects has CPC Qatar completed?" → 57+ projects, 26M+ QR
4. "What certifications does CPC Qatar hold?" → CR 108122, ISO standards
5. "ما هي خدمات شركة كوزمو للمشاريع والإنشاءات في قطر؟" → Arabic answer with services

---

## 10. SEO ISSUES & RECOMMENDATIONS

### Critical Issues

1. **Sitemap `<lastmod>` dates are in the future (2026-02-12)** — Should reflect actual last modification dates. Search engines may ignore or distrust these.

2. **ParallaxStats shows "45% Client Satisfaction"** — This is a rendering bug. The `stats.satisfiedClients` value is 45 (meaning 45 clients), but it's displayed with a `%` symbol, making it read as 45% satisfaction. All other sections show 100% satisfaction. Fix the component or data.

3. **Inconsistent project/client counts across the site:**
   - Hero: "90+ Projects" / "57+ Major Clients"
   - About: "57 Projects Completed" / "45+ Satisfied Clients"
   - Clients page: "57+ Completed Projects" / "45+ Major Clients"
   - FeaturedShowcase: no count discrepancy
   - i18n en.json: "90+ successful projects"
   - WhyChooseSection: "90+ completed projects"
   
   **Recommendation:** Standardize to one consistent number. Pick 57 (actual) or 90+ (including sub-projects) and use it everywhere.

4. **i18n locale files contain placeholder data** — `en.json` and `ar.json` have placeholder phone (`+974 XXXX XXXX`) and email (`info@cpcqatar.com`) that differ from actual contact info (`+974 4432-2743`, `Info@ctgroups.net`). While these may not be actively used (hardcoded in components instead), they could cause issues if i18n is activated.

5. **Footer services are not linked** — "Highway Construction", "Street Development", "Infrastructure", "Road Maintenance", "Bridge Construction" are plain `<span>` text, not anchors. These should link to service sections or a dedicated services page.

6. **No dedicated Services page** — Services are scattered across Home (ServicesImageGrid), About (WhatIsCPC), and various sections. A `/services` page would be valuable for SEO targeting service-specific keywords.

7. **SPA without SSR/SSG** — This is a React SPA (client-side rendered). Google can index SPAs, but server-side rendering (Next.js/Remix) or pre-rendering would significantly improve SEO performance, crawlability, and Core Web Vitals.

### Moderate Issues

8. **Missing per-page meta tags** — Only index.html has meta tags. Internal pages (About, Projects, Clients, Contact, etc.) don't have unique `<title>` or `<meta description>` tags since it's a SPA without react-helmet or similar. All pages share the same title/description.

9. **Empty `sameAs` array in Organization schema** — Should include social media profiles (LinkedIn, Instagram, etc.) if they exist.

10. **No alt text diversity** — Many images use generic alt text like "CPC Logo" or project names without descriptive keywords.

11. **Project detail pages (`/projects/:id`) not in sitemap** — Dynamic project pages are not listed in sitemap.xml. Consider generating entries for top projects.

12. **Arabic content is i18n-ready but not actively routed** — The hreflang tag points to `?lang=ar` but the actual routing doesn't seem to have dedicated Arabic URL paths. Consider `/ar/` prefix routes for proper Arabic SEO.

13. **`/certificates` page missing from hreflang alternates** — Only main pages have hreflang in sitemap, certificates page doesn't have Arabic alternate.

### Minor Issues

14. **Copyright year in footer is dynamic** (`new Date().getFullYear()`), but i18n files hardcode "© 2024" — inconsistency if i18n is activated.

15. **Contact email inconsistency** — Components use `Info@ctgroups.net`, i18n files use `info@cpcqatar.com`. The actual business email appears to be `Info@ctgroups.net`.

16. **"Bridge Construction" in marquee/footer** — No project evidence of bridge work. Could be aspirational but may mislead if there's no portfolio to back it.

17. **Business hours only in Arabic i18n** — `Sunday - Thursday: 7:00 AM - 5:00 PM` appears in ar.json contact section but not prominently on the English contact page or structured data.

---

*Audit completed: All 9 pages, 18+ section components, 2 i18n locale files, layout components, data files, and configuration files cataloged.*
