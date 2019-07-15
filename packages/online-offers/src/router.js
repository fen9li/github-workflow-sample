import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  linkActiveClass: 'menu__item--active',
  routes: [{
    path: '/',
    name: 'home',
    component: () => lazy(import('./views/Home')),
  }, {
    path: '/clients',
    name: 'catalogues',
    component: () => lazy(import('./views/catalogues')),
  }, {
    path: '/clients/:id/:tab?',
    name: 'catalogue-details',
    component: () => lazy(import('./views/catalogue')),
  }, {
    path: '/merchants',
    name: 'merchants',
    component: () => lazy(import('./views/merchants')),
  }, {
    path: '/merchants/:id/:edit?',
    name: 'merchant-details',
    component: () => lazy(import('./views/merchant')),
    props: true,
  }, {
    path: '/merchants/:id/offers/:tab?',
    name: 'merchant-offers',
    component: () => lazy(import('./views/merchant-offers')),
    props: true,
  }, {
    path: '/merchants/:id/offer/:offerId',
    name: 'merchant-offer',
    component: () => lazy(import('./views/merchant-offer')),
    props: true,
  }, {
    path: '/offers',
    name: 'offers',
    component: () => lazy(import('./views/offers')),
  }, {
    path: '/offers/:id/:edit?',
    name: 'offer-details',
    component: () => lazy(import('./views/offer')),
  }, {
    path: '/feed-updates',
    name: 'feed-updates',
    component: () => lazy(import('./views/feed-updates')),
    props: true,
  }, {
    path: '/feed-updates/:slug/:tab?',
    name: 'feed-update',
    component: () => lazy(import('./views/feed-update')),
    props: true,
    meta: {
      nested: true,
    },
  }, {
    path: '/feed-updates/merchant/:slug/:id',
    name: 'feed-merchant',
    component: () => lazy(import('./views/feed-update/merchant')),
    props: true,
    meta: {
      nested: true,
    },
  }, {
    path: '/feed-updates/offer/:slug/:id',
    name: 'feed-offer',
    component: () => lazy(import('./views/feed-update/offer')),
    props: true,
    meta: {
      nested: true,
    },
  }, {
    path: '/feed-activity',
    name: 'feed-activity',
    component: () => lazy(import('./views/feed-activity')),
  }, {
    path: '/log',
    name: 'log',
    component: () => lazy(import('./views/log')),
  }, {
    path: '/categories',
    name: 'categories',
    component: () => lazy(import('./views/categories')),
  }, {
    path: '*',
    redirect: '/',
  }],
})

export default router
