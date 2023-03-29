const routes = [
  {
    path: "/:catchAll(.*)",
    name: 'Page Not Found',
    component: () => import(/* webpackChunkName: "notfound" */ "@/sys-pages/NotFound")
  }
];

export default routes;