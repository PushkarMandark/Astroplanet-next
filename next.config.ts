import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // The blog backend (api.astroeshop.com) is a shared-host WordPress whose MySQL
  // serves single requests fine but collapses under burst load — a default build
  // fans out ~11 workers × 8 concurrent page renders × ~2 _embed REST calls each
  // (~150 simultaneous queries), which trips "Error establishing a database
  // connection" and previously shipped 100+ blog pages as 404s. Throttle the
  // static-generation fan-out so we never exceed what the DB can serve.
  //   cpus → worker processes; staticGenerationMaxConcurrency → pages in flight
  //   per worker. Effective peak ≈ cpus × maxConcurrency page renders at once.
  // Raise these once the backend has a persistent object cache / higher DB limits.
  // The request rate gate in src/lib/api/client.ts is PER PROCESS, so the
  // aggregate ceiling is cpus × (1000 / WP_MIN_SPACING_MS) req/s — at cpus: 2
  // and the default 250ms spacing that is ~8 req/s. Hostinger's limiter answers
  // 429 with no Retry-After and stays engaged while you keep pushing, which
  // killed a build at page 0/507. Raise `cpus` only together with the spacing.
  experimental: {
    cpus: 2,
    staticGenerationMaxConcurrency: 2,
  },
};

export default nextConfig;
