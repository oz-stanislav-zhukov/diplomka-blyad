<template>
  <footer v-if="isActive" id="Footer" class="page_footer">
    <img class="Footer_ico" src="/engine/assets/ico/badge-primary.png">
    <div class="Footer_title">{{ $t('footer.title') }}</div>
    <div class="Footer_email">{{ $t('footer.email') }} - <a href="mailto:support@unicode.kz">support@unicode.kz</a></div>
    <div class="Footer_copy" v-html="$t('footer.copy')"></div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    isActive: function () {
      return this.$state.page_state.footer.active;
    },
  }
};
</script>

<style lang="scss" scoped>
</style>