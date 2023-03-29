const routes = [
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