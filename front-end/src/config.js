import { reactive, version } from 'vue'

export default reactive({
  engine: {
    name: 'ozLEngine',
    ver: require('../package.json').version,
    vue: version
  },
  domains: {
    https: true,
    dev: false,
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
    BluredHeader: ['/login', '/registration', '/restore', '/logout'],
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
      name: "",
      icon: "/engine/assets/ico/badge",
      links: [
        {
          url: false,
          admin_lvl: 0,
          name: 'main',
          icon: 'bi bi-bag',
          page: '/',
        },
        {
          url: false,
          admin_lvl: 1,
          name: 'admin_panel',
          icon: 'bi bi-window-sidebar',
          page: '/cp',
        },
        {
          url: false,
          admin_lvl: 0,
          name: 'about',
          icon: 'bi bi-info-square',
          page: '/about',
        }
      ]
    },
    about: {
      links: [
        {
          name: 'about',
          icon: 'bi bi-info-square',
          page: '/about',
        },
        {
          name: 'guarantee',
          icon: 'bi bi-file-earmark-text',
          page: '/info/guarantee',
        },
        {
          name: 'delivery',
          icon: 'bi bi-truck',
          page: '/info/delivery',
        },
        {
          name: 'user_help',
          icon: 'bi bi-info-circle',
          page: '/info/costumer_help',
        }
      ]
    },
    cp: {
      links: [
        {
          url: false,
          admin_lvl: 2,
          name: 'orders',
          icon: 'bi bi-box',
          page: '/cp/orders',
        },
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