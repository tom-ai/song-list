# Data & state

## The model: URL is the state

There is no Redux/Zustand/Context store. All interactive state lives in the URL query string:

- `?q=<text>` — active search.
- `?playlist=<slug>` — selected playlist.

Components read these with `useSearchParams()` and write them with `setSearchParams()`.
SWR keys its cache off the resulting request URL, so changing a param automatically
refetches and re-renders. This is why the app has almost no local state.

**The one rule: `q` and `playlist` are mutually exclusive.** A search clears the playlist
and vice-versa. This is enforced in *two* places — keep them consistent if you touch either:

- `SearchBox.tsx` — when `inputValue` is set, deletes `playlist`.
- `MainPage.tsx` `handlePlaylistSelect` — when a playlist is picked, deletes `q`.

`SearchBox` keeps a local `inputValue` (debounced 300ms before writing `?q`) and syncs
*from* the URL via a `useEffect` on `searchParams`. That local state is a debounce buffer,
not a second source of truth — don't promote it.

## Fetching (SWR)

Two hooks wrap SWR, both keyed off `baseUrl` from `api/helpers/constants.ts`:

- `useSongs(playlistSlug?, searchQuery?)` → `/{tenant}/songs`, or
  `/{tenant}/playlists/{slug}/songs`, with `?q=` appended when searching.
- `usePlaylists()` → `/{tenant}/playlists`.

Both return `{ data, isLoading, error }` where `error` is unwrapped to the API's error
object (`swrError?.error`). The shared `fetcher` just does `fetch(url).then(r => r.json())`.

**Search is server-side.** The `?q` param is sent to the API; the frontend does not filter
the returned list.

## The API contract (`src/types/index.ts`)

These types mirror the **Groove App API** — served by the sibling repo `../groove-app`
(prod: `api.findmusicians.co.uk`). They are a contract, not UI models:

- `PublicSong { id, title, artist }`, `PublicPlaylist { id, name, slug, totalSongs }`.
- List endpoints return `PaginatedResponse<T> { tenant, meta: { total, count? }, items }`.
- Errors are `APIError { error: { code, message } }` with a fixed set of `code`s.

Render totals/empty states from `meta.total` and map over `items`. Don't add fields the
API doesn't send — if you need new data, the API must change first.

## Tenant

`constants.ts` hardcodes `tenantSlug = 'amba'` and builds `baseUrl` as
`${VITE_BASE_API_URL}/amba`. Multi-tenancy (host-based) is a future direction documented in
`docs/spike-multi-tenant.md` — it is **not** wired up. Don't refactor toward it unprompted.
