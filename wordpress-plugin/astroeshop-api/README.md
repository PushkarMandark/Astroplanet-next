# AstroEshop API — WordPress plugin

The REST endpoints the static storefront (`www.astroeshop.com`) depends on, served by
the WordPress/WooCommerce backend (`api.astroeshop.com`) under the `astroeshop/v1`
namespace. **This folder is the source of truth.** Never edit the plugin on the server —
change it here, commit, re-upload.

## Why this exists

The original version of these endpoints disappeared from production in September 2026
with no copy anywhere (most likely it lived in the Twenty Twenty-Five theme's
`functions.php` and a theme update overwrote it). Registration, checkout, the contact
form and address prefill all broke at once, showing only `rest_no_route` 404s. This
rewrite reproduces the exact contracts the frontend already uses and lives in git.

## Install / update

1. Build the zip from the repo root:
   ```
   python wordpress-plugin/build-zip.py
   ```
   It writes `wordpress-plugin/astroeshop-api.zip` and verifies the archive before
   printing OK. **Do not use PowerShell's `Compress-Archive` or Explorer's "Send to →
   Compressed folder"** — they can write Windows backslashes into the zip, which
   Linux reads as literal characters. WordPress then unpacks a nested mess and
   activation fails with *"Plugin file does not exist."* (This happened on the first
   deploy.) The zip is gitignored; the folder is what's versioned.
2. WordPress admin on `api.astroeshop.com` → **Plugins → Add New → Upload Plugin** →
   choose the zip → **Install Now** → **Activate**.
   (Updating: deactivate + delete the old copy first, or upload and choose "Replace".)
3. Verify:

```bash
curl -s https://api.astroeshop.com/wp-json/astroeshop/v1/health
# → {"ok":true,"plugin":"astroeshop-api","version":"1.0.1","woocommerce":true,"inquiry_cpt":"inquiry"}
```

If `/health` returns `rest_no_route`, the plugin is not active — and every storefront
flow below is down. Check this before debugging anything else.

Requires WordPress 6.5+, PHP 8.1+, and WooCommerce active (hard dependency via the
`Requires Plugins` header — WordPress will refuse to activate it without WooCommerce).

## Endpoints

| Method | Route | Auth | Used by |
|---|---|---|---|
| `GET`  | `/health` | none | liveness probe |
| `POST` | `/register` | none | `src/lib/api/auth.ts` → `register()` |
| `POST` | `/create-order` | optional Bearer JWT | `src/lib/api/checkout.ts` → `createOrder()` |
| `POST` | `/inquiry` | none | `src/lib/api/contact.ts` → `submitInquiry()` (contact page + lead popup) |
| `GET`  | `/user-address` | **Bearer JWT required** | `src/lib/api/checkout.ts` → `getUserAddress()` |

JWT comes from the separately installed **JWT Authentication for WP-API** plugin
(`/jwt-auth/v1/token`). It sets the current WordPress user for any request carrying
`Authorization: Bearer <token>`, which is what makes `/user-address` work and what ties
a `/create-order` to a customer account when the token is sent.

CORS `Allow-Origin`/`Allow-Methods` for `https://www.astroeshop.com` come from the site's
global setup. The plugin adds exactly one thing: **`Idempotency-Key` to
`Access-Control-Allow-Headers`** for its own routes. WordPress core's allow-list doesn't
include it, so without this the browser's preflight for `/create-order` is refused and
placing an order fails with a CORS error (v1.0.0 shipped that way). If the storefront
ever sends another custom header, add it to the same `rest_pre_serve_request` hook.

### Contracts (must match the frontend exactly)

**`POST /register`** — body `{ email, username, password, first_name, last_name }`
→ `201 { success: true, message, data: { id, email, username } }`.
Errors → `4xx { code, message }`. The storefront then logs in with the same credentials.

**`POST /create-order`** — optional header `Idempotency-Key`; body
`{ items: [{ product_id, quantity }], billing: { first_name, last_name, email, phone,
address_1, city, state, postcode, country }, customer_note, return_url, cancel_url }`
→ `201 { success: true, order_id, order_key, checkout_url, total, message }`.
`checkout_url` is WooCommerce's order-pay page; the gateway (PayU) takes payment there.
The same `Idempotency-Key` twice returns the existing order (200) instead of a duplicate.
`return_url`/`cancel_url` are only honoured for allow-listed storefront hosts.

**`POST /inquiry`** — body uses the ACF field names directly:
`{ customer_name, customer_email, customer_phone, inquiry_subject, inquiry_message,
inquiry_source ("contact_form" | "lead_capture"), inquiry_service, … }`
→ `201 { success: true, message }`. Saves an **Inquiry** post with all 10 ACF fields,
emails the shop (Reply-To set to the customer), and sends contact-form senders an
acknowledgement. Optional `website` field is a honeypot — non-empty gets a fake success.

**`GET /user-address`** → `200 { billing: { first_name, last_name, email, phone,
address_1, city, state, postcode, country } }` from the WooCommerce customer record,
falling back to the WP profile name/email for brand-new accounts.

## Configuration

Every setting is a constant with a sensible default. Override any of them in
`wp-config.php` **above** the `/* That's all, stop editing! */` line:

```php
define( 'ASTROESHOP_INQUIRY_POST_TYPE', 'inquiry' );              // see "Inquiries" below
define( 'ASTROESHOP_STOREFRONT_HOSTS', 'www.astroeshop.com,astroeshop.com' );
define( 'ASTROESHOP_NOTIFY_EMAIL', 'support@astroeshop.com' );   // '' = WP admin email
define( 'ASTROESHOP_FREE_SHIPPING_THRESHOLD', 500 );             // INR
define( 'ASTROESHOP_FLAT_SHIPPING_RATE', 50 );                   // INR
```

**Shipping must stay in sync with the storefront.** The two shipping constants mirror
`FREE_SHIPPING_THRESHOLD` / `FLAT_SHIPPING_RATE` in `src/lib/constants.ts`. The customer
is shown the storefront's total; the order sent to PayU has to be the same number.
Change both places together.

## Inquiries post type

Leads are stored as posts of type `ASTROESHOP_INQUIRY_POST_TYPE` (default `inquiry`),
shown in admin under **Inquiries**, with Email / Phone / Source / Status columns. The
existing ACF field group **"Customer Inquiry"** (10 fields) renders on the edit screen
when its location rule points at this slug.

**If historical leads don't appear after activation**, the old plugin used a different
slug. Open ACF → Field Groups → *Customer Inquiry* → look at the **Location** rule
("Post Type is equal to …"). Set that slug in `wp-config.php`:

```php
define( 'ASTROESHOP_INQUIRY_POST_TYPE', 'the_old_slug' );
```

The orphaned posts are still in the database and reappear instantly.

## Anti-abuse

Public endpoints are rate-limited per IP on WordPress transients (register 5/hour,
inquiry 10/hour, create-order 20/hour) and return `429` with a friendly message. This
blunts scripted signups and spam; it is not a WAF. The IP is `REMOTE_ADDR` on purpose —
trusting `X-Forwarded-For` would let callers spoof past the limit. If the host's proxy
setup is known, override via the `astroeshop_api_client_ip` filter.

## After payment

WooCommerce's "order received" redirect is filtered so a customer who paid lands back on
the storefront's `/order-confirmation/?order_id=…&key=…` (the `return_url` stored on the
order), not on the WordPress thank-you page. Failed/cancelled payment redirects are
controlled by the PayU plugin's own settings, not by this plugin.

## Local syntax check

```powershell
C:\xampp\php\php.exe -l wordpress-plugin\astroeshop-api\astroeshop-api.php
```

Full behaviour can only be tested against a WordPress install; after uploading, hit
`/health` first, then exercise each endpoint with invalid data to see the validation
messages before trying a real submission.
