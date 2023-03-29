/* Modules */
import { createApp } from 'vue'
import { setupI18n } from '@/modules/Language.js'
import router from '@/modules/Router.js'
import '@/modules/ServiceWorker'
import mitt from 'mitt';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling
import VueMobileDetection from "vue-mobile-detection";
import Particles from "particles.vue3";
import VueScrollTo from "vue-scrollto";

/* App Modules */
import App from '@/App.vue'

/* App Init */
const app = createApp(App);
app.config.globalProperties.$event = mitt();
app.use(router());
app.use(setupI18n());
app.use(VueAxios, axios);
app.use(VueMobileDetection);
app.use(Particles);
app.use(VueScrollTo);
app.use(VueTippy, {
	directive: 'tippy', // => v-tippy
	component: 'tippy', // => <tippy/>
	componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
	defaultProps: {
		placement: 'bottom',
		allowHTML: true,
	},
});
app.mount('#app');