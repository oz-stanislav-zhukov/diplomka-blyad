<template>
  <div id="page_notfound">
    Not found
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  created(){ this.$PageController.pageSettings('NotFound', false, false, null, 'not_found'); },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); }
}
</script>

<style lang="scss" scoped>

</style>
