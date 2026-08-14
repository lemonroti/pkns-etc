# Laman Lestari Website

Corporate website prototype for Laman Lestari based on the client-provided website write-up.

## Runtime

- Vue 3 Global Production CDN
- Vue Router 4 Global Production CDN
- Application code: native ES modules
- Routing: Vue Router hash history
- Build step: none
- No Vite, npm, package manager, or bundler

This intentionally follows the same lightweight GitHub Pages runtime pattern used by the working `ukm-etc` prototype.

## Pages

- `#/` — Home
- `#/about` — About Us
- `#/clq` — Centralised Labour Quarters

Hash history keeps route refreshes compatible with GitHub Pages without server rewrite rules.

## GitHub Pages

Configure:

1. Repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/(root)**
5. Save

All local CSS, JavaScript, and image paths are relative so the repository subpath works correctly.

## Local Preview

Serve the repository over HTTP because the application uses native ES modules.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

Smoke-test page: `http://localhost:8000/tests/smoke.html`.

## Placeholder Assets

Temporary navy/gold SVG assets live under `assets/` and are used until the client supplies final logo, project photography, Board/Management photographs, and organisation imagery.

```text
assets/
├── logo/
│   └── laman-lestari-placeholder.svg
└── images/
    ├── hero-home-placeholder.svg
    ├── hero-about-placeholder.svg
    ├── hero-clq-placeholder.svg
    ├── person-placeholder.svg
    ├── project-placeholder.svg
    └── org-chart-placeholder.svg
```

The canonical paths are defined in `js/data.js`. When final client assets arrive, replace the relevant paths there rather than rewriting shared components.

These placeholders are temporary design assets and must not be represented as the client's final official branding or photography.
