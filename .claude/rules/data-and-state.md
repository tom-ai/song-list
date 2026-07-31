---
paths:
  - "src/hooks/**"
  - "src/components/**"
  - "src/pages/**"
  - "src/api/**"
  - "src/types/**"
---

# Data & state — quick reference

Full patterns in `docs/claude/data-and-state.md`. The load-bearing rules:

- **URL search params (`?q`, `?playlist`) are the only state.** Read via `useSearchParams`,
  write via `setSearchParams`. Don't introduce a separate store or a duplicate React copy.
- **`q` and `playlist` are mutually exclusive** — enforced in both `SearchBox.tsx` and
  `MainPage.tsx#handlePlaylistSelect`. Change one, check the other.
- **Search is server-side** (`?q` sent to the API); don't filter results client-side.
- **`src/types/index.ts` mirrors the Groove App API contract** (served by `../groove-app`).
  Don't add/rename fields to fit the UI — the API shape must change first.
- **Tenant is hardcoded `amba`** in `api/helpers/constants.ts`. No multi-tenancy yet.
