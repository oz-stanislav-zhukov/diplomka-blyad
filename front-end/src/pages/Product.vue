<template>
  <Loading v-if="loading || !product" />
  <div v-else class="page_container">
    <div class="page_content">
      <div class="StoreBlock">
        <div class="StoreBlock_right" @mouseleave="$PageController.CloseAllContexts()">
          <div v-if="product" class="StoreProduct_container">
            
            <div class="StoreProduct_header">
              <div class="StoreProduct_meta">
                <div v-if="product.is_sale || product.discount" class="StoreProduct_marks">
                  <div v-if="product.is_sale" class="ProductBlock_mark sale">{{ $t('store.sale') }}</div>
                  <div v-if="product.discount" class="ProductBlock_mark discount">{{ `-${product.discount}%` }}</div>
                </div>
                <div class="StoreProduct_name">{{ product.name[$i18n.locale] }}</div>
              </div>
              
              <div class="StoreProduct_buttons">
                <a v-if="product.count < 1" class="StoreBlock_menu_button">
                  <i class="bi bi-cart"></i>
                  <div class="StoreBlock_menu_button_text page_nomobile">{{ $t('store.messages.no_in_stock') }}</div>
                </a>
                <router-link v-else-if="$Store.IsInCart(product)" to="/cart" class="StoreBlock_menu_button">
                  <i class="bi bi-cart"></i>
                  <div class="StoreBlock_menu_button_text page_nomobile">{{ $t('store.in_cart2') }}</div>
                </router-link>
                <a v-else @click="$Store.AddInCart(product)" class="StoreBlock_menu_button">
                  <i class="bi bi-cart"></i>
                  <div class="StoreBlock_menu_button_text page_nomobile">{{ $t('store.add_in_cart') }}</div>
                </a>
              </div>
            </div>

            <div class="StoreProduct_content">
              <div class="StoreProduct_content_left">
                <div class="StoreProduct_wrapper">
                  <div class="StoreProduct_image_wrap">
                    <!--div class="StoreProduct_images"></div-->
                    <div class="StoreProduct_image" :style="`background-image: url(${product.image});`"></div>
                  </div>
                </div>
              </div>
              <div class="StoreProduct_content_right">
                <div class="StoreProduct_row">
                  <div class="StoreProduct_row_name">{{ $t('store.price') }}</div>
                  <div class="StoreProduct_price">
                    <span class="price">{{ GetPrice }} ₸</span> <span v-if="product.discount" class="old">{{ GetFullPrice }} ₸</span>
                  </div>
                </div>
                <div class="StoreProduct_row">
                  <div class="StoreProduct_row_name">{{ $t('store.desc') }}</div>
                  <div class="StoreProduct_row_data">{{ product.desc[$i18n.locale] }}</div>
                </div>
                <div class="StoreProduct_row">
                  <div class="StoreProduct_row_name">{{ $t('store.in_stock') }}</div>
                  <div class="StoreProduct_row_data">{{ product.count }} {{ $t('store.sht') }}</div>
                </div>
                <div class="StoreProduct_row">
                  <div class="StoreProduct_row_name">{{ $t('store.guarantee') }}</div>
                  <div class="StoreProduct_row_data">{{ $tc('store.counters.monthes', product.guarantee) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/pages/Loading.vue'

export default {
  name: 'ProductPage',
  data(){
    return {
      loading: true,
      message: '',
      product: null
    }
  },
  async created(){
    if(this.$route.params.id == undefined) this.$router.push('/');
    this.$PageController.pageSettings('Product', 'product');
    this.loading = true;
    await this.GetProduct();
    this.loading = false;
  },
  methods: {
    async GetProduct(){
      this.Message();
      this.product = null;
      let r = await this.$Api.query('store.getProduct', {}, { id: this.$route.params.id, lang: this.$i18n.locale });
      if(r.status == 'success') this.product = r.response;
    },
    Message(text = ''){
      this.message = text;
    }
  },
  computed: {
    GetPrice(){
      return (this.product.discount ? this.product.price - ((this.product.price / 100) * this.product.discount) : this.product.price).toLocaleString();
    },
    GetFullPrice(){
      return this.product.price.toLocaleString();
    },
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    Loading
  }
}
</script>

<style lang="scss">
</style>