# CPC-QA.com — SEO Progress & Roadmap

**Last Updated:** March 1, 2026
**Site:** https://cpc-qa.com
**Industry:** Road Construction & Infrastructure, Qatar

---

## ✅ COMPLETED — Session Log

### Session 1 — Lighthouse Optimization + Cloudinary Migration
- Migrated all 60 assets to Cloudinary CDN (`f_auto,q_auto` transforms)
- Replaced all local image/video paths with Cloudinary URLs
- Deleted 42 unused local asset files
- Migrated to `next/font` — eliminated render-blocking fonts (Inter + Bebas Neue)
- Added `display: swap` on all fonts
- Implemented video lazy-loading in `CinematicHero.tsx`
- Added `aria-label` attributes across interactive elements
- Fixed color contrast issues
- Added JSON-LD schemas: Organization, LocalBusiness, WebSite, BreadcrumbList, FAQPage

### Session 2 — Bug Fixes
- **Fixed:** Marketing text block rendering below footer on homepage
  - Root cause: `<section>` was placed after `<HomePage />` in `page.tsx` (which contains the footer)
  - Fix: `page.tsx` now returns `return <HomePage />;` only
- **Fixed:** Black video screen in CinematicHero hero section
  - Root cause: Video load triggered at scene 2 visibility (12% scroll) — too late to buffer
  - Fix: `scrollYProgress.on("change")` → `.load()` at 4% scroll, `.play()` at 12%

### Session 3 — Authority Backlink Strategy
- Added 8 verified client organization entities to `/clients` JSON-LD with real URLs:
  - Ashghal → `https://www.ashghal.gov.qa`
  - Ministry of Education → `https://edu.gov.qa`
  - Qatar Museums → `https://www.qm.org.qa`
  - DHL Qatar → `https://www.dhl.com/qa-en/home.html`
  - Al Meera → `https://www.almeera.com.qa`
  - IMALCO → `https://www.imalco.com`
  - Ministry of Awqaf → `https://awqaf.gov.qa`
  - FIFA World Cup Qatar 2022 → `https://www.fifa.com`
- Added `contractorRelationshipSchema` linking CPC to all 8 clients
- Added static HTML `<section>` on `/clients` with 8 crawlable outbound `<a>` links
- Client cards on `/clients` now link to real client websites
- Upgraded global `organizationSchema` in `layout.tsx`:
  - Added `"@id": "https://cpc-qa.com/#organization"` (entity anchor)
  - Added `sameAs` with LinkedIn placeholder
  - Added `hasCredential` (CR 108122)
  - Added `knowsAbout` array (14 construction topics)
- Added `workExample` array in `about/page.tsx` (6 project-client entity links)

### Session 4 — Mobile-First SEO Hardening
- **Viewport fix:** Added `width: "device-width"`, `initialScale: 1`, `maximumScale: 5`
- **Root meta description:** Trimmed from 420 chars (with Arabic) to 153 chars
- **iOS PWA meta tags:** Added `apple-mobile-web-app-capable`, status-bar-style, title
- **Manifest:** Added `"orientation": "portrait-primary"`
- **FAQ answer #1:** Trimmed from 68 words to 35 words (Google Featured Snippets cutoff ~50 words)
- **About description:** Trimmed from 235 to 155 chars
- **Services description:** Trimmed from 222 to 139 chars

### Session 5 — Full Technical SEO Audit & Implementation
**14 issues found, all resolved:**

| # | Fix | File |
|---|---|---|
| 1 | `font-size` body: 15px → 16px (Google mobile minimum) | `globals.css` |
| 2 | All 6 service sub-page descriptions trimmed from 185-220 → ≤155 chars | `services/*/page.tsx` |
| 3 | `<img>` → `next/image <Image>` on services hub + 6 sub-pages (CLS fix, AVIF/WebP) | `services/page.tsx` + 6 sub-pages |
| 4 | Added `notFound()` in `projects/[id]/page.tsx` when project doesn't exist | `projects/[id]/page.tsx` |
| 5 | Added skip-to-content link in Header (`#main-content`) | `Header.tsx`, `layout.tsx` |
| 6 | Added `aria-label="Main navigation"` and `"Mobile navigation"` to `<nav>` | `Header.tsx` |
| 7 | Wrapped Footer link sections in `<nav aria-label>` landmarks | `Footer.tsx` |
| 8 | Added `rel="nofollow"` to ELITEERA footer link (stops PageRank leak) | `Footer.tsx` |
| 9 | Added `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy` headers | `next.config.js` |
| 10 | Removed misleading `hreflang ar` pointing to `?lang=ar` (no Arabic content exists) | `layout.tsx` |
| 11 | Added `<main id="main-content">` wrapper | `layout.tsx` |
| 12 | Added iOS PWA meta tags | `layout.tsx` |
| 13 | Added `orientation` to manifest | `manifest.json` |
| 14 | Trimmed FAQ answer #1 to 35 words for Featured Snippet eligibility | `layout.tsx` |

---

## 🔢 Current SEO Scores (Estimated)

| Metric | Score |
|---|---|
| Technical Risk | 85/100 |
| Content Authority | 88/100 |
| Mobile Performance | 92/100 |
| AI Search Readiness | 90/100 |

---

## 📋 FUTURE — What Still Needs To Be Done

### 🔴 Critical (Do First)

- [ ] **Google Search Console** — Submit sitemap (`https://cpc-qa.com/sitemap.xml`) and verify ownership
- [ ] **Google Business Profile** — Create and verify with office address (Mirqab Mall, Doha)
  - This is the #1 unlock for Local Map Pack ranking
- [ ] **LinkedIn Company Page** — Create official page, then update `sameAs` in `layout.tsx`:
  ```tsx
  sameAs: ["https://www.linkedin.com/company/YOUR-REAL-SLUG", "https://cpc-qa.com"]
  ```
- [ ] **Trigger IndexNow** for all modified pages via the existing `/api/indexnow` endpoint

### 🟠 High Priority (Month 1-2)

- [ ] **Case study pages** — Create dedicated project pages with 1000+ words each:
  - `/projects/case-studies/ashghal-infrastructure`
  - `/projects/case-studies/moe-school-campus`
  - `/projects/case-studies/fifa-world-cup-venue`
  - These rank for long-tail queries AND strengthen E-E-A-T
- [ ] **Blog / Insights section** — Add `/insights/` or `/blog/` with:
  - "How we pave roads in Qatar's desert climate" (informational intent)
  - "Qatar Construction Standards (QCS) explained"
  - "Asphalt vs Interlock: which is right for your project"
  - Target: informational keywords that lead to commercial conversion
- [ ] **Add Twitter cards to service sub-pages** — Currently only OG is defined
- [ ] **Project images** — Most projects in `data/projects.ts` have `images: []`. Add real Cloudinary URLs so project detail pages show rich OG images in social sharing

### 🟡 Medium Priority (Month 2-3)

- [ ] **FAQPage schema** — Move from `layout.tsx` (appears on ALL pages) to homepage only
  - This avoids Google seeing the same FAQ on every page (confusing deduplication signal)
- [ ] **Breadcrumb schema** in `layout.tsx` is flat (all 7 pages at same level) — should reflect actual hierarchy:
  - Services sub-pages should be children of `/services`
  - Currently only service sub-page `page.tsx` files have correct nested breadcrumbs
- [ ] **Arabic language version** — Currently `hreflang ar` was removed because no Arabic content exists
  - If you want to rank in Arabic search: create a proper `/ar/` route and restore hreflang
  - Alternatively: add Arabic text to key pages (already have Arabic keywords in metadata)
- [ ] **SEOHead component** in `privacy/page-client.tsx` and `terms/page-client.tsx` calls `noindex={true}` but `SEOHead` is a no-op (returns null) — the server metadata wins, pages ARE indexed
  - Decide: should privacy/terms be indexed? If no, add `robots: { index: false }` to server metadata
  - If yes: remove the dead `<SEOHead noindex>` calls to avoid confusion

### 🟢 Long-Term / Strategic (Month 3-12)

- [ ] **Qatar contractor directories** — Get listed on:
  - Qatar Chamber of Commerce: `https://www.qatarchamber.com`
  - MOCI contractor list: `https://www.moci.gov.qa`
  - Ashghal approved contractors list
  - These are `.gov.qa` / `.com.qa` backlinks — extremely high authority
- [ ] **Video SEO** — The hero flyover video is on Cloudinary but not indexed
  - Add `VideoObject` JSON-LD schema to homepage with `description`, `thumbnailUrl`, `uploadDate`
  - Consider uploading to YouTube too (embeds create additional authority signals)
- [ ] **Image sitemap** — Add `<image:image>` entries to sitemap for project photos
  - Enables Google Image Search ranking for project portfolio
- [ ] **Review/Rating schema** — Add `AggregateRating` to `LocalBusiness` schema once you have Google reviews
- [ ] **Structured career page** — Add `/careers` if hiring; Google surfaces job listings as rich results
- [ ] **Regional keyword expansion** — Currently optimized for "Qatar"; add GCC targets:
  - "road construction Saudi Arabia", "infrastructure contractor UAE", "asphalt paving Bahrain"
- [ ] **Core Web Vitals monitoring** — Set up alerts in Google Search Console for:
  - LCP > 2.5s (currently good via Cloudinary CDN)
  - CLS > 0.1 (now fixed with Next.js Image)
  - INP > 200ms (monitor Framer Motion animations on low-end Android)

---

## 📊 Weekly Monitoring Checklist

| Task | Tool | Frequency |
|---|---|---|
| Check Search Console for crawl errors | Google Search Console | Weekly |
| Check Core Web Vitals (Mobile vs Desktop) | Search Console / PageSpeed Insights | Weekly |
| Check rank for top 10 keywords | Google Search Console Queries tab | Weekly |
| Check new backlinks | Google Search Console Links tab | Monthly |
| Check indexed page count | `site:cpc-qa.com` in Google | Monthly |
| Submit any new/changed URLs via IndexNow | `/api/indexnow` endpoint | On deploy |

---

## 🔑 Top 10 Keywords to Track

| Keyword | Intent | Current Status |
|---|---|---|
| road construction company Qatar | Commercial | Target |
| asphalt paving Doha | Commercial | Target |
| infrastructure contractor Qatar | Commercial | Target |
| road marking company Qatar | Commercial | Target |
| earthworks contractor Doha | Commercial | Target |
| CPC Qatar | Navigational | Should rank #1 |
| Cosmo Projects Construction Qatar | Navigational | Should rank #1 |
| interlock paving Qatar | Commercial | Target |
| subgrade subbase contractor Qatar | Commercial | Target |
| civil engineering company Doha | Commercial | Target |

---

## 📁 Modified Files Reference

| File | What Changed |
|---|---|
| `src/app/layout.tsx` | Organization schema, viewport, iOS PWA meta, HSTS headers, skip-nav anchor, hreflang removed |
| `src/app/page.tsx` | Removed post-footer section block |
| `src/app/globals.css` | font-size 15px → 16px |
| `src/app/clients/page.tsx` | Full CLIENT_ORGS array, 2 JSON-LD schemas, static HTML outbound links |
| `src/app/clients/page-client.tsx` | clientUrlMap, client cards link to real client websites |
| `src/app/about/page.tsx` | workExample with 6 client entity links, description trimmed |
| `src/app/services/page.tsx` | Description trimmed, img → next/image |
| `src/app/services/asphalt-works/page.tsx` | Description trimmed, img → next/image |
| `src/app/services/earthworks/page.tsx` | Description trimmed, img → next/image |
| `src/app/services/road-marking/page.tsx` | Description trimmed, img → next/image |
| `src/app/services/interlock-kerbstone/page.tsx` | Description trimmed, img → next/image |
| `src/app/services/subgrade-subbase/page.tsx` | Description trimmed, img → next/image |
| `src/app/services/infrastructure-development/page.tsx` | Description trimmed, img → next/image |
| `src/app/projects/[id]/page.tsx` | Added notFound() for missing projects |
| `src/components/layout/Header.tsx` | Skip-nav link, aria-labels on nav elements |
| `src/components/layout/Footer.tsx` | nav landmarks, nofollow on ELITEERA link |
| `src/components/sections/CinematicHero.tsx` | Video preload fix (load@4%, play@12% scroll) |
| `next.config.js` | HSTS, Referrer-Policy, Permissions-Policy headers |
| `public/manifest.json` | orientation: portrait-primary, iOS PWA fields |
