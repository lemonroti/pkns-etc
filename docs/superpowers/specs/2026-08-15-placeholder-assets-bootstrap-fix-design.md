# Placeholder Assets + Vue Bootstrap Fix Design

## Goal

Fix the GitHub Pages loading screen and add temporary Laman Lestari-branded placeholder visuals for every image-dependent area until the client supplies final brand assets and photography.

## Confirmed Reference Architecture

`ukm-etc` is the working reference for deployment. `pkns-etc` will use the same runtime pattern:

- Vue 3 Global Production CDN: `https://unpkg.com/vue@3/dist/vue.global.prod.js`
- Vue Router 4 Global Production CDN: `https://unpkg.com/vue-router@4/dist/vue-router.global.prod.js`
- Our own JavaScript files remain native `type="module"` files.
- Application bootstrap uses `Vue.createApp(...)`.
- Router bootstrap uses `VueRouter.createRouter(...)` and `VueRouter.createWebHashHistory()`.
- No import map.
- No Vite.
- No npm.
- No build step.
- GitHub Pages remains `Deploy from a branch → main → /(root)`.

## Root Cause of the Loading Screen

The current `pkns-etc` page uses import-map aliases and imports Vue/Vue Router as ESM packages. This differs from the proven `ukm-etc` setup and caused the application module graph to fail before `createApp(...).mount('#app')`. Because Vue never mounted, the static fallback text `Loading Laman Lestari…` remained visible.

The fix is to remove the import-map package-loading path and use the same global production CDN pattern already proven by `ukm-etc`.

## Runtime Changes

### `index.html`

Load Vue and Vue Router before the application module:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/vue-router@4/dist/vue-router.global.prod.js"></script>
<script type="module" src="./js/app.js"></script>
```

Remove the existing import map.

### `js/app.js`

Use browser globals:

```js
const app = Vue.createApp(App);
app.use(router);
app.mount('#app');
```

### `js/router.js`

Use browser globals:

```js
export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
```

The public routes remain:

- `#/`
- `#/about`
- `#/clq`

## Placeholder Asset Strategy

All temporary imagery will be local SVG files using the same navy + gold design language as the current website. No stock-photo hotlinks and no third-party image dependency.

### Required Placeholder Assets

1. `assets/logo/laman-lestari-placeholder.svg`
   - Temporary navy/gold monogram/wordmark treatment.
   - Clearly a placeholder, not represented as the client's official final logo.

2. `assets/images/hero-home-placeholder.svg`
   - Wide abstract CLQ/corporate architectural composition for Home.

3. `assets/images/hero-about-placeholder.svg`
   - Wide corporate/leadership composition for About Us.

4. `assets/images/hero-clq-placeholder.svg`
   - Wide modular-building composition for the CLQ page.

5. `assets/images/person-placeholder.svg`
   - Branded neutral portrait silhouette for all Board and Management members.

6. `assets/images/project-placeholder.svg`
   - Branded modular-building/project illustration for all detailed CLQ project cards.

7. `assets/images/org-chart-placeholder.svg`
   - Decorative organisation-chart background/panel for Corporate Structure.
   - Actual role labels remain HTML text from the client source.

## Data and Component Behaviour

- Add placeholder asset paths to `siteConfig`.
- Every Board member and Management member initially uses `person-placeholder.svg`.
- Every detailed CLQ project initially uses `project-placeholder.svg`.
- Home, About and CLQ views use their own hero placeholder asset.
- Header and footer use the temporary local logo placeholder.
- Components retain defensive fallback behaviour if an image later fails to load.
- Replacing a placeholder with a real client asset should normally require changing only the relevant value in `js/data.js`, not component markup.

## Accessibility

- Person cards continue to expose the person's real name and role as HTML text.
- Placeholder images use concise contextual alt text.
- Decorative graphic details inside SVGs are not relied on to communicate client facts.
- No factual client content is embedded only inside an image.

## Testing and Verification

1. `index.html` contains the Vue Global Production CDN and Vue Router Global Production CDN scripts.
2. `index.html` no longer contains an import map.
3. `app.js` uses `Vue.createApp` rather than importing `createApp` from `vue`.
4. `router.js` uses `VueRouter.createWebHashHistory()`.
5. All Board/Management records point to a local person placeholder asset.
6. All detailed CLQ project records point to a local project placeholder asset.
7. All three page views reference the intended hero placeholder asset.
8. Every referenced local SVG file exists in the repository.
9. GitHub Pages remains configured as `main / (root)`.
10. After Pages republishes, the live site mounts the Vue app instead of remaining on `Loading Laman Lestari…`.

## Scope Exclusions

- No Vite/npm migration.
- No backend or CMS changes.
- No changes to client names, roles, CLQ figures, addresses, dates, mission statements or values.
- No claim that placeholder visuals are official final Laman Lestari branding.
- No third-party stock photography.
