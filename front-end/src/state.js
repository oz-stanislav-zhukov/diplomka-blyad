import { reactive } from 'vue'

export default reactive({
  loading: true,
  api_loading: false,
  page_loading: true,
  user_loading: false,
  reauth_loading: false,
  session_loading: false,
  footer_enabled: false,
  server_unavailable: false,
  session_unavailable: false,

  axios: null,
  $event: null,
  $route: null,
  $router: null,
  $i18n: null,
  $t: null,

  platform: {
    mode: "desktop",
    view_mode: "desktop",
  },
  player: {},
  user_settings: {
    theme: "light",
    language: "ru"
  },
  page_state: {
    width: 0,
    height: 0,
    active: 'Main',
    title: 'Main Page',
    icon: '/engine/assets/ico/logo.png',
    height_full: false
  },

  admin: {
    debug: false,
    stress_test: false
  },

  site: {
    context_id: "",
    context_blocked: {},
    mainmenu_active: false,
    service: {
      active: false,
      hide_menu: true,
      name: '',
      back: null,
      links: [],
    },
    pages: {
      profile: {}
    },
    bg: null,
    suser: null,
  },

  headers: []
})