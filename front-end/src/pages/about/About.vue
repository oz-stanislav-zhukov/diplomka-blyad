<template>
  <Loading v-if="loading" />
  <div v-else class="page_container">
    <div class="page_content">
      <AboutMenu />
      <div class="page_content_right">
        <CompanyPage v-if="typeof $route.params.page == 'undefined'" />
        <CompanyPage v-else-if="$route.params.page == 'company'" />
        <GuaranteePage v-else-if="$route.params.page == 'guarantee'" />
        <DeliveryPage v-else-if="$route.params.page == 'delivery'" />
        <CostumerHelpPage v-else-if="$route.params.page == 'costumer_help'" />
        <div v-else class="NotFound" style="margin: auto;">
          <div class="NotFound_title">404</div>
          <div class="NotFound_desc">{{ $t('header.titles.not_found') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/pages/Loading.vue'
import AboutMenu from '@/components/cards/AboutMenu.vue'

import CompanyPage from './Company.vue'
import GuaranteePage from './Guarantee.vue'
import DeliveryPage from './Delivery.vue'
import CostumerHelpPage from './CostumerHelp.vue'

export default {
  name: 'AboutPage',
  data(){
    return {
      loading: false
    }
  },
  async created(){
    this.$PageController.pageSettings('About', 'about');
  },
  methods: {
    
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    Loading,
    AboutMenu,

    CompanyPage,
    GuaranteePage,
    DeliveryPage,
    CostumerHelpPage,
  }
}
</script>

<style lang="scss">

</style>