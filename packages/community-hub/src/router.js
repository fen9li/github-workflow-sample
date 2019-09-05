import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [{
    path: '/dashboard',
    name: 'dashboard',
    component: () => lazy(import('./views/dashboard')),
    meta: {
      menu: 'dashboard',
    },
  }, {
    path: '/retailers',
    name: 'retailers',
    component: () => lazy(import('./views/retailers')),
    meta: {
      menu: 'retailers',
    },
  }, {
    path: '/retailers/new',
    name: 'retailer-new',
    component: () => lazy(import('./views/retailer-new')),
    meta: {
      menu: 'retailers',
    },
  }, {
    path: '/retailers/:id/offers',
    name: 'retailer-offers',
    component: () => lazy(import('./views/retailer/offers/retailer-offers')),
    meta: {
      menu: 'retailers',
    },
  }, {
    path: '/retailers/:id/offers/preview',
    name: 'retailer-offers-preview',
    component: () => lazy(import('./views/retailer/offers/retailer-offers-preview')),
    meta: {
      menu: 'retailers',
    },
  }, {
    path: '/retailers/:id/:edit?',
    name: 'retailer-details',
    component: () => lazy(import('./views/retailer')),
    meta: {
      menu: 'retailers',
    },
  }, {
    path: '/offers',
    name: 'offers',
    component: () => lazy(import('./views/offers')),
    meta: {
      menu: 'offers',
    },
  }, {
    path: '/offers/:id/:edit?',
    name: 'offer-details',
    component: () => lazy(import('./views/offer')),
    meta: {
      menu: 'offers',
    },
  }, {
    path: '/categories',
    name: 'categories',
    component: () => lazy(import('./views/categories')),
    meta: {
      menu: 'categories',
    },
  }, {
    path: '/categories/new',
    name: 'category-new',
    component: () => lazy(import('./views/categories/category-new')),
    meta: {
      menu: 'categories',
    },
  }, {
    path: '/categories/:id/:edit',
    name: 'category-details',
    component: () => lazy(import('~/views/categories/category-details')),
    meta: {
      menu: 'categories',
    },
  }, {
    path: '/log',
    name: 'log',
    component: () => lazy(import('./views/log')),
    meta: {
      menu: 'log',
    },
  }, {
    path: '/',
    name: '*',
    redirect: '/dashboard',
  }, ],
})
