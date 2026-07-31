# Spike: Multi-tenanting song-list & merging into the groove-app nx repo

**Date:** 2026-07-09
**Status:** Spike only — no code changes. Conclusions at the bottom.

## Background

This app is a read-only repertoire viewer built for Amba Strings, consuming the Groove public API. The groove-app platform migration ([PR #117](https://github.com/Groove-Tech-UK/groove-app/pull/117)) moves the public API to a Hono Worker on Cloudflare with tenant filtering built in. This spike asks two questions:

1. What would it take to make this app multi-tenant, themed per tenant?
2. Is merging this repo into the groove-app nx monorepo worthwhile?

## How the new API handles tenancy (PR #117)

Tenant scoping works two ways in `apps/api`:

- **Path param** — every data route is `/api/public/{tenant}/songs|playlists/...`. Handlers validate the tenant first (`getTenantBySlug`, 404 `TENANT_NOT_FOUND` on miss), and every Drizzle query inner-joins `tenants` on slug, so cross-tenant leakage isn't possible per-query.
- **Host header** — the AI-discovery layer (`/`, `/llms.txt`, `/.well-known/openapi.json`) resolves the tenant from the subdomain via `extractTenantSlugFromHost`, with `TENANT_ROOT_DOMAIN=grooveapp.co.uk` and planned zone routes on `*.grooveapp.co.uk`.

The platform's tenancy model is therefore **subdomain-first**, with the slug echoed in the API path.

## Where this app is single-tenant today

The `amba` coupling is broader than the API constant:

| Location | Coupling |
|---|---|
| `src/api/helpers/constants.ts` | `tenantSlug = 'amba'` baked into every URL |
| `index.html` | Title, description, OG tags, canonical — hardcoded to `songs.ambastrings.co.uk`; Pico **amber** theme via CDN |
| `src/App.tsx` | "Amba Strings Repertoire" header, Amba logo import, website/Instagram footer links, forced `data-theme="dark"` |
| `src/global.css` | BebasNeue heading font, Space Grotesk body |
| `src/types/index.ts` | Hand-copied types from groove-app — already drifting (`ListMeta.count?` exists here but not in `@groove/shared`; no `PublicTenant`) |

Inconsistencies found along the way:

- The OpenAPI examples use `amba-strings`; this repo uses `amba`. Confirm the real slug.
- The app points at `app.groovetech.co.uk`; the Worker's tenant root domain is `grooveapp.co.uk`. Which domain is canonical for tenant subdomains?

## API gap: no tenant-meta endpoint

To theme at runtime, the SPA needs to ask who the tenant is. Today it can't:

- There is no `GET /api/public/{tenant}` endpoint. `PublicTenant` exists in `@groove/shared` (id, name, siteName, slug, location, primaryCategory) but is only used internally.
- The Payload `Tenants` collection **already has** `theme` (light/dark) and `customDomain` fields — neither is exposed publicly.
- Nothing carries branding: no logo URL, accent colour, or social links. Logo delivery would ride the planned R2 media setup.

Step one of any multi-tenant version is a tenant-meta endpoint on the Worker returning `PublicTenant` extended with theme/branding.

## Tenant resolution options for the SPA

**A. Host-based (recommended)** — `{tenant}.grooveapp.co.uk`, mirroring the API's own model. Caveat: the Worker owns `/` on tenant subdomains for the minimal AI-discovery homepage, so the SPA should live at a path like `/repertoire` rather than squatting on `/`.

**B. Path-based** — one deployment at e.g. `songs.grooveapp.co.uk/:tenant` via a router param. Cheapest, no DNS work, but ugly URLs, one shared OG/meta for all tenants, and it diverges from the platform model. Stepping stone only.

**C. Build-per-tenant** — `VITE_TENANT_SLUG` env var, one Vercel project per tenant. Solves static OG/meta perfectly with almost no code, but linear ops burden and no self-serve. Adequate if only 2–3 acts are ever expected; a dead end for a platform.

**D. Runtime config** (needed by A and B anyway) — on boot, resolve the tenant (from host, `?tenant=` fallback for local dev), fetch tenant meta, apply theming.

## Theming mechanics

- **Colours:** Pico v2 colour themes are CSS-variable sets. Self-host the Pico base (instead of the amber CDN build) and set `--pico-primary` etc. from the tenant's accent colour. `global.css` is ~90 lines and already leans on Pico vars, so this is cheap.
- **Dark/light:** the existing `theme` field on the Tenants collection replaces the hardcoded `data-theme="dark"`.
- **Fonts:** per-tenant fonts multiply bundles. Fixed stack or 2–3 curated presets in v1.
- **Header/footer:** `siteName ?? name`, logo URL + links from new branding fields.
- **SEO/OG (the sleeper issue):** OG scrapers don't run JS, so a runtime-themed SPA gets wrong social previews — today this only works because `index.html` is hardcoded. Clean fix: the Worker serves the SPA and edge-injects the per-tenant `<head>`. This is also the strongest technical argument for the repo merge.

## Merge into the groove-app nx repo?

**For:**

- **Contract drift ends** — replace the hand-copied `src/types/index.ts` with `import from '@groove/shared'`. Drift is already visible.
- **Third copy of tenant logic** — `extractTenantSlugFromHost` exists twice already (apps/web, apps/api) with a "keep in sync" comment; this app would be the third consumer. Merging forces the right move: promote it to `libs/shared`.
- **Worker-served SPA falls out naturally** — as `apps/songs` built by CI, the Worker serves it via Cloudflare static assets on the `*.grooveapp.co.uk` routes it already claims: tenant subdomains for free, edge head-injection for OG, no CORS, one pipeline, relative API URLs.
- nx affected-graph CI, one toolchain, consistent with where the platform is heading.

**Against / friction:**

- Separate repo (`tom-ai/song-list`) + Vercel pipeline to retire; import history via subtree or start fresh.
- Version deltas (React 18.3/Vite 5 here vs React 19.2 in apps/web) — non-blocking since nx apps are independent, but bump on the way in.
- Cruft to drop at the door: `supabase`, `@neondatabase/serverless`, `ws`, `lodash`, `dotenv` and the `generate-types` script are dead weight in a read-only viewer.
- **Timing:** migration Phases 0–3 are code-complete but the cloud cutover hasn't run. Merge after cutover, not mid-migration.

**Verdict: yes, if going multi-tenant / actively developing — otherwise option C suffices.**

## Product direction: the set-list basket (what makes this worth it)

The app stays actively developed. The next feature is a **basket**: prospective clients (couples planning weddings) build a set list from the repertoire and share it back — replacing the real-world pain of songs manually copied into a document and emailed around. End goal: a lead-gen app where a curated set list *is* the enquiry, replacing a contact form.

Why it works: the lead self-qualifies by doing work — a couple who curated a set list is a far warmer lead than a form submission, and the client receives a ready-made brief. The one form field to fight for is the **event date** (instant availability triage).

This is the platform's first public **write**, which pulls in things reads never needed:

- **Storage:** a tenant-scoped Payload collection (e.g. `setlist-requests`) rather than fire-and-forget email — the client gets a lead inbox in the admin panel for free, and the data is structured (song references, not text).
- **Notification:** email to the tenant on submission — the moment the manual workflow dies.
- **Abuse:** a public unauthenticated POST will attract bots. Cloudflare Turnstile (free, Workers-native) + basic rate limiting from day one.

Basket phasing:

1. **Basket UI, client-side only** — add/remove songs, localStorage persistence. Zero backend; shippable alone.
2. **Submit** — small form (names, email, event date), `POST /api/public/{tenant}/setlist-requests`, store in Payload, email the tenant. The whole value proposition end-to-end.
3. **Share URL** — POST returns an id; `/setlist/:id` renders read-only (covers "send to partner/planner before submitting"). No co-editing — scope creep.

The basket **strengthens the merge and demotes theming**: SPA and Worker must evolve in lockstep (new endpoint, shared `SetlistRequest` types), which is exactly when hand-copied types across two repos start causing bugs. Theming waits until a second act signs up; the new endpoint just needs to be tenant-scoped from day one (near-free with the existing patterns).

Bonus alignment with the AI north star: once the submission endpoint is in the OpenAPI spec, an AI agent planning a wedding could discover a band's repertoire *and submit a set-list request* with no UI — the first action worth eventually exposing via MCP.

## Recommended sequence

1. **Prereq:** finish the platform cutover (groove-app `docs/migration.md` checklist).
2. **Merge** this repo into groove-app as `apps/songs`: swap to `@groove/shared`, drop dead deps, promote `extractTenantSlugFromHost` to shared.
3. **Basket phases 1–2** (client-side basket, then submit endpoint + Payload collection + email + Turnstile).
4. **Share URL.**
5. **API tenant-meta endpoint + runtime theming + Worker-served SPA** — when a second tenant exists.
6. **Custom domains** (`songs.ambastrings.co.uk`) via the existing `customDomain` field, a `getTenantByHost` lookup, and Cloudflare custom hostnames. Later.

Rough effort: steps 2–3 are a couple of weekends; step 5 a day or two once the pattern exists.

## Open questions

- Real tenant slug: `amba` or `amba-strings`?
- Canonical tenant domain: `groovetech.co.uk` or `grooveapp.co.uk`?
- Where does the SPA live on a tenant subdomain — `/repertoire`? — given the minimal AI-discovery homepage owns `/`.
- Does the basket need any identity ("save your list") in v1? (Current answer: no — localStorage + share URL keeps friction low.)
