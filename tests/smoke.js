import { siteConfig, coreValues, boardMembers, managementTeam, missions, clqProjects, comingSoonProjects } from '../js/data.js';
import { compactEntries, getInitials, getSafeExternalHref } from '../js/utils/content.js';
import ProjectCard from '../js/components/project-card.js';
import PersonCard from '../js/components/person-card.js';
import HomeView from '../js/views/home-view.js';
import AboutView from '../js/views/about-view.js';
import ClqView from '../js/views/clq-view.js';

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

async function source(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
  return response.text();
}

await test('index.html exposes #app mount point and skip link', async () => {
  const html = await source('../index.html');
  if (!html.includes('id="app"')) throw new Error('Missing #app mount');
  if (!html.includes('href="#main-content"')) throw new Error('Missing skip link');
});

await test('index uses repository-safe relative local paths', async () => {
  const html = await source('../index.html');
  if (/(?:href|src)="\/(?!\/)/.test(html)) throw new Error('Found root-absolute local path');
});

await test('production shell uses Vue global production CDN', async () => {
  const html = await source('../index.html');
  if (!html.includes('vue.global.prod.js')) throw new Error('Vue global production CDN missing');
  if (!html.includes('vue-router.global.prod.js')) throw new Error('Vue Router global production CDN missing');
  if (html.includes('type="importmap"')) throw new Error('Import map must be removed');
});

await test('application bootstrap uses browser globals', async () => {
  const app = await source('../js/app.js');
  const router = await source('../js/router.js');
  if (!app.includes('Vue.createApp')) throw new Error('Vue.createApp missing');
  if (!router.includes('VueRouter.createWebHashHistory')) throw new Error('VueRouter hash history missing');
});

await test('client content counts remain intact', () => {
  if (coreValues.length !== 7) throw new Error('Expected 7 core values');
  if (boardMembers.length !== 4) throw new Error('Expected 4 directors');
  if (managementTeam.length !== 4) throw new Error('Expected 4 management members');
  if (missions.length !== 7) throw new Error('Expected 7 mission statements');
  if (clqProjects.length !== 3) throw new Error('Expected 3 detailed CLQ projects');
  if (comingSoonProjects.length !== 3) throw new Error('Expected 3 coming-soon projects');
});

await test('all temporary image-dependent content has local placeholder paths', () => {
  if (!siteConfig.assets?.logo?.startsWith('./assets/')) throw new Error('Logo placeholder missing');
  if (!siteConfig.assets?.heroHome?.startsWith('./assets/')) throw new Error('Home hero placeholder missing');
  if (!siteConfig.assets?.heroAbout?.startsWith('./assets/')) throw new Error('About hero placeholder missing');
  if (!siteConfig.assets?.heroClq?.startsWith('./assets/')) throw new Error('CLQ hero placeholder missing');
  if (!siteConfig.assets?.orgChart?.startsWith('./assets/')) throw new Error('Organisation placeholder missing');
  if (boardMembers.some((person) => !person.image?.startsWith('./assets/'))) throw new Error('Board placeholder missing');
  if (managementTeam.some((person) => !person.image?.startsWith('./assets/'))) throw new Error('Management placeholder missing');
  if (clqProjects.some((project) => !project.image?.startsWith('./assets/'))) throw new Error('Project placeholder missing');
});

await test('optional project fields are removable', () => {
  const rows = compactEntries([['Address', null], ['Beds', 3824]]);
  if (rows.length !== 1 || rows[0][0] !== 'Beds') throw new Error('Optional field filtering failed');
});

await test('content helpers handle fallbacks safely', () => {
  if (getInitials('Kamaruzain bin Kamisan') !== 'KB') throw new Error('Initials helper failed');
  if (getSafeExternalHref('javascript:alert(1)') !== null) throw new Error('Unsafe URL accepted');
});

await test('reusable cards expose stable component names', () => {
  if (ProjectCard.name !== 'ProjectCard') throw new Error('ProjectCard name mismatch');
  if (PersonCard.name !== 'PersonCard') throw new Error('PersonCard name mismatch');
});

await test('mobile navigation exposes accessibility attributes', async () => {
  const header = await source('../js/components/site-header.js');
  if (!header.includes('aria-expanded') || !header.includes('aria-controls')) throw new Error('Mobile navigation aria attributes missing');
});

await test('views are available', () => {
  if (HomeView.name !== 'HomeView' || AboutView.name !== 'AboutView' || ClqView.name !== 'ClqView') throw new Error('Missing view');
});

await test('router keeps the three public paths plus fallback', async () => {
  const router = await source('../js/router.js');
  for (const path of ["path:'/'", "path:'/about'", "path:'/clq'", ':pathMatch']) {
    if (!router.includes(path)) throw new Error(`Missing route marker ${path}`);
  }
});

export { test };
