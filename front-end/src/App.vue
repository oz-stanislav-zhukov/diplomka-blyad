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
import Header from '@/components/general/Header.vue'
import Footer from '@/components/general/Footer.vue'
import Loading from '@/pages/Loading.vue'
import SiteUnavailable from '@/pages/Error.vue'
import Particles from '@/components/effects/Particles.vue'
import ShimmerEffect from '@/components/effects/ShimmerEffect.vue'

var App = {
  name: 'App',
  async created() {
    this.$Debug.custom('Vue', 'Application initialization');
    this.$state.axios = this.axios;
    this.$state.$event = this.$event;
    this.$state.$route = this.$route;
    this.$state.$router = this.$router;
    this.$state.$t = this.$t;
    
    this.$Lang.created();
    this.$Debug.created();
    this.$Device.created();
    this.$Func.created();
    this.$PageController.created();
    await this.$User.Init();
    this.$Store.Init();
  },
  methods: {},
  mounted() {
    this.$state.loading = false;
    this.$state.page_loading = false;
    this.$Debug.custom('Vue', 'Application initialization finished');
  },
  watch: {
    $route: function () {
      this.$state.loading = true;
      this.$state.page_loading = true;
      this.$user.online = Math.floor(Date.now() / 1000);
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