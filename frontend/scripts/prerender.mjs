/**
 * CPC Qatar — SEO Pre-Rendering Script
 * 
 * Generates static HTML for every public route after Vite builds the SPA.
 * This gives Google, Facebook, Twitter, and LinkedIn crawlers REAL HTML
 * with per-page <title>, <meta description>, OG tags, and structured data.
 * 
 * Approach:
 *  1. Serve the dist/ folder on localhost
 *  2. Visit each route with Puppeteer (headless Chrome)
 *  3. Wait for React + Helmet to render
 *  4. Extract the full HTML (with injected <head> meta)
 *  5. Write it back to dist/ as static .html files
 * 
 * Usage: node scripts/prerender.mjs
 * Or:    npm run build  (configured to run automatically after vite build)
 */

import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

// ═══════════════════════════════════════════════════════
// ROUTES TO PRE-RENDER
// All public-facing pages that should be indexed by Google
// ═══════════════════════════════════════════════════════
const ROUTES = [
    '/',
    '/about',
    '/projects',
    '/clients',
    '/contact',
    '/certificates',
    '/privacy',
    '/terms',
];

// Per-route SEO meta — fallback if Helmet doesn't inject
// (Helmet WILL inject, but this is defense-in-depth)
const ROUTE_META = {
    '/': {
        title: 'CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar',
        description: 'CPC Qatar (Cosmo Projects & Construction) — Leading road construction & infrastructure company in Doha. Asphalt paving, road marking, earthworks, interlock & subbase works. 90+ projects delivered since 2017.',
        canonical: 'https://cpc-qa.com/',
    },
    '/about': {
        title: 'About CPC Qatar | Road Construction & Civil Engineering Since 2017 | Doha',
        description: 'Learn about CPC Qatar (Cosmo Projects & Construction) — Founded in 2017 in Doha, Qatar. 90+ road & infrastructure projects delivered. Government-approved contractor CR 108122.',
        canonical: 'https://cpc-qa.com/about',
    },
    '/projects': {
        title: 'Our Projects | Road & Infrastructure Portfolio | CPC Qatar Doha',
        description: 'Explore 90+ completed road construction & infrastructure projects by CPC Qatar. School facilities, FIFA World Cup 2022, cultural heritage sites & commercial developments across Doha & Qatar.',
        canonical: 'https://cpc-qa.com/projects',
    },
    '/clients': {
        title: 'Our Clients | Government & Private Sector Partners | CPC Qatar',
        description: 'CPC Qatar proudly serves Ministry of Education, FIFA World Cup 2022, Qatar Museums, DHL & 45+ major clients. Government-approved road construction & infrastructure contractor in Doha.',
        canonical: 'https://cpc-qa.com/clients',
    },
    '/contact': {
        title: 'Contact CPC Qatar | Get a Free Quote | Road Construction Doha',
        description: 'Contact CPC Qatar for road construction & infrastructure projects. Office: Mirqab Mall, Doha. Phone: +974 4432-2743. Email: Info@ctgroups.net. Free consultation & quote.',
        canonical: 'https://cpc-qa.com/contact',
    },
    '/certificates': {
        title: 'Certificates & Legal Documents | Licensed Contractor CR 108122 | CPC Qatar',
        description: 'View CPC Qatar official certificates — Commercial Registration CR 108122, Tax Card, Establishment Card & Commercial License. Fully licensed, government-approved contractor in Doha, Qatar.',
        canonical: 'https://cpc-qa.com/certificates',
    },
    '/privacy': {
        title: 'Privacy Policy | CPC Qatar',
        description: 'Privacy policy for CPC Qatar (Cosmo Projects & Construction). How we collect, use, and protect your personal information.',
        canonical: 'https://cpc-qa.com/privacy',
    },
    '/terms': {
        title: 'Terms of Use | CPC Qatar',
        description: 'Terms and conditions for using the CPC Qatar website. Cosmo Projects & Construction and Trading W.L.L.',
        canonical: 'https://cpc-qa.com/terms',
    },
};

/**
 * Simple static file server for the dist folder
 */
function startServer() {
    return new Promise((resolve) => {
        const server = createServer((req, res) => {
            let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

            // SPA fallback: if file not found, serve index.html
            if (!existsSync(filePath)) {
                filePath = join(DIST_DIR, 'index.html');
            }

            try {
                const content = readFileSync(filePath);
                const ext = filePath.split('.').pop();
                const mimeTypes = {
                    html: 'text/html',
                    js: 'application/javascript',
                    css: 'text/css',
                    json: 'application/json',
                    png: 'image/png',
                    ico: 'image/x-icon',
                    svg: 'image/svg+xml',
                    woff2: 'font/woff2',
                    pdf: 'application/pdf',
                };
                res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
                res.end(content);
            } catch {
                res.writeHead(404);
                res.end('Not found');
            }
        });

        server.listen(PORT, () => {
            console.log(`  📡 Static server running on http://localhost:${PORT}`);
            resolve(server);
        });
    });
}

/**
 * Ensure the <head> has correct meta for this route.
 * Helmet should handle this, but if the page didn't load React fast enough,
 * we inject the correct meta as a fallback.
 */
function ensureMeta(html, route) {
    const meta = ROUTE_META[route];
    if (!meta) return html;

    // Check if Helmet already updated the title
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const currentTitle = titleMatch ? titleMatch[1] : '';

    // If title is still the default (index.html), replace it
    const defaultTitle = 'CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar';
    if (route !== '/' && currentTitle === defaultTitle) {
        html = html.replace(
            `<title>${defaultTitle}</title>`,
            `<title>${meta.title}</title>`
        );
    }

    // Ensure canonical matches the route
    if (meta.canonical) {
        html = html.replace(
            /<link rel="canonical" href="https:\/\/cpc-qa\.com\/">/,
            `<link rel="canonical" href="${meta.canonical}">`
        );
    }

    // Ensure OG url matches
    if (meta.canonical) {
        html = html.replace(
            /<meta property="og:url" content="https:\/\/cpc-qa\.com\/">/,
            `<meta property="og:url" content="${meta.canonical}">`
        );
    }

    return html;
}

/**
 * Main pre-rendering pipeline
 */
async function prerender() {
    console.log('\n🔧 CPC Qatar SEO Pre-Renderer');
    console.log('═'.repeat(50));

    // 1. Start local server
    const server = await startServer();

    // 2. Launch headless browser
    const browser = await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    console.log('  🌐 Browser launched\n');

    let successCount = 0;
    let failCount = 0;

    for (const route of ROUTES) {
        try {
            const page = await browser.newPage();

            // Block unnecessary resources for speed
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                const type = req.resourceType();
                if (['image', 'media', 'font'].includes(type)) {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            // Navigate to the route
            const url = `http://localhost:${PORT}${route}`;
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

            // Wait for React to render + Helmet to update <head>
            await page.waitForSelector('#root', { timeout: 10000 });
            await new Promise(r => setTimeout(r, 2000)); // Extra time for Helmet

            // Get the fully rendered HTML
            let html = await page.content();

            // Ensure correct meta tags for this route
            html = ensureMeta(html, route);

            // Add prerender indicator for debugging
            html = html.replace(
                '</head>',
                `  <meta name="prerender-status" content="pre-rendered">\n  <meta name="prerender-date" content="${new Date().toISOString()}">\n</head>`
            );

            // Determine output path
            let outputPath;
            if (route === '/') {
                outputPath = join(DIST_DIR, 'index.html');
            } else {
                const dir = join(DIST_DIR, route);
                if (!existsSync(dir)) {
                    mkdirSync(dir, { recursive: true });
                }
                outputPath = join(dir, 'index.html');
            }

            writeFileSync(outputPath, html, 'utf-8');

            // Extract title for logging
            const titleMatch = html.match(/<title>(.*?)<\/title>/);
            const pageTitle = titleMatch ? titleMatch[1].substring(0, 60) : 'N/A';
            console.log(`  ✅ ${route.padEnd(16)} → ${pageTitle}...`);
            successCount++;

            await page.close();
        } catch (error) {
            console.error(`  ❌ ${route.padEnd(16)} → ERROR: ${error.message}`);
            failCount++;
        }
    }

    // 3. Cleanup
    await browser.close();
    server.close();

    console.log('\n' + '═'.repeat(50));
    console.log(`  📊 Results: ${successCount} succeeded, ${failCount} failed`);
    console.log(`  📂 Output: ${DIST_DIR}`);
    console.log('  🚀 Ready for deployment!\n');
}

prerender().catch(console.error);
