# Deep-dive doc index

The docs below are **not** auto-loaded. Read the relevant one (with the Read tool)
**before** starting work in its area — don't rely on memory of past sessions.

| Doc | Read when |
|---|---|
| `docs/claude/data-and-state.md` | Before touching hooks, components, `api/`, or `types/` — the URL-as-state model, SWR usage, the external API contract, tenant handling, error rendering, and known dead code. |
| `docs/claude/styling.md` | Before changing styles or markup — PicoCSS conventions, `global.css`, the CDN theme link, and the forced dark theme. |
| `docs/spike-multi-tenant.md` | Background reading for the multi-tenant direction — a spike/decision doc, not current behaviour. |

Path-scoped quick-reference rules in `.claude/rules/` auto-load when matching files
are touched; each links back to its full doc here. When you update a pattern, update
both the rule and the doc (docs are a contract — see `CLAUDE.md`).

Keep this table in sync: one row per doc, added in the same PR that adds the doc.
