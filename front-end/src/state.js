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

  player: {},
  user_settings: {
    theme: "dark",
    language: "ru"
  },
  page_state: {
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
  },

  headers: []
})