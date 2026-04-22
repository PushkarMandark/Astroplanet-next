# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Clears .next/ (via npx rimraf) then runs next build → /out
npm run start    # Serve built output (npx serve out)
npm run lint     # ESLint (eslint-config-next core-web-vitals + typescript)
```

No test suite is configured. TypeScript strict mode is enabled. Package manager: **npm** (package-lock.json committed).

## Project Overview

**AstroEshop** is an Indian astrology e-commerce storefront targeting the Hindi/Indian market (INR, vedic content, GST number). It is a **fully static Next.js export** that fetches all data from a **WordPress + WooCommerce backend** at `https://api.astroeshop.com`. Business entity: **AVIS TRADERS**, GST `06BNGPK0966D1Z6`, Gurugram.

## Static Export Constraint

`next.config.ts` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. Critical implications:

- **No API routes** — `/app/api/` cannot exist. All data fetching goes to the external WordPress REST API.
- Pages are statically generated at build time. Dynamic routes (`/product/[slug]`, `/blog/[slug]`, `/shop/[category]`) use `generateStaticParams()` to pre-render all known slugs.
- Image optimization is disabled (`unoptimized: true`).
- No server-side middleware — there is no `middleware.ts`.
- Non-`NEXT_PUBLIC_*` env vars (e.g. `WC_CONSUMER_KEY`) exist only at build time; they are **not** available to client bundles. This is why `wcRequest()` works in server components but would send empty credentials if called from a client component.
- **`npm run build` clears `.next/` first** via `npx rimraf`. Turbopack's incremental cache has silently failed to detect `generateStaticParams()` on dynamic routes after large refactors — always building from a clean cache prevents this. If `npm run dev` ever reports the same detection issue after a big refactor, stop and restart the dev server to clear the hot-reload cache.

**API timeout awareness:** `wpRequest`/`wcRequest` in `src/lib/api/client.ts` have a 30-second timeout. A single `getPosts({ per_page: 100, _embed: true })` against a slow WP backend can exceed it and silently return `[]` (rendering "No Blog Posts Found" into the built HTML). Always use the parallel batching helpers when fetching many items at build time: `getAllPosts(100, 25)` from `src/lib/api/blog.ts` and `getAllProducts(100, 25)` from `src/lib/api/products.ts`. They split into 4× per_page=25 parallel requests (~5s total instead of 30s+).

## Path Alias

`@/*` → `src/*` throughout the codebase. Use this consistently.

## Shared Constants & Utilities

**`src/lib/constants.ts`** — all magic numbers live here. Always import from here, never hardcode:
- `FREE_SHIPPING_THRESHOLD = 500` (INR) — used in cart, cart-sidebar, and checkout
- `FLAT_SHIPPING_RATE = 50` (INR)
- `ALL_PRODUCTS_FETCH_LIMIT = 100` — bulk fetch limit for shop pages
- `DEFAULT_PRODUCTS_PER_PAGE = 12` — paginated display count

**`src/lib/category-icons.tsx`** — single source for the `categoryIcons` mapping (slug → Lucide icon node). Both `shop/page.tsx` and `shop/[category]/page.tsx` import from here. Do not redefine it locally.

**`src/lib/utils/decode.ts`** — `decodeHtmlEntities(text)` decodes `&amp;`, `&lt;`, `&quot;`, smart quotes, dashes for WordPress-sourced strings.

**`src/lib/sanitize.ts`** — `sanitizeHtml(dirty)` (DOMPurify with script/iframe/form forbidden + event handlers stripped) and `stripHtml(html)` (regex-based plain text extraction). Use `sanitizeHtml` before any `dangerouslySetInnerHTML` with WordPress content.

**`src/lib/panchang.ts`** — `calculatePanchang(date)` returns Vedic calendar data (tithi, nakshatra, yoga, karana, sunrise/sunset, Rahu Kaal, Brahma Muhurta, etc.) via `@ishubhamx/panchangam-js`. Default location: Gurugram (28.4595°N, 77.0266°E).

**`src/lib/data/zodiac.ts`** — `zodiacSigns[]` (all 12 signs with Devanagari name, symbol, element, date range).

## Custom Hooks (`src/lib/hooks/`)

**`use-mounted.ts`** — `useMounted()` uses `useSyncExternalStore` to detect client-side hydration without triggering `react-hooks/set-state-in-effect`. Use this for hydration guards **instead of** the `useState(false) + useEffect(() => setMounted(true), [])` pattern (which is now an ESLint error). Used by: Header, CartSidebar, AccountLayout, Dashboard, Wishlist.

## API Layer (`src/lib/api/`)

Three base functions in `client.ts`:
- `wcRequest<T>(endpoint, options)` — WooCommerce API with OAuth credentials. **Server-side only** under static export (credentials are undefined on the client).
- `wpRequest<T>(endpoint, options)` — public WordPress REST API, no credentials.
- `authenticatedWpRequest<T>(endpoint, token, options)` — WordPress REST with Bearer JWT.
- All three apply a **30-second timeout** via `AbortSignal.timeout(30_000)`.
- `WP_URL` is **exported** from `client.ts` — all other files import it from here, never redeclare it.
- Also exports `formatPrice(amount)` → INR formatted string and `buildQueryString(params)`.

**Standard endpoints used:**
- Products (`products.ts`): `getProducts`, `getProduct`, `getProductBySlug`, `getFeaturedProducts`, `getSaleProducts`, `searchProducts`, `getProductsByCategory`, `getCategories`, `buildCategoryTree`
- Orders (`orders.ts`): `getOrders`, `getOrder` — both use `wcRequest`, so they are **server-only** (the `/orders` page currently renders `mockOrders = []` as a placeholder)
- Blog (`blog.ts`): `getPosts`, `getPostBySlug`, `getPostCategories`, `getRecentPosts`, `getPostSlugs` (lightweight for `generateStaticParams`), plus helpers `getFeaturedImage`, `getAuthorName`, `getPostUrl`
- Auth (`auth.ts`): `login`, `register`, `validateToken`, `getCurrentUser` — uses `/jwt-auth/v1/token*` and `/wp/v2/users/me`
- Account (`account.ts`): `updateProfile`, `changePassword`
- Horoscope (`horoscope.ts`): `getDailyHoroscope(sign)` — deterministic daily reading from a hardcoded pool

**Custom plugin endpoints (critical):**
- `POST /astroeshop/v1/register` — user registration (`auth.register()`)
- `GET /astroeshop/v1/user-address` — fetch saved billing address for logged-in user (`checkout.getUserAddress()`)
- `POST /astroeshop/v1/create-order` — creates order AND returns a WooCommerce checkout redirect URL (`checkout.createOrder()`)
- `POST /astroeshop/v1/inquiry` — contact form submission (`contact.submitInquiry()`)

The checkout flow does **not** use the standard `/wc/v3/orders` endpoint. It calls the custom `create-order` endpoint which returns a URL, validates the URL host against `WP_URL` before redirecting, then sends the user to WooCommerce to complete payment.

## State Management (`src/stores/`)

Five Zustand stores:

| Store | Persist Key | Persisted |
|---|---|---|
| `auth-store.ts` (`useAuthStore`) | `astroplanet-auth` | Yes (user, token) |
| `cart-store.ts` (`useCartStore`) | `astroplanet-cart` | Yes (items) |
| `wishlist-store.ts` (`useWishlistStore`) | `astroplanet-wishlist` | Yes (items) |
| `checkout-store.ts` (`useCheckoutStore`) | `astroplanet-checkout` | Yes (savedAddress, pendingOrder) |
| `ui-store.ts` (`useUIStore`) | — | No |
| `lead-store.ts` (`useLeadStore`) | — | No (controls `<LeadPopup>`) |

Import from barrel: `import { useAuthStore, useCartStore } from "@/stores"`.

**Auth gate pattern:** The cart sidebar checks `isAuthenticated()` before showing the checkout button — unauthenticated users see a login prompt instead. Same pattern in `AccountLayout` (redirects to `/login?redirect=<path>`).

**Checkout address prefill:** `src/app/checkout/page.tsx` reads saved address from (a) `useCheckoutStore.savedAddress`, (b) the custom `/astroeshop/v1/user-address` endpoint. The fetch uses a `cancelled` flag for unmount cleanup. The auth check uses `user && token` directly — do not call `isAuthenticated()` redundantly. The `savedAddress` dep is **intentionally excluded** from the `useEffect` array (including it would loop); this is the one accepted ESLint warning.

## Images & Placeholders

**`src/components/atoms/image/index.tsx` (`OptimizedImage`)** is a **client component** (`"use client"`). It wraps Next.js `<Image>` with:
- A `failed` boolean state (no `useState(src)` + `useEffect` sync — that pattern is an ESLint error).
- Derived `imgSrc = failed ? PLACEHOLDER : (src || PLACEHOLDER)`.
- `onError` handler that sets `failed=true`, swapping to `/images/placeholder.svg`.
- Automatic `unoptimized={isExternal}` for `http(s)://` URLs.

The fallback image is **`/images/placeholder.svg`** (exists at `public/images/placeholder.svg`). All placeholder references across the codebase use this path — never use `.jpg` variants or a bare `/placeholder.jpg` path.

## Component Architecture (`src/components/`)

Atomic design with barrel exports (`index.ts`) at most levels:

- **`atoms/`** — Icon, OptimizedImage (client, failed-state fallback), Price + DiscountBadge, ShadowCard (forwardRef), Spinner + LoadingOverlay + LoadingCard
- **`molecules/`** — CartItem, CartSidebar (auth gate, uses `useMounted`), ConsultationButton (opens `useLeadStore` popup), EmptyState, LeadPopup + LeadPopupProvider (Zod-validated lead form → `submitInquiry`), LocationSearch (calls Nominatim OSM API with 400ms debounce, India-only), NavLink, PageHeader, Pagination (Set-based dedup, smart ellipsis), ProductPrice, QuantitySelector, SearchBox (basic XSS strip), ZodiacSign
- **`organisms/`** — Header (client, `useMounted`, renders `<CartSidebar>`), Footer, HeroSection, ProductCard (uses `useCartStore` + `useWishlistStore`), ProductGrid, PaginatedProductGrid (12/page, memoized slice, scroll-on-change), PaginatedBlogGrid (generic with `renderPost` prop), ServicesSection, ToolsSection, ExpertSection (uses `ConsultationButton`), TestimonialsSection, FeaturesSection, CtaSection, MediaSection, YoutubeSection; `product/` sub-folder (ProductAbout, ProductImageGallery with auto-slide + hover zoom, ProductInfo, RelatedProducts)
- **`templates/`** — MainLayout (server, Header > Main > Footer), AuthLayout (server, centered card), AccountLayout (client, `useMounted` + auth redirect + mobile Sheet sidebar, `SidebarContent` extracted as sibling component)
- **`checkout/`** — CheckoutFormFields (RHF + Zod), OrderSummary (sticky)
- **`ui/`** — shadcn/ui New York style: accordion, avatar, badge, button, calendar, card, dialog, dropdown-menu, form, input, label, navigation-menu, popover, select, separator, sheet, sonner, tabs, textarea

Import from barrel where available: `import { ProductCard } from "@/components/organisms"`.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (not Tailwind v3). There is **no `tailwind.config.ts`** — theme is defined entirely in `src/app/globals.css` via `@theme inline`.
- Design tokens also in `src/config/site.ts` as `designTokens`:
  - Primary: `#800909` (deep maroon)
  - Secondary: `#ff5c16` (vibrant orange)
  - Accent: `#EDC43A` (gold)
  - Background: `#FFF9F0` (warm cream)
- Fonts: **Playfair Display** (headings) + **Inter** (body) via `next/font/google`, exposed as CSS variables `--font-playfair` and `--font-inter`
- Plugin: `tw-animate-css` imported for extended animation utilities
- Utility: `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge)

**`globals.css` contains two named CSS component classes:**
- `.prose` — used on static policy/info pages for readable long-form text
- `.blog-content` — used on blog post pages for article typography (drop cap, gold-star bullets, bordered headings, etc.)

**Do NOT use `<style jsx>` or `<style jsx global>` in any component.** This is styled-jsx syntax; TypeScript in the App Router does not recognize `jsx`/`global` as valid `<style>` attributes, causing a compile error that silently breaks `generateStaticParams` detection during `output: export` builds. Always add global or component-scoped styles to `globals.css` instead.

## Site & Navigation Config (`src/config/`)

- `site.ts` exports `siteConfig` (name, URLs, contact, social, business/GST, currency ₹ INR, SEO defaults, itemsPerPage=12), `designTokens`, and `servicesConfig` (6 service cards: Kundli Analysis, Match Making, Gemstone Advice, Vastu, Career, Baby Names).
- `navigation.ts` exports `navigationConfig` with `main` (Home, Shop, Services, Free Tools dropdown with 6 items, Blog, Contact) and `footer` (quickLinks, policies, freeTools).

## Validation Schemas (`src/lib/validations/`)

- `checkout.ts` — `checkoutSchema` (Zod): `firstName`/`lastName` min 1, `email` valid, `phone` regex `^[6-9]\d{9}$` (Indian mobile), `address` min 5, `city`/`state` min 2, `postcode` regex `^\d{6}$` (6-digit PIN), `notes` optional.

Inline Zod schemas also live in: login/register pages, account page (password: min 8 + uppercase + digit), numerology page, contact page, lead popup.

## Key Type Definitions (`src/types/`)

- `product.ts` — `Product` (26 fields), `CartItem`, `ProductCategory`, `ProductImage`, `ProductAttribute`, `ProductTag`, `ProductListParams`
- `order.ts` — `Order`, `OrderStatus` (union of 7 states), `OrderLineItem`, `CreateOrderData`, `CreateOrderResponse`
- `user.ts` — `User`, `AuthCredentials`, `RegisterData`, `BillingAddress`, `AuthResponse`
- `blog.ts` — `BlogPost`, `BlogCategory`, `HoroscopeSign`, `HoroscopeReading`

## Page Patterns

**Product pages** (`/product/[slug]`): Server component calls `getProducts()` with `_fields=slug` for `generateStaticParams()`, then `getProductBySlug()` for data. Related products filtered from the same category (max 4). Renders client component `ProductDetailClient` for interactive features.

**Shop page** (`/shop`, `/shop/[category]`): Server components. Sidebar uses hierarchical category tree via `buildCategoryTree()` from `src/lib/api/products.ts`. Main area uses `PaginatedProductGrid` (12 items/page).

**Blog pages** (`/blog/[slug]`): Server component, `generateStaticParams()` uses lightweight `getPostSlugs()`. Renders `BlogPostClient` with embedded media (`_embedded['wp:featuredmedia']`) for featured images. TOC extraction uses a **regex** (not `DOMParser`) because `useMemo` runs during SSR — `DOMParser` is browser-only.

**Free tools** (`/horoscope`, `/panchang`, `/numerology`, `/kundli`, `/compatibility`, `/gemstone-recommender`): Fully client-side. Kundli/compatibility/gemstone-recommender use `@ishubhamx/panchangam-js` (`getKundli`, `matchKundli`, `Observer`, `rashiNames`, `nakshatraNames`) and share the `LocationSearch` component. Numerology and horoscope are pure calculations — no API calls.

**Checkout flow:** Validate form (React Hook Form + Zod) → POST to `/astroeshop/v1/create-order` → validate redirect URL host matches `WP_URL` → save `pendingOrder` to `useCheckoutStore` → `clearCart()` → `window.location.href` to WooCommerce payment page. Free shipping threshold: `FREE_SHIPPING_THRESHOLD` from `src/lib/constants.ts` (currently ₹500).

**Post-payment:** `/order-confirmation` reads `order_id` from URL param OR from `useCheckoutStore.pendingOrder`. `/payment-failed` reads `order_id` and `message` from URL params. Both use `<Suspense>` wrappers for `useSearchParams()`.

**Auth pages:** `/login` prevents open redirects — only allows relative paths starting with `/` (and not `//`). Already-authenticated users get redirected away from login. `/register` auto-logs in on success and redirects to `/dashboard`.

**Account pages** (`/dashboard`, `/orders`, `/wishlist`, `/account`) wrap in `AccountLayout` which handles auth gate + sidebar nav. `/account` has 3 tabs (Profile, Addresses, Security). Password change: min 8 chars + 1 uppercase + 1 digit.

**Pagination** (`src/components/molecules/pagination/`): uses a `Set` for O(1) page deduplication, inserts ellipsis based on gaps in the sorted page array. Active page has `aria-current="page"`; ellipsis has `aria-label="More pages"`. Returns `null` if `totalPages <= 1`.

## Hook Patterns (lint-safe)

The ESLint `react-hooks/set-state-in-effect` rule makes several common patterns errors. Prefer:

- **Hydration guard:** `const mounted = useMounted()` (from `@/lib/hooks/use-mounted`). Do **not** write `useState(false) + useEffect(() => setMounted(true), [])`.
- **Sub-components in render:** Extract as sibling components with explicit props. See `AccountLayout`'s `SidebarContent`.
- **Derived state from props:** Use `useMemo`, not `useEffect + setState`. See `BlogPostClient` TOC extraction.
- **SSR-safety in `useMemo`:** `useMemo` runs during SSR in `"use client"` components. Do **not** use browser-only APIs (`DOMParser`, `window`, `document`) inside `useMemo`. Use regex or universal approaches.
- **`OptimizedImage` error handling:** Track a `failed` boolean + derived `imgSrc`. Do not sync the `src` prop to state via `useEffect`.

## Environment Variables

Required in `.env.local` (see `env.example`, which is committed). `.env*` files are gitignored.

```
NEXT_PUBLIC_SITE_URL        # e.g. http://localhost:3000
NEXT_PUBLIC_SITE_NAME       # AstroEshop
NEXT_PUBLIC_WP_URL          # WordPress backend root (https://api.astroeshop.com)
WP_API_BASE                 # https://api.astroeshop.com/wp-json
WC_CONSUMER_KEY             # WooCommerce OAuth key (server-side only)
WC_CONSUMER_SECRET          # WooCommerce OAuth secret (server-side only)
JWT_SECRET_KEY              # JWT signing secret
NEXT_PUBLIC_DEBUG           # "false" in production
```

`WC_CONSUMER_KEY` and `WC_CONSUMER_SECRET` must not be exposed to the client (`NEXT_PUBLIC_` prefix absent). Since this is a static export, these values are embedded at build time into server-only callers (product/order/blog API functions used in `generateStaticParams`). Never call `wcRequest()` from a client component — credentials will be undefined.

## Public Assets (`public/`)

- `robots.txt` — `Allow: /` with sitemap reference (crawlers enabled).
- `sitemap.xml` — **Static** XML sitemap (24 URLs, manually maintained). Update when adding new routes.
- `manifest.json` — PWA manifest. References `/images/icon-192.png` and `/images/icon-512.png` — these files are **not** in the repo; add before any PWA/install flow.
- `.htaccess` — Security headers (CSP, X-Frame-Options, HSTS), trailing-slash rewrites, `index.html` serving for SPA-style routing. Deployed to the Apache host alongside `/out/`.
- `/images/placeholder.svg` — fallback for `OptimizedImage` load failures.

## Deployment

Static files in `/out/` are deployed to an **Apache/PHP host** (not Vercel/Netlify). `/out/` is gitignored. `.htaccess` handles routing. No Dockerfile, no CI/CD workflows — deployment is manual.
