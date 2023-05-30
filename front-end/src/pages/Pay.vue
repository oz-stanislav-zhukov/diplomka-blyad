<template>
  <div class="page_container">
    <div class="page_content full">
      <div class="page_content_center">
        <div v-if="loading" class="NotFound">
          <div class="NotFound_title">{{ $t('header.titles.pay') }}</div>
        </div>
        <div v-else class="NotFound">
          <div class="NotFound_title">{{ $t('header.titles.paid') }}</div>
          <div class="NotFound_desc">{{ $t('store.messages.paid') }}</div>
          <router-link to="/" class="NotFound_button">{{ $t('header.menus.to_main') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayPage',
  data(){
    return {
      loading: true,
      message: '',
      products_id: [],
    }
  },
  async created(){
    this.$PageController.pageSettings('Pay', 'pay');
    this.loading = true;
    await this.Pay();
    this.loading = false;
  },
  methods: {
    async Pay(){
      this.Message();
      this.products_id = [];

      this.$state.site.cart.products.forEach(product => {
        this.products_id.push(product.id);
      });

      let r = await this.$Api.query('store.pay', {}, { price: 0, cart_id: -1, products_id: this.products_id });
      if(r.status != 'success') return this.$router.push('/error');
      this.$PageController.pageSettings('Pay', 'paid');
      this.$Store.ClearCart();
    },
    Message(text = ''){
      this.message = text;
    }
  },
  computed: {
    
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    
  }
}
</script>

<style lang="scss">
</style>