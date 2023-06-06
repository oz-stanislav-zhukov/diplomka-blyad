<template>
  <div class="page_container">
    <div v-if="paid" class="page_content full">
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
    <div v-else class="page_content">
      <div class="page_content_right">
        <div class="InfoCard">
          <div class="InfoCard_title">{{ $t('store.order.payment') }}</div>
          <div v-if="message" class="InfoCard_error">{{ message }}</div>
          
          <div class="InfoCard_wrapper">
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('store.order.payment_type') }}</div>
              <div v-for="i in 2" :key="`c${i}`" @click="info.payment_type = i" class="InfoCard_row_card">
                <i :class="[`bi bi-${i == 1 ? 'credit-card-2-front' : 'cash'}`, {'primary': info.payment_type == i}]"></i>
                {{ $t(`store.order.payment_types.${i}`) }}
              </div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('store.order.shipping_type') }}</div>
              <div v-for="i in 2" :key="`c${i}`" @click="info.shipping_type = i" class="InfoCard_row_card">
                <i :class="[`bi bi-${i == 1 ? 'box' : 'truck'}`, {'primary': info.shipping_type == i}]"></i>
                {{ $t(`store.order.shipping_types.${i}`) }}
              </div>
            </div>
            <template v-if="info.shipping_type == 2">
              <div class="InfoCard_row">
                <div class="InfoCard_row_name">{{ $t('store.order.delivery_time') }}</div>
                <div v-for="i in 3" :key="`c${i}`" @click="info.delivery_time = i-1" class="InfoCard_row_card mini" :class="{'primary': info.delivery_time == i-1}">
                  {{ $t(`store.order.delivery_times.${i-1}`) }}
                </div>
              </div>
              <div class="InfoCard_row">
                <div class="InfoCard_row_name">{{ $t('store.order.delivery_address') }}</div>
                <input class="InfoCard_row_input2" v-model="info.delivery_address" type="text" maxlength="50" :placeholder="$t('store.order.enter_delivery_address')">
              </div>
            </template>
            <template v-else>
              <div class="InfoCard_row">
                <div class="InfoCard_row_name">{{ $t('store.order.pickup_in') }}</div>
                <div class="InfoCard_row_data">{{ about?.address ?? $t('general.loading') }}</div>
              </div>
            </template>
            <div class="InfoCard_row">
              <div @click="Pay" class="InfoCard_button">{{ $t('store.checkout') }}</div>
            </div>
          </div>
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
      paid: false,
      products_id: [],
      about: null,
      info: {
        delivery_time: 1,
        delivery_address: '',
        shipping_type: 1,
        payment_type: 1,
      },
    }
  },
  async created(){
    this.$PageController.pageSettings('Pay', 'pay');
    if(this.$user.phone.length < 10){
      window.alert(this.$t('store.messages.enter_phone'));
      this.$router.push('/profile');
      return;
    }

    this.loading = true;
    await this.GetCompanyInfo();
    this.loading = false;
  },
  methods: {
    async GetCompanyInfo(){
      let r = await this.$Api.query('info.getAbout', {}, { lang: this.$i18n.locale });
      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push('/error');
      this.about = r.response.about;
    },
    async Pay(){
      this.Message();
      if(this.loading) return;
      if(this.info.shipping_type == 1) this.info.delivery_address = this.about.address;
      if(this.info.delivery_address.length < 5) return this.Message(this.$t('store.order.enter_delivery_address'));
      this.products_data = [];

      this.$state.site.cart.products.forEach(product => {
        this.products_data.push(`${product.id}|${product.cart_count ? product.cart_count : 1}`);
      });

      let r = await this.$Api.query('store.pay', {}, { price: 0, cart_id: -1, products_data: this.products_data, info: JSON.stringify(this.info) });
      if(r.status != 'success') return this.$router.push('/error');
      this.paid = true;
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