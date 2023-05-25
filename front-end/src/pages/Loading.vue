<template>
  <div class="page_container">
    <div class="page_content full">
      <div class="page_content_center">
        <div class="Loading">
          <div class="Loading_title wave-text-big wave">{{ $t('general.loading') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingPage',
  created(){ this.$PageController.pageSettings('Loading', 'main'); },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
}
</script>

<style lang="scss" scoped>
.Loading {
  gap: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  font-family: sans-serif!important;
}

.Loading_title {
  font-size: 5rem;
  line-height: 1;
  
  @media (max-width: $content-mobile-max-width){
    font-size: 3rem;
  }
}
</style>
