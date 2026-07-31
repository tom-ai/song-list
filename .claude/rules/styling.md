---
paths:
  - "src/global.css"
  - "src/App.tsx"
  - "index.html"
---

# Styling — quick reference

Full patterns in `docs/claude/styling.md`. The load-bearing rules:

- **PicoCSS v2 (amber)** is loaded via CDN in `index.html`, not npm. Style semantic HTML +
  Pico classes (`container`, `outline`, `striped`, `grid`); use `--pico-*` CSS vars.
- **Custom CSS goes in `src/global.css`**, scoped to a class. It's the only stylesheet.
- **The app is force-dark** (`data-theme="dark"` set in `App.tsx`). No theme toggle; don't
  add light-mode assumptions.
- The header logo `<img>` in `App.tsx` is intentionally commented out — leave it.
