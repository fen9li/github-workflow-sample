import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => lazy(import('./views/Home')),
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => lazy(import('./views/clients')),
    },
    {
      path: '/clients/:id/:tab?',
      name: 'client-details',
      component: () => lazy(import('./views/client')),
    },
    {
      path: '/merchants',
      name: 'merchants',
      component: () => lazy(import('./views/merchants')),
    },
    {
      path: '/merchants/:id',
      name: 'merchant-details',
      component: () => lazy(import('./views/merchant')),
      props: true,
    },
    {
      path: '/merchants/:id/offers/:tab?',
      name: 'merchant-offers',
      component: () => lazy(import('./views/merchant-offers')),
      props: true,
    },
    {
      path: '/merchants/:id/offers/:offerId',
      name: 'merchant-offer',
      component: () => lazy(import('./views/merchant-offer')),
      props: true,
    },
    {
      path: '/offers',
      name: 'offers',
      component: () => lazy(import('./views/offers')),
    },
    {
      path: '/offers/:id',
      name: 'offer-details',
      component: () => lazy(import('./views/offer')),
    },
    {
      path: '/feed-updates/:slug/:tab?',
      name: 'feed-updates',
      component: () => lazy(import('./views/feed-updates')),
      props: true,
    },
    {
      path: '/feed-updates/details/:slug/:id',
      name: 'feed-details',
      component: () => lazy(import('./views/feed-updates/details')),
      props: true,
    },
    {
      path: '/feed-status',
      name: 'feed-status',
      component: () => lazy(import('./views/feed-status')),
    },
    {
      path: '/log',
      name: 'log',
      component: () => lazy(import('./views/log')),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => lazy(import('./views/categories')),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
