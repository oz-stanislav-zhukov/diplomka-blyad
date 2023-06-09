import { createWebHistory, createRouter } from "vue-router";
import PageController from '@/modules/PageController.js'
import User from '@/modules/User.js'
import config from '@/config.js'

import IndexPages from '@/modules/router/index.js'
import NotFoundPages from '@/modules/router/notsubdomain.js'

const host = window.location.host;
const parts = host.split('.');
const domainLength = 3; // diplom.ozliginus.ru => domain length = 3

function route(){
  if (parts.length === (domainLength - 1) || parts.length === (domainLength - 2) || parts[0] === 'www') return IndexPages;
  else if (parts[0] === 'diplom') return IndexPages;
  else return NotFoundPages;
}

function initRouter(){
  const router = createRouter({
    history: createWebHistory(),
    routes: route()
  });
  
  router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/info/') != -1) next()
    if (to.path.indexOf('/product/') != -1) next()
    else if (config.router.AllowUnAuthed.indexOf(to.path) == -1 && !User.isLogined()) next({ path: '/login' })
    else if (config.router.OnlyUnAuthed.indexOf(to.path) != -1 && User.isLogined()) next({ path: '/' })
    else next()
  });
  
  router.afterEach(() => {
    PageController.subpageMounted();
  });

  return router;
}

export default initRouter;