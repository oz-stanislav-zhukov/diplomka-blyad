<template>
  <div id="wrap">
    Not found
  </div>
</template>

<script>
import { NotFoundMounted, NotFoundAnimation } from "@/assets/js/NotFound.js";

export default {
  name: 'NotFound',
  created(){
    this.$PageController.pageSettings('NotFound', false, false, null, 'not_found');
  },
  data(){
    return {
      searchText: ''
    }
  },
  updated(){
    this.doAnimation();
  },
  methods:{
    doAnimation: function(){
      if(!this.$state.page_loading) NotFoundAnimation();
    }
  },
  mounted() {
    NotFoundMounted();
    this.$PageController.pageMounted();
  },
  beforeUnmount() {
    this.$PageController.pageUnmounted();
  }
}
</script>

<style lang="scss" scoped>

</style>
