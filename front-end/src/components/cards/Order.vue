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
    <div class="ReviewCard_body" style="gap: 5px; border-top: 1px solid var(--color-header-border); padding-top: 10px;">
      <div class="ReviewCard_body_text">{{ `${$t('store.price')}: ${$tc('social.counter.money.kzt', order.price)}`}}</div>
      <div class="ReviewCard_body_text">{{ `${$t('store.full_price')}: ${$tc('social.counter.money.kzt', order.full_price)}`}}</div>
      <div class="ReviewCard_body_text">{{ `${$t('store.order.payment_type')}: ${$t(`store.order.payment_types.${order.payment_type}`)}`}}</div>
      <div class="ReviewCard_body_text">{{ `${$t('store.order.shipping_type')}: ${$t(`store.order.shipping_types.${order.shipping_type}`)}`}}</div>
      <template v-if="order.shipping_type == 1">
        <div class="ReviewCard_body_text">{{ `${$t('store.order.pickup_in')}: ${order.delivery_address}`}}</div>
      </template>
      <template v-else-if="order.shipping_type == 2">
        <div class="ReviewCard_body_text">{{ `${$t('store.order.delivery_time')}: ${$t(`store.order.delivery_times.${order.delivery_time}`)}`}}</div>
        <div class="ReviewCard_body_text">{{ `${$t('store.order.delivery_address')}: ${order.delivery_address}`}}</div>
      </template>
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