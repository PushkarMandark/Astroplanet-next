#!/usr/bin/env node
/**
 * Auto-generate /public/sitemap.xml at build time.
 *
 * Fetches product, blog post, and product-category slugs from the WordPress
 * + WooCommerce backend and writes a static sitemap.xml. Falls back to static
 * routes only on any fetch failure — never blocks the build.
 *
 * Invoked via `npm run sitemap` (chained into `npm run build`). Uses pure Node
 * fetch (>=18). Reads env from `.env.local` if present.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// --- Tiny .env.local loader (no dotenv dep) ----------------------------------
function loadEnvLocal() {
    const envPath = path.join(ROOT, ".env.local");
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
        ) {
            val = val.slice(1, -1);
        }
        if (process.env[key] === undefined) process.env[key] = val;
    }
}
loadEnvLocal();

// --- Config ------------------------------------------------------------------
const PRODUCTION_URL = "https://www.astroeshop.com";
let envSiteUrl = (process.env.SITEMAP_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL).replace(/\/$/, "");
if (/localhost|127\.0\.0\.1/.test(envSiteUrl)) {
    console.warn(`[sitemap] Ignoring local URL "${envSiteUrl}" — using ${PRODUCTION_URL} for crawlable sitemap.`);
    envSiteUrl = PRODUCTION_URL;
}
const SITE_URL = (
    envSiteUrl || PRODUCTION_URL
).replace(/\/$/, "");
const WP_URL = (
    process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com"
).replace(/\/$/, "");
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";

const STATIC_ROUTES = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/shop/", changefreq: "daily", priority: "0.9" },
    { path: "/blog/", changefreq: "daily", priority: "0.8" },
    { path: "/services/", changefreq: "weekly", priority: "0.8" },
    { path: "/contact/", changefreq: "monthly", priority: "0.5" },
    { path: "/free-horoscope/", changefreq: "daily", priority: "0.7" },
    { path: "/panchang/", changefreq: "daily", priority: "0.7" },
    { path: "/free-numerology-calculator/", changefreq: "monthly", priority: "0.6" },
    { path: "/free-kundli-calculator/", changefreq: "monthly", priority: "0.6" },
    { path: "/free-match-making-calculator/", changefreq: "monthly", priority: "0.6" },
    { path: "/gemstone-recommender/", changefreq: "monthly", priority: "0.6" },
    { path: "/privacy-policy/", changefreq: "yearly", priority: "0.3" },
    { path: "/terms-of-use/", changefreq: "yearly", priority: "0.3" },
    {
        path: "/refund-cancellation-policy/",
        changefreq: "yearly",
        priority: "0.3",
    },
    { path: "/return-policy/", changefreq: "yearly", priority: "0.3" },
    { path: "/shipment-policy/", changefreq: "yearly", priority: "0.3" },
];

// --- Fetch helpers -----------------------------------------------------------
const TIMEOUT_MS = 30_000;

// This script runs immediately before `next build` and talks to the same
// rate-limited host. It deliberately mirrors the throttle + retry policy in
// src/lib/api/client.ts, which it cannot import (that is TypeScript, this is a
// plain .mjs run by node). Keep the two in sync.
//
// Without this the script fired its paged fetches unthrottled and treated a 429
// as fatal, which silently truncated the sitemap (a throttled run produced 91
// products / 369 posts instead of the real totals) AND left the limiter engaged
// for the build that starts seconds later.
const MAX_ATTEMPTS = 5;
const MIN_SPACING_MS = Number(process.env.WP_MIN_SPACING_MS ?? 250);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let lastStart = 0;
let spacingChain = Promise.resolve();
function awaitSpacing() {
    spacingChain = spacingChain.then(async () => {
        const gap = Date.now() - lastStart;
        if (gap < MIN_SPACING_MS) await sleep(MIN_SPACING_MS - gap);
        lastStart = Date.now();
    });
    return spacingChain;
}

async function fetchJson(url, headers = {}) {
    let lastErr;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        await awaitSpacing();
        try {
            const res = await fetch(url, {
                headers,
                signal: AbortSignal.timeout(TIMEOUT_MS),
            });
            if (res.ok) return res.json();
            // 429 (throttled) and 5xx (DB blip) are transient — back off and retry.
            // Any other status is a real answer and fails immediately.
            if (res.status !== 429 && res.status < 500) {
                throw new Error(`HTTP ${res.status} for ${url}`);
            }
            lastErr = new Error(`HTTP ${res.status} for ${url}`);
            const retryAfter = Number(res.headers.get("retry-after"));
            const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
                ? Math.min(retryAfter * 1000, 30_000)
                : Math.min(1000 * 2 ** attempt, 8000);
            if (attempt < MAX_ATTEMPTS - 1) {
                console.warn(`[sitemap] HTTP ${res.status} — retry ${attempt + 1}/${MAX_ATTEMPTS - 1} in ${waitMs}ms`);
                await sleep(waitMs);
                continue;
            }
        } catch (err) {
            lastErr = err;
            if (attempt < MAX_ATTEMPTS - 1 && /timeout|fetch failed|network/i.test(err.message)) {
                await sleep(Math.min(1000 * 2 ** attempt, 8000));
                continue;
            }
            throw err;
        }
    }
    throw lastErr;
}

// Promise.allSettled-shaped result for a single sequential call.
async function settle(fn) {
    try {
        return { status: "fulfilled", value: await fn() };
    } catch (reason) {
        return { status: "rejected", reason };
    }
}

function wcAuthHeader() {
    if (!WC_KEY || !WC_SECRET) return null;
    const token = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
    return { Authorization: `Basic ${token}` };
}

async function fetchAllPaged(buildUrl, headers, label) {
    const results = [];
    const PER_PAGE = 100;
    const MAX_PAGES = 50; // hard ceiling — 5000 items
    for (let page = 1; page <= MAX_PAGES; page++) {
        const url = buildUrl(page, PER_PAGE);
        let batch;
        try {
            batch = await fetchJson(url, headers);
        } catch (err) {
            // Breaking here truncates the sitemap. Say so unmistakably — a short
            // sitemap silently de-indexes real pages.
            console.warn(
                `[sitemap] TRUNCATED: ${label} page ${page} failed after retries: ${err.message}
` +
                `[sitemap] The sitemap is INCOMPLETE (${results.length} ${label} so far). ` +
                `Do not deploy it — re-run when the backend is healthy.`
            );
            break;
        }
        if (!Array.isArray(batch) || batch.length === 0) break;
        results.push(...batch);
        if (batch.length < PER_PAGE) break;
    }
    return results;
}

async function fetchProductSlugs() {
    const auth = wcAuthHeader();
    if (!auth) {
        console.warn(
            "[sitemap] WC_CONSUMER_KEY/SECRET missing — skipping products."
        );
        return [];
    }
    const items = await fetchAllPaged(
        (page, perPage) =>
            `${WP_URL}/wp-json/wc/v3/products?_fields=slug,date_modified&per_page=${perPage}&page=${page}&status=publish`,
        auth,
        "products"
    );
    return items
        .filter((p) => p && p.slug)
        .map((p) => ({
            slug: p.slug,
            modified: p.date_modified || null,
        }));
}

async function fetchCategorySlugs() {
    const auth = wcAuthHeader();
    if (!auth) {
        console.warn(
            "[sitemap] WC_CONSUMER_KEY/SECRET missing — skipping categories."
        );
        return [];
    }
    const items = await fetchAllPaged(
        (page, perPage) =>
            `${WP_URL}/wp-json/wc/v3/products/categories?_fields=slug&per_page=${perPage}&page=${page}`,
        auth,
        "categories"
    );
    return items
        .filter((c) => c && c.slug && c.slug !== "uncategorized")
        .map((c) => c.slug);
}

async function fetchPostSlugs() {
    const items = await fetchAllPaged(
        (page, perPage) =>
            `${WP_URL}/wp-json/wp/v2/posts?_fields=slug,modified&per_page=${perPage}&page=${page}&status=publish`,
        {},
        "posts"
    );
    return items
        .filter((p) => p && p.slug)
        .map((p) => ({ slug: p.slug, modified: p.modified || null }));
}

// --- XML builder -------------------------------------------------------------
function isoDate(d) {
    try {
        return (d ? new Date(d) : new Date()).toISOString().split("T")[0];
    } catch {
        return new Date().toISOString().split("T")[0];
    }
}

function escapeXml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
    return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
    ].join("\n");
}

function buildSitemap({ products, categories, posts }) {
    const today = isoDate(new Date());
    const entries = [];

    for (const r of STATIC_ROUTES) {
        entries.push(
            urlEntry({
                loc: `${SITE_URL}${r.path}`,
                lastmod: today,
                changefreq: r.changefreq,
                priority: r.priority,
            })
        );
    }

    // Sort for idempotency
    const sortedCategories = [...categories].sort();
    for (const slug of sortedCategories) {
        entries.push(
            urlEntry({
                loc: `${SITE_URL}/shop/${slug}/`,
                lastmod: today,
                changefreq: "weekly",
                priority: "0.8",
            })
        );
    }

    const sortedProducts = [...products].sort((a, b) =>
        a.slug.localeCompare(b.slug)
    );
    for (const p of sortedProducts) {
        entries.push(
            urlEntry({
                loc: `${SITE_URL}/product/${p.slug}/`,
                lastmod: isoDate(p.modified),
                changefreq: "weekly",
                priority: "0.8",
            })
        );
    }

    const sortedPosts = [...posts].sort((a, b) => a.slug.localeCompare(b.slug));
    for (const p of sortedPosts) {
        entries.push(
            urlEntry({
                loc: `${SITE_URL}/blog/${p.slug}/`,
                lastmod: isoDate(p.modified),
                changefreq: "monthly",
                priority: "0.6",
            })
        );
    }

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        entries.join("\n"),
        "</urlset>",
        "",
    ].join("\n");
}

// --- Main --------------------------------------------------------------------
async function main() {
    console.log(`[sitemap] Generating sitemap for ${SITE_URL}`);
    console.log(`[sitemap] Source: ${WP_URL}`);

    let products = [];
    let categories = [];
    let posts = [];

    // Sequential, not Promise.allSettled: three paged collectors in parallel
    // burst the rate-limited host right before `next build` starts its own
    // collection phase, and the build then begins already throttled.
    const pRes = await settle(fetchProductSlugs);
    const cRes = await settle(fetchCategorySlugs);
    const postRes = await settle(fetchPostSlugs);

    if (pRes.status === "fulfilled") {
        products = pRes.value;
        console.log(`[sitemap] Products: ${products.length}`);
    } else {
        console.warn(`[sitemap] Products failed: ${pRes.reason?.message || pRes.reason}`);
    }
    if (cRes.status === "fulfilled") {
        categories = cRes.value;
        console.log(`[sitemap] Categories: ${categories.length}`);
    } else {
        console.warn(`[sitemap] Categories failed: ${cRes.reason?.message || cRes.reason}`);
    }
    if (postRes.status === "fulfilled") {
        posts = postRes.value;
        console.log(`[sitemap] Blog posts: ${posts.length}`);
    } else {
        console.warn(`[sitemap] Posts failed: ${postRes.reason?.message || postRes.reason}`);
    }

    const xml = buildSitemap({ products, categories, posts });
    const outPath = path.join(ROOT, "public", "sitemap.xml");
    fs.writeFileSync(outPath, xml, "utf8");

    const total =
        STATIC_ROUTES.length + products.length + categories.length + posts.length;
    console.log(
        `[sitemap] Wrote ${outPath} (${total} URLs: ${STATIC_ROUTES.length} static, ${categories.length} categories, ${products.length} products, ${posts.length} posts)`
    );
}

main().catch((err) => {
    console.error("[sitemap] Fatal error, writing static-only sitemap:", err);
    try {
        const xml = buildSitemap({ products: [], categories: [], posts: [] });
        fs.writeFileSync(
            path.join(ROOT, "public", "sitemap.xml"),
            xml,
            "utf8"
        );
    } catch (writeErr) {
        console.error("[sitemap] Failed to write fallback sitemap:", writeErr);
    }
    // Never block the build
    process.exit(0);
});
