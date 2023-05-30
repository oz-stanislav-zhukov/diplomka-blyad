const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ "@/pages/Main")
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ "@/pages/About")
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import(/* webpackChunkName: "pay" */ "@/pages/Pay")
  },
  {
    path: '/rules',
    name: 'rules',
    component: () => import(/* webpackChunkName: "rules" */ "@/pages/Rules")
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ "@/pages/Profile")
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ "@/pages/Cart")
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ "@/pages/Product")
  },
	{
		path: '/cp',
		name: 'admin_panel',
		component: () => import(/* webpackChunkName: "cp" */ "@/pages/cp/ControlPanel"),
		children: [
			{
				path: ':page',
				component: () => import(/* webpackChunkName: "cp" */ "@/pages/cp/ControlPanel"),
			}
		]
	},
  {
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ "@/pages/Error")
  },
  /* Auth */
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ "@/pages/account/Login")
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import(/* webpackChunkName: "registration" */ "@/pages/account/Registration")
  },
  {
    path: '/restore',
    name: 'restore',
    component: () => import(/* webpackChunkName: "restore" */ "@/pages/account/Restore")
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ "@/pages/account/Logout")
  },
  /* Errors */
  {
    path: "/:catchAll(.*)",
    name: 'Page Not Found',
    component: () => import(/* webpackChunkName: "notfound" */ "@/pages/NotFound")
  }
];

export default routes;