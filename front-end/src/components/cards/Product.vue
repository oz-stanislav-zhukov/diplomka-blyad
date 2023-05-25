<template>
  <div v-if="!product || loading" class="ProductBlock seload" :class="{'mini': mini}"></div>
  <div v-else class="ProductBlock" :class="{'mini': mini}">
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
        <div class="ProductBlock_price">
          <span class="price">{{ GetPrice }} ₸</span> <span v-if="product.discount" class="old">{{ GetFullPrice }} ₸</span>
        </div>
        <!--div class="ProductBlock_price">
          {{ $t('store.price') }}: <span class="price">{{ $tc('social.counter.money.kzt', 500) }}</span> <span class="old">1400</span> <span class="discount">50%</span>
        </div-->
      </div>
      <div class="ProductBlock_buttons">
        <a v-if="apanel" @click="Cart" class="ProductBlock_button">
          <i class="bi bi-pencil"></i> {{ $t('general.edit') }}
        </a>
        <a v-else @click="Cart" class="ProductBlock_button cart">
          <i class="bi bi-cart"></i> {{ $t('store.in_cart') }}
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
    Edit(){
      this.$emit('edit');
    },
    Buy(){
      this.$emit('buy');
    },
    Cart(){
      this.$emit('cart');
    }
  },
  computed: {
    GetPrice(){
      return this.product.discount ? this.product.price - ((this.product.price / 100) * this.product.discount) : this.product.price;
    },
    GetFullPrice(){
      return this.product.price;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>