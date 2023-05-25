<template>
  <div class="page_container">
    <div class="page_content full">
      <div class="page_content_center">
        <div class="NotFound">
          <div v-if="show_title" class="NotFound_title">ERROR</div>
          <div class="NotFound_desc">{{ $t(`errors.${error}`) }}</div>
          <router-link v-if="show_button" to="/" class="NotFound_button">{{ $t('header.menus.to_main') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data(){
    return {
      error: 'getinfo_error'
    }
  },
  props: {
    error_name: {
      type: String,
      default: ""
    },
    show_button: {
      type: Boolean,
      default: true
    },
    show_title: {
      type: Boolean,
      default: true
    }
  },
  created(){
    this.$PageController.pageSettings('Error', 'error');
    if(this.error_name) this.error = this.error_name;
    else if(this.$route.query.name == 'incorrect_id') this.error = 'insurance_notfound';
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
}
</script>

<style lang="scss" scoped>

</style>
