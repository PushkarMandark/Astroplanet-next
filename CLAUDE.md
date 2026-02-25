# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Static export to /out directory
npm run start    # Serve built output
npm run lint     # ESLint (eslint-config-next core-web-vitals + typescript)
```

No test suite is configured. TypeScript strict mode is enabled.

## Project Overview

**AstroEshop** is an Indian astrology e-commerce storefront targeting the Hindi/Indian market (INR, vedic content, GST number). It is a **fully static Next.js export** that fetches all data from a **WordPress + WooCommerce backend** at `https://api.astroeshop.com`.

## Static Export Constraint

`next.config.ts` sets `output: "export"`. Critical implications:

- **No API routes** — `/app/api/` cannot be used. All data fetching goes to the external WordPress REST API.
- Pages are statically generated at build time. Dynamic routes (`/product/[slug]`, `/blog/[slug]`, `/shop/[category]`) use `generateStaticParams()` to pre-render all known slugs.
- Image optimization is disabled (`unoptimized: true`).
- No server-side middleware — there is no `middleware.ts`.

## Path Alias

`@/*` → `src/*` throughout the codebase. Use this consistently.

## Shared Constants & Utilities

**`src/lib/constants.ts`** — all magic numbers live here. Always import from here, never hardcode:
- `FREE_SHIPPING_THRESHOLD = 500` (INR) — used in cart, cart-sidebar, and checkout
- `FLAT_SHIPPING_RATE = 50` (INR)
- `ALL_PRODUCTS_FETCH_LIMIT = 100` — bulk fetch limit for shop pages
- `DEFAULT_PRODUCTS_PER_PAGE = 12` — paginated display count

**`src/lib/category-icons.tsx`** — single source for the `categoryIcons` mapping (slug → Lucide icon node). Both `shop/page.tsx` and `shop/[category]/page.tsx` import from here. Do not redefine it locally.

## API Layer (`src/lib/api/`)

Two base functions in `client.ts`:
- `wcRequest<T>(endpoint, options)` — WooCommerce API with OAuth credentials (consumer key/secret from env)
- `wpRequest<T>(endpoint, options)` — WordPress REST API, no credentials
- Both apply a **10-second timeout** via `AbortSignal.timeout(10_000)`
- `WP_URL` is **exported** from `client.ts` — all other files import it from here, never redeclare it

**Standard endpoints used:**
- Products: `GET /wc/v3/products`, `/wc/v3/products/categories`
- Orders: `GET/POST /wc/v3/orders`
- Blog: `GET /wp/v2/posts`, `/wp/v2/categories`
- Auth: `POST /jwt-auth/v1/token`, `POST /jwt-auth/v1/token/validate`, `GET /wp/v2/users/me`

**Custom plugin endpoints (critical for checkout):**
- `GET /astroeshop/v1/user-address` — fetch saved billing address for logged-in user
- `POST /astroeshop/v1/create-order` — creates order AND returns a WooCommerce checkout redirect URL

The checkout flow does **not** use the standard `/wc/v3/orders` endpoint directly. It calls the custom `create-order` endpoint which returns a URL, validates the URL host against `WP_URL` before redirecting, then sends the user to WooCommerce to complete payment.

## State Management (`src/stores/`)

Four Zustand stores, three with `localStorage` persistence:

| Store | Key | Persisted |
|---|---|---|
| `auth-store.ts` | `astroplanet-auth` | Yes |
| `cart-store.ts` | `astroplanet-cart` | Yes |
| `wishlist-store.ts` | `astroplanet-wishlist` | Yes |
| `ui-store.ts` | — | No |

**Auth gate pattern:** The cart sidebar checks `isAuthenticated()` before showing the checkout button — unauthenticated users see a login prompt instead. This check is in `src/components/molecules/cart-sidebar/`.

**Checkout address prefill:** The checkout page (`src/app/checkout/page.tsx`) reads saved address from both `localStorage` and the custom `/astroeshop/v1/user-address` endpoint. The `useEffect` that performs this fetch uses an `AbortController` (cleaned up on unmount) to prevent race conditions. The auth check uses `user && token` directly — do not call `isAuthenticated()` redundantly since it already checks both.

## Images & Placeholders

**`src/components/atoms/image/index.tsx` (`OptimizedImage`)** is a **client component** (`"use client"`). It wraps Next.js `<Image>` with:
- `useState` to track the current `src`
- `onError` handler that swaps to `/images/placeholder.svg` on load failure

The fallback image is **`/images/placeholder.svg`** (exists at `public/images/placeholder.svg`). All placeholder references across the codebase use this path — never use `.jpg` variants or a bare `/placeholder.jpg` path.

## Component Architecture (`src/components/`)

Atomic design with barrel exports (`index.ts`) at each level:

- **`atoms/`** — Icon, Image, Price, ShadowCard, Spinner
- **`molecules/`** — CartItem, CartSidebar, EmptyState, NavLink, PageHeader, Pagination, ProductPrice, QuantitySelector, SearchBox, ZodiacSign
- **`organisms/`** — Header, Footer, HeroSection, ProductCard, ProductGrid, PaginatedProductGrid, PaginatedBlogGrid, ServicesSection, TestimonialsSection, ToolsSection, ExpertSection, MediaSection, CtaSection, YoutubeSection; plus `product/` sub-folder (ProductAbout, ProductImageGallery, ProductInfo, RelatedProducts)
- **`templates/`** — MainLayout, AuthLayout, AccountLayout

Import from barrel files, e.g. `import { ProductCard } from "@/components/organisms"`.

## Styling

- Tailwind CSS v4 via `@tailwindcss/postcss` (not the standard Tailwind v3 config)
- CSS variables and base styles in `src/app/globals.css`
- Design tokens defined in `src/config/site.ts` as `designTokens`:
  - Primary: `#800909` (deep maroon)
  - Secondary: `#ff5c16` (vibrant orange)
  - Accent: `#EDC43A` (gold)
  - Background: `#FFF9F0` (warm cream)
- Fonts: **Playfair Display** (headings) + **Inter** (body) via `next/font/google`, exposed as CSS variables `--font-playfair` and `--font-inter`
- shadcn/ui components in `src/components/ui/` — New York style, neutral base color, Lucide icons
- Utility: `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge)

**`globals.css` contains two named CSS component classes:**
- `.prose` — used on static policy/info pages for readable long-form text
- `.blog-content` — used on blog post pages for article typography (drop cap, custom bullets, heading borders, etc.)

**Do NOT use `<style jsx>` or `<style jsx global>` in any component.** This is styled-jsx syntax; TypeScript in the App Router does not recognize `jsx`/`global` as valid `<style>` attributes, causing a compile error that silently breaks `generateStaticParams` detection during `output: export` builds. Always add global or component-scoped styles to `globals.css` instead.

## Site & Navigation Config (`src/config/`)

- `site.ts` exports `siteConfig` (name, URLs, contact, social, business/GST, currency ₹ INR) and `designTokens`
- `navigation.ts` exports nav structure consumed by Header and Footer organisms
- Business entity: **AVIS TRADERS**, GST: `06BNGPK0966D1Z6`, location: Gurugram

## Key Type Definitions (`src/types/`)

- `product.ts` — `Product`, `CartItem`, `ProductCategory`, `ProductImage`, `ProductListParams`
- `order.ts` — `Order`, `OrderStatus`, `OrderLineItem`, `CreateOrderData`, `CreateOrderResponse`
- `user.ts` — `User`, `AuthCredentials`, `RegisterData`, `BillingAddress`, `AuthResponse`
- `blog.ts` — `BlogPost`, `BlogCategory`, `HoroscopeSign`, plus `zodiacSigns[]` array (all 12 signs with symbols, elements, Hindi names, date ranges)

## Page Patterns

**Product pages** (`/product/[slug]`): Server component calls `getAllProducts()` for `generateStaticParams()`, then `getProductBySlug()` for data. Renders a client component `ProductDetailClient` for interactive features (add to cart, gallery).

**Shop page** (`/shop`, `/shop/[category]`): Client-side filtering with category pills at top and hierarchical sidebar. Uses `PaginatedProductGrid` (12 items/page). Category tree is built via `buildCategoryTree()` from `src/lib/api/products.ts`.

**Blog pages** (`/blog/[slug]`): Same static generation pattern. Uses embedded media (`_embedded['wp:featuredmedia']`) for featured images.

**Free tools** (`/horoscope`, `/panchang`, `/numerology`): Fully client-side, no API calls — use the `zodiacSigns` data from `src/types/blog.ts`.

**Checkout flow:** Validate form (React Hook Form + Zod) → POST to `/astroeshop/v1/create-order` → validate redirect URL host matches `WP_URL` → `window.location.href` to WooCommerce payment page. Free shipping threshold: `FREE_SHIPPING_THRESHOLD` from `src/lib/constants.ts` (currently ₹500).

**Checkout form validation rules:**
- `phone` — regex `/^[6-9]\d{9}$/` (Indian mobile numbers only)
- `postcode` — regex `/^\d{6}$/` (6-digit Indian PIN code)

**Password change validation** (`account/page.tsx`) — requires min 8 chars, at least one uppercase letter, and at least one number.

**Pagination** (`src/components/molecules/pagination/`) — uses a `Set` for O(1) page deduplication, inserts ellipsis based on gaps in the sorted page array. Active page has `aria-current="page"`; ellipsis has `aria-label="More pages"`.

**Orders page** (`src/app/orders/page.tsx`) — uses `FilteredOrders` component to filter once per tab (avoids double `.filter()` calls). Currently renders `mockOrders = []` as a placeholder until WooCommerce API is wired in.

## Environment Variables

Required in `.env.local` (see `env.example`):

```
NEXT_PUBLIC_SITE_URL        # e.g. http://localhost:3000
NEXT_PUBLIC_WP_URL          # WordPress backend root (https://api.astroeshop.com)
WP_API_BASE                 # https://api.astroeshop.com/wp-json
WC_CONSUMER_KEY             # WooCommerce OAuth key (server-side only)
WC_CONSUMER_SECRET          # WooCommerce OAuth secret (server-side only)
JWT_SECRET_KEY              # JWT signing secret
NEXT_PUBLIC_DEBUG           # "false" in production
```

`WC_CONSUMER_KEY` and `WC_CONSUMER_SECRET` must not be exposed to the client (`NEXT_PUBLIC_` prefix absent). Since this is a static export, these values are embedded at build time — avoid logging them.
