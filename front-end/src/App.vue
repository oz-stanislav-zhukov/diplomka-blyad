<template>
  <Particles v-if="!$vm.isMobile() && $config.visual.particles"/>
  <ShimmerEffect />
  
  <SiteUnavailable v-if="$state.unsupported_format" error_name="format_error" :show_button="false" :show_title="false"/>
  <template v-else>
    <Header ref="header"/>
    <Loading v-if="$state.user_loading"/>
    <router-view v-else/>
    <Footer />
  </template>
</template>

<script>
import { getCurrentInstance } from 'vue'
import Petrovich from 'petrovich'
import Translit from 'cyrillic-to-translit-js'

import config from '@/config.js'
import state from '@/state.js'
import user from '@/userdata.js'

import { CryptoGenPublic, getHash, Encrypt, Decrypt } from "@/modules/Crypto.js"
import PageController from '@/modules/PageController.js'
import { setLanguage, switchLang } from '@/modules/Language.js'
import Functions from '@/modules/Functions.js'
import Storage from '@/modules/Storage.js'
import Device from '@/modules/Device.js'
import Debug from '@/modules/Debug.js'
import User from '@/modules/User.js'
import Api from '@/modules/Api.js'

import Header from '@/components/general/Header.vue'
import Footer from '@/components/general/Footer.vue'
import Loading from '@/pages/Loading.vue'
import SiteUnavailable from '@/pages/Error.vue'
import Particles from '@/components/effects/Particles.vue'
import ShimmerEffect from '@/components/effects/ShimmerEffect.vue'

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

    window.PageController = PageController;
    app.config.globalProperties.$Crypto = {CryptoGenPublic, getHash, Encrypt, Decrypt};
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

    return {
      $globals: getCurrentInstance().appContext.app.config.globalProperties
    }
  },
  created() {
    state.axios = this.axios;
    state.$event = this.$event;
    state.$route = this.$route;
    state.$router = this.$router;
    state.$i18n = this.$i18n;
    state.$t = this.$t;
    
    Debug.created();
    Device.created();
    Functions.created();
    PageController.created();
    User.Init();
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
    Footer,
    Loading,
    SiteUnavailable,
    Particles,
    ShimmerEffect,
  }
}

export default App;
</script>

<style lang="scss">
@import "@/assets/scss/_style.scss";
</style>