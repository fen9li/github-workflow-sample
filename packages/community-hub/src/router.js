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
      path: '/dashboard',
      name: 'dashboard',
      component: () => lazy(import('./views/dashboard')),
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
      path: '/offers/:id/:edit?',
      name: 'offer-details',
      component: () => lazy(import('./views/offer')),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => lazy(import('./views/categories')),
    },
    {
      path: '/categories/new',
      name: 'category-new',
      component: () => lazy(import('./views/categories/category-new')),
    },
    {
      path: '/categories/:id/:edit',
      name: 'category-details',
      component: () => lazy(import('~/views/categories/category-details')),
    },
    {
      path: '/log',
      name: 'log',
      component: () => lazy(import('./views/log')),
    },
    {
      path: '/',
      name: '*',
      redirect: '/dashboard',
    },
  ],
})
