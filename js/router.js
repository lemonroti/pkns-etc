import HomeView from './views/home-view.js';
import AboutView from './views/about-view.js';
import ClqView from './views/clq-view.js';

export const routes = [
  { path: '/', component: HomeView, meta: { title: 'Laman Lestari | Home' } },
  { path: '/about', component: AboutView, meta: { title: 'Laman Lestari | About Us' } },
  { path: '/clq', component: ClqView, meta: { title: 'Laman Lestari | Centralised Labour Quarters' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Laman Lestari';
});

export default router;
