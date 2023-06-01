<template>
  <template v-if="!loading">
    <div class="ReviewCard">
      <div class="ReviewCard_title">{{ $t('header.titles.orders') }}</div>
      <div v-if="message" class="ReviewCard_message">{{ message }}</div>

      <div v-if="orders.length > 0" class="ReviewCard_wrapper">
        <Order v-for="order in orders" :key="`r${order.id}`" @update="UpdateOrders" :order="order" />
      </div>
    </div>
  </template>
</template>

<script>
import Order from '@/components/cards/Order.vue'

export default {
  name: 'CP_OrderPage',
  data(){
    return {
      loading: false,
      message: '',
      orders: [],
    }
  },
  async created(){
    if(!this.$User.isAdmin(1)) return this.$router.push('/cp');
    this.$PageController.pageSettings('CP_Orders', 'orders');
    await this.UpdateOrders();
  },
  methods: {
    async UpdateOrders() {
      this.Message();
      this.orders = [];
      let r = await this.$Api.query('store.getOrders', {}, {});
      if(r.status == 'success') this.orders = r.response.orders;
      if(this.orders.length <= 0) this.Message(this.$t('store.messages.no_new_orders'));
    },
    Message(text = ''){
      this.message = text;
    }
  },
  components: {
    Order
  }
}
</script>

<style lang="scss">

</style>