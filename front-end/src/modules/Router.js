import index from '@/modules/router/index.js'
import notsubdomain from '@/modules/router/notsubdomain.js'
import PageController from '@/modules/PageController.js'
import User from '@/modules/User.js'
import config from '@/config.js'

const host = window.location.host;
const parts = host.split('.');
const domainLength = 3; // diplom.ozliginus.ru => domain length = 3

import { createWebHistory, createRouter } from "vue-router";

function route(){
  let route;
  if (parts.length === (domainLength - 1) || parts.length === (domainLength - 2) || parts[0] === 'www') {
    route = index;
  } else if (parts[0] === 'diplom') {
    route = index;
  } else route = notsubdomain;
  return route;
}

function initRouter(){
  const router = createRouter({
    history: createWebHistory(),
    routes: route()
  });
  
  router.beforeEach((to, from, next) => {
    if (config.router.AllowUnAuthed.indexOf(to.path) == -1 && !User.isLogined()) next({ path: '/login' })
    else if (config.router.OnlyUnAuthed.indexOf(to.path) != -1 && User.isLogined()) next({ path: '/' })
    else next()
  });
  
  router.afterEach(() => {
    PageController.subpageMounted();
  });

  return router;
}

export default initRouter;