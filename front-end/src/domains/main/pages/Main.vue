<template>
  <div id="page_main">Main page</div>
</template>

<script>

export default {
  name: 'PageMain',
  created(){ this.$PageController.pageSettings('Main'); },
  methods: {
		
  },
  computed: {
    
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    
  }
}
</script>

<style lang="scss">

</style>