import { siteConfig } from "@/config/site";
import { stripHtml } from "@/lib/sanitize";
import type { Product } from "@/types/product";
import type { BlogPost } from "@/types/blog";

/**
 * Build absolute URL using siteConfig.url as base.
 */
function absoluteUrl(path: string): string {
    if (!path) return siteConfig.url;
    if (/^https?:\/\//i.test(path)) return path;
    const base = siteConfig.url.replace(/\/+$/, "");
    const rel = path.startsWith("/") ? path : `/${path}`;
    return `${base}${rel}`;
}

/**
 * JSON-LD schema for a single Product (schema.org/Product).
 */
export function productJsonLd(product: Product) {
    const yoast = product.yoast_head_json;
    const description =
        yoast?.description ||
        stripHtml(product.short_description || product.description || "") ||
        `Buy ${product.name} from AstroEshop. Authentic Vedic astrology products.`;

    const yoastImage = yoast?.og_image?.[0]?.url;
    const productImages = (product.images || [])
        .map((img) => img?.src)
        .filter((src): src is string => Boolean(src));
    const images = yoastImage ? [yoastImage, ...productImages.filter((src) => src !== yoastImage)] : productImages;

    const availability =
        product.stock_status === "instock"
            ? "https://schema.org/InStock"
            : product.stock_status === "onbackorder"
                ? "https://schema.org/BackOrder"
                : "https://schema.org/OutOfStock";

    const productUrl = absoluteUrl(`/product/${product.slug}/`);
    const price = product.sale_price || product.price || product.regular_price || "0";

    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description,
        image: images.length > 0 ? images : undefined,
        sku: product.sku || String(product.id),
        brand: {
            "@type": "Brand",
            name: "AstroEshop",
        },
        offers: {
            "@type": "Offer",
            price,
            priceCurrency: siteConfig.currency.code,
            availability,
            url: productUrl,
        },
    };

    if (product.average_rating && Number(product.average_rating) > 0 && product.rating_count > 0) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: product.average_rating,
            reviewCount: product.rating_count,
        };
    }

    return schema;
}

/**
 * JSON-LD schema for a blog Article (schema.org/Article).
 */
export function articleJsonLd(post: BlogPost, url: string) {
    const yoast = post.yoast_head_json;
    // schema.org `headline` should match the visible page title (Google's
    // structured-data guideline, ≤110 chars). Yoast's SEO title can include
    // the site suffix and exceed that, so prefer the natural rendered title.
    const headline = stripHtml(post.title?.rendered || "");
    const description = (
        yoast?.description || stripHtml(post.excerpt?.rendered || "")
    ).slice(0, 200);
    const featuredImage =
        yoast?.og_image?.[0]?.url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "";
    const authorName = post._embedded?.author?.[0]?.name || "AstroEshop";

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description: description || undefined,
        image: featuredImage ? [featuredImage] : undefined,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: {
            "@type": "Person",
            name: authorName,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/images/logo.webp"),
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(url),
        },
    };
}

/**
 * JSON-LD schema for the global Organization (schema.org/Organization).
 */
export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl("/images/logo.webp"),
        contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Plot No. 845, Udyog Vihar, Phase 5",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            postalCode: "122016",
            addressCountry: "IN",
        },
        sameAs: [
            siteConfig.social.facebook,
            siteConfig.social.instagram,
            siteConfig.social.twitter,
            siteConfig.social.youtube,
        ],
    };
}

/**
 * JSON-LD schema for an FAQ block (schema.org/FAQPage).
 * Pass an array of {question, answer} pairs (answer can be plain text or simple HTML).
 */
export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

/**
 * JSON-LD schema for a breadcrumb trail (schema.org/BreadcrumbList).
 */
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.url),
        })),
    };
}
