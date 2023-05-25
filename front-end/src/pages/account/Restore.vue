<template>
	<div class="page_container no_footer">
    <div class="page_content full">
      <div class="page_content_center">
        <div class="LoginPanel">
          <div class="LoginPanel_image" style="background-image: url(/engine/assets/img/r2.png);"></div>
          <div class="LoginPanel_wrapper">
            <div class="LoginPanel_header">
              <div class="LoginPanel_title">{{ $t('connect.recovery') }}</div>
              <div v-if="error" class="LoginPanel_error">{{ error }}</div>
            </div>
            <template v-if="!loading">
              
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'AccountRestore',
  created(){
    this.$PageController.pageSettings('Restore', 'restore', null, false);
    
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: { }
}
</script>
<style lang="scss" scoped></style>