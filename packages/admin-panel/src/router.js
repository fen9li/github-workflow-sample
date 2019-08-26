import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  linkActiveClass: 'menu__item--active',
  routes: [
    {
      path: '/',
      name: 'dashboard',
    },
    {
      path: '/retailers',
      name: 'retailers',
      component: () => lazy(import('./views/retailers')),
    },
    {
      path: '/offers',
      name: 'offers',
      component: () => lazy(import('./views/offers')),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => lazy(import('./views/categories')),
    },
    {
      path: '/log',
      name: 'log',
      component: () => lazy(import('./views/log')),
    }
  ],
})
