# CPC Qatar: Vite → Next.js Migration Report

## Build Status: ✅ SUCCESS
- **Next.js 14.2.35** — App Router
- **22 routes** compiled (19 static + 3 dynamic)
- **Zero TypeScript errors**, zero webpack errors
- `robots.txt` and `sitemap.xml` auto-generated

---

## Route Parity

| Original Route (React Router) | Next.js App Route | Status |
|---|---|---|
| `/` | `app/page.tsx` | ✅ |
| `/about` | `app/about/page.tsx` | ✅ |
| `/projects` | `app/projects/page.tsx` | ✅ |
| `/projects/:id` | `app/projects/[id]/page.tsx` | ✅ Dynamic |
| `/clients` | `app/clients/page.tsx` | ✅ |
| `/contact` | `app/contact/page.tsx` | ✅ |
| `/terms` | `app/terms/page.tsx` | ✅ |
| `/privacy` | `app/privacy/page.tsx` | ✅ |
| `/certificates` | `app/certificates/page.tsx` | ✅ |
| `/admin/login` | `app/admin/login/page.tsx` | ✅ |
| `/admin` | `app/admin/(protected)/page.tsx` | ✅ |
| `/admin/dashboard` | `app/admin/(protected)/dashboard/page.tsx` | ✅ |
| `/admin/projects` | `app/admin/(protected)/projects/page.tsx` | ✅ |
| `/admin/projects/new` | `app/admin/(protected)/projects/new/page.tsx` | ✅ |
| `/admin/projects/:id` | `app/admin/(protected)/projects/[id]/page.tsx` | ✅ Dynamic |
| `/admin/projects/:id/edit` | `app/admin/(protected)/projects/[id]/edit/page.tsx` | ✅ Dynamic |
| `/admin/messages` | `app/admin/(protected)/messages/page.tsx` | ✅ |
| `/admin/messages/:id` | `app/admin/(protected)/messages/[id]/page.tsx` | ✅ Dynamic |
| `/admin/clients` | `app/admin/(protected)/clients/page.tsx` | ✅ |
| `/admin/testimonials` | `app/admin/(protected)/testimonials/page.tsx` | ✅ |
| `/admin/settings` | `app/admin/(protected)/settings/page.tsx` | ✅ |
| `*` (404) | `app/not-found.tsx` | ✅ |

**Total: 22/22 routes migrated**

---

## File Parity

| Category | Original | Migrated | Notes |
|---|---|---|---|
| Components (TSX) | 90 | 91 | +1 for SEOHead no-op |
| Hooks | 7 | 7 | 1:1 |
| Lib utilities | 2 | 3 | +1 for router-compat.tsx |
| Pages (SPA) | 20 | — | Replaced by App Router |
| App routes | — | 21 | page.tsx + page-client.tsx pairs |
| i18n | 4 | 4 | 1:1 (config + LanguageContext + 2 locales) |
| Public assets | 51+ images, 4 PDFs | 51+ images, 4 PDFs | 1:1 |

---

## SEO Improvements (Server-Side)

| Feature | Before (Vite SPA) | After (Next.js) |
|---|---|---|
| **Title/Meta** | Client-side via react-helmet-async (invisible to crawlers on first load) | Server-side via Next.js Metadata API |
| **Structured Data** | Injected client-side | Inlined in `<head>` at SSR time (layout.tsx) |
| **robots.txt** | Static file | Dynamic via `app/robots.ts` |
| **sitemap.xml** | Static file | Dynamic via `app/sitemap.ts` |
| **HTML `<head>`** | Empty until JS hydrates | Pre-populated with all SEO metadata |
| **Admin pages** | No noindex | `robots: { index: false, follow: false }` |

### Structured Data in layout.tsx:
- `Organization` (CPC Qatar)
- `GeneralContractor` / `LocalBusiness`
- `WebSite` with `SearchAction`
- `BreadcrumbList` (Home → About → Projects → Contact)
- `FAQPage` (6 questions)

---

## Architecture Changes

### What Changed (Infrastructure Only):
1. **Bundler**: Vite → Next.js built-in webpack
2. **Routing**: React Router DOM → Next.js App Router (via compatibility layer)
3. **SEO**: react-helmet-async → Next.js Metadata API
4. **Assets**: `src/assets/` imports → `public/assets/` static serving
5. **PDFs**: `src/cert/` imports → `public/cert/` static serving
6. **Env vars**: `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*`
7. **Auth protection**: Per-route `<ProtectedRoute>` → `(protected)` route group layout
8. **404 page**: React Router catch-all → Next.js `not-found.tsx`

### What Did NOT Change (Pixel-Perfect Preservation):
- ❌ **Zero CSS changes** — all styles, variables, keyframes, utilities identical
- ❌ **Zero animation changes** — Framer Motion, GSAP, Lenis, AOS, react-spring all preserved
- ❌ **Zero component markup changes** — all JSX structure identical
- ❌ **Zero design token changes** — colors, typography, spacing untouched
- ❌ **Zero motion timing changes** — all transitions/durations preserved
- ❌ **Zero layout changes** — grid, flex, positioning untouched

### Key Compatibility Layer: `src/lib/router-compat.tsx`
Maps react-router-dom APIs to Next.js equivalents:
- `<Link to="...">` → `<NextLink href="...">`
- `<NavLink>` with isActive callback → pathname-based active detection
- `useNavigate()` → `useRouter().push/replace/back`
- `useLocation()` → `usePathname() + useSearchParams()`
- `useParams()` → Next.js `useParams()`
- `useSearchParams()` → compatible tuple wrapper
- `<Navigate>` → imperative redirect via `useRouter`
- `<BrowserRouter>`, `<Routes>`, `<Route>` → no-op stubs

---

## Build Warnings (Expected)

- **"deopted into client-side rendering"** — Expected for all pages because `useLocation()` calls `useSearchParams()` in the router-compat layer. Since all page components are `"use client"`, this is correct behavior.
- **`missingSuspenseWithCSRBailout: false`** — Set in `next.config.js` to allow `useSearchParams()` without explicit Suspense boundaries (needed for router-compat layer).

---

## How to Run

```bash
cd frontend-next

# Development
npm run dev

# Production build
npm run build

# Serve production
npm start
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=https://cpc-qa.com
```
