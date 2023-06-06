<template>
  <div class="page_container">
    <div class="page_content">
      <AboutMenu />
      <div class="page_content_right">
        <div class="RulesCard">
          <div class="RulesCard_title">{{ $t('rules.title') }}</div>
          
          <div class="RulesCard_wrapper">
            <div class="RulesCard_section">
              <div class="RulesCard_section_title">1.	ОБЩИЕ ПОЛОЖЕНИЯ</div>
              <div class="RulesCard_section_row">1.1.	123</div>
              <div class="RulesCard_section_row">1.3. 213:
                <span>132</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AboutMenu from '@/components/cards/AboutMenu.vue'

export default {
  name: 'RulesPage',
  created(){
    this.$PageController.pageSettings('RulesPage', 'rules');
  },
  methods: {
    
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    AboutMenu
  }
}
</script>

<style lang="scss">

</style>