<template>
  <div class="page_head" v-if="isActive" :class="{seload: $state.loading || $state.api_loading, 'scrolled': scrolled}">
    <div class="page_head_wrap">
      <header id="p_header" class="page_header">
        <ul class="HeaderNav">
          <li class="HeaderNav_item logo">
            <router-link class="TopHomeLink" to="/">
              <p class="TopHomeTitle">{{ ($state.site.service.active && $state.site.service.name) ? $state.site.service.name : logoName }}</p>
            </router-link>
          </li>
        </ul>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data(){
    const index = this.$state.headers.length;

    this.$state.headers[index] = {
      active: true,
      description: "Header",
      logoName: this.logoName,
      logoIco: this.$config.header.menus[this.menuName].icon,
      searchActive: false,
      menuName: this.menuName
    };

    return {
      index,
      scrolled: false,
    }
  },
  created(){
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    isActive: function (){
      return this.$state.headers[this.index].active;
    }
  },
  props: {
    menuName: {
      type: String,
      default: "mainmenu"
    },
    logoName: {
      type: String,
      default: "ozLEngine"
    }
  },
  beforeUnmount(){
    if(this.$config.debug.enabled) this.$Debug.log('Header', 'Unmounted');
    this.$state.headers.splice(this.index, 1);
  },
  methods: {
    ToggleMobileMenu: function (){
      this.CloseAll('mainmenu_active');
      this.$state.site.mainmenu_active = !this.$state.site.mainmenu_active;
    },
    CloseAll: function (menu){
      if(menu != 'mainmenu_active') this.$state.site.mainmenu_active = false;
    },
    handleScroll() {
      this.scrolled = (window.scrollY > 50);
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>