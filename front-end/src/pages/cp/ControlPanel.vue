<template>
  <div class="page_container">
    <div v-if="!loading" class="page_content">
      <div class="page_content_left">
        <div class="MenuBlock">
          <div class="MenuBlock_content">
            <div class="MenuBlock_menu">
              <template v-for="(m, index) in $config.menus.cp.links" :key="`menu${index}`">
                <template v-if="$User.isAdmin(m.admin_lvl)">
                  <router-link v-if="!m.url" :to="m.page" class="MenuBlock_button">
                    <i v-if="m.icon" :class="m.icon"></i>
                    <div class="MenuBlock_button_text">{{ $t(`header.menus.${m.name}`) }}</div>
                  </router-link>
                  <a v-else :href="m.page" target="_blank" class="MenuBlock_button">
                    <i v-if="m.icon" :class="m.icon"></i>
                    <div class="MenuBlock_button_text">{{ $t(`header.menus.${m.name}`) }}</div>
                  </a>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="page_content_right" @mouseleave="$PageController.CloseAllContexts()">
        <InsurancePage v-if="typeof $route.params.page == 'undefined'" />
        <ProductPage v-else-if="$route.params.page == 'product'" :edit_product_id="$route.query.id ?? -1" />
        <ProductsPage v-else-if="$route.params.page == 'products'" />
        <CategoriesPage v-else-if="$route.params.page == 'categories'" />
        <ReviewsPage v-else-if="$route.params.page == 'reviews'" />
        <OrdersPage v-else-if="$route.params.page == 'orders'" />
        <div v-else class="NotFound">
          <div class="NotFound_title">404</div>
          <div class="NotFound_desc">{{ $t('header.titles.not_found') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesPage from './Cotegories.vue'
import OrdersPage from './Orders.vue'
import ReviewsPage from './Reviews.vue'
import ProductPage from './Product.vue'
import ProductsPage from './Products.vue'

export default {
  name: 'PageControlPanel',
  data(){
    return {
      loading: true,
      message: '',
    }
  },
  created(){
    if(!this.$User.isAdmin(1)) return this.$router.push('/');
    this.$PageController.pageSettings('ControlPanel', 'admin_panel');
    this.loading = false;
  },
  methods: {
    
    Message(text = ''){
      this.message = text;
    }
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    CategoriesPage,
    OrdersPage,
    ReviewsPage,
    ProductPage,
    ProductsPage,
  }
}
</script>

<style lang="scss">

</style>