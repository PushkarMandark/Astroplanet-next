#!/usr/bin/env node
/**
 * Post-build gate: fail the build instead of shipping broken static HTML.
 *
 * Under `output: "export"` a failed build-time API fetch does not fail the
 * build — it renders. `getProductBySlug` returning null makes the page call
 * notFound(), so Next writes the styled 404 page into
 * out/product/<slug>/index.html and exits 0. An empty listing fetch renders
 * "No products found." the same silent way. A build once shipped 47 of 96
 * product pages as 404s (plus an empty homepage) with a green build log.
 *
 * This script re-reads what was actually written to /out and refuses builds
 * where a content route came out as a 404 or an empty listing.
 *
 * Invoked via `npm run verify` (chained into `npm run build`).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");

// Routes that are SUPPOSED to render the not-found page.
const INTENDED_404 = new Set(["404.html", "404/index.html", "_not-found/index.html"]);

// Marker that the not-found page was rendered. Sourced from the <title> the
// root not-found.tsx sets, so it survives copy changes to the visible body.
const NOT_FOUND_MARKER = "<title>Page Not Found | AstroEshop</title>";

// Empty-listing markers rendered when a listing fetch returns [].
const EMPTY_MARKERS = ["No products found.", "No Blog Posts Found"];

// Routes where an empty listing is never legitimate. A category page with zero
// published products is a real state (categories are fetched hide_empty=false),
// so those only warn.
const MUST_NOT_BE_EMPTY = new Set(["index.html", "shop/index.html", "blog/index.html"]);

function walk(dir, found = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "_next") continue; // build assets, not pages
            walk(full, found);
        } else if (entry.name === "index.html" || entry.name === "404.html") {
            found.push(full);
        }
    }
    return found;
}

if (!fs.existsSync(OUT)) {
    console.error("[verify-build] /out does not exist — did `next build` run?");
    process.exit(1);
}

const pages = walk(OUT);
const unexpected404 = [];
const unexpectedEmpty = [];
const emptyWarnings = [];

for (const file of pages) {
    const route = path.relative(OUT, file).split(path.sep).join("/");
    if (INTENDED_404.has(route)) continue;

    const html = fs.readFileSync(file, "utf8");

    if (html.includes(NOT_FOUND_MARKER)) {
        unexpected404.push(route);
        continue; // a 404 page also has no listings; don't double-report
    }

    const marker = EMPTY_MARKERS.find((m) => html.includes(m));
    if (marker) {
        const target = MUST_NOT_BE_EMPTY.has(route) ? unexpectedEmpty : emptyWarnings;
        target.push(`${route}  (${marker})`);
    }
}

console.log(`[verify-build] scanned ${pages.length} rendered pages in /out`);

if (emptyWarnings.length) {
    console.warn(`\n[verify-build] WARN — ${emptyWarnings.length} page(s) rendered an empty listing:`);
    for (const r of emptyWarnings) console.warn(`  - ${r}`);
    console.warn("  (legitimate for a category with no published products)");
}

const failed = unexpected404.length + unexpectedEmpty.length;

if (unexpected404.length) {
    console.error(`\n[verify-build] FAIL — ${unexpected404.length} content route(s) rendered the 404 page:`);
    for (const r of unexpected404) console.error(`  - ${r}`);
    console.error("\n  These slugs came from generateStaticParams, so the content exists.");
    console.error("  The per-page fetch failed at build time and notFound() ran instead.");
}

if (unexpectedEmpty.length) {
    console.error(`\n[verify-build] FAIL — ${unexpectedEmpty.length} critical route(s) rendered an empty listing:`);
    for (const r of unexpectedEmpty) console.error(`  - ${r}`);
}

if (failed) {
    console.error(`\n[verify-build] ${failed} broken page(s). Re-run the build — do NOT deploy /out.`);
    process.exit(1);
}

console.log("[verify-build] OK — no 404s or empty listings on content routes.");
