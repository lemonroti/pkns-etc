# Laman Lestari Website Design Specification

## 1. Goal

Build a responsive three-page corporate website for Laman Lestari that follows the client-supplied content, uses Laman Lestari's dark blue and gold branding, takes visual direction from the PKNS FM Integrated corporate website, and can be deployed directly from the `main` branch to GitHub Pages without a build step.

## 2. Confirmed Scope

The website is limited to three public pages:

1. Home
2. About Us
3. Centralised Labour Quarters (CLQ)

The implementation must support desktop, tablet, and mobile layouts.

Client-supplied text and images will be used. Domain purchase is excluded. Basic SEO, website testing, bug fixing, SSL, web server, domain/hosting configuration, basic user training, and website handover are part of the commercial requirement but this repository only covers the static front-end prototype/site implementation.

## 3. Source of Truth for Content

The content structure and copy must follow the client document `Laman Lestari Website-writeup -R1-11082026.docx`.

Do not invent project facts, directors, management members, CLQ statistics, addresses, completion dates, certifications, or company claims that are not present in that document.

Where the client document marks content as incomplete, such as Certification & Membership, the interface should present a neutral "Under Construction" state rather than fabricate content.

## 4. Visual Direction

### 4.1 Reference

The client provided the PKNS FM Integrated website as the design reference. The website should take inspiration from its corporate presentation style without duplicating its layout or branding.

### 4.2 Brand Direction

- Primary brand colour: dark navy blue.
- Accent colour: gold.
- Main background: white and light neutral surfaces.
- Tone: professional, modern, institutional, trustworthy.
- Photography: large project/property imagery with clean overlays.
- Typography: strong corporate headings, readable body text, generous spacing.
- UI treatment: subtle borders, restrained shadows, modern cards, clear section hierarchy.

### 4.3 Design Principles

- Corporate rather than startup-like.
- Visual hierarchy should remain strong even with long client copy.
- Avoid excessive animations.
- Use whitespace to keep long About Us content readable.
- Use cards and structured data blocks for projects, directors, management members, and values.
- Ensure colour contrast and visible focus states for accessibility.

## 5. Information Architecture

### 5.1 Global Navigation

- Home
- About Us
- Centralised Labour Quarters

A sticky or compact fixed header may be used if it does not obstruct content.

### 5.2 Footer

Footer should include:

- Laman Lestari name/logo area.
- Quick navigation links.
- Social links for Facebook, Instagram, and Threads where URLs are available.
- Copyright text.
- No invented contact information.

## 6. Page Design

## 6.1 Home

Purpose: quickly explain what Laman Lestari is, what it delivers, where its CLQ developments are located, and what values guide the company.

Sections:

1. Hero
   - Laman Lestari brand/name.
   - Concise project/company positioning based on client-supplied objective text.
   - Large background/project image when supplied.
   - Optional CTA linking to CLQ page.

2. Establishment Objective
   - Present the client's end-to-end TLQ/CLQ solution statement.
   - Highlight Act 446 compliance, PMC, IBS/modular accommodation, and facility management only as stated by the client.

3. Development Roadmap
   - Taman Perindustrian Puchong — Target Completion December 2026.
   - Pusat Bandar Puchong — Target Completion May 2027.
   - Bandar Sultan Sulaiman — Target Completion January 2028.
   - CLQ Serendah — Coming Soon.
   - CLQ Rawang — Coming Soon.
   - CLQ Shah Alam — Coming Soon.
   - Use a visual timeline or structured roadmap cards.

4. Core Values — C.R.E.I.S.S.I
   - Collaboration.
   - Respect.
   - Excellence.
   - Integrity.
   - Safety.
   - Sustainability.
   - Innovation.
   - Present as responsive cards or icon-led items.

5. Social / Closing CTA
   - Facebook.
   - Instagram.
   - Threads.
   - Only activate links once URLs are provided.

## 6.2 About Us

Purpose: communicate leadership, organisational structure, vision, mission, and corporate values.

Sections:

1. Page Hero / Intro.
2. Board of Directors.
   - Tn Hj Shamshul Bahari bin Ahmad — Chairman.
   - En Abdullah Hakim bin Hamzan — Director.
   - YB Paparaidu a/l Veraman — Director.
   - Pn Lenny Liana binti Kasman — Director.
   - Use photo cards when client images are supplied; otherwise use a neutral placeholder treatment.
3. Management Team.
   - Kamaruzain bin Kamisan — Chief Executive Officer.
   - Noor Amalia binti Talib — Assistant Manager – Planning & Contract.
   - Lutfi Ahmad bin Nordin — Assistant Manager – Project.
   - Nurul Adilah binti Ahmad Zaidi — Assistant Manager - Operation.
4. Corporate Structure.
   - Present supplied organisation chart image where available.
   - Do not infer vacant or filled roles beyond the supplied chart/content.
5. Vision.
6. Mission.
   - Seven mission statements supplied by the client.
7. Core Values.
8. Certification & Membership.
   - Show "Under Construction" until client content is available.

Long sections should use readable spacing and, where appropriate, collapsible or grouped presentation on mobile without hiding essential content from non-JavaScript users.

## 6.3 Centralised Labour Quarters (CLQ)

Purpose: present current and planned CLQ developments clearly and visually.

Sections:

1. Page Hero / CLQ introduction.
2. Active / planned project cards.

### Taman Perindustrian Puchong, Selangor
- Acreage: 3.45.
- Address: Jalan TPP 5/11, Taman Perindustrian Puchong, Mukim Petaling, Selangor Darul Ehsan.
- Pax: 2,560.
- Beds: 2,560.
- Target Completion: December 2026.

### Pusat Bandar Puchong, Selangor
- Acreage: 3.39.
- Address: Jalan Industri PBP 4, Taman Industri Pusat Bandar Puchong, 47100 Puchong, Mukim Petaling, Petaling Selangor.
- Pax: 2,240.
- Beds: 2,240.
- Target Completion: May 2027.

### Bandar Sultan Sulaiman, Klang
- Acreage: 4.35.
- Pax: 3,824.
- Beds: 3,824.
- Target Completion: January 2028.
- No address should be shown unless supplied by the client.

3. Coming Soon.
   - CLQ Serendah.
   - CLQ Rawang.
   - CLQ Shah Alam.

Project cards should support future client images without requiring structural code changes.

## 7. Technical Architecture

### 7.1 Stack

- HTML5.
- CSS3.
- JavaScript ES6+.
- Vue.js 3 loaded through CDN.
- Vue Router loaded through CDN.
- No Vite.
- No npm dependency installation.
- No build step.
- GitHub Pages deployment from `main` branch root.

### 7.2 Routing

Use Vue Router hash history so direct navigation and refresh work on GitHub Pages without server rewrite rules.

Routes:

- `/#/` → Home.
- `/#/about` → About Us.
- `/#/clq` → Centralised Labour Quarters.

Unknown routes should redirect to Home or show a small client-friendly 404 state that links back to Home.

### 7.3 Proposed Repository Structure

```text
pkns-etc/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── router.js
│   ├── components/
│   │   ├── site-header.js
│   │   ├── site-footer.js
│   │   ├── hero-section.js
│   │   ├── value-card.js
│   │   ├── person-card.js
│   │   └── project-card.js
│   └── views/
│       ├── home-view.js
│       ├── about-view.js
│       └── clq-view.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
├── tests/
│   └── smoke.html
└── docs/
    └── superpowers/
        ├── specs/
        └── plans/
```

Each file should have one clear responsibility. Shared site chrome and reusable content cards must be components rather than duplicated markup.

## 8. Data Design

Client-provided content should live in `js/data.js` as structured read-only data instead of being duplicated across view files.

Suggested top-level exports/objects:

- `siteConfig`.
- `roadmapProjects`.
- `coreValues`.
- `boardMembers`.
- `managementTeam`.
- `missions`.
- `clqProjects`.
- `comingSoonProjects`.

Views consume these data objects and render them through reusable components.

This keeps content edits separate from presentation logic and makes future migration to a CMS easier.

## 9. Component Boundaries

### SiteHeader
- Owns desktop/mobile navigation state.
- Emits/closes menu on route change.
- Highlights active route.

### SiteFooter
- Owns footer navigation and social-link presentation.

### HeroSection
- Reusable page hero with title, supporting copy, optional image, optional CTA.

### ValueCard
- Displays one C.R.E.I.S.S.I value and description.

### PersonCard
- Displays member image, name, and role.
- Handles missing image with a neutral fallback.

### ProjectCard
- Displays project location, image, status, acreage, address, pax, beds, and target completion where data exists.
- Must not render empty labels for missing fields.

## 10. Responsive Behaviour

Desktop:
- Full horizontal navigation.
- Multi-column project/value/person grids.
- Large hero media.

Tablet:
- Reduced grid columns and spacing.
- Navigation may collapse based on available width.

Mobile:
- Accessible hamburger navigation.
- Single-column or compact two-column cards where readable.
- Buttons and tap targets large enough for touch.
- Long text wraps without overflow.
- No horizontal scrolling at standard mobile widths.

## 11. Accessibility and UX Baseline

- Semantic landmarks: header, nav, main, section, footer.
- One H1 per route/view.
- Logical heading order.
- Meaningful alt text for client-supplied images.
- Decorative images use empty alt text.
- Keyboard-operable navigation.
- Visible focus indicators.
- Sufficient contrast between gold/navy/white combinations.
- Respect `prefers-reduced-motion` for non-essential motion.

## 12. SEO Baseline

Because this is a client-facing static prototype/site:

- Provide meaningful document title and default meta description in `index.html`.
- Update `document.title` per route.
- Provide canonical-friendly structure without inventing a final domain.
- Include Open Graph defaults only where safe and factual.
- Use semantic copy and heading hierarchy.

Advanced server-rendered SEO is out of scope for this CDN-based GitHub Pages implementation.

## 13. Error Handling and Degraded States

- Missing project images: show styled neutral placeholder, not broken image icons.
- Missing social URLs: render non-clickable labels or omit links.
- Missing CLQ field values: omit the row rather than show `undefined`, `null`, or blank labels.
- Unknown route: redirect to Home or provide a simple 404 state.
- Vue CDN failure: core `index.html` should still display a basic loading/fallback message explaining that the page could not load; no fabricated content should appear.

## 14. Testing Strategy

The implementation should be checked for:

1. Route smoke tests for Home, About Us, and CLQ.
2. Navigation active state and mobile menu behaviour.
3. No console errors on initial load or route changes.
4. All client-supplied content renders with correct spelling/numbers from the source document.
5. Missing optional fields do not create empty UI rows.
6. Responsive layout at representative desktop, tablet, and mobile widths.
7. Keyboard navigation and focus visibility.
8. No broken local asset paths when served from GitHub Pages repository subpath.
9. GitHub Pages refresh/navigation compatibility using hash routes.

## 15. GitHub Pages Constraint

The site must work when GitHub Pages is configured as:

- Source: Deploy from a branch.
- Branch: `main`.
- Folder: `/(root)`.

Therefore all local paths should be relative and must not assume the website is hosted at the root of a custom domain.

## 16. Out of Scope for This Front-End Build

Unless separately requested:

- CMS/admin panel.
- Database.
- Laravel backend.
- Contact form backend.
- Authentication.
- Paid analytics services.
- Domain purchase.
- Content writing beyond adapting supplied copy for layout.
- Translation.
- Fabricated certification/member content.
- Fabricated addresses or contact information.

## 17. Acceptance Criteria

The design is ready for implementation when:

- All three client-requested pages are represented.
- All client-supplied factual content has an intended display location.
- Visual direction is clearly defined as Laman Lestari dark blue/gold corporate design inspired by, but not copied from, PKNS FM Integrated.
- Vue 3 CDN + Vue Router CDN + hash routing is confirmed.
- Direct GitHub Pages deployment from `main / (root)` is preserved.
- No build tooling is required.
- Responsive, accessibility, basic SEO, error-state, and test expectations are explicit.
