# Placeholder Assets + Vue Bootstrap Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `pkns-etc` boot reliably on GitHub Pages using the same Vue Global Production CDN pattern as the working `ukm-etc` repository, then replace all missing-image states with local Laman Lestari navy/gold placeholder assets.

**Architecture:** `index.html` loads Vue 3 and Vue Router 4 as global production scripts, while our own application files remain native ES modules. Shared content continues to live in `js/data.js`; local SVG placeholders are referenced from data and views so later client assets can replace them without component rewrites.

**Tech Stack:** HTML5, CSS3, native ES modules, Vue.js 3 Global Production CDN, Vue Router 4 Global Production CDN, GitHub Pages.

## Global Constraints

- Follow the proven `ukm-etc` runtime pattern: Vue global production CDN + Vue Router global production CDN + native modules for our own files.
- No import map.
- No Vite.
- No npm.
- No build step.
- GitHub Pages remains `main / (root)`.
- Router remains hash history.
- Client factual content must not change.
- Placeholder graphics are temporary, local, navy/gold, and must not be represented as official final client branding.
- No third-party stock-photo hotlinks.
- Placeholder replacement should normally require only changing paths in `js/data.js` or view props.
- All local paths remain relative for `/pkns-etc/` deployment.

---

## File Map

**Modify**
- `index.html` — remove import map; add global Vue/Vue Router production scripts.
- `js/app.js` — switch from imported `createApp` to `Vue.createApp`.
- `js/router.js` — switch from imported router functions to `VueRouter.*` globals.
- `js/components/site-header.js` — use Vue global composition helpers and temporary logo asset.
- `js/components/site-footer.js` — use temporary logo asset.
- `js/components/person-card.js` — keep fallback behavior but primarily render local placeholder image path.
- `js/components/project-card.js` — keep fallback behavior but primarily render local placeholder image path.
- `js/views/home-view.js` — pass Home hero placeholder.
- `js/views/about-view.js` — pass About hero placeholder and org-chart decorative placeholder.
- `js/views/clq-view.js` — pass CLQ hero placeholder.
- `js/data.js` — store placeholder paths for logo, hero assets, people, projects, org chart.
- `css/components.css` — style header/footer logo images and placeholder media consistently.
- `css/pages.css` — style org-chart placeholder visual.
- `tests/smoke.html` — mirror production CDN loading pattern.
- `tests/smoke.js` — add bootstrap and placeholder path checks.
- `README.md` — document UKM-style global CDN runtime.

**Create**
- `assets/logo/laman-lestari-placeholder.svg`
- `assets/images/hero-home-placeholder.svg`
- `assets/images/hero-about-placeholder.svg`
- `assets/images/hero-clq-placeholder.svg`
- `assets/images/person-placeholder.svg`
- `assets/images/project-placeholder.svg`
- `assets/images/org-chart-placeholder.svg`

---

### Task 1: Add failing smoke tests for the broken bootstrap and required placeholders

**Files:**
- Modify: `tests/smoke.html`
- Modify: `tests/smoke.js`

**Interfaces:**
- Produces regression checks that must fail on the current import-map implementation.

- [ ] **Step 1: Replace test-page import map with the same global CDN scripts expected in production**

Use:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/vue-router@4/dist/vue-router.global.prod.js"></script>
<script type="module" src="./smoke.js"></script>
```

- [ ] **Step 2: Add bootstrap assertions that currently fail against `index.html`**

Add tests equivalent to:

```js
await test('production shell uses Vue global production CDN', async () => {
  const html = await fetch('../index.html').then((response) => response.text());
  if (!html.includes('vue.global.prod.js')) throw new Error('Vue global production CDN missing');
  if (!html.includes('vue-router.global.prod.js')) throw new Error('Vue Router global production CDN missing');
  if (html.includes('type="importmap"')) throw new Error('Import map must be removed');
});
```

Add source checks:

```js
await test('application bootstrap uses browser globals', async () => {
  const app = await fetch('../js/app.js').then((response) => response.text());
  const router = await fetch('../js/router.js').then((response) => response.text());
  if (!app.includes('Vue.createApp')) throw new Error('Vue.createApp missing');
  if (!router.includes('VueRouter.createWebHashHistory')) throw new Error('VueRouter hash history missing');
});
```

- [ ] **Step 3: Add placeholder integrity checks that currently fail**

Import `siteConfig`, `boardMembers`, `managementTeam`, `clqProjects` and assert:

```js
await test('all temporary image-dependent content has local placeholder paths', () => {
  if (!siteConfig.assets?.logo?.startsWith('./assets/')) throw new Error('Logo placeholder missing');
  if (!siteConfig.assets?.heroHome?.startsWith('./assets/')) throw new Error('Home hero placeholder missing');
  if (!siteConfig.assets?.heroAbout?.startsWith('./assets/')) throw new Error('About hero placeholder missing');
  if (!siteConfig.assets?.heroClq?.startsWith('./assets/')) throw new Error('CLQ hero placeholder missing');
  if (boardMembers.some((person) => !person.image?.startsWith('./assets/'))) throw new Error('Board placeholder missing');
  if (managementTeam.some((person) => !person.image?.startsWith('./assets/'))) throw new Error('Management placeholder missing');
  if (clqProjects.some((project) => !project.image?.startsWith('./assets/'))) throw new Error('Project placeholder missing');
});
```

- [ ] **Step 4: Run the smoke page and confirm the new assertions fail for the expected reasons**

Expected failures:
- production shell still uses import map;
- `app.js` does not use `Vue.createApp`;
- `router.js` does not use `VueRouter.createWebHashHistory`;
- placeholder asset paths are absent/null.

- [ ] **Step 5: Commit the failing regression tests**

```bash
git add tests/smoke.html tests/smoke.js
git commit -m "test: cover global Vue bootstrap and placeholder assets"
```

---

### Task 2: Migrate runtime bootstrap to the proven `ukm-etc` global CDN pattern

**Files:**
- Modify: `index.html`
- Modify: `js/app.js`
- Modify: `js/router.js`
- Modify: `js/components/site-header.js`
- Test: `tests/smoke.html`, `tests/smoke.js`

**Interfaces:**
- Produces global `Vue` and `VueRouter` runtime usage.
- Keeps all existing route paths and hash routing unchanged.

- [ ] **Step 1: Remove import map and add global production scripts in `index.html`**

Replace the import-map block with:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/vue-router@4/dist/vue-router.global.prod.js"></script>
```

Keep:

```html
<script type="module" src="./js/app.js"></script>
```

- [ ] **Step 2: Change `js/app.js` to use `Vue.createApp`**

Remove:

```js
import { createApp } from 'vue';
```

Keep local imports for `router`, `SiteHeader`, and `SiteFooter`, then bootstrap with:

```js
const app = Vue.createApp(App);
app.use(router);
app.mount('#app');
```

- [ ] **Step 3: Change `js/router.js` to use `VueRouter` globals**

Remove Vue Router package imports and build router with:

```js
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
```

Preserve route definitions and `document.title` behavior.

- [ ] **Step 4: Remove package imports from `site-header.js`**

Replace imported helpers with global access:

```js
const { ref, watch } = Vue;
const { useRoute } = VueRouter;
```

Keep existing mobile-navigation behavior unchanged.

- [ ] **Step 5: Re-run smoke tests**

Expected: bootstrap assertions pass while placeholder-asset assertions still fail.

- [ ] **Step 6: Commit**

```bash
git add index.html js/app.js js/router.js js/components/site-header.js tests
git commit -m "fix: align Vue runtime with working GitHub Pages pattern"
```

---

### Task 3: Create local navy/gold branded SVG placeholder assets

**Files:**
- Create: `assets/logo/laman-lestari-placeholder.svg`
- Create: `assets/images/hero-home-placeholder.svg`
- Create: `assets/images/hero-about-placeholder.svg`
- Create: `assets/images/hero-clq-placeholder.svg`
- Create: `assets/images/person-placeholder.svg`
- Create: `assets/images/project-placeholder.svg`
- Create: `assets/images/org-chart-placeholder.svg`

**Interfaces:**
- Produces stable relative paths consumed by `js/data.js` and page views.

- [ ] **Step 1: Create the temporary logo SVG**

Use a compact 320×96 viewBox with navy background, gold `LL` monogram, and small `LAMAN LESTARI` text. Include an SVG `<title>` of `Laman Lestari temporary brand placeholder`.

- [ ] **Step 2: Create three distinct wide hero SVGs**

Each uses `viewBox="0 0 1600 900"`, navy base, gold accent geometry, and no factual client claims embedded in the artwork:

- Home: modular-building silhouettes + subtle grid.
- About: abstract leadership/people circles + structural lines.
- CLQ: modular building blocks + site-plan geometry.

Each includes a descriptive `<title>` containing the words `temporary placeholder`.

- [ ] **Step 3: Create person placeholder SVG**

Use `viewBox="0 0 800 900"`, neutral navy/gold portrait silhouette, with no real-person likeness.

- [ ] **Step 4: Create project placeholder SVG**

Use `viewBox="0 0 1200 750"`, modular-building illustration with navy/gold geometry.

- [ ] **Step 5: Create org-chart placeholder SVG**

Use `viewBox="0 0 1400 700"`, subtle node/connector pattern only. Do not embed the actual client names or roles because those remain semantic HTML.

- [ ] **Step 6: Verify each SVG is valid text SVG and uses only local/self-contained markup**

Expected: no external image hrefs, fonts, scripts, or network dependencies.

- [ ] **Step 7: Commit**

```bash
git add assets/logo assets/images
git commit -m "feat: add Laman Lestari temporary brand placeholders"
```

---

### Task 4: Wire placeholder assets through data and shared components

**Files:**
- Modify: `js/data.js`
- Modify: `js/components/site-header.js`
- Modify: `js/components/site-footer.js`
- Modify: `js/components/person-card.js`
- Modify: `js/components/project-card.js`
- Modify: `css/components.css`
- Test: `tests/smoke.js`

**Interfaces:**
- `siteConfig.assets` produces `logo`, `heroHome`, `heroAbout`, `heroClq`, `person`, `project`, `orgChart`.
- Every Board/Management `image` uses `siteConfig.assets.person` equivalent path.
- Every CLQ project `image` uses project placeholder path.

- [ ] **Step 1: Add `assets` to `siteConfig`**

Use exact relative values:

```js
assets: {
  logo: './assets/logo/laman-lestari-placeholder.svg',
  heroHome: './assets/images/hero-home-placeholder.svg',
  heroAbout: './assets/images/hero-about-placeholder.svg',
  heroClq: './assets/images/hero-clq-placeholder.svg',
  person: './assets/images/person-placeholder.svg',
  project: './assets/images/project-placeholder.svg',
  orgChart: './assets/images/org-chart-placeholder.svg',
}
```

- [ ] **Step 2: Assign local placeholder image paths to people and projects**

Use `./assets/images/person-placeholder.svg` for all Board and Management records.
Use `./assets/images/project-placeholder.svg` for all three detailed CLQ project records.

- [ ] **Step 3: Update SiteHeader brand markup**

Import `siteConfig`, replace the `LL` text block with:

```html
<img class="brand-logo" :src="siteConfig.assets.logo" alt="Laman Lestari temporary brand placeholder">
```

Keep the textual `Laman Lestari` brand name next to it.

- [ ] **Step 4: Update SiteFooter brand markup**

Render the same temporary logo with the same explicit placeholder alt text, while preserving current footer navigation/content.

- [ ] **Step 5: Keep defensive image fallback logic**

`PersonCard` and `ProjectCard` should still preserve their current fallback branches if the image value becomes null later; do not remove that resilience.

- [ ] **Step 6: Add CSS for `.brand-logo` and footer logo treatment**

Desktop target height: approximately 46–52px; mobile: 38–44px. Use `object-fit: contain` and avoid stretching.

- [ ] **Step 7: Re-run smoke tests**

Expected: data placeholder integrity test passes.

- [ ] **Step 8: Commit**

```bash
git add js/data.js js/components css/components.css tests/smoke.js
git commit -m "feat: wire temporary brand assets into shared content"
```

---

### Task 5: Add hero and organisation placeholder visuals to all views

**Files:**
- Modify: `js/views/home-view.js`
- Modify: `js/views/about-view.js`
- Modify: `js/views/clq-view.js`
- Modify: `css/pages.css`
- Modify: `tests/smoke.js`

**Interfaces:**
- Views consume `siteConfig.assets.heroHome`, `.heroAbout`, `.heroClq`, `.orgChart`.

- [ ] **Step 1: Add failing view-source checks**

Assert each view source references the correct asset key:

```js
await test('all public views reference their temporary hero assets', async () => {
  const home = await fetch('../js/views/home-view.js').then((response) => response.text());
  const about = await fetch('../js/views/about-view.js').then((response) => response.text());
  const clq = await fetch('../js/views/clq-view.js').then((response) => response.text());
  if (!home.includes('siteConfig.assets.heroHome')) throw new Error('Home hero asset missing');
  if (!about.includes('siteConfig.assets.heroAbout')) throw new Error('About hero asset missing');
  if (!clq.includes('siteConfig.assets.heroClq')) throw new Error('CLQ hero asset missing');
});
```

- [ ] **Step 2: Pass Home hero placeholder to `HeroSection`**

Add:

```html
:image="siteConfig.assets.heroHome"
```

- [ ] **Step 3: Pass About hero placeholder to `HeroSection`**

Add:

```html
:image="siteConfig.assets.heroAbout"
```

- [ ] **Step 4: Pass CLQ hero placeholder to `HeroSection`**

Import `siteConfig` into the CLQ view and add:

```html
:image="siteConfig.assets.heroClq"
```

- [ ] **Step 5: Add organisation placeholder visual without replacing semantic HTML**

Wrap the current HTML org structure in a branded visual container using:

```html
<img class="org-structure-visual" :src="siteConfig.assets.orgChart" alt="Laman Lestari temporary organisation visual">
```

Keep the existing role/name nodes as readable HTML below/over the visual.

- [ ] **Step 6: Style `.org-structure-visual` in `css/pages.css`**

Use full width, controlled max height, `object-fit: cover`, rounded corners, low visual dominance so client names/roles remain primary.

- [ ] **Step 7: Re-run smoke tests**

Expected: hero reference tests pass.

- [ ] **Step 8: Commit**

```bash
git add js/views css/pages.css tests/smoke.js
git commit -m "feat: add branded placeholder visuals across public pages"
```

---

### Task 6: Final deployment verification and documentation

**Files:**
- Modify: `README.md`
- Modify only files with verified defects found during validation.

**Interfaces:**
- GitHub Pages must remain `main / (root)`.

- [ ] **Step 1: Update README runtime documentation**

State:

```text
Runtime: Vue 3 Global Production CDN + Vue Router 4 Global Production CDN
Application code: native ES modules
Routing: Vue Router hash history
Build step: none
GitHub Pages: main / (root)
Placeholder assets: local SVGs under assets/; replace paths in js/data.js when final client assets arrive
```

- [ ] **Step 2: Run smoke test page**

Expected: all assertions display PASS.

- [ ] **Step 3: Verify no package imports remain for Vue/Vue Router**

Search production JS for:

```text
from 'vue'
from 'vue-router'
```

Expected: zero matches.

- [ ] **Step 4: Verify every referenced SVG path exists**

Check the exact seven paths defined in `siteConfig.assets`.

- [ ] **Step 5: Verify live GitHub Pages status after publish**

Expected configuration:

```text
Source: main
Path: /
HTTPS: enabled
```

Open `https://lemonroti.github.io/pkns-etc/` and verify:

- Vue app replaces the loading fallback.
- Home route renders.
- `#/about` renders.
- `#/clq` renders.
- Refreshing each hash route remains functional.
- Placeholder logo, hero, people, project, and org visuals render.

- [ ] **Step 6: Commit only if verification required fixes**

```bash
git add <verified-files>
git commit -m "fix: resolve final GitHub Pages placeholder verification issues"
```

---

## Plan Self-Review

### Spec coverage
- UKM-style Vue global production CDN runtime: Task 2.
- Removal of import map: Task 2.
- Hash routing preserved: Task 2 + Task 6.
- Seven local placeholder SVGs: Task 3.
- Logo/people/project data integration: Task 4.
- Three hero placeholders + org visual: Task 5.
- GitHub Pages live verification: Task 6.
- Client factual content unchanged: global constraint across all tasks.

### Placeholder scan
No implementation TODO/TBD items remain. The word `placeholder` is intentional because the feature itself is temporary brand imagery.

### Interface consistency
- `siteConfig.assets` is the canonical shared asset map.
- Views consume `siteConfig.assets.*`.
- People/project records contain actual renderable local image paths.
- Components retain null-image fallback behavior for future resilience.
