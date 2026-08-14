import{createApp}from'vue';
import router from'./router.js';
import SiteHeader from'./components/site-header.js';
import SiteFooter from'./components/site-footer.js';

const App={components:{SiteHeader,SiteFooter},template:`<div><site-header/><main id="main-content" tabindex="-1"><router-view/></main><site-footer/></div>`};
createApp(App).use(router).mount('#app');
