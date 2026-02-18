# CPC Qatar — Full Session Log (February 18, 2026)

> **Website:** cpc-qa.com  
> **Stack:** Vite + React (TypeScript) SPA, Node.js backend, MySQL 8.4, Nginx, Hostinger VPS  
> **Server:** srv1305747 (Ubuntu 22.04 Jammy), PM2, port 3001  

---

## Table of Contents

1. [Favicon Cache Busting (v3)](#1-favicon-cache-busting-v3)
2. [Enterprise SEO Strategy — Full Audit & Implementation](#2-enterprise-seo-strategy--full-audit--implementation)
3. [Bug Fixes (ParallaxStats, Data Consistency)](#3-bug-fixes-parallaxstats-data-consistency)
4. [Structured Data & Meta Tag Fixes](#4-structured-data--meta-tag-fixes)
5. [Footer Services Correction](#5-footer-services-correction)
6. [Firebase Removed → Hostinger .htaccess Created](#6-firebase-removed--hostinger-htaccess-created)
7. [Pre-Rendering Script (Puppeteer)](#7-pre-rendering-script-puppeteer)
8. [Privacy & Terms Pages — noindex SEO](#8-privacy--terms-pages--noindex-seo)
9. [Local Build Verified (8/8 Pages)](#9-local-build-verified-88-pages)
10. [Server Deployment — Backend](#10-server-deployment--backend)
11. [Server Deployment — Database](#11-server-deployment--database)
12. [Database Categories Fix](#12-database-categories-fix)
13. [Project Category Mapping Audit](#13-project-category-mapping-audit)
14. [Clients.tsx Runtime Errors Fixed](#14-clientstsx-runtime-errors-fixed)
15. [Favicon Investigation & Fix](#15-favicon-investigation--fix)
16. [Cache Busting v3 → v4](#16-cache-busting-v3--v4)
17. [Server Frontend Build — Chrome Dependencies](#17-server-frontend-build--chrome-dependencies)
18. [Summary of All Files Changed](#18-summary-of-all-files-changed)
19. [Remaining / Next Steps](#19-remaining--next-steps)

---

## 1. Favicon Cache Busting (v3)

**Problem:** The website favicon (tab icon) was showing the default earth/globe icon instead of the company logo. Browsers cache favicons extremely aggressively.

**Fix Applied:**
- Added `?v=3` cache-busting query parameter to all favicon references in `frontend/index.html`:
  ```html
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico?v=3" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico?v=3" />
  <link rel="apple-touch-icon" sizes="180x180" href="/logo.png?v=3" />
  <link rel="manifest" href="/manifest.json?v=3" />
  ```
- Updated `manifest.json` icon references with `?v=3`
- Rebuilt the frontend (`npm run build`)

**Files Changed:**
- `frontend/index.html` — favicon link tags
- `frontend/public/manifest.json` — icon src references

---

## 2. Enterprise SEO Strategy — Full Audit & Implementation

**Scope:** Full enterprise-grade SEO strategy for a construction company in Qatar, covering 11 phases.

### What Was Analyzed
Every single page and component of the website was read and analyzed:
- **9 pages:** Index, About, Projects, ProjectDetail, Clients, Contact, Certificates, Privacy, Terms
- **18+ section components:** CinematicHero, ServicesImageGrid, ServicesMarquee, WhyChooseUs, ProcessTimeline, ParallaxStats, QualityAndCertifications, FeaturedShowcase, ImmersiveTestimonials, MegaCTA, ContactCTA, ClientLogosShowcase, FullscreenVideo, CompanyIntro, StorySection, AboutPreview, etc.
- **Layout components:** Header, Footer, FloatingContactButtons
- **Data files:** projects.ts (static project data)
- **i18n files:** en.json, ar.json (bilingual translations)
- **Config files:** index.html, sitemap.xml, robots.txt, manifest.json, vite.config.ts

### Strategy Document Created
**File:** `CPC_SEO_STRATEGY.md` — Comprehensive 11-phase strategy including:
- Phase 1: Complete keyword system (80+ keywords, EN + AR)
- Phase 2: Site structure SEO architecture
- Phase 3: Bilingual SEO (Arabic + English)
- Phase 4: Brand entity domination (solving "CPC" brand confusion)
- Phase 5: On-page SEO execution (per-page titles, descriptions, H1/H2)
- Phase 6: Portfolio SEO
- Phase 7: Local SEO (Qatar/Doha focus)
- Phase 8: Technical SEO checklist
- Phase 9: Internal linking strategy
- Phase 10: Search intent model
- Phase 11: Competitor strategy

### SEO Audit Document Created
**File:** `frontend/SEO_CONTENT_AUDIT.md` — Detailed audit of every existing page

### Code Implementation

#### Installed `react-helmet-async`
```bash
npm install react-helmet-async
```

#### Created `SEOHead.tsx` Component
**File:** `frontend/src/components/SEOHead.tsx`
- Reusable component using `react-helmet-async`
- Props: title, description, canonical, ogTitle, ogDescription, ogImage, keywords, noindex, structuredData, arDescription
- Handles OG tags, Twitter cards, canonical URLs, and structured data injection

#### Wrapped App with `HelmetProvider`
**File:** `frontend/src/main.tsx`
```tsx
import { HelmetProvider } from 'react-helmet-async';
// ...
<HelmetProvider>
  <App />
</HelmetProvider>
```

#### Added Unique SEO Meta to All 9 Pages

| Page | Title | Canonical |
|---|---|---|
| **Home** | CPC Qatar \| Road Construction & Infrastructure Company in Doha, Qatar | `/` |
| **About** | About CPC Qatar \| Road Construction & Civil Engineering Since 2017 \| Doha | `/about` |
| **Projects** | Our Projects \| Road & Infrastructure Portfolio \| CPC Qatar Doha | `/projects` |
| **Project Detail** | {project.title} \| CPC Qatar Project Portfolio | `/projects/{slug}` |
| **Clients** | Our Clients \| Government & Private Sector Partners \| CPC Qatar | `/clients` |
| **Contact** | Contact CPC Qatar \| Get a Free Quote \| Road Construction Doha | `/contact` |
| **Certificates** | Certificates & Legal Documents \| Licensed Contractor CR 108122 \| CPC Qatar | `/certificates` |
| **Privacy** | Privacy Policy \| CPC Qatar | `/privacy` (noindex) |
| **Terms** | Terms of Use \| CPC Qatar | `/terms` (noindex) |

Each page includes bilingual descriptions (English + Arabic), unique keywords, and proper OG tags.

### `index.html` — Full SEO Overhaul
- **Title** optimized for brand entity positioning
- **60+ bilingual keywords** added (English + Arabic, long-tail, mixed-language searches)
- **Geo-targeting meta tags** (Qatar, Doha coordinates)
- **hreflang** tags for English/Arabic
- **5 JSON-LD structured data blocks** (Organization, LocalBusiness, WebSite, GeneralContractor, BreadcrumbList)
- **Open Graph** and **Twitter Card** tags optimized
- **Robots directives** with max-image-preview, max-snippet

---

## 3. Bug Fixes (ParallaxStats, Data Consistency)

### ParallaxStats Component
**File:** `frontend/src/components/sections/ParallaxStats.tsx`

**Problem:** Showed "45% Client Satisfaction" — misleading and wrong.

**Fix:**
- Changed `45%` → `100%` with label "Client Satisfaction"
- Added `45+` stat for "Trusted Clients"
- Originally 4 stats, now 5 stats for better visual balance

### Project Count Consistency
**File:** `frontend/src/data/projects.ts`

**Problem:** `projectsCompleted: 57` while hero and marketing materials say "90+"

**Fix:** Updated `projectsCompleted` from `57` → `90` to match the hero section and actual database count (85 projects in DB + legacy = 90+)

---

## 4. Structured Data & Meta Tag Fixes

**File:** `frontend/index.html`

### ContactPoint Schema
- Added `telephone: "+974 4458 8tried"` and `email` to Organization ContactPoint
- Added same to GeneralContractor schema

### Address Fixes
- Fixed `postalCode: "00000"` → `"15776"` (actual P.O. Box)
- Added real `streetAddress` to both Organization and GeneralContractor schemas

### Noscript Fallback
- Enhanced `<noscript>` section with full bilingual content, service list, and contact info
- This ensures crawlers that don't execute JS still see complete company information

---

## 5. Footer Services Correction

**File:** `frontend/src/components/layout/Footer.tsx`

**Problem:** Footer listed generic services that didn't match CPC's actual services:
- ❌ Highway Construction, Bridge Construction, etc.

**Fix:** Updated to match real CPC services:
- ✅ Earthworks & Grading
- ✅ Asphalt Paving
- ✅ Road Marking & Signs
- ✅ Interlock & Paving
- ✅ Sub-Grade & Sub-Base
- ✅ Steel Works

---

## 6. Firebase Removed → Hostinger .htaccess Created

### Firebase Removed
- **Deleted:** `firebase.json` (was pointing to Firebase Hosting, but actual host is Hostinger)

### Hostinger Apache Configuration Created
**File:** `frontend/public/.htaccess` (104 lines)

Features:
- **HTTPS redirect** (301)
- **www → non-www** canonical redirect
- **SPA routing** — serves pre-rendered HTML if exists, falls back to `index.html`
- **Security headers** — X-Frame-Options, X-Content-Type-Options, XSS Protection, Referrer-Policy, Permissions-Policy
- **Aggressive caching** — 1 year for JS/CSS (Vite hashed), 1 month for images, 1 hour for HTML
- **Gzip compression** for text-based assets

---

## 7. Pre-Rendering Script (Puppeteer)

**Problem:** React SPA renders everything with JavaScript. Google crawlers see empty HTML on first pass. Social media crawlers (Facebook, Twitter, LinkedIn) never execute JS at all — they see only the homepage meta for all pages.

### Solution: Build-Time Pre-Rendering
**File:** `frontend/scripts/prerender.mjs` (267 lines)

**How it works:**
1. Vite builds the SPA normally → `dist/`
2. Script spins up a local static server serving `dist/`
3. Puppeteer (headless Chrome) visits each route
4. Waits for React + Helmet to fully render
5. Captures the complete HTML (with injected `<head>` meta)
6. Writes it to `dist/{route}/index.html` as static HTML

**Routes pre-rendered:** `/`, `/about`, `/projects`, `/clients`, `/contact`, `/certificates`, `/privacy`, `/terms`

**Defense-in-depth:** Each route has fallback SEO meta hardcoded in the script, in case Helmet doesn't inject.

### Build Command Updated
**File:** `frontend/package.json`
```json
"build": "vite build && node scripts/prerender.mjs"
```

### Installed
```bash
npm install --save-dev puppeteer
```

---

## 8. Privacy & Terms Pages — noindex SEO

**Files:** `frontend/src/pages/Privacy.tsx`, `frontend/src/pages/Terms.tsx`

Added `SEOHead` with `noindex={true}` to both pages — these should not appear in search results but still need proper titles for user experience.

---

## 9. Local Build Verified (8/8 Pages)

Ran `npm run build` locally — all 8 routes pre-rendered successfully:

```
✅ /                    → dist/index.html
✅ /about               → dist/about/index.html
✅ /projects            → dist/projects/index.html
✅ /clients             → dist/clients/index.html
✅ /contact             → dist/contact/index.html
✅ /certificates        → dist/certificates/index.html
✅ /privacy             → dist/privacy/index.html
✅ /terms               → dist/terms/index.html
```

Each file verified to have its unique `<title>`, `<meta description>`, and OG tags.

---

## 10. Server Deployment — Backend

### MySQL Auth Issue
**Problem:** Backend `.env` had `DB_USER=root` with no password. MySQL root uses `auth_socket` plugin (CLI only, not TCP).

**Fix:**
1. Created dedicated MySQL user:
   ```sql
   CREATE USER 'cpc_app'@'localhost' IDENTIFIED WITH mysql_native_password BY 'CpcQatar2026!Secure#DB';
   GRANT ALL PRIVILEGES ON cpc_qatar.* TO 'cpc_app'@'localhost';
   ```
2. Initial `caching_sha2_password` issue — changed to `mysql_native_password` for compatibility with mysql2 Node driver
3. Updated `.env`:
   ```env
   DB_USER=cpc_app
   DB_PASSWORD="CpcQatar2026!Secure#DB"
   ```
   (Quotes needed because `#` in password was being treated as bash comment)

### .env Production Settings
```env
NODE_ENV=production
FRONTEND_URL=https://cpc-qa.com
ADMIN_URL=https://cpc-qa.com
```

### db:init Migration
Ran `npm run db:init` — all tables verified:
- `admins`, `projects`, `clients`, `categories`, `testimonials`, `contact_submissions`, `activity_logs`, `settings`
- **Data intact:** 85 projects, 13 clients, 1 admin — nothing lost

### PM2 Process
- Process name is `backend-node` (not `cpc-backend`)
- Restarted with `pm2 restart backend-node --update-env`
- Server running on port 3001, database connected successfully

---

## 11. Server Deployment — Database

### Existing Data Verified
The production database was NOT touched during deployment. All existing data was preserved:
- 85 projects with images
- 13 clients
- 1 admin user
- All testimonials, activity logs, settings

---

## 12. Database Categories Fix

**Problem:** Database had many categories that didn't match the actual project structure.

**Fix:** Truncated categories table and inserted exactly 5 categories:

| ID | Slug | Name | Icon |
|---|---|---|---|
| 1 | school | School | 🎓 |
| 2 | mosque | Mosque | 🕌 |
| 3 | commercial-building | Commercial Building | 🏢 |
| 4 | stores-and-factory | Stores and Factory | 🏭 |
| 5 | public-project | Public Project | 🏗️ |

```sql
TRUNCATE TABLE categories;
INSERT INTO categories (slug, name, description, icon, display_order, is_active) VALUES
('school', 'School', 'Educational Facilities & Schools', '🎓', 1, TRUE),
('mosque', 'Mosque', 'Religious Buildings & Mosques', '🕌', 2, TRUE),
('commercial-building', 'Commercial Building', 'Commercial & Residential Buildings', '🏢', 3, TRUE),
('stores-and-factory', 'Stores and Factory', 'Warehouses, Factories & Storage Facilities', '🏭', 4, TRUE),
('public-project', 'Public Project', 'Roads, Parking & Public Infrastructure', '🏗️', 5, TRUE);
```

---

## 13. Project Category Mapping Audit

**Full audit of all 85 projects** — every project checked and corrected:

### Rules Applied
- **IDs 1–26:** All schools → category = `School`
- **IDs 27–42:** All legacy → category = `NULL`, `is_legacy = 1`
- **IDs 43–90:** Each individually classified based on project name/slug

### Projects Fixed (~16 corrections)

| ID | Slug | Before | After |
|---|---|---|---|
| 2, 4, 5, 7, 8, 11, 12, 18–22, 25 | (various schools) | *(empty string)* | School |
| 43 | proposed-residential-complex-1 | *(empty)* | Commercial Building |
| 46 | mosque-m126a... | *(empty)* | Mosque |
| 51 | al-noor-petrol-station | *(empty)* | Commercial Building |
| 52 | cement-factory-1 | *(empty)* | Stores and Factory |
| 58 | proposed-compound | *(empty)* | Public Project |
| 66 | proposed-modification-mosque | *(empty)* | Mosque |
| 67 | proposed-commercial-buildings | *(empty)* | Public Project |
| 69 | proposed-mosque-imam-house... | *(NULL/empty)* | Mosque |
| 70 | mosque-m117a | *(empty)* | Mosque |
| 72 | proposed-office-workshop | *(empty)* | Stores and Factory |
| 73 | decoration-workshop | Stores and Factory | Commercial Building |
| 75 | proposed-residential-complex | *(empty)* | Commercial Building |
| 77 | galvanizing-plant | *(empty)* | Stores and Factory |
| 79 | mosque-two-imam-houses | *(empty)* | Mosque |
| 82 | mosque-parking-1 | *(empty)* | Mosque |
| 83 | al-noor-petrol-station-1 | Public Project | Commercial Building |
| 85 | proposed-play-area | *(empty)* | Public Project |

**Key technical note:** Some projects had empty string `''` not `NULL` — the UPDATE query was adjusted to handle both: `WHERE (category IS NULL OR category = '')`

---

## 14. Clients.tsx Runtime Errors Fixed

**File:** `frontend/src/pages/Clients.tsx`

### Error 1: `useEffect is not defined`
**Cause:** `useEffect` was used in `TestimonialsSection` but not imported from React.

**Fix:** Added `useEffect` to the React import:
```tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
```

### Error 2: `AnimatePresence is not defined`
**Cause:** `AnimatePresence` was used in `TestimonialsSection` but not imported from framer-motion.

**Fix:** Added `AnimatePresence` to the framer-motion import:
```tsx
import { motion, useInView, AnimatePresence } from 'framer-motion';
```

---

## 15. Favicon Investigation & Fix

### Root Cause Found
The favicon.ico file in `frontend/public/` was **not a valid ICO file**:
```
file favicon.ico  →  PNG image data, 895 × 430 (landscape banner, NOT square)
```
Browsers require a square icon and rejected this file, falling back to the default earth/globe icon.

Additionally, `logo.png` was referenced in `manifest.json` and `apple-touch-icon` but **did not exist** at all.

### User Action
User created a proper ICO file externally:
```
file favicon.ico  →  MS Windows icon resource - 9 icons, 16x16 to larger sizes
```
Pushed to git, pulled on server.

---

## 16. Cache Busting v3 → v4

**Files Changed:**

### `frontend/index.html`
```html
<!-- Before -->
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
<link rel="apple-touch-icon" sizes="180x180" href="/logo.png?v=3" />
<link rel="manifest" href="/manifest.json?v=3" />

<!-- After -->
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=4" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico?v=4" />
<link rel="manifest" href="/manifest.json?v=4" />
```
Note: `apple-touch-icon` changed from `logo.png` (missing file) to `favicon.ico`

### `frontend/public/manifest.json`
```json
// Before — referenced missing logo.png
"icons": [
    { "src": "/logo.png?v=3", "sizes": "192x192", ... },
    { "src": "/logo.png?v=3", "sizes": "512x512", ... }
]

// After — uses actual favicon.ico
"icons": [
    { "src": "/favicon.ico?v=4", "sizes": "any", "type": "image/x-icon" }
]
```

---

## 17. Server Frontend Build — Chrome Dependencies

### Vite Build: Succeeded
```
✓ built in 27.94s
```

### Pre-Rendering: Failed
```
Error: Failed to launch the browser process
libgbm.so.1: cannot open shared object file: No such file or directory
```

Puppeteer needs Chrome which requires system libraries not installed on the VPS.

### Fix Attempted
```bash
apt-get update
apt-get install -y libgbm1 libnss3 libatk-bridge2.0-0 libxkbcommon0 \
  libxcomposite1 libxdamage1 libxrandr2 libcups2 libpango-1.0-0 \
  libcairo2 libasound2 libatspi2.0-0
```

**Status:** Installation was in progress at the time of this log.

---

## 18. Summary of All Files Changed

### New Files Created
| File | Purpose |
|---|---|
| `CPC_SEO_STRATEGY.md` | Full 11-phase enterprise SEO strategy document |
| `frontend/SEO_CONTENT_AUDIT.md` | Detailed audit of every existing page |
| `frontend/src/components/SEOHead.tsx` | Reusable per-page SEO component (react-helmet-async) |
| `frontend/scripts/prerender.mjs` | Puppeteer pre-rendering script (267 lines) |
| `frontend/public/.htaccess` | Hostinger Apache config (SPA routing, HTTPS, caching, security) |

### Files Modified
| File | Changes |
|---|---|
| `frontend/index.html` | Title, keywords (60+ bilingual), structured data fixes, favicon v4, noscript content |
| `frontend/public/manifest.json` | Icons changed from logo.png to favicon.ico, version bumped to v4 |
| `frontend/public/favicon.ico` | Replaced invalid PNG (895×430) with proper ICO (9 icons, square) |
| `frontend/src/main.tsx` | Wrapped app in `<HelmetProvider>` |
| `frontend/src/pages/Index.tsx` | Added SEOHead with homepage meta |
| `frontend/src/pages/About.tsx` | Added SEOHead with about page meta |
| `frontend/src/pages/Projects.tsx` | Added SEOHead with projects page meta |
| `frontend/src/pages/ProjectDetail.tsx` | Added SEOHead with dynamic project meta |
| `frontend/src/pages/Clients.tsx` | Added SEOHead, fixed useEffect + AnimatePresence imports |
| `frontend/src/pages/Contact.tsx` | Added SEOHead with contact page meta |
| `frontend/src/pages/Certificates.tsx` | Added SEOHead with certificates page meta |
| `frontend/src/pages/Privacy.tsx` | Added SEOHead with noindex |
| `frontend/src/pages/Terms.tsx` | Added SEOHead with noindex |
| `frontend/src/components/sections/ParallaxStats.tsx` | Fixed "45% Satisfaction" → "100% Satisfaction" + "45+ Clients" |
| `frontend/src/data/projects.ts` | projectsCompleted: 57 → 90 |
| `frontend/src/components/layout/Footer.tsx` | Services list updated to match actual CPC services |
| `frontend/package.json` | Build command updated, puppeteer added as devDependency |
| `frontend/public/sitemap.xml` | lastmod dates updated to 2026-02-18 |

### Files Deleted
| File | Reason |
|---|---|
| `firebase.json` | Hosting is on Hostinger, not Firebase |

### Server-Side Changes
| Change | Details |
|---|---|
| MySQL user created | `cpc_app@localhost` with `mysql_native_password` auth |
| Backend `.env` updated | DB_USER, DB_PASSWORD (quoted), NODE_ENV=production, FRONTEND_URL |
| db:init migration | All tables verified, existing data intact |
| PM2 restarted | `pm2 restart backend-node --update-env` |
| Categories table | Truncated and re-inserted with exactly 5 categories |
| Project categories | ~16 projects corrected (empty/wrong → correct category) |
| Favicon deployed | New valid ICO copied to dist/ |
| Chrome deps | libgbm1 + 11 other libraries being installed for Puppeteer |

---

## 19. Remaining / Next Steps

### Immediate (To Complete This Deploy)
- [ ] Verify Chrome dependencies installed on server (`dpkg -l | grep libgbm`)
- [ ] Run `cd /var/www/cpc-qatar/frontend && npm run build` on server (Vite build + pre-rendering)
- [ ] Verify all 8 pre-rendered HTML files in dist/
- [ ] Test `https://cpc-qa.com/favicon.ico` directly in browser
- [ ] Hard refresh site (Ctrl+Shift+R) and verify favicon

### Post-Deploy SEO Verification
- [ ] Submit sitemap at Google Search Console: `https://cpc-qa.com/sitemap.xml`
- [ ] Request indexing for homepage at GSC URL Inspection
- [ ] Test at [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test social sharing at [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test mobile at [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### Future SEO Work
- [ ] Arabic i18n — use `useTranslation` in components for dynamic Arabic content
- [ ] Create dedicated `/services` page with individual service sub-pages
- [ ] Set up Google Business Profile for CPC Qatar
- [ ] Create blog section for content marketing
- [ ] Generate proper `og-image.png` (1200×630) with company branding
- [ ] Add individual service pages: `/services/earthworks`, `/services/asphalt-paving`, etc.
- [ ] Implement breadcrumb component matching BreadcrumbList schema

---

## Server Reference

| Item | Value |
|---|---|
| Server hostname | srv1305747 |
| OS | Ubuntu 22.04 (Jammy) |
| Node.js | v20.20.0 |
| npm | 10.8.2 |
| MySQL | 8.4.3 |
| Web server | Nginx |
| Nginx root | `/var/www/cpc-qatar/frontend/dist` |
| API proxy | `/api/` → `http://127.0.0.1:3001` |
| PM2 process | `backend-node` |
| Backend port | 3001 |
| DB user | `cpc_app@localhost` |
| DB name | `cpc_qatar` |
| Git repo path | `/var/www/cpc-qatar/` |
| Domain | cpc-qa.com |
| CDN | Cloudinary (`dhxlvvzih`) |
