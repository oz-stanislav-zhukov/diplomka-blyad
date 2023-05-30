import { reactive } from 'vue'

export default reactive({
  loading: true,
  api_loading: false,
  user_loading: false,
  page_loading: true,
  server_unavailable: false,
  unsupported_format: false,

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
  user_settings: {
    theme: "light",
    language: "ru"
  },
  
  page_state: {
    header: {
      active: false
    },
    footer: {
      active: true
    },
    width: 0,
    height: 0,
    min_width: 280,
    min_height: 360,
    active: 'Main',
    title: 'Main Page',
    icon: '/engine/assets/ico/logo.png'
  },

  admin: {
    debug: false,
    stress_test: false
  },

  site: {
    context_id: "",
    context_blocked: {},
    mainmenu_active: false,
    cart: {
      products: []
    },
  }
})