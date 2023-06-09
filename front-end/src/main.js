/* Modules */
import { createApp } from 'vue'
import router from '@/modules/Router.js'
import '@/modules/ServiceWorker'
import mitt from 'mitt';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import VueMobileDetection from "vue-mobile-detection";
import Particles from "particles.vue3";
import VueScrollTo from "vue-scrollto";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Petrovich from 'petrovich'
import Translit from 'cyrillic-to-translit-js'

/* Modules */
import config from '@/config.js'
import state from '@/state.js'
import user from '@/userdata.js'

import { CryptoGenPublic, getHash, Encrypt, Decrypt } from "@/modules/Crypto.js"
import PageController from '@/modules/PageController.js'
import Language from '@/modules/Language.js'
import Functions from '@/modules/Functions.js'
import Storage from '@/modules/Storage.js'
import Device from '@/modules/Device.js'
import Debug from '@/modules/Debug.js'
import Store from '@/modules/Store.js'
import User from '@/modules/User.js'
import Api from '@/modules/Api.js'

/* Apps */
import App from '@/App.vue'

/* App Init */
const app = createApp(App);
app.use(router());
app.use(Language.setup());
app.use(VueAxios, axios);
app.use(VueMobileDetection);
app.use(Particles);
app.use(VueScrollTo);
app.component('VueDatePicker', VueDatePicker);
app.use(VueTippy, {
	directive: 'tippy', // => v-tippy
	component: 'tippy', // => <tippy/>
	componentSingleton: 'tippy-singleton',
	defaultProps: {
		placement: 'bottom',
		allowHTML: true,
	},
});

let isDesktop = PageController.isDesktop;
let isTablet = PageController.isTablet;
let isMobile = PageController.isMobile;

window.PageController = PageController;
app.config.globalProperties.$Crypto = {CryptoGenPublic, getHash, Encrypt, Decrypt};
app.config.globalProperties.$config = config;
app.config.globalProperties.$state = state;
app.config.globalProperties.$user = user;
app.config.globalProperties.$PageController = PageController;
app.config.globalProperties.$Petrovich = Petrovich;
app.config.globalProperties.$Translit = new Translit();
app.config.globalProperties.$Api = Api;
app.config.globalProperties.$User = User;
app.config.globalProperties.$Store = Store;
app.config.globalProperties.$Debug = Debug;
app.config.globalProperties.$Storage = Storage;
app.config.globalProperties.$Device = Device;
app.config.globalProperties.$Func = Functions;
app.config.globalProperties.$Lang = Language;
app.config.globalProperties.$vm = { isDesktop, isTablet, isMobile };
app.config.globalProperties.$event = mitt();
app.mount('#app');