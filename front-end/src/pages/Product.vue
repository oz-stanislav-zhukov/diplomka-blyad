<template>
  <Loading v-if="loading || !product" />
  <div v-else class="page_container">
    <div class="page_content">
      <div class="StoreBlock">
        <div class="StoreBlock_right" @mouseleave="$PageController.CloseAllContexts()">
          <div v-if="product" class="StoreProduct_wrap_container">
            <div class="StoreProduct_container">
              <div class="StoreProduct_header">
                <div class="StoreProduct_meta">
                  <div v-if="product.is_sale || product.discount" class="StoreProduct_marks">
                    <div v-if="product.is_sale" class="ProductBlock_mark sale">{{ $t('store.sale') }}</div>
                    <div v-if="product.discount" class="ProductBlock_mark discount">{{ `-${product.discount}%` }}</div>
                  </div>
                  <div class="StoreProduct_name">{{ product.name[$i18n.locale] }}</div>
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
                  <div v-if="product.desc[$i18n.locale]" class="StoreProduct_row">
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
            <div class="PricePanel">
              <div class="PricePanel_header">
                <div class="PricePanel_text_vendor_code">{{ $t('store.vendor_code') }}: {{ product.id }}</div>
                <div class="PricePanel_text_low_price"><i class="bi bi-shield-check"></i> {{ $t('store.low_price_guarantee') }}</div>

              </div>
                
              <div class="StoreProduct_row">
                <div class="StoreProduct_row_name">{{ $t('store.price') }}</div>
                <div class="StoreProduct_price">
                  <span class="price">{{ GetPrice }} ₸</span> <span v-if="product.discount" class="old">{{ GetFullPrice }} ₸</span>
                </div>
              </div>
                
              <div class="PricePanel_row">
                <!--div class="PricePanel_row_data" v-html="$t('store.do_bonus', [Number($Func.genCode(4, true)).toLocaleString()])"></div-->
                <div class="PricePanel_row_data" v-html="$t('store.do_bonus', [GetBonus().toLocaleString()])"></div>
              </div>

              <div class="StoreProduct_buttons price">
                <a v-if="product.count < 1" class="StoreBlock_menu_button">
                  <i class="bi bi-cart"></i>
                  <div class="StoreBlock_menu_button_text">{{ $t('store.messages.no_in_stock') }}</div>
                </a>
                <router-link v-else-if="$Store.IsInCart(product)" to="/cart" class="StoreBlock_menu_button">
                  <i class="bi bi-cart"></i>
                  <div class="StoreBlock_menu_button_text">{{ $t('store.in_cart2') }}</div>
                </router-link>
                <a v-else @click="$Store.AddInCart(product)" class="StoreBlock_menu_button">
                  <i class="bi bi-cart"></i>
                  <div class="StoreBlock_menu_button_text">{{ $t('store.add_in_cart') }}</div>
                </a>
              </div>
                
              <div class="PricePanel_row">
                <div class="PricePanel_row_name"><i class="bi bi-box"></i> {{ $t('store.pickup') }}: <span>{{ `${GetDay()} ${$t(`social.date.month.${GetMonth()}.1`)}` }}</span></div>
                <div class="PricePanel_row_name"><i class="bi bi-truck"></i> {{ $t('store.delivery') }}: <span>{{ `${GetDay(1)} ${$t(`social.date.month.${GetMonth()}.1`)}` }}</span></div>
              </div>

            </div>
          </div>
          <div class="StoreProduct_container">
            <div class="ReviewCard">
              <div class="ReviewCard_title">{{ $t('info.reviews') }}</div>
              <div v-if="message" class="ReviewCard_message">{{ message }}</div>

              <div v-if="$User.isAuthed()" class="ReviewCard_send">
                <input class="ReviewCard_send_input" v-model="review.name" type="text" maxlength="50" :placeholder="$t('info.enter_name')">
                <textarea class="ReviewCard_send_textarea" v-model="review.text" type="text" maxlength="255" :placeholder="$t('info.enter_review')"></textarea>
                <div @click="AddReview" class="ReviewCard_send_button">{{ $t('info.send') }}</div>
              </div>

              <div v-if="reviews.length > 0" class="ReviewCard_wrapper">
                <Review v-for="review in reviews" :key="`r${review.id}`" :review="review" />
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
import Review from '@/components/cards/Review.vue'

export default {
  name: 'ProductPage',
  data(){
    return {
      loading: true,
      message: '',
      product: null,
      reviews: [],
      review: {
        name: '',
        text: ''
      }
    }
  },
  async created(){
    if(this.$route.params.id == undefined) this.$router.push('/');
    this.$PageController.pageSettings('Product', 'product');
    this.Update();
  },
  methods: {
    async Update(){
      this.loading = true;
      await this.GetProduct();
      await this.GetReviews();
      this.review.text = '';
      this.review.name = `${this.$user.first_name} ${this.$user.last_name}`;
      this.loading = false;
    },
    async GetProduct(){
      this.Message();
      this.product = null;
      let r = await this.$Api.query('store.getProduct', {}, { id: this.$route.params.id, lang: this.$i18n.locale });
      if(r.status == 'success') this.product = r.response;
    },
    async GetReviews(){
      let r = await this.$Api.query('info.getReviews', {}, { product_id: this.product.id, lang: this.$i18n.locale });
      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push('/error');
      this.reviews = r.response.reviews;
    },
    async AddReview(){
      if(this.review.text.length < 2) return this.Message(this.$t('info.enter_review'));
      let r = await this.$Api.query('info.addReview', {}, { product_id: this.product.id, name: this.review.name, text: this.review.text });
      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push('/error');
      this.Message(this.$t('info.messages.moderate_review'));
    },
    GetBonus(){
      return Number((((this.product.discount ? this.product.price - ((this.product.price / 100) * this.product.discount) : this.product.price) / 100) * (this.product.bonus_percentage ?? 5)).toFixed());
    },
    GetMonth(){
      return (new Date()).getMonth() + 1;
    },
    GetDay(days = 0){
      return (new Date()).getDate() + days;
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
    Loading,
    Review,
  }
}
</script>

<style lang="scss">
</style>