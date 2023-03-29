import { reactive, version } from 'vue'

export default reactive({
  engine: {
    name: 'ozLEngine Vite',
    ver: require('../package.json').version,
    vue: version
  },
  domains: {
    https: true,
    wss: false,
    local: false,
    host: window.location.host,
    domain: import.meta.env.DEV ? "localhost:8080" : (local ? "diplom.test" : "diplom.ozliginus.ru"),
    subdomain: window.location.host.split('.')[0],
    authDomain: "auth.ozliginus.ru",
    serverDomain: "server.ozliginus.ru",
    connectDomain: "connect.ozliginus.ru",
    accountDomain: "account.ozliginus.ru",
    userapiDomain: "userapi.ozliginus.ru",
    supportDomain: "support.ozliginus.ru",
    socialDomain: "ozkontakt.ozliginus.ru",
    apiDomain: "api.ozliginus.ru",
    tsDomain: "ts.ozliginus.ru"
  },
  apiData: {
    session_id: '',
    client: 'ozl-diplom',
    client_id: 6764248,
    client_key: '',
    client_secret: '',
    api_version: "5.2"
  },
  adminGroups: {
    GROUPS_ADMIN_LEVEL_USER: 0,
    GROUPS_ADMIN_LEVEL_VERIFIED_USER: 1,
    GROUPS_ADMIN_LEVEL_MODERATOR: 2,
    GROUPS_ADMIN_LEVEL_EDITOR: 3,
    GROUPS_ADMIN_LEVEL_ADMINISTRATOR: 4,
    GROUPS_ADMIN_LEVEL_DEVELOPER: 5,
    GROUPS_ADMIN_LEVEL_HOST: 6
  },
  debug: {
    enabled: true,
    render_log: false,
    page_state: false,
    api_log: false,
    api_error: true,
    ws_info: false,
    ws_log: false,
    ws_error: true,
    ws_message: false,
    sw_log: true,
    sw_error: true,
  },
  router: {
    AllowUnAuthed: ['/login', '/'],
    OnlyUnAuthed: ['/login'],
  },
  locale: {
    translit: {
      cyrillic: ['ru', 'kz', 'ua', 'by'],
      latin: ['en', 'kz-latin', 'de']
    }
  },
  visual: {
    particles: true
  },
  header: {
    menus: {
			mainmenu: {
				icon: "/engine/assets/ico/logo.png",
				links: [
					{
						url: false,
						name: 'main',
						page: '/',
					},
					{
						url: true,
						name: 'ozProtect',
						page: '//ozprotect.ozliginus.ru',
					}
				]
			}
    }
  }
})