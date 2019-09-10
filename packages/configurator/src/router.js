import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './state/store'
import lazy from '@lib/router/lazy'
import Dashboard from './views/dashboard'

Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => lazy(import('~/views/home')),
    },
    {
      path: '/modules',
      name: 'modules',
      component: () => lazy(import('~/views/modules')),
      meta: {
        title: 'Modules',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/dashboard/widget',
      name: 'dashboard-widget',
      component: () => lazy(import('~/views/dashboard/dashboard-widget')),
    },
    {
      path: '/dashboard/new',
      name: 'dashboard-new',
      component: () => lazy(import('~/views/dashboard/dashboard-new')),
    },
    {
      path: '/menu',
      name: 'menu',
      meta: {
        title: 'Menu',
      },
      component: () => lazy(import('~/views/menu')),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const frameReady = store.getters['exchange/ready']

  if (frameReady || to.name === 'home') {
    next()
  } else {
    next({
      name: 'home',
    })
  }
})

export default router
