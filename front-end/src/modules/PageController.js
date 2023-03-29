import config from '@/config.js'
import state from '@/state.js'
import user from '@/userdata.js'
import { setLanguage } from '@/modules/Language.js'
import Debug from '@/modules/Debug.js'
import Storage from '@/modules/Storage.js'

export default {
  name: 'PageController',
  created(){
    if(config.debug.enabled) Debug.log('Engine', 'Page Controller ready to work');
    this.UpdateViewMode();

    document.addEventListener("DOMContentLoaded", () => {
      window.onresize = () => {
        this.UpdateViewMode();
      };
    });

    let theme = Storage.get('theme');
    if(theme != null) this.LoadTheme(theme);
    Debug.log('Engine', theme);
    
    state.$event.on("user-loaded", () => {
      this.LoadTheme(this.GetThemeName(user.settings.theme));
    });
  },
  update(){
    this.setTitle(state.page_state.title);
  },
  /**
   * Theme
   */
  LoadTheme(name = 'light') {
    if (document.getElementById('themeStyle')) document.getElementById('themeStyle').remove();
    var link  = document.createElement('link');
    link.id   = 'themeStyle';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = `/engine/assets/css/themes/${name}.css`;
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    state.user_settings.theme = name;
    if(user.authed) user.settings.theme = this.GetThemeID(state.user_settings.theme);
    Storage.set('theme', state.user_settings.theme);
  },
  ChangeTheme() {
    this.LoadTheme(state.user_settings.theme == 'light' ? 'dark' : 'light');
    user.settings.theme = this.GetThemeID(state.user_settings.theme);
    Storage.set('theme', state.user_settings.theme);
    return state.user_settings.theme;
  },
  GetThemeName(id) {
    switch(id){
      case 0:
        return 'light';
      case 1:
        return 'dark';
    }
  },
  GetThemeID(name) {
    switch(name){
      case 'light':
        return 0;
      case 'dark':
        return 1;
    }
  },
  /**
   * Page
   */
  setTitle: function (newtitle = null) {
    if(!newtitle) newtitle = state.$route.name;
    if(typeof(newtitle) == "undefined") return;

    const name = state.$i18n.messages[state.$i18n.locale].headers.titles[newtitle];
    const math = typeof(name) != "undefined" && name !== null;

    document.querySelector("link[rel~='icon']").href = state.page_state.icon;

    document.title = math ? name : newtitle;
    state.page_state.title = newtitle;
    if(config.debug.page_state) Debug.log('Engine', `Set title: ${document.title} [${typeof(name)}, ${newtitle}, ${name}, ${math}]`);
  },
  setHeaderVisibility(visible = true, index = 0){
    state.headers[index].active = visible;
  },
  setFooterVisibility(visible = true){
    state.footer_enabled = visible;
  },
  pageSettings(page = 'None', header = true, footer = false, icon = null, title = null) {
    if(title) this.setTitle(title);
    if(!icon) icon = '/engine/assets/ico/logo.png';

    state.page_state.active = page;
    state.headers[0].active = header;
    state.footer_enabled = footer;
    state.page_state.icon = icon;

    document.querySelector("link[rel~='icon']").href = icon;
    if(config.debug.page_state) Debug.log('Engine', `Application reconfigured for ${state.page_state.active} page`);
  },
  pageMounted() {
    if(state.user_settings.language != state.$i18n.locale) setLanguage(state.$i18n, state.user_settings.language);
    if(config.debug.page_state) Debug.log('Engine', `Page ${state.page_state.active} Mounted`);
  },
  subpageMounted(){
    setTimeout(() => { state.loading = false; state.page_loading = false; }, 300);
    window.scrollTo(0,0);
  },
  pageUnmounted() {
    if(config.debug.page_state) Debug.log('Engine', `Page ${state.page_state.active} Unmounted`);
  },
  UpdateViewMode() {
    state.page_state.width = window.innerWidth;
    state.page_state.height = window.innerHeight;
    
    if(window.innerWidth <= 900){
      state.platform.view_mode = 'mobile';
    } else if(window.innerWidth <= 1120 || window.innerHeight <= 700){
      state.platform.view_mode = 'tablet';
    } else state.platform.view_mode = 'desktop';
  },
  isDesktop() { return state.platform.view_mode == 'desktop'; },
  isTablet() { return state.platform.view_mode == 'tablet'; },
  isMobile() { return state.platform.view_mode == 'mobile'; },
  /**
   * Context
   */
  ToggleContext(context_id){
    if(!Object.hasOwn(state.site.context_blocked, context_id) && state.site.context_id != context_id) state.site.context_id = context_id;
    else {
      state.site.context_blocked[context_id] = true;
      state.site.context_id = '';
      setTimeout(() => { delete state.site.context_blocked[context_id]; }, 100);
    }
  },
  OpenContext(context_id){
    if(!Object.hasOwn(state.site.context_blocked, context_id)) state.site.context_id = context_id;
  },
  CloseContext(context_id){
    state.site.context_blocked[context_id] = true;
    state.site.context_id = '';
    setTimeout(() => { delete state.site.context_blocked[context_id]; }, 100);
  },
  /**
   * Query
   */
  SetQuery(name, value = null, my_query = null){
    let query;
    if(my_query != null) query = Object.assign({}, my_query);
    else query = Object.assign({}, state.$route.query);

    if(config.debug.page_state) Debug.log('Engine', `Set query: ${document.title} [${name}, ${query[name]} => ${value}]`);

    if(value) query[name] = value;
    else delete query[name];
    state.$router.replace({ query });
  },
  SetMultiQuery(data, my_query = null){
    let query;
    if(my_query != null) query = Object.assign({}, my_query);
    else query = Object.assign({}, state.$route.query);

    if(config.debug.page_state) Debug.log('Engine', `Set multi query: ${document.title} [${JSON.stringify(query)} => ${JSON.stringify(data)}]`);

    Object.keys(data).forEach(name => {
      if(data[name]) query[name] = data[name];
      else delete query[name];
    });

    state.$router.replace({ query });
  },
  /**
   * Service
   */
  SetActiveService(service = null){
    if(service) state.site.service.active = service;
    else this.CloseService();
  },
  OpenService(name, hide_menu = false, back = '', links = []){
    state.site.service = {
      active: true,
      hide_menu: hide_menu,
      name: name,
      back: back,
      links: links,
    };
  },
  CloseService(){
    state.site.service = {
      active: false,
      hide_menu: false,
      name: '',
      back: null,
      links: [],
    };
  }
}