import DOMPurify from "dompurify";

// The WordPress backend now lives on api.astroeshop.com, but older posts (authored
// before the site went headless) hardcode inline media URLs pointing at the public
// front-end host — https://www.astroeshop.com/wp-content/... (or bare
// astroeshop.com / http://). That host is now the STATIC Next.js site, which has no
// /wp-content directory, so every such image 404s. Rewrite legacy front-end media
// URLs to the backend media host and upgrade http→https (mixed-content safe).
const MEDIA_HOST = (process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com").replace(/\/+$/, "");
// Matches the front-end host only (www. / bare astroeshop.com). The backend host
// api.astroeshop.com is intentionally NOT matched: after "://" it reads "api.",
// which fails the "astroeshop.com" anchor — so working URLs are left untouched.
const LEGACY_MEDIA_URL_RE = /https?:\/\/(?:www\.)?astroeshop\.com\/wp-content\//gi;

/**
 * Rewrite legacy WordPress front-end media URLs to the backend media host.
 * Pure string op (no `window`) so it runs at build time and the exported static
 * HTML ships correct <img> src/srcset values — not just after client hydration.
 */
export function rewriteWpMediaUrls(html: string): string {
    if (!html) return html;
    return html.replace(LEGACY_MEDIA_URL_RE, `${MEDIA_HOST}/wp-content/`);
}

/**
 * Sanitize HTML content from external sources (WordPress, WooCommerce).
 * Strips dangerous tags/attributes while preserving safe formatting, and rewrites
 * legacy media URLs so inline images resolve.
 */
export function sanitizeHtml(dirty: string): string {
    const rewritten = rewriteWpMediaUrls(dirty);
    // DOMPurify needs a DOM, so on the server / at build time we skip it (WordPress
    // already controls this markup) but STILL apply the URL rewrite above so the
    // static export has working image URLs.
    if (typeof window === "undefined") return rewritten;
    return DOMPurify.sanitize(rewritten, {
        USE_PROFILES: { html: true },
        FORBID_TAGS: ["script", "iframe", "object", "embed", "form"],
        FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
    });
}

/**
 * Extract plain text from HTML string. Use for titles and short text
 * where HTML rendering is not needed.
 */
export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}
