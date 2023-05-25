<template>
  <template v-if="!loading">
    <div class="InfoCard">
      <div class="InfoCard_title">{{ $t('header.titles.products') }}</div>
      <div v-if="message" class="InfoCard_error">{{ message }}</div>
      
      <!--div class="InfoCard_wrapper">
        <div v-if="products.length > 0" class="InfoCard_list" style="margin-top: 0px;">
          <div v-for="product in products" :key="`i${product.id}`" class="InfoCard_row">
            <div class="InfoCard_row_data">
              <div class="InfoCard_row_data_info">
                {{ product.name[$i18n.locale] }}
                <span>{{ $tn('social.counter.money.kzt', product.price) }}</span>
              </div>
              <i @click="GoTo(product.public_id)" v-tippy="{size: 'small', placement: 'right', content: $t('store.go_to_product')}" class="bi bi-arrow-right green btn"></i>
            </div>
          </div>
        </div>
      </div-->
    </div>

    <div class="StoreBlock_content" style="margin-top: 20px;">
      <div v-if="loading" class="StoreBlock_cards">
        <Product v-for="i in 8" :key="`p${i}`" :loading="loading" />
      </div>
      <div v-else-if="products.length > 0" class="StoreBlock_cards">
        <Product v-for="(product, i) in products" :key="`p${i}`" :product="product" :loading="loading" :mini="true" :apanel="true"/>
      </div>
      <div v-else class="StoreBlock_cards center">
        <div class="StoreBlock_cards_message">{{ $t('store.messages.no_proudcts') }}</div>
      </div>
    </div>
  </template>
</template>

<script>
//import Context from '@/components/general/Context.vue'
import Product from '@/components/cards/Product.vue'

export default {
  name: 'CP_ProductsPage',
  data(){
    return {
      loading: false,
      message: '',
      products: [],
    }
  },
  async created(){
    if(!this.$User.isAdmin(2)) return this.$router.push('/cp');
    this.$PageController.pageSettings('CP_Products', 'products');
    this.UpdateProducts();
  },
  methods: {
    async UpdateProducts(){
      this.Message();
      this.products = [];
      let r = await this.$Api.query('store.getAllProducts', {}, { lang: this.$i18n.locale });
      if(r.status == 'success') this.products = r.response;
      if(this.products.length <= 0) this.Message(this.$t('store.messages.no_products'));
    },
    GoTo(public_id){
      this.$router.push(`/info?id=${public_id}`);
    },
    Message(text = ''){
      this.message = text;
    }
  },
  components: {
    //Context,
    Product
  }
}
</script>

<style lang="scss">

</style>