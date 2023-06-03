<template>
  <div v-if="review" class="ReviewCard_block">
    <div class="ReviewCard_header">
      <img :src="review.user?.avatar ? review.user?.avatar : `/engine/assets/img/image.png`" class="ReviewCard_image" />
      <div class="ReviewCard_info">
        <div class="ReviewCard_info_name">{{ review.name }}</div>
        <div class="ReviewCard_info_date">{{ review.time ? GetDate(review.time) : '' }}</div>
        <div v-if="apanel && review.product_id > -1" class="ReviewCard_info_date">
          {{ $t('store.product_review.0') }}
          <router-link :to="`/product/${review.product_id}`">{{ `${$t('store.product_review.1')} #${review.product_id}` }}</router-link>
        </div>
      </div>
      <div v-if="$User.isAdmin(1)" class="ReviewCard_buttons">
        <i v-if="review.status == 0" @click="ModerateReview" v-tippy="{size: 'small', placement: 'right', content: $t('info.accept_review')}" class="bi bi-check-lg green ReviewCard_button"></i>
        <i @click="DeleteReview" v-tippy="{size: 'small', placement: 'right', content: $t('info.delete_review')}" class="bi bi-x-lg red ReviewCard_button"></i>
      </div>
    </div>
    <div class="ReviewCard_body">
      <div class="ReviewCard_body_text">{{ review.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCard',
  emits: ['update'],
  props: {
    review: {
      type: Object,
      default: null
    },
    apanel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async ModerateReview(){
      let r = await this.$Api.query('info.moderateReview', {}, { review_id: this.review.id, status: 1 });
      if(r.status == 'error') return this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.Update();
    },
    async DeleteReview(){
      let r = await this.$Api.query('info.deleteReview', {}, { review_id: this.review.id });
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