<template>
  <template v-if="!loading">
    <div class="ReviewCard">
      <div class="ReviewCard_title">{{ $t('header.titles.reviews') }}</div>
      <div v-if="message" class="ReviewCard_message">{{ message }}</div>

      <div v-if="reviews.length > 0" class="ReviewCard_wrapper">
        <Review v-for="review in reviews" :key="`r${review.id}`" @update="UpdateReviews" :review="review" />
      </div>
    </div>
  </template>
</template>

<script>
import Review from '@/components/cards/Review.vue'

export default {
  name: 'CP_ReviewsPage',
  data(){
    return {
      loading: false,
      message: '',
      reviews: [],
    }
  },
  async created(){
    if(!this.$User.isAdmin(1)) return this.$router.push('/cp');
    this.$PageController.pageSettings('CP_Reviews', 'reviews');
    this.UpdateReviews();
  },
  methods: {
    async UpdateReviews() {
      this.Message();
      this.reviews = [];
      let r = await this.$Api.query('info.getReviews', {}, { status: 0, lang: this.$i18n.locale });
      if(r.status == 'success') this.reviews = r.response.reviews;
      if(this.reviews.length <= 0) this.Message(this.$t('info.messages.no_new_reviews'));
    },
    Message(text = ''){
      this.message = text;
    }
  },
  components: {
    Review
  }
}
</script>

<style lang="scss">

</style>