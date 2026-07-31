# Styling

## PicoCSS, semantic HTML

Styling is [PicoCSS](https://picocss.com) v2 (amber theme). It is loaded **via CDN in
`index.html`**, not as an npm dependency:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.amber.min.css" />
```

Pico styles semantic HTML directly, so the app leans on plain elements (`<table>`,
`<button>`, `<input type="search">`, `<nav>`, `<footer>`) plus a small set of Pico class
hooks (`container`, `outline`, `striped`, `grid`). Prefer semantic markup + Pico classes
over bespoke CSS. Reach for Pico's CSS variables (`--pico-*`, e.g.
`--pico-background-color`, `--pico-spacing`) rather than hardcoding colours/spacing.

## Custom CSS lives in `src/global.css`

One stylesheet, imported once in `main.tsx`. It holds the few things Pico doesn't:

- The `BebasNeue` `@font-face` and the `--font-family-heading` var.
- Layout for `.sticky-controls`, `.playlist-chips`, `.header`, `.footer`.

Keep additions here and scoped to a class. Space Grotesk (the body font) comes from
`@fontsource-variable/space-grotesk` (imported in `App.tsx`) and is applied via an inline
`<style>` in `index.html`.

## Forced dark theme

`App.tsx` sets `document.documentElement.setAttribute('data-theme', 'dark')` on mount — the
app is always dark. There is no theme toggle; don't add light-mode styling assumptions.

## Known gaps — don't silently "fix"

- The logo `<img>` in the `.header` of `App.tsx` is intentionally commented out (the logo
  currently lives in the footer). Leave it unless asked.
