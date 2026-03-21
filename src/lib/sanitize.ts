import DOMPurify from "dompurify";

/**
 * Sanitize HTML content from external sources (WordPress, WooCommerce).
 * Strips dangerous tags/attributes while preserving safe formatting.
 */
export function sanitizeHtml(dirty: string): string {
    if (typeof window === "undefined") return dirty;
    return DOMPurify.sanitize(dirty, {
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
