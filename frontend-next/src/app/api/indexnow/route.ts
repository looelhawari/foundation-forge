import { NextResponse } from "next/server";

const INDEXNOW_KEY = "955097555d9a45178ef4df97f98337cb";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cpc-qa.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const HOST = new URL(SITE_URL).hostname; // e.g. "cpc-qa.com"

/**
 * POST /api/indexnow — submits all site URLs to IndexNow (Bing, Yandex, etc.)
 * Protected by a simple bearer token check (use the IndexNow key itself).
 */
export async function POST(request: Request) {
    // Simple auth: require Authorization: Bearer <key>
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${INDEXNOW_KEY}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const urls = await gatherAllUrls();

        // Submit to IndexNow API
        const response = await fetch("https://api.indexnow.org/IndexNow", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                host: HOST,
                key: INDEXNOW_KEY,
                keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
                urlList: urls,
            }),
        });

        const status = response.status;
        const text = await response.text().catch(() => "");

        return NextResponse.json({
            success: status === 200 || status === 202,
            indexnowStatus: status,
            indexnowResponse: text || "OK",
            urlsSubmitted: urls.length,
            urls,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to submit to IndexNow" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/indexnow — returns the list of URLs that would be submitted (dry run)
 */
export async function GET() {
    try {
        const urls = await gatherAllUrls();
        return NextResponse.json({ count: urls.length, urls });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function gatherAllUrls(): Promise<string[]> {
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

    // Fetch all project slugs from the API
    const projectUrls: string[] = [];
    try {
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const res = await fetch(`${API_URL}/projects?limit=100&page=${page}`, {
                cache: "no-store",
            });
            if (!res.ok) break;
            const json = await res.json();
            const projects = json.data?.projects || json.projects || [];
            for (const p of projects) {
                projectUrls.push(`${SITE_URL}/projects/${p.slug || p.id}`);
            }
            const pagination = json.data?.pagination;
            hasMore = pagination?.hasNextPage === true;
            page++;
        }
    } catch {
        // API unavailable — submit only static pages
    }

    return [...staticUrls, ...projectUrls];
}
