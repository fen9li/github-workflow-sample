import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  linkExactActiveClass: 'menu__item--active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => lazy(import('./views/dashboard')),
    },
    {
      path: '/users',
      name: 'users',
      component: () => lazy(import('./views/users')),
    },
    {
      path: '/providers',
      name: 'providers',
      component: () => lazy(import('./views/providers')),
    },
    {
      path: '/products',
      name: 'products',
      component: () => lazy(import('./views/products')),
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => lazy(import('./views/roles')),
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => lazy(import('./views/logs')),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => lazy(import('./views/settings')),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
