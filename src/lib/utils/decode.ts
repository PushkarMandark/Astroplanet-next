/**
 * Safely decodes HTML entities in a string.
 * This is useful for cleaning up strings from WooCommerce like "Malas &amp; Bracelets".
 */
export function decodeHtmlEntities(text: string): string {
    if (!text) return "";

    // Use a simple replacement for common entities to avoid complex regex or DOM dependency
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&lsquo;/g, "'")
        .replace(/&ndash;/g, "-")
        .replace(/&mdash;/g, "—");
}
