<template>
  <div v-if="order" class="ReviewCard_block">
    <div class="ReviewCard_header">
      <img :src="order.user?.avatar ? order.user?.avatar : `/engine/assets/img/image.png`" class="ReviewCard_image" />
      <div class="ReviewCard_info">
        <div class="ReviewCard_info_name">{{ order.user?.first_name ? `${order.user?.first_name} ${order.user?.last_name}` : 'Anon' }}</div>
        <div class="ReviewCard_info_date">{{ order.created_time ? GetDate(order.created_time) : '' }}</div>
      </div>
      <div v-if="$User.isAdmin(2)" class="ReviewCard_buttons">
        <i @click="DeleteOrder" v-tippy="{size: 'small', placement: 'right', content: $t('store.delete_order')}" class="bi bi-x-lg red ReviewCard_button"></i>
      </div>
    </div>
    <div class="ReviewCard_body" style="gap: 5px; border-top: 1px solid var(--color-block-border); padding-top: 10px;">
      <div class="ReviewCard_row">
        <div class="ReviewCard_row_name">{{ $t('store.order.id') }}:</div>
        <div class="ReviewCard_row_data">{{ order.id }}</div>
      </div>
      <div class="ReviewCard_row">
        <div class="ReviewCard_row_name">{{ $t('store.price') }}:</div>
        <div class="ReviewCard_row_data">{{ `${order.price.toLocaleString()} ${$tc('social.counter.money.kzt', 0).replace('0 ', '')}` }}</div>
      </div>
      <div class="ReviewCard_row">
        <div class="ReviewCard_row_name">{{ $t('store.full_price') }}:</div>
        <div class="ReviewCard_row_data">{{ `${order.full_price.toLocaleString()} ${$tc('social.counter.money.kzt', 0).replace('0 ', '')}` }}</div>
      </div>
      <div class="ReviewCard_row">
        <div class="ReviewCard_row_name">{{ $t('store.order.payment_type') }}:</div>
        <div class="ReviewCard_row_data">{{ $t(`store.order.payment_types.${order.payment_type}`) }}</div>
      </div>
      <div class="ReviewCard_row">
        <div class="ReviewCard_row_name">{{ $t('store.order.shipping_type') }}:</div>
        <div class="ReviewCard_row_data">{{ $t(`store.order.shipping_types.${order.shipping_type}`) }}</div>
      </div>
      <div class="ReviewCard_row">
        <div class="ReviewCard_row_name">{{ $t('store.phone') }}:</div>
        <div class="ReviewCard_row_data">{{ order.user.phone ? order.user.phone : $t('info.undefined') }}</div>
      </div>
      <div class="ReviewCard_row">
        <div class="ReviewCard_row_name">{{ $t('store.email') }}:</div>
        <div class="ReviewCard_row_data">{{ order.user.email ? order.user.email : $t('info.undefined') }}</div>
      </div>
      
      <template v-if="order.shipping_type == 1">
        <div class="ReviewCard_row">
          <div class="ReviewCard_row_name">{{ $t('store.order.pickup_in') }}:</div>
          <div class="ReviewCard_row_data">{{ order.delivery_address }}</div>
        </div>
      </template>
      <template v-else-if="order.shipping_type == 2">
        <div class="ReviewCard_row">
          <div class="ReviewCard_row_name">{{ $t('store.order.delivery_time') }}:</div>
          <div class="ReviewCard_row_data">{{ $t(`store.order.delivery_times.${order.delivery_time}`) }}</div>
        </div>
        <div class="ReviewCard_row">
          <div class="ReviewCard_row_name">{{ $t('store.order.delivery_address') }}:</div>
          <div class="ReviewCard_row_data">{{ order.delivery_address }}</div>
        </div>
      </template>

      <div class="OrderCard_products">
        <template v-for="(product, i) in order.products" :key="`p${i}`">
          <div @click="$router.push(`/product/${product.id}`)" class="OrderCard_product">
            <div class="OrderCard_image_wrap">
              <div class="OrderCard_image" :style="`background-image: url(${product.image})`"></div>
              <div class="ProductBlock_marks">
                <div class="ProductBlock_mark discount">{{ `x${order.products_count[product.id]}` }}</div>
              </div>
            </div>

          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCard',
  emits: ['update'],
  props: {
    order: {
      type: Object,
      default: null
    }
  },
  methods: {
    async DeleteOrder(){
      let r = await this.$Api.query('store.deleteOrder', {}, { order_id: this.order.id });
      if(r.status == 'error') return this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.Update();
    },
    GetDate(date){
      let d = new Date(date * 1000);
      let month = "0" + (d.getMonth() + 1);
      let hours = d.getHours();
      let minutes = "0" + d.getMinutes();
      return `${d.getDate()}.${month.slice(-2)}.${d.getFullYear()}  ${hours}:${minutes.slice(-2)}`;
    },
    Update(){
      this.$emit('update');
    }
  },
}
</script>

<style lang="scss" scoped>
</style>