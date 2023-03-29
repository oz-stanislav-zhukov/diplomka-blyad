const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ "@/domains/main/pages/Main")
  },
  /* Errors */
  {
    path: "/:catchAll(.*)",
    name: 'Page Not Found',
    component: () => import(/* webpackChunkName: "notfound" */ "@/sys-pages/NotFound")
  }
];

export default routes;