const routes = [
  {
    path: '/',
    name: 'Company ozLiginus',
    component: () => import(/* webpackChunkName: "main" */ "@/domains/main/pages/Main")
  },
  {
    path: '/search',
    name: 'site_search',
    component: () => import(/* webpackChunkName: "search" */ "@/domains/main/pages/Search")
  },
  {
    path: '/login',
    name: 'login_account',
    component: () => import(/* webpackChunkName: "login" */ "@/domains/main/pages/Login")
  },
  {
    path: '/logout',
    name: 'logout_account',
    component: () => import(/* webpackChunkName: "logout" */ "@/sys-pages/Logout")
  },
  /* Errors */
  {
    path: "/server_unavailable",
    name: 'Server Unavailable',
    component: () => import(/* webpackChunkName: "server-unavailable" */ "@/sys-pages/ServerUnavailable")
  },
  {
    path: "/:catchAll(.*)",
    name: 'Page Not Found',
    component: () => import(/* webpackChunkName: "notfound" */ "@/sys-pages/NotFound")
  }
];

export default routes;