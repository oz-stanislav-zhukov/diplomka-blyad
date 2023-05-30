<template>
  <div v-if="!product || loading" class="ProductBlock seload" :class="{'mini': mini}"></div>
  <div v-else class="ProductBlock" :class="{'mini': mini}" @click="GoToInfo">
    <div class="ProductBlock_cover">
      <div class="ProductBlock_image" :style="`background-image: url('${product.image}');`">
        
      </div>
      <div class="ProductBlock_marks">
        <div v-if="product.is_sale" class="ProductBlock_mark sale">{{ $t('store.sale') }}</div>
        <div v-if="product.discount" class="ProductBlock_mark discount">{{ `-${product.discount}%` }}</div>
      </div>
    </div>
    <div class="ProductBlock_wrapper">
      <div class="ProductBlock_meta">
        <div class="ProductBlock_name">
          {{ product.name[$i18n.locale] }}
        </div>
        <div v-if="in_cart && product.cart_count" class="ProductBlock_price">
          <span class="price">{{ GetPriceCounted }} ₸</span> <span v-if="product.discount" class="old" :class="{'page_nomobile': apanel}">{{ GetFullPriceCounted }} ₸</span>
        </div>
        <div v-else class="ProductBlock_price">
          <span class="price">{{ GetPrice }} ₸</span> <span v-if="product.discount" class="old" :class="{'page_nomobile': apanel}">{{ GetFullPrice }} ₸</span>
        </div>
        <!--div class="ProductBlock_price">
          {{ $t('store.price') }}: <span class="price">{{ $tc('social.counter.money.kzt', 500) }}</span> <span class="old">1400</span> <span class="discount">50%</span>
        </div-->
      </div>
      <div v-if="in_cart" class="ProductBlock_buttons" @mouseenter="BlockClick(true)" @mouseleave="BlockClick(false)">
        <div v-if="in_cart" class="ProductBlock_cart_wrapper">
          <div class="ProductBlock_cart_counter">
            {{ `${$t('store.in_cart2')}: ${product.cart_count}` }}
          </div>
        </div>
        <a @mousedown="$Store.AddInCart(product)" class="ProductBlock_button" :class="{'theme': product.count <= product.cart_count}">
          <i class="bi bi-plus-lg"></i>
        </a>
        <a @mousedown="$Store.RemoveFromCart(product)" class="ProductBlock_button" :class="{'theme': product.cart_count < 2}">
          <i class="bi bi-dash-lg"></i>
        </a>
        <a @mousedown="$Store.RemoveFromCart(product, true)" class="ProductBlock_button theme">
          <i class="bi bi-trash2"></i>
        </a>
      </div>
      <div v-else class="ProductBlock_buttons" @mouseenter="BlockClick(true)" @mouseleave="BlockClick(false)">
        <router-link v-if="apanel" :to="`/cp/product?id=${product.id}`" class="ProductBlock_button">
          <i class="bi bi-pencil"></i> <span class="page_nomobile">{{ $t('general.edit') }}</span>
        </router-link>
        <a v-else-if="product.count < 1" class="ProductBlock_button cart_added">
          <i class="bi bi-cart"></i> <span :class="{'page_nomobile': mini}">{{ $t('store.messages.no_in_stock') }}</span>
        </a>
        <router-link v-else-if="$Store.IsInCart(product)" to="/cart" class="ProductBlock_button cart_added">
          <i class="bi bi-cart"></i> <span :class="{'page_nomobile': mini}">{{ $t('store.in_cart2') }}</span>
        </router-link>
        <a v-else @click="Cart" class="ProductBlock_button cart">
          <i class="bi bi-cart"></i> <span :class="{'page_nomobile': mini}">{{ $t('store.in_cart') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  emits: ['buy', 'edit', 'cart'],
  props: {
    product: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    },
    apanel: {
      type: Boolean,
      default: false
    },
    in_cart: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      block_click: false
    }
  },
  methods: {
    GetDate(date){
      let d = new Date(date * 1000);
      let month = "0" + (d.getMonth() + 1);
      let hours = d.getHours();
      let minutes = "0" + d.getMinutes();
      return `${d.getDate()}.${month.slice(-2)}.${d.getFullYear()}  ${hours}:${minutes.slice(-2)}`;
    },
    GoToInfo(){
      if(this.block_click) return;
      this.$router.push(`/product/${this.product.id}`);
    },
    Edit(e){
      e.preventDefault();
      this.$emit('edit', this.product);
    },
    Buy(e){
      e.preventDefault();
      this.$emit('buy', this.product);
    },
    Cart(e){
      e.preventDefault();
      this.$emit('cart', this.product);
    },
    BlockClick(is_blocked = true){
      this.block_click = is_blocked;
    }
  },
  computed: {
    GetPrice(){
      return (this.product.discount ? this.product.price - ((this.product.price / 100) * this.product.discount) : this.product.price).toLocaleString();
    },
    GetFullPrice(){
      return this.product.price.toLocaleString();
    },
    GetPriceCounted(){
      let price = this.product.discount ? this.product.price - ((this.product.price / 100) * this.product.discount) : this.product.price;
      return (this.product.cart_count ? price * this.product.cart_count : price).toLocaleString();
    },
    GetFullPriceCounted(){
      return (this.product.cart_count ? this.product.price * this.product.cart_count : this.product.price).toLocaleString();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>