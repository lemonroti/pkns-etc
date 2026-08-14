# Laman Lestari Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a polished three-page Laman Lestari corporate website using Vue.js 3 and Vue Router from CDN/import-map sources, with no Vite, npm, build step, backend, or CMS.

**Architecture:** A single `index.html` hosts the Vue application and loads Vue/Vue Router from CDN through an import map. Native browser ES modules split data, reusable components, route views, and utilities into focused files. Vue Router uses hash history so GitHub Pages can serve all routes safely from `main / (root)` without rewrite rules.

**Tech Stack:** HTML5, CSS3, ES6 modules, Vue.js 3 CDN, Vue Router 4 CDN, GitHub Pages.

## Global Constraints

- Public pages are exactly: Home, About Us, Centralised Labour Quarters (CLQ).
- Client content follows `Laman Lestari Website-writeup -R1-11082026.docx`; do not invent factual business content.
- Visual direction: Laman Lestari dark navy + gold corporate identity, inspired by PKNS FM Integrated without copying its layout or branding.
- Responsive layouts must support desktop, tablet, and mobile.
- Vue.js 3 and Vue Router 4 must load from CDN; no Vite, no npm, no package manager, no bundler, no build step.
- GitHub Pages deployment source remains `main` branch and `/(root)`.
- Router must use hash history.
- Local paths must be relative so `/pkns-etc/` GitHub Pages subpath works.
- No CMS, database, Laravel backend, authentication, or server-side contact form.
- Missing optional client content must degrade cleanly; never show `undefined`, `null`, broken image icons, invented URLs, or invented addresses.
- Prefer semantic HTML, keyboard navigation, visible focus states, reduced-motion support, and sufficient colour contrast.

---

## File Map

### Root
- `index.html` — document shell, SEO defaults, import map, app mount point, fallback message, stylesheet entry points.
- `README.md` — concise project setup, architecture, route list, GitHub Pages deployment notes.

### CSS
- `css/variables.css` — design tokens: colours, spacing, radii, typography, shadows, container widths, transitions.
- `css/base.css` — reset/normalization, typography, semantic element defaults, utilities shared across all views.
- `css/components.css` — header, footer, hero, cards, roadmap, people grid, mission blocks, project statistics, placeholders.
- `css/responsive.css` — tablet/mobile breakpoints, mobile navigation, grid collapse, typography scaling.

### JavaScript
- `js/data.js` — all structured client-provided content and site configuration.
- `js/router.js` — route definitions, hash router, route titles, fallback route.
- `js/app.js` — application bootstrap and router mounting.
- `js/utils/content.js` — small pure helpers for optional field filtering, initials generation, and safe external-link handling.

### Components
- `js/components/site-header.js` — global header and accessible mobile menu.
- `js/components/site-footer.js` — global footer and social-link handling.
- `js/components/hero-section.js` — reusable hero/page banner.
- `js/components/value-card.js` — C.R.E.I.S.S.I value card.
- `js/components/person-card.js` — board/management person card with missing-image fallback.
- `js/components/project-card.js` — CLQ project card with optional fields omitted cleanly.

### Views
- `js/views/home-view.js` — Home page composition.
- `js/views/about-view.js` — About Us page composition.
- `js/views/clq-view.js` — CLQ page composition.

### Assets
- `assets/logo/` — client logo once available; do not fabricate a logo.
- `assets/images/` — client-supplied project/team imagery; initial implementation may include neutral CSS placeholders when images are absent.
- `assets/icons/` — only local non-brand decorative icons if required; prefer inline SVG where small and reusable.

### Tests
- `tests/smoke.html` — browser test harness.
- `tests/smoke.js` — dependency-free browser assertions for data integrity, helpers, route definitions, and optional-field behavior.

---

### Task 1: Create the browser shell and design-token foundation

**Files:**
- Create: `index.html`
- Create: `css/variables.css`
- Create: `css/base.css`
- Create: `tests/smoke.html`
- Create: `tests/smoke.js`

**Interfaces:**
- Produces: `#app` Vue mount point.
- Produces: import-map aliases `vue` and `vue-router`.
- Produces: CSS custom properties consumed by all later component styles.
- Produces: `window.test(name, fn)`-style lightweight smoke harness internal to `tests/smoke.js`.

- [ ] **Step 1: Write the initial failing smoke assertion**

Create `tests/smoke.html` with a simple results container and module script loading `tests/smoke.js`.

Create `tests/smoke.js` with an assertion that fetches `../index.html` and verifies the document contains an app mount element:

```js
const results = document.querySelector('#results');

function report(name, passed, error = '') {
  const item = document.createElement('li');
  item.textContent = `${passed ? 'PASS' : 'FAIL'} — ${name}${error ? `: ${error}` : ''}`;
  item.dataset.status = passed ? 'pass' : 'fail';
  results.append(item);
}

async function test(name, fn) {
  try {
    await fn();
    report(name, true);
  } catch (error) {
    report(name, false, error.message);
  }
}

await test('index.html exposes #app mount point', async () => {
  const html = await fetch('../index.html').then((response) => response.text());
  if (!html.includes('id="app"')) throw new Error('Missing #app mount');
});
```

- [ ] **Step 2: Verify the test fails before `index.html` exists**

Serve the repository with any static web server or open through GitHub Pages after commit. Expected: the assertion fails because `../index.html` does not yet expose the required shell.

- [ ] **Step 3: Implement `index.html` shell**

Include:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Laman Lestari provides integrated Centralised Labour Quarters development and operation solutions.">
  <title>Laman Lestari</title>
  <link rel="stylesheet" href="./css/variables.css">
  <link rel="stylesheet" href="./css/base.css">
  <link rel="stylesheet" href="./css/components.css">
  <link rel="stylesheet" href="./css/responsive.css">
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
        "vue-router": "https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.js"
      }
    }
  </script>
</head>
<body>
  <div id="app">
    <noscript>This website requires JavaScript to display the interactive site.</noscript>
    <p class="app-loading" aria-live="polite">Loading Laman Lestari…</p>
  </div>
  <script type="module" src="./js/app.js"></script>
</body>
</html>
```

- [ ] **Step 4: Add design tokens and base styles**

`css/variables.css` must define at minimum:

```css
:root {
  --color-navy-950: #081b2f;
  --color-navy-900: #0d2742;
  --color-navy-800: #153b60;
  --color-gold-600: #b88a2a;
  --color-gold-500: #c9a24b;
  --color-gold-100: #f5ecd6;
  --color-white: #ffffff;
  --color-surface: #f6f7f9;
  --color-text: #17202a;
  --color-muted: #667085;
  --color-border: #d9dee5;
  --container: 1180px;
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --shadow-card: 0 14px 40px rgba(8, 27, 47, 0.08);
  --transition-fast: 180ms ease;
}
```

`css/base.css` must include box-sizing, body typography, container utility, link/button focus states, image sizing, visually-hidden utility, and `prefers-reduced-motion` handling.

- [ ] **Step 5: Re-run smoke test**

Expected: `index.html exposes #app mount point` passes.

- [ ] **Step 6: Commit**

```bash
git add index.html css/variables.css css/base.css tests/smoke.html tests/smoke.js
git commit -m "feat: add Laman Lestari app shell and design tokens"
```

---

### Task 2: Model all client-provided content as structured data

**Files:**
- Create: `js/data.js`
- Create: `js/utils/content.js`
- Modify: `tests/smoke.js`

**Interfaces:**
- Produces named exports: `siteConfig`, `roadmapProjects`, `coreValues`, `boardMembers`, `managementTeam`, `missions`, `clqProjects`, `comingSoonProjects`.
- Produces `compactEntries(entries)` returning only entries whose values are not `null`, `undefined`, or empty string.
- Produces `getInitials(name)` for missing person-photo fallback.
- Produces `getSafeExternalHref(url)` returning valid `http:`/`https:` URLs or `null`.

- [ ] **Step 1: Add failing data-integrity tests**

Add module imports and assertions:

```js
import {
  coreValues,
  boardMembers,
  managementTeam,
  missions,
  clqProjects,
  comingSoonProjects,
} from '../js/data.js';
import { compactEntries, getInitials, getSafeExternalHref } from '../js/utils/content.js';

await test('client content counts remain intact', () => {
  if (coreValues.length !== 7) throw new Error('Expected 7 core values');
  if (boardMembers.length !== 4) throw new Error('Expected 4 directors');
  if (managementTeam.length !== 4) throw new Error('Expected 4 management members');
  if (missions.length !== 7) throw new Error('Expected 7 mission statements');
  if (clqProjects.length !== 3) throw new Error('Expected 3 detailed CLQ projects');
  if (comingSoonProjects.length !== 3) throw new Error('Expected 3 coming-soon projects');
});

await test('optional project fields are removable', () => {
  const rows = compactEntries([['Address', null], ['Beds', 3824]]);
  if (rows.length !== 1 || rows[0][0] !== 'Beds') throw new Error('Optional field filtering failed');
});
```

- [ ] **Step 2: Verify tests fail because modules do not exist**

Expected: module-loading failure for `js/data.js` or `js/utils/content.js`.

- [ ] **Step 3: Implement pure content helpers**

Use exact behavior:

```js
export function compactEntries(entries) {
  return entries.filter(([, value]) => value !== null && value !== undefined && value !== '');
}

export function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function getSafeExternalHref(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Implement `js/data.js` from the approved source copy**

Represent every factual value exactly as supplied. For Bandar Sultan Sulaiman, set `address: null` so no invented address renders. Social links remain `null` until provided. Certification remains `status: 'Under Construction'`.

- [ ] **Step 5: Re-run smoke tests**

Expected: data counts and helper behavior pass.

- [ ] **Step 6: Commit**

```bash
git add js/data.js js/utils/content.js tests/smoke.js
git commit -m "feat: model Laman Lestari client content"
```

---

### Task 3: Build reusable global components

**Files:**
- Create: `js/components/site-header.js`
- Create: `js/components/site-footer.js`
- Create: `js/components/hero-section.js`
- Create: `js/components/value-card.js`
- Create: `js/components/person-card.js`
- Create: `js/components/project-card.js`
- Create: `css/components.css`
- Modify: `tests/smoke.js`

**Interfaces:**
- `SiteHeader` consumes Vue Router links and exposes accessible mobile-menu state.
- `SiteFooter` consumes `siteConfig`.
- `HeroSection` props: `eyebrow`, `title`, `description`, `image`, `ctaLabel`, `ctaTo`, `compact`.
- `ValueCard` prop: `value` object `{ name, description }`.
- `PersonCard` prop: `person` object `{ name, role, image }`.
- `ProjectCard` prop: `project` object with optional `address`, `image`, and required project metadata.

- [ ] **Step 1: Add failing helper/component-shape tests**

Test that imported components have names and that `ProjectCard` receives optional field data without requiring an address.

```js
import ProjectCard from '../js/components/project-card.js';
import PersonCard from '../js/components/person-card.js';

await test('reusable cards expose stable component names', () => {
  if (ProjectCard.name !== 'ProjectCard') throw new Error('ProjectCard name mismatch');
  if (PersonCard.name !== 'PersonCard') throw new Error('PersonCard name mismatch');
});
```

- [ ] **Step 2: Verify tests fail before components exist**

Expected: module-loading failures.

- [ ] **Step 3: Implement components using Vue template objects**

Example `ProjectCard` shape:

```js
import { compactEntries } from '../utils/content.js';

export default {
  name: 'ProjectCard',
  props: { project: { type: Object, required: true } },
  computed: {
    details() {
      return compactEntries([
        ['Acreage', this.project.acreage],
        ['Address', this.project.address],
        ['Pax', this.project.pax],
        ['Beds', this.project.beds],
        ['Target Completion', this.project.targetCompletion],
      ]);
    },
  },
  template: `...`,
};
```

For `PersonCard`, use CSS placeholder plus `getInitials()` when `image` is absent; do not use remote stock headshots.

For `SiteHeader`, menu button must include `aria-expanded`, `aria-controls`, and a visible text label via `.visually-hidden`.

- [ ] **Step 4: Add component styling**

Implement navy/gold header, modern cards, subtle shadows, restrained hover lift, value grid, people grid, project detail rows, image placeholders, footer, and hero overlay. All hover motion must be disabled/reduced under `prefers-reduced-motion`.

- [ ] **Step 5: Re-run smoke tests**

Expected: component exports pass.

- [ ] **Step 6: Commit**

```bash
git add js/components css/components.css tests/smoke.js
git commit -m "feat: add reusable corporate website components"
```

---

### Task 4: Build the Home page

**Files:**
- Create: `js/views/home-view.js`
- Modify: `tests/smoke.js`

**Interfaces:**
- Consumes `roadmapProjects`, `coreValues`, `siteConfig`.
- Consumes `HeroSection`, `ValueCard`.
- Produces Vue component `HomeView`.

- [ ] **Step 1: Add failing Home view export test**

```js
import HomeView from '../js/views/home-view.js';

await test('Home view is available', () => {
  if (HomeView.name !== 'HomeView') throw new Error('HomeView missing');
});
```

- [ ] **Step 2: Verify test fails**

Expected: missing module.

- [ ] **Step 3: Implement Home view**

Compose, in order:

1. Hero with factual Laman Lestari positioning.
2. Establishment Objective section.
3. Roadmap timeline/cards for six locations/statuses.
4. C.R.E.I.S.S.I seven-card section.
5. Closing social/follow-us section that omits inactive URLs.

Keep supplied wording intact except for short headings and CTA labels. Do not invent a slogan.

- [ ] **Step 4: Re-run smoke tests**

Expected: Home view export passes.

- [ ] **Step 5: Commit**

```bash
git add js/views/home-view.js tests/smoke.js
git commit -m "feat: build Laman Lestari home page"
```

---

### Task 5: Build the About Us page

**Files:**
- Create: `js/views/about-view.js`
- Modify: `tests/smoke.js`

**Interfaces:**
- Consumes `boardMembers`, `managementTeam`, `missions`, `coreValues`, and certification state.
- Consumes `HeroSection`, `PersonCard`, `ValueCard`.
- Produces Vue component `AboutView`.

- [ ] **Step 1: Add failing About view export test**

```js
import AboutView from '../js/views/about-view.js';

await test('About view is available', () => {
  if (AboutView.name !== 'AboutView') throw new Error('AboutView missing');
});
```

- [ ] **Step 2: Verify test fails**

Expected: missing module.

- [ ] **Step 3: Implement About view**

Sections:

1. Page hero.
2. Vision.
3. Seven mission items.
4. Board of Directors cards.
5. Management Team cards.
6. Corporate Structure section using a neutral diagram treatment until supplied chart image is present; if a client chart asset is available later, render that image with descriptive alt text.
7. Core Values.
8. Certification & Membership — explicit `Under Construction` state.

Do not invent biographies.

- [ ] **Step 4: Re-run smoke tests**

Expected: About view export passes.

- [ ] **Step 5: Commit**

```bash
git add js/views/about-view.js tests/smoke.js
git commit -m "feat: build Laman Lestari about page"
```

---

### Task 6: Build the CLQ page

**Files:**
- Create: `js/views/clq-view.js`
- Modify: `tests/smoke.js`

**Interfaces:**
- Consumes `clqProjects`, `comingSoonProjects`.
- Consumes `HeroSection`, `ProjectCard`.
- Produces Vue component `ClqView`.

- [ ] **Step 1: Add failing CLQ view export test**

```js
import ClqView from '../js/views/clq-view.js';

await test('CLQ view is available', () => {
  if (ClqView.name !== 'ClqView') throw new Error('ClqView missing');
});
```

- [ ] **Step 2: Verify test fails**

Expected: missing module.

- [ ] **Step 3: Implement CLQ view**

Sections:

1. CLQ page hero.
2. Three detailed project cards.
3. Coming Soon section for Serendah, Rawang, Shah Alam.

Ensure Bandar Sultan Sulaiman does not render an Address row because the source document does not provide one.

- [ ] **Step 4: Re-run smoke tests**

Expected: CLQ view export passes.

- [ ] **Step 5: Commit**

```bash
git add js/views/clq-view.js tests/smoke.js
git commit -m "feat: build centralised labour quarters page"
```

---

### Task 7: Wire routing, application layout, titles, and route fallback

**Files:**
- Create: `js/router.js`
- Create: `js/app.js`
- Modify: `tests/smoke.js`

**Interfaces:**
- `router` default export from `js/router.js`.
- Routes: `/`, `/about`, `/clq`, catch-all redirect `/`.
- `app.js` mounts to `#app` and composes `SiteHeader`, `<router-view>`, `SiteFooter`.

- [ ] **Step 1: Add failing route-shape test**

Export route metadata separately for testability:

```js
import { routes } from '../js/router.js';

await test('router contains exactly three public routes plus fallback', () => {
  const publicPaths = routes.filter((route) => !route.path.includes(':pathMatch')).map((route) => route.path);
  const expected = ['/', '/about', '/clq'];
  if (JSON.stringify(publicPaths) !== JSON.stringify(expected)) {
    throw new Error(`Unexpected routes: ${publicPaths.join(', ')}`);
  }
});
```

- [ ] **Step 2: Verify test fails**

Expected: missing router module.

- [ ] **Step 3: Implement hash router**

```js
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './views/home-view.js';
import AboutView from './views/about-view.js';
import ClqView from './views/clq-view.js';

export const routes = [
  { path: '/', component: HomeView, meta: { title: 'Laman Lestari | Home' } },
  { path: '/about', component: AboutView, meta: { title: 'Laman Lestari | About Us' } },
  { path: '/clq', component: ClqView, meta: { title: 'Laman Lestari | Centralised Labour Quarters' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; },
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Laman Lestari';
});

export default router;
```

- [ ] **Step 4: Implement app layout and mount**

Use `createApp`, install router, register/import global chrome, mount to `#app`. The application template must contain `<site-header />`, `<main id="main-content"><router-view /></main>`, and `<site-footer />`.

- [ ] **Step 5: Re-run smoke tests**

Expected: route-shape test passes.

- [ ] **Step 6: Commit**

```bash
git add js/router.js js/app.js tests/smoke.js
git commit -m "feat: wire Vue hash routing and app layout"
```

---

### Task 8: Add responsive behavior and accessibility polish

**Files:**
- Create: `css/responsive.css`
- Modify: `css/base.css`
- Modify: `css/components.css`
- Modify: `js/components/site-header.js`
- Modify: `tests/smoke.js`

**Interfaces:**
- Header mobile-menu breakpoint aligns with CSS breakpoint.
- No horizontal overflow at 320px width.
- Menu closes after selecting a route.

- [ ] **Step 1: Add static accessibility smoke checks**

Extend tests to fetch/inspect component source or the mounted DOM when run via the test harness, checking that header includes `aria-expanded`, `aria-controls`, and that the app shell includes `<main`.

- [ ] **Step 2: Verify new checks fail if required accessibility attributes are missing**

Expected: at least one failure before polish.

- [ ] **Step 3: Implement responsive CSS**

Required breakpoints:

```css
@media (max-width: 960px) { /* tablet */ }
@media (max-width: 720px) { /* mobile nav + stacked sections */ }
@media (max-width: 480px) { /* compact spacing/type */ }
```

Ensure:

- grids collapse from 3/4 columns to 2 then 1;
- long addresses wrap;
- hero height is reduced on small screens;
- mobile menu is full-width and keyboard accessible;
- tap targets are at least approximately 44px high;
- no text or cards overflow horizontally.

- [ ] **Step 4: Implement accessibility fixes**

Add skip-to-content link, focus-visible styles, semantic section labels, `aria-current` through RouterLink active state where appropriate, and body scroll handling while mobile nav is open only if it does not trap keyboard users.

- [ ] **Step 5: Re-run smoke checks and manually inspect representative widths**

Representative widths: 1440, 1024, 768, 390, 320.

Expected: no console errors, no horizontal scrolling, navigation remains usable.

- [ ] **Step 6: Commit**

```bash
git add css js/components/site-header.js tests/smoke.js
git commit -m "fix: polish responsive and accessible interactions"
```

---

### Task 9: Add SEO metadata, GitHub Pages path checks, and documentation

**Files:**
- Modify: `index.html`
- Modify: `js/router.js`
- Modify: `README.md`
- Modify: `tests/smoke.js`

**Interfaces:**
- Route titles update `document.title`.
- All local resources use `./` or relative paths.
- README documents `main / (root)` Pages configuration.

- [ ] **Step 1: Add failing deployment-path assertions**

Test fetched `index.html` for forbidden root-absolute local paths such as `href="/css/` or `src="/js/`.

- [ ] **Step 2: Verify failure if any root-absolute local path exists**

Expected: FAIL until all paths are relative.

- [ ] **Step 3: Finalize default SEO metadata**

Keep claims factual and conservative. Do not add a canonical URL until the final production domain is known.

- [ ] **Step 4: Rewrite README**

Include:

```text
Project: Laman Lestari corporate website
Stack: Vue 3 CDN + Vue Router 4 CDN + native ES modules
Build step: none
Routes: #/, #/about, #/clq
GitHub Pages: Settings → Pages → Deploy from a branch → main → /(root)
Local preview: serve the repository over HTTP; do not rely on file:// because ES modules have browser security restrictions.
```

Also mention where client images/logo should be placed.

- [ ] **Step 5: Run smoke test suite**

Expected: every test reports PASS.

- [ ] **Step 6: Commit**

```bash
git add index.html js/router.js README.md tests/smoke.js
git commit -m "docs: finalize SEO and GitHub Pages deployment"
```

---

### Task 10: Final content and deployment verification

**Files:**
- Review all implementation files.
- Modify only files with verified defects.

**Interfaces:**
- Production URL should resolve to the GitHub Pages site for `lemonroti/pkns-etc` once Pages finishes publishing.

- [ ] **Step 1: Source-content audit**

Compare rendered/data copy against the client document for:

- 4 Board members.
- 4 Management members.
- 7 C.R.E.I.S.S.I values.
- 7 mission statements.
- 3 detailed CLQ projects.
- 3 Coming Soon projects.
- Acreages, pax, beds, addresses, and target completion dates.

Do not silently correct client terminology during this audit.

- [ ] **Step 2: Functional audit**

Verify:

- Home → About → CLQ navigation.
- Browser refresh on each hash route.
- Unknown hash route redirects Home.
- Mobile menu opens, closes, and closes after navigation.
- Active link styling follows current route.
- Missing image states are styled placeholders.
- Missing social URLs do not create dead `href` values.

- [ ] **Step 3: Console and asset audit**

Expected:

- No JavaScript exceptions.
- No 404 for local CSS/JS assets.
- No broken local images.
- Vue/Vue Router CDN scripts/modules load successfully.

- [ ] **Step 4: Responsive audit**

Check 1440, 1024, 768, 390, and 320 widths. Confirm no horizontal overflow and readable spacing.

- [ ] **Step 5: GitHub Pages audit**

Confirm repository Pages configuration remains:

```text
Source: Deploy from a branch
Branch: main
Folder: /(root)
```

Then verify the live URL loads the Home page and hash routes work.

- [ ] **Step 6: Final fix commit only if verification finds defects**

```bash
git add <verified-fix-files>
git commit -m "fix: resolve final Laman Lestari site verification issues"
```

---

## Plan Self-Review

### Spec coverage
- Three-page scope: Tasks 4–6.
- Client content source: Task 2 + Task 10 audit.
- Dark navy/gold corporate design: Tasks 1 and 3.
- PKNS FMI-inspired but original presentation: component/page composition in Tasks 3–6.
- Vue CDN and no build step: Tasks 1 and 7.
- Hash routing/GitHub Pages: Tasks 7, 9, 10.
- Responsive behavior: Task 8.
- Accessibility: Tasks 1, 3, 8.
- Basic SEO: Tasks 7 and 9.
- Missing-content/error states: Tasks 2, 3, 10.
- Testing: browser smoke tests incrementally maintained throughout, final audit Task 10.

### Placeholder scan
No `TBD`, `TODO`, or implementation placeholders are permitted in production files. Neutral visual placeholders are allowed only for genuinely missing client images/content and must be intentionally styled.

### Interface consistency
- All views are default-exported Vue component objects with stable `name` fields.
- `router.js` exports both named `routes` and default `router`.
- Data exports are named and shared rather than duplicated in views.
- Optional-field behavior is centralized in `compactEntries()`.
