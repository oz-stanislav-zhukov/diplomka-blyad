<template>
  <div class="page_container">
    <div class="page_content">
      <div class="StoreBlock">
        <div class="StoreBlock_right" @mouseleave="$PageController.CloseAllContexts()">
          <div class="StoreBlock_header" :class="{'seload': loading}">
            <div class="StoreBlock_header_icon">
              <i class="bi bi-cart"></i>
            </div>
            <div class="StoreBlock_header_meta">
              <div class="StoreBlock_hmeta_title">{{ $t('store.cart') }}</div>
              <div class="StoreBlock_hmeta_subtitle">{{ $tc('store.counters.products', $state.site.cart.products.length ?? 0) }}</div>
            </div>
            <div class="StoreBlock_header_buttons">
              <a @click="$Store.ClearCart()" class="StoreBlock_menu_button">
                <i class="bi bi-trash2"></i>
                <div class="StoreBlock_menu_button_text page_nomobile">{{ $t('store.claer') }}</div>
              </a>
              <a @click="Pay" class="StoreBlock_menu_button">
                <i class="bi bi-credit-card-2-front"></i>
                <div class="StoreBlock_menu_button_text page_nomobile">{{ $t('store.pay') }}</div>
              </a>
            </div>
          </div>

          <div v-if="$state.site.cart.products.length > 0 && !loading" class="CartInfo">
            <div class="CartInfo_row">
              <div class="CartInfo_row_name">{{ $t('store.products_in_cart') }}</div>
              <div class="CartInfo_row_data">{{ $state.site.cart.products.length ?? 0 }}</div>
            </div>
            <div class="CartInfo_row">
              <div class="CartInfo_row_name">{{ $t('store.itogo') }}</div>
              <div class="CartInfo_price">
                <span class="price">{{ GetAllPrice }} ₸</span> <span class="old">{{ GetAllFullPrice }} ₸</span>
              </div>
            </div>
          </div>

          <div class="StoreBlock_content">
            <div v-if="loading" class="StoreBlock_cards">
              <Product v-for="i in 1" :key="`p${i}`" :loading="loading" :mini="$state.page_state.width > 460" />
            </div>
            <div v-else-if="$state.site.cart.products.length > 0" class="StoreBlock_cards">
              <Product v-for="(product, i) in $state.site.cart.products" :key="`p${i}`" :product="product" :loading="loading" :mini="$state.page_state.width > 460" :in_cart="true" />
            </div>
            <div v-else class="StoreBlock_cards center">
              <div class="StoreBlock_cards_message">{{ $t('store.messages.no_proudcts') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/cards/Product.vue'

export default {
  name: 'CartPage',
  data(){
    return {
      loading: true,
      message: '',
      products: []
    }
  },
  async created(){
    this.$PageController.pageSettings('Cart', 'cart');
    this.loading = true;
    await this.UpdateProducts();
    this.loading = false;
  },
  methods: {
    async UpdateProducts(){
      this.Message();
      this.products = [];
      let r = await this.$Api.query('store.getProducts', {}, { lang: this.$i18n.locale });
      if(r.status == 'success') this.products = r.response;
    },
    Pay(){
      if(this.$state.site.cart.products.length < 1) return window.alert(this.$t('store.messages.cart_empty_pay'));
      this.$router.push('/pay');
    },
    Message(text = ''){
      this.message = text;
    }
  },
  computed: {
    GetAllPrice(){
      if(this.$state.site.cart.products.length < 1) return 0;

      let all_price = 0;
      this.$state.site.cart.products.forEach(product => {
        let price = product.discount ? product.price - ((product.price / 100) * product.discount) : product.price;
        all_price += price * product.cart_count;
      });
      return all_price.toLocaleString();
    },
    GetAllFullPrice(){
      if(this.$state.site.cart.products.length < 1) return 0;

      let all_price = 0;
      this.$state.site.cart.products.forEach(product => {
        all_price += product.price * product.cart_count;
      });
      return all_price.toLocaleString();
    },
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    Product
  }
}
</script>

<style lang="scss">
</style>