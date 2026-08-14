# Laman Lestari Website

Corporate website prototype for Laman Lestari based on the client-provided website write-up.

## Stack

- Vue.js 3 via CDN/import map
- Vue Router 4 via CDN/import map
- Native ES modules
- HTML5 + CSS3
- No Vite, npm, package manager, bundler, or build step

## Pages

- `#/` — Home
- `#/about` — About Us
- `#/clq` — Centralised Labour Quarters

Vue Router uses hash history so the site works when hosted directly on GitHub Pages without server rewrite rules.

## GitHub Pages

Configure:

1. Repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/(root)**
5. Save

All local CSS/JS paths are relative so the repository subpath works correctly.

## Local Preview

Serve the repository over HTTP. ES modules should not be previewed using `file://`.

Example with Python:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

Smoke-test page: `http://localhost:8000/tests/smoke.html`.

## Client Assets

Client logo, project photography, board photographs, management photographs, and the final organisation-chart image can be added under:

```text
assets/
├── logo/
└── images/
```

The current interface intentionally uses neutral branded placeholders where client images have not yet been supplied. Do not replace these with fabricated people, project photos, addresses, certifications, or social URLs.
