<template>
  <header @mouseleave="$PageController.CloseAllContexts()" v-if="isActive" id="Header" class="page_header" :class="{hload: ($state.loading || $state.api_loading) && !isBlured, scrolled: scrolled && !$state.site.mainmenu_active, blured: isBlured}">
    <ul class="HeaderNav">
      <li class="HeaderNav_item">
        <router-link class="TopHomeLink" to="/">
          <img class="TopHomeIco" :src="`${menu?.icon}${$state.user_settings.theme == 'light' ? '' : '-primary'}.png`" />
          <p class="TopHomeTitle">{{ menu?.name }}</p>
        </router-link>
      </li>
      <li class="HeaderNav_item menu" :class="{active: $state.site.mainmenu_active}">
        <template v-for="(m, index) in $config.menus.main.links" :key="`menu${index}`">
          <template v-if="$User.isAdmin(m.admin_lvl)">
            <router-link v-if="!m.url" :to="m.page" @click="CloseMobileMenu" class="TopNavBtn">
              <i v-if="m.icon" :class="[m.icon, {'selected': $route.href == m.page || (m.page != '/' && $route.href?.indexOf(m.page) !== -1)}]"></i>
              <div class="TopNavBtn_text">{{ $t(`header.menus.${m.name}`) }}</div>
              <!--div class="TopNavBtn_desc">{{ m.page }}</div-->
            </router-link>
            <a v-else :href="m.page" @click="CloseMobileMenu" target="_blank" class="TopNavBtn">
              <i v-if="m.icon" :class="m.icon"></i>
              <div class="TopNavBtn_text">{{ $t(`header.menus.${m.name}`) }}</div>
            </a>
          </template>
        </template>
        <template v-if="$vm.isMobile()">
          <router-link to="/cart" @click="CloseMobileMenu" class="TopNavBtn" :class="{'hover': this.$state.site.context_id == 'cart_menu'}">
            <i class="bi bi-cart"></i>
            <div class="TopNavBtn_text">{{$t('store.cart')}}</div>
          </router-link>
          <div class="page_separator"></div>
          <Context @ContextClick="LanguageSelect" id="language_hmenu" :menu="languages_menu" myclass="languages_menu" />
          <a @click="$PageController.ToggleContext('language_hmenu')" class="TopNavBtn" :class="{'hover': $state.site.context_id == 'language_hmenu'}">
            <i class="bi bi-translate"></i>
            <div class="TopNavBtn_text">{{$t('language.name')}}</div>
          </a>
          <a @click="$PageController.LoadTheme($state.user_settings.theme == 'light' ? 'dark' : 'light')" class="TopNavBtn">
            <i class="bi bi-palette"></i>
            <div class="TopNavBtn_text">{{$t(`general.themes.${$PageController.GetThemeID($state.user_settings.theme)}`)}}</div>
          </a>
        </template>
      </li>
      <li v-if="$vm.isMobile()" class="HeaderNav_item special">
        <a @click="ToggleMobileMenu" class="TopNavBtn">
          <i class="bi bi-three-dots-vertical"></i>
        </a>
      </li>
      <li class="HeaderNav_item buttons">
        <template v-if="!$vm.isMobile()">
          <router-link to="/cart" class="TopNavBtn" :class="{'hover': this.$state.site.context_id == 'cart_menu'}">
            <i class="bi bi-cart"></i>
            <div class="TopNavBtn_text">{{$t('store.cart')}}</div>
          </router-link>
          <!--a @click="null" class="TopNavBtn" :class="{'hover': this.$state.site.context_id == 'cart_menu'}">
            <i class="bi bi-cart"></i>
          </a-->
          <Context @ContextClick="LanguageSelect" id="language_hmenu" :menu="languages_menu" myclass="languages_menu page_nomobile" />
          <a @click="$PageController.ToggleContext('language_hmenu')" @mouseenter="$vm.isDesktop() ? $PageController.OpenContext('language_hmenu') : null" class="TopNavBtn" :class="{'hover': this.$state.site.context_id == 'language_hmenu'}">
            <i class="bi bi-translate"></i>
            <div class="TopNavBtn_text">{{$t('language.name')}}</div>
          </a>
          <a @click="$PageController.LoadTheme($state.user_settings.theme == 'light' ? 'dark' : 'light')" class="TopNavBtn">
            <i v-if="$state.user_settings.theme == 'light'" class="bi bi-lightbulb"></i>
            <i v-else class="bi bi-lightbulb-fill"></i>
            <div class="TopNavBtn_text">{{$t(`general.themes.${$PageController.GetThemeID($state.user_settings.theme)}`)}}</div>
          </a>
          <!--a @click="$PageController.LoadTheme($state.user_settings.theme == 'light' ? 'dark' : 'light')" class="TopNavBtn">
            <i class="bi bi-palette"></i>
            <div class="TopNavBtn_text page_nomobile">{{$t(`general.themes.${$PageController.GetThemeID($state.user_settings.theme)}`)}}</div>
          </a-->
        </template>
        <template v-if="!$state.user_loading">
          <template v-if="!$User.isAuthed()">
            <router-link to="/login" class="TopNavBtn">
              <i class="bi bi-box-arrow-in-right"></i>
              <div class="TopNavBtn_text">{{$t('connect.logIn')}}</div>
            </router-link>
            <router-link to="/registration" class="TopNavBtn">
              <i class="bi bi-person-plus"></i>
              <div class="TopNavBtn_text">{{$t('connect.register')}}</div>
            </router-link>
          </template>
          <template v-else>
            <router-link v-if="$route.path != '/profile'" to="/profile" class="TopNavBtn">
              <i class="bi bi-person-circle"></i>
              <div class="TopNavBtn_text">{{ $user.first_name }}</div>
            </router-link>
            <router-link v-else to="/logout" class="TopNavBtn">
              <i class="bi bi-box-arrow-right"></i>
              <div class="TopNavBtn_text">{{$t('connect.logOut')}}</div>
            </router-link>
          </template>
        </template>
      </li>
    </ul>
  </header>
</template>

<script>
import Context from '@/components/general/Context.vue'

export default {
  name: "AppHeader",
  props: {
    menuName: {
      type: String,
      default: "main",
    },
  },
  data() {
    let menu = this.$config.menus[this.menuName];

    this.$state.page_state.header = {
      active: true,
      menu: this.menu,
      menuName: this.menuName,
    };

    return {
      menu: menu,
      scrolled: false,
      languages_menu: [],
    };
  },
  created() {
    window.addEventListener("scroll", this.HandleScroll);
    this.LanguagesMenuUpdate();
  },
  methods: {
		LanguagesMenuUpdate() {
      for(var i = 0; i < this.$config.locale.languages.length; i++){
        let lang = this.$config.locale.languages[i];
        this.languages_menu.push({ name: lang.name, event: lang.id });
      }
		},
    LanguageSelect(name){
      this.$Lang.switchLang(this.$i18n, name);
    },
    ToggleMobileMenu() {
      this.$state.site.mainmenu_active = !this.$state.site.mainmenu_active;
    },
    CloseMobileMenu() {
      this.$state.site.mainmenu_active = false;
    },
    HandleScroll() {
      this.scrolled = window.scrollY > 50;
    },
  },
  computed: {
    isActive: function () {
      return this.$state.page_state.header.active;
    },
    isBlured: function () {
      return this.$config.router.BluredHeader.indexOf(this.$route.href) != -1;
    },
  },
  components: {
    Context
  }
};
</script>

<style lang="scss">
.languages_menu {
  min-width: 140px!important;
  margin-left: 0!important;
}
</style>