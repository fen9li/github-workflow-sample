import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './state/store'
import lazy from '@lib/router/lazy'

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
      path: '/index',
      name: 'index',
      component: () => lazy(import('~/views/index')),
    },
    {
      path: '/modules',
      name: 'modules',
      component: () => lazy(import('~/views/modules')),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => lazy(import('~/views/dashboard')),
    },
    {
      path: '/menu',
      name: 'menu',
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

  if (frameReady) {
    next()
  } else if (to.name === 'home') {
    next()
  } else {
    next({
      name: 'home',
    })
  }
})

export default router
