# Song List

Public, read-only repertoire browser for **Amba Strings**. A Vite/React SPA that renders
songs and playlists served by an external multi-tenant API. Live at `songs.ambastrings.co.uk`.

> **Docs are a contract.** If your change contradicts anything in these docs (including
> `docs/claude/*.md` and `.claude/rules/*.md`), update the doc in the same PR. Stale docs
> are worse than no docs.

## Stack

- **Vite 5** + **React 18** + **TypeScript** (strict), single-page app.
- **react-router 7** — declarative `BrowserRouter`, one route (`/` → `MainPage`).
- **SWR** for data fetching. **PicoCSS** (amber theme) for styling, loaded via CDN in `index.html`.
- Deployed on **Vercel**: push to `main` → production. SPA rewrites in `vercel.json`.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b` typecheck then `vite build` |
| `npm run lint` | ESLint (flat config, `eslint.config.js`) |
| `npm test` | Vitest |
| `npm run preview` | Serve the production build locally |

`.env` provides `VITE_BASE_API_URL` (currently `https://api.findmusicians.co.uk`).

## Architecture

This repo is **only the public frontend**. It has no backend, no auth, and no writes — it
`GET`s from the **Groove App API**, served by the sibling repo `../groove-app` (in prod:
`api.findmusicians.co.uk`). Admin/editing lives at `findmusicians.co.uk/admin` (linked from
the footer), not here.

```
index.html ─ main.tsx (router) ─ App (layout) ─ MainPage
                                                   ├─ SearchBox      (writes ?q)
                                                   ├─ PlaylistList   (writes ?playlist)
                                                   └─ SongList       (reads both)
   hooks/useSongs, usePlaylists ── SWR ──▶ api.findmusicians.co.uk/{tenant}/...
```

## Cross-cutting invariants

- **URL search params are the single source of truth.** `?q` (search) and `?playlist`
  drive every hook and component; there is no client state store. The two are **mutually
  exclusive** — setting one clears the other. Don't add a parallel React state copy of them.
- **`src/types/index.ts` mirrors the external API contract** ("imported from Groove App").
  Don't add or rename fields to suit the UI — the shapes must match what the API returns.
- **Tenant is hardcoded** as `amba` in `src/api/helpers/constants.ts`. Multi-tenancy is a
  future direction (see `docs/spike-multi-tenant.md`); don't assume it exists yet.
- **No writes.** If a task implies creating/editing songs or playlists, it belongs in the
  admin app, not this repo — stop and confirm.

## Lint / TS

- TypeScript `strict`, plus `noUnusedLocals` / `noUnusedParameters` (`tsconfig.app.json`).
  Unused imports/vars fail the build, not just lint.
- `noImplicitAny` is disabled at the root (`tsconfig.json`).

@docs/claude/index.md
