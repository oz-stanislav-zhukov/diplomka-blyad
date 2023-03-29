<template>
  <Particles v-if="!$vm.isMobile()"/>
  <ShimmerEffect />
  
  <Header ref="header"/>
  <router-view />
  <GDPR />
</template>

<script>
import { getCurrentInstance } from 'vue'
import Petrovich from 'petrovich'
import Translit from 'cyrillic-to-translit-js'

import config from '@/config.js'
import state from '@/state.js'
import user from '@/userdata.js'

import { CryptoGenPublic, getHash, Encrypt, Decrypt, SessionEncrypt, SessionDecrypt } from "@/modules/Crypto.js"
import PageController from '@/modules/PageController.js'
import { setLanguage, switchLang } from '@/modules/Language.js'
//import WebSocket from '@/modules/WebSocket.js'
import Functions from '@/modules/Functions.js'
import Storage from '@/modules/Storage.js'
import Device from '@/modules/Device.js'
import Debug from '@/modules/Debug.js'
import User from '@/modules/User.js'
import Api from '@/modules/Api.js'

import Header from '@/components/general/Header.vue'
import Particles from '@/components/effects/Particles.vue'
import ShimmerEffect from '@/components/effects/ShimmerEffect.vue'
import GDPR from '@/components/footers/GDPR.vue'

var App = {
  name: 'App',
  data (){
    if(config.debug.enabled) Debug.custom('Vue', 'Application initialization');
    if(Storage.isCookie('language')) Storage.set('language', Storage.getCookie('language'));
    if(Storage.is('language')) state.user_settings.language = Storage.get('language');
    setLanguage(this.$i18n, state.user_settings.language, false);
    return { }
  },
  provide() {
    const app = getCurrentInstance().appContext;
    let isDesktop = PageController.isDesktop;
    let isTablet = PageController.isTablet;
    let isMobile = PageController.isMobile;

    app.config.globalProperties.$Crypto = {CryptoGenPublic, getHash, Encrypt, Decrypt, SessionEncrypt, SessionDecrypt};
    app.config.globalProperties.$config = config;
    app.config.globalProperties.$state = state;
    app.config.globalProperties.$user = user;
    app.config.globalProperties.$App = this;
    app.config.globalProperties.$PageController = PageController;
    app.config.globalProperties.$Petrovich = Petrovich;
    app.config.globalProperties.$Translit = new Translit();
    app.config.globalProperties.$Api = Api;
    app.config.globalProperties.$User = User;
    app.config.globalProperties.$Debug = Debug;
    app.config.globalProperties.$Storage = Storage;
    app.config.globalProperties.$Device = Device;
    app.config.globalProperties.$Func = Functions;
    app.config.globalProperties.$Lang = { switchLang };
    app.config.globalProperties.$vm = { isDesktop, isTablet, isMobile };
    //app.config.globalProperties.$ws = WebSocket;
    return {
      $globals: getCurrentInstance().appContext.app.config.globalProperties
    }
  },
  created() {
    this.$event.on("api-error-authed", () => { this.$router.push('/logout'); });
    this.$event.on("change-state-authed", authed => { if(!authed) this.$router.push('/login'); });

    state.axios = this.axios;
    state.$event = this.$event;
    state.$route = this.$route;
    state.$router = this.$router;
    state.$i18n = this.$i18n;
    state.$t = this.$t;
    
    //console.log(this.$Crypto.Encrypt(config.apiData.client_key));
    //console.log(this.$Crypto.Encrypt(config.apiData.client_secret));
    
    Debug.created();
    Device.created();
    Functions.created();
    PageController.created();
    Api.createSession();
    User.Init();

    /*
    this.$event.on("event-name", param => {
      console.log(is);
    });

    this.$event.emit("event-name", "Hello");
    */

    /*WebSocket.eventSub('open', (event) => {
      Debug.success('EVENTER', event);
    });
    WebSocket.eventSub('message', (data) => {
      Debug.success('EVENTER2', data);
    });
    WebSocket.connect();
    WebSocket.emit('message', { s1: 's1', s2: 's2' });
    WebSocket.send('Name');*/

    this.$router.afterEach(() => { this.$PageController.subpageMounted(); });
  },
  methods: {},
  mounted() {
    state.loading = false;
    state.page_loading = false;

    if(config.debug.enabled) Debug.custom('Vue', 'Application initialization finished');
  },
  watch: {
    $route: function () {
      state.loading = true;
      state.page_loading = true;
      user.online = Math.floor(Date.now() / 1000);
    }
  },
  components: {
    Header,
    Particles,
    ShimmerEffect,
    GDPR,
  }
}

export default App;
</script>

<style lang="scss">
@import "@/assets/scss/_style.scss";
</style>