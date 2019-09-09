import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@lib/router/lazy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/accounts',
      name: 'accounts',
      component: () => lazy(import('./views/accounts')),
      meta: {
        menu: 'accounts',
      },
    },
    {
      path: '/account/:id/:tab?',
      name: 'account',
      component: () => lazy(import('./views/account')),
      props: true,
      meta: {
        menu: 'accounts',
      },
    },
    {
      path: '/providers',
      name: 'providers',
      component: () => lazy(import('./views/providers')),
      meta: {
        menu: 'providers',
      },
    },
    {
      path: '/providers/:id',
      name: 'provider-details',
      component: () => lazy(import('./views/provider')),
      props: true,
      meta: {
        menu: 'providers',
      },
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => lazy(import('./views/rules')),
      meta: {
        menu: 'rules',
      },
    },
    {
      path: '/rule/:id',
      name: 'rule-details',
      component: () => lazy(import('./views/rule')),
      props: true,
    },
    {
      path: '/events',
      name: 'events',
      component: () => lazy(import('./views/events')),
      meta: {
        menu: 'events',
      },
    },
    {
      path: '/event/:id',
      name: 'event',
      component: () => lazy(import('./views/event')),
      props: true,
    },
    {
      path: '/event-occurrences',
      name: 'event-occurrences',
      component: () => lazy(import('./views/event-occurrences')),
      meta: {
        menu: 'event-occurrences',
      },
    },
    {
      path: '/event-occurrences/:id',
      name: 'event-occurrence-details',
      component: () => lazy(import('./views/event-occurrence')),
      meta: {
        menu: 'event-occurrences',
      },
      props: true
    },
    {
      path: '/limits',
      name: 'limits',
      component: () => lazy(import('./views/limits')),
      meta: {
        menu: 'limits',
      },
    },
    {
      path: '/limits/:limitId',
      name: 'limit-details',
      component: () => lazy(import('./views/limit')),
      props: true,
      meta: {
        menu: 'limits',
      },
    },
    {
      path: '/badges',
      name: 'badges',
      component: () => lazy(import('./views/badges')),
      meta: {
        menu: 'badges',
      },
    },
    {
      path: '/memberships',
      name: 'memberships',
      component: () => lazy(import('./views/memberships')),
      meta: {
        menu: 'memberships',
      },
    },
    {
      path: '/membership/:id',
      name: 'membership',
      component: () => lazy(import('./views/membership')),
      props: true,
    },
    {
      path: '*',
      redirect: '/accounts',
    },
  ],
})

export default router
