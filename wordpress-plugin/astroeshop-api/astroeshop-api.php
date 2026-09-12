<?php
/**
 * Plugin Name:       AstroEshop API
 * Plugin URI:        https://www.astroeshop.com
 * Description:       REST endpoints the AstroEshop static storefront depends on — register, create-order, inquiry, user-address — under the astroeshop/v1 namespace, plus the Inquiries post type that stores leads. The source of truth for this file is the astroplanet-next repo (wordpress-plugin/astroeshop-api). Do not edit it on the server.
 * Version:           1.0.1
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Requires Plugins:  woocommerce
 * Author:            AstroEshop
 * License:           GPL-2.0-or-later
 * Text Domain:       astroeshop-api
 *
 * HISTORY
 * -------
 * The original version of these endpoints vanished from production in 2026
 * (most likely written into the Twenty Twenty-Five theme's functions.php and
 * overwritten by a theme update). No copy existed anywhere, and the storefront
 * lost registration, checkout, the contact form and address prefill all at once
 * with nothing but `rest_no_route` 404s to show for it. This rewrite reproduces
 * the exact request/response contracts the Next.js frontend already codes
 * against (see src/lib/api/auth.ts, checkout.ts, contact.ts) and lives in git so
 * it can be redeployed in a minute.
 */

defined( 'ABSPATH' ) || exit;

define( 'ASTROESHOP_API_VERSION', '1.0.1' );
define( 'ASTROESHOP_API_NS', 'astroeshop/v1' );

// ---------------------------------------------------------------------------
// Configuration — every one of these can be overridden from wp-config.php by
// defining the constant before plugins load. Defaults match the storefront.
// ---------------------------------------------------------------------------

// Post type that stores leads/contact submissions. The ACF field group
// "Customer Inquiry" (10 fields) is attached to this slug. If historical leads
// were saved under a different slug, set it here and they reappear in admin.
if ( ! defined( 'ASTROESHOP_INQUIRY_POST_TYPE' ) ) {
	define( 'ASTROESHOP_INQUIRY_POST_TYPE', 'inquiry' );
}

// Hosts the storefront is allowed to hand us as return/cancel URLs after
// payment. Anything else is dropped — this is what stops an open redirect.
if ( ! defined( 'ASTROESHOP_STOREFRONT_HOSTS' ) ) {
	define( 'ASTROESHOP_STOREFRONT_HOSTS', 'www.astroeshop.com,astroeshop.com,localhost:3000' );
}

// Where inquiry notifications go. Empty string = the WordPress admin email.
if ( ! defined( 'ASTROESHOP_NOTIFY_EMAIL' ) ) {
	define( 'ASTROESHOP_NOTIFY_EMAIL', '' );
}

// Shipping rule. MUST stay in sync with src/lib/constants.ts on the storefront
// (FREE_SHIPPING_THRESHOLD / FLAT_SHIPPING_RATE) — the customer is shown the
// storefront's total, and the order sent to the payment gateway has to match it.
if ( ! defined( 'ASTROESHOP_FREE_SHIPPING_THRESHOLD' ) ) {
	define( 'ASTROESHOP_FREE_SHIPPING_THRESHOLD', 500 );
}
if ( ! defined( 'ASTROESHOP_FLAT_SHIPPING_RATE' ) ) {
	define( 'ASTROESHOP_FLAT_SHIPPING_RATE', 50 );
}

// ---------------------------------------------------------------------------
// WooCommerce: declare High-Performance Order Storage compatibility. WC 8+
// defaults to HPOS and flags any plugin that hasn't declared itself.
// ---------------------------------------------------------------------------
add_action(
	'before_woocommerce_init',
	static function (): void {
		if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
		}
	}
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a REST error. Top-level `message` is what the storefront surfaces to
 * the user (client.ts reads body.message on any non-2xx), so keep it human.
 */
function astroeshop_api_error( string $code, string $message, int $status ): WP_Error {
	return new WP_Error( $code, $message, array( 'status' => $status ) );
}

/** Pull a string out of the request body, sanitised and length-capped. */
function astroeshop_api_str( array $data, string $key, int $max = 200 ): string {
	$value = $data[ $key ] ?? '';
	if ( ! is_scalar( $value ) ) {
		return '';
	}
	$value = sanitize_text_field( (string) $value );
	return mb_substr( $value, 0, $max );
}

/** Decoded JSON body, falling back to form params so curl -d also works. */
function astroeshop_api_body( WP_REST_Request $request ): array {
	$json = $request->get_json_params();
	if ( is_array( $json ) && $json ) {
		return $json;
	}
	$params = $request->get_body_params();
	return is_array( $params ) ? $params : array();
}

/**
 * Client IP. REMOTE_ADDR on purpose: trusting X-Forwarded-For blindly lets a
 * caller spoof their way past the rate limit. Override via the filter if the
 * host's proxy setup is known and trusted.
 */
function astroeshop_api_client_ip(): string {
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( (string) $_SERVER['REMOTE_ADDR'] ) ) : '';
	return (string) apply_filters( 'astroeshop_api_client_ip', $ip );
}

/**
 * Fixed-window per-IP rate limit on a transient. Returns false once the
 * caller has exceeded $limit hits within $window seconds. Cheap, good enough
 * to blunt scripted signups/spam; not a substitute for a WAF.
 */
function astroeshop_api_rate_limit( string $bucket, int $limit, int $window ): bool {
	$ip = astroeshop_api_client_ip();
	if ( '' === $ip ) {
		return true;
	}
	$key   = 'astroeshop_rl_' . $bucket . '_' . md5( $ip );
	$count = (int) get_transient( $key );
	if ( $count >= $limit ) {
		return false;
	}
	set_transient( $key, $count + 1, $window );
	return true;
}

/** Allow-listed storefront hosts, lowercased, from the constant. */
function astroeshop_api_storefront_hosts(): array {
	$hosts = array_map( 'trim', explode( ',', strtolower( ASTROESHOP_STOREFRONT_HOSTS ) ) );
	return array_values( array_filter( $hosts ) );
}

/** True only for https(s) URLs whose host is on the storefront allow-list. */
function astroeshop_api_is_storefront_url( string $url ): bool {
	$parts = wp_parse_url( $url );
	if ( ! is_array( $parts ) || empty( $parts['host'] ) ) {
		return false;
	}
	$scheme = strtolower( (string) ( $parts['scheme'] ?? '' ) );
	if ( ! in_array( $scheme, array( 'http', 'https' ), true ) ) {
		return false;
	}
	$host = strtolower( $parts['host'] );
	if ( ! empty( $parts['port'] ) ) {
		$host .= ':' . (int) $parts['port'];
	}
	return in_array( $host, astroeshop_api_storefront_hosts(), true );
}

/** Address-book email for lead notifications. */
function astroeshop_api_notify_email(): string {
	$email = ASTROESHOP_NOTIFY_EMAIL !== '' ? ASTROESHOP_NOTIFY_EMAIL : (string) get_option( 'admin_email' );
	return (string) apply_filters( 'astroeshop_api_notify_email', $email );
}

// ---------------------------------------------------------------------------
// Inquiries post type — stores every contact-form and lead-popup submission so
// nothing is lost if an email bounces. The ACF group "Customer Inquiry" renders
// the fields on the edit screen when its location rule points at this slug.
// ---------------------------------------------------------------------------
function astroeshop_api_register_inquiry_post_type(): void {
	register_post_type(
		ASTROESHOP_INQUIRY_POST_TYPE,
		array(
			'labels'              => array(
				'name'               => 'Inquiries',
				'singular_name'      => 'Inquiry',
				'menu_name'          => 'Inquiries',
				'all_items'          => 'All Inquiries',
				'edit_item'          => 'View Inquiry',
				'search_items'       => 'Search Inquiries',
				'not_found'          => 'No inquiries yet.',
				'not_found_in_trash' => 'No inquiries in trash.',
			),
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => false, // Leads contain personal data. Admin only.
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'menu_position'       => 26,
			'menu_icon'           => 'dashicons-email-alt',
			'supports'            => array( 'title', 'editor' ),
			'capability_type'     => 'post',
			'map_meta_cap'        => true,
			'capabilities'        => array( 'create_posts' => 'do_not_allow' ), // Created by the API, not by hand.
		)
	);
}
add_action( 'init', 'astroeshop_api_register_inquiry_post_type' );

// Useful admin list columns so leads are actionable without opening each one.
add_filter(
	'manage_' . ASTROESHOP_INQUIRY_POST_TYPE . '_posts_columns',
	static function ( array $columns ): array {
		return array(
			'cb'             => $columns['cb'] ?? '<input type="checkbox" />',
			'title'          => 'Inquiry',
			'customer_email' => 'Email',
			'customer_phone' => 'Phone',
			'inquiry_source' => 'Source',
			'inquiry_status' => 'Status',
			'date'           => 'Received',
		);
	}
);
add_action(
	'manage_' . ASTROESHOP_INQUIRY_POST_TYPE . '_posts_custom_column',
	static function ( string $column, int $post_id ): void {
		$value = (string) get_post_meta( $post_id, $column, true );
		if ( 'customer_email' === $column && $value !== '' ) {
			printf( '<a href="mailto:%1$s">%1$s</a>', esc_attr( $value ) );
			return;
		}
		if ( 'inquiry_source' === $column ) {
			$value = 'lead_capture' === $value ? 'Lead popup' : ( 'contact_form' === $value ? 'Contact form' : $value );
		}
		echo esc_html( $value );
	},
	10,
	2
);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
add_action(
	'rest_api_init',
	static function (): void {
		// GET /health — one-line liveness probe. If this 404s, the plugin is
		// not active and every storefront flow below is down.
		register_rest_route(
			ASTROESHOP_API_NS,
			'/health',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'permission_callback' => '__return_true',
				'callback'            => static fn(): WP_REST_Response => new WP_REST_Response(
					array(
						'ok'          => true,
						'plugin'      => 'astroeshop-api',
						'version'     => ASTROESHOP_API_VERSION,
						'woocommerce' => function_exists( 'wc_create_order' ),
						'inquiry_cpt' => ASTROESHOP_INQUIRY_POST_TYPE,
					)
				),
			)
		);

		register_rest_route(
			ASTROESHOP_API_NS,
			'/register',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'permission_callback' => '__return_true',
				'callback'            => 'astroeshop_api_register',
			)
		);

		register_rest_route(
			ASTROESHOP_API_NS,
			'/create-order',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'permission_callback' => '__return_true',
				'callback'            => 'astroeshop_api_create_order',
			)
		);

		register_rest_route(
			ASTROESHOP_API_NS,
			'/inquiry',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'permission_callback' => '__return_true',
				'callback'            => 'astroeshop_api_inquiry',
			)
		);

		register_rest_route(
			ASTROESHOP_API_NS,
			'/user-address',
			array(
				'methods'             => WP_REST_Server::READABLE,
				// Authenticated via the JWT Auth plugin's Bearer token, which
				// sets the current user before permission callbacks run.
				'permission_callback' => static function () {
					return is_user_logged_in()
						? true
						: astroeshop_api_error( 'rest_forbidden', 'Authentication required.', 401 );
				},
				'callback'            => 'astroeshop_api_user_address',
			)
		);
	}
);

// ---------------------------------------------------------------------------
// CORS: the storefront sends an `Idempotency-Key` header with /create-order.
// WordPress core's allow-list (rest_send_cors_headers, priority 10) is
// Authorization, X-WP-Nonce, Content-Disposition, Content-MD5, Content-Type —
// so the browser's preflight for that one endpoint is refused and the POST never
// leaves the page, surfacing as a "CORS error" even though the server is fine.
// Re-send the header with ours appended, scoped to this namespace; header()
// replaces the earlier value by default. Any new custom header the storefront
// starts sending must be added here too.
// ---------------------------------------------------------------------------
add_filter(
	'rest_pre_serve_request',
	static function ( $served, $result, $request ) {
		if ( $request instanceof WP_REST_Request
			&& str_starts_with( (string) $request->get_route(), '/' . ASTROESHOP_API_NS ) ) {
			header( 'Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Disposition, Content-MD5, Content-Type, Idempotency-Key' );
		}
		return $served;
	},
	15,
	3
);

// ---------------------------------------------------------------------------
// POST /register
// Body:     { email, username, password, first_name, last_name }
// Response: { success: true, message, data: { id, email, username } }  (201)
// The storefront then logs in via /jwt-auth/v1/token with the same credentials.
// ---------------------------------------------------------------------------
function astroeshop_api_register( WP_REST_Request $request ) {
	if ( ! astroeshop_api_rate_limit( 'register', 5, HOUR_IN_SECONDS ) ) {
		return astroeshop_api_error( 'astroeshop_rate_limited', 'Too many registration attempts. Please try again in a while.', 429 );
	}

	$body     = astroeshop_api_body( $request );
	$email    = sanitize_email( (string) ( $body['email'] ?? '' ) );
	$username = sanitize_user( (string) ( $body['username'] ?? '' ), true );
	$password = (string) ( $body['password'] ?? '' );
	$first    = astroeshop_api_str( $body, 'first_name', 60 );
	$last     = astroeshop_api_str( $body, 'last_name', 60 );

	if ( ! is_email( $email ) ) {
		return astroeshop_api_error( 'astroeshop_invalid_email', 'A valid email address is required.', 400 );
	}
	if ( email_exists( $email ) ) {
		return astroeshop_api_error( 'astroeshop_email_exists', 'An account with this email already exists. Try signing in.', 409 );
	}
	if ( '' === $username ) {
		return astroeshop_api_error( 'astroeshop_invalid_username', 'Username is required.', 400 );
	}
	if ( ! validate_username( $username ) ) {
		return astroeshop_api_error( 'astroeshop_invalid_username', 'Username contains characters that are not allowed.', 400 );
	}
	if ( username_exists( $username ) ) {
		return astroeshop_api_error( 'astroeshop_username_exists', 'This username is already taken.', 409 );
	}
	// Server-side floor only. The storefront enforces its own stronger policy;
	// being stricter here would reject signups the UI just told the user were fine.
	if ( strlen( $password ) < 8 ) {
		return astroeshop_api_error( 'astroeshop_weak_password', 'Password must be at least 8 characters.', 400 );
	}

	$args = array();
	if ( '' !== $first ) {
		$args['first_name'] = $first;
	}
	if ( '' !== $last ) {
		$args['last_name'] = $last;
	}

	// wc_create_new_customer assigns the `customer` role and fires WooCommerce's
	// new-account hooks (welcome email etc.). Fall back to core if WC is absent.
	if ( function_exists( 'wc_create_new_customer' ) ) {
		$user_id = wc_create_new_customer( $email, $username, $password, $args );
	} else {
		$user_id = wp_insert_user(
			array_merge(
				$args,
				array(
					'user_login' => $username,
					'user_email' => $email,
					'user_pass'  => $password,
					'role'       => 'subscriber',
				)
			)
		);
	}

	if ( is_wp_error( $user_id ) ) {
		return astroeshop_api_error( 'astroeshop_register_failed', wp_strip_all_tags( $user_id->get_error_message() ), 400 );
	}

	return new WP_REST_Response(
		array(
			'success' => true,
			'message' => 'Account created successfully.',
			'data'    => array(
				'id'       => (int) $user_id,
				'email'    => $email,
				'username' => $username,
			),
		),
		201
	);
}

// ---------------------------------------------------------------------------
// POST /create-order
// Header:   Idempotency-Key (optional) — same key twice returns the same order.
// Body:     { items: [{product_id, quantity}], billing: {...}, customer_note,
//             return_url, cancel_url }
// Response: { success: true, order_id, order_key, checkout_url, total, message }
// The storefront redirects the customer to checkout_url (WooCommerce order-pay),
// where the configured gateway (PayU) takes payment.
// ---------------------------------------------------------------------------
function astroeshop_api_create_order( WP_REST_Request $request ) {
	if ( ! function_exists( 'wc_create_order' ) || ! function_exists( 'wc_get_product' ) ) {
		return astroeshop_api_error( 'astroeshop_no_woocommerce', 'The store is temporarily unavailable. Please try again shortly.', 503 );
	}
	if ( ! astroeshop_api_rate_limit( 'order', 20, HOUR_IN_SECONDS ) ) {
		return astroeshop_api_error( 'astroeshop_rate_limited', 'Too many checkout attempts. Please try again in a while.', 429 );
	}

	$body  = astroeshop_api_body( $request );
	$items = $body['items'] ?? null;
	if ( ! is_array( $items ) || ! $items ) {
		return astroeshop_api_error( 'astroeshop_empty_cart', 'Your cart is empty.', 400 );
	}
	if ( count( $items ) > 50 ) {
		return astroeshop_api_error( 'astroeshop_too_many_items', 'Too many items in one order.', 400 );
	}

	$raw_billing = is_array( $body['billing'] ?? null ) ? $body['billing'] : array();
	$billing     = array(
		'first_name' => astroeshop_api_str( $raw_billing, 'first_name', 60 ),
		'last_name'  => astroeshop_api_str( $raw_billing, 'last_name', 60 ),
		'email'      => sanitize_email( (string) ( $raw_billing['email'] ?? '' ) ),
		'phone'      => astroeshop_api_str( $raw_billing, 'phone', 30 ),
		'address_1'  => astroeshop_api_str( $raw_billing, 'address_1', 200 ),
		'city'       => astroeshop_api_str( $raw_billing, 'city', 80 ),
		'state'      => astroeshop_api_str( $raw_billing, 'state', 80 ),
		'postcode'   => astroeshop_api_str( $raw_billing, 'postcode', 20 ),
		'country'    => strtoupper( astroeshop_api_str( $raw_billing, 'country', 2 ) ) ?: 'IN',
	);

	$required = array(
		'first_name' => 'First name is required.',
		'last_name'  => 'Last name is required.',
		'phone'      => 'Phone number is required.',
		'address_1'  => 'Address is required.',
		'city'       => 'City is required.',
		'state'      => 'State is required.',
		'postcode'   => 'PIN code is required.',
	);
	foreach ( $required as $field => $message ) {
		if ( '' === $billing[ $field ] ) {
			return astroeshop_api_error( 'astroeshop_missing_' . $field, $message, 400 );
		}
	}
	if ( ! is_email( $billing['email'] ) ) {
		return astroeshop_api_error( 'astroeshop_invalid_email', 'A valid email address is required.', 400 );
	}

	$note       = mb_substr( sanitize_textarea_field( (string) ( $body['customer_note'] ?? '' ) ), 0, 1000 );
	$return_url = esc_url_raw( (string) ( $body['return_url'] ?? '' ) );
	$cancel_url = esc_url_raw( (string) ( $body['cancel_url'] ?? '' ) );
	if ( '' !== $return_url && ! astroeshop_api_is_storefront_url( $return_url ) ) {
		$return_url = '';
	}
	if ( '' !== $cancel_url && ! astroeshop_api_is_storefront_url( $cancel_url ) ) {
		$cancel_url = '';
	}

	// Idempotency: the storefront sends a per-attempt key so a retried request
	// (flaky network, double click) returns the existing order instead of
	// creating a duplicate the customer would then pay for twice.
	$idempotency_key = mb_substr( sanitize_text_field( (string) $request->get_header( 'Idempotency-Key' ) ), 0, 128 );
	if ( '' !== $idempotency_key ) {
		$existing = wc_get_orders(
			array(
				'limit'      => 1,
				'meta_query' => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
					array(
						'key'   => '_astroeshop_idempotency_key',
						'value' => $idempotency_key,
					),
				),
			)
		);
		if ( is_array( $existing ) && ! empty( $existing[0] ) && $existing[0] instanceof WC_Order ) {
			return astroeshop_api_order_response( $existing[0], 'Order already created.', 200 );
		}
	}

	// Resolve and validate every product BEFORE creating anything, so a bad
	// cart never leaves a half-built order behind.
	$lines = array();
	foreach ( $items as $item ) {
		if ( ! is_array( $item ) ) {
			return astroeshop_api_error( 'astroeshop_invalid_item', 'One of the items in your cart is invalid.', 400 );
		}
		$product_id = absint( $item['product_id'] ?? 0 );
		$quantity   = absint( $item['quantity'] ?? 0 );
		if ( ! $product_id || $quantity < 1 ) {
			return astroeshop_api_error( 'astroeshop_invalid_item', 'One of the items in your cart is invalid.', 400 );
		}
		$quantity = min( $quantity, 99 );

		$product = wc_get_product( $product_id );
		$name    = $product ? $product->get_name() : ( '#' . $product_id );
		if ( ! $product || 'publish' !== $product->get_status() || ! $product->is_purchasable() ) {
			return astroeshop_api_error( 'astroeshop_unavailable', sprintf( '"%s" is no longer available.', $name ), 400 );
		}
		if ( $product->is_type( 'variable' ) ) {
			return astroeshop_api_error( 'astroeshop_needs_variation', sprintf( 'Please choose an option for "%s".', $name ), 400 );
		}
		if ( ! $product->is_in_stock() ) {
			return astroeshop_api_error( 'astroeshop_out_of_stock', sprintf( '"%s" is out of stock.', $name ), 400 );
		}
		$lines[] = array( $product, $quantity );
	}

	// If the storefront sent a JWT (Authorization: Bearer …) the JWT Auth plugin
	// has already set the current user and the order is tied to the account.
	// Otherwise it's a guest order — we never link by email alone, because an
	// unauthenticated request must not be able to attach orders to someone
	// else's account.
	$customer_id = get_current_user_id();

	$order = wc_create_order(
		array(
			'customer_id' => $customer_id,
			'created_via' => 'astroeshop-storefront',
			'status'      => 'pending',
		)
	);
	if ( is_wp_error( $order ) || ! ( $order instanceof WC_Order ) ) {
		return astroeshop_api_error( 'astroeshop_order_failed', 'We could not create your order. Please try again.', 500 );
	}

	foreach ( $lines as list( $product, $quantity ) ) {
		$order->add_product( $product, $quantity );
	}

	$order->set_address( $billing, 'billing' );
	$order->set_address( $billing, 'shipping' );
	if ( '' !== $note ) {
		$order->set_customer_note( $note );
	}

	// Shipping mirrors the storefront rule so the gateway total equals what the
	// customer was shown. See ASTROESHOP_FREE_SHIPPING_THRESHOLD above.
	$subtotal = (float) $order->get_subtotal();
	$shipping = new WC_Order_Item_Shipping();
	if ( $subtotal >= (float) ASTROESHOP_FREE_SHIPPING_THRESHOLD ) {
		$shipping->set_method_title( 'Free Shipping' );
		$shipping->set_method_id( 'free_shipping' );
		$shipping->set_total( 0 );
	} else {
		$shipping->set_method_title( 'Flat Rate' );
		$shipping->set_method_id( 'flat_rate' );
		$shipping->set_total( (float) ASTROESHOP_FLAT_SHIPPING_RATE );
	}
	$order->add_item( $shipping );
	$order->calculate_totals();

	if ( '' !== $idempotency_key ) {
		$order->update_meta_data( '_astroeshop_idempotency_key', $idempotency_key );
	}
	if ( '' !== $return_url ) {
		$order->update_meta_data( '_astroeshop_return_url', $return_url );
	}
	if ( '' !== $cancel_url ) {
		$order->update_meta_data( '_astroeshop_cancel_url', $cancel_url );
	}
	$order->update_meta_data( '_astroeshop_client_ip', astroeshop_api_client_ip() );
	$order->save();

	// Remember the billing address on the account so /user-address can prefill
	// checkout next time. Only when we actually know who the customer is.
	if ( $customer_id && class_exists( 'WC_Customer' ) ) {
		try {
			$customer = new WC_Customer( $customer_id );
			$customer->set_billing_first_name( $billing['first_name'] );
			$customer->set_billing_last_name( $billing['last_name'] );
			$customer->set_billing_email( $billing['email'] );
			$customer->set_billing_phone( $billing['phone'] );
			$customer->set_billing_address_1( $billing['address_1'] );
			$customer->set_billing_city( $billing['city'] );
			$customer->set_billing_state( $billing['state'] );
			$customer->set_billing_postcode( $billing['postcode'] );
			$customer->set_billing_country( $billing['country'] );
			$customer->save();
		} catch ( \Throwable $e ) {
			// Prefill is a convenience; never fail the order over it.
			error_log( '[astroeshop-api] could not save billing to customer ' . $customer_id . ': ' . $e->getMessage() ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		}
	}

	return astroeshop_api_order_response( $order, 'Order created. Redirecting to payment.', 201 );
}

/** The response shape checkout.ts expects (CreateOrderApiResponse). */
function astroeshop_api_order_response( WC_Order $order, string $message, int $status ): WP_REST_Response {
	return new WP_REST_Response(
		array(
			'success'      => true,
			'order_id'     => $order->get_id(),
			'order_key'    => $order->get_order_key(),
			'checkout_url' => $order->get_checkout_payment_url(),
			'total'        => (string) $order->get_total(),
			'message'      => $message,
		),
		$status
	);
}

// After a successful payment WooCommerce would normally land the customer on
// the WordPress "order received" page. The storefront asked us to send them
// back to /order-confirmation instead, so honour the (allow-listed) return_url
// stored on the order, carrying the order id the confirmation page reads.
add_filter(
	'woocommerce_get_return_url',
	static function ( $url, $order ) {
		if ( $order instanceof WC_Order ) {
			$return_url = (string) $order->get_meta( '_astroeshop_return_url' );
			if ( '' !== $return_url && astroeshop_api_is_storefront_url( $return_url ) ) {
				return add_query_arg(
					array(
						'order_id' => $order->get_id(),
						'key'      => $order->get_order_key(),
					),
					$return_url
				);
			}
		}
		return $url;
	},
	10,
	2
);

// ---------------------------------------------------------------------------
// POST /inquiry
// Body:     { customer_name, customer_email, customer_phone, inquiry_subject,
//             inquiry_message, inquiry_source, inquiry_service, ... }
//           (the storefront sends the ACF field names directly)
// Response: { success: true, message }  (201)
// Saves an Inquiry post (all 10 ACF fields), emails the shop, and sends the
// customer an acknowledgement for contact-form submissions.
// ---------------------------------------------------------------------------
function astroeshop_api_inquiry( WP_REST_Request $request ) {
	if ( ! astroeshop_api_rate_limit( 'inquiry', 10, HOUR_IN_SECONDS ) ) {
		return astroeshop_api_error( 'astroeshop_rate_limited', 'Too many messages sent. Please try again in a while.', 429 );
	}

	$body = astroeshop_api_body( $request );

	// Honeypot: real forms never fill `website`. Bots get a quiet fake success.
	if ( ! empty( $body['website'] ) ) {
		return new WP_REST_Response( array( 'success' => true, 'message' => 'Thank you!' ), 201 );
	}

	$source = (string) ( $body['inquiry_source'] ?? 'contact_form' );
	if ( ! in_array( $source, array( 'contact_form', 'lead_capture' ), true ) ) {
		$source = 'contact_form';
	}

	$fields = array(
		'customer_name'     => astroeshop_api_str( $body, 'customer_name', 100 ),
		'customer_email'    => sanitize_email( (string) ( $body['customer_email'] ?? '' ) ),
		'customer_phone'    => astroeshop_api_str( $body, 'customer_phone', 30 ),
		'inquiry_status'    => 'new',
		'inquiry_source'    => $source,
		'inquiry_subject'   => astroeshop_api_str( $body, 'inquiry_subject', 200 ),
		'inquiry_message'   => mb_substr( sanitize_textarea_field( (string) ( $body['inquiry_message'] ?? '' ) ), 0, 5000 ),
		'inquiry_service'   => astroeshop_api_str( $body, 'inquiry_service', 100 ),
		'inquiry_timestamp' => current_time( 'mysql' ),
		'inquiry_ip'        => astroeshop_api_client_ip(),
	);

	if ( '' === $fields['customer_name'] ) {
		return astroeshop_api_error( 'astroeshop_missing_name', 'Name is required.', 400 );
	}
	if ( ! is_email( $fields['customer_email'] ) ) {
		return astroeshop_api_error( 'astroeshop_invalid_email', 'A valid email address is required.', 400 );
	}
	if ( 'lead_capture' === $source && '' === $fields['customer_phone'] ) {
		return astroeshop_api_error( 'astroeshop_missing_phone', 'Phone number is required.', 400 );
	}
	if ( 'contact_form' === $source && '' === $fields['inquiry_message'] ) {
		return astroeshop_api_error( 'astroeshop_missing_message', 'Message is required.', 400 );
	}

	$label   = 'contact_form' === $source
		? ( $fields['inquiry_subject'] !== '' ? $fields['inquiry_subject'] : 'Contact form' )
		: ( $fields['inquiry_service'] !== '' ? $fields['inquiry_service'] : 'Lead popup' );
	$post_id = wp_insert_post(
		array(
			'post_type'    => ASTROESHOP_INQUIRY_POST_TYPE,
			'post_status'  => 'publish',
			'post_title'   => $fields['customer_name'] . ' — ' . $label,
			'post_content' => $fields['inquiry_message'],
		),
		true
	);
	if ( is_wp_error( $post_id ) ) {
		error_log( '[astroeshop-api] inquiry insert failed: ' . $post_id->get_error_message() ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		return astroeshop_api_error( 'astroeshop_inquiry_failed', 'We could not save your message. Please try again or WhatsApp us.', 500 );
	}

	foreach ( $fields as $key => $value ) {
		// Plain post meta is the guaranteed write; update_field additionally
		// records ACF's field-key reference so the values render in the ACF
		// group on the edit screen. Same meta key either way.
		update_post_meta( $post_id, $key, $value );
		if ( function_exists( 'update_field' ) ) {
			update_field( $key, $value, $post_id );
		}
	}

	astroeshop_api_send_inquiry_emails( $fields );

	return new WP_REST_Response(
		array(
			'success' => true,
			'message' => 'Thank you! We will get back to you within 24 hours.',
		),
		201
	);
}

/** Shop notification + (for contact forms) a customer acknowledgement. */
function astroeshop_api_send_inquiry_emails( array $f ): void {
	$is_contact = 'contact_form' === $f['inquiry_source'];
	$site       = wp_specialchars_decode( (string) get_bloginfo( 'name' ), ENT_QUOTES );
	$headers    = array( 'Content-Type: text/html; charset=UTF-8' );

	$row = static function ( string $label, string $value ): string {
		if ( '' === $value ) {
			return '';
		}
		return '<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">' . esc_html( $label ) . '</td>'
			. '<td style="padding:6px 0;color:#111">' . nl2br( esc_html( $value ) ) . '</td></tr>';
	};

	// --- To the shop -------------------------------------------------------
	$subject = $is_contact
		? sprintf( '[%s] Contact form: %s', $site, $f['inquiry_subject'] !== '' ? $f['inquiry_subject'] : 'General inquiry' )
		: sprintf( '[%s] New lead: %s', $site, $f['inquiry_service'] !== '' ? $f['inquiry_service'] : 'Free tool access' );

	$admin_body = '<div style="font-family:Arial,sans-serif;max-width:600px">'
		. '<h2 style="color:#800909;margin:0 0 12px">' . ( $is_contact ? 'New contact form message' : 'New lead from the popup' ) . '</h2>'
		. '<table style="border-collapse:collapse;font-size:14px">'
		. $row( 'Name', $f['customer_name'] )
		. $row( 'Email', $f['customer_email'] )
		. $row( 'Phone', $f['customer_phone'] )
		. $row( 'Subject', $f['inquiry_subject'] )
		. $row( 'Service', $f['inquiry_service'] )
		. $row( 'Message', $f['inquiry_message'] )
		. $row( 'Source', $is_contact ? 'Contact form' : 'Lead capture popup' )
		. $row( 'Received', $f['inquiry_timestamp'] )
		. '</table>'
		. '<p style="font-size:12px;color:#999;margin-top:16px">Saved under Inquiries in WordPress.</p>'
		. '</div>';

	$admin_headers   = $headers;
	$admin_headers[] = 'Reply-To: ' . $f['customer_name'] . ' <' . $f['customer_email'] . '>';
	wp_mail( astroeshop_api_notify_email(), $subject, $admin_body, $admin_headers );

	// --- To the customer (contact form only) -------------------------------
	if ( $is_contact ) {
		$about         = $f['inquiry_subject'] !== '' ? ' regarding <strong>' . esc_html( $f['inquiry_subject'] ) . '</strong>' : '';
		$customer_body = '<div style="font-family:Arial,sans-serif;max-width:600px">'
			. '<h2 style="color:#800909;margin:0 0 12px">Thank you for contacting ' . esc_html( $site ) . '</h2>'
			. '<p>Namaste ' . esc_html( $f['customer_name'] ) . ',</p>'
			. '<p>We have received your message' . $about . '. Our team will review it and get back to you within 24 hours.</p>'
			. '<p style="color:#666;font-size:13px">This is an automated acknowledgement — you can reply to this email if you want to add anything.</p>'
			. '</div>';
		wp_mail( $f['customer_email'], sprintf( 'Thank you for contacting %s', $site ), $customer_body, $headers );
	}
}

// ---------------------------------------------------------------------------
// GET /user-address   (Authorization: Bearer <jwt>)
// Response: { billing: { first_name, last_name, email, phone, address_1, city,
//                        state, postcode, country } }
// Used by the checkout page to prefill the form for a signed-in customer.
// ---------------------------------------------------------------------------
function astroeshop_api_user_address( WP_REST_Request $request ) {
	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		return astroeshop_api_error( 'rest_forbidden', 'Authentication required.', 401 );
	}

	$billing = array(
		'first_name' => '',
		'last_name'  => '',
		'email'      => '',
		'phone'      => '',
		'address_1'  => '',
		'city'       => '',
		'state'      => '',
		'postcode'   => '',
		'country'    => '',
	);

	if ( class_exists( 'WC_Customer' ) ) {
		try {
			$customer = new WC_Customer( $user_id );
			$billing  = array(
				'first_name' => (string) $customer->get_billing_first_name(),
				'last_name'  => (string) $customer->get_billing_last_name(),
				'email'      => (string) $customer->get_billing_email(),
				'phone'      => (string) $customer->get_billing_phone(),
				'address_1'  => (string) $customer->get_billing_address_1(),
				'city'       => (string) $customer->get_billing_city(),
				'state'      => (string) $customer->get_billing_state(),
				'postcode'   => (string) $customer->get_billing_postcode(),
				'country'    => (string) $customer->get_billing_country(),
			);
		} catch ( \Throwable $e ) {
			// Fall through to the user-meta values below.
		}
	} else {
		foreach ( array_keys( $billing ) as $key ) {
			$billing[ $key ] = (string) get_user_meta( $user_id, 'billing_' . $key, true );
		}
	}

	// A brand-new account has no billing record yet; seed the obvious fields
	// from the profile so the form isn't completely blank.
	$user = get_userdata( $user_id );
	if ( $user instanceof WP_User ) {
		if ( '' === $billing['first_name'] ) {
			$billing['first_name'] = (string) $user->first_name;
		}
		if ( '' === $billing['last_name'] ) {
			$billing['last_name'] = (string) $user->last_name;
		}
		if ( '' === $billing['email'] ) {
			$billing['email'] = (string) $user->user_email;
		}
	}

	return new WP_REST_Response( array( 'billing' => $billing ), 200 );
}

// ---------------------------------------------------------------------------
// Activation / deactivation: the Inquiries post type needs rewrite rules
// refreshed so its admin screens resolve straight away.
// ---------------------------------------------------------------------------
register_activation_hook(
	__FILE__,
	static function (): void {
		astroeshop_api_register_inquiry_post_type();
		flush_rewrite_rules();
	}
);
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
