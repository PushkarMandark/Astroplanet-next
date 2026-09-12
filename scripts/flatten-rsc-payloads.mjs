#!/usr/bin/env node
/**
 * Flatten Next.js static-export RSC segment payloads into the filenames the
 * client actually requests.
 *
 * Invoked via `npm run flatten-rsc` (chained into `npm run build` after
 * `next build`, before `npm run verify`). Pass --dry-run to only print the plan.
 *
 * WHY THIS EXISTS (Next.js 16.1.0, Windows-only exporter bug)
 * -------------------------------------------------------------
 * The client computes a segment payload's URL as
 *     `__next${segmentPath.replace(/\//g, '.')}.txt`
 *   (node_modules/next/dist/shared/lib/segment-cache/segment-value-encoding.js:95)
 * so `/blog/__PAGE__` becomes the FLAT file  __next.blog.__PAGE__.txt
 *
 * The exporter builds the same name from a filesystem walk
 *   (node_modules/next/dist/export/index.js ~689-695). On Windows that walk
 * yields BACKSLASH paths; the replace() above only swaps forward slashes, and
 * path.join() then treats the surviving backslashes as directories, writing
 * the NESTED file  __next.blog/__PAGE__.txt  instead.
 *
 * Result on the live site: every client-side navigation requests a file that
 * does not exist, gets the 404 page, and Next falls back to a full reload -
 * twice the latency and no transition UI. Seen in the browser console as
 *     blog/__next.blog.__PAGE__.txt  404
 *
 * On Linux/macOS the exporter already writes flat files and this script finds
 * nothing to do. Delete it once Next fixes the exporter or builds move off
 * Windows. The verify gate fails the build if any nested payload dir survives.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "out");
const DRY_RUN = process.argv.includes("--dry-run");

if (!fs.existsSync(OUT)) {
    console.error("[flatten-rsc] /out does not exist - did `next build` run?");
    process.exit(1);
}

/** Every directory under /out whose name starts with "__next." (skips /_next). */
function findNestedPayloadDirs(dir, found = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const full = path.join(dir, entry.name);
        if (entry.name === "_next") continue;
        if (entry.name.startsWith("__next.")) {
            found.push(full);
            continue; // never descend into one; its contents are what we flatten
        }
        findNestedPayloadDirs(full, found);
    }
    return found;
}

/** All files under `dir`, as paths relative to `dir` (using the OS separator). */
function filesUnder(dir, rel = "", acc = []) {
    for (const entry of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
        const r = rel ? path.join(rel, entry.name) : entry.name;
        if (entry.isDirectory()) filesUnder(dir, r, acc);
        else acc.push(r);
    }
    return acc;
}

const dirs = findNestedPayloadDirs(OUT);
let moved = 0;
let bytes = 0;
let skipped = 0;
const shapes = new Map(); // "<parent>/__next.<seg>/<rel>" -> flat name, first example per shape

for (const dir of dirs) {
    const parent = path.dirname(dir);
    const base = path.basename(dir); // e.g. "__next.blog" or "__next.product"
    for (const rel of filesUnder(dir)) {
        const src = path.join(dir, rel);
        // Exactly the client's encoding: every path separator becomes a dot.
        const flatName = base + "." + rel.split(path.sep).join(".");
        const dest = path.join(parent, flatName);

        const shapeKey = base.replace(/^__next\./, "__next.<seg>") + "/" + rel.split(path.sep).join("/").replace(/\$d\$[^/.]+/g, "$d$<param>");
        if (!shapes.has(shapeKey)) shapes.set(shapeKey, flatName.replace(/\$d\$[^.]+/g, "$d$<param>"));

        if (fs.existsSync(dest)) {
            // Should be impossible by construction (different suffixes); never clobber.
            console.warn(`[flatten-rsc] SKIP - target already exists: ${path.relative(OUT, dest)}`);
            skipped++;
            continue;
        }
        bytes += fs.statSync(src).size;
        if (!DRY_RUN) fs.renameSync(src, dest);
        moved++;
    }
    if (!DRY_RUN) fs.rmSync(dir, { recursive: true, force: true });
}

const mb = (bytes / 1048576).toFixed(1);
console.log(`[flatten-rsc] ${DRY_RUN ? "DRY RUN - would flatten" : "flattened"} ${moved} payload file(s) (${mb} MB) out of ${dirs.length} nested dir(s)${skipped ? `, ${skipped} skipped` : ""}`);
if (shapes.size) {
    console.log("[flatten-rsc] shapes handled (nested  ->  flat):");
    for (const [nested, flat] of shapes) console.log(`    ${nested}  ->  ${flat}`);
}
if (dirs.length === 0) {
    console.log("[flatten-rsc] nothing nested - exporter wrote flat files (non-Windows build or Next fixed). No-op.");
}

// Self-check: after a real run no nested payload dir may remain.
if (!DRY_RUN) {
    const remaining = findNestedPayloadDirs(OUT);
    if (remaining.length) {
        console.error(`[flatten-rsc] FAIL - ${remaining.length} nested payload dir(s) still present:`);
        for (const d of remaining.slice(0, 10)) console.error("    " + path.relative(OUT, d));
        process.exit(1);
    }
    if (skipped) {
        console.error("[flatten-rsc] FAIL - some files were skipped; see warnings above.");
        process.exit(1);
    }
    console.log("[flatten-rsc] OK - client-side navigation payloads now match what the browser requests.");
}
