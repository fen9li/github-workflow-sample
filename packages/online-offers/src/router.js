import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    redirect: {
      name: 'catalogues',
    },
  }, {
    path: '/clients',
    name: 'catalogues',
    component: () => lazy(import('./views/catalogues')),
    meta: {
      menu: 'clients',
    },
  }, {
    path: '/clients/:id/:tab?',
    name: 'catalogue-details',
    component: () => lazy(import('./views/catalogue')),
    meta: {
      menu: 'clients',
    },
  }, {
    path: '/merchants',
    name: 'merchants',
    component: () => lazy(import('./views/merchants')),
    meta: {
      menu: 'merchants',
    },
  }, {
    path: '/merchants/:id/offers/:tab?',
    name: 'merchant-offers',
    component: () => lazy(import('./views/merchant-offers')),
    props: true,
    meta: {
      menu: 'merchants',
    },
  }, {
    path: '/merchants/:id/:edit?/:tab?',
    name: 'merchant-details',
    component: () => lazy(import('./views/merchant')),
    props: true,
    meta: {
      menu: 'merchants',
    },
  }, {
    path: '/merchants/:id/offer/:offerId',
    name: 'merchant-offer',
    component: () => lazy(import('./views/merchant-offer')),
    props: true,
    meta: {
      menu: 'merchants',
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
    path: '/feed-updates',
    name: 'feed-updates',
    component: () => lazy(import('./views/feed-updates')),
    props: true,
    meta: {
      menu: 'feed-updates',
    },
  }, {
    path: '/feed-updates/:slug/:tab?',
    name: 'feed-update',
    component: () => lazy(import('./views/feed-update')),
    props: true,
    meta: {
      nested: true,
      menu: 'feed-updates',
    },
  }, {
    path: '/feed-updates/merchant/:slug/:id',
    name: 'feed-merchant',
    component: () => lazy(import('./views/feed-update/merchant')),
    props: true,
    meta: {
      nested: true,
      menu: 'feed-updates',
    },
  }, {
    path: '/feed-updates/offer/:slug/:id',
    name: 'feed-offer',
    component: () => lazy(import('./views/feed-update/offer')),
    props: true,
    meta: {
      nested: true,
      menu: 'feed-updates',
    },
  }, {
    path: '/feed-activity',
    name: 'feed-activity',
    component: () => lazy(import('./views/feed-activity')),
    meta: {
      menu: 'feed-activity',
    },
  }, {
    path: '/log',
    name: 'log',
    component: () => lazy(import('./views/log')),
    meta: {
      menu: 'log',
    },
  }, {
    path: '/categories',
    name: 'categories',
    component: () => lazy(import('./views/categories')),
    meta: {
      menu: 'categories',
    },
  }, {
    path: '*',
    redirect: '/',
  }],
})

export default router
