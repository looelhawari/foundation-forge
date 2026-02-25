/**
 * IndexNow Bulk URL Submission Script
 * 
 * Submits all site URLs to IndexNow for instant indexing by Bing, Yandex, etc.
 * 
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs --dry-run
 */

const INDEXNOW_KEY = "955097555d9a45178ef4df97f98337cb";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cpc-qa.com/api";
const HOST = new URL(SITE_URL).hostname;

const isDryRun = process.argv.includes("--dry-run");

async function gatherAllUrls() {
    const staticUrls = [
        SITE_URL,
        `${SITE_URL}/about`,
        `${SITE_URL}/projects`,
        `${SITE_URL}/clients`,
        `${SITE_URL}/contact`,
        `${SITE_URL}/certificates`,
        `${SITE_URL}/terms`,
        `${SITE_URL}/privacy`,
    ];

    const projectUrls = [];
    try {
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const res = await fetch(`${API_URL}/projects?limit=100&page=${page}`);
            if (!res.ok) throw new Error(`API returned ${res.status}`);
            const json = await res.json();
            const projects = json.data?.projects || json.projects || [];
            for (const p of projects) {
                projectUrls.push(`${SITE_URL}/projects/${p.slug || p.id}`);
            }
            const pagination = json.data?.pagination;
            hasMore = pagination?.hasNextPage === true;
            page++;
        }
    } catch (err) {
        console.error("⚠ Could not fetch projects from API:", err.message);
    }

    return [...staticUrls, ...projectUrls];
}

async function submitToIndexNow(urls) {
    const payload = {
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
    };

    console.log(`\nSubmitting ${urls.length} URLs to IndexNow...`);
    console.log(`Host: ${HOST}`);
    console.log(`Key Location: ${payload.keyLocation}\n`);

    const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
    });

    const status = res.status;
    const body = await res.text().catch(() => "");

    if (status === 200 || status === 202) {
        console.log(`✓ Success! HTTP ${status}`);
        console.log(`  Response: ${body || "OK"}`);
    } else {
        console.error(`✗ Failed! HTTP ${status}`);
        console.error(`  Response: ${body}`);
        const reasons = {
            400: "Bad request — invalid format",
            403: "Forbidden — key not valid or not found at keyLocation",
            422: "Unprocessable Entity — URLs don't belong to host or key mismatch",
            429: "Too Many Requests — rate limited, try again later",
        };
        if (reasons[status]) console.error(`  Reason: ${reasons[status]}`);
    }
    return status;
}

async function main() {
    console.log("=== IndexNow URL Submission ===\n");

    const urls = await gatherAllUrls();
    console.log(`Gathered ${urls.length} URLs:`);
    urls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`));

    if (isDryRun) {
        console.log("\n[DRY RUN] No URLs were submitted.");
        return;
    }

    // IndexNow accepts max 10,000 URLs per request
    // Submit in batches of 500 to be safe
    const BATCH_SIZE = 500;
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        const batch = urls.slice(i, i + BATCH_SIZE);
        const status = await submitToIndexNow(batch);
        if (status === 429) {
            console.log("Rate limited. Waiting 60 seconds...");
            await new Promise((r) => setTimeout(r, 60000));
        }
    }

    console.log("\nDone!");
}

main().catch(console.error);
