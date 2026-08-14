const { ref, watch } = Vue;
const { useRoute } = VueRouter;

export default {
  name: 'SiteHeader',
  setup() {
    const isOpen = ref(false);
    const route = useRoute();

    watch(() => route.fullPath, () => {
      isOpen.value = false;
      document.body.classList.remove('nav-open');
    });

    function toggle() {
      isOpen.value = !isOpen.value;
      document.body.classList.toggle('nav-open', isOpen.value);
    }

    return { isOpen, toggle };
  },
  template: `<header class="site-header"><div class="container header-inner"><router-link class="brand" to="/" aria-label="Laman Lestari home"><span class="brand-mark">LL</span><span class="brand-copy"><strong>Laman Lestari</strong><small>Integrated CLQ Solutions</small></span></router-link><button class="nav-toggle" type="button" @click="toggle" :aria-expanded="String(isOpen)" aria-controls="primary-nav"><span class="visually-hidden">Toggle navigation</span><span></span><span></span><span></span></button><nav id="primary-nav" class="primary-nav" :class="{'is-open':isOpen}" aria-label="Primary navigation"><router-link to="/">Home</router-link><router-link to="/about">About Us</router-link><router-link to="/clq">Centralised Labour Quarters</router-link></nav></div></header>`,
};
