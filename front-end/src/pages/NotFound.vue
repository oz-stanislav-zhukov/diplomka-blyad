<template>
  <div class="page_container">
    <div class="page_content full">
      <div class="page_content_center">
        <div class="NotFound">
          <div class="NotFound_title">404</div>
          <div class="NotFound_desc">{{ $t('header.titles.not_found') }}</div>
          <router-link to="/" class="NotFound_button">{{ $t('header.menus.to_main') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  created(){ this.$PageController.pageSettings('NotFound', 'not_found'); },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
}
</script>

<style lang="scss" scoped>

</style>
