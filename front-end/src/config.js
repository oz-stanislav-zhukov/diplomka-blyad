import { reactive, version } from 'vue'

export default reactive({
  engine: {
    name: 'ozLEngine',
    ver: require('../package.json').version,
    vue: version
  },
  domains: {
    https: true,
    dev: true,
    host: window.location.host,
    domain: (process.env.NODE_ENV === 'development') ? "localhost:8080" : "diplom.ozliginus.ru",
    subdomain: window.location.host.split('.')[0],
    apiDomain: "diplom.ozliginus.ru/api",
    apiDevDomain: "diplom.test/api"
  },
  apiData: {
    session_id: '',
    client: 'site-front',
    client_id: 0,
    client_key: '',
    api_version: "5.2"
  },
  debug: {
    enabled: true,
    render_log: false,
    page_state: false,
    api_log: false,
    api_error: true,
    sw_log: true,
    sw_error: true,
  },
  router: {
    AllowUnAuthed: ['/login', '/registration', '/restore', '/', '/info', '/error', '/about', '/rules'],
    OnlyUnAuthed: ['/login', '/registration', '/restore'],
  },
  locale: {
    languages: [
      { id: 'ru', name: 'Русский' },
      { id: 'en', name: 'English' }
    ],
    translit: {
      cyrillic: ['ru', 'kz', 'ua', 'by'],
      latin: ['en', 'kz-latin', 'de']
    }
  },
  visual: {
    particles: false
  },
  menus: {
    main: {
      name: "Unicode Store",
      icon: "/engine/assets/ico/logo-primary.png",
      links: [
        {
          url: false,
          admin_lvl: 0,
          name: 'main',
          icon: '',
          page: '/',
        },
        {
          url: false,
          admin_lvl: 1,
          name: 'admin_panel',
          icon: '',
          page: '/cp/products',
        },
        {
          url: false,
          admin_lvl: 0,
          name: 'rules',
          icon: '',
          page: '/rules',
        },
        {
          url: false,
          admin_lvl: 0,
          name: 'about',
          icon: '',
          page: '/about',
        }
      ]
    },
    cp: {
      links: [
        {
          url: false,
          admin_lvl: 2,
          name: 'products',
          icon: 'bi bi-bag',
          page: '/cp/products',
        },
        {
          url: false,
          admin_lvl: 3,
          name: 'add_product',
          icon: 'bi bi-bag-plus',
          page: '/cp/product',
        },
        {
          url: false,
          admin_lvl: 2,
          name: 'categories',
          icon: 'bi bi-menu-button',
          page: '/cp/categories',
        },
        {
          url: false,
          admin_lvl: 1,
          name: 'reviews',
          icon: 'bi bi-chat-left-text',
          page: '/cp/reviews',
        }
      ]
    }
  }
})